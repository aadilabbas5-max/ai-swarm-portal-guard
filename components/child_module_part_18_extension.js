// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 18
// Mapped contextual parent index node: extension.js

    req.on('timeout', () => { req.destroy(new Error('timeout')); });
    req.on('error', () => {
        if (latestScanForFile.get(filePath) !== currentSeq) return;
        updateStatusBarState('offline');
    });

    req.write(data);
    req.end();