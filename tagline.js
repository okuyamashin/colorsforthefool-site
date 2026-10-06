(function () {
  const heading = document.querySelector("h1.tagline");
  const packs = window.LANG_PACKS;
  if (!heading || !packs) return;
  const pack = packs.find((item) => item.htmlLang === document.documentElement.lang);
  if (!pack || !pack.copy) return;

  if (pack.id === "ja") {
    const visitor = preferredPack(packs);
    if (!visitor || visitor.id === "ja") return;
    const greet = greeting(visitor.copy);
    if (!greet) return;
    const line = document.createElement("p");
    line.className = "greet";
    const link = document.createElement("a");
    link.lang = visitor.htmlLang;
    link.href = visitor.prefix ? `${visitor.prefix}/` : "./";
    link.textContent = greet;
    line.append(link);
    heading.before(line);
    return;
  }

  if (!pack.copy.taglineDated) return;
  const greet = greeting(pack.copy);
  if (!greet) return;
  const line = document.createElement("p");
  line.className = "greet";
  line.textContent = greet;
  heading.before(line);
  heading.textContent = pack.copy.taglineDated.replace("{date}", formatDate(pack));
})();

function greeting(copy) {
  const hour = new Date().getHours();
  if (hour < 5 || hour >= 18) return copy.greetEvening;
  if (hour < 12) return copy.greetMorning;
  return copy.greetAfternoon;
}

function formatDate(pack) {
  try {
    return new Intl.DateTimeFormat(pack.copy.dateLocale || pack.htmlLang, {
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(new Date());
  } catch (error) {
    return new Date().toLocaleDateString();
  }
}

function preferredPack(packs) {
  const override = new URLSearchParams(location.search).get("lang");
  if (override) return packById(packs, override) || packForTag(packs, override);
  const tags = navigator.languages && navigator.languages.length
    ? navigator.languages
    : [navigator.language];
  for (const tag of tags) {
    const pack = packForTag(packs, tag);
    if (pack) return pack;
  }
  return null;
}

function packById(packs, id) {
  const lower = String(id || "").trim().toLowerCase();
  if (!lower) return null;
  return packs.find((item) => item.id.toLowerCase() === lower) || null;
}

function packForTag(packs, tag) {
  const lower = String(tag || "").toLowerCase().replace(/_/g, "-");
  if (!lower) return null;
  if (lower === "zh-hant" || lower.startsWith("zh-tw") || lower.startsWith("zh-hk") || lower.startsWith("zh-mo") || lower.includes("hant")) {
    return packs.find((item) => item.id === "zh" && item.hreflang);
  }
  if (lower === "zh" || lower === "zh-hans" || lower.startsWith("zh-cn") || lower.startsWith("zh-sg") || lower.startsWith("zh-")) {
    return packs.find((item) => item.id === "zh-hans" && item.hreflang);
  }
  if (lower.startsWith("pt")) return packs.find((item) => item.id === "pt" && item.hreflang);
  const primary = lower.split("-")[0];
  return packs.find((item) => item.hreflang && (item.id === primary || String(item.htmlLang).toLowerCase() === lower));
}
