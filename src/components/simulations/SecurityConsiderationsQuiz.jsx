import React, { useState } from 'react';
import { Award, CheckCircle2, XCircle, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sounds } from '../../utils/audio';

const questions = [
  {
    id: 1,
    question: "Which federal legislation regulates financial accounting controls, corporate governance, and audit trails for public companies?",
    options: [
      { text: "SOX (Sarbanes-Oxley Act)", isCorrect: true },
      { text: "CPU", isCorrect: false },
      { text: "RAM", isCorrect: false }
    ],
    explanation: "SOX (Sarbanes-Oxley Act) governs financial accounting integrity and internal audit controls!"
  },
  {
    id: 2,
    question: "Which healthcare security regulation protects electronic Protected Health Information (ePHI) and medical record privacy?",
    options: [
      { text: "HIPAA (Health Insurance Portability and Accountability Act)", isCorrect: true },
      { text: "SLA", isCorrect: false },
      { text: "AUP", isCorrect: false }
    ],
    explanation: "HIPAA enforces security and privacy safeguards for patient health information!"
  },
  {
    id: 3,
    question: "Which global standard mandates encryption of Primary Account Numbers (PAN) and network segmentation for credit card processing?",
    options: [
      { text: "PCI DSS (Payment Card Industry Data Security Standard)", isCorrect: true },
      { text: "GPS", isCorrect: false },
      { text: "USB", isCorrect: false }
    ],
    explanation: "PCI DSS establishes security standards for processing credit cards safely!"
  },
  {
    id: 4,
    question: "Which European Union privacy regulation grants individuals the Right to be Forgotten and mandates strict data minimization?",
    options: [
      { text: "GDPR (General Data Protection Regulation)", isCorrect: true },
      { text: "NIST", isCorrect: false },
      { text: "OWASP", isCorrect: false }
    ],
    explanation: "GDPR provides comprehensive data privacy rights for EU citizens!"
  },
  {
    id: 5,
    question: "If an e-commerce website accepts credit cards, which compliance standard must it follow to avoid heavy fines and lost card privileges?",
    options: [
      { text: "PCI DSS", isCorrect: true },
      { text: "SOX", isCorrect: false },
      { text: "HIPAA", isCorrect: false }
    ],
    explanation: "PCI DSS is mandatory for any organization that stores, processes, or transmits cardholder data!"
  }
];

export default function SecurityConsiderationsQuiz() {
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
      <div class="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-3xl p-6 text-white shadow-lg shadow-purple-200/50 flex items-center justify-between">
        <div>
          <span class="text-xs font-extrabold uppercase tracking-widest text-purple-100">Security Considerations Challenge</span>
          <h3 class="text-2xl font-extrabold">Master SOX, HIPAA, PCI DSS, & GDPR! 🏛️💳</h3>
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
                btnStyle = "border-purple-500 bg-purple-50 text-purple-950 font-extrabold shadow-md";
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
                    ? 'bg-purple-600 hover:bg-purple-700 text-white shadow-purple-200'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                Submit Answer
              </button>
            ) : (
              <button
                onClick={handleNext}
                class="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-base rounded-2xl shadow-md transition-all active:scale-95 flex items-center gap-2"
              >
                <span>{currentIdx + 1 < questions.length ? 'Next Question →' : 'See Final Score 🏆'}</span>
              </button>
            )}
          </div>

        </div>
      ) : (
        /* Results Screen */
        <div class="bg-white rounded-3xl p-8 border-2 border-slate-200 shadow-sm text-center space-y-6 animate-fadeIn">
          <div class="w-24 h-24 mx-auto rounded-full bg-purple-100 border-4 border-purple-400 flex items-center justify-center text-5xl shadow-lg">
            🏛️
          </div>

          <div class="space-y-2">
            <h4 class="text-3xl font-black text-slate-900">Quiz Completed!</h4>
            <p class="text-slate-600 font-medium text-base">
              You scored <strong class="text-purple-600 font-black text-xl">{score}</strong> out of <strong class="font-black text-xl">{questions.length}</strong>!
            </p>
          </div>

          <div class="p-4 bg-purple-50 border border-purple-200 rounded-2xl max-w-md mx-auto text-purple-950 text-sm font-semibold">
            {score === questions.length 
              ? '🌟 PERFECT SCORE! You have mastered Security Considerations & Regulations!'
              : '👍 Great job! Review the Regulatory Shield and Audit toys and try again for 100%!'}
          </div>

          <button
            onClick={handleRestart}
            class="px-8 py-3.5 bg-purple-600 hover:bg-purple-700 text-white font-extrabold text-base rounded-2xl shadow-lg shadow-purple-200 transition-all active:scale-95 inline-flex items-center gap-2"
          >
            <RotateCcw class="w-5 h-5" /> Retake Quiz
          </button>
        </div>
      )}

    </div>
  );
}
