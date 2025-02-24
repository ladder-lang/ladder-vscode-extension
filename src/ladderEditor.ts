import * as vscode from 'vscode';

export class LadderEditorProvider implements vscode.CustomTextEditorProvider {

	public static register(context: vscode.ExtensionContext): vscode.Disposable {
		const provider = new LadderEditorProvider(context);
		const providerRegistration = vscode.window.registerCustomEditorProvider(LadderEditorProvider.viewType, provider);
		return providerRegistration;
	}

	private static readonly viewType = 'ladder.editor';

    constructor(
		private readonly context: vscode.ExtensionContext
	) { }

    public async resolveCustomTextEditor() {}
}