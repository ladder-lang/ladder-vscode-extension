import * as vscode from 'vscode';

export class NodesViewProvider implements vscode.WebviewViewProvider {

    public static register(context: vscode.ExtensionContext): vscode.Disposable {
        const provider = new NodesViewProvider(context);
        const providerRegistration = vscode.window.registerWebviewViewProvider(NodesViewProvider.viewType, provider);
        return providerRegistration;
    }

    private static readonly viewType = 'ladder.nodes';

    constructor(
        private readonly context: vscode.ExtensionContext
    ) { }

    public resolveWebviewView(webviewView: vscode.WebviewView) {

        webviewView.webview.options = {
          enableScripts: true,
        };

        const scriptUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'node_modules', 'ladder-react-components', 'dist', 'assets', 'index-BeSGESaP.js'));
        const styleUri = webviewView.webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'node_modules', 'ladder-react-components', 'dist', 'assets', 'index-kQJbKSsj.css'));
        webviewView.webview.html = `
            <!doctype html>
            <html lang="en">
              <head>
                <meta charset="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <script type="module" crossorigin src="${scriptUri}"></script>
              </head>
              <body>
                <div id="root"></div>
              </body>
            </html>
        `;
    }
}