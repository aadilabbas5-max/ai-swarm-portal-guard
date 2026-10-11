// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 1
// Mapped contextual parent index node: extension.js

const vscode = require('vscode');
const http = require('http');

/**
 * Helper function to dispatch text payloads to our headless Flask multi-agent core
 */
function dispatchToSwarmServer(filename, codePayload, targetAction) {
    const config = vscode.workspace.getConfiguration('swarmPlatform');