// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 6
// Mapped contextual parent index node: app_dashboard.py


SHELL_PATTERN = re.compile(
    r"os\.system\(|shell\s*=\s*True|\brm\s+-rf\s+[/~]|curl[^\n|]*\|\s*(?:ba)?sh", 
    re.IGNORECASE
)

def log_swarm_event(agent_name, status, details):
    event = {