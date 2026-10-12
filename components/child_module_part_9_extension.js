// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 9
// Mapped contextual parent index node: extension.js

    if (!swarmStatusBarItem) return;
    if (state === 'scanning') {
        swarmStatusBarItem.text = "\$(sync~spin) Swarm: Scanning...";
        swarmStatusBarItem.backgroundColor = undefined;
    } else if (state === 'offline') {
        swarmStatusBarItem.text = "⚠️ Swarm: Offline";
        swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.warningBackground');
    }