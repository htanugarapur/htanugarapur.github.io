import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, MessageCircle, ArrowUpRight } from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────────── */
const SOCIALS = [
  { Icon: Github,        label: "GitHub",    sub: "@htanugarapur",          href: "https://github.com/htanugarapur" },
  { Icon: Linkedin,      label: "LinkedIn",  sub: "ruparagunath",           href: "https://www.linkedin.com/in/ruparagunath" },
  { Icon: Mail,          label: "Gmail",     sub: "ruparagunath@gmail.com", href: "mailto:ruparagunath@gmail.com" },
  { Icon: MessageCircle, label: "WhatsApp",  sub: "+91 9361 995009",        href: "https://wa.me/919361995009" },
];

const TICKER = [
  "Symbolic Regression","Equation Discovery","Neuro-Symbolic AI","PySR","SymPy",
  "PyTorch","TensorFlow","Keras","Scientific ML","Explainable AI","Computer Vision",
  "NLP","MediaPipe","OpenCV","Scikit-learn","Pandas","NumPy","SciPy","Multi-Agent Systems",
  "Streamlit","Flask","React","Node.js","MongoDB","Tableau","Power BI","MATLAB","Blender",
];

/* Supervised research positions — the spine of the CV */
const RESEARCH = [
  {
    n: "01",
    period: "Feb 2026 – Present",
    role: "Undergraduate Researcher — Symbolic Regression for Packed-Bed Transport",
    org: "Indian Institute of Technology Madras",
    loc: "Advisor: Dr. Himanshu Goyal",
    desc: "Built a 7-stage equation-discovery pipeline turning 30 papers into one universal pressure-drop correlation: 32 provenance-tagged formulas → an 11,000-row Monte-Carlo dataset → symbolic regression (PySR) → Levenberg–Marquardt refitting on physics-constrained templates. Stratified per-group error decomposition exposed a hidden 82% sphere class imbalance; one contradicting source was excluded on three independent lines of evidence via leave-source-out analysis.",
    result: "Median error 16.8% (Ergun, 1952) → 8.5% overall, and 42% → 8% on non-spherical particles, validated on raw lab measurements never used in training. Companion 1,390-line unified model spans 12 particle shapes (Differential Evolution → Nelder–Mead), stress-tested by an 11-check validation battery including leave-one-shape-family-out generalisation.",
  },
  {
    n: "02",
    period: "Jun – Jul 2026",
    role: "Research Engineer, AI Research Infrastructure",
    org: "University of Toronto (remote)",
    loc: "Collaborator: Tong Li",
    desc: "Architected a Knowledge Operating System: a four-layer human-in-the-loop pipeline (append-only capture → organised context → regenerable views → human-verified knowledge) over an immutable action-audit layer. Designed evidence-triggered promotion on a persistent incremental similarity index, so clustering cost scales with new input rather than corpus size, and no AI-originated content reaches verified status without human approval.",
    result: "Built a six-rung retrieval ladder (SQLite FTS5; BM25 + layer-trust + recency) with enforced provenance stamps, closing a back-door bypass of the review gate. Cut the pattern index 555 KB → 89 KB with byte-identical clustering output; a reconciliation audit surfaced 4 of 10 approved decisions that had never been compiled into the verified store.",
  },
  {
    n: "03",
    period: "Apr 2025 – Present",
    role: "Undergraduate Researcher — Sign-Language Translation & Explainable Medical Imaging",
    org: "Anna University, MIT Campus",
    loc: "Chennai",
    desc: "Built the Tamil-to-ISL framework end to end: pivot-language neural machine translation through English with transformer sequence modelling, for a language pair with almost no parallel corpus. Developed the accompanying MediaPipe–MocapNET–BVH motion pipeline producing 2D and 3D avatar animation plus reusable motion-capture datasets for future ISL work.",
    result: "First-authored to IEEE Xplore (ICIETSD 2026); co-authored the ASL→ISL cross-sign-language transfer study accepted to ICCCSP 2026 (Springer, IFIP-endorsed). Ongoing explainable-AI research in MRI lesion screening (NeuroLens).",
  },
];

const PUBS = [
  {
    venue: "ICIETSD 2026 · IEEE Xplore",
    status: "Published",
    title: "Neural Translation of Tamil to Indian Sign Language via Pivot-Transformer with 2D and 3D Avatar Motion Through English as a Medium Language",
    auth: "Radha Senthilkumar (Supervisor) · Ruparagunath G · Jayanathi P (Mentor)",
    abs: "Modular Tamil-to-ISL translation using pivot-language NMT and transformer-based sequence modelling. Hybrid pipeline integrating Tamil-to-English translation, ISL lexical mapping, MediaPipe keypoint extraction, MocapNET 3D motion lifting and BVH avatar generation — addressing low-resource sign-language challenges through deterministic gesture mapping and scalable dataset workflows.",
  },
  {
    venue: "ICCCSP 2026 · Springer (IFIP-endorsed)",
    status: "Accepted · to appear",
    title: "From ASL to ISL: Translating Gestures across Sign Languages",
    auth: "Co-author · 10th International Conference on Computer, Communication and Signal Processing",
    abs: "Gesture translation transferring from a high-resource sign language (ASL) to a low-resource one (ISL), targeting the parallel-data scarcity that limits Indian Sign Language systems.",
  },
];

const EXP = [
  {
    n: "01",
    period: "Aug 2026 – Present",
    role: "Research Assistant — Autonomous Research Supervision Agent",
    org: "Anna University",
    loc: "Supervised by an IBM India Enterprise Architect",
    desc: "Designing a multi-agent system supervising university-level research workflows — literature intake, method extraction, experiment tracking, contradiction flagging and staged human approval — under enterprise-architecture review: explicit triggers, single-writer artefact ownership, bounded per-mechanism cost and auditable automated writes.",
  },
  {
    n: "02",
    period: "May – Oct 2025",
    role: "AI Researcher Intern → Team Lead",
    org: "PLANTO.AI",
    loc: "Virtual",
    desc: "Built a Grok-API coding copilot on Streamlit. Promoted to Team Lead, owning planning and task allocation. Researched retrieval-augmented generation, prompt engineering and fine-tuning; co-built a Text2Prompt application.",
  },
  {
    n: "03",
    period: "Jun – Jul 2025",
    role: "AI & Data Analytics Intern",
    org: "AICTE – Edunet & Shell",
    loc: "Virtual",
    desc: "Regression models predicting water pollutant concentrations. Monte Carlo Cross Validation (RMSE, R²). Deployed with Streamlit for decision support.",
  },
  {
    n: "04",
    period: "May – Aug 2025",
    role: "AI Green Intern",
    org: "AICTE – 1M1B",
    loc: "Virtual",
    desc: "Selected among global youth leaders for ESG innovation. Built a gamified sustainability app grounded in survey and behavioural research. Visualised with Tableau, Figma and Canva.",
  },
  {
    n: "05",
    period: "May – Jun 2023",
    role: "Data Networking Intern",
    org: "RGMTTC – BSNL",
    loc: "Chennai",
    desc: "Telecom networking in Cisco Packet Tracer. MPLS, VPNs, SDN, FTTH technology and network security concepts.",
  },
];

const PROJ = [
  {
    tag: "Medical AI · Faithful XAI",
    title: "NeuroLens — Faithful XAI for Multiple Sclerosis Screening",
    desc: "Concept-bottleneck screening model whose decision is a closed-form equation — faithful by construction rather than post-hoc — developing Wetzel's symbolic-gradient interpretation. Internal AUC 0.945, external AUC 0.910 on a separate-scanner cohort. Established that faithful is not transportable: the prior intensity-concept equation held internal AUC 0.84 but collapsed to 0.371, below chance, externally. PyTorch · ResNet-50 · U-Net · PySR · Flask.",
    span: 2,
  },
  {
    tag: "Scientific ML · Equation Discovery",
    title: "Universal Pressure-Drop Correlation",
    desc: "Symbolic regression over 32 provenance-tagged literature formulas, refit on physics-constrained templates. Median error cut from 16.8% to 8.5%, and 42% to 8% on non-spherical particles, validated on held-out lab measurements.",
  },
  {
    tag: "Healthcare · Bayesian ML",
    title: "MS vs. Cerebral Small Vessel Disease",
    desc: "Bayesian learning distinguishing MS from CSVD on MRI under severely limited clinical data. 95% accuracy — 20 of 21 patient cases correctly classified.",
  },
  {
    tag: "Full-Stack · AI",
    title: "Tholariviyan — AI Heritage Guide",
    desc: "MERN platform for Tamil Nadu heritage tourism. AI chatbot, JWT authentication, Flask route planner with Haversine distance, React + Framer Motion UI.",
  },
  {
    tag: "IoT · Deep Learning",
    title: "Zero-Sort AI Smart Waste Bin",
    desc: "EfficientNet transfer learning with ESP32-to-Flask inference and user-feedback reinforcement learning for continuous improvement.",
  },
  {
    tag: "NLP · Recruitment",
    title: "AI Job Matching System",
    desc: "NLP automation for resume ranking, job matching and category prediction, driving automated candidate shortlisting.",
  },
  {
    tag: "Mobile · Civic Tech",
    title: "Election Management System",
    desc: "Real-time voting platform in Flutter and MongoDB with admin dashboards for analytics, monitoring and reporting.",
  },
  {
    tag: "Climate · ML",
    title: "Climate Impact on Agriculture",
    desc: "Random Forest models for crop-yield prediction under climate-change scenarios. 99.76% prediction performance.",
  },
  {
    tag: "Environmental ML",
    title: "Water Quality Prediction",
    desc: "ML models predicting pollutant levels (O₂, NO₃, NO₂, SO₄, PO₄, Cl) for environmental sustainability, evaluated by RMSE and R².",
  },
];

const CERTS = [
  "Python — GUVI",
  "AI & ML — IBM",
  "AI Passport — Salesforce",
  "Tableau — Salesforce",
  "Node.js — IBM",
  "Express.js — IBM",
  "Big Data Computing — NPTEL",
  "MS Office — Microsoft",
];

/* ─── CSS ───────────────────────────────────────────────────── */
const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Outfit:wght@300;400;500&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:   #F2F0EA;
  --ink:  #141208;
  --mid:  #716D60;
  --faint:#DEDAD1;
  --acc:  #9B7B50;
  --acc2: #CCBA9C;
  --surf: #ECEAE3;
  --s: 'Cormorant Garamond', Georgia, serif;
  --b: 'Outfit', sans-serif;
}

html { scroll-behavior: smooth; }

body {
  background: var(--bg);
  color: var(--ink);
  font-family: var(--b);
  font-weight: 300;
  font-size: 15px;
  line-height: 1.75;
  -webkit-font-smoothing: antialiased;
  overflow-x: hidden;
  cursor: none;
}

a, button { cursor: none; }

/* ── Cursor ── */
.cur {
  position: fixed;
  width: 10px; height: 10px;
  border-radius: 50%;
  background: var(--acc);
  pointer-events: none;
  z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width .25s, height .25s, background .25s, border .25s;
  mix-blend-mode: multiply;
}
.cur.big {
  width: 36px; height: 36px;
  background: transparent;
  border: 1.5px solid var(--acc);
}

/* ── Progress bar ── */
.prog {
  position: fixed; top: 0; left: 0;
  height: 2px; background: var(--acc);
  z-index: 9998; pointer-events: none;
  transition: width .08s linear;
}

/* ── Nav ── */
.nav {
  position: fixed; top: 2px; left: 0; right: 0; z-index: 900;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.1rem 3.5rem;
  border-bottom: 1px solid transparent;
  transition: background .35s, border-color .35s;
}
.nav.on {
  background: rgba(242,240,234,.92);
  backdrop-filter: blur(20px);
  border-bottom-color: var(--faint);
}
.nlogo {
  font-family: var(--s); font-size: 1rem; font-weight: 500;
  letter-spacing: .06em; color: var(--ink);
  background: none; border: none; padding: 0;
}
.nlinks { display: flex; gap: 2rem; list-style: none; }
.nlink {
  font-size: .68rem; letter-spacing: .17em; text-transform: uppercase;
  color: var(--mid); background: none; border: none; padding: 0;
  position: relative; transition: color .2s;
}
.nlink::after {
  content: ''; position: absolute; bottom: -2px; left: 0;
  width: 0; height: 1px; background: var(--acc);
  transition: width .3s;
}
.nlink:hover, .nlink.on { color: var(--ink); }
.nlink:hover::after, .nlink.on::after { width: 100%; }

/* ── Hero ── */
.hero {
  min-height: 100vh; display: flex; flex-direction: column;
  padding: 0 3.5rem; position: relative; overflow: hidden;
}
.htop {
  display: flex; align-items: flex-start; justify-content: space-between;
  padding-top: 7rem; padding-bottom: 1rem;
}
.eyebrow {
  font-size: .66rem; letter-spacing: .22em;
  text-transform: uppercase; color: var(--acc);
}
.htop-socials { display: flex; gap: .7rem; }
.hspill {
  display: inline-flex; align-items: center; gap: .4rem;
  font-size: .67rem; letter-spacing: .1em; text-transform: uppercase;
  color: var(--mid); text-decoration: none;
  border: 1px solid var(--faint); padding: .4rem .85rem;
  border-radius: 100px; transition: border-color .2s, color .2s;
}
.hspill:hover { border-color: var(--acc2); color: var(--acc); }

/* name lines */
.n1 { font-size: clamp(4rem, 11.5vw, 10rem); display: block; }
.n2 { font-size: clamp(4rem, 11.5vw, 10rem); display: block; color: var(--mid); }
.n2 em { font-style: italic; color: var(--acc); }

/* ── Hero main: left = name+bio  |  right = stats ── */
.hmain {
  display: grid; grid-template-columns: 1fr 450px;
  gap: 4rem; align-items: center; flex: 1; padding: 1.5rem 0;
}
.hleft { display: flex; flex-direction: column; gap: 1.8rem; }
.hleft h1 {
  font-family: var(--s); font-weight: 500;
  line-height: .88; letter-spacing: -.03em; color: var(--ink);
}
.hbio { font-size: 1.39rem; color: var(--mid); line-height: 1.9; }

/* 2 × 2 stats grid */
.hstats-grid {
  display: grid; grid-template-columns: 1fr 1fr;
  border: 5px solid var(--faint); border-radius: 6px;
}
.hstat {
  padding: 2rem 1rem;
  border-right: 2px solid var(--faint);
  border-bottom: 2px solid var(--faint);
}
.hstat:nth-child(2n)           { border-right: none; }
.hstat:nth-child(3),
.hstat:nth-child(4)            { border-bottom: none; }
.hstat strong {
  font-family: var(--s); font-size: 2.4rem; font-weight: 300;
  color: var(--ink); display: block; line-height: 1; letter-spacing: -.02em;
}
.hstat span {
  font-size: .92rem; letter-spacing: .12em;
  color: var(--mid); text-transform: uppercase;
  display: block; margin-top: .4rem;
}

/* ── Hero bottom bar: compact social pills + scroll ── */
.hbar {
  display: flex; align-items: center; justify-content: space-between;
  gap: 1.5rem; border-top: 1px solid var(--faint);
  padding: 1.5rem 0 2.5rem;
}
.hcards { display: flex; gap: .6rem; flex-wrap: wrap; }
.hcard {
  display: inline-flex; align-items: center; gap: .55rem;
  padding: .55rem .95rem; border: 1px solid var(--faint);
  border-radius: 3px; text-decoration: none; color: var(--mid);
  font-size: .74rem; transition: border-color .25s, background .25s;
}
.hcard:hover { border-color: var(--acc2); background: var(--surf); }
.hcard-lbl { font-weight: 400; color: var(--ink); }
.hbar-scroll { display: flex; align-items: center; gap: 1rem; flex-shrink: 0; }
.hbar-hint {
  font-size: .62rem; letter-spacing: .2em;
  text-transform: uppercase; color: var(--faint);
}
.hbar-line { width: 40px; height: 1px; background: var(--faint); }

/* ── Marquee ── */
.mq-wrap {
  overflow: hidden;
  border-top: 1px solid var(--faint);
  border-bottom: 1px solid var(--faint);
  background: var(--surf); padding: .2rem 0;
}
.mq-row { overflow: hidden; white-space: nowrap; }
.mq-track { display: inline-block; animation: mq 34s linear infinite; }
.mq-track.rev { animation-direction: reverse; animation-duration: 28s; }
.mq-item {
  font-size: .68rem; letter-spacing: .15em; text-transform: uppercase;
  color: var(--mid); padding: 0 1.1rem; line-height: 2.4;
}
.mq-dot { color: var(--acc2); }
@keyframes mq { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* ── Sections ── */
.sec { width: 100%; padding: 6rem 0; }
.sec.alt { background: var(--surf); }
.sec-in { max-width: 1100px; margin: 0 auto; padding: 0 3.5rem; }

.sec-hd { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 3.5rem; }
.sec-n {
  font-family: var(--s); font-size: clamp(3rem, 6vw, 5.5rem);
  font-weight: 300; color: var(--faint); line-height: 1;
  letter-spacing: -.04em; user-select: none;
}
.sec-t {
  font-family: var(--s); font-size: clamp(1.4rem, 2.5vw, 2.2rem);
  font-weight: 300; color: var(--ink); letter-spacing: -.01em;
}

/* ── Experience ── */
.exp-list { display: flex; flex-direction: column; }
.exp-row {
  display: grid; grid-template-columns: 32px 140px 1fr;
  gap: 0 2rem; padding: 2.5rem 1rem; margin: 0 -1rem;
  border-top: 1px solid var(--faint);
  transition: background .2s; border-radius: 3px;
}
.exp-row:last-child { border-bottom: 1px solid var(--faint); }
.exp-row:hover { background: rgba(155,123,80,.04); }
.exp-num { font-family: var(--s); font-size: .72rem; color: var(--acc2); padding-top: .2rem; }
.exp-period { font-size: .73rem; letter-spacing: .05em; color: var(--mid); padding-top: .25rem; line-height: 1.5; }
.exp-role { font-family: var(--s); font-size: 1.25rem; font-weight: 500; margin-bottom: .15rem; }
.exp-org { font-size: .7rem; letter-spacing: .11em; text-transform: uppercase; color: var(--acc); margin-bottom: .75rem; }
.exp-desc { font-size: .82rem; color: var(--mid); line-height: 1.82; }

/* ── Projects ── */
.proj-grid {
  display: grid; grid-template-columns: repeat(3, 1fr);
  gap: 1px; background: var(--faint); border: 1px solid var(--faint);
}
.pcard {
  background: var(--bg); padding: 2rem 1.8rem;
  position: relative; overflow: hidden; transition: background .2s;
}
.pcard::after {
  content: ''; position: absolute; bottom: 0; left: 0;
  width: 0; height: 2px; background: var(--acc);
  transition: width .4s ease;
}
.pcard:hover { background: #EDEAE2; }
.pcard:hover::after { width: 100%; }
.pcard.sp2 { grid-column: span 2; }
.ptag { font-size: .6rem; letter-spacing: .17em; text-transform: uppercase; color: var(--acc); margin-bottom: .65rem; }
.ptitle { font-family: var(--s); font-size: 1.1rem; font-weight: 500; line-height: 1.25; margin-bottom: .75rem; }
.pdesc { font-size: .8rem; color: var(--mid); line-height: 1.78; }

/* ── Research result line ── */
.exp-result {
  font-size: .8rem; color: var(--ink); line-height: 1.8; margin-top: .7rem;
  padding-left: .9rem; border-left: 1px solid var(--acc);
}

/* ── Publications ── */
.pub-list { display: grid; gap: 1.6rem; }
.pub {
  border-left: 2px solid var(--acc2); padding: 2.5rem 2.8rem;
  background: var(--surf); border-radius: 0 2px 2px 0;
}
.pub-meta {
  display: flex; align-items: baseline; justify-content: space-between;
  gap: 1rem; flex-wrap: wrap; margin-bottom: .9rem;
}
.pub-status {
  font-size: .6rem; letter-spacing: .14em; text-transform: uppercase;
  color: var(--mid); border: 1px solid var(--faint); border-radius: 2px;
  padding: .25rem .6rem; white-space: nowrap;
}
.pub-type { font-size: .63rem; letter-spacing: .18em; text-transform: uppercase; color: var(--acc); }
.pub-title { font-family: var(--s); font-size: clamp(1rem, 1.6vw, 1.4rem); font-weight: 500; line-height: 1.35; margin-bottom: .7rem; }
.pub-auth { font-size: .76rem; color: var(--acc); letter-spacing: .04em; margin-bottom: 1.1rem; }
.pub-abs { font-size: .82rem; color: var(--mid); line-height: 1.85; }

/* ── Education ── */
.edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.8rem; margin-bottom: 3rem; }
.ecard {
  padding: 2rem 2rem 2rem 2.3rem;
  border: 1px solid var(--faint);
  background: var(--bg); position: relative; overflow: hidden;
}
.ecard::before {
  content: ''; position: absolute; top: 0; left: 0;
  width: 3px; height: 100%; background: var(--acc);
}
.ecard-type { font-size: .62rem; letter-spacing: .2em; text-transform: uppercase; color: var(--acc); margin-bottom: .5rem; }
.ecard-deg { font-family: var(--s); font-size: 1.1rem; font-weight: 500; line-height: 1.3; margin-bottom: .4rem; }
.ecard-inst { font-size: .77rem; color: var(--mid); margin-bottom: 1rem; }
.ecard-row { display: flex; justify-content: space-between; align-items: center; font-size: .74rem; color: var(--mid); }
.ecard-score { font-family: var(--s); font-size: 1rem; color: var(--ink); }

.cert-hd { font-size: .63rem; letter-spacing: .2em; text-transform: uppercase; color: var(--acc); margin-bottom: 1rem; }
.certs { display: flex; flex-wrap: wrap; gap: .55rem; }
.ctag {
  font-size: .69rem; letter-spacing: .07em;
  padding: .38rem .9rem; border: 1px solid var(--faint);
  border-radius: 100px; color: var(--mid);
}

/* ── Contact ── */
.contact-body { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
.contact-hl {
  font-family: var(--s); font-size: clamp(2rem, 4vw, 3.4rem);
  font-weight: 300; line-height: 1.12; color: var(--ink);
}
.contact-hl em { font-style: italic; color: var(--acc); }

.csocials { display: flex; flex-direction: column; gap: .9rem; }
.csocial {
  display: flex; align-items: center; gap: 1rem;
  padding: 1.2rem 1.4rem; border: 1px solid var(--faint);
  border-radius: 3px; text-decoration: none; color: var(--ink);
  transition: border-color .25s, background .25s, transform .25s;
}
.csocial:hover { border-color: var(--acc2); background: var(--surf); transform: translateX(5px); }
.cs-icon { color: var(--acc); flex-shrink: 0; }
.cs-lbl { font-size: .8rem; font-weight: 400; letter-spacing: .04em; display: block; line-height: 1.2; }
.cs-sub { font-size: .71rem; color: var(--mid); margin-top: .1rem; display: block; }
.cs-arr { margin-left: auto; color: var(--faint); transition: color .2s; }
.csocial:hover .cs-arr { color: var(--acc); }

/* ── Footer ── */
.footer {
  display: flex; justify-content: space-between;
  padding: 1.4rem 3.5rem; border-top: 1px solid var(--faint);
  font-size: .66rem; letter-spacing: .1em;
  text-transform: uppercase; color: var(--faint);
}

/* ── Reveal ── */
.rv { opacity: 0; transform: translateY(18px); transition: opacity .72s ease, transform .72s ease; }
.rv.in { opacity: 1; transform: translateY(0); }

/* ── Responsive ── */
@media (max-width: 900px) {
  .nav { padding: 1rem 1.5rem; }
  .nlinks { display: none; }
  .hero { padding: 0 1.5rem; }
  .htop-socials { display: none; }
  .hmain { grid-template-columns: 1fr; gap: 2rem; }
  .hstats-grid { grid-template-columns: repeat(4, 1fr); }
  .hstat { padding: 1rem .9rem; }
  .hstat strong { font-size: 1.6rem; }
  .hcards { display: none; }
  .sec-in { padding: 0 1.5rem; }
  .exp-row { grid-template-columns: 1fr; gap: .25rem; }
  .exp-row:hover { margin: 0; }
  .proj-grid { grid-template-columns: 1fr; }
  .pcard.sp2 { grid-column: span 1; }
  .edu-grid { grid-template-columns: 1fr; }
  .contact-body { grid-template-columns: 1fr; gap: 2rem; }
  .footer { flex-direction: column; gap: .4rem; }
}
`;

/* ─── Marquee Component ─────────────────────────────────────── */
function Marquee({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="mq-row">
      <div className={`mq-track${reverse ? " rev" : ""}`}>
        {doubled.map((s, i) => (
          <span key={i} className="mq-item">
            {s} <span className="mq-dot">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Main Portfolio Component ──────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active,   setActive]   = useState("hero");
  const cursorRef = useRef(null);

  /* Scroll: nav shadow + progress bar */
  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress(scrollTop / (scrollHeight - clientHeight) * 100);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Mouse: move cursor dot */
  useEffect(() => {
    const move = (e) => {
      if (!cursorRef.current) return;
      cursorRef.current.style.left = e.clientX + "px";
      cursorRef.current.style.top  = e.clientY + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  /* Cursor ring on interactive elements */
  useEffect(() => {
    const add = () => cursorRef.current?.classList.add("big");
    const rm  = () => cursorRef.current?.classList.remove("big");
    const els = document.querySelectorAll("a, button");
    els.forEach(el => {
      el.addEventListener("mouseenter", add);
      el.addEventListener("mouseleave", rm);
    });
    return () => els.forEach(el => {
      el.removeEventListener("mouseenter", add);
      el.removeEventListener("mouseleave", rm);
    });
  });

  /* Scroll reveal */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el, i) => {
      el.style.transitionDelay = `${(i % 6) * 0.07}s`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  /* Scroll spy: active nav */
  useEffect(() => {
    const ids = ["hero","experience","projects","publications","education","contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.2 }
    );
    ids.forEach(id => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const navItems = [
    ["research","Research"],
    ["experience","Experience"],
    ["projects","Projects"],
    ["publications","Publications"],
    ["education","Education"],
    ["contact","Contact"],
  ];

  return (
    <>
      <style>{CSS}</style>

      {/* Custom cursor dot */}
      <div ref={cursorRef} className="cur" />

      {/* Scroll progress bar */}
      <div className="prog" style={{ width: `${progress}%` }} />

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " on" : ""}`}>
        <button className="nlogo" onClick={() => go("hero")}>RG ·</button>
        <ul className="nlinks">
          {navItems.map(([id, lbl]) => (
            <li key={id}>
              <button
                className={`nlink${active === id ? " on" : ""}`}
                onClick={() => go(id)}
              >
                {lbl}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="hero">
        <div className="htop">
          <p className="eyebrow">AI Researcher · Neuro-Symbolic &amp; Scientific ML</p>
          <div className="htop-socials">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a
                key={label} href={href}
                className="hspill"
                target="_blank" rel="noopener noreferrer"
              >
                <Icon size={12} /> {label}
              </a>
            ))}
          </div>
        </div>

        {/* ── MAIN: left = name + bio  |  right = stats grid ── */}
        <div className="hmain">
          <div className="hleft">
            <h1>
              <span className="n1">Ruparagunath</span>
              <span className="n2"><em>G</em> </span>
            </h1>
            <p className="hbio">
              Final-year B.Tech in AI &amp; Data Science at Anna University, MIT Campus, Chennai,
              working toward a research career in cognitive and neuro-symbolic AI. I want systems that
              reason, explain themselves and generate knowledge — not only predictions. Supervised
              research at IIT Madras, the University of Toronto and Anna University, spanning symbolic
              regression and equation discovery, faithful explainability for medical imaging, and
              multi-agent research infrastructure.
            </p>
          </div>

          <div className="hstats-grid">
            {[["2","Publications"],["3","Research Labs"],["9","Projects"],["8","Certifications"]].map(([n, l]) => (
              <div className="hstat" key={l}>
                <strong>{n}</strong>
                <span>{l}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── BOTTOM BAR: compact social links + scroll ── */}
        <div className="hbar">
          <div className="hcards">
            {SOCIALS.map(({ Icon, label, href }) => (
              <a key={label} href={href} className="hcard" target="_blank" rel="noopener noreferrer">
                <Icon size={13} />
                <span className="hcard-lbl">{label}</span>
              </a>
            ))}
          </div>
          <div className="hbar-scroll">
            <span className="hbar-hint">Scroll</span>
            <div className="hbar-line" />
          </div>
        </div>
      </section>

      {/* ── SKILLS MARQUEE ── */}
      <div className="mq-wrap">
        <Marquee items={TICKER} reverse={false} />
        <Marquee items={TICKER} reverse={true} />
      </div>

      {/* ── RESEARCH ── */}
      <section id="research" className="sec">
        <div className="sec-in">
          <div className="sec-hd rv">
            <span className="sec-n">01</span>
            <span className="sec-t">Research</span>
          </div>
          <div className="exp-list">
            {RESEARCH.map((r, i) => (
              <div key={i} className="exp-row rv">
                <div className="exp-num">{r.n}</div>
                <div className="exp-period">{r.period}</div>
                <div>
                  <h3 className="exp-role">{r.role}</h3>
                  <p className="exp-org">{r.org} · {r.loc}</p>
                  <p className="exp-desc">{r.desc}</p>
                  <p className="exp-result">{r.result}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EXPERIENCE ── */}
      <section id="experience" className="sec alt">
        <div className="sec-in">
          <div className="sec-hd rv">
            <span className="sec-n">02</span>
            <span className="sec-t">Experience</span>
          </div>
          <div className="exp-list">
            {EXP.map((e, i) => (
              <div key={i} className="exp-row rv">
                <div className="exp-num">{e.n}</div>
                <div className="exp-period">{e.period}</div>
                <div>
                  <h3 className="exp-role">{e.role}</h3>
                  <p className="exp-org">{e.org} · {e.loc}</p>
                  <p className="exp-desc">{e.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PROJECTS ── */}
      <section id="projects" className="sec">
        <div className="sec-in">
          <div className="sec-hd rv">
            <span className="sec-n">03</span>
            <span className="sec-t">Projects</span>
          </div>
          <div className="proj-grid">
            {PROJ.map((p, i) => (
              <div key={i} className={`pcard rv${p.span === 2 ? " sp2" : ""}`}>
                <p className="ptag">{p.tag}</p>
                <h3 className="ptitle">{p.title}</h3>
                <p className="pdesc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PUBLICATIONS ── */}
      <section id="publications" className="sec alt">
        <div className="sec-in">
          <div className="sec-hd rv">
            <span className="sec-n">04</span>
            <span className="sec-t">Publications</span>
          </div>
          <div className="pub-list">
            {PUBS.map((pb, i) => (
              <div key={i} className="pub rv">
                <div className="pub-meta">
                  <p className="pub-type">{pb.venue}</p>
                  <span className="pub-status">{pb.status}</span>
                </div>
                <h3 className="pub-title">{pb.title}</h3>
                <p className="pub-auth">{pb.auth}</p>
                <p className="pub-abs">{pb.abs}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDUCATION ── */}
      <section id="education" className="sec">
        <div className="sec-in">
          <div className="sec-hd rv">
            <span className="sec-n">05</span>
            <span className="sec-t">Education</span>
          </div>
          <div className="edu-grid rv">
            <div className="ecard">
              <p className="ecard-type">B.Tech · 2024 – Present</p>
              <h3 className="ecard-deg">Artificial Intelligence &amp; Data Science</h3>
              <p className="ecard-inst">Anna University, MIT Campus · Chennai</p>
              <div className="ecard-row">
                <span>6th Semester</span>
                <span className="ecard-score">CGPA 7.95</span>
              </div>
            </div>
            <div className="ecard">
              <p className="ecard-type">Diploma · 2021 – 2024</p>
              <h3 className="ecard-deg">Computer Engineering</h3>
              <p className="ecard-inst">Central Polytechnic College · Chennai</p>
              <div className="ecard-row">
                <span>Graduated</span>
                <span className="ecard-score">95% · GPA 9.5</span>
              </div>
            </div>
          </div>
          <div className="rv">
            <p className="cert-hd">Certifications</p>
            <div className="certs">
              {CERTS.map((c, i) => (
                <span key={i} className="ctag">{c}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" className="sec">
        <div className="sec-in">
          <div className="sec-hd rv">
            <span className="sec-n">06</span>
            <span className="sec-t">Contact</span>
          </div>
          <div className="contact-body">
            <h2 className="contact-hl rv">
              Let's build<br />something<br /><em>remarkable.</em>
            </h2>
            <div className="csocials rv">
              {SOCIALS.map(({ Icon, label, sub, href }) => (
                <a
                  key={label} href={href}
                  className="csocial"
                  target="_blank" rel="noopener noreferrer"
                >
                  <Icon size={20} className="cs-icon" />
                  <div>
                    <span className="cs-lbl">{label}</span>
                    <span className="cs-sub">{sub}</span>
                  </div>
                  <ArrowUpRight size={16} className="cs-arr" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="footer">
        <span>© 2026 Ruparagunath G</span>
        <span>AI Researcher · Cognitive &amp; Neuro-Symbolic AI · Chennai, India</span>
      </footer>
    </>
  );
}
