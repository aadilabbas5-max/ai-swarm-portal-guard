"""
=========================================================================
     AI PORTAL - CHROMA VECTOR ENGINE CROSS-CHAT MEMORY SYNCHRONIZER
=========================================================================
"""
import time
import os
import chromadb

# 1. Initialize Local ChromaDB Database Node Storage on Your Disk
print("📦 [DATABASE] Booting local persistent memory bank on disk...")
chroma_client = chromadb.PersistentClient(path="./platform_ai_memory")

# Create or connect to the unified cross-chat memory repository table collection
collection = chroma_client.get_or_create_collection(name="unified_chat_history")

def save_chat_interaction(chat_id: str, user_prompt: str, solution_code: str):
    """Encodes and saves a historical code conversation as an embedded vector."""
    doc_id = f"node_{int(time.time())}_{chat_id}"
    combined_payload = f"PROMPT: {user_prompt}\nRESOLUTION CODE:\n{solution_code}"
    
    collection.add(
        documents=[combined_payload],
        metadatas=[{"chat_id": chat_id, "timestamp": time.time()}],
        ids=[doc_id]
    )
    print(f"✅ [MEMORY SAVED] Interaction locked into local vector map: {doc_id}")

def query_historical_context(search_keyword: str):
    """Scans all historical chat logs under our umbrella to find matching code blocks instantly."""
    print(f"\n🔍 [SCANNING UMBRELLA] Cross-checking historical nodes for: '{search_keyword}'")
    
    results = collection.query(
        query_texts=[search_keyword],
        n_results=1
    )
    
    if results and results['documents'] and len(results['documents']) > 0:
        print("💡 [MATCH FOUND] Found historical solution matching your request context:")
        print("=========================================================================")
        print(results['documents'])
        print("=========================================================================")
        return results['documents']
    else:
        print("ℹ️ [MEMORY EMPTY] No matching historical data blocks found in database.")
        return None

if __name__ == "__main__":
    print("\n=========================================================================")
    print(" 🔥     UNIFIED VECTOR CHAT SYNC MEMORY MODULE ACTIVE & ONLINE          ")
    print("=========================================================================")
    
    # Test Transaction 1: Simulating an explicit solution from an old chat history turn
    save_chat_interaction(
        chat_id="chat_turn_001",
        user_prompt="How do we build Daniel's fuzzy logic search script to handle Choclate typo spelling?",
        solution_code="const searchDictionary = { 'choclate': ['chokolade'] }; // Fixed search parsing"
    )
    
    # Test Transaction 2: Simulating an instant cross-chat semantic query from a fresh tab tomorrow
    time.sleep(1)
    query_historical_context("fuzzy logic chocolate typo")
