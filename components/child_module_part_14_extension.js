// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 14
// Mapped contextual parent index node: extension.js

                    updateStatusBarState('blocked');
                    vscode.window.showErrorMessage(`🚨 [SWARM REVIEW BLOCK]: ${jsonRes.details}`);
                } else if (jsonRes.status === 'PASSED') {
                    updateStatusBarState('passed');
                } else {
                    updateStatusBarState('blocked');
                    vscode.window.showWarningMessage('⚠️ Warning: Swarm returned unverified status metadata properties.');
                }