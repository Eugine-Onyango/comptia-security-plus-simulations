import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, 
  HelpCircle, AlertCircle, Sparkles, BookOpen, Shield, 
  Check, ArrowRight, Layers, Flame, Flag, Activity, Scale, FileText, Landmark
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';
import { DOMAIN5_PREPSET_QUESTIONS } from '../../data/domain5PrepSetQuestions';

export default function Domain5PrepSetMcq({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' or 'review'

  useEffect(() => {
    setQuestions(DOMAIN5_PREPSET_QUESTIONS);
  }, []);

  if (questions.length === 0) return null;

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx) => {
    if (isSubmitted) return;
    sounds.playPop();
    setSelectedOptionIdx(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOptionIdx === null || isSubmitted) return;
    setIsSubmitted(true);

    const isCorrect = currentQ.options[selectedOptionIdx].isCorrect;
    if (isCorrect) {
      sounds.playSuccess();
      setScore(prev => prev + 1);
    } else {
      sounds.playPop();
    }

    setUserAnswers(prev => [
      ...prev,
      {
        questionId: currentQ.id,
        question: currentQ.question,
        scenario: currentQ.scenario,
        subdomain: currentQ.subdomain,
        selectedOptionIdx: selectedOptionIdx,
        isCorrect: isCorrect,
        correctOption: currentQ.options.find(o => o.isCorrect),
        selectedOption: currentQ.options[selectedOptionIdx],
        distractors: currentQ.options.filter(o => !o.isCorrect),
        technicalRationale: currentQ.technicalRationale,
        kenyanMetaphor: currentQ.kenyanMetaphor
      }
    ]);
  };

  const handleNextQuestion = () => {
    sounds.playPop();
    if (currentIdx < questions.length - 1) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setIsSubmitted(false);
    } else {
      setShowResult(true);
      sounds.playComplete();
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    sounds.playPop();
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
    setActiveTab('quiz');
  };

  const scorePercentage = Math.round((score / questions.length) * 100);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 py-8 px-4 sm:px-6 lg:px-8 font-sans">
      {/* Header Bar */}
      <div className="max-w-5xl mx-auto mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-emerald-900/50 pb-5">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-emerald-800/40 text-emerald-300 hover:bg-emerald-950/60 hover:text-emerald-200 transition-all text-sm font-medium shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Dashboard
        </button>

        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
            <Scale className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-300 bg-clip-text text-transparent">
              CompTIA Security+ Domain 5.0 PrepSet
            </h1>
            <p className="text-xs text-emerald-400/80 font-mono">Governance, Risk, and Compliance • 50 Exam-Grade Questions</p>
          </div>
        </div>

        <div className="flex items-center gap-4 bg-slate-900/90 border border-emerald-900/60 rounded-xl px-4 py-2">
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Live Score</p>
            <p className="text-lg font-mono font-bold text-emerald-300">{score} / {questions.length}</p>
          </div>
          <div className="h-8 w-px bg-emerald-900/60" />
          <div className="text-right">
            <p className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">Progress</p>
            <p className="text-lg font-mono font-bold text-teal-300">
              {Math.min(currentIdx + 1, questions.length)} / {questions.length}
            </p>
          </div>
        </div>
      </div>

      {!showResult ? (
        /* Question Card */
        <div className="max-w-4xl mx-auto">
          {/* Progress bar */}
          <div className="w-full bg-slate-900 rounded-full h-2 mb-6 border border-emerald-950 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-emerald-500 via-teal-400 to-amber-400 h-2 rounded-full transition-all duration-300 shadow-[0_0_12px_rgba(16,185,129,0.5)]"
              style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
            />
          </div>

          <div className="bg-slate-900/90 border border-emerald-900/50 rounded-2xl p-6 sm:p-8 backdrop-blur-md shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            {/* Subdomain tag */}
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 border border-emerald-500/30 text-emerald-300">
                <Landmark className="w-3.5 h-3.5" />
                {currentQ.subdomain}
              </span>
              <span className="text-xs font-mono text-slate-400">
                Question {currentIdx + 1} of {questions.length}
              </span>
            </div>

            {/* Scenario Box */}
            <div className="mb-6 p-5 rounded-xl bg-slate-950/70 border border-emerald-900/40 text-slate-300 text-sm leading-relaxed relative">
              <div className="absolute -top-2.5 left-4 px-2 py-0.5 rounded text-[10px] font-bold tracking-widest uppercase bg-emerald-950 border border-emerald-800 text-emerald-300">
                Enterprise GRC Scenario
              </div>
              <p className="mt-1">{currentQ.scenario}</p>
            </div>

            {/* Question Prompt */}
            <h2 className="text-base sm:text-lg font-semibold text-slate-100 mb-6 leading-snug">
              {currentQ.question}
            </h2>

            {/* Options List */}
            <div className="space-y-3 mb-8">
              {currentQ.options.map((option, idx) => {
                let borderStyle = "border-slate-800 hover:border-emerald-700/60 bg-slate-950/50";
                let textStyle = "text-slate-200";
                let iconBadge = (
                  <div className="w-6 h-6 rounded-full border border-slate-700 flex items-center justify-center text-xs font-bold text-slate-400">
                    {String.fromCharCode(65 + idx)}
                  </div>
                );

                if (selectedOptionIdx === idx) {
                  borderStyle = "border-emerald-500 bg-emerald-950/30 shadow-[0_0_15px_rgba(16,185,129,0.2)]";
                  iconBadge = (
                    <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center text-xs font-bold">
                      {String.fromCharCode(65 + idx)}
                    </div>
                  );
                }

                if (isSubmitted) {
                  if (option.isCorrect) {
                    borderStyle = "border-emerald-500 bg-emerald-950/50 text-emerald-200";
                    iconBadge = (
                      <div className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 flex items-center justify-center">
                        <Check className="w-4 h-4 stroke-[3]" />
                      </div>
                    );
                  } else if (selectedOptionIdx === idx && !option.isCorrect) {
                    borderStyle = "border-rose-500 bg-rose-950/40 text-rose-200";
                    iconBadge = (
                      <div className="w-6 h-6 rounded-full bg-rose-500 text-white flex items-center justify-center">
                        <XCircle className="w-4 h-4" />
                      </div>
                    );
                  }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(idx)}
                    disabled={isSubmitted}
                    className={`w-full text-left p-4 rounded-xl border transition-all duration-200 flex items-start gap-4 ${borderStyle}`}
                  >
                    <div className="flex-shrink-0 mt-0.5">{iconBadge}</div>
                    <div className="flex-1 text-sm sm:text-base leading-relaxed">
                      <p className={textStyle}>{option.text}</p>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-800">
              {!isSubmitted ? (
                <button
                  onClick={handleSubmitAnswer}
                  disabled={selectedOptionIdx === null}
                  className="ml-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 disabled:opacity-40 disabled:cursor-not-allowed font-semibold text-sm text-white shadow-lg shadow-emerald-950 transition-all flex items-center gap-2"
                >
                  Confirm & Autopsy Answer <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleNextQuestion}
                  className="ml-auto px-6 py-2.5 rounded-xl bg-gradient-to-r from-emerald-600 to-amber-600 hover:from-emerald-500 hover:to-amber-500 font-semibold text-sm text-white shadow-lg shadow-emerald-950 transition-all flex items-center gap-2"
                >
                  {currentIdx < questions.length - 1 ? (
                    <>Next Question <ArrowRight className="w-4 h-4" /></>
                  ) : (
                    <>Complete Examination <Award className="w-4 h-4" /></>
                  )}
                </button>
              )}
            </div>

            {/* Comprehensive Dual-Layer Autopsy */}
            {isSubmitted && (
              <div className="mt-8 pt-6 border-t border-emerald-900/60 space-y-6 animate-fadeIn">
                <div className={`p-4 rounded-xl border ${
                  currentQ.options[selectedOptionIdx].isCorrect 
                    ? 'bg-emerald-950/40 border-emerald-500/40 text-emerald-200' 
                    : 'bg-rose-950/40 border-rose-500/40 text-rose-200'
                }`}>
                  <div className="flex items-center gap-2 mb-1">
                    {currentQ.options[selectedOptionIdx].isCorrect ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-rose-400" />
                    )}
                    <span className="font-bold text-sm">
                      {currentQ.options[selectedOptionIdx].isCorrect 
                        ? 'Accurate Strategic Analysis! High-Governance Mastery.' 
                        : 'CompTIA Distractor Trap Triggered! Review Below.'}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300">
                    {currentQ.options[selectedOptionIdx].explanation}
                  </p>
                </div>

                {/* Deep Autopsy Accordion */}
                <div className="grid grid-cols-1 gap-4">
                  {/* Technical Rationale */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-emerald-800/40">
                    <div className="flex items-center gap-2 mb-2 text-emerald-400 font-bold text-xs uppercase tracking-wider">
                      <BookOpen className="w-4 h-4" /> Technical Standard & Framework Rationale (NIST / ISO / COSO / AICPA)
                    </div>
                    <p className="text-sm text-slate-300 leading-relaxed font-sans mb-3">
                      {currentQ.whyCorrect}
                    </p>
                    <div className="p-3 rounded-lg bg-emerald-950/40 border border-emerald-800/30 text-xs text-emerald-300 font-mono">
                      <strong>Standard Reference:</strong> {currentQ.technicalRationale}
                    </div>
                  </div>

                  {/* Distractor Breakdown */}
                  <div className="p-5 rounded-xl bg-slate-950 border border-slate-800">
                    <div className="flex items-center gap-2 mb-3 text-amber-400 font-bold text-xs uppercase tracking-wider">
                      <Layers className="w-4 h-4" /> Distractor Breakdown: Why Alternative Options Fail
                    </div>
                    <div className="space-y-3">
                      {Object.entries(currentQ.whyWrong).map(([distractor, reason], i) => (
                        <div key={i} className="text-xs p-3 rounded-lg bg-slate-900/80 border border-slate-800">
                          <p className="font-semibold text-rose-300 mb-1">❌ {distractor}</p>
                          <p className="text-slate-400">{reason}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Kenyan Everyday Metaphor */}
                  <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-950/30 to-amber-950/20 border border-amber-500/30">
                    <div className="flex items-center gap-2 mb-2 text-amber-300 font-bold text-xs uppercase tracking-wider">
                      🇰🇪 Everyday Kenyan Metaphor
                    </div>
                    <p className="text-sm text-amber-100/90 leading-relaxed italic">
                      "{currentQ.kenyanMetaphor}"
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        /* Results & Review View */
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-900/90 border border-emerald-900/50 rounded-2xl p-8 backdrop-blur-md shadow-2xl text-center mb-8">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/10 border-2 border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-4">
              <Award className="w-10 h-10" />
            </div>
            
            <h2 className="text-2xl font-bold text-white mb-1">Examination Completed</h2>
            <p className="text-sm text-slate-400 mb-6">CompTIA Security+ SY0-701 Domain 5.0 Performance Report</p>

            <div className="flex items-center justify-center gap-8 mb-6">
              <div className="text-center">
                <p className="text-4xl font-extrabold font-mono text-emerald-400">{scorePercentage}%</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Passing Mark: 75%</p>
              </div>
              <div className="h-12 w-px bg-slate-800" />
              <div className="text-center">
                <p className="text-4xl font-extrabold font-mono text-teal-300">{score} / {questions.length}</p>
                <p className="text-xs text-slate-400 uppercase tracking-wider mt-1">Correct Answers</p>
              </div>
            </div>

            <div className="flex justify-center gap-4">
              <button
                onClick={handleRestart}
                className="px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 font-semibold text-sm text-white transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-4 h-4" /> Retake Domain 5.0 Exam
              </button>
              <button
                onClick={() => setActiveTab(activeTab === 'quiz' ? 'review' : 'quiz')}
                className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 font-semibold text-sm text-emerald-300 border border-emerald-800/40 transition-all flex items-center gap-2"
              >
                <BookOpen className="w-4 h-4" /> {activeTab === 'quiz' ? 'Review All Questions' : 'Hide Review'}
              </button>
            </div>
          </div>

          {/* Review Tab */}
          {activeTab === 'review' && (
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-white flex items-center gap-2">
                <FileText className="w-5 h-5 text-emerald-400" /> Comprehensive Question-by-Question Audit
              </h3>
              {userAnswers.map((ans, index) => (
                <div 
                  key={index}
                  className={`p-6 rounded-2xl border ${
                    ans.isCorrect 
                      ? 'bg-slate-900/80 border-emerald-900/50' 
                      : 'bg-slate-900/80 border-rose-900/50'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs font-mono text-emerald-400">
                      Question {index + 1} • {ans.subdomain}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      ans.isCorrect ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    }`}>
                      {ans.isCorrect ? 'PASSED' : 'MISSED'}
                    </span>
                  </div>

                  <p className="text-sm font-semibold text-slate-100 mb-2">{ans.question}</p>
                  <p className="text-xs text-slate-400 mb-4 italic">Scenario: {ans.scenario}</p>

                  <div className="grid grid-cols-1 gap-2 text-xs mb-4">
                    <div className={`p-3 rounded-lg border ${
                      ans.isCorrect 
                        ? 'bg-emerald-950/30 border-emerald-800/40 text-emerald-300' 
                        : 'bg-rose-950/30 border-rose-800/40 text-rose-300'
                    }`}>
                      <strong>Your Answer:</strong> {ans.selectedOption?.text}
                    </div>
                    {!ans.isCorrect && (
                      <div className="p-3 rounded-lg bg-emerald-950/30 border border-emerald-800/40 text-emerald-300">
                        <strong>Correct Answer:</strong> {ans.correctOption?.text}
                      </div>
                    )}
                  </div>

                  <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-xs text-slate-300">
                    <p className="font-bold text-amber-300 uppercase tracking-wider mb-1">Standard & Autopsy Rationale</p>
                    <p className="mb-2">{ans.technicalRationale}</p>
                    <p className="text-amber-100/90 italic">🇰🇪 {ans.kenyanMetaphor}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
