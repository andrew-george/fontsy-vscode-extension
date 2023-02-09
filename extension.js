const { commands, workspace, window } = require('vscode')

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
		const input = await window.showQuickPick([
			'100',
			'200',
			'300',
			'400 (Normal)',
			'500',
			'600 (Bold)',
			'700',
			'800',
			'900',
		])
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
		setTerminalFontFamily
	)
}

function deactivate() {}

module.exports = {
	activate,
	deactivate,
}
