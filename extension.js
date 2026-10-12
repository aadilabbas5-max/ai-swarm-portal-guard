const vscode = require('vscode');
const http = require('http');

let swarmStatusBarItem;
let scanSequenceCounter = 0;
let saveDebounceTimers = new Map();
let diagnosticCollection;

function activate(context) {
    console.log('👑 AI Swarm Anti-Hallucination Extension Command Bridge Activated.');

    diagnosticCollection = vscode.languages.createDiagnosticCollection('swarmGuard');
    context.subscriptions.push(diagnosticCollection);

    swarmStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    swarmStatusBarItem.text = "\$(shield) Swarm: Active";
    swarmStatusBarItem.show();
    context.subscriptions.push(swarmStatusBarItem);

    // ⚡ DEBOUNCED MULTI-FILE SAVE HOOK INTERCEPTOR
    let saveHook = vscode.workspace.onDidSaveTextDocument((document) => {
        if (document.uri.scheme !== 'file' || /[\\/]\.git[\\/]/.test(document.fileName)) return;
        
        // Fix the double-scanning bug with a fast 50ms mechanical debounce barrier
        if (saveDebounceTimers.has(document.fileName)) {
            clearTimeout(saveDebounceTimers.get(document.fileName));
        }

        let timer = setTimeout(() => {
            saveDebounceTimers.delete(document.fileName);
            executeFileAuditPass(document.fileName, document.getText());
        }, 50);
        saveDebounceTimers.set(document.fileName, timer);
    });

    // 📁 SKILL #7: CONTEXT MENU FRAGMENTER HANDLER
    let sliceCommand = vscode.commands.registerCommand('swarmPlatform.sliceComponent', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        const textSelection = editor.document.getText(editor.selection);
        if (!textSelection) {
            vscode.window.showWarningMessage('Highlight a block selection to initialize the Slicer Agent.');
            return;
        }
        executeFileAuditPass(editor.document.fileName, textSelection, 'SLICE_FRAGMENTATION');
    });

    // 🛡️ SKILL #9: CONTEXT MENU CREDENTIAL AUDIT HANDLER
    let scanCommand = vscode.commands.registerCommand('swarmPlatform.scanCredentials', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        const textSelection = editor.document.getText(editor.selection);
        if (!textSelection) {
            vscode.window.showWarningMessage('Highlight a block selection to execute a credential scan.');
            return;
        }
        executeFileAuditPass(editor.document.fileName, textSelection, 'CREDENTIAL_SCAN');
    });

    context.subscriptions.push(saveHook, sliceCommand, scanCommand);
}

function updateStatusBarState(state, customLabel = '') {
    if (!swarmStatusBarItem) return;
    if (state === 'scanning') {
        swarmStatusBarItem.text = "\$(sync~spin) Swarm: Scanning...";
        swarmStatusBarItem.backgroundColor = undefined;
    } else if (state === 'passed') {
        swarmStatusBarItem.text = customLabel || "🛡️ Swarm: Secure";
        swarmStatusBarItem.backgroundColor = undefined;
    } else if (state === 'blocked') {
        swarmStatusBarItem.text = "🚨 Swarm: Blocked (Bug/Malware Flagged)";
        swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    } else if (state === 'offline') {
        swarmStatusBarItem.text = "⚠️ Swarm: Offline";
        swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    }
}

function executeFileAuditPass(filePath, codePayload, targetAction = 'AUTO_SAVE_AUDIT') {
    const config = vscode.workspace.getConfiguration('swarmPlatform');
    const host = config.get('serverHost') || '127.0.0.1';
    const port = config.get('serverPort') || 5000;
    const filename = filePath.split(/[\\/]/).pop();

    const currentSequence = ++scanSequenceCounter;
    updateStatusBarState('scanning');

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
        timeout: 25000
    };

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            if (currentSequence !== scanSequenceCounter) return;
            
            if (res.statusCode !== 200) {
                updateStatusBarState('offline');
                return;
            }
            try {
                const jsonRes = JSON.parse(body);
                const fileUri = vscode.Uri.file(filePath);

                if (jsonRes.status === 'REJECTED') {
                    updateStatusBarState('blocked');
                    
                    // Native per-file diagnostic collection highlighting problem line areas
                    let range = new vscode.Range(0, 0, 0, 40);
                    let diagnostic = new vscode.Diagnostic(range, `[SWARM BLOCK]: ${jsonRes.details}`, vscode.DiagnosticSeverity.Error);
                    diagnosticCollection.set(fileUri, [diagnostic]);
                    
                    vscode.window.showErrorMessage(`🚨 [SWARM REVIEW BLOCK]: ${jsonRes.details}`);
                } else if (jsonRes.status === 'PASSED') {
                    diagnosticCollection.delete(fileUri); // Wipe out file markings immediately upon safe correction
                    let label = jsonRes.llm_checked ? "🛡️ Swarm: Secure" : "🛡️ Swarm: Secure (Signatures Only)";
                    updateStatusBarState('passed', label);
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
