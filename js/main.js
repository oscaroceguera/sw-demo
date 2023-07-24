// check for browser support
if (navigator.serviceWorker) {
  // affter browser loads
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/serviceWorker.js")
      .then((reg) => console.log("Service worker registered!"))
      .catch((err) => console.log(`Here is the error: ${err}`));
  });
}
