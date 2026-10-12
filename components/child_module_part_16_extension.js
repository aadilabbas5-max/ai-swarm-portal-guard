// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 16
// Mapped contextual parent index node: extension.js

                        let diagnostic = new vscode.Diagnostic(range, `[SWARM BLOCK]: ${jsonRes.details}`, vscode.DiagnosticSeverity.Error);
                        diagnosticCollection.set(fileUri, [diagnostic]);
                    }
                    vscode.window.showErrorMessage(`🚨 [SWARM REVIEW BLOCK]: ${jsonRes.details}`);
                    refreshStatusBarUI();
                } else if (jsonRes.status === 'PASSED') {
                    if (isFullFileSave) diagnosticCollection.delete(fileUri); // Context commands never clear full-file markers
                    let clearLabel = jsonRes.llm_checked ? "🛡️ Swarm: Secure" : "🛡️ Swarm: Secure (Signatures Only)";