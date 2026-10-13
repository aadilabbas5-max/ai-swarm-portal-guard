# 🛡️ AI Swarm Portal Guard (v0.1 Early Preview)

A local pre-flight check extension for VS Code. On every file save, it flags common secrets and shell-abuse patterns, and optionally asks a local Ollama model for a second opinion on obvious code breakage. 

> ⚠️ **Disclaimer:** This is an early preview (v0.1) development utility tool. It provides a helpful local sanity filter but is not an absolute guarantee of code security or hallucination prevention.

![AI Swarm Portal Guard Simulated Interception Loop](./demo.gif)
*Note: The preview animation above represents a simulated demo of the alert workflow sequence.*

## ✨ Current Capabilities
- **🔒 Local-First Scan Checks:** Runs completely inside your local machine environment. Code payloads are processed on your hardware via Flask and Ollama without being transmitted over the public internet.
- **🔑 Static Pattern Filters:** Scans code rows on save to catch common token exposure signatures (including private key headers, AWS, GitHub, Anthropic, and standard JWT/Supabase credential blocks).
- **🐚 Basic Shell Abuse Flags:** Detects obvious raw system command execution patterns (`os.system(`, `shell=True`, `rm -rf`, and `curl | sh`).
- **🧠 Best-Effort Second Opinion:** Optionally routes un-patterned code blocks down to a local `deepseek-coder-v2` instance via Ollama to flag severe logical script corruption or major syntax breaks.
- **📊 Telemetry Tracking Dashboard:** Includes an auto-polling, local dark-themed HTML panel to monitor total execution logs, pass counters, and processing latencies.

## 💾 How to Install Natively
1. Download the compiled **`swarm-anti-hallucination-portal-1.0.0.vsix`** package binary directly from our root folder tree.
2. Inside Visual Studio Code, open your left-hand **Extensions** sidebar panel (`Ctrl + Shift + X`).
3. Click on the **`...` (Views and More Actions)** icon in the upper right-hand corner of the Extensions header pane.
4. Select **`Install from VSIX...`** from the drop-down menu, choose the downloaded `.vsix` file asset, and click install!

## ⚙️ Project Requirements