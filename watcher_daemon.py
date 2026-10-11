"""
=========================================================================
     AI PORTAL - ANTI-HALLUCINATION WORKSPACE DIRECTORY WATCHER CORE
     SYSTEM CAPABILITIES: AUTOMATED CHILD COMPONENT FRAGMENTATION
=========================================================================
"""
import os
import time
import json
import urllib.request
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

TARGET_DIR = "./test_workspace"
COMPONENTS_DIR = "./test_workspace/components"
LINE_LIMIT_THRESHOLD = 15  # STRICT LOW THRESHOLD TO FORCE DYNAMIC REAL-WORLD TESTING IMMEDIATELY
API_URL = "http://localhost:5000/api/analyze"

for folder in [TARGET_DIR, COMPONENTS_DIR]:
    if not os.path.exists(folder):
        os.makedirs(folder)

def fragment_monolithic_file(file_path, filename, raw_code):
    """ Headless fragmenter partitioning monolithic frames into clean isolated code child structures. """
    print(f"⚡ [DISSOLVING] Fragmentation loop initialized for heavy file module: {filename}")
    lines = raw_code.split("\n")
    
    # Mathematical slicing allocation blocks dividing your strings safely
    chunk_size = 8
    chunks = [lines[i:i + chunk_size] for i in range(0, len(lines), chunk_size)]
    
    for idx, chunk in enumerate(chunks):
        child_filename = f"child_module_part_{idx + 1}_{filename}"
        child_path = os.path.join(COMPONENTS_DIR, child_filename)
        
        child_code = "\n".join(chunk)
        with open(child_path, "w", encoding="utf-8") as f:
            f.write(f"// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART {idx + 1}\n")
            f.write(f"// Mapped contextual parent index node: {filename}\n\n")
            f.write(child_code)
            
        print(f"📦 [FRAGMENT COMPLED] Spawned secure isolated child component module asset on disk: {child_filename}")

class AntiHallucinationChunkHandler(FileSystemEventHandler):
    def on_modified(self, event):
        if event.is_directory or not event.src_path.endswith(('.tsx', '.ts', '.js', '.py', '.jsx')):
            return
            
        # Enforce structural boundary scopes to safeguard against circular indexing feedback cascades
        if "child_module_part_" in event.src_path:
            return
            
        try:
            time.sleep(0.4)
            with open(event.src_path, 'r', encoding='utf-8') as f:
                raw_code = f.read()
                
            lines = raw_code.split("\n")
            line_count = len(lines)
            filename = os.path.basename(event.src_path)
            
            print(f"📁 [WATCHER] File modification caught natively: {filename} ({line_count} lines data)")
            
            # CRITICAL CONTEXT VALUE: Force dynamic child modular splitting if threshold size boundaries cross
            if line_count > LINE_LIMIT_THRESHOLD:
                print(f"⚠️ [MONOLITH CAP CROSSED] {filename} expanded past {LINE_LIMIT_THRESHOLD} lines boundary threshold!")
                fragment_monolithic_file(event.src_path, filename, raw_code)
                
            # Dispatch network telemetry packets to our headless multi-agent orchestration database server
            payload = {"filename": filename, "code": raw_code}
            data_bytes = json.dumps(payload).encode('utf-8')
            req = urllib.request.Request(API_URL, data=data_bytes, headers={'Content-Type': 'application/json'})
            
            with urllib.request.urlopen(req, timeout=5) as response:
                res_body = response.read().decode('utf-8')
                print(f"✅ [HEADLESS SWARM RESPONSE]: {res_body}")
                
        except Exception as e:
            print(f"❌ [INGESTION NETWORK BLOCKED] Telemetry channel drop: {e}")

if __name__ == "__main__":
    print("\n=========================================================================")
    print(" 🔥     ANTI-HALLUCINATION COMPONENT FRAGMENTER ONLINE & MONITORING     ")
    print("=========================================================================")
    print(f"🛰️  Monitoring local workspace lane: {TARGET_DIR}")
    print(f"🛡️  Structural line capping filter trigger: {LINE_LIMIT_THRESHOLD} lines max.")
    print("=========================================================================\n")
    
    event_handler = AntiHallucinationChunkHandler()
    observer = Observer()
    observer.schedule(event_handler, path=TARGET_DIR, recursive=False)
    observer.start()
    
    try:
        while True: time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
