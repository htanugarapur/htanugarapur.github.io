import { useState, useEffect, useRef } from "react";
import { Github, Linkedin, Mail, MessageCircle, ArrowUpRight } from "lucide-react";

/* ─── DATA ─────────────────────────────────────────────────── */
const SOCIALS = [
  { Icon: Github,        label: "GitHub",    sub: "@htanugarapur",          href: "https://github.com/htanugarapur" },
  { Icon: Linkedin,      label: "LinkedIn",  sub: "ruparagunath",           href: "https://www.linkedin.com/in/ruparagunath" },
  { Icon: Mail,          label: "Gmail",     sub: "ruparagunath@gmail.com", href: "mailto:ruparagunath@gmail.com" },
  { Icon: MessageCircle, label: "WhatsApp",  sub: "+91 9361 995009",        href: "https://wa.me/919361995009" },
];

const PHOTO = `${import.meta.env.BASE_URL}pic.jpg`;

const TICKER = [
  "Speech Perception","Disordered Speech","Whisper","kNN-VC","XTTS-v2","ECAPA",
  "Computational Hearing","Explainable AI","Symbolic Regression","Equation Discovery","PySR",
  "PyTorch","TensorFlow","Scientific ML","Computer Vision","NLP","MediaPipe","OpenCV",
  "Scikit-learn","NumPy","SciPy","Bootstrap CIs","Pre-registered Evaluation","Multi-Agent Systems",
  "Flask","React","Node.js","MATLAB","Blender",
];

/* Research positions: the spine of the CV */
const RESEARCH = [
  {
    n: "01",
    period: "Aug 2026 – Present",
    role: "Undergraduate Researcher, Dysarthric Speech Re-Voicing",
    org: "Anna University, MIT Campus",
    loc: "Supervisor: Dr. Kola Sujatha",
    desc: "Goal: help people with dysarthria (slurred speech) be understood by strangers while still sounding like themselves. Built and compared three systems on UASpeech. A direct speech-to-speech network made words harder to recognise in 48% of 13,425 test pairs, and the recogniser grading it invented words, so I rebuilt both the method and the evaluation: recognise the word from a closed set of 449 (staying silent when unsure), then re-voice it with kNN-VC using only the speaker's own recordings.",
    result: "On 25 held-out typed sentences, my system made fewer word errors than XTTS-v2 voice cloning for all four speakers tested (7% vs 29%), though XTTS-v2 matched the voice better for two of them. For the hardest-to-understand speakers it mostly stays silent, a limit that turned the project into a question about how human listeners adapt.",
  },
  {
    n: "02",
    period: "2026 – Present",
    role: "Independent Researcher, NeuroLens: Faithful XAI for MS Screening",
    org: "Independent project",
    loc: "With advice from Dr. Pascal Tyrrell, Institute of Medical Science, University of Toronto",
    desc: "Concept-bottleneck screening model whose decision is a closed-form equation, faithful by construction rather than post-hoc, developing Wetzel's symbolic-gradient interpretation.",
    result: "Faithful is not the same as transportable: the earlier equation held internal AUC 0.84 but fell to 0.371, below chance, on a separate scanner; the rebuilt model reached 0.945 internally and 0.910 externally. Manuscript in preparation.",
  },
  {
    n: "03",
    period: "Feb – Aug 2026",
    role: "Undergraduate Researcher, Symbolic Regression for Packed-Bed Transport",
    org: "Indian Institute of Technology Madras",
    loc: "Advisor: Dr. Himanshu Goyal",
    desc: "Built a 7-stage equation-discovery pipeline turning 30 papers into one pressure-drop correlation: 32 provenance-tagged formulas, an 11,000-row Monte-Carlo dataset, symbolic regression (PySR) and physics-constrained refitting. Per-group error analysis exposed a hidden 82% sphere imbalance that a good average had been hiding.",
    result: "Median error 16.8% (Ergun, 1952) to 8.5% overall, and 42% to 8% on non-spherical particles, validated on raw lab measurements never used in training.",
  },
  {
    n: "04",
    period: "Jun – Jul 2026",
    role: "Research Engineer, AI Research Infrastructure",
    org: "University of Toronto (remote)",
    loc: "Collaborator: Tong Li",
    desc: "Architected a Knowledge Operating System: a four-layer human-in-the-loop pipeline (capture, organised context, regenerable views, human-verified knowledge) over an append-only audit layer, so no AI-originated content reaches verified status without human approval.",
    result: "Cut the pattern index from 555 KB to 89 KB with byte-identical clustering output; a reconciliation audit found 4 of 10 approved decisions never compiled into the verified store.",
  },
  {
    n: "05",
    period: "Apr 2025 – Present",
    role: "Undergraduate Researcher, Sign-Language Translation",
    org: "Anna University, MIT Campus",
    loc: "Supervisor: Dr. Radha Senthilkumar",
    desc: "Built a Tamil-to-Indian Sign Language framework end to end: pivot-language translation through English with transformer models, for a language pair with almost no parallel data, plus a MediaPipe–MocapNET–BVH pipeline producing 2D and 3D signing avatars and reusable motion data.",
    result: "First-authored to IEEE Xplore (ICIETSD 2026); co-authored the ASL-to-ISL transfer study accepted at ICCCSP 2026 (Springer). Now helping junior batches with their sign-language research.",
  },
];

const PUBS = [
  {
    venue: "ICIETSD 2026 · IEEE Xplore",
    status: "Published",
    title: "Neural Translation of Tamil to Indian Sign Language via Pivot-Transformer with 2D and 3D Avatar Motion Through English as a Medium Language",
    auth: "Radha Senthilkumar (Supervisor) · Ruparagunath G · Jayanthi P (Mentor)",
    abs: "Modular Tamil-to-ISL translation using pivot-language NMT and transformer-based sequence modelling, integrating Tamil-to-English translation, ISL lexical mapping, MediaPipe keypoint extraction, MocapNET 3D motion lifting and BVH avatar generation.",
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
    role: "Research Assistant, Autonomous Research Supervision Agent",
    org: "Anna University",
    loc: "Supervised by an IBM India Enterprise Architect",
    desc: "Designing a multi-agent system that supervises university research workflows (literature intake, method extraction, experiment tracking, contradiction flagging and staged human approval) under enterprise-architecture review.",
  },
  {
    n: "02",
    period: "May – Oct 2025",
    role: "AI Researcher Intern, then Team Lead",
    org: "PLANTO.AI",
    loc: "Virtual",
    desc: "Built a Grok-API coding copilot on Streamlit. Promoted to Team Lead, owning planning and task allocation while researching retrieval-augmented generation and prompt engineering.",
  },
  {
    n: "03",
    period: "Jun – Jul 2025",
    role: "AI & Data Analytics Intern",
    org: "AICTE – Edunet & Shell",
    loc: "Virtual",
    desc: "Regression models predicting water pollutant concentrations, evaluated with Monte Carlo cross-validation (RMSE, R²) and deployed with Streamlit for decision support.",
  },
  {
    n: "04",
    period: "May – Aug 2025",
    role: "AI Green Intern",
    org: "AICTE – 1M1B",
    loc: "Virtual",
    desc: "Selected among global youth leaders for ESG innovation. Built a gamified sustainability app grounded in survey and behavioural research.",
  },
  {
    n: "05",
    period: "May – Jun 2023",
    role: "Data Networking Intern",
    org: "RGMTTC – BSNL",
    loc: "Chennai",
    desc: "Telecom networking in Cisco Packet Tracer: MPLS, VPNs, SDN, FTTH and network security.",
  },
];

const PROJ = [
  {
    tag: "Speech · Clinical Voice Banking",
    title: "Tamil Voice Cloning for Voice Banking",
    desc: "A voice-banking pipeline for Tamil speakers at risk of losing their voice, cloning a speaker from short enrolment audio in a language with very little clinical speech data. Every clone is judged by pre-registered speaker-similarity (ECAPA), pitch and error-rate gates rather than listening impressions: 74% of clones on unseen literary sentences passed every check (median CER 8%). IndicF5 · Whisper · ECAPA.",
    span: 2,
  },
  {
    tag: "Legal Aid · Multilingual AI",
    title: "NyayaSetu",
    desc: "Explains Indian law in plain language across 90+ languages by voice, with OCR document analysis. I built the AI part; the team was selected in the top 100 of about 21,000 teams at Niral Thiruvizha 3.0, a Tamil Nadu state hackathon.",
  },
  {
    tag: "Civic Tech · Accountability",
    title: "KudaVolai",
    desc: "Chennai residents report civic problems; each complaint goes to the responsible office and is made public if the deadline is missed. Issue classifier at 0.82 macro-F1 on real citizen photos.",
  },
  {
    tag: "Explainability · Causal Testing",
    title: "Synapse",
    desc: "Tests whether a recommender's explanations actually cause its rankings by deleting the cited graph edges against a random-edge control: cited edges moved ranks 6× more than random (p = 0.0001).",
  },
  {
    tag: "Healthcare · Bayesian ML",
    title: "MS vs. Cerebral Small Vessel Disease",
    desc: "Bayesian learning distinguishing MS from CSVD on MRI under severely limited clinical data: 20 of 21 patient cases correctly classified.",
  },
  {
    tag: "Full-Stack · AI",
    title: "Tholariviyan, AI Heritage Guide",
    desc: "MERN platform for Tamil Nadu heritage tourism with an AI chatbot, JWT authentication and a Haversine route planner.",
  },
  {
    tag: "IoT · Deep Learning",
    title: "Zero-Sort AI Smart Waste Bin",
    desc: "EfficientNet transfer learning with ESP32-to-Flask inference and user-feedback reinforcement learning.",
  },
  {
    tag: "Environmental ML",
    title: "Water Quality Prediction",
    desc: "Models predicting pollutant levels (O₂, NO₃, NO₂, SO₄, PO₄, Cl), evaluated by RMSE and R².",
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
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,600&family=Outfit:wght@300;400;500&family=Rye&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --bg:   #F2F0EA;
  --ink:  #141208;
  --mid:  #716D60;
  --faint:#DEDAD1;
  --acc:  #9B7B50;
  --acc2: #CCBA9C;
  --surf: #ECEAE3;
  --paper:#E9DCC0;
  --paper2:#D9C49C;
  --wood: #6B4A2B;
  --s: 'Cormorant Garamond', Georgia, serif;
  --b: 'Outfit', sans-serif;
  --w: 'Rye', 'Cormorant Garamond', serif;
}

html { scroll-behavior: smooth; zoom: var(--z, 1); }

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
  position: fixed; width: 10px; height: 10px; border-radius: 50%;
  background: var(--acc); pointer-events: none; z-index: 9999;
  transform: translate(-50%, -50%);
  transition: width .25s, height .25s, background .25s, border .25s;
  mix-blend-mode: multiply;
}
.cur.big { width: 36px; height: 36px; background: transparent; border: 1.5px solid var(--acc); }

/* ── Progress bar ── */
.prog {
  position: fixed; top: 0; left: 0; height: 2px; background: var(--acc);
  z-index: 9998; pointer-events: none; transition: width .08s linear;
}

/* ── Nav ── */
.nav {
  position: fixed; top: 2px; left: 0; right: 0; z-index: 900;
  display: flex; align-items: center; justify-content: space-between;
  padding: 1.1rem 3.5rem; border-bottom: 1px solid transparent;
  transition: background .35s, border-color .35s;
}
.nav.on { background: rgba(242,240,234,.92); backdrop-filter: blur(20px); border-bottom-color: var(--faint); }
.nlogo { font-family: var(--s); font-size: 1rem; font-weight: 500; letter-spacing: .06em; color: var(--ink); background: none; border: none; padding: 0; }
.nlinks { display: flex; gap: 2rem; list-style: none; }
.nlink {
  font-size: .68rem; letter-spacing: .17em; text-transform: uppercase;
  color: var(--mid); background: none; border: none; padding: 0;
  position: relative; transition: color .2s;
}
.nlink::after { content: ''; position: absolute; bottom: -2px; left: 0; width: 0; height: 1px; background: var(--acc); transition: width .3s; }
.nlink:hover, .nlink.on { color: var(--ink); }
.nlink:hover::after, .nlink.on::after { width: 100%; }

/* ── Hero ── */
.hero { min-height: calc(100vh / var(--z, 1)); display: flex; flex-direction: column; padding: 0 3.5rem; position: relative; overflow: hidden; }
.htop { display: flex; align-items: flex-start; justify-content: space-between; padding-top: 7rem; padding-bottom: 1rem; }
.eyebrow { font-size: .66rem; letter-spacing: .22em; text-transform: uppercase; color: var(--acc); }

.n1 { font-size: clamp(2.6rem, calc(5.6vw / var(--z, 1)), 5.8rem); display: block; }
.n2 { font-size: clamp(2.6rem, calc(5.6vw / var(--z, 1)), 5.8rem); display: block; color: var(--mid); }
.n2 em { font-style: italic; color: var(--acc); }

.hmain { display: grid; grid-template-columns: minmax(0, 1fr) 360px; gap: 3.5rem; align-items: center; flex: 1; padding: 1.5rem 0; }
.hleft { display: flex; flex-direction: column; gap: 1.8rem; min-width: 0; }
.hid { display: flex; align-items: center; gap: 2.4rem; }
.hleft h1 { font-family: var(--s); font-weight: 500; line-height: .88; letter-spacing: -.03em; color: var(--ink); }
.hbio { font-size: 1.22rem; color: var(--mid); line-height: 1.85; max-width: 46rem; }

/* ── Wanted poster ── */
.poster-pin { position: relative; flex-shrink: 0; perspective: 900px; display: block; text-decoration: none; color: inherit; }
.poster-pin:hover .poster { animation-play-state: paused; transform: rotate(0deg) scale(1.03); transition: transform .3s; }
.poster-pin:focus-visible { outline: 2px solid var(--acc); outline-offset: 6px; }
.poster-find { margin-top: 5px; font-family: var(--s); font-style: italic; font-size: .78rem; color: #6B4A2B; opacity: .85; }
.poster-pin:hover .poster-find { opacity: 1; text-decoration: underline; }
.poster {
  position: relative; width: 210px; padding: 14px 14px 16px;
  background:
    radial-gradient(ellipse at 20% 15%, rgba(255,250,235,.55), transparent 55%),
    radial-gradient(ellipse at 80% 90%, rgba(120,80,30,.22), transparent 60%),
    repeating-linear-gradient(97deg, rgba(110,75,35,.05) 0 2px, transparent 2px 7px),
    linear-gradient(160deg, var(--paper) 0%, var(--paper2) 100%);
  box-shadow:
    inset 0 0 22px rgba(95,60,20,.45),
    0 14px 26px -10px rgba(40,25,10,.55),
    0 2px 4px rgba(40,25,10,.25);
  transform-origin: 50% 6px;
  animation: posterDrop 1.25s cubic-bezier(.2,.8,.25,1) .25s both, posterSway 6s ease-in-out 1.6s infinite;
  text-align: center; color: #3B2410;
  clip-path: polygon(0 1%, 4% 0, 23% 1.2%, 48% 0, 71% 1%, 96% 0, 100% 2%, 99% 26%, 100% 54%, 99.2% 81%, 100% 99%, 77% 100%, 52% 98.8%, 26% 100%, 2% 99%, 0 76%, .8% 47%, 0 22%);
}
.poster::before {
  content: ''; position: absolute; top: 4px; left: 50%; width: 12px; height: 12px;
  margin-left: -6px; border-radius: 50%;
  background: radial-gradient(circle at 35% 30%, #c9c3b6, #5b544a 70%);
  box-shadow: 0 2px 2px rgba(0,0,0,.35); z-index: 2;
}
.poster-head { font-family: var(--w); font-size: 2.15rem; letter-spacing: .08em; line-height: 1; margin-top: 8px; }
.poster-photo {
  margin: 10px auto 8px; width: 100%; aspect-ratio: 1 / 1; overflow: hidden;
  border: 2px solid #4A2E14; box-shadow: inset 0 0 14px rgba(60,35,10,.5);
}
.poster-photo img { width: 100%; height: 100%; object-fit: cover; display: block; filter: sepia(.35) contrast(1.05) saturate(.9); }
.poster-for { font-family: var(--s); font-style: italic; font-size: .82rem; line-height: 1.2; }
.poster-name { font-family: var(--w); font-size: 1.05rem; letter-spacing: .06em; margin-top: 4px; }
.poster-reward {
  margin-top: 6px; padding-top: 6px; border-top: 1px dashed rgba(59,36,16,.5);
  font-family: var(--b); font-size: .62rem; letter-spacing: .2em; text-transform: uppercase;
}
@keyframes posterDrop {
  0%   { transform: translateY(-140%) rotate(-18deg); opacity: 0; }
  45%  { transform: translateY(6%) rotate(7deg); opacity: 1; }
  65%  { transform: translateY(-2%) rotate(-5deg); }
  82%  { transform: translateY(0) rotate(2deg); }
  100% { transform: translateY(0) rotate(-2.5deg); }
}
@keyframes posterSway {
  0%, 100% { transform: rotate(-2.5deg); }
  50%      { transform: rotate(-1deg); }
}

/* stats */
.hstats-grid { display: grid; grid-template-columns: 1fr 1fr; border: 5px solid var(--faint); border-radius: 6px; }
.hstat { padding: 2rem 1rem; border-right: 2px solid var(--faint); border-bottom: 2px solid var(--faint); }
.hstat:nth-child(2n) { border-right: none; }
.hstat:nth-child(3), .hstat:nth-child(4) { border-bottom: none; }
.hstat strong { font-family: var(--s); font-size: 2.4rem; font-weight: 300; color: var(--ink); display: block; line-height: 1; letter-spacing: -.02em; }
.hstat span { font-size: .92rem; letter-spacing: .12em; color: var(--mid); text-transform: uppercase; display: block; margin-top: .4rem; }

.hbar { display: flex; align-items: center; justify-content: flex-end; gap: 1.5rem; border-top: 1px solid var(--faint); padding: 1.5rem 0 2.5rem; }
.hbar-scroll { display: flex; align-items: center; gap: 1rem; flex-shrink: 0; }
.hbar-hint { font-size: .62rem; letter-spacing: .2em; text-transform: uppercase; color: var(--mid); }
.hbar-line { width: 40px; height: 1px; background: var(--faint); }

/* ── Marquee ── */
.mq-wrap { overflow: hidden; border-top: 1px solid var(--faint); border-bottom: 1px solid var(--faint); background: var(--surf); padding: .2rem 0; }
.mq-row { overflow: hidden; white-space: nowrap; }
.mq-track { display: inline-block; animation: mq 34s linear infinite; }
.mq-track.rev { animation-direction: reverse; animation-duration: 28s; }
.mq-item { font-size: .68rem; letter-spacing: .15em; text-transform: uppercase; color: var(--mid); padding: 0 1.1rem; line-height: 2.4; }
.mq-dot { color: var(--acc2); }
@keyframes mq { from { transform: translateX(0); } to { transform: translateX(-50%); } }

/* ── Sections ── */
.sec { width: 100%; padding: 5rem 0; }
.sec.alt { background: var(--surf); }
.sec-in { max-width: 1100px; margin: 0 auto; padding: 0 3.5rem; }

/* ── Treasure-map scroll: each section unrolls between two wooden rollers ── */
.map { position: relative; padding: 2.6rem 2.4rem 2.8rem; }
.map-paper {
  position: relative;
  background:
    radial-gradient(ellipse at 10% 0%, rgba(255,250,235,.6), transparent 50%),
    radial-gradient(ellipse at 100% 100%, rgba(140,100,50,.14), transparent 55%),
    linear-gradient(180deg, #F5EEDC 0%, #EFE4CB 100%);
  box-shadow: inset 0 0 40px rgba(120,85,40,.18), 0 10px 30px -18px rgba(60,40,15,.45);
  padding: 2.6rem 2.6rem 2.4rem;
  clip-path: inset(0 0 100% 0);
  transition: clip-path 1.35s cubic-bezier(.65,.05,.25,1);
}
.map.open .map-paper { clip-path: inset(0 0 0 0); }
.roller {
  position: absolute; left: .9rem; right: .9rem; height: 18px; z-index: 3; border-radius: 9px;
  background: linear-gradient(180deg, #9A6B3F 0%, var(--wood) 45%, #3E2914 100%);
  box-shadow: 0 4px 8px -2px rgba(40,25,10,.5);
}
.roller::before, .roller::after {
  content: ''; position: absolute; top: -4px; width: 16px; height: 26px; border-radius: 6px;
  background: linear-gradient(180deg, #7A5330, #3E2914);
}
.roller::before { left: -10px; }
.roller::after  { right: -10px; }
.roller.top { top: 1.7rem; }
.roller.bot { top: 1.7rem; transition: top 1.35s cubic-bezier(.65,.05,.25,1); }
.map.open .roller.bot { top: calc(100% - 2.2rem); }

.sec-hd { display: flex; align-items: baseline; gap: 1rem; margin-bottom: 2.8rem; }
.sec-n { font-family: var(--s); font-size: clamp(3rem, calc(6vw / var(--z, 1)), 5.5rem); font-weight: 300; color: var(--acc2); line-height: 1; letter-spacing: -.04em; user-select: none; }
.sec-t { font-family: var(--s); font-size: clamp(1.4rem, calc(2.5vw / var(--z, 1)), 2.2rem); font-weight: 300; color: var(--ink); letter-spacing: -.01em; }

/* ── Experience / research rows ── */
.exp-list { display: flex; flex-direction: column; }
.exp-row {
  display: grid; grid-template-columns: 32px 140px 1fr; gap: 0 2rem;
  padding: 2.2rem 1rem; margin: 0 -1rem; border-top: 1px solid rgba(155,123,80,.25);
  transition: background .2s; border-radius: 3px;
}
.exp-row:last-child { border-bottom: 1px solid rgba(155,123,80,.25); }
.exp-row:hover { background: rgba(155,123,80,.06); }
.exp-num { font-family: var(--s); font-size: .72rem; color: var(--acc); padding-top: .2rem; }
.exp-period { font-size: .73rem; letter-spacing: .05em; color: var(--mid); padding-top: .25rem; line-height: 1.5; }
.exp-role { font-family: var(--s); font-size: 1.25rem; font-weight: 500; margin-bottom: .15rem; }
.exp-org { font-size: .7rem; letter-spacing: .11em; text-transform: uppercase; color: var(--acc); margin-bottom: .75rem; }
.exp-desc { font-size: .84rem; color: var(--mid); line-height: 1.82; }
.exp-result { font-size: .82rem; color: var(--ink); line-height: 1.8; margin-top: .7rem; padding-left: .9rem; border-left: 1px solid var(--acc); }

/* ── Projects ── */
.proj-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1px; background: rgba(155,123,80,.25); border: 1px solid rgba(155,123,80,.25); }
.pcard { background: #F6EFDF; padding: 2rem 1.8rem; position: relative; overflow: hidden; transition: background .2s; }
.pcard::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 2px; background: var(--acc); transition: width .4s ease; }
.pcard:hover { background: #EFE5CF; }
.pcard:hover::after { width: 100%; }
.pcard.sp2 { grid-column: span 2; }
.ptag { font-size: .6rem; letter-spacing: .17em; text-transform: uppercase; color: var(--acc); margin-bottom: .65rem; }
.ptitle { font-family: var(--s); font-size: 1.1rem; font-weight: 500; line-height: 1.25; margin-bottom: .75rem; }
.pdesc { font-size: .8rem; color: var(--mid); line-height: 1.78; }

/* ── Publications ── */
.pub-list { display: grid; gap: 1.6rem; }
.pub { border-left: 2px solid var(--acc2); padding: 2.2rem 2.4rem; background: rgba(255,252,243,.6); border-radius: 0 2px 2px 0; }
.pub-meta { display: flex; align-items: baseline; justify-content: space-between; gap: 1rem; flex-wrap: wrap; margin-bottom: .9rem; }
.pub-status { font-size: .6rem; letter-spacing: .14em; text-transform: uppercase; color: var(--mid); border: 1px solid var(--acc2); border-radius: 2px; padding: .25rem .6rem; white-space: nowrap; }
.pub-type { font-size: .63rem; letter-spacing: .18em; text-transform: uppercase; color: var(--acc); }
.pub-title { font-family: var(--s); font-size: clamp(1rem, calc(1.6vw / var(--z, 1)), 1.4rem); font-weight: 500; line-height: 1.35; margin-bottom: .7rem; }
.pub-auth { font-size: .76rem; color: var(--acc); letter-spacing: .04em; margin-bottom: 1.1rem; }
.pub-abs { font-size: .82rem; color: var(--mid); line-height: 1.85; }

/* ── Education ── */
.edu-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 1.8rem; margin-bottom: 3rem; }
.ecard { padding: 2rem 2rem 2rem 2.3rem; border: 1px solid rgba(155,123,80,.3); background: rgba(255,252,243,.6); position: relative; overflow: hidden; }
.ecard::before { content: ''; position: absolute; top: 0; left: 0; width: 3px; height: 100%; background: var(--acc); }
.ecard-type { font-size: .62rem; letter-spacing: .2em; text-transform: uppercase; color: var(--acc); margin-bottom: .5rem; }
.ecard-deg { font-family: var(--s); font-size: 1.1rem; font-weight: 500; line-height: 1.3; margin-bottom: .4rem; }
.ecard-inst { font-size: .77rem; color: var(--mid); margin-bottom: 1rem; }
.ecard-row { display: flex; justify-content: space-between; align-items: center; font-size: .74rem; color: var(--mid); }
.ecard-score { font-family: var(--s); font-size: 1rem; color: var(--ink); }
.cert-hd { font-size: .63rem; letter-spacing: .2em; text-transform: uppercase; color: var(--acc); margin-bottom: 1rem; }
.certs { display: flex; flex-wrap: wrap; gap: .55rem; }
.ctag { font-size: .69rem; letter-spacing: .07em; padding: .38rem .9rem; border: 1px solid rgba(155,123,80,.35); border-radius: 100px; color: var(--mid); }

/* ── Contact ── */
.contact-body { display: grid; grid-template-columns: 1fr 1fr; gap: 4rem; align-items: start; }
.contact-hl { font-family: var(--s); font-size: clamp(2rem, calc(4vw / var(--z, 1)), 3.4rem); font-weight: 300; line-height: 1.12; color: var(--ink); }
.contact-hl em { font-style: italic; color: var(--acc); }
.csocials { display: flex; flex-direction: column; gap: .9rem; }
.csocial {
  display: flex; align-items: center; gap: 1rem; padding: 1.2rem 1.4rem;
  border: 1px solid rgba(155,123,80,.3); border-radius: 3px; text-decoration: none; color: var(--ink);
  transition: border-color .25s, background .25s, transform .25s;
}
.csocial:hover { border-color: var(--acc2); background: rgba(255,252,243,.7); transform: translateX(5px); }
.cs-icon { color: var(--acc); flex-shrink: 0; }
.cs-lbl { font-size: .8rem; font-weight: 400; letter-spacing: .04em; display: block; line-height: 1.2; }
.cs-sub { font-size: .71rem; color: var(--mid); margin-top: .1rem; display: block; }
.cs-arr { margin-left: auto; color: var(--acc2); transition: color .2s; }
.csocial:hover .cs-arr { color: var(--acc); }

/* ── Footer ── */
.footer { display: flex; justify-content: space-between; padding: 1.4rem 3.5rem; border-top: 1px solid var(--faint); font-size: .66rem; letter-spacing: .1em; text-transform: uppercase; color: var(--mid); }

/* ── Item reveal inside an unrolled map ── */
.rv { opacity: 0; transform: translateY(14px); transition: opacity .7s ease, transform .7s ease; }
.map.open .rv, .rv.in { opacity: 1; transform: translateY(0); }

/* ── Responsive ── */
@media (max-width: 900px) {
  .nav { padding: 1rem 1.5rem; }
  .nlinks { display: none; }
  .hero { padding: 0 1rem; }
  .hmain { grid-template-columns: minmax(0, 1fr); gap: 2rem; }
  .hid { flex-direction: column; align-items: flex-start; gap: 1.6rem; }
  .poster { width: 180px; }
  .poster-head { font-size: 1.75rem; }
  .poster-name { font-size: .88rem; }
  .hstats-grid { grid-template-columns: 1fr 1fr; }
  .hstat { padding: 1rem .8rem; min-width: 0; }
  .hstat strong { font-size: 1.6rem; }
  .hstat span { font-size: .62rem; letter-spacing: .08em; }
  .sec-in { padding: 0 1rem; }
  .map { padding: 2.4rem .4rem 2.6rem; }
  .map-paper { padding: 2rem 1.1rem 1.8rem; }
  .exp-row { grid-template-columns: 1fr; gap: .25rem; }
  .proj-grid { grid-template-columns: 1fr; }
  .pcard.sp2 { grid-column: span 1; }
  .edu-grid { grid-template-columns: 1fr; }
  .contact-body { grid-template-columns: 1fr; gap: 2rem; }
  .footer { flex-direction: column; gap: .4rem; padding: 1.4rem 1rem; }
}

/* ── Respect reduced motion: no drop, no unroll ── */
@media (prefers-reduced-motion: reduce) {
  .poster { animation: none; transform: rotate(-2.5deg); }
  .map-paper { clip-path: none; transition: none; }
  .roller.bot { top: calc(100% - 2.2rem); transition: none; }
  .rv { opacity: 1; transform: none; transition: none; }
  .mq-track { animation: none; }
}
`;

/* ─── Components ────────────────────────────────────────────── */
function Marquee({ items, reverse }) {
  const doubled = [...items, ...items];
  return (
    <div className="mq-row">
      <div className={`mq-track${reverse ? " rev" : ""}`}>
        {doubled.map((s, i) => (
          <span key={i} className="mq-item">{s} <span className="mq-dot">·</span></span>
        ))}
      </div>
    </div>
  );
}

function WantedPoster({ onFind }) {
  return (
    <a className="poster-pin" href="#contact" onClick={(e) => { e.preventDefault(); onFind(); }}
       aria-label="Wanted poster of Ruparagunath G. Click to go to contact details">
      <div className="poster">
        <div className="poster-head">WANTED</div>
        <div className="poster-photo"><img src={PHOTO} alt="Illustrated portrait of Ruparagunath G" /></div>
        <div className="poster-for">for asking how the human brain hears</div>
        <div className="poster-name">RUPARAGUNATH G</div>
        <div className="poster-reward">Reward · Collaboration</div>
        <div className="poster-find">click to find him →</div>
      </div>
    </a>
  );
}

/* A section whose content unrolls like a treasure map when it scrolls into view */
function MapSection({ id, alt, n, title, children }) {
  const ref = useRef(null);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setOpen(true); obs.disconnect(); } },
      { threshold: 0, rootMargin: "0px 0px -12% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return (
    <section id={id} className={`sec${alt ? " alt" : ""}`}>
      <div className="sec-in">
        <div ref={ref} className={`map${open ? " open" : ""}`}>
          <div className="roller top" aria-hidden="true" />
          <div className="map-paper">
            <div className="sec-hd">
              <span className="sec-n">{n}</span>
              <span className="sec-t">{title}</span>
            </div>
            {children}
          </div>
          <div className="roller bot" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}

/* ─── Main Portfolio Component ──────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [active,   setActive]   = useState("hero");
  const cursorRef = useRef(null);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
      setProgress(scrollTop / (scrollHeight - clientHeight) * 100);
    };
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const move = (e) => {
      if (!cursorRef.current) return;
      const z = parseFloat(getComputedStyle(document.documentElement).getPropertyValue("--z")) || 1;
      cursorRef.current.style.left = e.clientX / z + "px";
      cursorRef.current.style.top  = e.clientY / z + "px";
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  useEffect(() => {
    const add = () => cursorRef.current?.classList.add("big");
    const rm  = () => cursorRef.current?.classList.remove("big");
    const els = document.querySelectorAll("a, button");
    els.forEach(el => { el.addEventListener("mouseenter", add); el.addEventListener("mouseleave", rm); });
    return () => els.forEach(el => { el.removeEventListener("mouseenter", add); el.removeEventListener("mouseleave", rm); });
  });

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add("in")),
      { threshold: 0.07, rootMargin: "0px 0px -40px 0px" }
    );
    document.querySelectorAll(".rv").forEach((el, i) => {
      el.style.transitionDelay = `${0.5 + (i % 6) * 0.07}s`;
      obs.observe(el);
    });
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    const ids = ["hero","research","experience","projects","publications","education","contact"];
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && setActive(e.target.id)),
      { threshold: 0.2 }
    );
    ids.forEach(id => { const el = document.getElementById(id); if (el) obs.observe(el); });
    return () => obs.disconnect();
  }, []);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const navItems = [
    ["research","Research"], ["experience","Experience"], ["projects","Projects"],
    ["publications","Publications"], ["education","Education"], ["contact","Contact"],
  ];

  return (
    <>
      <style>{CSS}</style>
      <div ref={cursorRef} className="cur" />
      <div className="prog" style={{ width: `${progress}%` }} />

      {/* ── NAV ── */}
      <nav className={`nav${scrolled ? " on" : ""}`}>
        <button className="nlogo" onClick={() => go("hero")}>RG ·</button>
        <ul className="nlinks">
          {navItems.map(([id, lbl]) => (
            <li key={id}>
              <button className={`nlink${active === id ? " on" : ""}`} onClick={() => go(id)}>{lbl}</button>
            </li>
          ))}
        </ul>
      </nav>

      {/* ── HERO ── */}
      <section id="hero" className="hero">
        <div className="htop">
          <p className="eyebrow">AI Researcher · Speech, Hearing &amp; Trustworthy AI</p>
        </div>

        <div className="hmain">
          <div className="hleft">
            <div className="hid">
              <WantedPoster onFind={() => go("contact")} />
              <h1>
                <span className="n1">Ruparagunath</span>
                <span className="n2"><em>G</em> </span>
              </h1>
            </div>
            <p className="hbio">
              Final-year B.Tech in AI &amp; Data Science at Anna University, MIT Campus, Chennai.
              I am interested in how people understand speech that is hard to hear, in noise, through
              a cochlear implant or from a speaker with a speech disorder, and in building models of
              hearing that keep working for the people they are meant to help. My research at Anna
              University, IIT Madras and the University of Toronto covers dysarthric speech,
              sign-language translation, explainable medical imaging and equation discovery.
            </p>
          </div>

          <div className="hstats-grid">
            {[["2","Publications"],["3","Institutions"],[String(PROJ.length),"Projects"],["8","Certifications"]].map(([n, l]) => (
              <div className="hstat" key={l}><strong>{n}</strong><span>{l}</span></div>
            ))}
          </div>
        </div>

        <div className="hbar">
          <div className="hbar-scroll"><span className="hbar-hint">Scroll to unroll</span><div className="hbar-line" /></div>
        </div>
      </section>

      <div className="mq-wrap">
        <Marquee items={TICKER} reverse={false} />
        <Marquee items={TICKER} reverse={true} />
      </div>

      {/* ── RESEARCH ── */}
      <MapSection id="research" n="01" title="Research">
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
      </MapSection>

      {/* ── EXPERIENCE ── */}
      <MapSection id="experience" alt n="02" title="Experience">
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
      </MapSection>

      {/* ── PROJECTS ── */}
      <MapSection id="projects" n="03" title="Projects">
        <div className="proj-grid">
          {PROJ.map((p, i) => (
            <div key={i} className={`pcard${p.span === 2 ? " sp2" : ""}`}>
              <p className="ptag">{p.tag}</p>
              <h3 className="ptitle">{p.title}</h3>
              <p className="pdesc">{p.desc}</p>
            </div>
          ))}
        </div>
      </MapSection>

      {/* ── PUBLICATIONS ── */}
      <MapSection id="publications" alt n="04" title="Publications">
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
      </MapSection>

      {/* ── EDUCATION ── */}
      <MapSection id="education" n="05" title="Education">
        <div className="edu-grid rv">
          <div className="ecard">
            <p className="ecard-type">B.Tech · 2024 – 2027 (expected)</p>
            <h3 className="ecard-deg">Artificial Intelligence &amp; Data Science</h3>
            <p className="ecard-inst">Anna University, MIT Campus · Chennai · joined the second year by lateral entry</p>
            <div className="ecard-row"><span>Through 6th semester</span><span className="ecard-score">CGPA 7.95 / 10</span></div>
          </div>
          <div className="ecard">
            <p className="ecard-type">Diploma · 2021 – 2024</p>
            <h3 className="ecard-deg">Computer Engineering</h3>
            <p className="ecard-inst">Central Polytechnic College · Chennai</p>
            <div className="ecard-row"><span>Completed</span><span className="ecard-score">95.1%</span></div>
          </div>
        </div>
        <div className="rv">
          <p className="cert-hd">Certifications</p>
          <div className="certs">{CERTS.map((c, i) => <span key={i} className="ctag">{c}</span>)}</div>
        </div>
      </MapSection>

      {/* ── CONTACT ── */}
      <MapSection id="contact" alt n="06" title="Contact">
        <div className="contact-body">
          <h2 className="contact-hl rv">Let's build<br />something<br /><em>remarkable.</em></h2>
          <div className="csocials rv">
            {SOCIALS.map(({ Icon, label, sub, href }) => (
              <a key={label} href={href} className="csocial" target="_blank" rel="noopener noreferrer">
                <Icon size={20} className="cs-icon" />
                <div><span className="cs-lbl">{label}</span><span className="cs-sub">{sub}</span></div>
                <ArrowUpRight size={16} className="cs-arr" />
              </a>
            ))}
          </div>
        </div>
      </MapSection>

      <footer className="footer">
        <span>© 2026 Ruparagunath G</span>
        <span>AI Researcher · Speech, Hearing &amp; Trustworthy AI · Chennai, India</span>
      </footer>
    </>
  );
}
