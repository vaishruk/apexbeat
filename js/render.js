/* ============================================================
   CardioLumen — render layer
   Builds curriculum, featured, cases, echo, guidelines, prep.
   ============================================================ */
(function () {
  const D = window.DATA;
  if (!D) return;
  const $ = (s) => document.querySelector(s);
  const svg = (inner, extra = "") =>
    `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" ${extra}>${inner}</svg>`;
  const arrow = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
  const lvlName = { 1: "Foundations", 2: "Advanced", 3: "Fellowship" };

  /* map curriculum titles -> deep module slugs (module.html?t=slug) */
  const SLUG = {
    "Cardiovascular Anatomy & Physiology": "anatomy-physiology",
    "Clinical Examination": "clinical-examination",
    "Electrocardiography": "electrocardiography",
    "Ischemic Heart Disease": "acute-coronary-syndromes",
    "Heart Failure": "heart-failure",
    "Cardiac Arrhythmias": "cardiac-arrhythmias",
    "Valvular Heart Disease": "valvular-heart-disease",
    "Hypertension": "hypertension",
    "Preventive Cardiology": "preventive-cardiology",
    "Pericardial Disease": "pericardial-disease",
    "Cardiomyopathies": "cardiomyopathies",
    "Pulmonary Hypertension": "pulmonary-hypertension",
    "Adult Congenital Heart Disease": "adult-congenital",
    "Aortic & Peripheral Vascular Disease": "aortic-disease",
    "Cardiogenic Shock": "cardiogenic-shock",
    "Echocardiography": "echocardiography",
    "Nuclear & CT Imaging": "cardiac-imaging",
    "Cardiac MRI": "cardiac-imaging",
    "Hemodynamics": "hemodynamics",
    "Electrophysiology": "electrophysiology",
    "Interventional Cardiology": "interventional-cardiology",
    "Advanced Heart Failure": "advanced-heart-failure",
    "Cardio-Oncology": "cardio-oncology",
    "Cardiology in Pregnancy": "cardiology-pregnancy",
    "Mechanical Circulatory Support": "mechanical-circulatory-support",
    "Percutaneous Coronary Intervention": "pci",
    "Reading the Coronary Angiogram": "cath-interpretation",
    "Noninvasive Ischemia Evaluation": "ischemic-evaluation",
  };
  const moduleHref = (title) => "modules/module.html?t=" + (SLUG[title] || "");
  window.__CL_SLUG = SLUG;

  /* ---- curriculum ---- */
  const cg = $("#curricGrid");
  if (cg) {
    cg.innerHTML = D.curriculum.map((c, i) => {
      const href = moduleHref(c.t);
      return `<article class="topic-card gs-reveal" data-level="${c.lvl}" data-delay="${(i % 4) * 0.05}">
        <div class="topic-icon ${c.color || ""}">${svg(c.icon)}</div>
        <div style="display:flex;gap:8px;align-items:center">
          <span class="level-badge level-${c.lvl}">L${c.lvl}</span>
          <button class="topic-bm icon-btn" style="width:28px;height:28px;margin-left:auto" data-bookmark="topic-${i}" aria-label="Bookmark ${c.t}" title="Bookmark">
            ${svg('<path d="M6 3h12v18l-6-4-6 4z"/>')}
          </button>
        </div>
        <h4>${c.t}</h4>
        <p>${c.d}</p>
        <div class="topic-progress"><i style="width:${c.prog}%"></i></div>
        <div class="topic-meta"><span>${c.lessons} lessons</span><span>·</span><span>${c.time}</span><span>·</span><span>${lvlName[c.lvl]}</span></div>
        <a href="${href}" class="topic-link">Explore Topic ${arrow}</a>
      </article>`;
    }).join("");
  }

  /* ---- featured (each with a tiny inline viz from labs.js) ---- */
  const featSlug = {
    ecg: "electrocardiography", cycle: "anatomy-physiology", pvloop: "hemodynamics",
    shock: "cardiogenic-shock", echo: "echocardiography", rhc: "hemodynamics",
    coronary: "acute-coronary-syndromes", gdmt: "heart-failure",
  };
  const fg = $("#featuredGrid");
  if (fg) {
    fg.innerHTML = D.featured.map((f, i) =>
      `<article class="feat-card gs-reveal" data-delay="${(i % 4) * 0.05}">
        <div class="feat-visual" data-viz="${f.viz}"></div>
        <div class="feat-body">
          <span class="level-badge level-${i < 3 ? 1 : i < 6 ? 2 : 3}">Interactive</span>
          <h4>${f.t}</h4>
          <p class="feat-obj">${f.o}</p>
          <a href="modules/module.html?t=${featSlug[f.viz] || "acute-coronary-syndromes"}" class="topic-link" style="margin-top:4px">Open module ${arrow}</a>
        </div>
      </article>`
    ).join("");
  }

  /* ---- clinical cases ---- */
  const caseSlugs = ["acute-coronary-syndromes", "cardiogenic-shock", "atrial-fibrillation", "heart-failure", "syncope"];
  const cs = $("#casesStack");
  if (cs) {
    cs.innerHTML = D.cases.map((c, ci) =>
      `<div class="case-card-wrap">
        <article class="case-card">
          <div class="case-head">
            <span class="case-num">${c.num}</span>
            <h3>${c.title}</h3>
            <span class="level-badge level-${c.lvl}">Level ${c.lvl}</span>
          </div>
          <div class="case-grid">
            <div>
              <p class="case-presenting">${c.present}</p>
              <div class="vitals">
                ${c.vitals.map(([k, v], idx) => `<div class="vital ${idx === 0 && +v > 110 ? "" : ""}"><span>${k}</span><b>${v}</b></div>`).join("")}
              </div>
              <div class="case-labs">
                ${c.labs.map(([k, v, crit]) => `<span class="${crit ? "crit" : ""}">${k}: ${v}</span>`).join("")}
              </div>
            </div>
            <div class="case-side">
              <div class="case-ecg" data-caseecg="${c.ecg}"></div>
              <div class="case-q"><b>Clinical reasoning</b>${c.q}</div>
            </div>
          </div>
          <div class="case-foot">
            <span class="case-meta-item">${svg('<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>')} ${c.time}</span>
            <span class="case-meta-item">${svg('<path d="M4 4h16v12H4zM4 20h16"/>')} Progressive reveal</span>
            <span class="spacer"></span>
            <a href="modules/module.html?t=${caseSlugs[ci] || "acute-coronary-syndromes"}" class="btn btn-primary btn-sm">Begin Case ${arrow}</a>
          </div>
        </article>
      </div>`
    ).join("");
  }

  /* ---- echo videos are rendered in labs.js (real embeds) ---- */

  /* ---- guidelines ---- */
  const gg = $("#guideGrid");
  if (gg) {
    const catSlug = {
      "Chronic Coronary Disease": "chronic-coronary-disease", "Valvular Heart Disease": "valvular-heart-disease",
      "Bradycardia and Conduction Disease": "cardiac-arrhythmias", "Hypertension": "hypertension",
      "Dyslipidemia": "preventive-cardiology", "Syncope": "syncope", "Pulmonary Hypertension": "pulmonary-hypertension",
      "Pericardial Disease": "pericardial-disease", "Ventricular Arrhythmias": "cardiac-arrhythmias",
      "Acute Coronary Syndromes": "acute-coronary-syndromes", "Heart Failure": "heart-failure", "Atrial Fibrillation": "atrial-fibrillation",
    };
    const corLabel = { 1: "I", "2a": "IIa", "2b": "IIb", 3: "III" };
    gg.innerHTML = D.guidelines.map((g) => {
      const sourced = !!g.url;
      const footer = sourced
        ? `<div class="guide-cite">${g.cite}</div>
           <div style="display:flex;align-items:center;gap:10px;margin-top:2px">
             <span class="sample-tag" style="color:var(--teal);border-color:color-mix(in srgb,var(--teal) 45%,transparent)">Paraphrased · see source</span>
             <a href="${g.url}" target="_blank" rel="noopener" class="topic-link" style="margin-left:auto">Official guideline ↗</a>
           </div>`
        : `<div style="display:flex;align-items:center;gap:10px;margin-top:4px">
             <span class="sample-tag">Sample</span>
             <a href="modules/module.html?t=${catSlug[g.cat] || ""}" class="topic-link" style="margin-left:auto">View module ${arrow}</a>
           </div>`;
      return `<article class="guide-card gs-reveal" data-cat="${g.cat}">
        <div class="guide-org"><span class="org-badge">${g.org}</span><span>${g.cat}</span><span style="margin-left:auto">${g.year}</span></div>
        <h4>${g.title}</h4>
        <div class="guide-recs">
          ${g.recs.map(([txt, cor, loe]) =>
            `<div class="guide-rec"><span class="chips"><span class="cor-chip cor-${cor}">${corLabel[cor]}</span><span class="cor-chip loe">${loe}</span></span><span>${txt}</span></div>`
          ).join("")}
        </div>
        ${footer}
      </article>`;
    }).join("");
  }

  /* ---- prep ---- */
  const pg = $("#prepGrid");
  if (pg) {
    pg.innerHTML = D.prep.map((p, i) =>
      `<article class="prep-card gs-reveal" data-delay="${(i % 4) * 0.04}">
        <div class="prep-icon">${svg(p.icon)}</div>
        <h4>${p.t}</h4>
        <p>${p.d}</p>
      </article>`
    ).join("");
  }

  /* ---- landmark trials ---- */
  const tg = $("#trialsGrid");
  if (tg && D.trials) {
    tg.innerHTML = D.trials.map((t) =>
      `<a class="trial-card gs-reveal" data-cat="${t.cat}" href="${t.url}" target="_blank" rel="noopener">
        <div class="trial-head"><b>${t.name}</b><span>${t.cat}</span></div>
        <p class="trial-q">${t.q}</p>
        <p class="trial-r">${t.r}</p>
        <span class="trial-link">PubMed ↗</span>
      </a>`
    ).join("");
  }

  /* signal that dynamic content exists so labs.js can decorate it */
  window.dispatchEvent(new CustomEvent("cl:rendered"));
})();
