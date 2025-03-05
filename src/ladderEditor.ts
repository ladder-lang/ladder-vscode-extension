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

    public async resolveCustomTextEditor(
		document: vscode.TextDocument,
		panel: vscode.WebviewPanel,
		_token: vscode.CancellationToken
	): Promise<void> {

		panel.webview.options = {
		  enableScripts: true,
		};

		const scriptUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'node_modules', 'ladder-react-components', 'dist', 'assets', 'main-Cqthm7i3.js'));
		const styleUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'node_modules', 'ladder-react-components', 'dist', 'assets', 'main-B2Kz5wtG.css'));
		panel.webview.html = `
			<!doctype html>
			<html lang="en">
			  <head>
				<meta charset="UTF-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
				<link rel="stylesheet" href="${styleUri}">
				<script type="module" crossorigin src="${scriptUri}"></script>
			  </head>
			  <body>
				<div id="root"></div>
				<script>
					const target = document.getElementById("root");
					target.addEventListener("dragover", (event) => {
				    	event.preventDefault();
					});
					const vscode = acquireVsCodeApi();
					target.addEventListener("drop", (event) => {
	  				    event.preventDefault();
						vscode.postMessage("x");
					});
					window.addEventListener("message", ev => {
                    	console.log(ev.data);
                  	});
				</script>
			  </body>
			</html>
		`;
		panel.webview.onDidReceiveMessage(
			_ => {
				panel.webview.postMessage(
					this.context.workspaceState.get('node')
				);
			}
		);
	}
}