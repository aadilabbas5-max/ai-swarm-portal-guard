// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 8
// Mapped contextual parent index node: extension.js

    let blockedFilesCount = 0;
    diagnosticCollection.forEach(() => blockedFilesCount++);
    
    if (blockedFilesCount > 0) {
        swarmStatusBarItem.text = "🚨 Swarm: Threat Flagged";
        swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    } else {
        swarmStatusBarItem.text = passedLabel || "🛡️ Swarm: Secure";