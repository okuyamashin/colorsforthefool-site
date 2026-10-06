// 札を引いて、物語と色を見せる。?test=札-色（札 1〜22、色 1〜5: 白・ピンク・黒・金・プラチナ）&open=1 ですぐ開く。
(function () {
  const $ = (s) => document.querySelector(s);
  const GLOW = {
    white: "rgba(255, 250, 238, .5)", pink: "rgba(244, 160, 190, .55)", black: "rgba(160, 150, 170, .4)",
    gold: "rgba(232, 190, 100, .6)", platinum: "rgba(205, 215, 230, .55)",
  };
  const params = new URLSearchParams(location.search);
  let pick = null;

  function choose() {
    const t = (params.get("test") || "").match(/^(\d+)-(\d+)$/);
    if (t && !pick) {
      const c = CARDS[+t[1] - 1], col = COLORS[+t[2] - 1];
      if (c && col) return { card: c, color: col };
    }
    return {
      card: CARDS[Math.floor(Math.random() * CARDS.length)],
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };
  }

  function fill(p) {
    const s = STORIES[p.card], c = s[p.color];
    $("#face").src = `assets/${p.card}.webp`;
    $("#face").alt = `${s.en}（${s.ja}）`;
    $("#title-en").textContent = s.en;
    $("#title-ja").textContent = s.ja;
    // 本文の最後の段落（「そんな、…ラッキーカラーは」）は着地の前置きとして分ける
    const paras = c.body.split(/\n\s*\n/);
    const lead = paras.length > 1 ? paras.pop() : "";
    $("#story").textContent = paras.join("\n\n");
    $("#lead").textContent = lead;
    $("#bottle").src = `assets/color-${p.color}.webp`;
    $("#bottle").alt = c.colorJa;
    $("#color-en").textContent = c.colorEn;
    $("#color-ja").textContent = c.colorJa;
    $("#close").textContent = c.close;
    document.documentElement.style.setProperty("--glow", GLOW[p.color]);
  }

  function open() {
    if (document.body.classList.contains("is-open")) return;
    pick = choose();
    fill(pick);
    const img = new Image();
    img.src = `assets/${pick.card}.webp`;
    const go = () => {
      document.body.classList.add("is-open");
      setTimeout(() => {
        $("#panel").classList.add("show");
        requestAnimationFrame(() => requestAnimationFrame(() => $("#panel").classList.add("in")));
      }, 900);
    };
    img.decode ? img.decode().then(go, go) : (img.onload = go);
  }

  function again() {
    window.scrollTo({ top: 0, behavior: "smooth" });
    $("#panel").classList.remove("in");
    $("#landing").classList.remove("lit");
    setTimeout(() => {
      $("#panel").classList.remove("show");
      document.body.classList.remove("is-open");
    }, 600);
  }

  const io = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) e.target.classList.add("lit"); });
  }, { threshold: 0.25 });
  io.observe($("#landing"));

  $("#card").addEventListener("click", open);
  $("#again").addEventListener("click", again);
  if (params.get("open") === "1") setTimeout(open, 300);
  if (params.get("lit") === "1") $("#landing").classList.add("lit");

  // シャンパンの泡のような光の粒
  const cv = $("#bubbles"), ctx = cv.getContext("2d");
  let W, H, dots;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  function size() {
    const r = Math.min(devicePixelRatio || 1, 2);
    W = innerWidth; H = innerHeight; cv.width = W * r; cv.height = H * r;
    cv.style.width = W + "px"; cv.style.height = H + "px"; ctx.setTransform(r, 0, 0, r, 0, 0);
    dots = Array.from({ length: Math.round(W * H / 14000) }, () => ({
      x: Math.random() * W, y: Math.random() * H, r: Math.random() * 1.3 + .3,
      v: Math.random() * .25 + .06, a: Math.random() * Math.PI * 2,
    }));
  }
  function tick() {
    ctx.clearRect(0, 0, W, H);
    for (const d of dots) {
      d.y -= d.v; d.a += .02; if (d.y < -4) { d.y = H + 4; d.x = Math.random() * W; }
      ctx.globalAlpha = .25 + .35 * (Math.sin(d.a) + 1) / 2;
      ctx.fillStyle = "#f3dca0";
      ctx.beginPath(); ctx.arc(d.x + Math.sin(d.a) * 2, d.y, d.r, 0, Math.PI * 2); ctx.fill();
    }
    if (!reduce) requestAnimationFrame(tick);
  }
  size(); tick(); addEventListener("resize", size);
})();
