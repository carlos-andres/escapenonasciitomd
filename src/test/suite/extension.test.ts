import * as assert from 'assert';
import * as fs from 'fs';
import * as path from 'path';
import { replaceWithMappedChars } from '../../extension';

// Utility function to get a count of non-ASCII characters in a string
const countNonASCIIChars = (str: string) => 
    [...str].filter(char => char.charCodeAt(0) > 127).length;

// Utility function to get the mapping from the characterMapping.json file
const getCharacterMapping = () => {
    const rootDirectory = path.resolve(__dirname, '..', '..', '..');
    const mappingPath = path.join(rootDirectory, 'src', 'characterMapping.json');
    return JSON.parse(fs.readFileSync(mappingPath, 'utf8')) as Record<string, string>;
};

suite('Extension Test Suite', () => {
    let input: string, expectedOutput: string, mapping: Record<string, string>;

    // Setup runs before each test in the suite
    setup(() => {
        input = `Lorem ipsum dolor sit âmét, consectetur âdipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        
        Ut enim âd minim veniam, quis nostrud exercitation ullamco laboris nisi ut âliquip ex ea commodo consequat.`;

        expectedOutput = `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.`;

        mapping = getCharacterMapping();
    });

    test('Replace With Mapped Chars', () => {
        const result = replaceWithMappedChars(input, mapping);
        assert.strictEqual(result, expectedOutput);
    });

    test('Verify Non-ASCII Char Replacement Count', () => {
        const initialNonASCIIChars = countNonASCIIChars(input);
        const postReplacementNonASCIIChars = countNonASCIIChars(replaceWithMappedChars(input, mapping));
        
        assert.strictEqual(initialNonASCIIChars - postReplacementNonASCIIChars, 5);
    });
});
