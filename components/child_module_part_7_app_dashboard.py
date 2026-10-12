// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 7
// Mapped contextual parent index node: app_dashboard.py

        if reply.startswith("OK"): return "ok"
        return "unavailable"
    except Exception: return "unavailable"

@app.route('/')
def serve_html_dashboard_panel():
    try: return send_file(DASH_PATH)
    except Exception as e: return f"<h3>Dashboard file allocation drop error: {str(e)}</h3>"