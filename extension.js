const vscode = require('vscode');
const http = require('http');

let swarmStatusBarItem;
const latestScanForFile = new Map();
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

    let saveHook = vscode.workspace.onDidSaveTextDocument((document) => {
        if (document.uri.scheme !== 'file' || /[\\/]\.git[\\/]/.test(document.fileName)) return;
        if (saveDebounceTimers.has(document.fileName)) clearTimeout(saveDebounceTimers.get(document.fileName));

        let timer = setTimeout(() => {
            saveDebounceTimers.delete(document.fileName);
            executeFileAuditPass(document.fileName, document.getText(), 'AUTO_SAVE_AUDIT');
        }, 50);
        saveDebounceTimers.set(document.fileName, timer);
    });

    let sliceCommand = vscode.commands.registerCommand('swarmPlatform.sliceComponent', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        const textSelection = editor.document.getText(editor.selection);
        if (!textSelection) return;
        executeFileAuditPass(editor.document.fileName, textSelection, 'SLICE_FRAGMENTATION');
    });

    let scanCommand = vscode.commands.registerCommand('swarmPlatform.scanCredentials', () => {
        const editor = vscode.window.activeTextEditor;
        if (!editor) return;
        const textSelection = editor.document.getText(editor.selection);
        if (!textSelection) return;
        executeFileAuditPass(editor.document.fileName, textSelection, 'CREDENTIAL_SCAN');
    });

    context.subscriptions.push(saveHook, sliceCommand, scanCommand);
}

function refreshStatusBarUI(passedLabel = '', forceFlagged = false) {
    if (!swarmStatusBarItem) return;
    let blockedFilesCount = 0;
    diagnosticCollection.forEach(() => blockedFilesCount++);
    
    if (blockedFilesCount > 0 || forceFlagged) {
        swarmStatusBarItem.text = "🚨 Swarm: Threat Flagged";
        swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    } else {
        swarmStatusBarItem.text = passedLabel || "🛡️ Swarm: Secure";
        swarmStatusBarItem.backgroundColor = undefined;
    }
}

function updateStatusBarState(state) {
    if (!swarmStatusBarItem) return;
    if (state === 'scanning') {
        swarmStatusBarItem.text = "\$(sync~spin) Swarm: Scanning...";
        swarmStatusBarItem.backgroundColor = undefined;
    } else if (state === 'offline') {
        swarmStatusBarItem.text = "⚠️ Swarm: Offline";
        swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    }
}

function executeFileAuditPass(filePath, codePayload, targetAction) {
    const config = vscode.workspace.getConfiguration('swarmPlatform');
    const host = config.get('serverHost') || '127.0.0.1';
    const port = config.get('serverPort') || 5000;
    const filename = filePath.split(/[\\/]/).pop();
    const isFullFileSave = targetAction === 'AUTO_SAVE_AUDIT';

    const currentSeq = (latestScanForFile.get(filePath) || 0) + 1;
    latestScanForFile.set(filePath, currentSeq);
    updateStatusBarState('scanning');

    const data = JSON.stringify({ filename: filename, code: codePayload, action: targetAction });
    const payloadBytes = Buffer.byteLength(data, 'utf8');

    const options = {
        hostname: host,
        port: port,
        path: '/api/analyze',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Content-Length': payloadBytes },
        timeout: 25000
    };

    const req = http.request(options, (res) => {
        let body = '';
        res.on('data', (chunk) => body += chunk);
        res.on('end', () => {
            if (latestScanForFile.get(filePath) !== currentSeq) return;
            if (res.statusCode !== 200) { updateStatusBarState('offline'); return; }
            try {
                const jsonRes = JSON.parse(body);
                const fileUri = vscode.Uri.file(filePath);

                if (jsonRes.status === 'REJECTED') {
                    if (isFullFileSave) {
                        const matchedLine = Number.isInteger(jsonRes.line) ? jsonRes.line : 0;
                        const range = new vscode.Range(matchedLine, 0, matchedLine, 1000);
                        let diagnostic = new vscode.Diagnostic(range, `[SWARM BLOCK]: ${jsonRes.details}`, vscode.DiagnosticSeverity.Error);
                        diagnosticCollection.set(fileUri, [diagnostic]);
                    }
                    vscode.window.showErrorMessage(`🚨 [SWARM REVIEW BLOCK]: ${jsonRes.details}`);
                    refreshStatusBarUI('', true);
                } else if (jsonRes.status === 'PASSED') {
                    if (isFullFileSave) diagnosticCollection.delete(fileUri);
                    let clearLabel = jsonRes.llm_checked ? "🛡️ Swarm: Secure" : "🛡️ Swarm: Secure (Signatures Only)";
                    refreshStatusBarUI(clearLabel, false);
                }
            } catch (e) { updateStatusBarState('offline'); }
        });
    });

    req.on('timeout', () => { req.destroy(new Error('timeout')); });
    req.on('error', () => {
        if (latestScanForFile.get(filePath) !== currentSeq) return;
        updateStatusBarState('offline');
    });
    req.write(data);
    req.end();
}

function deactivate() {}

module.exports = { activate, deactivate };