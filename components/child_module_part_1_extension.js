// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 1
// Mapped contextual parent index node: extension.js

const vscode = require('vscode');
const http = require('http');

let swarmStatusBarItem;
const latestScanForFile = new Map(); // Per-file sequence mapping tracking array hashes safely
let saveDebounceTimers = new Map();
let diagnosticCollection;
