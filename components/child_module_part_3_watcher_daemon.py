// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 3
// Mapped contextual parent index node: watcher_daemon.py

API_URL = "http://localhost:5000/api/analyze"

for folder in [TARGET_DIR, COMPONENTS_DIR]:
    if not os.path.exists(folder):
        os.makedirs(folder)

def fragment_monolithic_file(file_path, filename, raw_code):
    """ Headless fragmenter partitioning monolithic frames into clean isolated code child structures. """