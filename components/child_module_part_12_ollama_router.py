// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 12
// Mapped contextual parent index node: ollama_router.py


        context_parts: List[str] = []

        for keyword in memory_keywords:
            if not keyword or not isinstance(keyword, str):
                continue

            if query_historical_context is not None: