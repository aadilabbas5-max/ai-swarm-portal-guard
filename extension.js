const vscode = require('vscode');
const http = require('http');

/**
 * Helper function to dispatch text payloads to our headless Flask multi-agent core
 */
function dispatchToSwarmServer(filename, codePayload, targetAction) {
    const config = vscode.workspace.getConfiguration('swarmPlatform');
    const host = config.get('serverHost') || 'localhost';
    const port = config.get('serverPort') || 5000;

    const data = JSON.stringify({
        filename: filename,
        code: codePayload,
        action: targetAction
    });

    const options = {
        hostname: host,
        port: port,
        path: '/api/analyze',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': data.length
        },
        timeout: 4000
    };

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            try {
                const jsonRes = JSON.parse(body);
                if (jsonRes.status === 'REJECTED') {
                    vscode.window.showErrorMessage(`🚨 [SWARM BLOCK]: ${jsonRes.details}`);
                } else {
                    vscode.window.showInformationMessage(`✅ [SWARM APPROVED]: Action verified clean via local multi-agent department core.`);
                }
            } catch (e) {
                vscode.window.showWarningMessage('⚠️ Swarm server communication parsed non-JSON string headers.');
            }
        });
    });

    req.on('error', (err) => {
        vscode.window.showErrorMessage(`❌ Ingestion pipeline network dropped: ${err.message}`);
    });

    req.on('timeout', () => {
        req.destroy();
        vscode.window.showErrorMessage('❌ Swarm server processing link timed out.');
    });

    req.write(data);
    req.end();
}

/**
 * Primary activation event loop mounting our context menu command subscriptions
 */
function activate(context) {
    console.log('👑 AI Swarm Anti-Hallucination Extension Command Bridge Activated.');

    // 📁 SKILL #7: THE COMPONENT SLICER CONTEXT COMMAND
    let sliceCommand = vscode.commands.registerCommand('swarmPlatform.sliceComponent', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        const textSelection = editor.document.getText(selection);
        const filename = editor.document.fileName.split(/[\\/]/).pop();

        if (!textSelection) {
            vscode.window.showWarningMessage('⚠️ Please highlight a text block selection first to initialize the slicer agent.');
            return;
        }

        vscode.window.showInformationMessage('⚡ Initializing dynamic child component fragmentation sweep...');
        dispatchToSwarmServer(filename, textSelection, 'SLICE_FRAGMENTATION');
    });

    // 🛡️ SKILL #9: THE DEVSECOPS CREDENTIAL AUDIT CONTEXT COMMAND
    let scanCommand = vscode.commands.registerCommand('swarmPlatform.scanCredentials', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;

        const selection = editor.selection;
        const textSelection = editor.document.getText(selection);
        const filename = editor.document.fileName.split(/[\\/]/).pop();

        if (!textSelection) {
            vscode.window.showWarningMessage('⚠️ Please highlight a text block selection to run a targeted cryptographic audit.');
            return;
        }

        vscode.window.showInformationMessage('🛡️ Agent #9 (DevSecOps) sweeping highlighted string context tokens...');
        dispatchToSwarmServer(filename, textSelection, 'CREDENTIAL_SCAN');
    });

    context.subscriptions.push(sliceCommand, scanCommand);
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
};
