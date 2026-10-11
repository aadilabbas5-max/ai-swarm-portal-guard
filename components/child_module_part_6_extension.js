// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 6
// Mapped contextual parent index node: extension.js


    // 🛡️ SKILL #9: THE DEVSECOPS CREDENTIAL AUDIT CONTEXT COMMAND
    let scanCommand = vscode.commands.registerCommand('swarmPlatform.scanCredentials', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        const textSelection = editor.document.getText(editor.selection);
        const filename = editor.document.fileName.split(/[\\/]/).pop();
