// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 20
// Mapped contextual parent index node: ollama_router.py

            "messages": messages,
            "stream": stream,
            "options": {
                "temperature": temperature,
            },
        }
        return self._request_json("/api/chat", payload)
