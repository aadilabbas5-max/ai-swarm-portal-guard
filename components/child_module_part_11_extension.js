// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 11
// Mapped contextual parent index node: extension.js

                    updateStatusBarState('blocked');
                    vscode.window.showErrorMessage(`🚨 [SWARM REVIEW BLOCK]: ${jsonRes.details}`);
                } else if (jsonRes.status === 'PASSED') {
                    updateStatusBarState('passed');
                }
            } catch (e) {
                updateStatusBarState('offline');
            }