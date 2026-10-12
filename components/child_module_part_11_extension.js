// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 11
// Mapped contextual parent index node: extension.js

    const config = vscode.workspace.getConfiguration('swarmPlatform');
    const host = config.get('serverHost') || '127.0.0.1';
    const port = config.get('serverPort') || 5000;
    const filename = filePath.split(/[\\/]/).pop();
    const isFullFileSave = targetAction === 'AUTO_SAVE_AUDIT';

    const currentSeq = (latestScanForFile.get(filePath) || 0) + 1;
    latestScanForFile.set(filePath, currentSeq);