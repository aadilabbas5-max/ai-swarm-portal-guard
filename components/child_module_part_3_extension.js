// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 3
// Mapped contextual parent index node: extension.js

        // Strict boundary scopes filtering out system git internals and non-file blocks
        if (document.uri.scheme !== 'file' || /[\\/]\.git[\\/]/.test(document.fileName)) return;
        
        const filename = document.fileName.split(/[\\/]/).pop();
        const codePayload = document.getText();
        
        updateStatusBarState('scanning');
        dispatchToSwarmServer(filename, codePayload, 'AUTO_SAVE_AUDIT');