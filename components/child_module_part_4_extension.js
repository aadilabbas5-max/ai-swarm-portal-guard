// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 4
// Mapped contextual parent index node: extension.js

            clearTimeout(saveDebounceTimers.get(document.fileName));
        }

        let timer = setTimeout(() => {
            saveDebounceTimers.delete(document.fileName);
            executeFileAuditPass(document.fileName, document.getText(), 'AUTO_SAVE_AUDIT');
        }, 50);
        saveDebounceTimers.set(document.fileName, timer);