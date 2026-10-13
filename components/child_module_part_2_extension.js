// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 2
// Mapped contextual parent index node: extension.js

function activate(context) {
    console.log('👑 AI Swarm Portal Guard Command Bridge Activated.');

    diagnosticCollection = vscode.languages.createDiagnosticCollection('swarmGuard');
    context.subscriptions.push(diagnosticCollection);

    swarmStatusBarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right, 100);
    swarmStatusBarItem.text = "\$(shield) Swarm: Active";