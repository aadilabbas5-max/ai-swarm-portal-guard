// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 5
// Mapped contextual parent index node: extension.js

        swarmStatusBarItem.text = "\$(sync~spin) Swarm: Scanning...";
        swarmStatusBarItem.backgroundColor = undefined;
    } else if (state === 'passed') {
        swarmStatusBarItem.text = "🛡️ Swarm: Secure";
        swarmStatusBarItem.backgroundColor = undefined;
    } else if (state === 'blocked') {
        swarmStatusBarItem.text = "🚨 Swarm: Threat Flagged";
        swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');