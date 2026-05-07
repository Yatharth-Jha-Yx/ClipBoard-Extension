const statusEl = document.getElementById("status");
const copyBtn = document.getElementById("copy");
const pasteBtn = document.getElementById("paste");

function setStatus(message, isError = false) {
  statusEl.textContent = message;
  statusEl.className = isError ? "error" : "success";
}

function setLoading(loading) {
  copyBtn.disabled = loading;
  pasteBtn.disabled = loading;
}

copyBtn.addEventListener("click", async () => {
  try {
    const text = await navigator.clipboard.readText();
    if (!text.trim()) {
      setStatus("Clipboard is empty.", true);
      return;
    }
    setLoading(true);
    setStatus("Saving...");
    const response = await chrome.runtime.sendMessage({ action: "save", data: text });
    if (response?.success) {
      setStatus("Saved to Drive!");
    } else {
      setStatus(response?.error || "Failed to save.", true);
    }
  } catch (err) {
    setStatus(err.message.includes("denied") ? "Clipboard access denied." : `Error: ${err.message}`, true);
  } finally {
    setLoading(false);
  }
});

pasteBtn.addEventListener("click", async () => {
  try {
    setLoading(true);
    setStatus("Loading...");
    const response = await chrome.runtime.sendMessage({ action: "load" });
    if (response?.success) {
      await navigator.clipboard.writeText(response.data);
      setStatus("Pasted from Drive!");
    } else {
      setStatus(response?.error || "Failed to load.", true);
    }
  } catch (err) {
    setStatus(`Error: ${err.message}`, true);
  } finally {
    setLoading(false);
  }
});
