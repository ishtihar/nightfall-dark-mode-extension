(function () {
  const STYLE_ID = "nightfall-dark-mode-style";
  const hostname = window.location.hostname;

  function buildCSS() {
    return `
      html {
        filter: invert(1) hue-rotate(180deg) !important;
        background: #ffffff !important;
      }
      img, video, iframe, canvas, svg, picture {
        filter: invert(1) hue-rotate(180deg) !important;
      }
    `;
  }

  function applyDarkMode(enabled) {
    let style = document.getElementById(STYLE_ID);
    if (enabled) {
      if (!style) {
        style = document.createElement("style");
        style.id = STYLE_ID;
        style.textContent = buildCSS();
        (document.head || document.documentElement).appendChild(style);
      }
    } else if (style) {
      style.remove();
    }
  }

  chrome.storage.sync.get(["sites"], (result) => {
    const sites = result.sites || {};
    applyDarkMode(!!sites[hostname]);
  });

  chrome.storage.onChanged.addListener((changes, area) => {
    if (area === "sync" && changes.sites) {
      const newSites = changes.sites.newValue || {};
      applyDarkMode(!!newSites[hostname]);
    }
  });
})();
