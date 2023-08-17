# Fontsy

A simple extension to control your fonts everywhere in vscode

## Features

- Control Editor Font Size

- Control Terminal Font **Size**

- Setting a step setting for incrementing and decrementing

- Control font family

- Control font weight

- Control font ligatures

- Change VSCode UI font family

- Change VSCode UI font weight

![Command Palette](<assets/command-palette(1.1.0).png>)

## Extension Settings

Settings can be added through settings.json

```json

// the default editor font size that is used on a font size reset

"fontsy.defaultEditorFontSize": 18,   // default is 16



// the default terminal font size that is used on a font size reset

"fontsy.defaultTerminalFontSize": 16, // default is 14



// the increment or decrement step for a font size change

"fontsy.step": 0.5                    //default is 1

```

or edited through settings

![](<assets/settings(1.1.0).png>)

## Keybindings

Some commands are pre-assigned and some are not. You can edit and assign your keybindings (Ctrl+K Ctrl+S) of choice or use the commands from Command Pallete
(Ctrl+Shift+P)
![](<assets/keybindings(1.1.0).png>)

## Known Issues

- With small step decimals produces funny behaviours with some fonts which struggle with decimal font sizes

---

### Credits

- Inspired from [FontSize shortcuts](https://github.com/caaatisgood/vsc-fontsize-shortcuts) extension by [Hao-Ping](https://github.com/caaatisgood)
- UI font family functionality [Fonted](https://github.com/blackmann/fonted) extension by [blackmann](https://github.com/blackmann)
