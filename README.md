# Escape Non-ASCII to Markdown

The **Escape Non-ASCII to Markdown** extension for Visual Studio Code helps you replace non-ASCII characters in a document with markdown or HTML escape sequences. This can be especially useful for ensuring that your content renders correctly across various platforms and devices.

## Features

- **Easy-to-Use**: Simply activate the extension and replace non-ASCII characters directly in your active document.
- **Customizable Mappings**: Customize how characters are mapped using settings.

## How to Use

1. Install and activate the **Escape Non-ASCII to Markdown** extension.
2. Open a document with non-ASCII characters.
3. Run the command **Escape Non-ASCII to MD** from the command palette (`Ctrl+Shift+P` or `Cmd+Shift+P`).
4. The non-ASCII characters in your active document (or selected text) will be replaced according to the character mapping.

## Settings

You can customize the character mapping by adjusting the extension's settings. Here's how you can do it:

### JSON Format
The setting uses a JSON format to map non-ASCII characters to their desired markdown or HTML escape sequences.

**Example**:
```json
{
  "‑": "-",
  "–": "-",
  "—": "-",
  (...) 
}
```

In the above example, the left double quotation mark (“) is replaced with its HTML entity (&ldquo;), and the em dash (—) is replaced with a simple hyphen (-).

## Adding More Mappings

To add more mappings, you can edit the settings in VS Code:

1. Go to the settings (File > Preferences > Settings or Code > Preferences > Settings).
2. In the search bar, type `escape-non-ascii-to-md.characterMapping` or simple `escape-non-ascii-to-md`
3. Edit the JSON to add or modify the existing mappings. Ensure the JSON format is valid.

## Default Character Mapping

The extension comes with a default character mapping which includes a variety of commonly used non-ASCII characters. Here's a brief sample of the default mappings:

```json
{
  "‑": "-",
  "–": "-",
  "—": "-",
  "″": "&quot;",
  "“": "&ldquo;",
  "”": "&rdquo;",
  "‘": "&lsquo;",
  "’": "&rsquo;",
  "™": "&trade;",
  "®": "&reg;",
  "©": "&copy;",
  "µ": "&micro;",
  "·": "&middot;",
  "°": "&deg;",
  "º": "&ordm;",
  "ª": "&ordf;",
  "ß": "ss",
  "æ": "&aelig;",
  "œ": "&oelig;",
  "€": "&euro;",
  "£": "&pound;",
  "¥": "&yen;",
  "¢": "&cent;",
  "¿": "&iquest;",
  "¡": "&iexcl;",
  "÷": "/",
  "×": "x",
  "«": "&laquo;",
  "»": "&raquo;",
  "§": "&sect;",
  "¶": "&para;",
  "¤": "&curren;",
  "¦": "|",
  "¨": "&uml;",
  "¬": "&not;",
  "¯": "&macr;",
  "¸": "&cedil;",
  "´": "&acute;",
  "¹": "1",
  "²": "2",
  "³": "3",
  "¼": "&frac14;",
  "½": "&frac12;",
  "¾": "&frac34;",
  "â": "a",
  "á": "a",
  "à": "a",
  "ä": "a",
  "ã": "a",
  "ê": "e",
  "é": "e",
  "è": "e",
  "ë": "e",
  "í": "i",
  "î": "i",
  "ì": "i",
  "ï": "i",
  "ô": "o",
  "ó": "o",
  "ò": "o",
  "ö": "o",
  "õ": "o",
  "ú": "u",
  "û": "u",
  "ù": "u",
  "ü": "u"
}
```

