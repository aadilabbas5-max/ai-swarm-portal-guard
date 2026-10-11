// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 14
// Mapped contextual parent index node: ollama_router.py

            return "No historical memory match found. Proceed from first principles."

        return "\n\n---\n\n".join(context_parts)

    def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,