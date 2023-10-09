# Change Log

All notable changes to the "EscapeNonAsciiToMD" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.5] - 

### Added
- Added **Clear Highlighted Non-ASCII Characters** feature, allowing users to clear the highlighting of non-ASCII characters after detection.
- New command `Clear Invalid Char Decorations` added to the command palette to clear the highlighting of detected non-ASCII characters (ID: `extension.clearInvalidCharDecorations`).

### Changed
- Modified the `Detect Invalid Characters` feature to provide a more detailed view of each non-ASCII character upon detection.

## [0.2.0] - 

### Added
- Enhanced visual feedback for lines containing non-ASCII characters.
  - Added a red circle SVG icon in the gutter (numbers column) of lines with non-ASCII characters.
- Introduced `highlightDecorationType` to apply a visual style (orange background with bold black text) for detected non-ASCII characters.
- New command `Detect Invalid Chars` that highlights non-ASCII characters in the active editor (ID: `extension.detectinvalidchars`).
- Added a `detectInvalidChars` function that identifies and highlights non-ASCII characters in the provided text editor.

### Changed
- Updated the SVG data encoding for gutter icons to be more efficient with base64 encoding.
- Improved error handling for the default character mapping loading process.

### Fixed
- Resolved the issue with highlight text color where non-ASCII characters were not displayed with white text on a red background.

## [0.1.0] - 

### Added
- Initial release of the "EscapeNonAsciiToMD" extension.
- Core functionality to replace non-ASCII characters in a document with markdown or HTML escape sequences.
- Settings to customize the character mapping (`escape-non-ascii-to-md.characterMapping`).
- Default character mapping fetched from `characterMapping.json` in the `src` directory.
- Command `Escape Non-ASCII to MD` that can be triggered from the command palette (ID: `extension.escapenonasciitomd`).
- Proper handling of active text editor selections.
- Functions:
  - `replaceWithMappedChars` to perform the core character replacement.
  - `getRangeForEditor` to determine the range of text to process in the active editor.
- Activation and deactivation functions for the extension (`activate` and `deactivate`).

### Fixed

(Any fixed issues or bugs will be listed here in future updates)

### Changed

(Any changes in existing features or improvements will be listed here in future updates)

### Removed

(Any removed features will be listed here in future updates)

### Deprecated

(Any deprecated features will be listed here in future updates)
