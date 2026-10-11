"""
=========================================================================
     AI SWARM PLATFORM - OLLAMA ROUTER FRAMEWORK
=========================================================================

Local gateway for sending developer prompts to a running Ollama instance,
optionally enriching them with historical context from the Chroma memory
broker, and then recording each exchange for future retrieval.

This file is intentionally structured as a reusable framework rather than a
single one-off script, so it can be imported into other modules or run as a
standalone service.
=========================================================================
"""

import json
import os
import time
from typing import Any, Dict, List, Optional
from urllib import error, request

try:
    from memory_broker import query_historical_context, save_chat_interaction
except ImportError:  # pragma: no cover
    query_historical_context = None
    save_chat_interaction = None


OLLAMA_BASE_URL = os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")
DEFAULT_MODEL = os.getenv("OLLAMA_MODEL", "qwen2.5-coder:14b")
DEFAULT_TIMEOUT_SECONDS = 120


class OllamaRouter:
    """Thin wrapper around a local Ollama HTTP API."""

    def __init__(
        self,
        base_url: Optional[str] = None,
        model: Optional[str] = None,
        timeout_seconds: int = DEFAULT_TIMEOUT_SECONDS,
    ):
        self.base_url = (base_url or OLLAMA_BASE_URL).rstrip("/")
        self.model = model or DEFAULT_MODEL
        self.timeout_seconds = timeout_seconds

    def _request_json(self, endpoint: str, payload: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        """Send a JSON request to the Ollama API and return the parsed response."""
        url = f"{self.base_url}{endpoint}"
        data = json.dumps(payload or {}).encode("utf-8")

        req = request.Request(
            url=url,
            data=data,
            headers={"Content-Type": "application/json"},
            method="POST",
        )

        try:
            with request.urlopen(req, timeout=self.timeout_seconds) as response:
                body = response.read().decode("utf-8")
                return json.loads(body)
        except error.HTTPError as exc:
            try:
                details = exc.read().decode("utf-8")
            except Exception:
                details = str(exc)
            raise RuntimeError(f"Ollama HTTP error for {endpoint}: {details}") from exc
        except error.URLError as exc:
            raise RuntimeError(
                f"Unable to reach Ollama at {self.base_url}. "
                "Start the local Ollama service and confirm the host is reachable."
            ) from exc

    def health_check(self) -> Dict[str, Any]:
        """Confirm that the local Ollama server is running."""
        return self._request_json("/api/tags")

    def list_models(self) -> List[str]:
        """Return the installed local Ollama models."""
        result = self.health_check()
        models = result.get("models", [])
        return [m.get("name") for m in models if isinstance(m, dict) and m.get("name")]

    def build_context(self, prompt: str, memory_keywords: Optional[List[str]] = None) -> str:
        """Assemble context from prior memory entries when available."""
        if not memory_keywords:
            memory_keywords = [prompt]

        context_parts: List[str] = []

        for keyword in memory_keywords:
            if not keyword or not isinstance(keyword, str):
                continue

            if query_historical_context is not None:
                try:
                    matches = query_historical_context(keyword)
                    if matches:
                        context_parts.append(f"Historical match for '{keyword}':\n{json.dumps(matches, ensure_ascii=False)[:2000]}")
                except Exception:
                    pass

        if not context_parts:
            return "No historical memory match found. Proceed from first principles."

        return "\n\n---\n\n".join(context_parts)

    def generate(
        self,
        prompt: str,
        system_prompt: Optional[str] = None,
        context: Optional[str] = None,
        temperature: float = 0.2,
        stream: bool = False,
    ) -> Dict[str, Any]:
        """Generate a single completion from the configured model."""
        if not prompt or not prompt.strip():
            raise ValueError("Prompt cannot be empty.")

        final_system_prompt = system_prompt or (
            "You are a senior software engineer and problem-solving assistant. "
            "Be precise, concise, and practical. Respond with code when appropriate."
        )

        if context:
            final_system_prompt = (
                f"{final_system_prompt}\n\nRelevant historical context:\n{context}"
            )

        payload = {
            "model": self.model,
            "prompt": prompt,
            "system": final_system_prompt,
            "stream": stream,
            "options": {
                "temperature": temperature,
            },
        }

        response = self._request_json("/api/generate", payload)
        return response

    def chat(
        self,
        messages: List[Dict[str, str]],
        temperature: float = 0.2,
        stream: bool = False,
    ) -> Dict[str, Any]:
        """Chat-completion style API call using a list of role/message pairs."""
        payload = {
            "model": self.model,
            "messages": messages,
            "stream": stream,
            "options": {
                "temperature": temperature,
            },
        }
        return self._request_json("/api/chat", payload)

    def route_prompt(
        self,
        prompt: str,
        chat_id: Optional[str] = None,
        user_id: Optional[str] = None,
        system_prompt: Optional[str] = None,
        memory_keywords: Optional[List[str]] = None,
        save_memory: bool = True,
        temperature: float = 0.2,
    ) -> Dict[str, Any]:
        """Route a request through memory-aware context enrichment and Ollama generation."""
        context = self.build_context(prompt, memory_keywords=memory_keywords)
        result = self.generate(
            prompt=prompt,
            system_prompt=system_prompt,
            context=context,
            temperature=temperature,
            stream=False,
        )

        response_text = result.get("response", "")

        if save_memory and save_chat_interaction is not None:
            save_chat_interaction(
                chat_id=chat_id or f"chat_{int(time.time())}_{user_id or 'user'}",
                user_prompt=prompt,
                solution_code=response_text,
            )

        return {
            "model": self.model,
            "prompt": prompt,
            "context": context,
            "response": response_text,
            "raw": result,
        }


def route_local_request(
    prompt: str,
    chat_id: Optional[str] = None,
    user_id: Optional[str] = None,
    model: Optional[str] = None,
    memory_keywords: Optional[List[str]] = None,
    base_url: Optional[str] = None,
    system_prompt: Optional[str] = None,
) -> Dict[str, Any]:
    """Convenience function for quick single-call routing from other modules."""
    router = OllamaRouter(base_url=base_url, model=model)
    return router.route_prompt(
        prompt=prompt,
        chat_id=chat_id,
        user_id=user_id,
        system_prompt=system_prompt,
        memory_keywords=memory_keywords,
        save_memory=True,
    )


def demo_usage() -> None:
    """Simple demonstration of the router in a local development environment."""
    print("\n=========================================================================")
    print(" 🔥     OLLAMA ROUTER FRAMEWORK - LOCAL MODEL GATEWAY ONLINE           ")
    print("=========================================================================")

    router = OllamaRouter()

    try:
        models = router.list_models()
        print(f"Available local models: {models}")
    except Exception as exc:
        print(f"⚠️ Model discovery failed: {exc}")
        print("Check that Ollama is running locally and that the model is installed.")
        return

    prompt = (
        "Build a Python function that reads a CSV file and returns the row count "
        "without loading the full file into memory."
    )

    print("\n🚀 Sending request to local LLM...\n")
    result = router.route_prompt(
        prompt=prompt,
        chat_id="demo_chat_001",
        user_id="developer",
        system_prompt=(
            "You are a senior Python engineer. Give a clear solution with a concise "
            "explanation and production-safe code."
        ),
        memory_keywords=["csv row count python file streaming"],
        save_memory=True,
    )

    print("\n============================================================")
    print("RESPONSE")
    print("============================================================")
    print(result["response"])
    print("\n============================================================")


if __name__ == "__main__":
    demo_usage()
