// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 16
// Mapped contextual parent index node: ollama_router.py

        final_system_prompt = system_prompt or (
            "You are a senior software engineer and problem-solving assistant. "
            "Be precise, concise, and practical. Respond with code when appropriate."
        )

        if context:
            final_system_prompt = (
                f"{final_system_prompt}\n\nRelevant historical context:\n{context}"