// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 7
// Mapped contextual parent index node: extension.js

    let scanCommand = vscode.commands.registerCommand('swarmPlatform.scanCredentials', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        const textSelection = editor.document.getText(editor.selection);
        if (!textSelection) {
            vscode.window.showWarningMessage('Highlight a block selection to execute a credential scan.');
            return;
        }