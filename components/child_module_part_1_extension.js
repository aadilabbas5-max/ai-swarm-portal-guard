// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 1
// Mapped contextual parent index node: extension.js

const vscode = require('vscode');
const http = require('http');

let swarmStatusBarItem;
let scanSequenceCounter = 0;
let saveDebounceTimers = new Map();
let diagnosticCollection;
