// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 10
// Mapped contextual parent index node: app_dashboard.py

            reply = res_json.get("response", "").strip().upper()
        if reply.startswith("BROKEN"): return "flagged"
        if reply.startswith("OK"): return "ok"
        return "unavailable"
    except Exception:
        return "unavailable"
@app.route('/')
def serve_html_dashboard_panel():