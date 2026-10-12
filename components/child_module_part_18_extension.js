// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 18
// Mapped contextual parent index node: extension.js


    req.on('timeout', () => {
        req.destroy(new Error('timeout'));
    });

    req.on('error', () => {
        if (currentSequence !== scanSequenceCounter) return;
        updateStatusBarState('offline');