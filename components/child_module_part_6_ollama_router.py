// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 6
// Mapped contextual parent index node: ollama_router.py

        timeout_seconds: int = DEFAULT_TIMEOUT_SECONDS,
    ):
        self.base_url = (base_url or OLLAMA_BASE_URL).rstrip("/")
        self.model = model or DEFAULT_MODEL
        self.timeout_seconds = timeout_seconds

    def _request_json(self, endpoint: str, payload: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Send a JSON request to the Ollama API and return the parsed response."""