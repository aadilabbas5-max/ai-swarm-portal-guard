// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 6
// Mapped contextual parent index node: extension.js

        const targetPort = config.get('serverPort') || 5000;

        const payloadData = JSON.stringify({
            filename: filename,
            code: rawCodeContent,
            provider: aiProvider,
            api_key: apiKey
        });