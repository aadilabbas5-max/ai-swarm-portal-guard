// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 27
// Mapped contextual parent index node: ollama_router.py

    router = OllamaRouter(base_url=base_url, model=model)
    return router.route_prompt(
        prompt=prompt,
        chat_id=chat_id,
        user_id=user_id,
        system_prompt=system_prompt,
        memory_keywords=memory_keywords,
        save_memory=True,