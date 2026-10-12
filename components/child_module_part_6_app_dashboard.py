// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 6
// Mapped contextual parent index node: app_dashboard.py

    payload = {"model": DEFAULT_MODEL, "prompt": prompt, "stream": False, "options": {"temperature": 0, "num_predict": 4}}
    try:
        data_bytes = json.dumps(payload).encode('utf-8')
        req = urllib.request.Request(OLLAMA_API_URL, data=data_bytes, headers={'Content-Type': 'application/json'}, method="POST")
        with urllib.request.urlopen(req, timeout=20) as response:
            res_json = json.loads(response.read().decode('utf-8'))
            reply = res_json.get("response", "").strip().upper()
        if reply.startswith("BROKEN"): return "flagged"