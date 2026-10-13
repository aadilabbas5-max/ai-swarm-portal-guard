// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 14
// Mapped contextual parent index node: extension.js

            try {
                const jsonRes = JSON.parse(body);
                const fileUri = vscode.Uri.file(filePath);

                if (jsonRes.status === 'REJECTED') {
                    if (isFullFileSave) {
                        const matchedLine = Number.isInteger(jsonRes.line) ? jsonRes.line : 0;
                        const range = new vscode.Range(matchedLine, 0, matchedLine, 1000);