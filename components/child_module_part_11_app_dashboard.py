// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 11
// Mapped contextual parent index node: app_dashboard.py

            async function pollTelemetryData() {
                try {
                    let res = await fetch('/api/metrics');
                    let data = await res.json();
                    document.getElementById('m_total').innerText = data.metrics.total;
                    document.getElementById('m_success').innerText = data.metrics.successful;
                    document.getElementById('m_failed').innerText = data.metrics.failed;
                    document.getElementById('m_malware').innerText = data.metrics.malware_intercepts;