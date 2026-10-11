// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 5
// Mapped contextual parent index node: ollama_router.py


class OllamaRouter:
    """Thin wrapper around a local Ollama HTTP API."""

    def __init__(
        self,
        base_url: Optional[str] = None,
        model: Optional[str] = None,