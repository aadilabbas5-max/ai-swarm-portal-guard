// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 9
// Mapped contextual parent index node: extension.js


    // 📁 SKILL #7: THE COMPONENT SLICER CONTEXT COMMAND
    let sliceCommand = vscode.commands.registerCommand('swarmPlatform.sliceComponent', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        const textSelection = editor.document.getText(selection);