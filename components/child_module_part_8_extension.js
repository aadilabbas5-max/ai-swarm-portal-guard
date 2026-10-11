// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 8
// Mapped contextual parent index node: extension.js

}

function updateStatusBarState(state) {
    if (!swarmStatusBarItem) return;
    if (state === 'scanning') {
        swarmStatusBarItem.text = "\$(sync~spin) Swarm: Scanning...";
        swarmStatusBarItem.backgroundColor = undefined;
    } else if (state === 'passed') {