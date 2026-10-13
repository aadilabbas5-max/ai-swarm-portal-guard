#!/bin/bash
echo "🛡️ AI Swarm Portal Guard Backend Launcher..."
if [ ! -d "myenv" ]; then
    echo "📦 Initializing local isolated Python environment sandbox..."
    python3 -m venv myenv
 Dilf
fi
source myenv/bin/activate
echo "⚙️ Ensuring core dependency compliance constraints are met..."
pip install -r requirements.txt --quiet
echo "🚀 Booting Telemetry Control Daemon on http://127.0.0.1:5000..."
python3 app_dashboard.py
