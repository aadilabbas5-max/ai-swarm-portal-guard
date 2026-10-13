// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 6
// Mapped contextual parent index node: extension.js


function refreshStatusBarUI(passedLabel = '', forceFlagged = false) {
    if (!swarmStatusBarItem) return;
    let blockedFilesCount = 0;
    diagnosticCollection.forEach(() => blockedFilesCount++);
    
    if (blockedFilesCount > 0 || forceFlagged) {
        swarmStatusBarItem.text = "🚨 Swarm: Threat Flagged";