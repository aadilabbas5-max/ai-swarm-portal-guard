const vscode = require('vscode');
const http = require('http');

let swarmStatusBarItem;

function activate(context) {
    console.log('👑 AI Swarm Anti-Hallucination Extension Command Bridge Activated.');

    // Construct the live, pulsing status bar item anchor natively
    swarmStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    swarmStatusBarItem.text = "\$(shield) Swarm: Active";
    swarmStatusBarItem.tooltip = "AI Swarm Portal Guard status monitor";
    swarmStatusBarItem.show();
    context.subscriptions.push(swarmStatusBarItem);

    // ⚡ THE MASTER AUTO-SAVE HOOK INTERCEPTOR
    let saveHook = vscode.workspace.onDidSaveTextDocument((document) => {
        // Exclude system logs or non-code configurations from looping checks
        if (document.fileName.endsWith('.git') || document.fileName.endsWith('.ignore')) return;
        
        const filename = document.fileName.split(/[\\/]/).pop();
        const codePayload = document.getText();
        
        updateStatusBarState('scanning');
        dispatchToSwarmServer(filename, codePayload, 'AUTO_SAVE_AUDIT');
    });

    // 📁 SKILL #7: THE COMPONENT SLICER CONTEXT COMMAND
    let sliceCommand = vscode.commands.registerCommand('swarmPlatform.sliceComponent', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        const textSelection = editor.document.getText(editor.selection);
        const filename = editor.document.fileName.split(/[\\/]/).pop();

        if (!textSelection) {
            vscode.window.showWarningMessage('Richmond: Highlight a block selection to initialize the Slicer Agent.');
            return;
        }
        dispatchToSwarmServer(filename, textSelection, 'SLICE_FRAGMENTATION');
    });

    // 🛡️ SKILL #9: THE DEVSECOPS CREDENTIAL AUDIT CONTEXT COMMAND
    let scanCommand = vscode.commands.registerCommand('swarmPlatform.scanCredentials', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        const textSelection = editor.document.getText(editor.selection);
        const filename = editor.document.fileName.split(/[\\/]/).pop();

        if (!textSelection) {
            vscode.window.showWarningMessage('Richmond: Highlight a block selection to execute a cryptographic token scan.');
            return;
        }
        dispatchToSwarmServer(filename, textSelection, 'CREDENTIAL_SCAN');
    });

    context.subscriptions.push(saveHook, sliceCommand, scanCommand);
}

function updateStatusBarState(state) {
    if (!swarmStatusBarItem) return;
    if (state === 'scanning') {
        swarmStatusBarItem.text = "\$(sync~spin) Swarm: Scanning...";
        swarmStatusBarItem.backgroundColor = undefined;
    } else if (state === 'passed') {
        swarmStatusBarItem.text = "🛡️ Swarm: 0 Hallucinations Caught";
        swarmStatusBarItem.backgroundColor = undefined;
    } else if (state === 'blocked') {
        swarmStatusBarItem.text = "🚨 Swarm: Blocked (Bug/Malware Flagged)";
        swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    }
}

function dispatchToSwarmServer(filename, codePayload, targetAction) {
    const config = vscode.workspace.getConfiguration('swarmPlatform');
    const host = config.get('serverHost') || '127.0.0.1'; // Fix IPv6 localhost mapping drifts
    const port = config.get('serverPort') || 5000;

    const data = JSON.stringify({ filename: filename, code: codePayload, action: targetAction });
    const payloadBytes = Buffer.byteLength(data, 'utf8'); // Fix character-to-byte calculation errors for Danish glyphs

    const options = {
        hostname: host,
        port: port,
        path: '/api/analyze',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': payloadBytes
        },
        timeout: 30000 // Extended timeout to allow local LLM inference windows to complete smoothly
    };

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            if (res.statusCode !== 200) {
                updateStatusBarState('blocked');
                vscode.window.showErrorMessage(`❌ Server Connection Gate returned HTTP Code Error: ${res.statusCode}`);
                return;
            }
            try {
                const jsonRes = JSON.parse(body);
                if (jsonRes.status === 'REJECTED') {
                    updateStatusBarState('blocked');
                    vscode.window.showErrorMessage(`🚨 [SWARM REVIEW BLOCK]: ${jsonRes.details}`);
                } else if (jsonRes.status === 'PASSED') {
                    updateStatusBarState('passed');
                } else {
                    updateStatusBarState('blocked');
                    vscode.window.showWarningMessage('⚠️ Warning: Swarm returned unverified status metadata properties.');
                }
            } catch (e) {
                updateStatusBarState('blocked');
                vscode.window.showErrorMessage('❌ Malformed payload JSON exception occurred.');
            }
        });
    });

    req.on('error', (err) => {
        updateStatusBarState('blocked');
        vscode.window.showErrorMessage(`❌ Swarm Server is Offline: Run python app_dashboard.py`);
    });

    req.write(data);
    req.end();
}

function deactivate() {}

module.exports = { activate, deactivate };
