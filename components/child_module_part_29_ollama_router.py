// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 29
// Mapped contextual parent index node: ollama_router.py


    router = OllamaRouter()

    try:
        models = router.list_models()
        print(f"Available local models: {models}")
    except Exception as exc:
        print(f"⚠️ Model discovery failed: {exc}")