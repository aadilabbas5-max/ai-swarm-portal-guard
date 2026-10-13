// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 2
// Mapped contextual parent index node: extension.js


app = Flask(__name__)
app.config["MAX_CONTENT_LENGTH"] = 25 * 1024 * 1024

DEFAULT_MODEL = "deepseek-coder-v2"
OLLAMA_API_URL = "http://127.0.0"
CODE_EXTS = (".ts", ".tsx", ".js", ".jsx", ".py")
DASH_PATH = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'dashboard.html')