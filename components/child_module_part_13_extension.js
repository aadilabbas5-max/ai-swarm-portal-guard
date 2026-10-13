// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 13
// Mapped contextual parent index node: extension.js

                const jsonRes = JSON.parse(body);
                const fileUri = vscode.Uri.file(filePath);

                if (jsonRes.status === 'REJECTED') {
                    if (isFullFileSave) {
                        const matchedLine = Number.isInteger(jsonRes.line) ? jsonRes.line : 0;
                        const range = new vscode.Range(matchedLine, 0, matchedLine, 1000);
                        let diagnostic = new vscode.Diagnostic(range, `[SWARM BLOCK]: ${jsonRes.details}`, vscode.DiagnosticSeverity.Error);