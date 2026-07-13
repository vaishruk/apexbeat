/* ============================================================
   CardioLumen — content data
   All clinical content here is EDUCATIONAL SAMPLE material and
   is labeled as such in the UI. No guideline recommendation,
   trial result, DOI, or PMID is fabricated.
   ============================================================ */
window.DATA = {};

/* ---- small inline icon set (stroke = currentColor) ---- */
const I = {
  heart: '<path d="M20.8 6.6a5 5 0 0 0-8.8-2 5 5 0 0 0-8.8 2c0 4.5 8.8 10.4 8.8 10.4s8.8-5.9 8.8-10.4z"/>',
  wave: '<path d="M2 12h4l2-7 4 14 2-7h8"/>',
  steth: '<path d="M4 3v5a5 5 0 0 0 10 0V3"/><circle cx="18" cy="14" r="3"/><path d="M9 13v3a6 6 0 0 0 6 6"/>',
  vessel: '<path d="M6 3v6a6 6 0 0 0 12 0V3"/><path d="M12 15v6"/>',
  lungs: '<path d="M12 4v8"/><path d="M8 12c0 5-1 7-4 7-1 0-2-1-2-3l1-7c0-2 2-3 3-2z"/><path d="M16 12c0 5 1 7 4 7 1 0 2-1 2-3l-1-7c0-2-2-3-3-2z"/>',
  pulse: '<path d="M3 12h4l3-8 4 16 3-8h4"/>',
  drop: '<path d="M12 2s6 7 6 11a6 6 0 0 1-12 0c0-4 6-11 6-11z"/>',
  scan: '<rect x="3" y="3" width="18" height="18" rx="3"/><path d="M3 12h18M12 3v18"/>',
  shield: '<path d="M12 2l8 4v6c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/>',
  bolt: '<path d="M13 2L4 14h6l-1 8 9-12h-6z"/>',
  gauge: '<path d="M12 14l4-4"/><path d="M3 18a9 9 0 1 1 18 0"/>',
  ring: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>',
  baby: '<circle cx="12" cy="8" r="4"/><path d="M6 21c0-4 2.5-7 6-7s6 3 6 7"/>',
  branch: '<path d="M6 3v12a4 4 0 0 0 4 4h8"/><circle cx="6" cy="3" r="0"/><path d="M18 15l3 4-3 4"/>',
  activity: '<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>',
};

/* =================== CURRICULUM (24 topics) =================== */
DATA.curriculum = [
  { t: "Cardiovascular Anatomy & Physiology", d: "Chambers, valves, coronary supply, and the pressure–volume basis of every clinical sign.", lvl: 1, lessons: 6, time: "1.5h", prog: 100, icon: I.heart },
  { t: "Clinical Examination", d: "JVP, precordial palpation, heart sounds, murmurs, and dynamic maneuvers that localize disease.", lvl: 1, lessons: 5, time: "1.2h", prog: 80, icon: I.steth },
  { t: "Electrocardiography", d: "A reproducible rate–rhythm–axis–intervals–morphology approach to every tracing.", lvl: 1, lessons: 8, time: "2.4h", prog: 62, icon: I.wave, color: "" },
  { t: "Ischemic Heart Disease", d: "From stable angina to STEMI: pathophysiology, ECG territories, and reperfusion.", lvl: 1, lessons: 7, time: "2h", prog: 45, icon: I.pulse, color: "red", href: "modules/acute-chest-pain.html" },
  { t: "Heart Failure", d: "HFrEF vs HFpEF, the four pillars of GDMT, and decongestion strategy.", lvl: 1, lessons: 6, time: "1.8h", prog: 30, icon: I.heart },
  { t: "Cardiac Arrhythmias", d: "Mechanisms of brady- and tachyarrhythmias and a bedside approach to each.", lvl: 2, lessons: 7, time: "2.2h", prog: 20, icon: I.bolt },
  { t: "Valvular Heart Disease", d: "Stenosis and regurgitation of each valve — severity grading and timing of intervention.", lvl: 2, lessons: 6, time: "1.9h", prog: 0, icon: I.ring },
  { t: "Hypertension", d: "Staging, secondary causes, and guideline-based pharmacologic sequencing.", lvl: 1, lessons: 4, time: "1h", prog: 0, icon: I.gauge },
  { t: "Preventive Cardiology", d: "Risk estimation, lipid management, and lifestyle intervention.", lvl: 1, lessons: 5, time: "1.3h", prog: 0, icon: I.shield },
  { t: "Pericardial Disease", d: "Pericarditis, effusion, tamponade, and constriction — the pressure signatures.", lvl: 2, lessons: 4, time: "1.1h", prog: 0, icon: I.ring },
  { t: "Cardiomyopathies", d: "Dilated, hypertrophic, restrictive, and infiltrative phenotypes.", lvl: 2, lessons: 5, time: "1.6h", prog: 0, icon: I.heart },
  { t: "Pulmonary Hypertension", d: "The five WHO groups, RV–PA coupling, and when to refer.", lvl: 3, lessons: 5, time: "1.7h", prog: 0, icon: I.lungs },
  { t: "Adult Congenital Heart Disease", d: "Shunts, cyanotic lesions, and the grown-up congenital patient.", lvl: 3, lessons: 5, time: "1.6h", prog: 0, icon: I.baby },
  { t: "Aortic & Peripheral Vascular Disease", d: "Aneurysm, dissection, and peripheral arterial disease.", lvl: 2, lessons: 4, time: "1.2h", prog: 0, icon: I.vessel, color: "red" },
  { t: "Cardiogenic Shock", d: "SCAI stages, phenotyping, and escalation of support.", lvl: 3, lessons: 4, time: "1.4h", prog: 0, icon: I.activity, color: "red" },
  { t: "Echocardiography", d: "Standard views, chamber quantification, and Doppler fundamentals.", lvl: 2, lessons: 8, time: "2.6h", prog: 0, icon: I.scan },
  { t: "Nuclear & CT Imaging", d: "Perfusion imaging, calcium scoring, and coronary CT angiography.", lvl: 3, lessons: 4, time: "1.3h", prog: 0, icon: I.scan },
  { t: "Cardiac MRI", d: "Tissue characterization, late gadolinium enhancement, and viability.", lvl: 3, lessons: 3, time: "1h", prog: 0, icon: I.scan },
  { t: "Hemodynamics", d: "Right-heart catheterization waveforms, Fick, and vascular resistance.", lvl: 3, lessons: 6, time: "2h", prog: 0, icon: I.gauge },
  { t: "Electrophysiology", d: "Conduction disease, SVT mechanisms, ablation, and device therapy.", lvl: 3, lessons: 6, time: "2.1h", prog: 0, icon: I.bolt },
  { t: "Interventional Cardiology", d: "Coronary angiography, PCI, and structural intervention concepts.", lvl: 3, lessons: 5, time: "1.8h", prog: 0, icon: I.branch },
  { t: "Advanced Heart Failure", d: "Inotropes, durable LVADs, and transplant evaluation.", lvl: 3, lessons: 5, time: "1.7h", prog: 0, icon: I.heart },
  { t: "Cardio-Oncology", d: "Cardiotoxicity surveillance and management during cancer therapy.", lvl: 2, lessons: 3, time: "0.9h", prog: 0, icon: I.shield },
  { t: "Cardiology in Pregnancy", d: "Physiologic adaptation, risk stratification, and peripartum cardiomyopathy.", lvl: 2, lessons: 4, time: "1.2h", prog: 0, icon: I.drop },
  { t: "Mechanical Circulatory Support", d: "IABP, Impella, VA-ECMO, and durable LVADs — physiology, alarms, and troubleshooting.", lvl: 3, lessons: 7, time: "2.4h", prog: 0, icon: I.activity, color: "red" },
  { t: "Percutaneous Coronary Intervention", d: "Access, guidewires, techniques, intracoronary imaging, and managing PCI complications.", lvl: 3, lessons: 6, time: "2h", prog: 0, icon: I.branch },
  { t: "Reading the Coronary Angiogram", d: "Which view shows which vessel, occlusion recognition, and the classic interpretation pitfalls.", lvl: 3, lessons: 5, time: "1.6h", prog: 0, icon: I.scan, color: "red" },
  { t: "Noninvasive Ischemia Evaluation", d: "Stress testing, SPECT/PET, stress echo, and CCTA — indications, interpretation, and misreads.", lvl: 2, lessons: 5, time: "1.7h", prog: 0, icon: I.pulse },
];

/* =================== FEATURED INTERACTIVE =================== */
DATA.featured = [
  { t: "Interpret an ECG Step by Step", o: "Build a reproducible 5-step reading habit.", viz: "ecg" },
  { t: "Understand the Cardiac Cycle", o: "Link pressures, sounds, and valve events in time.", viz: "cycle" },
  { t: "Master Pressure–Volume Loops", o: "See preload, afterload, and contractility move the loop.", viz: "pvloop" },
  { t: "Approach to Undifferentiated Shock", o: "Separate the four shock states by hemodynamics.", viz: "shock" },
  { t: "Read an Echocardiogram Systematically", o: "A chamber-by-chamber reporting sequence.", viz: "echo" },
  { t: "Interpret Right-Heart Catheterization", o: "Recognize each chamber by its waveform.", viz: "rhc" },
  { t: "Localize a Coronary Occlusion", o: "Map ST elevation to the culprit artery.", viz: "coronary" },
  { t: "Select Guideline-Directed HF Therapy", o: "Sequence the four pillars of HFrEF care.", viz: "gdmt" },
];

/* =================== CLINICAL CASES =================== */
DATA.cases = [
  {
    num: "Case 01", title: "Acute Chest Pain", lvl: 1, time: "12 min",
    present: "A <strong>58-year-old man</strong> with hypertension and a 30-pack-year smoking history presents with 40 minutes of crushing substernal chest pressure radiating to the left arm, with diaphoresis and nausea.",
    vitals: [["HR", "98"], ["BP", "156/94"], ["RR", "20"], ["SpO₂", "96%"], ["Temp", "37.0"]],
    labs: [["Troponin", "pending", 0], ["ECG", "STE V1–V4", 1]],
    ecg: "stemi",
    q: "Which coronary artery is the most likely culprit, and what is the single most time-sensitive next step?",
  },
  {
    num: "Case 02", title: "Undifferentiated Shock", lvl: 2, time: "14 min",
    present: "A <strong>72-year-old woman</strong> presents with hypotension, cool extremities, and confusion two days after a viral illness. JVP is elevated and lungs are clear.",
    vitals: [["HR", "122"], ["BP", "82/58"], ["RR", "26"], ["SpO₂", "91%"], ["Lactate", "4.1"]],
    labs: [["Lactate", "4.1", 1], ["Echo", "RV strain", 1]],
    ecg: "sinus-tach",
    q: "Clear lungs with elevated JVP and shock — which shock phenotype does this pattern favor, and what bedside test discriminates it?",
  },
  {
    num: "Case 03", title: "New-Onset Atrial Fibrillation", lvl: 1, time: "10 min",
    present: "A <strong>64-year-old man</strong> reports two days of palpitations and mild breathlessness. He is hemodynamically stable. ECG shows an irregularly irregular narrow-complex rhythm without discernible P waves.",
    vitals: [["HR", "138"], ["BP", "128/78"], ["RR", "18"], ["SpO₂", "97%"], ["Temp", "36.8"]],
    labs: [["TSH", "normal", 0], ["Rhythm", "AFib RVR", 1]],
    ecg: "afib",
    q: "Before choosing rate versus rhythm control, which two scores govern anticoagulation and bleeding risk?",
  },
  {
    num: "Case 04", title: "Acute Decompensated Heart Failure", lvl: 2, time: "13 min",
    present: "A <strong>70-year-old woman</strong> with HFrEF presents with three days of orthopnea and leg swelling. She is warm and wet on clinical profiling, with a preserved blood pressure.",
    vitals: [["HR", "104"], ["BP", "148/90"], ["RR", "24"], ["SpO₂", "90%"], ["Weight", "+4 kg"]],
    labs: [["NT-proBNP", "high", 1], ["Cr", "1.3", 0]],
    ecg: "sinus-tach",
    q: "Using the warm–wet profile, what is the cornerstone of initial therapy and how is response monitored?",
  },
  {
    num: "Case 05", title: "Syncope With Conduction Disease", lvl: 3, time: "15 min",
    present: "An <strong>80-year-old man</strong> has recurrent exertional syncope. ECG shows sinus rhythm with a bifascicular block, and a prior echo noted moderate aortic stenosis.",
    vitals: [["HR", "48"], ["BP", "112/70"], ["RR", "16"], ["SpO₂", "98%"], ["Temp", "36.9"]],
    labs: [["ECG", "RBBB+LAFB", 1], ["Echo", "mod AS", 0]],
    ecg: "avb3",
    q: "Which two mechanisms of syncope must be distinguished here, and which one is immediately life-threatening?",
  },
];

/* =================== ECHO VIEWS =================== */
DATA.echoViews = [
  { t: "Parasternal Long Axis", s: "LV, LVOT, aortic & mitral valves", pic: "plax" },
  { t: "Parasternal Short Axis", s: "Concentric LV, papillary muscles", pic: "psax" },
  { t: "Apical 4-Chamber", s: "All four chambers, both AV valves", pic: "a4c" },
  { t: "Subcostal", s: "Pericardium, IVC for volume status", pic: "subcostal" },
];

/* =================== GUIDELINE LIBRARY =================== */
DATA.guidelines = [
  {
    title: "Acute Coronary Syndromes — early management",
    org: "ACC / AHA", year: "2025", cat: "Acute Coronary Syndromes",
    cite: "Rao SV, O'Donoghue ML, Ruel M, et al. 2025 ACC/AHA/ACEP/NAEMSP/SCAI Guideline for the Management of Patients With Acute Coronary Syndromes. Circulation. 2025;151(13):e771–e862.",
    url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001309",
    recs: [
      ["Primary PCI for STEMI when achievable within recommended time targets", "1", "A"],
      ["High-intensity statin initiated during hospitalization", "1", "A"],
      ["Routine early invasive strategy for high-risk NSTE-ACS", "2a", "B"],
    ],
  },
  {
    title: "Chronic Coronary Disease — secondary prevention",
    org: "ACC / AHA", year: "sample", cat: "Chronic Coronary Disease",
    recs: [
      ["Antiplatelet therapy for secondary prevention", "1", "A"],
      ["SGLT2 inhibitor or GLP-1 RA in comorbid diabetes with high CV risk", "1", "A"],
      ["Routine revascularization for symptom control in stable disease on OMT", "2b", "B"],
    ],
  },
  {
    title: "Heart Failure with reduced EF — GDMT",
    org: "ACC / AHA / HFSA", year: "2022", cat: "Heart Failure",
    cite: "Heidenreich PA, Bozkurt B, Aguilar D, et al. 2022 AHA/ACC/HFSA Guideline for the Management of Heart Failure. Circulation. 2022;145(18):e895–e1032.",
    url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001063",
    recs: [
      ["ARNI (or ACEi/ARB), beta-blocker, MRA, and SGLT2 inhibitor", "1", "A"],
      ["Titrate each pillar to target or maximally tolerated dose", "1", "B"],
      ["Routine nitrates + hydralazine outside self-identified Black patients on GDMT", "3", "B"],
    ],
  },
  {
    title: "Atrial Fibrillation — stroke prevention",
    org: "ACC / AHA / ACCP / HRS", year: "2023", cat: "Atrial Fibrillation",
    cite: "Joglar JA, Chung MK, Armbruster AL, et al. 2023 ACC/AHA/ACCP/HRS Guideline for the Diagnosis and Management of Atrial Fibrillation. Circulation. 2024;149(1):e1–e156.",
    url: "https://www.ahajournals.org/doi/10.1161/CIR.0000000000001193",
    recs: [
      ["Oral anticoagulation guided by validated stroke-risk score", "1", "A"],
      ["DOAC preferred over warfarin when eligible", "1", "A"],
      ["Early rhythm control considered in selected symptomatic patients", "2a", "B"],
    ],
  },
  {
    title: "Valvular Heart Disease — intervention timing",
    org: "ACC / AHA", year: "sample", cat: "Valvular Heart Disease",
    recs: [
      ["Intervention for severe symptomatic aortic stenosis", "1", "A"],
      ["TAVI or SAVR chosen by heart-team and patient risk/anatomy", "1", "A"],
      ["Intervention for asymptomatic severe AS with reduced LVEF", "1", "B"],
    ],
  },
  {
    title: "Bradycardia & Conduction Disease — pacing",
    org: "ACC / AHA / HRS", year: "sample", cat: "Bradycardia and Conduction Disease",
    recs: [
      ["Permanent pacing for symptomatic sinus node dysfunction", "1", "C"],
      ["Permanent pacing for high-grade or third-degree AV block", "1", "C"],
      ["Pacing for asymptomatic Mobitz I with a narrow QRS", "3", "C"],
    ],
  },
  {
    title: "Hypertension — treatment thresholds",
    org: "ACC / AHA", year: "sample", cat: "Hypertension",
    recs: [
      ["Pharmacotherapy above stage-based thresholds with elevated CV risk", "1", "A"],
      ["First-line agents: thiazide, CCB, ACEi, or ARB", "1", "A"],
      ["Avoid combining an ACEi and ARB together", "3", "A"],
    ],
  },
  {
    title: "Dyslipidemia — LDL lowering",
    org: "ACC / AHA", year: "sample", cat: "Dyslipidemia",
    recs: [
      ["High-intensity statin in established ASCVD", "1", "A"],
      ["Add ezetimibe / PCSK9 inhibitor if LDL above threshold on statin", "2a", "B"],
      ["Risk discussion before therapy in primary prevention", "1", "B"],
    ],
  },
  {
    title: "Syncope — risk stratification",
    org: "ACC / AHA / HRS", year: "sample", cat: "Syncope",
    recs: [
      ["ECG in the initial evaluation of all patients with syncope", "1", "B"],
      ["Structured risk stratification to guide admission vs discharge", "1", "B"],
      ["Routine broad neuroimaging without focal findings", "3", "B"],
    ],
  },
  {
    title: "Pulmonary Hypertension — classification & referral",
    org: "ESC / ERS", year: "sample", cat: "Pulmonary Hypertension",
    recs: [
      ["Right-heart catheterization to confirm the diagnosis", "1", "C"],
      ["Refer group 1 PAH to an expert center for therapy", "1", "C"],
      ["Avoid PAH-specific drugs in unselected group 2/3 disease", "3", "C"],
    ],
  },
  {
    title: "Pericardial Disease — acute pericarditis",
    org: "ESC", year: "sample", cat: "Pericardial Disease",
    recs: [
      ["NSAID plus colchicine as first-line therapy", "1", "A"],
      ["Colchicine to reduce recurrence", "1", "A"],
      ["Routine corticosteroids as first-line therapy", "3", "C"],
    ],
  },
  {
    title: "Ventricular Arrhythmias — ICD for prevention",
    org: "ACC / AHA / HRS", year: "sample", cat: "Ventricular Arrhythmias",
    recs: [
      ["ICD for primary prevention in eligible reduced-EF patients on GDMT", "1", "A"],
      ["ICD for secondary prevention after sustained VT/VF without reversible cause", "1", "B"],
      ["ICD when meaningful survival under one year is not expected", "3", "C"],
    ],
  },
];

/* =================== FELLOWSHIP PREP =================== */
DATA.prep = [
  { t: "Building a Cardiology-Focused CV", d: "Structure electives, scholarship, and teaching into a coherent narrative.", icon: I.shield },
  { t: "Choosing Cardiology Electives", d: "Sequence consult, CCU, imaging, and EP exposure across residency.", icon: I.heart },
  { t: "Finding Mentorship", d: "Identify and sustain productive mentoring relationships early.", icon: I.steth },
  { t: "Research Project Planning", d: "Scope a feasible question, timeline, and authorship expectations.", icon: I.scan },
  { t: "Abstract & Manuscript Prep", d: "From data to a conference abstract to a submitted manuscript.", icon: I.wave },
  { t: "Conference Opportunities", d: "Where to present cardiovascular scholarship as a resident.", icon: I.activity },
  { t: "Personal Statement Guidance", d: "Communicate motivation and fit without cliché.", icon: I.drop },
  { t: "Interview Preparation", d: "Common questions and a framework for structured answers.", icon: I.branch },
  { t: "Procedural Knowledge Base", d: "The diagnostic and procedural vocabulary fellows are expected to know.", icon: I.gauge },
  { t: "Recommended Reading Pathway", d: "A staged reading list from foundations to fellow level.", icon: I.pulse },
  { t: "First-Year Fellow Preparation", d: "What the July of fellowship actually demands.", icon: I.bolt },
  { t: "Cardiology Elective Survival", d: "Practical tips for thriving on the consult service.", icon: I.shield },
];

/* =================== LANDMARK TRIALS (verified PubMed links) =================== */
DATA.trials = [
  { cat: "Ischemia", name: "COURAGE", q: "PCI + OMT vs OMT alone in stable CAD", r: "Adding PCI did not reduce death or MI.", url: "https://pubmed.ncbi.nlm.nih.gov/17387127/" },
  { cat: "Ischemia", name: "ISCHEMIA", q: "Invasive vs conservative strategy with moderate–severe ischemia", r: "Invasive strategy did not reduce ischemic events or death.", url: "https://pubmed.ncbi.nlm.nih.gov/32227755/" },
  { cat: "Ischemia", name: "ORBITA", q: "PCI vs sham in stable angina (blinded)", r: "PCI did not significantly improve exercise time vs placebo.", url: "https://pubmed.ncbi.nlm.nih.gov/29103656/" },
  { cat: "Heart failure", name: "PARADIGM-HF", q: "Sacubitril/valsartan vs enalapril in HFrEF", r: "ARNI reduced CV death and HF hospitalization.", url: "https://pubmed.ncbi.nlm.nih.gov/25176015/" },
  { cat: "Heart failure", name: "DAPA-HF", q: "Dapagliflozin vs placebo in HFrEF", r: "Reduced worsening HF or CV death.", url: "https://pubmed.ncbi.nlm.nih.gov/31535829/" },
  { cat: "Heart failure", name: "EMPEROR-Reduced", q: "Empagliflozin vs placebo in HFrEF", r: "Reduced CV death or HF hospitalization.", url: "https://pubmed.ncbi.nlm.nih.gov/32865377/" },
  { cat: "Heart failure", name: "DELIVER", q: "Dapagliflozin in HFmrEF/HFpEF", r: "Reduced worsening HF or CV death.", url: "https://pubmed.ncbi.nlm.nih.gov/36027570/" },
  { cat: "Heart failure", name: "RALES", q: "Spironolactone vs placebo in severe HFrEF", r: "Reduced mortality and hospitalization.", url: "https://pubmed.ncbi.nlm.nih.gov/10471456/" },
  { cat: "Heart failure", name: "EMPHASIS-HF", q: "Eplerenone in mild (NYHA II) HFrEF", r: "Reduced CV death or HF hospitalization.", url: "https://pubmed.ncbi.nlm.nih.gov/21073363/" },
  { cat: "Structural", name: "PARTNER 3", q: "TAVR vs surgical AVR in low-risk severe AS", r: "TAVR non-inferior and superior for death/stroke/rehospitalization at 1 yr.", url: "https://pubmed.ncbi.nlm.nih.gov/30883058/" },
  { cat: "Structural", name: "COAPT", q: "MitraClip + GDMT vs GDMT in secondary MR + HF", r: "Reduced HF hospitalization and mortality.", url: "https://pubmed.ncbi.nlm.nih.gov/30280640/" },
  { cat: "Electrophysiology", name: "EAST-AFNET 4", q: "Early rhythm control vs usual care in recent AF", r: "Lowered adverse CV outcomes.", url: "https://pubmed.ncbi.nlm.nih.gov/32865375/" },
  { cat: "Electrophysiology", name: "CASTLE-AF", q: "Ablation vs medical therapy in AF + HFrEF", r: "Reduced death or HF hospitalization.", url: "https://pubmed.ncbi.nlm.nih.gov/29385358/" },
  { cat: "Electrophysiology", name: "RE-LY", q: "Dabigatran vs warfarin in AF", r: "Dabigatran 150 mg reduced stroke/embolism; 110 mg non-inferior with less bleeding.", url: "https://pubmed.ncbi.nlm.nih.gov/19717844/" },
  { cat: "Shock / MCS", name: "DanGer Shock", q: "Impella CP vs standard care in STEMI cardiogenic shock", r: "Reduced 180-day mortality, with more complications.", url: "https://pubmed.ncbi.nlm.nih.gov/38587239/" },
  { cat: "Shock / MCS", name: "DOREMI", q: "Milrinone vs dobutamine in cardiogenic shock", r: "No significant difference in the composite outcome.", url: "https://pubmed.ncbi.nlm.nih.gov/34347952/" },
  { cat: "Shock / MCS", name: "IABP-SHOCK II", q: "IABP vs none in MI cardiogenic shock with early revascularization", r: "No 30-day mortality benefit.", url: "https://pubmed.ncbi.nlm.nih.gov/22920912/" },
  { cat: "Prevention / lipids", name: "FOURIER", q: "Evolocumab (PCSK9i) vs placebo on statin in ASCVD", r: "Reduced major CV events (no overall mortality benefit).", url: "https://pubmed.ncbi.nlm.nih.gov/28304224/" },
  { cat: "Prevention / lipids", name: "ODYSSEY OUTCOMES", q: "Alirocumab (PCSK9i) vs placebo after recent ACS", r: "Reduced recurrent major CV events.", url: "https://pubmed.ncbi.nlm.nih.gov/30403574/" },
  { cat: "Prevention / lipids", name: "PLATO", q: "Ticagrelor vs clopidogrel in ACS", r: "Reduced CV death/MI/stroke without a significant rise in overall major bleeding.", url: "https://pubmed.ncbi.nlm.nih.gov/19717846/" },
  { cat: "Prevention / lipids", name: "SPRINT", q: "Intensive (<120) vs standard (<140) systolic BP in high-risk non-diabetics", r: "Lowered major CV events and all-cause mortality.", url: "https://pubmed.ncbi.nlm.nih.gov/26551272/" },
  { cat: "Pulmonary HTN", name: "STELLAR", q: "Sotatercept vs placebo on background therapy in PAH", r: "Improved 6-minute walk distance.", url: "https://pubmed.ncbi.nlm.nih.gov/36877098/" },
];
