// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 6
// Mapped contextual parent index node: extension.js

        if (!editor) return;
        const textSelection = editor.document.getText(editor.selection);
        if (!textSelection) return;
        executeFileAuditPass(editor.document.fileName, textSelection, 'CREDENTIAL_SCAN');
    });

    context.subscriptions.push(saveHook, sliceCommand, scanCommand);
}