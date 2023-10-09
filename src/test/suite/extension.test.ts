import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import { NonAsciiHandler } from '../../extension';

/**
 * Counts the non-ASCII characters in a given string.
 * @param str - Input string to be analyzed.
 * @returns Number of non-ASCII characters in the string.
 */
const countNonASCIIChars = (str: string): number => 
    [...str].filter(char => char.charCodeAt(0) > 127).length;

/**
 * Reads and returns the character mapping from characterMapping.json file.
 * @returns The character mapping as a dictionary.
 */
const getCharacterMapping = (): Record<string, string> => {
    const rootDirectory = path.resolve(__dirname, '..', '..', '..');
    const mappingPath = path.join(rootDirectory, 'src', 'characterMapping.json');
    return JSON.parse(fs.readFileSync(mappingPath, 'utf8')) as Record<string, string>;
};

/**
 * Creates a mock editor with given content.
 * @param content - The content to be loaded into the mock editor.
 * @returns A mocked editor instance.
 */
const createMockEditor = (content: string): any => {
    const lines = content.split('\n');
    const decorations: any[] = [];
    return {
        document: {
            getText: () => content,
            positionAt: (offset: number) => {
                return {
                    line: lines.slice(0, offset).length - 1,
                    character: lines.slice(0, offset).pop()?.length || 0
                };
            },
            lineAt: (line: number) => {
                return {
                    range: {
                        start: {
                            line: line,
                            character: 0
                        },
                        end: {
                            line: line,
                            character: lines[line].length
                        }
                    }
                };
            }
        },
        setDecorations: (decorationType: any, ranges: any[]) => {
            decorations.push({ decorationType, ranges });
        },
        getHighlightedRanges: () => decorations,
    };
};

suite('Extension Test Suite', () => {
    let input: string, expectedOutput: string, mapping: Record<string, string>;

    /** 
     * Setup for tests. Initializes variables.
     */
    setup(() => {
        input = `Lorem ipsum dolor sit âmét, consectetur âdipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        
        Ut enim âd minim veniam, quis nostrud exercitation ullamco laboris nisi ut âliquip ex ea commodo consequat.`;

        expectedOutput = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

        mapping = getCharacterMapping();
    });

    /**
     * Test to check the character replacement functionality.
     */
    test('Replace With Mapped Chars', () => {
        const result = NonAsciiHandler.replaceWithMappedChars(input, mapping);
        assert.strictEqual(result, expectedOutput);
    });

    /**
     * Test to verify the count of non-ASCII characters replaced.
     */
    test('Verify Non-ASCII Char Replacement Count', () => {
        const initialNonASCIIChars = countNonASCIIChars(input);
        const postReplacementNonASCIIChars = countNonASCIIChars(NonAsciiHandler.replaceWithMappedChars(input, mapping));
        
        assert.strictEqual(initialNonASCIIChars - postReplacementNonASCIIChars, 5);
    });

    /**
     * Test to verify the detection and highlighting of non-ASCII characters.
     */
    test('Detect Invalid Chars', () => {
        // Using the mock editor for testing the `detectInvalidChars` function.
        const mockEditor = createMockEditor(input);
        NonAsciiHandler.detectInvalidChars(mockEditor);
    
        const highlightedDecorations = mockEditor.getHighlightedRanges().filter((dec: any) => dec.decorationType === NonAsciiHandler.highlightDecorationType);
        const highlightedRanges = highlightedDecorations.flatMap((dec: any) => dec.ranges);
    
        assert.strictEqual(highlightedRanges.length, 5); // We expect 5 non-ASCII characters to be highlighted.
    });    
});
