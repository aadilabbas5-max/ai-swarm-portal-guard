// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 3
// Mapped contextual parent index node: app_dashboard.py


BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MEMORY_DIR = os.path.join(BASE_DIR, "platform_ai_memory")

if not os.path.exists(MEMORY_DIR):
    os.makedirs(MEMORY_DIR)

chroma_client = chromadb.PersistentClient(path=MEMORY_DIR)