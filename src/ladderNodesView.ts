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

  public resolveWebviewView(panel: vscode.WebviewView) {

    panel.webview.options = {
      enableScripts: true,
    };

    const scriptUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'node_modules', 'ladder-react-components', 'dist', 'assets', 'nodes-2DmHzO7m.js'));
    const styleUri = panel.webview.asWebviewUri(vscode.Uri.joinPath(this.context.extensionUri, 'node_modules', 'ladder-react-components', 'dist', 'assets', 'nodes-C4XB51Di.css'));
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
                <div id="root" draggable="true"></div>
                <script>
                  window.addEventListener("DOMContentLoaded", () => {
                    const element = document.getElementById("root");
                    const vscode = acquireVsCodeApi();
                    element.addEventListener("dragstart", ev => {
                      vscode.postMessage("sam");
                    });
                  });
                </script>
              </body>
            </html>
        `;

    panel.webview.onDidReceiveMessage(
      message => {
        this.context.workspaceState.update('node', message);
      }
    );
  }
}