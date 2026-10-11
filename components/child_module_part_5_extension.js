// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 5
// Mapped contextual parent index node: extension.js

        res.on('end', () => {
            try {
                const jsonRes = JSON.parse(body);
                if (jsonRes.status === 'REJECTED') {
                    vscode.window.showErrorMessage(`🚨 [SWARM BLOCK]: ${jsonRes.details}`);
                } else {
                    vscode.window.showInformationMessage(`✅ [SWARM APPROVED]: Action verified clean via local multi-agent department core.`);
                }