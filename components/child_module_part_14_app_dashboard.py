// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 14
// Mapped contextual parent index node: app_dashboard.py

                    document.getElementById('m_failed').innerText = data.metrics.failed;
                    document.getElementById('m_malware').innerText = data.metrics.malware_intercepts;
                    document.getElementById('m_latency').innerText = data.metrics.latency_ms + "ms";
                    
                    let streamHtml = "";
                    for(let ev of data.events) {
                        let badgeClass = ev.status === "REJECTED" || ev.status === "MALWARE_ATTACK" ? "badge-failed" : "badge-passed";
                        streamHtml += `<div class='row'><span>[${ev.timestamp}] <b>${ev.agent}</b>: ${ev.details}</span><span class='status-badge ${badgeClass}'>${ev.status}</span></div>`;