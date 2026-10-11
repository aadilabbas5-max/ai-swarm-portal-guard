// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 10
// Mapped contextual parent index node: extension.js

function dispatchToSwarmServer(filename, codePayload, targetAction) {
    const config = vscode.workspace.getConfiguration('swarmPlatform');
    const host = config.get('serverHost') || '127.0.0.1'; // Fix IPv6 localhost mapping drifts
    const port = config.get('serverPort') || 5000;

    const data = JSON.stringify({ filename: filename, code: codePayload, action: targetAction });
    const payloadBytes = Buffer.byteLength(data, 'utf8'); // Fix character-to-byte calculation errors for Danish glyphs
