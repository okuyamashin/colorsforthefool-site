window.dataLayer = window.dataLayer || [];
function gtag() { dataLayer.push(arguments); }
window.cftfLoadAnalytics = function () {
  if (window.cftfAnalyticsLoaded) return;
  window.cftfAnalyticsLoaded = true;
  var script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-NQ38VZSM7B";
  document.head.appendChild(script);
  gtag("js", new Date());
  gtag("config", "G-NQ38VZSM7B");
};
(function () {
  var regulated = {
    AT: 1, BE: 1, BG: 1, HR: 1, CY: 1, CZ: 1, DK: 1, EE: 1, FI: 1, FR: 1,
    DE: 1, GR: 1, HU: 1, IE: 1, IT: 1, LV: 1, LT: 1, LU: 1, MT: 1, NL: 1,
    PL: 1, PT: 1, RO: 1, SK: 1, SI: 1, ES: 1, SE: 1, IS: 1, LI: 1, NO: 1,
    GB: 1, CH: 1
  };
  function readCookie(name) {
    var prefix = name + "=";
    var value = "";
    document.cookie.split("; ").forEach(function (part) {
      if (part.indexOf(prefix) === 0) value = decodeURIComponent(part.slice(prefix.length));
    });
    return value;
  }
  var preview = false;
  var country = "";
  var consent = "";
  try {
    var params = new URLSearchParams(location.search);
    if (params.has("cookies")) {
      sessionStorage.setItem("cftf-cookies", "1");
      params.delete("cookies");
      var query = params.toString();
      location.replace(location.pathname + (query ? "?" + query : "") + location.hash);
      return;
    }
    preview = sessionStorage.getItem("cftf-cookies") === "1";
    if (preview) sessionStorage.removeItem("cftf-cookies");
    country = (params.get("cc") || readCookie("cftf-cc") || "").toUpperCase();
    consent = readCookie("cftf-consent");
  } catch (error) {}
  var inRegion = !!regulated[country];
  var chosen = consent === "granted" || consent === "denied";
  window.cftfConsent = {
    country: country,
    regulated: inRegion,
    showBanner: preview || (inRegion && !chosen)
  };
  if (preview || consent === "denied" || (inRegion && consent !== "granted")) return;
  window.cftfLoadAnalytics();
})();
