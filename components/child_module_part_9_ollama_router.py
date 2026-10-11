// 🤖 ANTI-HALLUCINATION AUTOMATED CHILD LAYER PART 9
// Mapped contextual parent index node: ollama_router.py

                details = exc.read().decode("utf-8")
            except Exception:
                details = str(exc)
            raise RuntimeError(f"Ollama HTTP error for {endpoint}: {details}") from exc
        except error.URLError as exc:
            raise RuntimeError(
                f"Unable to reach Ollama at {self.base_url}. "
                "Start the local Ollama service and confirm the host is reachable."