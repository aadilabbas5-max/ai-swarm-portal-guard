// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 3
// Mapped contextual parent index node: app_dashboard.py

app.config["MAX_CONTENT_LENGTH"] = 25 * 1024 * 1024

DEFAULT_MODEL = "deepseek-coder-v2"
OLLAMA_API_URL = "http://127.0.0.1:11434/api/generate"
CODE_EXTS = (".ts", ".tsx", ".js", ".jsx", ".py")
data_mutex = threading.Lock()

telemetry_metrics = {