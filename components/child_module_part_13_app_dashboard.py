// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 13
// Mapped contextual parent index node: app_dashboard.py

        </style>
        <script>
            async function pollTelemetryData() {
                try {
                    let res = await fetch('/api/metrics');
                    let data = await res.json();
                    document.getElementById('m_total').innerText = data.metrics.total;
                    document.getElementById('m_success').innerText = data.metrics.successful;