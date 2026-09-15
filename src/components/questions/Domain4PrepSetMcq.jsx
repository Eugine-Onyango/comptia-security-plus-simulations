import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, 
  HelpCircle, AlertCircle, Sparkles, BookOpen, Shield, 
  Check, ArrowRight, Layers, Flame, Flag, Activity, Siren, ShieldAlert
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';
import { DOMAIN4_PREPSET_QUESTIONS } from '../../data/domain4PrepSetQuestions';

// Helper to shuffle array (Fisher-Yates)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Domain4PrepSetMcq({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' or 'review'

  const initQuiz = () => {
    const prepared = DOMAIN4_PREPSET_QUESTIONS.map(q => ({
      ...q,
      options: shuffleArray(q.options)
    }));
    setQuestions(shuffleArray(prepared));
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
    setActiveTab('quiz');
  };

  useEffect(() => {
    initQuiz();
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

  const handleNext = () => {
    sounds.playPop();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOptionIdx(null);
      setIsSubmitted(false);
    } else {
      setShowResult(true);
      sounds.playFanfare();
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const handleRestart = () => {
    sounds.playPop();
    initQuiz();
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 space-y-6 animate-fadeIn">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-rose-100 text-slate-700 hover:text-rose-950 rounded-2xl border-2 border-slate-200 transition-all font-bold text-xs sm:text-sm shadow-sm active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-rose-100 text-rose-950 border border-rose-300 rounded-full font-black text-xs flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-rose-700" />
            <span>PrepSet Exam Simulator • Domain 4.0 (Operations & Incident Response)</span>
          </span>
        </div>
      </div>

      {!showResult ? (
        <div className="space-y-6">
          
          {/* Header Progress Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-rose-300 shadow-md space-y-4">
            
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-rose-600 text-white font-black text-xs uppercase tracking-wider">
                  {currentQ.subdomain}
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  CompTIA PrepSet Scenario Level
                </span>
              </div>

              <div className="text-xs font-black text-slate-600">
                Question <strong className="text-rose-600">{currentIdx + 1}</strong> of <strong>{questions.length}</strong>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="bg-gradient-to-r from-rose-500 via-red-500 to-amber-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Scenario Box */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl border-2 border-slate-800 space-y-2 font-sans">
              <div className="flex items-center gap-2 text-rose-400 font-black text-xs uppercase tracking-wider">
                <Activity className="w-4 h-4" />
                <span>Enterprise Operations & Incident Scenario</span>
              </div>
              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-medium">
                "{currentQ.scenario}"
              </p>
            </div>

            {/* Core Question Prompt */}
            <div className="pt-2">
              <h2 className="text-base sm:text-lg font-black text-slate-900 leading-snug">
                {currentQ.question}
              </h2>
            </div>

            {/* Options List */}
            <div className="space-y-2.5 pt-2">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOptionIdx === idx;
                let optionStyle = "bg-white border-2 border-slate-200 hover:border-rose-400 hover:bg-rose-50/40 text-slate-800";
                
                if (isSelected && !isSubmitted) {
                  optionStyle = "bg-rose-50 border-3 border-rose-600 text-rose-950 font-bold shadow-sm";
                } else if (isSubmitted) {
                  if (opt.isCorrect) {
                    optionStyle = "bg-emerald-50 border-3 border-emerald-600 text-emerald-950 font-bold";
                  } else if (isSelected && !opt.isCorrect) {
                    optionStyle = "bg-red-50 border-3 border-red-500 text-red-950 font-bold";
                  } else {
                    optionStyle = "bg-slate-50 border-2 border-slate-200 text-slate-400 opacity-60";
                  }
                }

                return (
                  <button
                    key={idx}
                    disabled={isSubmitted}
                    onClick={() => handleSelectOption(idx)}
                    className={`w-full text-left p-4 rounded-2xl transition-all flex items-start gap-3 cursor-pointer text-xs sm:text-sm leading-relaxed ${optionStyle}`}
                  >
                    <div className="mt-0.5 shrink-0">
                      {isSubmitted ? (
                        opt.isCorrect ? (
                          <div className="w-5 h-5 rounded-full bg-emerald-600 text-white flex items-center justify-center">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                        ) : isSelected ? (
                          <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center">
                            <XCircle className="w-3.5 h-3.5" />
                          </div>
                        ) : (
                          <div className="w-5 h-5 rounded-full border-2 border-slate-300 text-slate-400 flex items-center justify-center text-[10px] font-bold">
                            {String.fromCharCode(65 + idx)}
                          </div>
                        )
                      ) : (
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center text-[10px] font-bold ${
                          isSelected ? 'border-rose-600 bg-rose-600 text-white' : 'border-slate-300 text-slate-500'
                        }`}>
                          {String.fromCharCode(65 + idx)}
                        </div>
                      )}
                    </div>
                    <span className="flex-1 font-medium">{opt.text}</span>
                  </button>
                );
              })}
            </div>

            {/* Action Bar */}
            <div className="pt-3 flex items-center justify-between border-t border-slate-100">
              <div className="text-xs text-slate-500 font-semibold">
                Score: <strong className="text-rose-700">{score}</strong> / {questions.length}
              </div>

              {!isSubmitted ? (
                <button
                  disabled={selectedOptionIdx === null}
                  onClick={handleSubmitAnswer}
                  className={`px-6 py-2.5 rounded-2xl font-black text-xs sm:text-sm flex items-center gap-2 transition-all shadow-md active:scale-95 ${
                    selectedOptionIdx !== null
                      ? 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white cursor-pointer shadow-rose-200'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <span>Submit Answer</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={handleNext}
                  className="px-6 py-2.5 rounded-2xl font-black text-xs sm:text-sm bg-gradient-to-r from-slate-900 to-slate-800 hover:from-slate-800 hover:to-slate-700 text-white flex items-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer"
                >
                  <span>{currentIdx + 1 < questions.length ? 'Next Question' : 'View Results'}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>

          </div>

          {/* Dual-Layer Autopsy (Shown immediately after submitting) */}
          {isSubmitted && (
            <div className="space-y-4 animate-slideDown">
              
              {/* Correctness Banner */}
              <div className={`p-4 rounded-2xl border-2 flex items-center gap-3 ${
                currentQ.options[selectedOptionIdx].isCorrect
                  ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                  : 'bg-red-50 border-red-300 text-red-900'
              }`}>
                {currentQ.options[selectedOptionIdx].isCorrect ? (
                  <>
                    <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0" />
                    <div>
                      <div className="font-black text-sm">CORRECT! Excellent Analysis.</div>
                      <div className="text-xs text-emerald-800">You identified the exact technical operational mechanism tested in this scenario.</div>
                    </div>
                  </>
                ) : (
                  <>
                    <XCircle className="w-6 h-6 text-red-600 shrink-0" />
                    <div>
                      <div className="font-black text-sm">INCORRECT</div>
                      <div className="text-xs text-red-800">Review the technical dissection below to understand why the distractor fails.</div>
                    </div>
                  </>
                )}
              </div>

              {/* Layer 1: Why the Correct Answer is Right */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-emerald-300 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-emerald-800 font-black text-xs uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>LAYER 1: Why Option {String.fromCharCode(65 + currentQ.options.findIndex(o => o.isCorrect))} is Correct (NIST / RFC Standards)</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
                  {currentQ.options.find(o => o.isCorrect)?.whyCorrect}
                </p>
                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium">
                  <strong>Technical Rationale:</strong> {currentQ.technicalRationale}
                </div>
              </div>

              {/* Layer 2: Distractor Autopsy */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-amber-300 shadow-sm space-y-3">
                <div className="flex items-center gap-2 text-amber-800 font-black text-xs uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-amber-600" />
                  <span>LAYER 2: Distractor Autopsy (Why the Other Options Fail)</span>
                </div>
                
                <div className="space-y-2.5">
                  {currentQ.options.map((opt, idx) => {
                    if (opt.isCorrect) return null;
                    return (
                      <div key={idx} className="p-3 rounded-xl bg-amber-50/60 border border-amber-200 space-y-1">
                        <div className="text-xs font-black text-amber-900 flex items-center gap-1.5">
                          <span className="w-4 h-4 rounded-full bg-amber-200 text-amber-900 flex items-center justify-center text-[10px]">
                            {String.fromCharCode(65 + idx)}
                          </span>
                          <span>{opt.text.split(';')[0]}</span>
                        </div>
                        <p className="text-xs text-slate-700 leading-relaxed pl-5 font-medium">
                          {opt.whyWrong}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Kenyan Everyday Metaphor */}
              {currentQ.kenyanMetaphor && (
                <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-3xl p-5 sm:p-6 border-3 border-amber-400 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-black text-xs uppercase tracking-wider">
                    <Sparkles className="w-4 h-4 text-amber-600" />
                    <span>KENYAN EVERYDAY REALITY METAPHOR 🇰🇪</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-semibold italic">
                    "{currentQ.kenyanMetaphor}"
                  </p>
                </div>
              )}

            </div>
          )}

        </div>
      ) : (
        /* Results View */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-rose-300 shadow-xl space-y-6 text-center animate-scaleUp">
          
          <div className="w-20 h-20 mx-auto rounded-full bg-rose-100 flex items-center justify-center text-rose-600 shadow-inner">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Domain 4.0 Assessment Complete!
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 font-medium max-w-md mx-auto">
              Operations & Incident Response requires deep situational awareness, NIST SP 800-61 lifecycle proficiency, and forensic precision under pressure.
            </p>
          </div>

          {/* Score Badge */}
          <div className="inline-block p-6 rounded-3xl bg-slate-900 text-white border-4 border-rose-400 space-y-1">
            <div className="text-xs uppercase tracking-widest text-rose-400 font-black">
              Final Composite Score
            </div>
            <div className="text-4xl sm:text-5xl font-black tracking-tight text-white">
              {score} <span className="text-2xl text-slate-400 font-medium">/ {questions.length}</span>
            </div>
            <div className="text-xs font-bold text-rose-300 pt-1">
              {Math.round((score / questions.length) * 100)}% Proficiency Rating
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-center gap-3 flex-wrap pt-4">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-6 py-3 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-black text-xs sm:text-sm shadow-md hover:shadow-rose-200 transition-all active:scale-95 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retake Domain 4.0 Exam</span>
            </button>

            <button
              onClick={onBack}
              className="flex items-center gap-2 px-6 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-2xl font-bold text-xs sm:text-sm border border-slate-300 transition-all active:scale-95 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Hub</span>
            </button>
          </div>

          {/* Detailed Question Review List */}
          <div className="pt-8 text-left space-y-4 border-t border-slate-200">
            <h3 className="text-base font-black text-slate-900 flex items-center gap-2">
              <BookOpen className="w-5 h-5 text-rose-600" />
              <span>Detailed Incident Response Autopsy Log ({userAnswers.length} Questions)</span>
            </h3>

            <div className="space-y-3">
              {userAnswers.map((ans, idx) => (
                <div 
                  key={idx}
                  className={`p-4 rounded-2xl border-2 space-y-2 ${
                    ans.isCorrect ? 'bg-emerald-50/50 border-emerald-200' : 'bg-red-50/50 border-red-200'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <span className="font-black text-xs text-slate-500">
                      Q{idx + 1}: {ans.subdomain}
                    </span>
                    {ans.isCorrect ? (
                      <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-bold text-[10px] flex items-center gap-1">
                        <Check className="w-3 h-3" /> Correct
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-red-100 text-red-800 font-bold text-[10px] flex items-center gap-1">
                        <XCircle className="w-3 h-3" /> Incorrect
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-bold text-slate-800">
                    {ans.question}
                  </p>

                  <div className="text-xs space-y-1 pt-1">
                    <div className="text-emerald-900 font-semibold">
                      ✓ Correct: {ans.correctOption?.text}
                    </div>
                    {!ans.isCorrect && (
                      <div className="text-red-800 font-medium">
                        ✗ Your Pick: {ans.selectedOption?.text}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      )}

    </div>
  );
}
