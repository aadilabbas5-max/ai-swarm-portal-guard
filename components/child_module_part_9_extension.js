// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 9
// Mapped contextual parent index node: extension.js

        swarmStatusBarItem.text = "🛡️ Swarm: 0 Hallucinations Caught";
        swarmStatusBarItem.backgroundColor = undefined;
    } else if (state === 'blocked') {
        swarmStatusBarItem.text = "🚨 Swarm: Blocked (Bug/Malware Flagged)";
        swarmStatusBarItem.backgroundColor = new vscode.ThemeColor('statusBarItem.errorBackground');
    }
}
