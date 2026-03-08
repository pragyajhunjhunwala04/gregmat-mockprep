import { useState, useEffect, useRef } from "react";

const PASSAGE = `The development of artificial intelligence has raised profound questions about the future of employment. While some economists argue that automation will create new jobs as it has in previous technological revolutions, others contend that this time is different. Unlike the Industrial Revolution, which replaced physical labor but created demand for cognitive work, modern AI threatens to automate cognitive tasks themselves. A 2023 study estimated that 47% of current jobs in the United States are at high risk of automation within the next two decades.

Proponents of automation argue that increased productivity will generate wealth, stimulate demand for new goods and services, and ultimately create more employment opportunities. Historical precedent supports this view: the agricultural revolution displaced farm workers, yet industrial economies absorbed them and created unprecedented prosperity. However, critics point out that these transitions occurred over generations, allowing labor markets to adapt gradually.

The policy implications are significant. Some economists advocate for universal basic income (UBI) as a buffer against technological unemployment, while others favor targeted retraining programs. A third camp argues that the focus should be on reducing working hours rather than replacing displaced workers, distributing productivity gains across the workforce through shorter workweeks.`;

const SECTIONS = [
  {
    id: "quant", name: "Quantitative Reasoning", abbr: "QR", duration: 21 * 60,
    questions: [
      { type: "PS", text: "If x² − 5x + 6 = 0, what is the sum of all possible values of x?", options: ["1", "3", "5", "6", "11"], answer: 2, explanation: "Factoring: (x−2)(x−3) = 0, so x = 2 or x = 3. Sum = 2 + 3 = 5." },
      { type: "PS", text: "A train travels 360 km at a uniform speed. If the speed had been 10 km/h faster, it would have taken 1 hour less. What is the original speed in km/h?", options: ["40", "50", "60", "70", "80"], answer: 2, explanation: "360/x − 360/(x+10) = 1 → 3600 = x² + 10x → x² + 10x − 3600 = 0 → x = 60." },
      { type: "PS", text: "What is the probability that a randomly selected 2-digit number is divisible by 15?", options: ["1/15", "1/10", "2/15", "1/6", "1/5"], answer: 0, explanation: "2-digit multiples of 15: 15, 30, 45, 60, 75, 90 = 6 numbers. Total 2-digit numbers = 90. Probability = 6/90 = 1/15." },
      { type: "PS", text: "If 3^(2x) = 81, what is the value of x?", options: ["1", "2", "4", "8", "16"], answer: 1, explanation: "81 = 3⁴, so 3^(2x) = 3⁴ → 2x = 4 → x = 2." },
      { type: "PS", text: "A store sells Item A for $25 and Item B for $40. If 50 items were sold for a total of $1,625, how many of Item A were sold?", options: ["15", "20", "25", "30", "35"], answer: 2, explanation: "Let a = Item A count. 25a + 40(50−a) = 1625 → −15a = −375 → a = 25." },
      { type: "DS", text: "Is x > 0?\n\n(1) x² > 0\n(2) x³ > 0", options: ["Statement (1) ALONE is sufficient", "Statement (2) ALONE is sufficient", "BOTH statements together are sufficient", "EACH statement ALONE is sufficient", "NEITHER statement is sufficient"], answer: 1, explanation: "Statement (1): x² > 0 means x ≠ 0, but x could be negative — NOT sufficient. Statement (2): x³ > 0 requires x > 0 — SUFFICIENT." },
      { type: "PS", text: "The average of 5 consecutive even integers is 16. What is the largest of these integers?", options: ["18", "20", "22", "24", "26"], answer: 1, explanation: "The middle (3rd) integer equals the average = 16. Sequence: 12, 14, 16, 18, 20. Largest = 20." },
      { type: "PS", text: "A circle has area 25π square units. What is its circumference?", options: ["5π", "10π", "15π", "25π", "50π"], answer: 1, explanation: "Area = πr² = 25π → r = 5. Circumference = 2πr = 10π." },
      { type: "DS", text: "What is the value of xy?\n\n(1) x + y = 10\n(2) x − y = 4", options: ["Statement (1) ALONE is sufficient", "Statement (2) ALONE is sufficient", "BOTH statements together are sufficient", "EACH statement ALONE is sufficient", "NEITHER statement is sufficient"], answer: 2, explanation: "Neither statement alone uniquely determines xy. Together: x = 7, y = 3, so xy = 21 — BOTH together are sufficient." },
      { type: "PS", text: "If 20% of a number equals 50, what is 35% of the same number?", options: ["70", "75", "87.5", "100", "175"], answer: 2, explanation: "0.20 × n = 50 → n = 250. Then 0.35 × 250 = 87.5." },
    ]
  },
  {
    id: "verbal", name: "Verbal Reasoning", abbr: "VR", duration: 20 * 60,
    questions: [
      { type: "CR", text: "Researchers found that employees who work from home are 20% more productive than those in offices. Therefore, companies should allow all employees to work from home to maximize productivity.\n\nWhich of the following, if true, most WEAKENS the conclusion?", options: ["Many employees prefer offices for social interaction.", "The study only included self-reported productivity measures, which may be biased.", "Some jobs require physical presence and cannot be done remotely.", "Working from home reduces commute time, giving employees more energy.", "Companies that allow remote work have lower real estate costs."], answer: 1, explanation: "Choice B undermines the evidence by revealing that the 20% figure may be unreliable (self-reporting bias). Without valid evidence, the conclusion collapses." },
      { type: "CR", text: "All competitive athletes train daily. Maria trains daily. Therefore, Maria is a competitive athlete.\n\nThe argument above is flawed primarily because it:", options: ["Assumes daily training guarantees athletic success.", "Confuses a necessary condition with a sufficient condition.", "Relies on anecdotal evidence about Maria.", "Overgeneralizes from a specific case.", "Ignores other forms of athletic training."], answer: 1, explanation: "Daily training is necessary to be a competitive athlete but not sufficient. Many non-athletes also train daily. The argument treats a necessary condition as though it were sufficient." },
      { type: "CR", text: "A city's crime rate decreased 15% after a new community policing program launched. Officials concluded the program caused the decrease.\n\nWhich of the following, if true, most STRENGTHENS the officials' conclusion?", options: ["The crime rate in neighboring cities without the program remained unchanged.", "Community policing programs are expensive to maintain.", "Some residents were unaware of the new program.", "The decrease occurred only in certain neighborhoods.", "Crime rates typically fluctuate year to year."], answer: 0, explanation: "If comparable cities without the program saw no decrease, it eliminates alternative explanations (seasonal trends, etc.) and strengthens the causal link to the policing program." },
      { type: "CR", text: "Advertisement: '9 out of 10 dentists recommend SmileBright toothpaste for their patients who chew gum.'\n\nWhich best identifies the flaw in using this as evidence SmileBright is the best toothpaste overall?", options: ["The advertisement uses emotional appeals rather than factual evidence.", "The recommendation is limited to a specific subset of patients.", "Dentists may have financial incentives to recommend SmileBright.", "The survey sample size is not mentioned.", "The toothpaste may contain harmful chemicals."], answer: 1, explanation: "The recommendation only applies to patients who chew gum — a narrow subgroup. Generalizing this to all toothpaste users is an unwarranted scope expansion." },
      { type: "CR", text: "Countries with higher chocolate consumption have more Nobel Prize winners per capita. Therefore, eating chocolate increases cognitive ability.\n\nThe argument is most vulnerable to criticism that:", options: ["It fails to establish a biological mechanism between chocolate and intelligence.", "Correlation does not imply causation; both may result from higher national wealth.", "The studies are funded by chocolate manufacturers.", "Nobel Prize winners represent only a small fraction of the population.", "Cognitive ability is difficult to measure objectively."], answer: 1, explanation: "Classic correlation/causation flaw. A third variable (national wealth) could explain both higher chocolate consumption and more Nobel laureates without any causal link." },
      { type: "RC", passage: true, text: "According to the passage, what distinguishes modern AI from previous technological revolutions?", options: ["Modern AI is developing faster than previous technologies.", "Modern AI threatens cognitive rather than just physical labor.", "Modern AI is being developed primarily in wealthy countries.", "Modern AI requires less human oversight than previous technologies.", "Modern AI creates fewer new industries than previous technologies."], answer: 1, explanation: "The passage states: unlike the Industrial Revolution, which replaced physical labor but created demand for cognitive work, modern AI threatens to automate cognitive tasks themselves." },
      { type: "RC", passage: true, text: "What is the primary purpose of the passage?", options: ["To argue that AI will inevitably cause mass unemployment.", "To present multiple perspectives on AI's impact on employment.", "To advocate for universal basic income as the best policy solution.", "To compare the current revolution with the Agricultural Revolution only.", "To summarize a 2023 study on job automation risk."], answer: 1, explanation: "The passage presents views of multiple camps — optimists citing historical precedent, critics warning of faster disruption, and policy advocates — without endorsing one perspective." },
      { type: "RC", passage: true, text: "The author mentions the agricultural revolution primarily to:", options: ["Demonstrate that technological disruption always leads to decline.", "Provide historical evidence that labor markets can adapt to technological change.", "Suggest that farm workers were uniquely resilient to displacement.", "Argue that historical analogies are irrelevant to modern AI.", "Show that industrial economies were more prosperous than agricultural ones."], answer: 1, explanation: "The agricultural revolution is cited as a precedent supporting the optimists' view — displaced workers were absorbed into industrial economies, creating 'unprecedented prosperity.'" },
      { type: "RC", passage: true, text: "Which best describes the 'third camp' mentioned in the final paragraph?", options: ["Economists who believe AI will create more jobs than it destroys.", "Policymakers who support universal basic income programs.", "Advocates who believe automation's benefits should be shared through reduced working hours.", "Critics who argue retraining programs are more effective than UBI.", "Researchers studying historical precedents of technological change."], answer: 2, explanation: "The passage describes the third camp as favoring 'reducing working hours rather than replacing displaced workers, distributing productivity gains across the workforce through shorter workweeks.'" },
      { type: "RC", passage: true, text: "The author's tone throughout the passage is best described as:", options: ["Alarmed and urgent about AI's dangers.", "Dismissive of concerns about technological unemployment.", "Balanced and informational, presenting multiple views.", "Optimistic about automation's long-term benefits.", "Critical of current economic policy responses."], answer: 2, explanation: "The author presents arguments from multiple perspectives without taking a side — proponents, critics, and three different policy camps — indicating a balanced, informational tone." },
    ]
  },
  {
    id: "data", name: "Data Insights", abbr: "DI", duration: 22 * 60,
    questions: [
      { type: "DS", text: "Is integer n divisible by 6?\n\n(1) n is divisible by 3\n(2) n is divisible by 4", options: ["Statement (1) ALONE is sufficient", "Statement (2) ALONE is sufficient", "BOTH statements together are sufficient", "EACH statement ALONE is sufficient", "NEITHER statement is sufficient"], answer: 2, explanation: "Statement (1) alone: n=3 is not divisible by 6. Statement (2) alone: n=4 is not divisible by 6. Together: divisible by both 4 (hence 2) and 3 guarantees divisibility by 6 — SUFFICIENT." },
      { type: "DS", text: "What is the value of |x − 3|?\n\n(1) x² = 9\n(2) x < 0", options: ["Statement (1) ALONE is sufficient", "Statement (2) ALONE is sufficient", "BOTH statements together are sufficient", "EACH statement ALONE is sufficient", "NEITHER statement is sufficient"], answer: 2, explanation: "Statement (1): x = 3 or x = −3, giving |x−3| = 0 or 6 — NOT sufficient alone. Statement (2): x < 0 but any negative value is possible. Together: x must be −3, so |−3−3| = 6 — SUFFICIENT." },
      { type: "TPA", text: "A company earned $240,000 in revenue. It spent 30% on salaries, 15% on marketing, and 10% on operations. The remainder is profit.\n\nSelect the correct values for:\n— Total expense percentage\n— Profit amount in dollars", options: ["55% and $108,000", "55% and $132,000", "45% and $108,000", "45% and $132,000", "60% and $96,000"], answer: 0, explanation: "Total expenses: 30 + 15 + 10 = 55%. Profit percentage = 100 − 55 = 45%. Profit = 0.45 × $240,000 = $108,000." },
      { type: "DS", text: "Is the product of integers a, b, and c equal to zero?\n\n(1) a × b = 0\n(2) b × c ≠ 0", options: ["Statement (1) ALONE is sufficient", "Statement (2) ALONE is sufficient", "BOTH statements together are sufficient", "EACH statement ALONE is sufficient", "NEITHER statement is sufficient"], answer: 0, explanation: "Statement (1): a × b = 0 means at least one of a or b equals 0. Therefore a × b × c = 0 regardless of c — SUFFICIENT alone." },
      { type: "GI", text: "A bar chart shows annual sales (in millions) for 4 products over 3 years:\n• Product W: Year 1=$2M, Year 2=$3M, Year 3=$4M\n• Product X: Year 1=$5M, Year 2=$4M, Year 3=$3M\n• Product Y: Year 1=$1M, Year 2=$2M, Year 3=$4M\n• Product Z: Year 1=$3M, Year 2=$3M, Year 3=$3M\n\nWhich product showed the greatest percentage increase from Year 1 to Year 3?", options: ["Product W", "Product X", "Product Y", "Product Z", "Products W and Y tied"], answer: 2, explanation: "W: (4−2)/2 = 100%. X: decreased. Y: (4−1)/1 = 300%. Z: 0%. Product Y showed the greatest percentage increase at 300%." },
      { type: "DS", text: "If p and q are positive integers, is p/q > 1?\n\n(1) p > q + 1\n(2) q = 5", options: ["Statement (1) ALONE is sufficient", "Statement (2) ALONE is sufficient", "BOTH statements together are sufficient", "EACH statement ALONE is sufficient", "NEITHER statement is sufficient"], answer: 0, explanation: "Statement (1): p > q + 1 implies p > q, so p/q > 1 — SUFFICIENT. Statement (2): q = 5 tells us nothing about p — NOT sufficient." },
      { type: "TPA", text: "A project requires Tasks A, B, and C. Task A takes 6 days, B takes 4 days, C takes 3 days. Worker 1 can complete A and B. Worker 2 can complete B and C.\n\nIf each worker works independently, what is the minimum total days to complete all three tasks with two workers?", options: ["7 days", "8 days", "9 days", "10 days", "13 days"], answer: 0, explanation: "Optimal: Worker 1 does Task A (6 days); Worker 2 does Tasks B + C (4 + 3 = 7 days). Working in parallel: total = max(6, 7) = 7 days." },
      { type: "DS", text: "A jar contains only red and blue marbles. What fraction of the marbles are red?\n\n(1) There are 12 red marbles.\n(2) The ratio of red to blue marbles is 3:4.", options: ["Statement (1) ALONE is sufficient", "Statement (2) ALONE is sufficient", "BOTH statements together are sufficient", "EACH statement ALONE is sufficient", "NEITHER statement is sufficient"], answer: 1, explanation: "Statement (1): 12 red marbles but total is unknown — NOT sufficient. Statement (2): ratio 3:4 gives red fraction = 3/(3+4) = 3/7 — SUFFICIENT." },
      { type: "GI", text: "A line graph shows a company's quarterly profit margin over 4 quarters:\nQ1: 8%, Q2: 12%, Q3: 10%, Q4: 15%\n\nWhat is the average profit margin, and in which quarter was the margin furthest from that average?", options: ["Average = 10.5%, Q4 furthest", "Average = 11.25%, Q1 furthest", "Average = 11.25%, Q4 furthest", "Average = 10.5%, Q1 furthest", "Average = 11%, Q1 furthest"], answer: 2, explanation: "Average = (8+12+10+15)/4 = 11.25%. Deviations: Q1=3.25, Q2=0.75, Q3=1.25, Q4=3.75. Q4 has the largest deviation from the average." },
      { type: "DS", text: "Is x² > x?\n\n(1) x > 1\n(2) x is a positive integer", options: ["Statement (1) ALONE is sufficient", "Statement (2) ALONE is sufficient", "BOTH statements together are sufficient", "EACH statement ALONE is sufficient", "NEITHER statement is sufficient"], answer: 0, explanation: "Statement (1): If x > 1, then x² = x·x > x·1 = x — always true, SUFFICIENT. Statement (2): x could be 1, where x²=x (not strictly greater) — NOT sufficient." },
    ]
  }
];

const TYPE_LABELS = { PS: "Problem Solving", DS: "Data Sufficiency", CR: "Critical Reasoning", RC: "Reading Comprehension", TPA: "Two-Part Analysis", GI: "Graphics Interpretation" };

function fmt(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const C = {
  bg: "#0d0f1a", surface: "#141826", border: "#1e2540", accent: "#5b6ef5",
  gold: "#e8b84b", green: "#3ecf7a", red: "#f05252", muted: "#4a5580",
  text: "#d4daf0", dim: "#8090b8", mono: "'Courier New', monospace"
};

export default function GMATMock() {
  const [screen, setScreen] = useState("welcome");
  const [secIdx, setSecIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState([{}, {}, {}]);
  const [flagged, setFlagged] = useState([{}, {}, {}]);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [warn, setWarn] = useState(false);
  const [showPassage, setShowPassage] = useState(false);
  const [scores, setScores] = useState([]);
  const [isReview, setIsReview] = useState(false);

  const timerRef = useRef(null);
  const secIdxRef = useRef(secIdx);
  const answersRef = useRef(answers);
  secIdxRef.current = secIdx;
  answersRef.current = answers;

  const sec = SECTIONS[secIdx];
  const q = sec.questions[qIdx];
  const total = sec.questions.length;

  const finishSection = (si, ans) => {
    const s = SECTIONS[si];
    const correct = s.questions.filter((q, i) => ans[si][i] === q.answer).length;
    setScores(prev => [...prev, { name: s.name, abbr: s.abbr, correct, total: s.questions.length }]);
    setIsReview(false);
    if (si < SECTIONS.length - 1) setScreen("secEnd");
    else setScreen("results");
  };

  const startTimer = (duration) => {
    if (timerRef.current) clearInterval(timerRef.current);
    setTimeLeft(duration);
    setWarn(duration <= 300);
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        const next = t - 1;
        setWarn(next <= 300);
        if (next <= 0) {
          clearInterval(timerRef.current);
          finishSection(secIdxRef.current, answersRef.current);
          return 0;
        }
        return next;
      });
    }, 1000);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const startSection = () => {
    setQIdx(0);
    setSelected(answers[secIdx][0] ?? null);
    setIsReview(false);
    setShowPassage(false);
    startTimer(sec.duration);
    setScreen("exam");
  };

  const saveAnswer = (si, qi, val) => {
    setAnswers(prev => {
      const next = prev.map(s => ({ ...s }));
      next[si][qi] = val;
      return next;
    });
  };

  const navTo = (i) => {
    if (selected !== null) saveAnswer(secIdx, qIdx, selected);
    setQIdx(i);
    setSelected(answers[secIdx][i] ?? null);
  };

  const next = () => {
    if (selected !== null) saveAnswer(secIdx, qIdx, selected);
    if (qIdx < total - 1) {
      const ni = qIdx + 1;
      setQIdx(ni);
      setSelected(answers[secIdx][ni] ?? null);
    } else {
      setIsReview(true);
    }
  };

  const prev = () => {
    if (qIdx > 0) {
      if (selected !== null) saveAnswer(secIdx, qIdx, selected);
      const pi = qIdx - 1;
      setQIdx(pi);
      setSelected(answers[secIdx][pi] ?? null);
    }
  };

  const submitSection = () => {
    if (selected !== null) saveAnswer(secIdx, qIdx, selected);
    clearInterval(timerRef.current);
    finishSection(secIdx, answersRef.current);
  };

  const nextSection = () => {
    const ni = secIdx + 1;
    setSecIdx(ni);
    setQIdx(0);
    setSelected(null);
    setScreen("secIntro");
  };

  const toggleFlag = () => {
    setFlagged(prev => {
      const next = prev.map(s => ({ ...s }));
      next[secIdx][qIdx] = !next[secIdx][qIdx];
      return next;
    });
  };

  const restart = () => {
    setScreen("welcome"); setSecIdx(0); setQIdx(0);
    setAnswers([{}, {}, {}]); setFlagged([{}, {}, {}]);
    setSelected(null); setScores([]); setIsReview(false);
  };

  const answered = Object.keys(answers[secIdx]).length;
  const flagCount = Object.values(flagged[secIdx]).filter(Boolean).length;

  // ─── STYLES ───────────────────────────────────────────────────────────
  const card = { background: C.surface, border: `1px solid ${C.border}`, borderRadius: 12, padding: "36px 44px", maxWidth: 720, width: "100%" };
  const btn = (variant) => {
    const base = { padding: "11px 28px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "Georgia, serif", letterSpacing: "0.8px", transition: "opacity .15s" };
    if (variant === "primary") return { ...base, background: C.accent, color: "#fff", boxShadow: "0 4px 16px rgba(91,110,245,.35)" };
    if (variant === "ghost")   return { ...base, background: "transparent", color: C.dim, border: `1px solid ${C.border}` };
    if (variant === "danger")  return { ...base, background: "rgba(240,82,82,.12)", color: "#f07070", border: "1px solid rgba(240,82,82,.3)" };
    return base;
  };
  const badge = (col) => ({ display: "inline-block", padding: "2px 10px", borderRadius: 4, fontSize: 10, letterSpacing: 2, fontFamily: C.mono, fontWeight: 700, background: col + "22", color: col, border: `1px solid ${col}44`, marginBottom: 14 });
  const header = { background: "#090b14", borderBottom: `1px solid ${C.border}`, padding: "11px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 };
  const infoBox = { background: "#09090f", border: `1px solid ${C.border}`, borderRadius: 8, padding: "14px 18px" };

  // ─── WELCOME ─────────────────────────────────────────────────────────
  if (screen === "welcome") return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "Georgia, serif", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ ...card, maxWidth: 640, textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: C.accent, fontFamily: C.mono, marginBottom: 16 }}>GRADUATE MANAGEMENT ADMISSION TEST</div>
        <h1 style={{ fontSize: 34, color: "#bcc4f0", fontWeight: 400, marginBottom: 6 }}>GMAT Focus Edition</h1>
        <p style={{ color: C.muted, fontSize: 13, marginBottom: 32 }}>Official Mock Test · 30 Questions · ~63 Minutes</p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 28 }}>
          {SECTIONS.map((s, i) => (
            <div key={s.id} style={{ ...infoBox, gridColumn: i === 2 ? "span 2" : "auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 10, color: C.muted, letterSpacing: 2, fontFamily: C.mono, marginBottom: 4 }}>{s.abbr}</div>
                <div style={{ fontSize: 15, color: C.text }}>{s.name}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 24, color: C.accent, fontFamily: C.mono, fontWeight: 700 }}>{s.questions.length}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{Math.floor(s.duration / 60)} min</div>
              </div>
            </div>
          ))}
        </div>
        <button style={btn("primary")} onClick={() => setScreen("instructions")}>Read Instructions →</button>
      </div>
    </div>
  );

  // ─── INSTRUCTIONS ────────────────────────────────────────────────────
  if (screen === "instructions") return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "Georgia, serif" }}>
      <div style={header}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: C.accent, fontFamily: C.mono }}>GMAT FOCUS EDITION</div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: C.mono }}>OFFICIAL MOCK TEST</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", padding: "36px 24px" }}>
        <div style={{ ...card, maxWidth: 680 }}>
          <div style={badge(C.gold)}>EXAM INSTRUCTIONS</div>
          <h2 style={{ fontSize: 22, color: "#bcc4f0", fontWeight: 400, marginBottom: 20 }}>Before You Begin</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px" }}>
            {[
              ["⏱", "Each section is timed independently. The countdown begins when you click Start Section."],
              ["🔒", "You cannot return to a previous section once it is submitted."],
              ["➡️", "Navigate between questions within a section using the progress dots in the sidebar."],
              ["🚩", "Flag questions for review before submitting a section."],
              ["⚠️", "Timer turns red when 5 minutes remain. No additional warnings are given."],
              ["📵", "No calculator, scratch paper, or reference material — simulate real conditions."],
              ["🎯", "GMAT Focus Edition uses adaptive scoring (205–805). This mock reports raw accuracy per section."],
            ].map(([icon, text], i) => (
              <li key={i} style={{ padding: "9px 0", borderBottom: `1px solid ${C.border}`, fontSize: 13, color: C.dim, display: "flex", gap: 10, lineHeight: 1.55 }}>
                <span>{icon}</span><span>{text}</span>
              </li>
            ))}
          </ul>
          <div style={{ ...infoBox, marginBottom: 24, background: "rgba(91,110,245,.06)" }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: C.accent, fontFamily: C.mono, marginBottom: 10 }}>DATA SUFFICIENCY — ANSWER GUIDE</div>
            {[["A","Statement (1) ALONE sufficient, not (2)"],["B","Statement (2) ALONE sufficient, not (1)"],["C","BOTH together sufficient, neither alone"],["D","EACH statement ALONE sufficient"],["E","NEITHER statement is sufficient"]].map(([l, t]) => (
              <div key={l} style={{ fontSize: 13, color: C.dim, padding: "3px 0" }}><b style={{ color: C.text }}>{l}</b> — {t}</div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
            <button style={btn("ghost")} onClick={() => setScreen("welcome")}>← Back</button>
            <button style={btn("primary")} onClick={() => setScreen("secIntro")}>Start Section 1 →</button>
          </div>
        </div>
      </div>
    </div>
  );

  // ─── SECTION INTRO ───────────────────────────────────────────────────
  if (screen === "secIntro") return (
    <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "Georgia, serif", display: "flex", flexDirection: "column" }}>
      <div style={header}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: C.accent, fontFamily: C.mono }}>GMAT FOCUS EDITION</div>
        <div style={{ fontSize: 11, color: C.muted, fontFamily: C.mono }}>SECTION {secIdx + 1} OF 3</div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ ...card, maxWidth: 500, textAlign: "center" }}>
          <div style={badge(C.accent)}>NEXT SECTION</div>
          <h2 style={{ fontSize: 28, color: "#bcc4f0", fontWeight: 400, marginBottom: 6 }}>{sec.name}</h2>
          <p style={{ color: C.muted, fontSize: 13, marginBottom: 28 }}>Section {secIdx + 1} of {SECTIONS.length}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 36, marginBottom: 28 }}>
            <div><div style={{ fontSize: 44, color: C.accent, fontFamily: C.mono, fontWeight: 700 }}>{sec.questions.length}</div><div style={{ fontSize: 11, color: C.muted }}>QUESTIONS</div></div>
            <div style={{ width: 1, background: C.border }} />
            <div><div style={{ fontSize: 44, color: C.gold, fontFamily: C.mono, fontWeight: 700 }}>{Math.floor(sec.duration / 60)}</div><div style={{ fontSize: 11, color: C.muted }}>MINUTES</div></div>
          </div>
          <p style={{ fontSize: 13, color: C.muted, marginBottom: 28, lineHeight: 1.6 }}>
            {secIdx === 0 && "Problem Solving and Data Sufficiency — arithmetic, algebra, and geometry."}
            {secIdx === 1 && "Critical Reasoning and Reading Comprehension — logical analysis and inference."}
            {secIdx === 2 && "Data Sufficiency, Two-Part Analysis, and Graphics Interpretation."}
          </p>
          <button style={{ ...btn("primary"), padding: "13px 40px", fontSize: 14 }} onClick={startSection}>Start Section →</button>
        </div>
      </div>
    </div>
  );

  // ─── EXAM / REVIEW ───────────────────────────────────────────────────
  if (screen === "exam") {
    const dotState = (i) => {
      if (i === qIdx) return "current";
      if (flagged[secIdx][i]) return "flagged";
      if (answers[secIdx][i] !== undefined) return "done";
      return "empty";
    };
    const dotStyle = (state) => {
      const bg = state === "current" ? C.accent : state === "flagged" ? C.gold : state === "done" ? "#2e3d60" : C.border;
      return { width: 18, height: 18, borderRadius: 3, background: bg, cursor: "pointer", border: state === "current" ? `2px solid ${C.accent}` : "none", boxSizing: "border-box", flexShrink: 0 };
    };

    return (
      <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "Georgia, serif", display: "flex", flexDirection: "column" }}>
        {/* Header */}
        <div style={header}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: C.accent, fontFamily: C.mono }}>GMAT</div>
            <div style={{ fontSize: 11, color: C.muted, fontFamily: C.mono }}>{sec.abbr} · Q{qIdx + 1}/{total}</div>
            <div style={{ ...badge(C.muted), marginBottom: 0, fontSize: 9 }}>{TYPE_LABELS[q.type]}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {isReview
              ? <div style={{ fontSize: 11, color: C.gold, fontFamily: C.mono, letterSpacing: 2 }}>REVIEW MODE</div>
              : <div style={{ fontFamily: C.mono, fontSize: 20, fontWeight: 700, color: warn ? C.red : C.gold, padding: "4px 14px", background: warn ? "rgba(240,82,82,.1)" : "rgba(232,184,75,.08)", borderRadius: 6, border: `1px solid ${warn ? "rgba(240,82,82,.3)" : "rgba(232,184,75,.3)"}` }}>{fmt(timeLeft)}</div>
            }
          </div>
        </div>

        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          {/* Sidebar */}
          <div style={{ width: 172, background: "#09090f", borderRight: `1px solid ${C.border}`, padding: "18px 14px", display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: C.muted, fontFamily: C.mono }}>QUESTIONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {sec.questions.map((_, i) => <div key={i} style={dotStyle(dotState(i))} onClick={() => navTo(i)} title={`Q${i + 1}`} />)}
            </div>
            <div style={{ fontSize: 11, color: C.muted, lineHeight: 1.9 }}>
              <div style={{ color: "#4466cc" }}>■ {answered} answered</div>
              <div style={{ color: C.gold }}>■ {flagCount} flagged</div>
              <div>□ {total - answered} remaining</div>
            </div>
            <button style={{ ...btn("ghost"), padding: "7px 10px", fontSize: 11, marginTop: "auto", textAlign: "center" }} onClick={toggleFlag}>
              {flagged[secIdx][qIdx] ? "🚩 Unflag" : "🏳 Flag Q"}
            </button>
          </div>

          {/* Question */}
          <div style={{ flex: 1, overflowY: "auto", padding: "26px 30px" }}>
            {q.passage && (
              <div style={{ marginBottom: 16 }}>
                <button style={{ ...btn("ghost"), padding: "5px 14px", fontSize: 11 }} onClick={() => setShowPassage(v => !v)}>
                  {showPassage ? "Hide Passage ▲" : "Show Passage ▼"}
                </button>
                {showPassage && (
                  <div style={{ marginTop: 10, background: "#090a10", border: `1px solid ${C.border}`, borderRadius: 8, padding: "18px 22px", fontSize: 13, lineHeight: 1.8, color: C.dim, whiteSpace: "pre-wrap", maxHeight: 200, overflowY: "auto" }}>
                    {PASSAGE}
                  </div>
                )}
              </div>
            )}

            <div style={{ fontSize: 15, lineHeight: 1.75, color: C.text, whiteSpace: "pre-wrap", marginBottom: 22 }}>{q.text}</div>

            <div>
              {q.options.map((opt, i) => {
                const isSel = isReview ? answers[secIdx][qIdx] === i : selected === i;
                const isCorrect = i === q.answer;
                const isWrong = isSel && !isCorrect;
                let bg = C.bg, border = C.border, col = C.text;
                if (isReview && isCorrect) { bg = "rgba(62,207,122,.08)"; border = "rgba(62,207,122,.5)"; col = C.green; }
                else if (isReview && isWrong) { bg = "rgba(240,82,82,.08)"; border = "rgba(240,82,82,.4)"; col = C.red; }
                else if (isSel) { bg = "rgba(91,110,245,.1)"; border = C.accent; col = "#aab4ff"; }
                return (
                  <div key={i} onClick={() => !isReview && setSelected(i)}
                    style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 16px", borderRadius: 8, border: `1px solid ${border}`, background: bg, cursor: isReview ? "default" : "pointer", marginBottom: 8, color: col, transition: "all .12s" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#1a2040", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: C.mono, fontWeight: 700, flexShrink: 0 }}>{String.fromCharCode(65 + i)}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.6, flex: 1 }}>{opt}</div>
                    {isReview && isCorrect && <span style={{ color: C.green, fontSize: 15 }}>✓</span>}
                    {isReview && isWrong && <span style={{ color: C.red, fontSize: 15 }}>✗</span>}
                  </div>
                );
              })}
            </div>

            {isReview && (
              <div style={{ marginTop: 16, background: "rgba(62,207,122,.06)", border: "1px solid rgba(62,207,122,.2)", borderRadius: 8, padding: "14px 18px" }}>
                <div style={{ fontSize: 9, letterSpacing: 2, color: C.green, fontFamily: C.mono, marginBottom: 8 }}>EXPLANATION</div>
                <p style={{ fontSize: 13, color: "#80b898", lineHeight: 1.65, margin: 0 }}>{q.explanation}</p>
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22, alignItems: "center" }}>
              <button style={btn("ghost")} onClick={prev} disabled={qIdx === 0}>← Prev</button>
              <div style={{ display: "flex", gap: 10 }}>
                {!isReview && qIdx < total - 1 && <button style={btn("primary")} onClick={next}>Save & Next →</button>}
                {!isReview && qIdx === total - 1 && <button style={btn("primary")} onClick={next}>Review Answers →</button>}
                {isReview && qIdx < total - 1 && <button style={btn("ghost")} onClick={() => { setQIdx(i => i + 1); setSelected(answers[secIdx][qIdx + 1] ?? null); }}>Next →</button>}
                {isReview && qIdx === total - 1 && <button style={btn("danger")} onClick={submitSection}>Submit Section ✓</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── SECTION END ────────────────────────────────────────────────────
  if (screen === "secEnd") {
    const last = scores[scores.length - 1];
    const pct = Math.round(last.correct / last.total * 100);
    return (
      <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "Georgia, serif", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ ...card, maxWidth: 480, textAlign: "center" }}>
          <div style={badge(C.gold)}>SECTION COMPLETE</div>
          <h2 style={{ fontSize: 24, color: "#bcc4f0", fontWeight: 400, marginBottom: 4 }}>{last.name}</h2>
          <div style={{ fontSize: 60, fontFamily: C.mono, fontWeight: 700, color: pct >= 70 ? C.green : pct >= 50 ? C.gold : C.red, margin: "18px 0 6px" }}>{last.correct}/{last.total}</div>
          <p style={{ color: C.muted, marginBottom: 28 }}>{pct}% accuracy</p>
          <p style={{ fontSize: 13, color: C.muted, marginBottom: 28, lineHeight: 1.6 }}>Take a short break if needed. Continue when ready.</p>
          <button style={{ ...btn("primary"), padding: "13px 40px" }} onClick={nextSection}>Continue to Next Section →</button>
        </div>
      </div>
    );
  }

  // ─── RESULTS ─────────────────────────────────────────────────────────
  if (screen === "results") {
    const totalC = scores.reduce((a, b) => a + b.correct, 0);
    const totalQ = scores.reduce((a, b) => a + b.total, 0);
    const pct = Math.round(totalC / totalQ * 100);
    const band = pct >= 80 ? { label: "Excellent", color: C.green, range: "720–805" }
      : pct >= 65 ? { label: "Strong", color: C.accent, range: "650–715" }
      : pct >= 50 ? { label: "Moderate", color: C.gold, range: "560–645" }
      : { label: "Needs Work", color: C.red, range: "Below 560" };
    return (
      <div style={{ minHeight: "100vh", background: C.bg, color: C.text, fontFamily: "Georgia, serif" }}>
        <div style={header}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: C.accent, fontFamily: C.mono }}>GMAT FOCUS EDITION</div>
          <div style={{ fontSize: 11, color: C.muted, fontFamily: C.mono }}>SCORE REPORT</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: "36px 24px" }}>
          <div style={{ ...card, maxWidth: 660 }}>
            <div style={badge(band.color)}>MOCK TEST COMPLETE</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 24, color: "#bcc4f0", fontWeight: 400, marginBottom: 4 }}>Your Results</h2>
                <p style={{ fontSize: 13, color: C.muted }}>GMAT Focus Edition Mock · 30 Questions</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 52, color: band.color, fontFamily: C.mono, fontWeight: 700, lineHeight: 1 }}>{totalC}/{totalQ}</div>
                <div style={{ fontSize: 13, color: band.color, marginTop: 4 }}>{pct}% · {band.label}</div>
              </div>
            </div>
            <div style={{ ...infoBox, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, borderColor: band.color + "44" }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: 2, color: band.color, fontFamily: C.mono, marginBottom: 4 }}>ESTIMATED SCORE BAND</div>
                <div style={{ fontSize: 22, color: C.text, fontWeight: 600 }}>{band.range}</div>
              </div>
              <div style={{ fontSize: 12, color: C.muted, textAlign: "right", maxWidth: 220, lineHeight: 1.5 }}>
                Based on raw accuracy. Actual GMAT uses adaptive scoring algorithms.
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12, marginBottom: 22 }}>
              {scores.map((s, i) => {
                const p = Math.round(s.correct / s.total * 100);
                const col = p >= 70 ? C.green : p >= 50 ? C.gold : C.red;
                return (
                  <div key={i} style={{ background: col + "0d", border: `1px solid ${col}33`, borderRadius: 10, padding: "18px", textAlign: "center" }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: C.muted, fontFamily: C.mono, marginBottom: 8 }}>{s.abbr}</div>
                    <div style={{ fontSize: 30, fontWeight: 700, color: col, fontFamily: C.mono }}>{s.correct}/{s.total}</div>
                    <div style={{ fontSize: 11, color: C.muted, marginTop: 4 }}>{p}%</div>
                  </div>
                );
              })}
            </div>
            <div style={{ ...infoBox, marginBottom: 22 }}>
              <div style={{ fontSize: 9, letterSpacing: 2, color: C.muted, fontFamily: C.mono, marginBottom: 12 }}>RECOMMENDED NEXT STEPS</div>
              {[
                pct < 60 && "Focus on fundamentals: algebra, number properties, and argument structure.",
                scores[0] && scores[0].correct / scores[0].total < 0.6 && "Quant: Review Data Sufficiency strategy — use systematic elimination of answer choices.",
                scores[1] && scores[1].correct / scores[1].total < 0.6 && "Verbal: Practice identifying the conclusion and evidence in Critical Reasoning prompts.",
                scores[2] && scores[2].correct / scores[2].total < 0.6 && "Data Insights: Study Two-Part Analysis frameworks and bar/line chart interpretation.",
                "Take 3–5 full-length timed practice tests before your exam date.",
                "Review the Official GMAT Guide and use GMAC's official online practice tools."
              ].filter(Boolean).map((tip, i) => (
                <div key={i} style={{ fontSize: 12, color: C.dim, padding: "7px 0", borderBottom: `1px solid ${C.border}`, lineHeight: 1.55 }}>→ {tip}</div>
              ))}
            </div>
            <button style={{ ...btn("primary"), width: "100%", textAlign: "center" }} onClick={restart}>Retake Test</button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}