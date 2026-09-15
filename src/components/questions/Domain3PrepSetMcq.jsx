import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, Award, CheckCircle2, XCircle, RotateCcw, 
  HelpCircle, AlertCircle, Sparkles, BookOpen, Shield, 
  Check, ArrowRight, Layers, Flame, Flag, Compass
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';
import { DOMAIN3_PREPSET_QUESTIONS } from '../../data/domain3PrepSetQuestions';

// Helper to shuffle array (Fisher-Yates)
function shuffleArray(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function Domain3PrepSetMcq({ onBack }) {
  const [questions, setQuestions] = useState([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOptionIdx, setSelectedOptionIdx] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [activeTab, setActiveTab] = useState('quiz'); // 'quiz' or 'review'

  const initQuiz = () => {
    const prepared = DOMAIN3_PREPSET_QUESTIONS.map(q => ({
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
          className="flex items-center gap-2 px-4 py-2 bg-white hover:bg-indigo-100 text-slate-700 hover:text-indigo-950 rounded-2xl border-2 border-slate-200 transition-all font-bold text-xs sm:text-sm shadow-sm active:scale-95 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Home</span>
        </button>

        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-indigo-100 text-indigo-950 border border-indigo-300 rounded-full font-black text-xs flex items-center gap-1.5">
            <Shield className="w-3.5 h-3.5 text-indigo-700" />
            <span>PrepSet Exam Simulator • Domain 3.0 (Security Architecture)</span>
          </span>
        </div>
      </div>

      {!showResult ? (
        <div className="space-y-6">
          
          {/* Header Progress Card */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border-4 border-indigo-300 shadow-md space-y-4">
            
            <div className="flex items-center justify-between flex-wrap gap-2">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-indigo-600 text-white font-black text-xs uppercase tracking-wider">
                  {currentQ.subdomain}
                </span>
                <span className="text-xs text-slate-500 font-bold">
                  CompTIA PrepSet Scenario Level
                </span>
              </div>

              <div className="text-xs font-black text-slate-600">
                Question <strong className="text-indigo-600">{currentIdx + 1}</strong> of <strong>{questions.length}</strong>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden border border-slate-200">
              <div 
                className="bg-gradient-to-r from-indigo-500 to-purple-600 h-full transition-all duration-300 rounded-full"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              />
            </div>

            {/* Scenario Box */}
            <div className="bg-slate-900 text-white p-5 rounded-2xl border-2 border-slate-800 space-y-2 font-sans">
              <div className="flex items-center gap-2 text-indigo-400 font-black text-xs uppercase tracking-wider">
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
                btnStyle = "bg-rose-50 border-rose-500 text-indigo-950 ring-2 ring-rose-400/40 shadow-md";
              }

              if (isSubmitted) {
                if (option.isCorrect) {
                  btnStyle = "bg-emerald-50 border-emerald-500 text-emerald-950 font-black shadow-md ring-2 ring-emerald-400/50";
                } else if (isSelected && !option.isCorrect) {
                  btnStyle = "bg-rose-50 border-rose-400 text-indigo-950 ring-2 ring-rose-400/40";
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
                        ? 'bg-indigo-600 text-white' 
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
                    <XCircle className="w-5 h-5 text-indigo-600 shrink-0" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Action Control / Submit or Next */}
          <div className="flex items-center justify-between gap-3 pt-2">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOptionIdx === null}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 disabled:bg-slate-200 disabled:text-slate-400 text-white font-black text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <span>Submit Answer</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleNext}
                className="w-full sm:w-auto px-8 py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm transition-all shadow-md active:scale-95 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>{currentIdx + 1 === questions.length ? 'Finish & See Scorecard' : 'Next Scenario'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Detailed Dual-Layer Autopsy Explanation Box */}
          {isSubmitted && (
            <div className="space-y-4 pt-4 animate-fadeIn">
              
              {/* Technical CompTIA Rationale Box */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-emerald-300 shadow-md space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 font-black text-xs sm:text-sm uppercase tracking-wider">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>CompTIA SY0-701 Official Technical Justification</span>
                </div>
                
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-semibold">
                  {currentQ.options.find(o => o.isCorrect)?.whyCorrect}
                </p>

                <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-xs text-emerald-950 font-medium leading-relaxed">
                  <strong>Exam Blueprint Takeaway:</strong> {currentQ.technicalRationale}
                </div>
              </div>

              {/* Distractor Autopsy Box (Why the others fail) */}
              <div className="bg-white rounded-3xl p-5 sm:p-6 border-3 border-slate-200 shadow-md space-y-4">
                <div className="flex items-center gap-2 text-slate-800 font-black text-xs sm:text-sm uppercase tracking-wider">
                  <AlertCircle className="w-5 h-5 text-rose-500" />
                  <span>Distractor Autopsy (Why the Other Options Fail)</span>
                </div>

                <div className="space-y-2.5">
                  {currentQ.options.filter(o => !o.isCorrect).map((distractor, dIdx) => (
                    <div key={dIdx} className="p-3 bg-slate-50 rounded-xl border border-slate-200 space-y-1">
                      <div className="flex items-center gap-2 font-bold text-xs text-rose-900">
                        <XCircle className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                        <span>{distractor.text}</span>
                      </div>
                      <p className="text-xs text-slate-600 leading-relaxed pl-5 font-medium">
                        {distractor.whyWrong}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Everyday Kenyan Metaphor Box */}
              {currentQ.kenyanMetaphor && (
                <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-3xl p-5 sm:p-6 border-3 border-amber-300 shadow-sm space-y-2">
                  <div className="flex items-center gap-2 text-amber-900 font-black text-xs sm:text-sm uppercase tracking-wider">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <span>Everyday Kenyan Metaphor (Nairobi Reality) 🇰🇪</span>
                  </div>
                  <p className="text-xs sm:text-sm text-amber-950 leading-relaxed font-semibold">
                    {currentQ.kenyanMetaphor}
                  </p>
                </div>
              )}

            </div>
          )}

        </div>
      ) : (
        /* Results & Score Card */
        <div className="bg-white rounded-3xl p-6 sm:p-8 border-4 border-indigo-300 shadow-lg space-y-6 text-center animate-fadeIn">
          
          <div className="w-20 h-20 mx-auto rounded-3xl bg-indigo-600 text-white flex items-center justify-center shadow-lg transform -rotate-3">
            <Award className="w-10 h-10" />
          </div>

          <div className="space-y-2">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900">
              Exam Batch Completed!
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 font-bold">
              Domain 3.0: Security Architecture
            </p>
          </div>

          {/* Score Badge */}
          <div className="inline-flex flex-col items-center p-6 bg-slate-50 rounded-3xl border-2 border-slate-200">
            <div className="text-4xl sm:text-5xl font-black text-slate-900">
              {score} <span className="text-lg text-slate-400 font-normal">/ {questions.length}</span>
            </div>
            <div className="text-xs font-black uppercase tracking-wider mt-1 text-slate-500">
              Score: {Math.round((score / questions.length) * 100)}%
            </div>
          </div>

          {/* Quick Review List */}
          <div className="text-left space-y-3 pt-4 border-t border-slate-200">
            <h3 className="font-black text-xs sm:text-sm text-slate-800 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-indigo-600" />
              <span>Question-by-Question Breakdown</span>
            </h3>

            <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
              {userAnswers.map((ans, idx) => (
                <div 
                  key={idx}
                  className={`p-3.5 rounded-2xl border text-xs space-y-1.5 ${
                    ans.isCorrect ? 'bg-emerald-50/60 border-emerald-200' : 'bg-rose-50/60 border-rose-200'
                  }`}
                >
                  <div className="flex items-center justify-between font-black text-[11px]">
                    <span className="text-slate-500">Scenario {idx + 1}: {ans.subdomain}</span>
                    <span className={ans.isCorrect ? 'text-emerald-700' : 'text-indigo-700'}>
                      {ans.isCorrect ? '✓ Correct' : '✗ Missed'}
                    </span>
                  </div>

                  <div className="font-bold text-slate-900">{ans.question}</div>

                  <div className="space-y-1 pt-1 font-mono text-[11px]">
                    <div>Your Choice: <span className={ans.isCorrect ? 'text-emerald-700 font-bold' : 'text-indigo-700 font-bold'}>{ans.selectedOption.text}</span></div>
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
              className="px-6 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-black text-xs sm:text-sm transition-all active:scale-95 flex items-center gap-2 cursor-pointer shadow-md"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Retry Domain 3.0</span>
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
