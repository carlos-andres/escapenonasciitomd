import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

const CHARACTER_MAPPING_FILE_PATH = path.join(__dirname, '..', 'src', 'characterMapping.json');
const NON_ASCII_REGEX = /[^\x00-\x7F]/g;

/**
 * Represents the extension's main utility for handling non-ASCII characters in text documents.
 */
export class NonAsciiHandler {
	public static readonly lineDecorationType = vscode.window.createTextEditorDecorationType({
		backgroundColor: 'rgba(128,128,128,0.2)',
		color: 'black',
		isWholeLine: true,
		gutterIconPath: vscode.Uri.parse('data:image/svg+xml;base64,' + Buffer.from(`
            <svg width="16" height="16" xmlns="http://www.w3.org/2000/svg">
                <circle cx="8" cy="8" r="7" fill="red" />
            </svg>
        `).toString('base64')),
		gutterIconSize: 'contain'
	});

	public static readonly highlightDecorationType = vscode.window.createTextEditorDecorationType({
		backgroundColor: 'orange',
		color: 'black',
		fontWeight: 'bold'
	});

	/**
	 * Removes the highlights and line decorations created by detectInvalidChars.
	 * @param editor The active text editor.
	 */
	public static clearInvalidCharDecorations(editor: vscode.TextEditor): void {
		editor.setDecorations(NonAsciiHandler.highlightDecorationType, []);
		editor.setDecorations(NonAsciiHandler.lineDecorationType, []);
	}

	/**
	 * Loads the default character mapping from the file.
	 * @returns The default character mapping.
	 */
	private static loadDefaultMapping(): Record<string, string> {
		try {
			return JSON.parse(fs.readFileSync(CHARACTER_MAPPING_FILE_PATH, 'utf8'));
		} catch (err) {
			vscode.window.showErrorMessage('Failed to load default character mapping.');
			return {};
		}
	}

	/**
	 * Ensures that the character mapping configuration exists. If not, sets the default values.
	 */
	public static ensureConfigurationExists(): void {
		const config = vscode.workspace.getConfiguration('escape-non-ascii-to-md');
		if (!config.has('characterMapping')) {
			config.update('characterMapping', NonAsciiHandler.loadDefaultMapping(), vscode.ConfigurationTarget.Global);
		}
	}

	/**
	 * Replaces non-ASCII characters in the provided text using the predefined character mapping.
	 * @param text The input string containing characters to be replaced.
	 * @param mapping The character replacement mapping.
	 * @returns The processed string with non-ASCII characters replaced.
	 */
	public static replaceWithMappedChars(text: string, mapping: Record<string, string>): string {
		return text.replace(NON_ASCII_REGEX, matchedChar => mapping[matchedChar] || ' ');
	}

	/**
	 * Determines the range of text to process in the active editor. If a portion of the text is selected,
	 * it returns the range of the selection. Otherwise, it returns the range of the entire document.
	 * @param editor The active text editor.
	 * @returns The range of text to be processed.
	 */
	public static getRangeForEditor(editor: vscode.TextEditor): vscode.Range {
		const document = editor.document;
		return editor.selection.isEmpty
			? new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length))
			: new vscode.Range(editor.selection.start, editor.selection.end);
	}

	/**
	 * Detects and highlights non-ASCII characters in the provided text editor.
	 * @param editor The active text editor.
	 */
	public static detectInvalidChars(editor: vscode.TextEditor): void {
		const text = editor.document.getText();
		let match;
		const highlightRanges: vscode.Range[] = [];
		const lineRanges: vscode.Range[] = [];

		while (match = NON_ASCII_REGEX.exec(text)) {
			const startPos = editor.document.positionAt(match.index);
			const endPos = editor.document.positionAt(match.index + match[0].length);
			const decoration = { range: new vscode.Range(startPos, endPos) };

			highlightRanges.push(decoration.range);

			const lineStartPos = editor.document.lineAt(startPos.line).range.start;
			const lineEndPos = editor.document.lineAt(startPos.line).range.end;
			lineRanges.push(new vscode.Range(lineStartPos, lineEndPos));
		}

		editor.setDecorations(NonAsciiHandler.highlightDecorationType, highlightRanges);
		editor.setDecorations(NonAsciiHandler.lineDecorationType, lineRanges);
	}
}

/**
 * Activation logic for the extension. Registers commands and initializes configurations.
 * @param context The extension context.
 */
export function activate(context: vscode.ExtensionContext): void {
	NonAsciiHandler.ensureConfigurationExists();

	const escapeCommandDisposable = vscode.commands.registerCommand('extension.escapenonasciitomd', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		const range = NonAsciiHandler.getRangeForEditor(editor);
		const text = editor.document.getText(range);
		const mapping = vscode.workspace.getConfiguration('escape-non-ascii-to-md').get('characterMapping', {});
		const newText = NonAsciiHandler.replaceWithMappedChars(text, mapping);

		editor.edit(editBuilder => editBuilder.replace(range, newText));

		// Clear any existing decorations after replacing non-ASCII characters
		NonAsciiHandler.clearInvalidCharDecorations(editor);
	});

	const detectInvalidCharsDisposable = vscode.commands.registerCommand('extension.detectinvalidchars', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		NonAsciiHandler.detectInvalidChars(editor);
	});

	const clearInvalidCharDecorationsDisposable = vscode.commands.registerCommand('extension.clearinvalidchardecorations', () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) { return; }

		NonAsciiHandler.clearInvalidCharDecorations(editor);
	});

	context.subscriptions.push(escapeCommandDisposable, detectInvalidCharsDisposable, clearInvalidCharDecorationsDisposable);
}

/**
 * Deactivation logic for the extension. This function is called when the extension is deactivated.
 */
export function deactivate(): void { }
