// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 14
// Mapped contextual parent index node: extension.js

        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            if (latestScanForFile.get(filePath) !== currentSeq) return; // Isolated per-file stale discard check
            
            if (res.statusCode !== 200) {
                updateStatusBarState('offline');
                return;
            }