// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 15
// Mapped contextual parent index node: app_dashboard.py

                    document.getElementById('m_latency').innerText = data.metrics.latency_ms + "ms";
                    
                    let streamHtml = "";
                    for(let ev of data.events) {
                        let badgeClass = ev.status === "REJECTED" || ev.status === "MALWARE_ATTACK" ? "badge-failed" : "badge-passed";
                        streamHtml += `<div class='row'><span>[${ev.timestamp}] <b>${ev.agent}</b>: ${ev.details}</span><span class='status-badge ${badgeClass}'>${ev.status}</span></div>`;
                    }
                    document.getElementById('console_stream').innerHTML = streamHtml;