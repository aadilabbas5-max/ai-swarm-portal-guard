// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 14
// Mapped contextual parent index node: extension.js

        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            if (currentSequence !== scanSequenceCounter) return;
            
            if (res.statusCode !== 200) {
                updateStatusBarState('offline');
                return;