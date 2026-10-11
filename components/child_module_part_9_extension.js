// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 9
// Mapped contextual parent index node: extension.js

            res.on('end', () => {
                try {
                    const swarmResult = JSON.parse(responseBody);
                    
                    if (swarmResult.status === 'REJECTED') {
                        // ❌ SHARP CRIMSON INTERCEPTION: Update the Status Bar to alert the developer visually
                        updateStatusBar('REJECTED', 'Blocked (Bug/Malware Flagged)');
                        vscode.window.showErrorMessage(`🚨 [SWARM REVIEW BLOCK]: Hallucination or Bug caught inside ${filename}! Detail: ${swarmResult.details}`);