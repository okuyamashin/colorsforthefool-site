(() => {
const CONSENT_COOKIE = "cftf-consent";
const COPY = {
  ja: {
    title: "訪問の計測",
    text: "このサイトは Google アナリティクスで訪問を測っています。同意するか、拒否するかを選べます。",
    deny: "拒否する",
    accept: "同意する",
    privacy: "プライバシーポリシー"
  },
  en: {
    title: "Measuring visits",
    text: "This site measures visits with Google Analytics. You can accept or refuse.",
    deny: "Refuse",
    accept: "Accept",
    privacy: "Privacy policy"
  },
  "zh-Hant": {
    title: "訪次的計測",
    text: "這個網站用 Google Analytics 量訪次。你可以接受，也可以拒絕。",
    deny: "拒絕",
    accept: "接受",
    privacy: "隱私權政策"
  },
  "zh-Hans": {
    title: "访次的计测",
    text: "这个网站用 Google Analytics 量访次。你可以接受，也可以拒绝。",
    deny: "拒绝",
    accept: "接受",
    privacy: "隐私政策"
  },
  es: {
    title: "Medición de visitas",
    text: "Este sitio mide las visitas con Google Analytics. Puedes aceptar o rechazar.",
    deny: "Rechazar",
    accept: "Aceptar",
    privacy: "Política de privacidad"
  },
  nl: {
    title: "Bezoek meten",
    text: "Deze site meet bezoeken met Google Analytics. Je kunt accepteren of weigeren.",
    deny: "Weigeren",
    accept: "Accepteren",
    privacy: "Privacybeleid"
  },
  fr: {
    title: "Mesure des visites",
    text: "Ce site mesure les visites avec Google Analytics. Tu peux accepter ou refuser.",
    deny: "Refuser",
    accept: "Accepter",
    privacy: "Politique de confidentialité"
  },
  ar: {
    title: "قياس الزيارات",
    text: "يقيس هذا الموقع الزيارات عبر Google Analytics. يمكنك القبول أو الرفض.",
    deny: "رفض",
    accept: "قبول",
    privacy: "سياسة الخصوصية"
  },
  "pt-BR": {
    title: "Medição de visitas",
    text: "Este site mede as visitas com o Google Analytics. Você pode aceitar ou recusar.",
    deny: "Recusar",
    accept: "Aceitar",
    privacy: "Política de privacidade"
  },
  id: {
    title: "Pengukuran kunjungan",
    text: "Situs ini mengukur kunjungan dengan Google Analytics. Kamu bisa menerima atau menolak.",
    deny: "Tolak",
    accept: "Terima",
    privacy: "Kebijakan privasi"
  },
  ms: {
    title: "Pengukuran lawatan",
    text: "Laman ini mengukur lawatan dengan Google Analytics. Anda boleh terima atau tolak.",
    deny: "Tolak",
    accept: "Terima",
    privacy: "Dasar privasi"
  },
  ru: {
    title: "Учёт посещений",
    text: "Этот сайт считает посещения через Google Analytics. Можно согласиться или отказаться.",
    deny: "Отказаться",
    accept: "Согласиться",
    privacy: "Политика конфиденциальности"
  },
  de: {
    title: "Messung der Besuche",
    text: "Diese Website misst Besuche mit Google Analytics. Sie können zustimmen oder ablehnen.",
    deny: "Ablehnen",
    accept: "Zustimmen",
    privacy: "Datenschutzerklärung"
  },
  hi: {
    title: "विज़िट की माप",
    text: "यह साइट Google Analytics से विज़िट मापती है। आप स्वीकार कर सकते हैं, या मना कर सकते हैं।",
    deny: "मना करें",
    accept: "स्वीकार करें",
    privacy: "गोपनीयता नीति"
  },
  th: {
    title: "การวัดการเข้าชม",
    text: "ไซต์นี้วัดการเข้าชมด้วย Google Analytics คุณยอมรับได้ หรือปฏิเสธได้",
    deny: "ปฏิเสธ",
    accept: "ยอมรับ",
    privacy: "นโยบายความเป็นส่วนตัว"
  },
  vi: {
    title: "Đo lường lượt truy cập",
    text: "Trang này đo lượt truy cập bằng Google Analytics. Bạn có thể đồng ý hoặc từ chối.",
    deny: "Từ chối",
    accept: "Đồng ý",
    privacy: "Chính sách riêng tư"
  },
  ko: {
    title: "방문 측정",
    text: "이 사이트는 Google Analytics로 방문을 측정합니다. 동의하거나 거절할 수 있습니다.",
    deny: "거절",
    accept: "동의",
    privacy: "개인정보 처리방침"
  },
  bn: {
    title: "ভিজিট মাপা",
    text: "এই সাইট Google Analytics দিয়ে ভিজিট মাপে। আপনি রাজি হতে পারেন, বা না করতে পারেন।",
    deny: "না",
    accept: "রাজি",
    privacy: "গোপনীয়তা নীতি"
  },
  uk: {
    title: "Облік відвідувань",
    text: "Цей сайт вимірює відвідування через Google Analytics. Ви можете погодитися або відмовитися.",
    deny: "Відмовитися",
    accept: "Погодитися",
    privacy: "Політика конфіденційності"
  },
  tl: {
    title: "Pagsukat ng pagbisita",
    text: "Sinusukat ng site na ito ang pagbisita gamit ang Google Analytics. Maaari kayong pumayag, o tumanggi.",
    deny: "Tumanggi",
    accept: "Pumayag",
    privacy: "Patakaran sa pagkapribado"
  },
  tr: {
    title: "Ziyaret ölçümü",
    text: "Bu site, ziyaretleri Google Analytics ile ölçer. Kabul edebilir ya da reddedebilirsiniz.",
    deny: "Reddet",
    accept: "Kabul et",
    privacy: "Gizlilik politikası"
  },
  ur: {
    title: "دوروں کی پیمائش",
    text: "یہ سائٹ Google Analytics سے دورے ناپتی ہے۔ آپ قبول کر سکتے ہیں، یا انکار کر سکتے ہیں۔",
    deny: "انکار",
    accept: "قبول",
    privacy: "رازداری کی پالیسی"
  },
  fa: {
    title: "سنجش بازدیدها",
    text: "این سایت بازدیدها را با Google Analytics می‌سنجد. می‌توانید بپذیرید یا رد کنید.",
    deny: "رد کردن",
    accept: "پذیرفتن",
    privacy: "سیاست حفظ حریم خصوصی"
  },
  it: {
    title: "Misurazione delle visite",
    text: "Questo sito misura le visite con Google Analytics. Può accettare o rifiutare.",
    deny: "Rifiuti",
    accept: "Accetti",
    privacy: "Informativa sulla privacy"
  },
  pl: {
    title: "Pomiar odwiedzin",
    text: "Ta strona mierzy odwiedziny za pomocą Google Analytics. Możesz zaakceptować albo odrzucić.",
    deny: "Odrzuć",
    accept: "Akceptuj",
    privacy: "Polityka prywatności"
  },
  sw: {
    title: "Kupima ziara",
    text: "Tovuti hii hupima ziara kwa kutumia Google Analytics. Unaweza kukubali au kukataa.",
    deny: "Kataa",
    accept: "Kubali",
    privacy: "Sera ya faragha"
  }
};

COPY["ja-x-soro"] = COPY.ja;

function writeConsent(value) {
  document.cookie = `${CONSENT_COOKIE}=${encodeURIComponent(value)}; Path=/; Max-Age=31536000; SameSite=Lax`;
}

function scriptPrefix() {
  const current = document.currentScript;
  const src = current ? current.getAttribute("src") || "" : "";
  const index = src.lastIndexOf("consent.js");
  return index >= 0 ? src.slice(0, index) : "";
}

function ensureConsentStyle() {
  if (document.getElementById("cftf-consent-style")) return;
  const style = document.createElement("style");
  style.id = "cftf-consent-style";
  style.textContent = `
    .consent {
      position: fixed;
      z-index: 2;
      inset-inline: 0;
      bottom: 0;
      box-sizing: border-box;
      padding: 1.15rem 1.2rem 1.3rem;
      background: rgba(251, 246, 236, 0.96);
      border-top: 1px solid var(--line, rgba(166, 132, 61, 0.45));
      color: var(--ink, #2a2118);
      text-align: center;
    }
    .consent[hidden] { display: none; }
    html.has-consent body { padding-bottom: 12rem; }
    .consent p {
      width: min(92vw, 36rem);
      margin: 0.3rem auto;
      line-height: 1.7;
      letter-spacing: 0.02em;
    }
    .consent-actions {
      display: flex;
      justify-content: center;
      flex-wrap: wrap;
      gap: 0.75rem;
      margin-top: 0.85rem;
    }
    .consent button {
      min-width: 8.5rem;
      margin: 0;
      padding: 0.45rem 1.1rem;
      border: 1px solid var(--gold, #a6843d);
      border-radius: 999px;
      background: transparent;
      color: #5c4318;
      font: inherit;
      line-height: 1.5;
      letter-spacing: 0.06em;
      cursor: pointer;
    }
    .consent button:hover { background: #f3e6cc; }
    .consent button:focus-visible {
      outline: 2px solid var(--gold, #a6843d);
      outline-offset: 3px;
    }
    .consent a,
    .consent a:link,
    .consent a:visited,
    .consent a:hover,
    .consent a:active {
      color: #7a5c2e;
      text-decoration-color: var(--gold, #a6843d);
      text-underline-offset: 0.18em;
    }
    .consent a:hover { color: #5c4318; }
  `;
  document.head.append(style);
}

function ensureCookiesLink() {
  const footer = document.querySelector("footer.colophon");
  if (!footer || footer.querySelector('a[href="?cookies"]')) return;
  const link = document.createElement("a");
  link.href = "?cookies";
  link.textContent = "Cookies";
  const github = footer.querySelector('a[href*="github.com"]');
  if (github) {
    github.before(link, document.createTextNode(" "));
    return;
  }
  const paragraph = [...footer.querySelectorAll("p")].find((item) => !item.classList.contains("lang-links"));
  if (!paragraph) return;
  paragraph.append(document.createTextNode(" "), link);
}

function ensureBanner(copy, privacyHref) {
  let banner = document.querySelector(".consent");
  if (banner) return banner;
  banner = document.createElement("aside");
  banner.className = "consent";
  banner.hidden = true;
  banner.setAttribute("role", "dialog");
  banner.setAttribute("aria-labelledby", "consent-title");
  banner.innerHTML = `
    <p id="consent-title"></p>
    <p class="consent-text"></p>
    <p class="consent-actions">
      <button type="button" data-consent="denied"></button>
      <button type="button" data-consent="granted"></button>
    </p>
    <p><a class="consent-privacy"></a></p>
  `;
  const footer = document.querySelector("footer.colophon");
  if (footer) footer.before(banner);
  else document.body.append(banner);
  banner.querySelector("#consent-title").textContent = copy.title;
  banner.querySelector(".consent-text").textContent = copy.text;
  banner.querySelector('[data-consent="denied"]').textContent = copy.deny;
  banner.querySelector('[data-consent="granted"]').textContent = copy.accept;
  const privacy = banner.querySelector(".consent-privacy");
  privacy.textContent = copy.privacy;
  privacy.href = privacyHref;
  return banner;
}

ensureConsentStyle();
ensureCookiesLink();

const consentState = window.cftfConsent;
const copy = COPY[document.documentElement.lang] || COPY.en;
const consentBanner = consentState && consentState.showBanner
  ? ensureBanner(copy, `${scriptPrefix()}privacy/`)
  : null;
if (consentBanner) {
  document.documentElement.classList.add("has-consent");
  consentBanner.hidden = false;
  consentBanner.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-consent]");
    if (!button) return;
    const granted = button.dataset.consent === "granted";
    writeConsent(granted ? "granted" : "denied");
    if (granted && window.cftfLoadAnalytics) window.cftfLoadAnalytics();
    consentBanner.hidden = true;
    document.documentElement.classList.remove("has-consent");
  });
}
})();
