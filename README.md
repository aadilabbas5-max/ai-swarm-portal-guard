# 🛡️ AI Swarm Portal Guard (v0.1.0 Early Preview)

A local pre-flight check extension for VS Code. On every file save, it flags common secrets and shell-abuse patterns, and optionally asks a local Ollama model for a second opinion on obvious code breakage.

> ⚠️ **Disclaimer:** This is an early preview (v0.1.0) development utility tool. It provides a helpful local sanity filter but is not a guarantee of absolute code security or hallucination prevention.

![AI Swarm Portal Guard Simulated Interception Loop](./demo.gif)
*Note: The preview animation above represents a simulated demo of the alert workflow sequence.*

## 🚀 Quick Start
1. Download and install the compiled extension binary package.
2. Ensure you have your background dependencies ready. Install the local python server requirements:
   ```bash
   pip install -r requirements.txt
   ```
3. Start the local telemetry loop daemon server (the extension expects to talk to it natively at `127.0.0.1:5000`):
   ```bash
   python app_dashboard.py
   ```
4. **Optional Local LLM Scan Features:** Ensure you have Ollama installed and running natively on your hardware graphics processing lanes, then pull your targeted evaluation core:
   ```bash
   ollama pull deepseek-coder-v2
   ```
5. Open up your web browser tracking panel to `http://127.0.0.1:5000` to view your analytics dashboard matrix.

## 💾 How to Install the VS Code Extension
1. Inside Visual Studio Code, open your left-hand **Extensions** sidebar panel (`Ctrl + Shift + X`).
2. Click on the **`...` (Views and More Actions)** icon in the upper right-hand corner of the Extensions header pane.
3. Select **`Install from VSIX...`** from the drop-down menu, highlight our compiled extension file asset, and click install!

## ⚙️ Project Requirements
- Python 3.10+
- Flask >= 3.0

## 📦 Known Design Limitations
- **Partial Model Checks:** The local LLM evaluation scanner only ingests up to the first 12,000 characters of a file to protect system VRAM.
- **Single Squiggle Markers:** The diagnostic collector applies one red error highlight marker loop per file text stream. Additional hidden patterns surface sequentially after the top threat line is resolved and re-saved.
- **Post-Save Interception:** The extension flags code immediately *after* the OS disk write operation completes; it does not block the physical save transaction path itself.
- **Signature Limits:** Simple static regex filtering blocks clear string keys but misses advanced obfuscations like string concatenation (`"sk-" + "proj-"`).
- **Unreliable LLM Verdicts:** If your running model answers with unstructured conversational phrasing instead of an explicit `OK` or `BROKEN` string marker, the check skips the model validation and labels the status bar as `(Signatures Only)`.
## 📊 Honest Project Feature Comparison
To help you choose the right security workflow tool for your local workspace sandbox, here is an objective breakdown of how our v0.1 preview stacks up against established alternatives:

| Attribute / Tool | 🛡️ AI Portal Guard (v0.1) | 🦎 Gitleaks / TruffleHog | 🤖 VibinGuard / Takumo |
| :--- | :--- | :--- | :--- |
| **Primary Hook** | Real-time post-save file filter loop | Git history commit hooks / CI pipelines | Editor inline lint analysis sweeps |
| **Scanning Latency** | Sub-2ms for static signatures | Fast across local workspace clones | Moderate background token overhead |
| **Local LLM Checks** | Best-effort second opinion via Ollama | None (Strictly high-entropy pattern matching) | Integrated local model text evaluations |
| **Telemetry Interface** | Dedicated 5-card local HTML dashboard panel | Standard terminal script text outputs | Integrated native IDE Problems window |
| **Distribution Size** | Ultra-lightweight ~10.8 KB extension footprint | Pre-compiled native machine binary layers | Heavy packaged node module dependency trees |

## 📦 Known Design Limitations
- **Post-Save Execution:** The tool processes code blocks immediately *after* the OS disk write operation completing; it does not block the physical save transaction track itself.
- **CLI Agent Blindspot:** Code adjustments written straight to your drive by automated headless command-line terminal agents bypass the native VS Code save event hooks. Adding a system workspace file watcher daemon is on our active project roadmap.
- **Single Threat Squiggle:** Only the first match per file stream receives a red highlight marker. Hidden leaks below surface sequentially after the top row is resolved and re-saved.


## ⚖️ License
Distributed under the open-source **MIT License**. View the root `LICENSE` file for full warranty exemption details.