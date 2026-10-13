// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 5
// Mapped contextual parent index node: extension.js


def log_swarm_event(agent_name, status, details):
    event = {
        "timestamp": datetime.now().strftime("%H:%M:%S"),
        "agent": html.escape(agent_name),
        "status": status,
        "details": html.escape(details[:120])
    }