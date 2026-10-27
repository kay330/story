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
    message.textContent = "홈 화면에 추가해 앱처럼 사용할 수 있습니다.";
    installButton.style.display = "inline-block";
    installButton.textContent = "설치하기";
  });

  if (isIOS) {
    banner.style.display = "block";
    message.textContent = "Safari의 공유 버튼을 누른 뒤 ‘홈 화면에 추가’를 선택하세요. iOS에서는 웹사이트가 자동으로 설치를 실행할 수 없습니다.";
    installButton.style.display = "none";
  } else if (!("onbeforeinstallprompt" in window)) {
    // Keep the prompt available on browsers where installation is manual.
    banner.style.display = "block";
    message.textContent = "브라우저 메뉴에서 ‘홈 화면에 추가’ 또는 ‘앱 설치’를 선택하세요.";
    installButton.textContent = "설치 방법";
  }

  installButton.addEventListener("click", async () => {
    if (!deferredPrompt) {
      message.textContent = isIOS
        ? "Safari에서 공유 버튼 → ‘홈 화면에 추가’를 선택하세요."
        : "브라우저 메뉴(⋮ 또는 공유 메뉴)에서 ‘앱 설치’ 또는 ‘홈 화면에 추가’를 선택하세요.";
      return;
    }
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    banner.style.display = "none";
  });

  closeButton.addEventListener("click", () => { banner.style.display = "none"; });
})();
