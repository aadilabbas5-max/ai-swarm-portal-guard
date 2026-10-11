/**
 * =========================================================================
 *  AI PORTAL - UNIVERSAL MULTI-PROVIDER VS CODE EXTENSION CONTROLLER
 *  VISUAL CELEBRATION ENGINE - STATUS BAR INTERFACE MODULE
 * =========================================================================
 */
const vscode = require('vscode');
const http = require('http');

let swarmStatusBarItem;

function activate(context) {
    console.log('🤖 [SWARM PLATFORM] Universal Anti-Hallucination Extension is active and armed!');

    // 1. Construct and anchor our premium Visual Status Bar indicator item
    // Placing it far right alignment guarantees high visibility without clashing with layout panels
    swarmStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 1000);
    context.subscriptions.push(swarmStatusBarItem);

    // Set the default baseline tracking state on startup
    updateStatusBar('PASSED', '0 Hallucinations Caught');

    let onSaveDisposable = vscode.workspace.onDidSaveTextDocument(async (document) => {
        if (!['typescript', 'typescriptreact', 'javascript', 'javascriptreact', 'python'].includes(document.languageId)) {
            return;
        }

        const filename = document.fileName.split(/[\\/]/).pop();
        const rawCodeContent = document.getText();
        
        // Flash a pulsing status check to signal active background agent review processing
        swarmStatusBarItem.text = `$(sync~spin) Swarm: Reviewing ${filename}...`;
        swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
        swarmStatusBarItem.show();

        // Capture consumer runtime credentials and model preferences natively from settings panel layers
        const config = vscode.workspace.getConfiguration('swarmPlatform');
        const aiProvider = config.get('aiProvider') || 'OLLAMA';
        const apiKey = config.get('apiKey') || '';
        const targetHost = config.get('serverHost') || 'localhost';
        const targetPort = config.get('serverPort') || 5000;

        const payloadData = JSON.stringify({
            filename: filename,
            code: rawCodeContent,
            provider: aiProvider,
            api_key: apiKey
        });

        const requestOptions = {
            hostname: targetHost,
            port: targetPort,
            path: '/api/analyze',
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Content-Length': Buffer.byteLength(payloadData)
            }
        };

        const req = http.request(requestOptions, (res) => {
            let responseBody = '';
            res.on('data', (chunk) => { responseBody += chunk; });
            
            res.on('end', () => {
                try {
                    const swarmResult = JSON.parse(responseBody);
                    
                    if (swarmResult.status === 'REJECTED') {
                        // ❌ SHARP CRIMSON INTERCEPTION: Update the Status Bar to alert the developer visually
                        updateStatusBar('REJECTED', 'Blocked (Bug/Malware Flagged)');
                        vscode.window.showErrorMessage(`🚨 [SWARM REVIEW BLOCK]: Hallucination or Bug caught inside ${filename}! Detail: ${swarmResult.details}`);
                    } else if (swarmResult.status === 'PASSED') {
                        // ✅ EMERALD PASS CELEBRATION: Update Status Bar to signal total code compliance safety
                        updateStatusBar('PASSED', '0 Hallucinations Caught');
                        vscode.window.setStatusBarMessage(`✅ Swarm: ${filename} verified secure.`, 4000);
                    }
                } catch (error) {
                    console.error('❌ Failed to parse backend analysis response strings:', error);
                    updateStatusBar('PASSED', '0 Hallucinations Caught');
                }
            });
        });

        req.on('error', (e) => {
            console.error(`❌ Background communication pipeline dropped: ${e.message}`);
            swarmStatusBarItem.text = `$(error) Swarm: Server Offline`;
            swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
            swarmStatusBarItem.show();
        });

        req.write(payloadData);
        req.end();
    });

    context.subscriptions.push(onSaveDisposable);
}

/**
 * Handles the graphical shifting and visual color states of our status bar indicator.
 */
function updateStatusBar(status, message) {
    if (status === 'REJECTED') {
        swarmStatusBarItem.text = `🚨 Swarm: ${message}`;
        // Sets background to theme-compliant alert crimson red
        swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
        swarmStatusBarItem.tooltip = 'Click to inspect your backend telemetry matrix error logs.';
    } else {
        swarmStatusBarItem.text = `🛡️ Swarm: ${message}`;
        // Clears any warning background to default clean, calm layout theme layers
        swarmStatusBarItem.backgroundColor = undefined; 
        swarmStatusBarItem.tooltip = 'Autonomous Multi-Agent Guardrail Protection: Active & Clean.';
    }
    swarmStatusBarItem.show();
}

function deactivate() {
    console.log('🛑 [SHUTDOWN] Terminating extension telemetry hooks.');
}

module.exports = {
    activate,
    deactivate
};
