const vscode = require('vscode');
const http = require('http');

let swarmStatusBarItem;
let scanSequenceCounter = 0;

function activate(context) {
    console.log('👑 AI Swarm Anti-Hallucination Extension Command Bridge Activated.');

    swarmStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    swarmStatusBarItem.text = "\$(shield) Swarm: Active";
    swarmStatusBarItem.show();
    context.subscriptions.push(swarmStatusBarItem);

    // ⚡ THE MASTER AUTO-SAVE HOOK INTERCEPTOR
    let saveHook = vscode.workspace.onDidSaveTextDocument((document) => {
        // Strict boundary scopes filtering out system git internals and non-file blocks
        if (document.uri.scheme !== 'file' || /[\\/]\.git[\\/]/.test(document.fileName)) return;
        
        const filename = document.fileName.split(/[\\/]/).pop();
        const codePayload = document.getText();
        
        updateStatusBarState('scanning');
        dispatchToSwarmServer(filename, codePayload, 'AUTO_SAVE_AUDIT');
    });

    context.subscriptions.push(saveHook);
}

function updateStatusBarState(state) {
    if (!swarmStatusBarItem) return;
    if (state === 'scanning') {
        swarmStatusBarItem.text = "\$(sync~spin) Swarm: Scanning...";
        swarmStatusBarItem.backgroundColor = undefined;
    } else if (state === 'passed') {
        swarmStatusBarItem.text = "🛡️ Swarm: Secure";
        swarmStatusBarItem.backgroundColor = undefined;
    } else if (state === 'blocked') {
        swarmStatusBarItem.text = "🚨 Swarm: Threat Flagged";
        swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    } else if (state === 'offline') {
        swarmStatusBarItem.text = "⚠️ Swarm: Offline";
        swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    }
}

function dispatchToSwarmServer(filename, codePayload, targetAction) {
    const config = vscode.workspace.getConfiguration('swarmPlatform');
    const host = config.get('serverHost') || '127.0.0.1';
    const port = config.get('serverPort') || 5000;

    const currentSequence = ++scanSequenceCounter; // Stale-response guard loop counters
    const data = JSON.stringify({ filename: filename, code: codePayload, action: targetAction });
    const payloadBytes = Buffer.byteLength(data, 'utf8');

    const options = {
        hostname: host,
        port: port,
        path: '/api/analyze',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Content-Length': payloadBytes
        },
        timeout: 30000
    };

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            if (currentSequence !== scanSequenceCounter) return; // Drop older async responses instantly
            
            if (res.statusCode !== 200) {
                updateStatusBarState('offline');
                return;
            }
            try {
                const jsonRes = JSON.parse(body);
                if (jsonRes.status === 'REJECTED') {
                    updateStatusBarState('blocked');
                    vscode.window.showErrorMessage(`🚨 [SWARM REVIEW BLOCK]: ${jsonRes.details}`);
                } else if (jsonRes.status === 'PASSED') {
                    updateStatusBarState('passed');
                }
            } catch (e) {
                updateStatusBarState('offline');
            }
        });
    });

    req.on('timeout', () => {
        req.destroy(new Error('timeout'));
    });

    req.on('error', () => {
        if (currentSequence !== scanSequenceCounter) return;
        updateStatusBarState('offline');
    });

    req.write(data);
    req.end();
}

function deactivate() {}

module.exports = { activate, deactivate };
