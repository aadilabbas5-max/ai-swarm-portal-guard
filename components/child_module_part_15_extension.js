// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 15
// Mapped contextual parent index node: extension.js


if __name__ == '__main__':
    assert OLLAMA_API_URL.startswith("http://127.0.0"), "OLLAMA_API_URL looks truncated"
    try: urllib.request.urlopen("http://127.0.0api/tags", timeout=2); print("Ollama: reachable")
    except Exception: print("Ollama: NOT reachable, running in signatures-only mode")
    app.run(host='127.0.0.1', port=5000, threaded=True, debug=False)