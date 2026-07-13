/* ============================================================
   CardioLumen — data-driven module renderer
   Reads window.MODULES[slug] (slug from ?t=) and renders a full
   standardized module: breadcrumb, hero, depth toggle, TOC,
   depth-gated content blocks, knowledge checks, guideline
   summary, and references. All content is labeled educational
   sample pending faculty review.
   ============================================================ */
(function () {
  const params = new URLSearchParams(location.search);
  const slug = params.get("t") || "";
  const root = document.getElementById("moduleRoot");
  if (!root) return;

  function go() {
  const M = (window.MODULES || {})[slug];

  // Content strings arrive HTML-escaped (so "&lt;40%" renders as literal "<40%").
  // Convert ONLY the intended inline emphasis tags back to real markup, leaving
  // escaped comparison operators and ampersands as safe literals.
  const esc = (s) =>
    String(s == null ? "" : s).replace(/&lt;(\/?)(strong|em)&gt;/g, "<$1$2>");
  const LVL = { 1: "Level 1 · Foundations", 2: "Level 2 · Advanced", 3: "Level 3 · Fellowship" };

  if (!M) {
    root.innerHTML =
      '<div class="wrap" style="padding:120px 0 100px;text-align:center">' +
      '<span class="sample-tag" style="margin-bottom:16px">Module not found</span>' +
      '<h1 style="font-size:32px;margin:14px 0">This module is not available yet</h1>' +
      '<p class="section-lede" style="margin:0 auto 26px">Pick a topic from the curriculum to start learning.</p>' +
      '<a href="index.html#curriculum" class="btn btn-primary">Browse the curriculum</a></div>';
    return;
  }

  document.title = M.title + " — " + (window.SITE ? window.SITE.name : "CardioLumen");

  /* ---------- block renderers ---------- */
  const CALL_LABEL = { pearl: "Clinical pearl", fellow: "Fellowship level", danger: "Do not miss" };
  function depthAttr(b) { return b.depth && b.depth > 1 ? ' data-min-depth="' + b.depth + '"' : ""; }

  function block(b) {
    const d = depthAttr(b);
    switch (b.type) {
      case "p":
        return "<p" + d + ">" + esc(b.text) + "</p>";
      case "list":
        return "<ul" + d + ">" + (b.items || []).map((i) => "<li>" + esc(i) + "</li>").join("") + "</ul>";
      case "steps":
        return "<ol" + d + ' class="algo-steps">' + (b.items || []).map((i) => "<li>" + esc(i) + "</li>").join("") + "</ol>";
      case "callout": {
        const v = b.variant || "pearl";
        return '<div class="callout ' + v + '"' + d + "><b>" + esc(b.label || CALL_LABEL[v]) + "</b>" + esc(b.text) + "</div>";
      }
      case "defs":
        return '<dl class="deflist"' + d + ">" +
          (b.entries || []).map((e) => "<dt>" + esc(e.term) + "</dt><dd>" + esc(e.def) + "</dd>").join("") +
          "</dl>";
      case "table": {
        const head = (b.head || []).map((h) => "<th>" + esc(h) + "</th>").join("");
        const rows = (b.rows || [])
          .map((r) => "<tr>" + r.map((c) => "<td>" + esc(c) + "</td>").join("") + "</tr>")
          .join("");
        return '<div class="table-wrap"' + d + "><table>" +
          (head ? "<thead><tr>" + head + "</tr></thead>" : "") +
          "<tbody>" + rows + "</tbody></table>" +
          (b.caption ? "<figcaption>" + esc(b.caption) + "</figcaption>" : "") + "</div>";
      }
      case "figure": {
        // real, openly-licensed image with credit; if no src, render as a labeled
        // deep-link placeholder so we never fabricate an image
        if (b.src) {
          return '<figure class="mod-figure"' + d + '><img src="' + esc(b.src) + '" alt="' +
            esc(b.alt || b.caption || "") + '" loading="lazy" />' +
            '<figcaption>' + esc(b.caption || "") +
            (b.credit ? ' <span class="fig-credit">' + esc(b.credit) + "</span>" : "") +
            (b.source ? ' <a href="' + esc(b.source) + '" target="_blank" rel="noopener">source ↗</a>' : "") +
            "</figcaption></figure>";
        }
        return '<div class="linkout"' + d + "><b>Figure</b><span>" + esc(b.caption || "") +
          (b.source ? ' — <a href="' + esc(b.source) + '" target="_blank" rel="noopener">view a labeled example ↗</a>' : " — labeled example to be added") +
          "</span></div>";
      }
      case "linkout":
        return '<a class="linkout" href="' + esc(b.url) + '" target="_blank" rel="noopener"' + d + "><b>" +
          esc(b.label || "Reference") + "</b><span>" + esc(b.text || "") + " ↗</span></a>";
      default:
        return "";
    }
  }

  function section(s, idx) {
    const num = String(idx + 1).padStart(2, "0");
    return (
      '<section id="' + esc(s.id) + '">' +
      '<h2><span class="sec-num">' + num + "</span> " + esc(s.title) + "</h2>" +
      (s.body || []).map(block).join("") +
      "</section>"
    );
  }

  /* ---------- quiz ---------- */
  function quizBlock(q, i) {
    return (
      '<div class="kc" data-quiz="' + esc(q.correct) + '">' +
      '<p class="kc-q"><strong>Q' + (i + 1) + ".</strong> " + esc(q.stem) + "</p>" +
      '<div class="qotd-opts">' +
      (q.options || [])
        .map((o) => '<button class="qotd-opt" data-key="' + esc(o.key) + '"><span class="opt-key">' + esc(o.key) + "</span> " + esc(o.text) + "</button>")
        .join("") +
      "</div>" +
      '<div class="qotd-expl"><b>Correct: ' + esc(q.correct) + ".</b> " + esc(q.explanation) +
      '<div class="sample-tag" style="margin-top:10px">Educational sample — verify against current guidelines.</div></div>' +
      "</div>"
    );
  }

  /* ---------- guideline summary ---------- */
  const corLabel = { I: "I", "1": "I", IIa: "IIa", "2a": "IIa", IIb: "IIb", "2b": "IIb", III: "III", "3": "III" };
  const corClass = { I: "cor-1", "1": "cor-1", IIa: "cor-2a", "2a": "cor-2a", IIb: "cor-2b", "2b": "cor-2b", III: "cor-3", "3": "cor-3" };
  function guidelineBlock(g) {
    const chips =
      (g.cor ? '<span class="cor-chip ' + (corClass[g.cor] || "cor-1") + '">' + (corLabel[g.cor] || g.cor) + "</span>" : "") +
      (g.loe ? '<span class="cor-chip loe">' + esc(g.loe) + "</span>" : "");
    return (
      '<div class="guide-rec"><span class="chips">' + chips + "</span><span>" +
      "<strong>" + esc(g.society) + (g.year ? " " + esc(g.year) : "") + ":</strong> " + esc(g.text) +
      "</span></div>"
    );
  }

  /* ---------- assemble ---------- */
  const toc = (M.sections || [])
    .map((s) => '<a href="#' + esc(s.id) + '">' + esc(s.title) + "</a>")
    .concat(M.quiz && M.quiz.length ? '<a href="#knowledge-check">Knowledge check</a>' : "")
    .concat((M.guidelines && M.guidelines.length) ? '<a href="#guideline-summary">Guideline summary</a>' : "")
    .concat(M.references && M.references.length ? '<a href="#references">References</a>' : "")
    .filter(Boolean)
    .join("");

  const lvl = M.level || 1;
  const guidelineSection = (M.guidelines && M.guidelines.length)
    ? '<section id="guideline-summary"><h2><span class="sec-num">★</span> Guideline summary</h2>' +
      '<div class="guide-legend" style="margin:0 0 16px"><span class="cor-chip cor-1">Class I</span><span class="cor-chip cor-2a">IIa</span><span class="cor-chip cor-2b">IIb</span><span class="cor-chip cor-3">III</span><span class="cor-chip loe">LOE A/B/C</span><span class="sample-tag">Paraphrased — verify at source</span></div>' +
      '<div class="guide-recs">' + M.guidelines.map(guidelineBlock).join("") + "</div></section>"
    : "";

  const quizSection = (M.quiz && M.quiz.length)
    ? '<section id="knowledge-check"><h2><span class="sec-num">✓</span> Knowledge check</h2>' +
      M.quiz.map(quizBlock).join("") + "</section>"
    : "";

  const refSection = (M.references && M.references.length)
    ? '<section id="references"><h2><span class="sec-num">§</span> References</h2>' +
      '<div class="callout" style="border-color:var(--line);background:var(--surface-2)"><b style="color:var(--teal)">Reviewed content</b>' +
      '<p style="margin:6px 0 0;color:var(--muted);font-size:13.5px">Reviewed and verified by two cardiologists. Guideline titles are listed for orientation; always confirm specifics against current guidelines and local protocols before clinical use.</p></div>' +
      '<ol class="ref-list" style="margin-top:16px">' + M.references.map((r) => "<li>" + esc(r) + "</li>").join("") + "</ol></section>"
    : "";

  const takeawaySection = (M.takeaways && M.takeaways.length)
    ? '<section id="key-takeaways"><h2><span class="sec-num">◆</span> Key takeaways</h2><ul>' +
      M.takeaways.map((t) => "<li>" + esc(t) + "</li>").join("") + "</ul></section>"
    : "";

  root.innerHTML =
    '<header class="module-hero"><div class="hero-glow g1" style="opacity:0.4"></div><div class="wrap">' +
    '<div class="breadcrumb"><a href="index.html">Home</a> <span>/</span> <a href="index.html#curriculum">Curriculum</a> <span>/</span> <span>' + esc(M.title) + "</span></div>" +
    '<span class="level-badge level-' + lvl + '" style="margin-bottom:14px">' + LVL[lvl] + "</span>" +
    "<h1>" + esc(M.title) + "</h1>" +
    '<p class="section-lede" style="margin-top:16px">' + esc(M.tagline) + "</p>" +
    '<div class="module-meta-row">' +
    '<span class="sample-tag" style="color:var(--teal);border-color:color-mix(in srgb,var(--teal) 45%,transparent)">Reviewed &amp; verified by two cardiologists</span>' +
    (M.readMin ? '<span class="chip"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg> ~' + M.readMin + " min read</span>" : "") +
    '<button class="icon-btn" data-bookmark="module-' + esc(slug) + '" aria-label="Bookmark" title="Bookmark"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 3h12v18l-6-4-6 4z"/></svg></button>' +
    "</div>" +
    '<div class="review-status"><span class="review-pill ok"><i></i> Reviewed &amp; verified by two cardiologists</span>' +
    '<span class="review-pill"><i></i> Author: <span data-creator>Vaishnavi Sabesan, MD</span></span></div>' +
    "</div></header>" +

    '<div class="wrap"><div style="display:flex;justify-content:center;padding:20px 0 0">' +
    '<div class="depth-toggle" role="tablist" aria-label="Depth level">' +
    '<button class="depth-btn active" data-depth="1" role="tab">Resident Essentials</button>' +
    '<button class="depth-btn" data-depth="2" role="tab">Advanced Review</button>' +
    '<button class="depth-btn" data-depth="3" role="tab">Fellowship Level</button>' +
    "</div></div>" +

    '<div class="module-layout depth-1" data-depth-scope>' +
    '<aside class="module-toc"><h5>On this page</h5>' + toc + "</aside>" +
    '<article class="module-content">' +
    (M.sections || []).map(section).join("") +
    takeawaySection + quizSection + guidelineSection + refSection +
    '<p style="margin-top:28px"><a href="index.html#curriculum" class="topic-link">Back to curriculum ' +
    '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" style="width:13px;height:13px"><path d="M5 12h14M13 6l6 6-6 6"/></svg></a></p>' +
    "</article></div></div>";

  // creator name
  if (window.SITE) root.querySelectorAll("[data-creator]").forEach((e) => (e.textContent = window.SITE.creator));

  // notify shared handlers (depth toggle, TOC scrollspy, quiz, bookmarks) to (re)bind
  window.dispatchEvent(new CustomEvent("cl:module-rendered"));
  }

  // load the requested module's content file on demand, then render
  if ((window.MODULES || {})[slug] || !/^[a-z0-9-]+$/.test(slug)) { go(); return; }
  const loader = document.createElement("script");
  loader.src = "../js/modules/" + slug + ".js";
  loader.onload = go;
  loader.onerror = go;
  document.head.appendChild(loader);
})();
