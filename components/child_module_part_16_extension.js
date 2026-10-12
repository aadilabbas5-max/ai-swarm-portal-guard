// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 16
// Mapped contextual parent index node: extension.js

                    // Native per-file diagnostic collection highlighting problem line areas
                    let range = new vscode.Range(0, 0, 0, 40);
                    let diagnostic = new vscode.Diagnostic(range, `[SWARM BLOCK]: ${jsonRes.details}`, vscode.DiagnosticSeverity.Error);
                    diagnosticCollection.set(fileUri, [diagnostic]);
                    
                    vscode.window.showErrorMessage(`🚨 [SWARM REVIEW BLOCK]: ${jsonRes.details}`);
                } else if (jsonRes.status === 'PASSED') {
                    diagnosticCollection.delete(fileUri); // Wipe out file markings immediately upon safe correction