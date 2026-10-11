// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 3
// Mapped contextual parent index node: extension.js

    let saveHook = vscode.workspace.onDidSaveTextDocument((document) => {
        // Exclude system logs or non-code configurations from looping checks
        if (document.fileName.endsWith('.git') || document.fileName.endsWith('.ignore')) return;
        
        const filename = document.fileName.split(/[\\/]/).pop();
        const codePayload = document.getText();
        
        updateStatusBarState('scanning');