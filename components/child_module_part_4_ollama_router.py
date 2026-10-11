// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 4
// Mapped contextual parent index node: ollama_router.py

    query_historical_context = None
    save_chat_interaction = None


OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
DEFAULT_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5-coder:14b")
DEFAULT_TIMEOUT_SECONDS = 120
