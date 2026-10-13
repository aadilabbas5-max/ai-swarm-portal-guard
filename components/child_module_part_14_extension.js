// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 14
// Mapped contextual parent index node: extension.js

                        diagnosticCollection.set(fileUri, [diagnostic]);
                    }
                    vscode.window.showErrorMessage(`🚨 [SWARM REVIEW BLOCK]: ${jsonRes.details}`);
                    refreshStatusBarUI('', true);
                } else if (jsonRes.status === 'PASSED') {
                    if (isFullFileSave) diagnosticCollection.delete(fileUri);
                    let clearLabel = jsonRes.llm_checked ? "🛡️ Swarm: Secure" : "🛡️ Swarm: Secure (Signatures Only)";
                    refreshStatusBarUI(clearLabel, false);