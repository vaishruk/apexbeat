/* ============================================================
   CardioLumen — global topic search
   Self-contained: injects its own nav button + overlay so it
   works identically on every page. Cmd/Ctrl-K to open, arrow
   keys to move, Enter to go, Esc to close.
   ============================================================ */
(function () {
  // path prefix so links resolve from /, /modules/, /pages/
  const base = /\/(modules|pages)\//.test(location.pathname) ? "../" : "";

  // ---- searchable index (kept static so it works without data.js) ----
  const SEC = [
    ["Curriculum overview", "Section", "index.html#curriculum", "topics syllabus"],
    ["Learning pathway", "Section", "index.html#pathway", "levels foundations advanced fellowship"],
    ["ECG Lab", "Interactive lab", "index.html#labs", "electrocardiogram rhythm strip 12-lead waveform"],
    ["Echocardiography Lab", "Interactive lab", "index.html#labs", "echo ultrasound views doppler mcconnell"],
    ["Hemodynamics Lab", "Interactive lab", "index.html#labs", "swan ganz rhc pressure waveform wedge pcwp"],
    ["Clinical Cases", "Section", "index.html#cases", "case chest pain shock afib heart failure syncope"],
    ["Guideline Library", "Section", "index.html#guidelines", "acc aha esc class recommendation evidence"],
    ["Board Review", "Section", "index.html#board", "questions quiz qotd"],
    ["Fellowship Preparation", "Section", "index.html#fellowship", "cv electives mentorship interview personal statement"],
    ["Research & Evidence", "Section", "index.html#research", "trials meta-analysis journal club appraisal"],
    ["About the Creator", "Section", "index.html#about", "vaishnavi sabesan author"],
    ["Editorial & academic policies", "Page", "pages/policies.html", "referencing review corrections disclaimer privacy"],
  ];

  // curriculum topics -> deep data-driven modules (module.html?t=slug)
  const mod = (slug) => "modules/module.html?t=" + slug;
  const TOPICS = [
    ["Acute Chest Pain & ACS", 1, mod("acute-coronary-syndromes"), "stemi nstemi troponin mi infarction reperfusion pci universal definition myocardial injury"],
    ["Ischemic Heart Disease", 1, mod("acute-coronary-syndromes"), "angina cad stemi nstemi coronary acs"],
    ["Chronic Coronary Disease", 1, mod("chronic-coronary-disease"), "stable angina ischemia trial ffr revascularization cabg pci"],
    ["Cardiovascular Anatomy & Physiology", 1, mod("anatomy-physiology"), "chambers valves coronary pressure volume cardiac cycle"],
    ["Clinical Examination", 1, mod("clinical-examination"), "jvp murmur heart sounds palpation"],
    ["Electrocardiography", 1, mod("electrocardiography"), "ecg ekg axis intervals morphology block"],
    ["Heart Failure", 1, mod("heart-failure"), "hfref hfpef gdmt decongestion bnp four pillars sglt2 arni"],
    ["Advanced Heart Failure", 3, mod("advanced-heart-failure"), "lvad transplant inotrope intermacs stage d"],
    ["Atrial Fibrillation", 2, mod("atrial-fibrillation"), "afib cha2ds2 vasc anticoagulation doac ablation watchman rate rhythm"],
    ["Cardiac Arrhythmias", 2, mod("cardiac-arrhythmias"), "tachycardia bradycardia svt vt avnrt pacing"],
    ["Valvular Heart Disease", 2, mod("valvular-heart-disease"), "aortic mitral stenosis regurgitation tavr teer"],
    ["Hypertension", 1, mod("hypertension"), "blood pressure secondary aldosteronism resistant"],
    ["Preventive Cardiology & Lipids", 1, mod("preventive-cardiology"), "lipid statin ldl pcsk9 ascvd cac lp(a) prevention"],
    ["Pericardial Disease", 2, mod("pericardial-disease"), "pericarditis effusion tamponade constriction colchicine"],
    ["Cardiomyopathies", 2, mod("cardiomyopathies"), "dilated hypertrophic hcm restrictive amyloid sarcoid arvc"],
    ["Pulmonary Hypertension", 3, mod("pulmonary-hypertension"), "who groups rv pa coupling pah pvr"],
    ["Adult Congenital Heart Disease", 3, mod("adult-congenital"), "shunt asd vsd cyanotic tetralogy eisenmenger"],
    ["Aortic & Peripheral Vascular Disease", 2, mod("aortic-disease"), "aneurysm dissection pad claudication"],
    ["Cardiogenic Shock", 3, mod("cardiogenic-shock"), "scai inotrope mcs impella ecmo shock"],
    ["Syncope", 2, mod("syncope"), "reflex orthostatic cardiac tilt loop recorder"],
    ["Echocardiography", 2, mod("echocardiography"), "echo views strain doppler diastolic ef"],
    ["Nuclear, CT & Cardiac MRI", 3, mod("cardiac-imaging"), "spect pet perfusion calcium ccta cmr lge amyloid viability"],
    ["Hemodynamics", 3, mod("hemodynamics"), "rhc fick thermodilution svr pvr wedge waveform"],
    ["Electrophysiology & Devices", 3, mod("electrophysiology"), "ep ablation pacemaker crt icd conduction"],
    ["Interventional Cardiology", 3, mod("interventional-cardiology"), "pci angiography ffr structural stent"],
    ["Cardio-Oncology", 2, mod("cardio-oncology"), "cardiotoxicity chemotherapy anthracycline immune checkpoint"],
    ["Cardiology in Pregnancy", 2, mod("cardiology-pregnancy"), "peripartum cardiomyopathy mwho physiology"],
    ["Mechanical Circulatory Support", 3, mod("mechanical-circulatory-support"), "impella iabp ecmo lvad tandemheart cardiogenic shock alarms unloading"],
    ["Percutaneous Coronary Intervention", 3, mod("pci"), "pci stent guidewire cto ivus oct ffr perforation no-reflow cangrelor"],
    ["Reading the Coronary Angiogram", 3, mod("cath-interpretation"), "angiogram cath views rao lao lad culprit occlusion timi collateral"],
    ["Noninvasive Ischemia Evaluation", 2, mod("ischemic-evaluation"), "stress test spect pet echo cta calcium score tid perfusion duke"],
  ];

  const LVL = { 1: "Level 1 · Foundations", 2: "Level 2 · Advanced", 3: "Level 3 · Fellowship" };
  const INDEX = [
    ...SEC.map(([t, s, u, k]) => ({ t, s, u, k, kind: "sec" })),
    ...TOPICS.map(([t, l, u, k]) => ({ t, s: LVL[l], u, k, lvl: l, kind: "topic" })),
  ];

  // ---- inject nav button ----
  const nav = document.querySelector(".nav-inner");
  let btn;
  if (nav) {
    btn = document.createElement("button");
    btn.className = "icon-btn nav-search-btn";
    btn.setAttribute("aria-label", "Search topics");
    btn.title = "Search topics (⌘/Ctrl K)";
    btn.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>';
    const themeBtn = nav.querySelector("[data-theme-toggle]");
    if (themeBtn) nav.insertBefore(btn, themeBtn);
    else nav.appendChild(btn);
  }

  // ---- inject overlay ----
  const ov = document.createElement("div");
  ov.className = "search-overlay";
  ov.setAttribute("hidden", "");
  ov.innerHTML =
    '<div class="search-box" role="dialog" aria-modal="true" aria-label="Search topics">' +
      '<div class="search-input-row">' +
        '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4.3-4.3"/></svg>' +
        '<input id="siteSearch" type="search" autocomplete="off" spellcheck="false" placeholder="Search topics — ECG, heart failure, McConnell, tamponade…" aria-label="Search topics" />' +
        '<kbd>Esc</kbd>' +
      '</div>' +
      '<div class="search-results" id="searchResults" role="listbox"></div>' +
    '</div>';
  document.body.appendChild(ov);

  const input = ov.querySelector("#siteSearch");
  const resultsEl = ov.querySelector("#searchResults");
  let active = 0, matches = [];

  function score(item, q) {
    const t = item.t.toLowerCase(), k = (item.k || "").toLowerCase();
    if (t.startsWith(q)) return 3;
    if (t.includes(q)) return 2;
    if (k.includes(q)) return 1;
    return 0;
  }
  function render() {
    const q = input.value.trim().toLowerCase();
    matches = !q
      ? INDEX.filter((i) => i.kind === "sec")
      : INDEX.map((i) => ({ i, sc: score(i, q) })).filter((x) => x.sc > 0)
          .sort((a, b) => b.sc - a.sc).map((x) => x.i).slice(0, 9);
    active = 0;
    if (!matches.length) {
      resultsEl.innerHTML = '<div class="search-empty">No topics match “' + input.value.trim() + '”.</div>';
      return;
    }
    resultsEl.innerHTML = matches.map((m, idx) =>
      '<a class="search-result' + (idx === 0 ? " active" : "") + '" href="' + base + m.u + '" role="option" data-idx="' + idx + '">' +
        '<span class="sr-dot' + (m.lvl ? " l" + m.lvl : "") + '"></span>' +
        '<span class="sr-main"><b>' + m.t + '</b><span>' + m.s + '</span></span>' +
        '<svg class="sr-go" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>' +
      '</a>'
    ).join("");
  }
  function setActive(n) {
    const items = [...resultsEl.querySelectorAll(".search-result")];
    if (!items.length) return;
    active = (n + items.length) % items.length;
    items.forEach((el, i) => el.classList.toggle("active", i === active));
    items[active].scrollIntoView({ block: "nearest" });
  }
  function go() {
    const items = [...resultsEl.querySelectorAll(".search-result")];
    if (items[active]) window.location.href = items[active].getAttribute("href");
  }

  function open() {
    ov.removeAttribute("hidden");
    requestAnimationFrame(() => ov.classList.add("open"));
    document.body.style.overflow = "hidden";
    input.value = "";
    render();
    input.focus();
  }
  function close() {
    ov.classList.remove("open");
    document.body.style.overflow = "";
    setTimeout(() => ov.setAttribute("hidden", ""), 180);
  }

  btn && btn.addEventListener("click", open);
  input.addEventListener("input", render);
  ov.addEventListener("click", (e) => { if (e.target === ov) close(); });
  resultsEl.addEventListener("mousemove", (e) => {
    const r = e.target.closest(".search-result");
    if (r) setActive(+r.dataset.idx);
  });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { e.preventDefault(); setActive(active + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
    else if (e.key === "Enter") { e.preventDefault(); go(); }
    else if (e.key === "Escape") { e.preventDefault(); close(); }
  });
  document.addEventListener("keydown", (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") { e.preventDefault(); ov.hasAttribute("hidden") ? open() : close(); }
    else if (e.key === "/" && ov.hasAttribute("hidden") && !/input|textarea/i.test(e.target.tagName)) { e.preventDefault(); open(); }
  });
})();
