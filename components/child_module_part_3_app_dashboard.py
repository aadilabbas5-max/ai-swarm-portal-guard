// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 3
// Mapped contextual parent index node: app_dashboard.py

data_mutex = threading.Lock()

telemetry_metrics = {"total": 0, "successful": 0, "failed": 0, "malware_intercepts": 0, "latency_ms": 0.0}
recent_events_stream = []

SECRET_PATTERNS = [
    re.compile(r"sk-proj-[A-Za-z0-9_\-]{20,}"),
    re.compile(r"sk-ant-[A-Za-z0-9_\-]{20,}"),