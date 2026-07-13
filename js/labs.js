/* ============================================================
   ApexBeat — labs engine
   ECG Lab now shows REAL openly-licensed 12-lead ECGs (Wikimedia
   Commons, attributed). Echo Lab embeds REAL teaching clips from
   their original channels. Hemodynamics uses procedurally-drawn
   pressure tracings (schematic teaching diagrams). Featured-card
   mini-visuals are clean line art.
   ============================================================ */
(function () {
  const NS = "http://www.w3.org/2000/svg";
  const el = (t, a) => { const e = document.createElementNS(NS, t); for (const k in a) e.setAttribute(k, a[k]); return e; };
  const base = /\/(modules|pages)\//.test(location.pathname) ? "../" : "";

  /* =================== REAL ECG LAB =================== */
  const ECG = {
    nsr: {
      img: "assets/ecg/sinus.jpg", label: "12-LEAD · computer-generated reference",
      title: "Normal sinus rhythm",
      desc: "Upright P before every QRS, PR 120–200 ms, narrow QRS (< 120 ms), rate 60–100. The reference against which every abnormality is judged.",
      points: ["<strong>Rate</strong> — 300 ÷ large boxes between R waves.", "<strong>Rhythm</strong> — regular, P before every QRS.", "<strong>Axis</strong> — quadrant check with leads I and aVF.", "<strong>Intervals</strong> — PR, QRS, and a corrected QT.", "<strong>Morphology</strong> — chamber size, Q waves, ST–T."],
      fellow: "Always correct the QT — Bazett over-corrects at fast rates, so cross-check with Fridericia. A single normal tracing never excludes ACS; serial ECGs and the clinical story outweigh any one strip.",
      attrib: 'ECG: Glenlarson, Wikimedia Commons — public domain.',
    },
    afib: {
      img: "assets/ecg/afib.jpg", label: "12-LEAD · atrial fibrillation ~90 bpm",
      title: "Atrial fibrillation",
      desc: "Irregularly irregular rhythm with no organized P waves and a fibrillatory baseline; ventricular response about 90/min here.",
      points: ["<strong>Rhythm</strong> — irregularly irregular R-R.", "<strong>P waves</strong> — absent; fibrillatory (f) waves instead.", "<strong>Rate</strong> — assess for adequate control.", "<strong>QRS</strong> — narrow unless aberrancy or bundle branch block.", "<strong>Search</strong> — pre-excitation, prior infarct, LVH."],
      fellow: "Anticoagulation follows CHA₂DS₂-VASc and is independent of rhythm strategy or AF burden — a controlled rate does not lower stroke risk. EAST-AFNET 4 supports early rhythm control in recently diagnosed AF; a regularized wide-complex AF should raise concern for pre-excited AF, where AV-nodal blockers are contraindicated.",
      attrib: 'ECG: Ewingdo, CC BY-SA 4.0, via Wikimedia Commons.',
    },
    stemi: {
      img: "assets/ecg/anterior-mi.jpg", label: "12-LEAD · anterior injury pattern",
      title: "Anterior ST-elevation MI",
      desc: "ST elevation across the precordial leads (V1–V4) — a left-anterior-descending territory injury until proven otherwise.",
      points: ["<strong>ST elevation</strong> — ≥ 2 contiguous leads.", "<strong>Reciprocal change</strong> — confirms a true injury current.", "<strong>R-wave</strong> — poor precordial progression.", "<strong>Q waves</strong> — evolving transmural necrosis.", "<strong>Action</strong> — activate reperfusion now."],
      fellow: "Learn the STEMI-equivalents: de Winter T waves (upsloping ST depression with tall T in V1–V6) and hyperacute T waves precede frank elevation. Wellens' pattern (biphasic or deep symmetric T in V2–V3 when pain-free) signals critical proximal-LAD stenosis and is a contraindication to stress testing.",
      attrib: 'ECG: Glenlarson, Wikimedia Commons — public domain.',
    },
    inferior: {
      img: "assets/ecg/inferior-mi.jpg", label: "12-LEAD · inferior injury pattern",
      title: "Inferior ST-elevation MI",
      desc: "ST elevation in II, III, and aVF with reciprocal depression in I and aVL — usually a right-coronary (or dominant circumflex) occlusion.",
      points: ["<strong>STE</strong> — II, III, aVF.", "<strong>Reciprocal</strong> — I and aVL depression.", "<strong>Culprit clue</strong> — III > II elevation favors RCA.", "<strong>Right leads</strong> — V4R for RV infarction.", "<strong>Rhythm</strong> — watch for AV block."],
      fellow: "Record a right-sided ECG: RV involvement (STE in V4R) makes the patient preload-dependent, so nitrates and aggressive diuresis can precipitate hypotension. Inferior MI with bradyarrhythmia reflects AV-nodal ischemia or vagal tone and may respond to atropine — often transient, unlike infranodal block.",
      attrib: 'ECG: Glenlarson, Wikimedia Commons — public domain.',
    },
    avb3: {
      img: "assets/ecg/chb.jpg", label: "RHYTHM · complete AV dissociation",
      title: "Complete (third-degree) AV block",
      desc: "Atrioventricular dissociation — P waves and QRS complexes march independently, the atrial rate faster than the escape rhythm.",
      points: ["<strong>P–P and R–R</strong> — each regular, but dissociated.", "<strong>Atrial rate</strong> — faster than ventricular.", "<strong>Escape</strong> — narrow (junctional) vs wide (ventricular).", "<strong>Symptoms</strong> — syncope, fatigue, bradycardia.", "<strong>Therapy</strong> — usually permanent pacing."],
      fellow: "The escape focus predicts stability: a narrow junctional escape (40–60/min) is more reliable than a wide ventricular escape (20–40/min). Infranodal block — wide escape, often complicating anterior MI — is unstable and pacing-dependent, whereas nodal block from inferior MI or high vagal tone can be transient.",
      attrib: 'ECG: James Heilman, MD, CC BY-SA 3.0, via Wikimedia Commons.',
    },
  };

  const ecgImg = document.getElementById("labEcgImg");
  if (ecgImg) {
    function showEcg(key) {
      const d = ECG[key];
      ecgImg.src = base + d.img;
      ecgImg.alt = "12-lead ECG showing " + d.title.toLowerCase();
      document.getElementById("ecgScreenLabel").textContent = d.label;
      document.getElementById("ecgAttrib").innerHTML = d.attrib;
      document.getElementById("ecgTitle").textContent = d.title;
      document.getElementById("ecgDesc").textContent = d.desc;
      document.getElementById("ecgPoints").innerHTML = d.points.map((p) => "<li>" + p + "</li>").join("");
      document.getElementById("ecgFellowText").innerHTML = " " + d.fellow;
    }
    showEcg("nsr");
    document.querySelectorAll("[data-ecg]").forEach((b) =>
      b.addEventListener("click", () => {
        document.querySelectorAll("[data-ecg]").forEach((x) => x.classList.remove("on"));
        b.classList.add("on"); showEcg(b.dataset.ecg);
      })
    );
    // click-to-zoom lightbox
    const lb = document.createElement("div");
    lb.className = "ecg-lightbox"; lb.setAttribute("hidden", "");
    lb.innerHTML = '<img alt="Enlarged ECG" /><button class="ecg-lightbox-close" aria-label="Close">✕</button>';
    document.body.appendChild(lb);
    const lbImg = lb.querySelector("img");
    function openLb() { lbImg.src = ecgImg.src; lb.removeAttribute("hidden"); requestAnimationFrame(() => lb.classList.add("open")); }
    function closeLb() { lb.classList.remove("open"); setTimeout(() => lb.setAttribute("hidden", ""), 180); }
    document.getElementById("ecgZoom").addEventListener("click", openLb);
    ecgImg.addEventListener("click", openLb);
    lb.addEventListener("click", closeLb);
  }

  /* =================== REAL ECHO VIDEO GRID =================== */
  const ECHO = [
    { id: "0jK5jKG_Glc", t: "Parasternal Long Axis", tag: "Normal view", chan: "Echocardiography Nerds",
      cap: "The workhorse first view — assess LV size and function, the LVOT, the aortic and mitral valves, and the pericardium." },
    { id: "KNrumyLdTGs", t: "Apical Four-Chamber", tag: "Normal view", chan: "Medmastery",
      cap: "All four chambers and both AV valves; the view for biplane (Simpson's) ejection fraction and comparative RV size." },
    { id: "J2CQ7_VWXBA", t: "McConnell's Sign", tag: "Pulmonary embolism", chan: "Mad PoCUS",
      cap: "RV free-wall akinesis with preserved apical contraction — relatively specific for acute PE, separating acute RV pressure overload from chronic pulmonary hypertension." },
    { id: "tDloJNmdhuk", t: "Severe Aortic Stenosis", tag: "Valvular", chan: "Mayo Clinic",
      cap: "Calcified, restricted leaflets. Grade by peak velocity, mean gradient, and valve area; stay alert to low-flow low-gradient AS when EF is reduced." },
    { id: "Gu2Z4-Q3Wcg", t: "Severe Mitral Regurgitation", tag: "Color Doppler", chan: "Johnson's Cardiology",
      cap: "Color-Doppler grading — vena contracta width, PISA / effective regurgitant orifice, and pulmonary-vein flow reversal define severe primary MR." },
    { id: "V3MjoRkvD9w", t: "Tamponade Physiology", tag: "Pericardial", chan: "Peter Williams",
      cap: "Effusion with right-ventricular diastolic collapse — correlate with IVC plethora and respirophasic inflow variation to confirm tamponade physiology." },
    { id: "1tQHDBxHbiM", t: "Reduced LV Systolic Function", tag: "Cardiomyopathy", chan: "Ultrasound Board Review",
      cap: "A dilated, poorly contractile LV. Quantify EF biplane and exclude reversible and ischemic causes before labeling a non-ischemic cardiomyopathy." },
  ];
  const echoGrid = document.getElementById("echoGrid");
  if (echoGrid) {
    echoGrid.innerHTML = ECHO.map((v) =>
      `<article class="echo-vid gs-reveal">
        <div class="echo-frame">
          <iframe loading="lazy" src="https://www.youtube-nocookie.com/embed/${v.id}?rel=0"
            title="${v.t} — echocardiography teaching clip" frameborder="0" allowfullscreen
            allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"></iframe>
        </div>
        <div class="echo-vid-body">
          <span class="level-badge level-2">${v.tag}</span>
          <h4>${v.t}</h4>
          <p>${v.cap}</p>
          <span class="echo-credit">▶ ${v.chan}</span>
        </div>
      </article>`
    ).join("");
  }

  /* =================== Hemodynamics (schematic tracings) =================== */
  function toPathD(pts) { return pts.map((p, i) => (i ? "L" : "M") + p[0].toFixed(1) + " " + p[1].toFixed(1)).join(" "); }
  function gridInto(g, W, H, step) {
    g.innerHTML = "";
    for (let x = 0; x <= W; x += step) g.appendChild(el("line", { x1: x, y1: 0, x2: x, y2: H, stroke: "rgba(45,212,191,0.08)", "stroke-width": 1 }));
    for (let y = 0; y <= H; y += step) g.appendChild(el("line", { x1: 0, y1: y, x2: W, y2: y, stroke: "rgba(45,212,191,0.08)", "stroke-width": 1 }));
  }
  function hemoPath(kind, W, H) {
    const pts = [], baseY = H * 0.9, scale = H * 0.8, norm = (v, max) => baseY - (v / max) * scale, cycles = 4;
    for (let x = 0; x <= W; x++) {
      const t = ((x / W) * cycles) % 1; let v = 0, max = 40;
      if (kind === "ra") { max = 15; const a = 8 * Math.exp(-((t - 0.1) ** 2) / 0.002), c = 5 * Math.exp(-((t - 0.28) ** 2) / 0.001), vw = 7 * Math.exp(-((t - 0.62) ** 2) / 0.004); v = 3 + a + c + vw; }
      else if (kind === "rv") { max = 30; v = t < 0.4 ? 25 * Math.sin((t / 0.4) * Math.PI) ** 0.6 + 3 : 3 + 2 * (1 - (t - 0.4) / 0.6); }
      else if (kind === "pa") { max = 30; v = t < 0.4 ? 24 * Math.sin((t / 0.4) * Math.PI) ** 0.7 + 9 : 18 - 9 * ((t - 0.4) / 0.6) - (t > 0.45 && t < 0.5 ? -2 : 0); }
      else if (kind === "pcwp") { max = 20; const a = 6 * Math.exp(-((t - 0.12) ** 2) / 0.003), vw = 7 * Math.exp(-((t - 0.66) ** 2) / 0.005); v = 6 + a + vw; }
      pts.push([x, norm(v, max)]);
    }
    return pts;
  }
  const HEMO_META = {
    ra: { label: "RIGHT ATRIUM · pressure vs time", title: "Right atrial pressure", desc: "a wave (atrial contraction), c wave (tricuspid bulging), x descent, v wave (venous filling), y descent. Normal mean 2–6 mmHg.", clinical: "Elevated mean RA pressure suggests volume overload, RV failure, tricuspid disease, or pericardial constraint. Prominent a waves in reduced RV compliance; absent a waves in atrial fibrillation.", values: [["Mean", "2–6 mmHg"], ["a wave", "> v wave"], ["Descents", "x > y"], ["Kussmaul", "constriction"]] },
    rv: { label: "RIGHT VENTRICLE · pressure vs time", title: "Right ventricular pressure", desc: "Rapid systolic upstroke, low early-diastolic pressure, and a diastolic rise. Systolic normally 15–30, end-diastolic 2–8 mmHg.", clinical: "A dip-and-plateau (square-root sign) in diastole suggests constriction or restriction. Elevated systolic pressure implies pulmonary hypertension or pulmonic stenosis.", values: [["Systolic", "15–30"], ["End-diastolic", "2–8"], ["Upstroke", "rapid"], ["Sign", "dip-plateau"]] },
    pa: { label: "PULMONARY ARTERY · pressure vs time", title: "Pulmonary artery pressure", desc: "Systolic peak, dicrotic notch at pulmonic valve closure, then diastolic runoff. Normal mean ≤ 20 mmHg (updated PH threshold).", clinical: "PA diastolic approximates PCWP when pulmonary vascular resistance is normal; a widened PAd–PCWP gradient indicates pre-capillary (pulmonary vascular) disease.", values: [["Systolic", "15–30"], ["Diastolic", "4–12"], ["Mean", "≤ 20"], ["Notch", "pulmonic close"]] },
    pcwp: { label: "WEDGE (PCWP) · pressure vs time", title: "Pulmonary capillary wedge pressure", desc: "A left-atrial surrogate: a and v waves with x and y descents. Normal mean ≤ 12 mmHg; read at end-expiration.", clinical: "Large v waves suggest significant mitral regurgitation. Elevated mean PCWP defines post-capillary pulmonary hypertension and left-heart congestion.", values: [["Mean", "≤ 12 mmHg"], ["Large v", "mitral regurg"], ["Surrogate", "LA pressure"], ["Read at", "end-expiration"]] },
  };
  const hemoSvg = document.getElementById("hemoTrace");
  if (hemoSvg) {
    const W = 800, H = 240; const grid = document.getElementById("hemoGrid"), path = document.getElementById("hemoPath");
    gridInto(grid, W, H, 20); let cur = "ra";
    function renderH() {
      path.setAttribute("d", toPathD(hemoPath(cur, W, H)));
      const m = HEMO_META[cur];
      document.getElementById("hemoLabel").textContent = m.label;
      document.getElementById("hemoTitle").textContent = m.title;
      document.getElementById("hemoDesc").textContent = m.desc;
      document.getElementById("hemoClinical").textContent = m.clinical;
      document.getElementById("hemoValues").innerHTML = m.values.map(([k, v]) => `<div class="hemo-val"><span>${k}</span><b>${v}</b></div>`).join("");
    }
    renderH();
    document.querySelectorAll("[data-hemo]").forEach((b) =>
      b.addEventListener("click", () => { document.querySelectorAll("[data-hemo]").forEach((x) => x.classList.remove("on")); b.classList.add("on"); cur = b.dataset.hemo; renderH(); }));
  }

  /* =================== case ECG previews — real image crops =================== */
  const CASE_ECG = { stemi: "assets/ecg/anterior-mi.jpg", afib: "assets/ecg/afib.jpg", avb3: "assets/ecg/chb.jpg", "sinus-tach": "assets/ecg/sinus.jpg" };
  function decorateCases() {
    document.querySelectorAll("[data-caseecg]").forEach((n) => {
      if (n.dataset.done) return;
      const src = CASE_ECG[n.dataset.caseecg] || CASE_ECG.sinus;
      n.innerHTML = '<img class="case-ecg-img" loading="lazy" alt="Representative ECG" src="' + base + src + '"><span class="case-ecg-tag">Representative 12-lead</span>';
      n.dataset.done = "1";
    });
  }
  decorateCases();

  /* =================== Featured-card mini visuals (clean line art) =================== */
  function ecgLine(W, H) {
    const mid = H * 0.5, amp = H * 0.32, pts = [];
    for (let x = 0; x <= W; x++) {
      const t = ((x / W) * 4) % 1;
      const g = (c, w, a) => a * Math.exp(-((t - c) ** 2) / (2 * w * w));
      const y = g(0.16, 0.017, 0.14) - g(0.30, 0.008, 0.09) + g(0.33, 0.010, 1) - g(0.36, 0.013, 0.26) + g(0.63, 0.05, 0.22);
      pts.push([x, mid - y * amp]);
    }
    return toPathD(pts);
  }
  function featViz(kind) {
    const c = "#2dd4bf", d = "#7c9bff", r = "#e5484d";
    const box = (inner) => `<svg viewBox="0 0 300 158" preserveAspectRatio="xMidYMid slice" style="width:100%;height:100%">${inner}</svg>`;
    if (kind === "ecg") return box(`<path d="${ecgLine(300, 158)}" fill="none" stroke="${c}" stroke-width="2"/>`);
    if (kind === "coronary") return box(`<path d="${ecgLine(300, 158)}" fill="none" stroke="${r}" stroke-width="2"/>`);
    if (kind === "cycle") return box(`<circle cx="150" cy="79" r="52" fill="none" stroke="${c}" stroke-width="2" opacity="0.5"/><path d="M98 79 A52 52 0 0 1 202 79" fill="none" stroke="${d}" stroke-width="3"/><circle cx="202" cy="79" r="5" fill="${r}"/>`);
    if (kind === "pvloop") return box(`<path d="M90 120 L90 50 Q150 35 210 55 L210 118 Q150 130 90 120 Z" fill="none" stroke="${c}" stroke-width="2.4"/><line x1="70" y1="128" x2="230" y2="128" stroke="#31527d" stroke-width="1"/><line x1="80" y1="30" x2="80" y2="138" stroke="#31527d" stroke-width="1"/>`);
    if (kind === "shock") return box(`<g stroke-width="2" fill="none"><path d="M40 120 V60 h40 V120" stroke="${c}"/><path d="M110 120 V80 h40 V120" stroke="${d}"/><path d="M180 120 V50 h40 V120" stroke="${r}"/></g>`);
    if (kind === "echo") return box(`<path d="M150 20 L250 140 L50 140 Z" fill="#0b1a33"/><ellipse cx="150" cy="92" rx="46" ry="24" fill="none" stroke="${c}" stroke-width="2"/>`);
    if (kind === "rhc") return box(`<path d="${toPathD(hemoPath("pa", 300, 158))}" fill="none" stroke="${d}" stroke-width="2"/>`);
    if (kind === "gdmt") return box(`<g font-family="monospace" font-size="10"><rect x="30" y="40" width="70" height="24" rx="6" fill="none" stroke="${c}"/><text x="65" y="56" text-anchor="middle" fill="${c}">ARNI</text><rect x="115" y="40" width="70" height="24" rx="6" fill="none" stroke="${d}"/><text x="150" y="56" text-anchor="middle" fill="${d}">β-block</text><rect x="30" y="90" width="70" height="24" rx="6" fill="none" stroke="${d}"/><text x="65" y="106" text-anchor="middle" fill="${d}">MRA</text><rect x="115" y="90" width="70" height="24" rx="6" fill="none" stroke="${c}"/><text x="150" y="106" text-anchor="middle" fill="${c}">SGLT2</text></g>`);
    return box("");
  }
  function decorateFeatured() { document.querySelectorAll("[data-viz]").forEach((n) => { if (!n.dataset.done) { n.innerHTML = featViz(n.dataset.viz); n.dataset.done = "1"; } }); }
  decorateFeatured();

  window.addEventListener("cl:rendered", () => { decorateCases(); decorateFeatured(); });
})();
