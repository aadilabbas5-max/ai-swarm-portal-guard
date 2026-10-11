// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 13
// Mapped contextual parent index node: ollama_router.py

                try:
                    matches = query_historical_context(keyword)
                    if matches:
                        context_parts.append(f"Historical match for '{keyword}':\n{json.dumps(matches, ensure_ascii=False)[:2000]}")
                except Exception:
                    pass

        if not context_parts: