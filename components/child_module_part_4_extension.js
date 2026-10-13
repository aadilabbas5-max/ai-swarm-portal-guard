// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 4
// Mapped contextual parent index node: extension.js

            saveDebounceTimers.delete(document.fileName);
            executeFileAuditPass(document.fileName, document.getText(), 'AUTO_SAVE_AUDIT');
        }, 50);
        saveDebounceTimers.set(document.fileName, timer);
    });

    let scanCommand = vscode.commands.registerCommand('swarmPlatform.scanCredentials', () => {
        const editor = vscode.window.activeTextEditor;