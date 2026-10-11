// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 6
// Mapped contextual parent index node: app_dashboard.py

# High-fidelity protection patterns capturing raw credential leaks natively on disk saves
CREDENTIAL_LEAK_PATTERN = re.compile(r"(supabase\.co|sk-proj-|bearer\s+[A-Za-z0-9_\-\.])", re.IGNORECASE)
SHELL_MALWARE_PATTERN = re.compile(r"(os\.system|subprocess|popen|rm\s+-rf)", re.IGNORECASE)

def log_swarm_event(agent_name, status, details):
    event = {
        "timestamp": datetime.now().strftime("%H:%M:%S"),
        "agent": agent_name,