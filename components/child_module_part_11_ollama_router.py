// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 11
// Mapped contextual parent index node: ollama_router.py

        result = self.health_check()
        models = result.get("models", [])
        return [m.get("name") for m in models if isinstance(m, dict) and m.get("name")]

    def build_context(self, prompt: str, memory_keywords: Optional[List[str]] = None) -> str:
        """Assemble context from prior memory entries when available."""
        if not memory_keywords:
            memory_keywords = [prompt]