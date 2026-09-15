import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, 
  HelpCircle, AlertCircle, Sparkles, BookOpen, Shield, 
  Check, ArrowRight, Layers, Flame, Flag, Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';
import { DOMAIN1_PREPSET_QUESTIONS } from '../../data/domain1PrepSetQuestions';

export default function Domain1PrepSetMcq({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' or 'review'

  useEffect(() => {
    // Load Portion 1 questions
    setQuestions(DOMAIN1_PREPSET_QUESTIONS);
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
    setCurrentIdx(0);
    setSelectedOptionIdx(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
    setUserAnswers([]);
    setActiveTab('quiz');
  };

  return (
    <div className="max-w-4xl mx-auto px-3 sm:px-4 py-6 space-y-6 animate-fadeIn">
      
      {/* Top Navigation Bar */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <button
          onClick={onBack}
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-amber-100 text-slate-700 hover:text-amber-950 rounded-2xl border-2 border-slate-200 transition-all font-bold text-xs sm:text-sm shadow-sm active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-amber-100 text-amber-950 border border-amber-300 rounded-full font-black text-xs flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-amber-700" />
            <span>PrepSet Exam Simulator • Domain 1.0 (Batch 1)</span>
          </span>
        </div>
      </div>

      {!showResult ? (
        <div className="space-y-6">
          
          {/* Header Progress Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-amber-300 shadow-md space-y-4">
            
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-amber-500 text-white font-black text-xs uppercase tracking-wider">
                  {currentQ.subdomain}
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  CompTIA PrepSet Scenario Level
                </span>
              </div>

              <div className="text-xs font-black text-slate-600">
                Question <strong className="text-amber-600">{currentIdx + 1}</strong> of <strong>{questions.length}</strong>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="bg-gradient-to-r from-amber-400 to-orange-500 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Scenario Box */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl border-2 border-slate-800 space-y-2 font-sans">
              <div className="flex items-center gap-2 text-amber-400 font-black text-xs uppercase tracking-wider">
                <Compass className="w-4 h-4" />
                <span>Enterprise Case Scenario</span>
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

          </div>

          {/* Options Grid */}
          <div className="space-y-3">
            {currentQ.options.map((option, idx) => {
              const isSelected = selectedOptionIdx === idx;
              let btnStyle = "bg-white border-slate-200 hover:border-slate-300 text-slate-800";

              if (isSelected && !isSubmitted) {
                btnStyle = "bg-amber-50 border-amber-500 text-amber-950 ring-2 ring-amber-400/40 shadow-md";
              }

              if (isSubmitted) {
                if (option.isCorrect) {
                  btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-md ring-2 ring-emerald-400/50";
                } else if (isSelected && !option.isCorrect) {
                  btnStyle = "bg-rose-50 border-rose-400 text-rose-950 ring-2 ring-rose-400/40";
                } else {
                  btnStyle = "bg-slate-50 border-slate-200 text-slate-400 opacity-60";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isSubmitted}
                  className={`w-full p-4 rounded-2xl border-3 text-left transition-all flex items-center justify-between gap-3 cursor-pointer ${btnStyle}`}
                >
                  <div className="flex items-center gap-3">
                    <span className={`w-8 h-8 rounded-xl flex items-center justify-center font-black text-xs shrink-0 ${
                      isSelected 
                        ? 'bg-amber-500 text-white' 
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {String.fromCharCode(65 + idx)}
                    </span>
                    <span className="font-bold text-xs sm:text-sm leading-relaxed">
                      {option.text}
                    </span>
                  </div>

                  {isSubmitted && option.isCorrect && (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                  )}
                  {isSubmitted && isSelected && !option.isCorrect && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Deep Dual-Layer Explanation Card (Rendered on submission) */}
          {isSubmitted && (
            <div className="space-y-4 pt-2 animate-fadeIn">
              
              {/* Correctness Header Banner */}
              <div className={`p-4 rounded-2xl border-2 text-xs sm:text-sm font-bold flex items-center justify-between ${
                currentQ.options[selectedOptionIdx].isCorrect
                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950'
                  : 'bg-rose-50 border-rose-400 text-rose-950'
              }`}>
                <div className="flex items-center gap-2 font-black text-sm">
                  {currentQ.options[selectedOptionIdx].isCorrect ? (
                    <>
                      <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                      <span>Spot on! That is the correct CompTIA answer.</span>
                    </>
                  ) : (
                    <>
                      <XCircle className="w-5 h-5 text-rose-600" />
                      <span>Not quite. Let's analyze why!</span>
                    </>
                  )}
                </div>

                <span className="text-xs font-mono">
                  Score: {score}/{currentIdx + 1}
                </span>
              </div>

              {/* 1. WHY THE CORRECT ANSWER IS CORRECT */}
              <div className="bg-white rounded-3xl p-5 border-3 border-emerald-300 shadow-md space-y-2 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-black text-emerald-900 uppercase text-xs tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Why the Correct Answer is 100% Right ({currentQ.options.find(o => o.isCorrect)?.text}):</span>
                </div>
                <p className="text-slate-700 leading-relaxed font-medium">
                  {currentQ.options.find(o => o.isCorrect)?.whyCorrect}
                </p>
                <div className="pt-2 border-t border-emerald-100 text-[11px] text-emerald-800 font-mono">
                  <strong>CompTIA Technical Linkage:</strong> {currentQ.technicalRationale}
                </div>
              </div>

              {/* 2. WHY THE OTHER CHOICES DON'T FIT (DISTRACTOR AUTOPSY) */}
              <div className="bg-slate-950 text-white rounded-3xl p-5 border-3 border-slate-800 shadow-lg space-y-3">
                <div className="flex items-center gap-2 font-black text-amber-400 uppercase text-xs tracking-wider">
                  <AlertCircle className="w-4 h-4 text-amber-400" />
                  <span>Distractor Breakdown: Why the Other 3 Choices Fail 🧐</span>
                </div>

                <div className="space-y-2 text-xs">
                  {currentQ.options.filter(o => !o.isCorrect).map((distractor, i) => (
                    <div key={i} className="p-3 bg-slate-900 rounded-2xl border border-slate-800 space-y-1">
                      <div className="font-extrabold text-rose-400">
                        ❌ {distractor.text}:
                      </div>
                      <p className="text-slate-300 leading-relaxed font-medium">
                        {distractor.whyWrong}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* 3. KENYAN STREET / EVERYDAY ANALOGY */}
              <div className="bg-amber-50/90 border-3 border-amber-300 rounded-3xl p-5 space-y-1.5 text-xs sm:text-sm">
                <div className="flex items-center gap-2 font-black text-amber-950 text-xs uppercase tracking-wider">
                  <span className="text-base">🇰🇪</span>
                  <span>Kenyan Everyday Reality Analogy (Zero Jargon):</span>
                </div>
                <p className="italic text-amber-900 leading-relaxed font-medium">
                  "{currentQ.kenyanMetaphor}"
                </p>
              </div>

            </div>
          )}

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-between">
            <span className="text-xs text-slate-400 font-medium">
              {!isSubmitted ? "Select an option to proceed" : "Review explanation then continue"}
            </span>

            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOptionIdx === null}
                className={`px-8 py-3.5 rounded-2xl font-black text-sm shadow-md transition-all active:scale-95 cursor-pointer ${
                  selectedOptionIdx !== null
                    ? 'bg-amber-600 hover:bg-amber-700 text-white shadow-amber-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Lock In Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="px-8 py-3.5 bg-amber-600 hover:bg-amber-700 text-white font-black text-sm rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2 cursor-pointer"
              >
                <span>{currentIdx + 1 < questions.length ? 'Next Question →' : 'See Batch 1 Results 🏆'}</span>
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Final Score Card & Review Mode */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-amber-300 shadow-xl space-y-6 text-center animate-scaleUp">
          
          <div className="w-20 h-20 mx-auto rounded-3xl bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center text-white text-4xl shadow-lg shadow-amber-200">
            🏆
          </div>

          <div className="space-y-1">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              PrepSet Domain 1.0 (Batch 1) Completed!
            </h2>
            <p className="text-slate-600 font-medium text-xs sm:text-base">
              You scored <strong className="text-amber-600 text-lg sm:text-xl">{score}</strong> out of <strong className="text-slate-900 text-lg sm:text-xl">{questions.length}</strong> ({Math.round((score / questions.length) * 100)}%)
            </p>
          </div>

          {/* Feedback badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black bg-amber-50 border border-amber-300 text-amber-900">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>
              {score === questions.length ? 'Mastery Level! Ready for CompTIA Exam Day.' : 'Great effort! Review the missed questions below.'}
            </span>
          </div>

          {/* Questions Review List */}
          <div className="text-left space-y-4 pt-4 border-t border-slate-100">
            <h3 className="font-black text-slate-900 text-base">
              Review Question Performance:
            </h3>

            <div className="space-y-3">
              {userAnswers.map((ans, i) => (
                <div 
                  key={i} 
                  className={`p-4 rounded-2xl border-2 space-y-2 text-xs ${
                    ans.isCorrect ? 'bg-emerald-50/70 border-emerald-300' : 'bg-rose-50/70 border-rose-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-black text-slate-700">Q{i + 1}: {ans.subdomain}</span>
                    <span className={`px-2.5 py-0.5 rounded-full font-black text-[10px] ${
                      ans.isCorrect ? 'bg-emerald-200 text-emerald-900' : 'bg-rose-200 text-rose-900'
                    }`}>
                      {ans.isCorrect ? 'CORRECT' : 'MISSED'}
                    </span>
                  </div>

                  <div className="font-bold text-slate-900">{ans.question}</div>

                  <div className="space-y-1 pt-1 font-mono text-[11px]">
                    <div>Your Choice: <span className={ans.isCorrect ? 'text-emerald-700 font-bold' : 'text-rose-700 font-bold'}>{ans.selectedOption.text}</span></div>
                    {!ans.isCorrect && (
                      <div>Correct Answer: <span className="text-emerald-700 font-bold">{ans.correctOption.text}</span></div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={handleRestart}
              className="px-6 py-3 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-black text-xs sm:text-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Batch 1</span>
            </button>

            <button
              onClick={onBack}
              className="px-6 py-3 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-black text-xs sm:text-sm transition-all active:scale-95 cursor-pointer"
            >
              Back to Home
            </button>
          </div>

        </div>
      )}

    </div>
  );
}
