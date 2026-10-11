// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 3
// Mapped contextual parent index node: extension.js

    swarmStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
    context.subscriptions.push(swarmStatusBarItem);

    // Set the default baseline tracking state on startup
    updateStatusBar('PASSED', '0 Hallucinations Caught');

    let onSaveDisposable = vscode.workspace.onDidSaveTextDocument(async (document) => {
        if (!['typescript', 'typescriptreact', 'javascript', 'javascriptreact', 'python'].includes(document.languageId)) {