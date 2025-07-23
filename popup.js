document.getElementById("copy").addEventListener("click", async () => {
  const text = await navigator.clipboard.readText();
  chrome.runtime.sendMessage({ action: "save", data: text });
  document.getElementById("status").textContent = "Copied to Drive!";
});

document.getElementById("paste").addEventListener("click", () => {
  chrome.runtime.sendMessage({ action: "load" }, async (response) => {
    await navigator.clipboard.writeText(response.data || "");
    document.getElementById("status").textContent = "Pasted from Drive!";
  });
});
