var deviceType;
let userAgent = window.navigator.userAgent;
if (userAgent.includes("iOS")) deviceType = "iOS";
else if (userAgent.includes("Android")) deviceType = "Android";
else deviceType = "etc";

function app_openMarket() {
  switch (deviceType) {
    case "iOS":
      window.location.href = "itms-apps://itunes.apple.com/app/6VL4LW6Z4Q";
      break;
    case "Android":
      window.location.href =
        "https://play.google.com/store/apps/details?id=com.bizt";
      break;
    default:
  }
}

function app_openExternal(url) {
  switch (deviceType) {
    case "iOS":
      window.webkit?.messageHandlers.openExternal.postMessage({ url: url });
      break;
    case "Android":
      window.ApplicationInterface?.openExternal(url);
      break;
    default:
  }
}

function app_openGallery(gal) {
  switch (deviceType) {
    case "iOS":
      window.webkit?.messageHandlers.openGallery.postMessage(gal);
      break;
    case "Android":
      window.ApplicationInterface?.openGallery(JSON.stringify(gal));
      break;
    default:
  }
}

function app_setProgressBar(val) {
  switch (deviceType) {
    case "iOS":
      window.webkit?.messageHandlers.setProgressBar.postMessage(val);
      break;
    case "Android":
      window.ApplicationInterface?.setProgressBar(val);
      break;
    default:
  }
}

function app_setValue(key, value) {
  switch (deviceType) {
    case "iOS":
      // window.webkit?.messageHandlers.setProgressBar.postMessage(val);
      break;
    case "Android":
      window.ApplicationInterface?.setValue(key, JSON.stringify(value));
      break;
    default:
  }
}

function app_getValue(key, callback) {
  switch (deviceType) {
    case "iOS":
      // window.webkit?.messageHandlers.setProgressBar.postMessage(val);
      break;
    case "Android":
      let value = window.ApplicationInterface?.getValue(key);
      value = value
        ? JSON.parse(window.ApplicationInterface?.getValue(key))
        : null;
      callback(value);
      break;
    default:
  }
}

export {
  deviceType,
  app_openMarket,
  app_openExternal,
  app_openGallery,
  app_setProgressBar,
  app_getValue,
  app_setValue,
};
