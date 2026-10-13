// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 4
// Mapped contextual parent index node: extension.js

    re.compile(r"sk-proj-[A-Za-z0-9_\-]{20,}"),
    re.compile(r"sk-ant-[A-Za-z0-9_\-]{20,}"),
    re.compile(r"AKIA[0-9A-Z]{16}"),
    re.compile(r"gh[pousr]_[A-Za-z0-9]{36,}"),
    re.compile(r"eyJ[A-Za-z0-9_-]{10,}\.[A-Za-z0-9_-]{30,}\.[A-Za-z0-9_-]{10,}"),
    re.compile(r"-----BEGIN (?:RSA |EC )?PRIVATE KEY-----"),
]
SHELL_PATTERN = re.compile(r"os\.system\(|shell\s*=\s*True|\brm\s+-rf\s+[/~]|curl[^\n|]*\|\s*(?:ba)?sh", re.IGNORECASE)