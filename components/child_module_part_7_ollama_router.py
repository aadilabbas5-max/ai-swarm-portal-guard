// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 7
// Mapped contextual parent index node: ollama_router.py

        url = f"{self.base_url}{endpoint}"
        data = json.dumps(payload or {}).encode("utf-8")

        req = request.Request(
            url=url,
            data=data,
            headers={"Content-Type": "application/json"},
            method="POST",