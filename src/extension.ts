import * as vscode from 'vscode';
import { LadderEditorProvider } from './ladderEditor';
import { NodesViewProvider } from './ladderNodesView';

// use ExtensionContext.workspaceState for dnd context

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(NodesViewProvider.register(context));
	context.subscriptions.push(LadderEditorProvider.register(context));
}
