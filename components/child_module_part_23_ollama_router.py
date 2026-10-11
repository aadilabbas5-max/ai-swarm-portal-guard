// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 23
// Mapped contextual parent index node: ollama_router.py

            temperature=temperature,
            stream=False,
        )

        response_text = result.get("response", "")

        if save_memory and save_chat_interaction is not None:
            save_chat_interaction(