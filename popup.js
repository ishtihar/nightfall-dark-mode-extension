document.addEventListener("DOMContentLoaded", async () => {
  const toggle = document.getElementById("toggle");
  const statusLabel = document.getElementById("statusLabel");
  const hostnameEl = document.getElementById("hostname");
  const siteDot = document.getElementById("siteDot");
  const resetAll = document.getElementById("resetAll");

  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  let hostname = "";
  try {
    hostname = new URL(tab.url).hostname;
  } catch (e) {
    hostname = "";
  }
  hostnameEl.textContent = hostname || "unsupported page";

  function render(enabled) {
    toggle.setAttribute("aria-checked", enabled ? "true" : "false");
    statusLabel.textContent = enabled ? "On" : "Off";
    siteDot.classList.toggle("active", enabled);
  }

  chrome.storage.sync.get(["sites"], (result) => {
    const sites = result.sites || {};
    render(!!sites[hostname]);
  });

  toggle.addEventListener("click", () => {
    if (!hostname) return;
    chrome.storage.sync.get(["sites"], (result) => {
      const sites = result.sites || {};
      const next = !sites[hostname];
      sites[hostname] = next;
      chrome.storage.sync.set({ sites }, () => render(next));
    });
  });

  resetAll.addEventListener("click", () => {
    chrome.storage.sync.set({ sites: {} }, () => render(false));
  });
});
