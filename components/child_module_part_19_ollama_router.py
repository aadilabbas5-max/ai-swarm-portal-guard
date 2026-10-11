// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 19
// Mapped contextual parent index node: ollama_router.py

        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.2,
        stream: bool = False,
    ) -> Dict[str, Any]:
        """Chat-completion style API call using a list of role/message pairs."""
        payload = {
            "model": self.model,