// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 22
// Mapped contextual parent index node: ollama_router.py

        temperature: float = 0.2,
    ) -> Dict[str, Any]:
        """Route a request through memory-aware context enrichment and Ollama generation."""
        context = self.build_context(prompt, memory_keywords=memory_keywords)
        result = self.generate(
            prompt=prompt,
            system_prompt=system_prompt,
            context=context,