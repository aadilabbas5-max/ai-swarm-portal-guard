// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 5
// Mapped contextual parent index node: extension.js

        const filename = editor.document.fileName.split(/[\\/]/).pop();

        if (!textSelection) {
            vscode.window.showWarningMessage('Richmond: Highlight a block selection to initialize the Slicer Agent.');
            return;
        }
        dispatchToSwarmServer(filename, textSelection, 'SLICE_FRAGMENTATION');
    });