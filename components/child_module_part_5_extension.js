// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 5
// Mapped contextual parent index node: extension.js

        swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
        swarmStatusBarItem.show();

        // Capture consumer runtime credentials and model preferences natively from settings panel layers
        const config = vscode.workspace.getConfiguration('swarmPlatform');
        const aiProvider = config.get('aiProvider') || 'OLLAMA';
        const apiKey = config.get('apiKey') || '';
        const targetHost = config.get('serverHost') || 'localhost';