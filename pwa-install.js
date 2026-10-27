(() => {
  let deferredPrompt = null;
  const banner = document.getElementById("pwaInstallBanner");
  const installButton = document.getElementById("pwaInstallButton");
  const message = document.getElementById("pwaInstallMessage");
  const closeButton = document.getElementById("pwaInstallClose");
  if (!banner || !installButton || !message || !closeButton) return;

  const isStandalone = window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
  if (isStandalone) return;

  const tr = (k) => (typeof t === "function" ? t(k) : k);
  let msgKey = "pwa.msg.default";
  let btnKey = "pwa.install";
  const render = () => {
    message.textContent = tr(msgKey);
    installButton.textContent = tr(btnKey);
    closeButton.textContent = tr("pwa.close");
    closeButton.setAttribute("aria-label", tr("pwa.closeAria"));
  };

  const isIOS = /iphone|ipad|ipod/i.test(window.navigator.userAgent) &&
    !window.MSStream;

  if ("serviceWorker" in navigator && (location.protocol === "https:" || location.hostname === "localhost")) {
    window.addEventListener("load", () => {
      navigator.serviceWorker.register("./sw.js").catch((error) => {
        console.warn("서비스 워커 등록 실패:", error);
      });
    });
  }

  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    banner.style.display = "block";
    msgKey = "pwa.msg.prompt";
    btnKey = "pwa.install";
    installButton.style.display = "inline-block";
    render();
  });

  if (isIOS) {
    banner.style.display = "block";
    msgKey = "pwa.msg.ios";
    installButton.style.display = "none";
  } else if (!("onbeforeinstallprompt" in window)) {
    // Keep the prompt available on browsers where installation is manual.
    banner.style.display = "block";
    msgKey = "pwa.msg.manual";
    btnKey = "pwa.howto";
  }
  render();
  if (typeof onLangChange === "function") onLangChange(render);

  installButton.addEventListener("click", async () => {
    if (!deferredPrompt) {
      msgKey = isIOS ? "pwa.msg.helpIos" : "pwa.msg.helpOther";
      render();
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    banner.style.display = "none";
  });

  closeButton.addEventListener("click", () => { banner.style.display = "none"; });
})();
