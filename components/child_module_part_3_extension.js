// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 3
// Mapped contextual parent index node: extension.js

    swarmStatusBarItem.show();
    context.subscriptions.push(swarmStatusBarItem);

    // ⚡ MASTER SAVE HOOK PIPELINE
    let saveHook = vscode.workspace.onDidSaveTextDocument((document) => {
        if (document.uri.scheme !== 'file' || /[\\/]\.git[\\/]/.test(document.fileName)) return;
        
        if (saveDebounceTimers.has(document.fileName)) {