// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 12
// Mapped contextual parent index node: extension.js

        const selection = editor.selection;
        const textSelection = editor.document.getText(selection);
        const filename = editor.document.fileName.split(/[\\/]/).pop();

        if (!textSelection) {
            vscode.window.showWarningMessage('⚠️ Please highlight a text block selection to run a targeted cryptographic audit.');
            return;
        }