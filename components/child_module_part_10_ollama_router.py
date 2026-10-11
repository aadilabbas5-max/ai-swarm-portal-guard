// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 10
// Mapped contextual parent index node: ollama_router.py

            ) from exc

    def health_check(self) -> Dict[str, Any]:
        """Confirm that the local Ollama server is running."""
        return self._request_json("/api/tags")

    def list_models(self) -> List[str]:
        """Return the installed local Ollama models."""