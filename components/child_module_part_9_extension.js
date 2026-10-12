// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 9
// Mapped contextual parent index node: extension.js

    if (state === 'scanning') {
        swarmStatusBarItem.text = "\$(sync~spin) Swarm: Scanning...";
        swarmStatusBarItem.backgroundColor = undefined;
    } else if (state === 'passed') {
        swarmStatusBarItem.text = customLabel || "🛡️ Swarm: Secure";
        swarmStatusBarItem.backgroundColor = undefined;
    } else if (state === 'blocked') {
        swarmStatusBarItem.text = "🚨 Swarm: Blocked (Bug/Malware Flagged)";