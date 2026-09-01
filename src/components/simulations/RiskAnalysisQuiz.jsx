import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const questions = [
  {
    id: 1,
    question: "Which formula correctly calculates Single Loss Expectancy (SLE)?",
    options: [
      { text: "SLE = Asset Value (AV) × Exposure Factor (EF)", isCorrect: true },
      { text: "SLE = CPU × RAM", isCorrect: false },
      { text: "SLE = IP × DNS", isCorrect: false }
    ],
    explanation: "Single Loss Expectancy (SLE) equals Asset Value multiplied by Exposure Factor %!"
  },
  {
    id: 2,
    question: "Which formula correctly calculates Annualized Loss Expectancy (ALE)?",
    options: [
      { text: "ALE = Single Loss Expectancy (SLE) × Annualized Rate of Occurrence (ARO)", isCorrect: true },
      { text: "ALE = SLA + AUP", isCorrect: false },
      { text: "ALE = NDA × MOU", isCorrect: false }
    ],
    explanation: "Annualized Loss Expectancy (ALE) equals SLE multiplied by ARO!"
  },
  {
    id: 3,
    question: "If a database server cluster is valued at $200,000 (AV) and a flood causes 50% damage (EF = 0.5), what is the SLE?",
    options: [
      { text: "$100,000", isCorrect: true },
      { text: "$50,000", isCorrect: false },
      { text: "$200,000", isCorrect: false }
    ],
    explanation: "SLE = $200,000 × 0.5 = $100,000 expected loss per flood incident!"
  },
  {
    id: 4,
    question: "If the SLE is $100,000 and floods occur once every 10 years (ARO = 0.1), what is the Annualized Loss Expectancy (ALE)?",
    options: [
      { text: "$10,000 / year", isCorrect: true },
      { text: "$100,000 / year", isCorrect: false },
      { text: "$1,000 / year", isCorrect: false }
    ],
    explanation: "ALE = $100,000 × 0.1 = $10,000 annual loss expectancy!"
  },
  {
    id: 5,
    question: "When is a proposed security safeguard or countermeasure considered financially justified?",
    options: [
      { text: "When the reduction in ALE is greater than the annual cost of the safeguard", isCorrect: true },
      { text: "When the safeguard costs more than the asset value", isCorrect: false },
      { text: "When the CEO likes the color of the firewall", isCorrect: false }
    ],
    explanation: "A safeguard is justified when the money saved from reduced ALE exceeds the safeguard subscription cost!"
  }
];

export default function RiskAnalysisQuiz() {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);

  const currentQ = questions[currentIdx];

  const handleSelectOption = (idx) => {
    if (isSubmitted) return;
    sounds.playPop();
    setSelectedOption(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOption === null) return;
    setIsSubmitted(true);

    const isRight = currentQ.options[selectedOption].isCorrect;
    if (isRight) {
      sounds.playSuccess();
      setScore(prev => prev + 1);
    } else {
      sounds.playBuzzer();
    }
  };

  const handleNext = () => {
    sounds.playPop();
    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setQuizFinished(true);
      try {
        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 }
        });
      } catch (e) {}
    }
  };

  const handleRestart = () => {
    sounds.playPop();
    setCurrentIdx(0);
    setScore(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setQuizFinished(false);
  };

  return (
    <div class="space-y-6">
      
      {/* Top Banner */}
      <div class="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl p-6 text-white shadow-lg shadow-indigo-200/50 flex items-center justify-between">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-widest text-indigo-100">Risk Analysis Challenge</span>
          <h3 class="text-2xl font-extrabold">Master SLE, ARO, ALE, AV, & EF! 🧮💰</h3>
        </div>

        <div class="w-12 h-12 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-2xl font-bold">
          ⭐
        </div>
      </div>

      {!quizFinished ? (
        <div class="bg-white rounded-3xl p-6 sm:p-8 border-2 border-slate-200 shadow-sm space-y-6">
          
          {/* Progress Indicator */}
          <div class="flex items-center justify-between text-xs font-bold text-slate-500 border-b border-slate-100 pb-4">
            <span>Question {currentIdx + 1} of {questions.length}</span>
            <span>Current Score: {score} / {questions.length}</span>
          </div>

          {/* Question Text */}
          <h4 class="text-xl sm:text-2xl font-extrabold text-slate-900 leading-snug">
            {currentQ.question}
          </h4>

          {/* Options List */}
          <div class="space-y-3 pt-2">
            {currentQ.options.map((opt, idx) => {
              let btnStyle = "border-slate-200 bg-white hover:border-slate-300 text-slate-800";
              if (selectedOption === idx) {
                btnStyle = "border-indigo-500 bg-indigo-50 text-indigo-950 font-extrabold shadow-md";
              }
              if (isSubmitted) {
                if (opt.isCorrect) {
                  btnStyle = "border-emerald-500 bg-emerald-50 text-emerald-950 font-extrabold shadow-md";
                } else if (selectedOption === idx && !opt.isCorrect) {
                  btnStyle = "border-rose-500 bg-rose-50 text-rose-950 font-extrabold";
                } else {
                  btnStyle = "border-slate-100 bg-slate-50 text-slate-400 opacity-50";
                }
              }

              return (
                <button
                  key={idx}
                  onClick={() => handleSelectOption(idx)}
                  disabled={isSubmitted}
                  class={`w-full p-4 rounded-2xl border-4 text-left transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span class="text-base font-bold">{opt.text}</span>
                  {isSubmitted && opt.isCorrect && <CheckCircle2 class="w-6 h-6 text-emerald-600 shrink-0" />}
                  {isSubmitted && selectedOption === idx && !opt.isCorrect && <XCircle class="w-6 h-6 text-rose-500 shrink-0" />}
                </button>
              );
            })}
          </div>

          {/* Feedback & Explanation */}
          {isSubmitted && (
            <div class={`p-4 rounded-2xl border-2 text-sm font-medium animate-fadeIn ${
              currentQ.options[selectedOption].isCorrect
                ? 'bg-emerald-50 border-emerald-300 text-emerald-900'
                : 'bg-rose-50 border-rose-300 text-rose-900'
            }`}>
              <div class="font-extrabold mb-1">
                {currentQ.options[selectedOption].isCorrect ? '🎉 Correct!' : '💡 Explanation:'}
              </div>
              <p>{currentQ.explanation}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div class="pt-4 flex justify-end">
            {!isSubmitted ? (
              <button
                onClick={handleSubmitAnswer}
                disabled={selectedOption === null}
                class={`px-8 py-3.5 rounded-2xl font-extrabold text-base shadow-md transition-all active:scale-95 ${
                  selectedOption !== null
                    ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-indigo-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                class="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <span>{currentIdx + 1 < questions.length ? 'Next Question →' : 'See Final Score 🏆'}</span>
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results Screen */
        <div class="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-sm text-center space-y-6 animate-fadeIn">
          <div class="w-24 h-24 mx-auto rounded-full bg-indigo-100 border-4 border-indigo-400 flex items-center justify-center text-5xl shadow-lg">
            🧮
          </div>

          <div class="space-y-2">
            <h4 class="text-3xl font-black text-slate-900">Quiz Completed!</h4>
            <p class="text-slate-600 font-medium text-base">
              You scored <strong class="text-indigo-600 font-black text-xl">{score}</strong> out of <strong class="font-black text-xl">{questions.length}</strong>!
            </p>
          </div>

          <div class="p-4 bg-indigo-50 border border-indigo-200 rounded-2xl max-w-md mx-auto text-indigo-950 text-sm font-semibold">
            {score === questions.length 
              ? '🌟 PERFECT SCORE! You have mastered Quantitative Risk Formulas!'
              : '👍 Great job! Review the Risk Math and ROI toys and try again for 100%!'}
          </div>

          <button
            onClick={handleRestart}
            class="px-8 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-indigo-200 transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <RotateCcw class="w-5 h-5" /> Retake Quiz
          </button>
        </div>
      )}

    </div>
  );
}
