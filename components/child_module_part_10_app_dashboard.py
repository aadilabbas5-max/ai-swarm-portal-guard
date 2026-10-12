// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 10
// Mapped contextual parent index node: app_dashboard.py

            res_json = json.loads(response.read().decode('utf-8'))
            reply = res_json.get("response", "").strip().upper()
        return "flagged" if reply.startswith("BROKEN") else "ok"
    except Exception:
        return "unavailable"

@app.route('/')
def serve_html_dashboard_panel():