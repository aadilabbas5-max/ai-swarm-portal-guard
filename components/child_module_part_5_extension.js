// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 5
// Mapped contextual parent index node: extension.js

        if (!editor) return;
        const textSelection = editor.document.getText(editor.selection);
        if (!textSelection) return;
        executeFileAuditPass(editor.document.fileName, textSelection, 'SLICE_FRAGMENTATION');
    });

    let scanCommand = vscode.commands.registerCommand('swarmPlatform.scanCredentials', () => {
        const editor = vscode.window.activeTextEditor;