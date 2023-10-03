# Change Log

All notable changes to the "EscapeNonAsciiToMD" extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.1.0] - Unreleased

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

