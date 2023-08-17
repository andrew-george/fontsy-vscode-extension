const { commands, window, workspace } = require('vscode')
const path = require('path')
const fs = require('fs')

const minFontSize = 1
const maxFontSize = Number.MAX_SAFE_INTEGER

function activate(context) {
	// Editor Font Size
	let increaseEditorFontSize = commands.registerCommand('fontsy.increaseEditorFontSize', () => {
		const config = workspace.getConfiguration()
		const currentFontSize = config.get('editor.fontSize')
		const step = config.get('fontsy.step') || 1
		const increasedSize = Math.min(maxFontSize, currentFontSize + step)
		return config.update('editor.fontSize', increasedSize, true)
	})

	let decreaseEditorFontSize = commands.registerCommand('fontsy.decreaseEditorFontSize', () => {
		const config = workspace.getConfiguration()
		const currentFontSize = config.get('editor.fontSize')
		const step = config.get('fontsy.step') || 1
		const decreasedSize = Math.max(minFontSize, currentFontSize - step)
		return config.update('editor.fontSize', decreasedSize, true)
	})

	let resetEditorFontSize = commands.registerCommand('fontsy.resetEditorFontSize', () => {
		const config = workspace.getConfiguration()
		return config.update('editor.fontSize', config.get('fontsy.defaultEditorFontSize') || 16, true)
	})

	// Terminal Font Size
	let increaseTerminalFontSize = commands.registerCommand('fontsy.increaseTerminalFontSize', () => {
		const config = workspace.getConfiguration()
		const currentFontSize = config.get('terminal.integrated.fontSize')
		const step = config.get('fontsy.step') || 1
		const increasedSize = Math.min(maxFontSize, currentFontSize + step)
		return config.update('terminal.integrated.fontSize', increasedSize, true)
	})

	let decreaseTerminalFontSize = commands.registerCommand('fontsy.decreaseTerminalFontSize', () => {
		const config = workspace.getConfiguration()
		const currentFontSize = config.get('terminal.integrated.fontSize')
		const step = config.get('fontsy.step') || 1
		const decreasedSize = Math.max(minFontSize, currentFontSize - step)
		return config.update('terminal.integrated.fontSize', decreasedSize, true)
	})

	let resetTerminalFontSize = commands.registerCommand('fontsy.resetTerminalFontSize', () => {
		const config = workspace.getConfiguration()
		return config.update('terminal.integrated.fontSize', config.get('fontsy.defaultTerminalFontSize') || 14, true)
	})

	// set constants
	let setStep = commands.registerCommand('fontsy.setStep', async () => {
		const input = await window.showInputBox()
		if (!input) return
		const config = workspace.getConfiguration()
		return config.update('fontsy.step', +input, true)
	})
	let setDefaultEditorFontSize = commands.registerCommand('fontsy.setDefaultEditorFontSize', async () => {
		const input = await window.showInputBox()
		if (!input) return
		const config = workspace.getConfiguration()
		return config.update('fontsy.defaultEditorFontSize', +input, true)
	})
	let setDefaultTerminalFontSize = commands.registerCommand('fontsy.setDefaultTerminalFontSize', async () => {
		const input = await window.showInputBox()
		if (!input) return
		const config = workspace.getConfiguration()
		return config.update('fontsy.defaultTerminalFontSize', +input, true)
	})

	// font weight
	let setFontWeight = commands.registerCommand('fontsy.setFontWeight', async () => {
		const input = await window.showQuickPick(['100', '200', '300', '400', '500', '600', '700', '800', '900'])
		if (!input) return
		const config = workspace.getConfiguration()
		return config.update('editor.fontWeight', input, true)
	})

	// font ligatures
	let toggleFontLigatures = commands.registerCommand('fontsy.toggleFontLigatures', () => {
		const config = workspace.getConfiguration()
		const ligaturesIsSet = config.has('editor.fontLigatures')

		if (ligaturesIsSet) {
			const currentState = config.get('editor.fontLigatures')
			return config.update('editor.fontLigatures', !currentState, true)
		} else {
			return config.update('editor.fontLigatures', true, true)
		}
	})

	// font family
	//editor
	let setEditorFontFamily = commands.registerCommand('fontsy.setEditorFontFamily', async () => {
		const input = await window.showInputBox()
		if (!input) return
		const config = workspace.getConfiguration()
		return config.update('editor.fontFamily', input, true)
	})

	//terminal
	let setTerminalFontFamily = commands.registerCommand('fontsy.setTerminalFontFamily', async () => {
		const input = await window.showInputBox()
		if (!input) return
		const config = workspace.getConfiguration()
		return config.update('terminal.integrated.fontFamily', input, true)
	})

	// UI
	async function patchUIFont(styleMarkup, regex) {
		const basePath = path.dirname(require.main.filename)
		const workbenchRelativePath = '/vs/code/electron-sandbox/workbench/workbench.html'
		const workbenchPath = [basePath, workbenchRelativePath].join('')
		const html = fs.readFileSync(workbenchPath, 'utf8')

		let newHtml = ''

		if (html.match(regex)) {
			newHtml = html.replace(regex, styleMarkup)
		} else {
			newHtml = html.replace('</head>', styleMarkup + '</head>')
		}

		fs.writeFileSync(workbenchPath, newHtml)
		window.showInformationMessage('Please reload window to apply UI font change !')
	}

	//UI Font Family
	let setUIFontFamily = commands.registerCommand('fontsy.setUIFontFamily', async () => {
		const font = await window.showInputBox()
		if (!font) return

		const styleMarkup = `<style>
			.mac, .windows, .linux {font-family: "${font}" !important;}
			</style>`

		const fontFamilyRegex =
			/<style>\s*\.mac,\s*\.windows,\s*\.linux\s*{\s*font-family\s*:\s*(.*)\s*;\s*}\s*<\/style>/gim

		patchUIFont(styleMarkup, fontFamilyRegex)
		return
	})

	//UI Font Weight
	let setUIFontWeight = commands.registerCommand('fontsy.setUIFontWeight', async () => {
		const weight = await window.showQuickPick(['100', '200', '300', '400', '500', '600', '700', '800', '900'])
		if (!weight) return

		const styleMarkup = `<style>
			.mac, .windows, .linux {font-weight: ${weight} !important;}
			</style>`

		const fontWeightRegex =
			/<style>\s*\.mac,\s*\.windows,\s*\.linux\s*{\s*font-weight\s*:\s*(.*)\s*;\s*}\s*<\/style>/gim

		patchUIFont(styleMarkup, fontWeightRegex)
		return
	})

	context.subscriptions.push(
		increaseEditorFontSize,
		decreaseEditorFontSize,
		resetEditorFontSize,
		increaseTerminalFontSize,
		decreaseTerminalFontSize,
		resetTerminalFontSize,
		setStep,
		setDefaultEditorFontSize,
		setDefaultTerminalFontSize,
		setFontWeight,
		toggleFontLigatures,
		setEditorFontFamily,
		setTerminalFontFamily,
		setUIFontFamily,
		setUIFontWeight
	)
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
}
