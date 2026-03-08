import { useState, useEffect, useRef } from "react";

const GRE_PASSAGE = `The relationship between consciousness and the physical brain remains one of philosophy's most enduring puzzles, often called the "hard problem of consciousness." While neuroscience has made remarkable progress in mapping neural correlates of conscious experiences — identifying which brain regions activate during particular mental states — critics argue that this correlation fails to explain why any physical process gives rise to subjective experience at all.

Philosopher David Chalmers distinguishes between "easy problems" of consciousness — explaining cognitive functions like attention, memory, and behavioral integration — and the hard problem: explaining why there is "something it is like" to have these experiences. Even a complete neural map of the brain processing a red apple would not, Chalmers argues, explain why the experience of redness feels the way it does.

Physicalists counter that the hard problem will dissolve as neuroscience matures, just as vitalism — the belief that living organisms require a non-physical "life force" — was abandoned once biochemistry explained biological processes. Others propose "mysterian" positions, arguing that human cognitive faculties may simply be insufficient to solve the problem, much as a dog cannot understand calculus not because calculus is supernatural but because dog cognition has inherent limits.`;

const GRE_SECTIONS = [
  {
    id: "verbal", name: "Verbal Reasoning", abbr: "VR", duration: 18 * 60,
    questions: [
      { type: "TC", text: "Despite her reputation for _______ decision-making, the CEO surprised her board by reversing a decade-long company policy within a single afternoon.", options: ["impulsive", "deliberate", "erratic", "cautious", "transparent"], answer: 3, explanation: "The sentence contrasts her reputation ('Despite') with surprisingly quick action. 'Cautious' (careful, deliberate) creates the strongest contrast with reversing a policy so swiftly." },
      { type: "TC", text: "The historian's latest monograph, far from being the _______ treatment many reviewers had anticipated, proved to be a deeply nuanced and comprehensive examination.", options: ["exhaustive", "superficial", "authoritative", "critical", "revisionist"], answer: 1, explanation: "'Far from being... proved to be comprehensive' signals a contrast. 'Superficial' (shallow) directly contrasts with 'comprehensive' — the low-quality treatment reviewers feared but did not find." },
      { type: "TC", text: "The scientist's initial findings were so _______ that she repeated the experiments multiple times before submitting her paper for peer review.", options: ["confirmatory", "counterintuitive", "preliminary", "exhaustive", "redundant"], answer: 1, explanation: "Repeating experiments many times before submitting implies the results were surprising or hard to believe. 'Counterintuitive' best explains why she felt compelled to verify so thoroughly." },
      { type: "TC", text: "The committee's plan, though technically _______, was ultimately rejected because it failed to account for the political realities that would determine its implementation.", options: ["ambitious", "sound", "innovative", "comprehensive", "controversial"], answer: 1, explanation: "Rejected not for technical but political reasons — the plan was technically fine ('sound') but practically unworkable. 'Sound' fits something correct in design but flawed in application." },
      { type: "SE", text: "Once a vibrant trading hub, the town had become entirely _______ after the new railway bypassed it, leaving its merchants without customers and its streets without life.", options: ["prosperous", "moribund", "cosmopolitan", "desolate", "industrious", "antiquated"], answer: 3, explanation: "'Desolate' (bleak, deserted) captures the emptiness described. In the real GRE, 'moribund' (in terminal decline) is the paired correct answer — both convey abandonment and decay." },
      { type: "SE", text: "The delegate's speech was so _______ that even sympathetic audience members grew frustrated by its lack of concrete proposals or actionable recommendations.", options: ["incisive", "prolix", "laconic", "verbose", "eloquent", "decisive"], answer: 1, explanation: "'Prolix' means excessively long-winded. In the real GRE, 'verbose' is the paired correct answer — both mean tediously wordy, explaining the audience's frustration at the lack of substance." },
      { type: "RC", passage: true, text: "The primary purpose of the passage is to:", options: ["Argue that physicalism is the most defensible theory of consciousness.", "Present the hard problem of consciousness and describe several philosophical responses to it.", "Summarize David Chalmers' contributions to philosophy of mind.", "Demonstrate that neuroscience has made no meaningful progress on consciousness.", "Advocate for a mysterian position as the most intellectually honest approach."], answer: 1, explanation: "The passage introduces the hard problem, explains Chalmers' framework, then presents physicalist and mysterian responses — a balanced survey of the debate, not an argument for any single view." },
      { type: "RC", passage: true, text: "Chalmers' distinction between 'easy problems' and the 'hard problem' suggests that:", options: ["Neuroscience will eventually provide complete answers to all questions about consciousness.", "Explaining how the brain performs cognitive functions does not explain why subjective experience exists.", "The experience of redness is uniquely complex among all sensory experiences.", "Cognitive functions like attention and memory are unrelated to conscious experience.", "The hard problem is simply a more difficult version of the easy problems."], answer: 1, explanation: "Chalmers argues that even fully mapping cognitive functions leaves open why any of this produces subjective experience — the two categories differ in kind, not just degree of difficulty." },
      { type: "RC", passage: true, text: "The analogy to vitalism in the passage is used to support which claim?", options: ["Mysterianism offers the most compelling account of consciousness.", "The hard problem may be unsolvable given inherent limits of human cognition.", "Physicalists believe the hard problem will be resolved as neuroscience advances.", "Chalmers' framework is equivalent to older dualist philosophies.", "Neuroscience has already resolved many central aspects of the hard problem."], answer: 2, explanation: "The vitalism analogy supports physicalist optimism: just as a 'life force' became unnecessary once biochemistry matured, they believe the hard problem will dissolve as neuroscience develops." },
      { type: "RC", passage: true, text: "The author's attitude toward the hard problem of consciousness is best described as:", options: ["Dismissive — suggesting the problem is a philosophical confusion rather than a genuine puzzle.", "Partisan — clearly advocating for the mysterian position over physicalism.", "Neutral — presenting the problem and various responses without endorsing any view.", "Pessimistic — implying that no meaningful progress has been made on the problem.", "Optimistic — suggesting physicalism will ultimately provide a satisfactory solution."], answer: 2, explanation: "The author presents the hard problem, Chalmers' framework, and three distinct positions without indicating which is correct — a neutral, balanced, informational tone throughout." },
    ]
  },
  {
    id: "quant", name: "Quantitative Reasoning", abbr: "QR", duration: 21 * 60,
    questions: [
      { type: "QC", text: "x > 1\n\nQuantity A: x²\nQuantity B: x³", options: ["Quantity A is greater", "Quantity B is greater", "The two quantities are equal", "The relationship cannot be determined"], answer: 1, explanation: "Since x > 1, multiplying x² by x (which exceeds 1) yields x³ > x². For example, x=2 gives QA=4, QB=8. Quantity B is always greater when x > 1." },
      { type: "QC", text: "0 < x < 1\n\nQuantity A: x\nQuantity B: x²", options: ["Quantity A is greater", "Quantity B is greater", "The two quantities are equal", "The relationship cannot be determined"], answer: 0, explanation: "When 0 < x < 1, squaring a fraction makes it smaller. For x=0.5: QA=0.5, QB=0.25. So x > x² for all x in (0,1). Quantity A is always greater." },
      { type: "QC", text: "A jar contains 4 red, 3 blue, and 5 green marbles.\n\nQuantity A: Probability of selecting a red or blue marble\nQuantity B: Probability of selecting a green marble", options: ["Quantity A is greater", "Quantity B is greater", "The two quantities are equal", "The relationship cannot be determined"], answer: 0, explanation: "Total = 12 marbles. P(red or blue) = 7/12 ≈ 0.583. P(green) = 5/12 ≈ 0.417. Quantity A (7/12) > Quantity B (5/12)." },
      { type: "QC", text: "The average of five consecutive even integers is 14.\n\nQuantity A: The largest of the five integers\nQuantity B: 18", options: ["Quantity A is greater", "Quantity B is greater", "The two quantities are equal", "The relationship cannot be determined"], answer: 2, explanation: "The middle (3rd) of 5 consecutive even integers equals the average = 14. Sequence: 10, 12, 14, 16, 18. Largest = 18 = Quantity B. The two quantities are equal." },
      { type: "QC", text: "n is a positive integer\n\nQuantity A: The remainder when 6n is divided by 9\nQuantity B: The remainder when 6n + 3 is divided by 9", options: ["Quantity A is greater", "Quantity B is greater", "The two quantities are equal", "The relationship cannot be determined"], answer: 3, explanation: "n=1: 6÷9 rem 6, 9÷9 rem 0 → A greater. n=3: 18÷9 rem 0, 21÷9 rem 3 → B greater. The relationship cannot be determined." },
      { type: "MC", text: "A rectangular garden is 3 times as long as it is wide. If its perimeter is 96 meters, what is the area of the garden in square meters?", options: ["144", "216", "432", "576", "648"], answer: 2, explanation: "Let width = w, length = 3w. Perimeter = 2(w + 3w) = 8w = 96, so w = 12 m and length = 36 m. Area = 12 × 36 = 432 m²." },
      { type: "MC", text: "A store reduces a jacket's price by 20%, then reduces the new price by 25%. What is the overall percentage decrease from the original price?", options: ["40%", "42%", "44%", "45%", "50%"], answer: 0, explanation: "After 20% off: price = 0.80P. After 25% off that: 0.75 × 0.80P = 0.60P. Overall decrease = 1 − 0.60 = 40%." },
      { type: "MC", text: "In a class of 40 students, 60% passed math and 70% passed English. If 10% failed both exams, what percentage passed both?", options: ["25%", "30%", "35%", "40%", "45%"], answer: 3, explanation: "P(passed at least one) = 100% − 10% = 90%. By inclusion-exclusion: P(both) = 60% + 70% − 90% = 40%." },
      { type: "MC", text: "If 2^(x+1) = 32, what is the value of x?", options: ["3", "4", "5", "6", "7"], answer: 1, explanation: "32 = 2⁵, so 2^(x+1) = 2⁵ → x + 1 = 5 → x = 4." },
      { type: "MC", text: "A circle has circumference 20π cm. What is its area in square centimeters?", options: ["100π", "200π", "400π", "100", "400"], answer: 0, explanation: "Circumference = 2πr = 20π → r = 10 cm. Area = πr² = π × 100 = 100π cm²." },
    ]
  }
];

const GRE_TYPE_LABELS = { TC: "Text Completion", SE: "Sentence Equivalence", RC: "Reading Comprehension", QC: "Quantitative Comparison", MC: "Multiple Choice" };

function fmt(sec) {
  const m = Math.floor(sec / 60), s = sec % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

const G = {
  bg: "#0a0f14", surface: "#111921", border: "#1a2d3a", accent: "#14b8a6",
  gold: "#f59e0b", green: "#10b981", red: "#ef4444", muted: "#3d5a6e",
  text: "#d0e8e4", dim: "#7baab0", mono: "'Courier New', monospace"
};

export default function GREMock() {
  const [screen, setScreen] = useState("welcome");
  const [secIdx, setSecIdx] = useState(0);
  const [qIdx, setQIdx] = useState(0);
  const [answers, setAnswers] = useState([{}, {}]);
  const [flagged, setFlagged] = useState([{}, {}]);
  const [selected, setSelected] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [warn, setWarn] = useState(false);
  const [showPassage, setShowPassage] = useState(false);
  const [scores, setScores] = useState([]);
  const [isReview, setIsReview] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);

  const timerRef = useRef(null);
  const secIdxRef = useRef(secIdx);
  const answersRef = useRef(answers);
  secIdxRef.current = secIdx;
  answersRef.current = answers;

  const sec = GRE_SECTIONS[secIdx];
  const q = sec.questions[qIdx];
  const total = sec.questions.length;

  const finishSection = (si, ans) => {
    const s = GRE_SECTIONS[si];
    const correct = s.questions.filter((q, i) => ans[si][i] === q.answer).length;
    setScores(prev => [...prev, { name: s.name, abbr: s.abbr, correct, total: s.questions.length }]);
    setIsReview(false);
    if (si < GRE_SECTIONS.length - 1) setScreen("secEnd");
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
        if (next <= 0) { clearInterval(timerRef.current); finishSection(secIdxRef.current, answersRef.current); return 0; }
        return next;
      });
    }, 1000);
  };

  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const startSection = () => {
    setQIdx(0); setSelected(answers[secIdx][0] ?? null); setIsReview(false); setShowFeedback(false); setShowPassage(false);
    startTimer(sec.duration); setScreen("exam");
  };

  const saveAnswer = (si, qi, val) => {
    setAnswers(prev => { const next = prev.map(s => ({ ...s })); next[si][qi] = val; return next; });
  };

  const navTo = (i) => { if (selected !== null) saveAnswer(secIdx, qIdx, selected); setShowFeedback(false); setQIdx(i); setSelected(answers[secIdx][i] ?? null); };

  const submitAnswer = () => {
    if (selected !== null) saveAnswer(secIdx, qIdx, selected);
    setShowFeedback(true);
  };

  const continueNext = () => {
    setShowFeedback(false);
    if (qIdx < total - 1) { const ni = qIdx + 1; setQIdx(ni); setSelected(answers[secIdx][ni] ?? null); }
    else setIsReview(true);
  };

  const prev = () => {
    if (qIdx > 0) { if (selected !== null) saveAnswer(secIdx, qIdx, selected); setShowFeedback(false); const pi = qIdx - 1; setQIdx(pi); setSelected(answers[secIdx][pi] ?? null); }
  };

  const submitSection = () => { if (selected !== null) saveAnswer(secIdx, qIdx, selected); clearInterval(timerRef.current); finishSection(secIdx, answersRef.current); };

  const nextSection = () => { const ni = secIdx + 1; setSecIdx(ni); setQIdx(0); setSelected(null); setScreen("secIntro"); };

  const toggleFlag = () => {
    setFlagged(prev => { const next = prev.map(s => ({ ...s })); next[secIdx][qIdx] = !next[secIdx][qIdx]; return next; });
  };

  const restart = () => { setScreen("welcome"); setSecIdx(0); setQIdx(0); setAnswers([{}, {}]); setFlagged([{}, {}]); setSelected(null); setScores([]); setIsReview(false); setShowFeedback(false); };

  const answered = Object.keys(answers[secIdx]).length;
  const flagCount = Object.values(flagged[secIdx]).filter(Boolean).length;

  const card = { background: G.surface, border: `1px solid ${G.border}`, borderRadius: 12, padding: "36px 44px", maxWidth: 720, width: "100%" };
  const btn = (variant) => {
    const base = { padding: "11px 28px", borderRadius: 6, border: "none", cursor: "pointer", fontSize: 13, fontWeight: 600, fontFamily: "Georgia, serif", letterSpacing: "0.8px", transition: "opacity .15s" };
    if (variant === "primary") return { ...base, background: G.accent, color: "#fff", boxShadow: "0 4px 16px rgba(20,184,166,.3)" };
    if (variant === "ghost") return { ...base, background: "transparent", color: G.dim, border: `1px solid ${G.border}` };
    if (variant === "danger") return { ...base, background: "rgba(239,68,68,.12)", color: "#f87171", border: "1px solid rgba(239,68,68,.3)" };
    return base;
  };
  const badge = (col) => ({ display: "inline-block", padding: "2px 10px", borderRadius: 4, fontSize: 10, letterSpacing: 2, fontFamily: G.mono, fontWeight: 700, background: col + "22", color: col, border: `1px solid ${col}44`, marginBottom: 14 });
  const hdr = { background: "#060c10", borderBottom: `1px solid ${G.border}`, padding: "11px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", position: "sticky", top: 0, zIndex: 100 };
  const infoBox = { background: "#060c10", border: `1px solid ${G.border}`, borderRadius: 8, padding: "14px 18px" };

  // ─── WELCOME ───────────────────────────────────────────────────────────
  if (screen === "welcome") return (
    <div style={{ minHeight: "100vh", background: G.bg, color: G.text, fontFamily: "Georgia, serif", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ ...card, maxWidth: 640, textAlign: "center" }}>
        <div style={{ fontSize: 10, letterSpacing: 3, color: G.accent, fontFamily: G.mono, marginBottom: 16 }}>GRADUATE RECORD EXAMINATIONS</div>
        <h1 style={{ fontSize: 34, color: "#b0d8d4", fontWeight: 400, marginBottom: 6 }}>GRE General Test</h1>
        <p style={{ color: G.muted, fontSize: 13, marginBottom: 32 }}>Official Mock Test · 20 Questions · ~39 Minutes</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
          {GRE_SECTIONS.map(s => (
            <div key={s.id} style={{ ...infoBox, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ textAlign: "left" }}>
                <div style={{ fontSize: 10, color: G.muted, letterSpacing: 2, fontFamily: G.mono, marginBottom: 4 }}>{s.abbr}</div>
                <div style={{ fontSize: 15, color: G.text }}>{s.name}</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 24, color: G.accent, fontFamily: G.mono, fontWeight: 700 }}>{s.questions.length}</div>
                <div style={{ fontSize: 11, color: G.muted }}>{Math.floor(s.duration / 60)} min</div>
              </div>
            </div>
          ))}
        </div>
        <button style={btn("primary")} onClick={() => setScreen("instructions")}>Read Instructions →</button>
      </div>
    </div>
  );

  // ─── INSTRUCTIONS ──────────────────────────────────────────────────────
  if (screen === "instructions") return (
    <div style={{ minHeight: "100vh", background: G.bg, color: G.text, fontFamily: "Georgia, serif" }}>
      <div style={hdr}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: G.accent, fontFamily: G.mono }}>GRE GENERAL TEST</div>
        <div style={{ fontSize: 11, color: G.muted, fontFamily: G.mono }}>OFFICIAL MOCK TEST</div>
      </div>
      <div style={{ display: "flex", justifyContent: "center", padding: "36px 24px" }}>
        <div style={{ ...card, maxWidth: 680 }}>
          <div style={badge(G.gold)}>EXAM INSTRUCTIONS</div>
          <h2 style={{ fontSize: 22, color: "#b0d8d4", fontWeight: 400, marginBottom: 20 }}>Before You Begin</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px" }}>
            {[
              ["⏱", "Each section is timed independently. The countdown begins when you click Start Section."],
              ["🔒", "You cannot return to a previous section once it is submitted."],
              ["➡️", "Navigate between questions using the progress dots in the sidebar."],
              ["🚩", "Flag questions for review before submitting a section."],
              ["⚠️", "Timer turns red when 5 minutes remain."],
              ["📝", "Sentence Equivalence questions have two correct answers on the real GRE. This mock accepts the best single answer."],
              ["🎯", "GRE scores range from 130–170 per section (260–340 total). This mock reports raw accuracy per section."],
            ].map(([icon, text], i) => (
              <li key={i} style={{ padding: "9px 0", borderBottom: `1px solid ${G.border}`, fontSize: 13, color: G.dim, display: "flex", gap: 10, lineHeight: 1.55 }}>
                <span>{icon}</span><span>{text}</span>
              </li>
            ))}
          </ul>
          <div style={{ ...infoBox, marginBottom: 24, background: "rgba(20,184,166,.06)" }}>
            <div style={{ fontSize: 10, letterSpacing: 2, color: G.accent, fontFamily: G.mono, marginBottom: 10 }}>QUANTITATIVE COMPARISON — ANSWER KEY</div>
            {[["A","Quantity A is greater"],["B","Quantity B is greater"],["C","The two quantities are equal"],["D","The relationship cannot be determined"]].map(([l, t]) => (
              <div key={l} style={{ fontSize: 13, color: G.dim, padding: "3px 0" }}><b style={{ color: G.text }}>{l}</b> — {t}</div>
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

  // ─── SECTION INTRO ─────────────────────────────────────────────────────
  if (screen === "secIntro") return (
    <div style={{ minHeight: "100vh", background: G.bg, color: G.text, fontFamily: "Georgia, serif", display: "flex", flexDirection: "column" }}>
      <div style={hdr}>
        <div style={{ fontSize: 11, letterSpacing: 3, color: G.accent, fontFamily: G.mono }}>GRE GENERAL TEST</div>
        <div style={{ fontSize: 11, color: G.muted, fontFamily: G.mono }}>SECTION {secIdx + 1} OF 2</div>
      </div>
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ ...card, maxWidth: 500, textAlign: "center" }}>
          <div style={badge(G.accent)}>NEXT SECTION</div>
          <h2 style={{ fontSize: 28, color: "#b0d8d4", fontWeight: 400, marginBottom: 6 }}>{sec.name}</h2>
          <p style={{ color: G.muted, fontSize: 13, marginBottom: 28 }}>Section {secIdx + 1} of {GRE_SECTIONS.length}</p>
          <div style={{ display: "flex", justifyContent: "center", gap: 36, marginBottom: 28 }}>
            <div><div style={{ fontSize: 44, color: G.accent, fontFamily: G.mono, fontWeight: 700 }}>{sec.questions.length}</div><div style={{ fontSize: 11, color: G.muted }}>QUESTIONS</div></div>
            <div style={{ width: 1, background: G.border }} />
            <div><div style={{ fontSize: 44, color: G.gold, fontFamily: G.mono, fontWeight: 700 }}>{Math.floor(sec.duration / 60)}</div><div style={{ fontSize: 11, color: G.muted }}>MINUTES</div></div>
          </div>
          <p style={{ fontSize: 13, color: G.muted, marginBottom: 28, lineHeight: 1.6 }}>
            {secIdx === 0 && "Text Completion, Sentence Equivalence, and Reading Comprehension — vocabulary in context and analytical reasoning."}
            {secIdx === 1 && "Quantitative Comparison and Multiple Choice — arithmetic, algebra, geometry, and data analysis."}
          </p>
          <button style={{ ...btn("primary"), padding: "13px 40px", fontSize: 14 }} onClick={startSection}>Start Section →</button>
        </div>
      </div>
    </div>
  );

  // ─── EXAM / REVIEW ─────────────────────────────────────────────────────
  if (screen === "exam") {
    const dotState = (i) => {
      if (i === qIdx) return "current";
      if (flagged[secIdx][i]) return "flagged";
      if (answers[secIdx][i] !== undefined) return "done";
      return "empty";
    };
    const dotStyle = (state) => {
      const bg = state === "current" ? G.accent : state === "flagged" ? G.gold : state === "done" ? "#1e3d50" : G.border;
      return { width: 18, height: 18, borderRadius: 3, background: bg, cursor: "pointer", border: state === "current" ? `2px solid ${G.accent}` : "none", boxSizing: "border-box", flexShrink: 0 };
    };
    return (
      <div style={{ minHeight: "100vh", background: G.bg, color: G.text, fontFamily: "Georgia, serif", display: "flex", flexDirection: "column" }}>
        <div style={hdr}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{ fontSize: 11, letterSpacing: 3, color: G.accent, fontFamily: G.mono }}>GRE</div>
            <div style={{ fontSize: 11, color: G.muted, fontFamily: G.mono }}>{sec.abbr} · Q{qIdx + 1}/{total}</div>
            <div style={{ ...badge(G.muted), marginBottom: 0, fontSize: 9 }}>{GRE_TYPE_LABELS[q.type]}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {isReview
              ? <div style={{ fontSize: 11, color: G.gold, fontFamily: G.mono, letterSpacing: 2 }}>REVIEW MODE</div>
              : <div style={{ fontFamily: G.mono, fontSize: 20, fontWeight: 700, color: warn ? G.red : G.gold, padding: "4px 14px", background: warn ? "rgba(239,68,68,.1)" : "rgba(245,158,11,.08)", borderRadius: 6, border: `1px solid ${warn ? "rgba(239,68,68,.3)" : "rgba(245,158,11,.3)"}` }}>{fmt(timeLeft)}</div>
            }
          </div>
        </div>
        <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
          <div style={{ width: 172, background: "#060c10", borderRight: `1px solid ${G.border}`, padding: "18px 14px", display: "flex", flexDirection: "column", gap: 14, flexShrink: 0 }}>
            <div style={{ fontSize: 9, letterSpacing: 2, color: G.muted, fontFamily: G.mono }}>QUESTIONS</div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
              {sec.questions.map((_, i) => <div key={i} style={dotStyle(dotState(i))} onClick={() => navTo(i)} title={`Q${i + 1}`} />)}
            </div>
            <div style={{ fontSize: 11, color: G.muted, lineHeight: 1.9 }}>
              <div style={{ color: "#2e8a70" }}>■ {answered} answered</div>
              <div style={{ color: G.gold }}>■ {flagCount} flagged</div>
              <div>□ {total - answered} remaining</div>
            </div>
            <button style={{ ...btn("ghost"), padding: "7px 10px", fontSize: 11, marginTop: "auto", textAlign: "center" }} onClick={toggleFlag}>
              {flagged[secIdx][qIdx] ? "🚩 Unflag" : "🏳 Flag Q"}
            </button>
          </div>
          <div style={{ flex: 1, overflowY: "auto", padding: "26px 30px" }}>
            {q.passage && (
              <div style={{ marginBottom: 16 }}>
                <button style={{ ...btn("ghost"), padding: "5px 14px", fontSize: 11 }} onClick={() => setShowPassage(v => !v)}>
                  {showPassage ? "Hide Passage ▲" : "Show Passage ▼"}
                </button>
                {showPassage && (
                  <div style={{ marginTop: 10, background: "#060a0e", border: `1px solid ${G.border}`, borderRadius: 8, padding: "18px 22px", fontSize: 13, lineHeight: 1.8, color: G.dim, whiteSpace: "pre-wrap", maxHeight: 200, overflowY: "auto" }}>
                    {GRE_PASSAGE}
                  </div>
                )}
              </div>
            )}
            <div style={{ fontSize: 15, lineHeight: 1.75, color: G.text, whiteSpace: "pre-wrap", marginBottom: 22 }}>{q.text}</div>
            <div>
              {q.options.map((opt, i) => {
                const isSel = (isReview || showFeedback) ? answers[secIdx][qIdx] === i : selected === i;
                const isCorrect = i === q.answer;
                const isWrong = isSel && !isCorrect;
                let bg = G.bg, border = G.border, col = G.text;
                if ((isReview || showFeedback) && isCorrect) { bg = "rgba(16,185,129,.08)"; border = "rgba(16,185,129,.5)"; col = G.green; }
                else if ((isReview || showFeedback) && isWrong) { bg = "rgba(239,68,68,.08)"; border = "rgba(239,68,68,.4)"; col = G.red; }
                else if (isSel) { bg = "rgba(20,184,166,.1)"; border = G.accent; col = "#7eeee8"; }
                return (
                  <div key={i} onClick={() => !isReview && !showFeedback && setSelected(i)}
                    style={{ display: "flex", alignItems: "flex-start", gap: 12, padding: "13px 16px", borderRadius: 8, border: `1px solid ${border}`, background: bg, cursor: (isReview || showFeedback) ? "default" : "pointer", marginBottom: 8, color: col, transition: "all .12s" }}>
                    <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#0e2030", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontFamily: G.mono, fontWeight: 700, flexShrink: 0 }}>{String.fromCharCode(65 + i)}</div>
                    <div style={{ fontSize: 13, lineHeight: 1.6, flex: 1 }}>{opt}</div>
                    {(isReview || showFeedback) && isCorrect && <span style={{ color: G.green, fontSize: 15 }}>✓</span>}
                    {(isReview || showFeedback) && isWrong && <span style={{ color: G.red, fontSize: 15 }}>✗</span>}
                  </div>
                );
              })}
            </div>
            {(isReview || showFeedback) && (
              <div style={{ marginTop: 16, background: showFeedback && selected !== q.answer ? "rgba(239,68,68,.06)" : "rgba(16,185,129,.06)", border: `1px solid ${showFeedback && selected !== q.answer ? "rgba(239,68,68,.2)" : "rgba(16,185,129,.2)"}`, borderRadius: 8, padding: "14px 18px" }}>
                {showFeedback && (
                  <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: 1, color: selected === q.answer ? G.green : G.red, fontFamily: G.mono, marginBottom: 6 }}>
                    {selected === q.answer ? "✓ CORRECT" : "✗ INCORRECT"}
                  </div>
                )}
                <div style={{ fontSize: 9, letterSpacing: 2, color: G.green, fontFamily: G.mono, marginBottom: 8 }}>EXPLANATION</div>
                <p style={{ fontSize: 13, color: "#6ab898", lineHeight: 1.65, margin: 0 }}>{q.explanation}</p>
              </div>
            )}
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22, alignItems: "center" }}>
              <button style={btn("ghost")} onClick={prev} disabled={qIdx === 0 || showFeedback}>← Prev</button>
              <div style={{ display: "flex", gap: 10 }}>
                {!isReview && !showFeedback && <button style={{ ...btn("primary"), opacity: selected === null ? 0.45 : 1 }} onClick={submitAnswer} disabled={selected === null}>Submit Answer →</button>}
                {!isReview && showFeedback && qIdx < total - 1 && <button style={btn("primary")} onClick={continueNext}>Next Question →</button>}
                {!isReview && showFeedback && qIdx === total - 1 && <button style={btn("primary")} onClick={continueNext}>Review Answers →</button>}
                {isReview && qIdx < total - 1 && <button style={btn("ghost")} onClick={() => { setQIdx(i => i + 1); setSelected(answers[secIdx][qIdx + 1] ?? null); }}>Next →</button>}
                {isReview && qIdx === total - 1 && <button style={btn("danger")} onClick={submitSection}>Submit Section ✓</button>}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // ─── SECTION END ───────────────────────────────────────────────────────
  if (screen === "secEnd") {
    const last = scores[scores.length - 1];
    const pct = Math.round(last.correct / last.total * 100);
    return (
      <div style={{ minHeight: "100vh", background: G.bg, color: G.text, fontFamily: "Georgia, serif", display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
        <div style={{ ...card, maxWidth: 480, textAlign: "center" }}>
          <div style={badge(G.gold)}>SECTION COMPLETE</div>
          <h2 style={{ fontSize: 24, color: "#b0d8d4", fontWeight: 400, marginBottom: 4 }}>{last.name}</h2>
          <div style={{ fontSize: 60, fontFamily: G.mono, fontWeight: 700, color: pct >= 70 ? G.green : pct >= 50 ? G.gold : G.red, margin: "18px 0 6px" }}>{last.correct}/{last.total}</div>
          <p style={{ color: G.muted, marginBottom: 28 }}>{pct}% accuracy</p>
          <p style={{ fontSize: 13, color: G.muted, marginBottom: 28, lineHeight: 1.6 }}>Take a short break if needed. Continue when ready.</p>
          <button style={{ ...btn("primary"), padding: "13px 40px" }} onClick={nextSection}>Continue to Next Section →</button>
        </div>
      </div>
    );
  }

  // ─── RESULTS ───────────────────────────────────────────────────────────
  if (screen === "results") {
    const totalC = scores.reduce((a, b) => a + b.correct, 0);
    const totalQ = scores.reduce((a, b) => a + b.total, 0);
    const pct = Math.round(totalC / totalQ * 100);
    const band = pct >= 80 ? { label: "Excellent", color: G.green, range: "165–170 per section" }
      : pct >= 65 ? { label: "Strong", color: G.accent, range: "155–164 per section" }
      : pct >= 50 ? { label: "Moderate", color: G.gold, range: "145–154 per section" }
      : { label: "Needs Work", color: G.red, range: "Below 145 per section" };
    return (
      <div style={{ minHeight: "100vh", background: G.bg, color: G.text, fontFamily: "Georgia, serif" }}>
        <div style={hdr}>
          <div style={{ fontSize: 11, letterSpacing: 3, color: G.accent, fontFamily: G.mono }}>GRE GENERAL TEST</div>
          <div style={{ fontSize: 11, color: G.muted, fontFamily: G.mono }}>SCORE REPORT</div>
        </div>
        <div style={{ display: "flex", justifyContent: "center", padding: "36px 24px" }}>
          <div style={{ ...card, maxWidth: 660 }}>
            <div style={badge(band.color)}>MOCK TEST COMPLETE</div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
              <div>
                <h2 style={{ fontSize: 24, color: "#b0d8d4", fontWeight: 400, marginBottom: 4 }}>Your Results</h2>
                <p style={{ fontSize: 13, color: G.muted }}>GRE General Test Mock · 20 Questions</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontSize: 52, color: band.color, fontFamily: G.mono, fontWeight: 700, lineHeight: 1 }}>{totalC}/{totalQ}</div>
                <div style={{ fontSize: 13, color: band.color, marginTop: 4 }}>{pct}% · {band.label}</div>
              </div>
            </div>
            <div style={{ ...infoBox, display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20, borderColor: band.color + "44" }}>
              <div>
                <div style={{ fontSize: 9, letterSpacing: 2, color: band.color, fontFamily: G.mono, marginBottom: 4 }}>ESTIMATED SCORE BAND</div>
                <div style={{ fontSize: 22, color: G.text, fontWeight: 600 }}>{band.range}</div>
              </div>
              <div style={{ fontSize: 12, color: G.muted, textAlign: "right", maxWidth: 220, lineHeight: 1.5 }}>
                Based on raw accuracy. Actual GRE uses section-level adaptive scoring.
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 12, marginBottom: 22 }}>
              {scores.map((s, i) => {
                const p = Math.round(s.correct / s.total * 100);
                const col = p >= 70 ? G.green : p >= 50 ? G.gold : G.red;
                return (
                  <div key={i} style={{ background: col + "0d", border: `1px solid ${col}33`, borderRadius: 10, padding: "18px", textAlign: "center" }}>
                    <div style={{ fontSize: 9, letterSpacing: 2, color: G.muted, fontFamily: G.mono, marginBottom: 8 }}>{s.abbr}</div>
                    <div style={{ fontSize: 30, fontWeight: 700, color: col, fontFamily: G.mono }}>{s.correct}/{s.total}</div>
                    <div style={{ fontSize: 11, color: G.muted, marginTop: 4 }}>{p}%</div>
                  </div>
                );
              })}
            </div>
            <div style={{ ...infoBox, marginBottom: 22 }}>
              <div style={{ fontSize: 9, letterSpacing: 2, color: G.muted, fontFamily: G.mono, marginBottom: 12 }}>RECOMMENDED NEXT STEPS</div>
              {[
                pct < 60 && "Focus on vocabulary building and core quantitative skills — number properties and geometry.",
                scores[0] && scores[0].correct / scores[0].total < 0.6 && "Verbal: Use flashcards for GRE high-frequency vocabulary and practice Text Completion strategies.",
                scores[1] && scores[1].correct / scores[1].total < 0.6 && "Quant: Review Quantitative Comparison strategies — plug in numbers and test special cases (0, 1, fractions, negatives).",
                "Take full-length timed practice tests using ETS PowerPrep software.",
                "Review the Official GRE Super Power Pack from ETS for targeted section practice."
              ].filter(Boolean).map((tip, i) => (
                <div key={i} style={{ fontSize: 12, color: G.dim, padding: "7px 0", borderBottom: `1px solid ${G.border}`, lineHeight: 1.55 }}>→ {tip}</div>
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
