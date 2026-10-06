function siteDirectory() {
  let path = location.pathname;
  if (path === "/public" || path.startsWith("/public/")) {
    path = path.slice("/public".length) || "/";
  }
  if (path.endsWith("/index.html")) path = path.slice(0, -"/index.html".length);
  if (!path.endsWith("/")) path += "/";
  if (!path.startsWith("/")) path = "/" + path;
  return path;
}

function splitLanguage(path, packs) {
  const prefixed = packs
    .filter((pack) => pack.prefix)
    .sort((a, b) => b.prefix.length - a.prefix.length);
  for (const pack of prefixed) {
    const head = `/${pack.prefix}/`;
    if (path.startsWith(head)) {
      return { pack, rest: `/${path.slice(head.length)}` };
    }
  }
  return { pack: packs.find((pack) => !pack.prefix), rest: path };
}

function languageLink(pack, href) {
  const link = document.createElement("a");
  link.lang = pack.htmlLang;
  link.href = href;
  link.textContent = pack.switchLabel;
  return link;
}

function fillLanguages() {
  const packs = window.LANG_PACKS;
  if (!Array.isArray(packs) || packs.length === 0) return;
  const path = siteDirectory();
  const { pack: here, rest } = splitLanguage(path, packs);
  if (!here) return;
  const depth = path.split("/").filter(Boolean).length;
  const ups = "../".repeat(depth);
  const list = document.getElementById("lang-list");
  if (list && list.children.length === 0) {
    let sawModern = false;
    let broke = false;
    for (const pack of packs) {
      if (pack.id === here.id) continue;
      if (pack.group === "historical" && sawModern && !broke) {
        const rule = document.createElement("li");
        rule.className = "lang-break";
        rule.setAttribute("role", "separator");
        list.append(rule);
        broke = true;
      }
      const target = `${pack.prefix ? `/${pack.prefix}` : ""}${rest}`;
      const item = document.createElement("li");
      item.append(languageLink(pack, ups + target.replace(/^\//, "")));
      list.append(item);
      if (pack.group !== "historical") sawModern = true;
    }
  }
  const footer = document.querySelector("p.lang-links[data-lang-links]");
  if (footer && footer.children.length === 0) {
    let sawModern = false;
    let broke = false;
    for (const pack of packs) {
      if (pack.group === "historical" && sawModern && !broke) {
        const rule = document.createElement("span");
        rule.className = "lang-break";
        rule.setAttribute("role", "separator");
        footer.append(rule);
        broke = true;
      } else if (footer.childNodes.length) {
        footer.append(document.createTextNode(" "));
      }
      const href = pack.prefix ? `${ups}${pack.prefix}/` : (ups || "./");
      footer.append(languageLink(pack, href));
      if (pack.group !== "historical") sawModern = true;
    }
  }
}

fillLanguages();

const langMenu = document.querySelector(".lang-menu");
const langToggle = langMenu?.querySelector(".lang");
const langList = langMenu?.querySelector(".lang-list");
if (langMenu && langToggle && langList) {
  const closeLanguages = () => {
    langToggle.setAttribute("aria-expanded", "false");
    langList.hidden = true;
  };
  langToggle.addEventListener("click", () => {
    const open = langToggle.getAttribute("aria-expanded") === "true";
    langToggle.setAttribute("aria-expanded", String(!open));
    langList.hidden = open;
  });
  document.addEventListener("click", (event) => {
    if (langToggle.getAttribute("aria-expanded") !== "true") return;
    if (langMenu.contains(event.target)) return;
    event.stopPropagation();
    closeLanguages();
  }, true);
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape" || langToggle.getAttribute("aria-expanded") !== "true") return;
    closeLanguages();
    langToggle.focus();
  });
}
