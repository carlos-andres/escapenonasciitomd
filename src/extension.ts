import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

/**
 * Path to the default character mapping JSON file.
 */
const characterMappingFilePath = path.join(__dirname, '..', 'src', 'characterMapping.json');

/**
 * Replaces characters in the provided text using the predefined character mapping.
 * 
 * @param text - The input string containing characters to be replaced.
 * @returns The processed string with special characters replaced.
 */
export function replaceWithMappedChars(text: string, mapping: Record<string, string>): string {
    return text.replace(/[^\x00-\x7F]/g, matchedChar => mapping[matchedChar] || ' ');
}

/**
 * Determines the range of text to process in the active editor. If a portion of the text is selected,
 * it returns the range of the selection. Otherwise, it returns the range of the entire document.
 * 
 * @param editor - The active text editor.
 * @returns The range of text to be processed.
 */
function getRangeForEditor(editor: vscode.TextEditor): vscode.Range {
    const document = editor.document;
    if (editor.selection.isEmpty) {
        return new vscode.Range(document.positionAt(0), document.positionAt(document.getText().length));
    }
    return new vscode.Range(editor.selection.start, editor.selection.end);
}

/**
 * Activate the extension. Registers the command to escape non-ASCII characters and
 * adds it to the context's subscriptions.
 * 
 * @param context - The extension context.
 */
export function activate(context: vscode.ExtensionContext): void {
    // Load the default configuration if needed
    const currentMapping = vscode.workspace.getConfiguration('escape-non-ascii-to-md').get('characterMapping', {});
    if (Object.keys(currentMapping).length === 0) {
        const defaultMapping: Record<string, string> = JSON.parse(fs.readFileSync(characterMappingFilePath, 'utf8'));
        vscode.workspace.getConfiguration('escape-non-ascii-to-md').update('characterMapping', defaultMapping, vscode.ConfigurationTarget.Global);
    }

    const disposable = vscode.commands.registerCommand('extension.escapenonasciitomd', async () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) { return; }

        const range = getRangeForEditor(editor);
        const text = editor.document.getText(range);

        // Fetch the current character mapping configuration
        const mapping: Record<string, string> = vscode.workspace.getConfiguration('escape-non-ascii-to-md').get('characterMapping', {});
        
        const newText = replaceWithMappedChars(text, mapping);
        editor.edit(editBuilder => editBuilder.replace(range, newText));
    });

    context.subscriptions.push(disposable);
}

/**
 * Deactivate the extension. This function is called when the extension is deactivated.
 */
export function deactivate(): void { }
