// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 3
// Mapped contextual parent index node: memory_broker.py

def save_chat_interaction(chat_id: str, user_prompt: str, solution_code: str):
    """Encodes and saves a historical code conversation as an embedded vector."""
    doc_id = f"node_{int(time.time())}_{chat_id}"
    combined_payload = f"PROMPT: {user_prompt}\nRESOLUTION CODE:\n{solution_code}"
    
    collection.add(
        documents=[combined_payload],
        metadatas=[{"chat_id": chat_id, "timestamp": time.time()}],