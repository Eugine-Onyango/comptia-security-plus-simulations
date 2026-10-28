import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { speakQuestionWithOptions, stopSpeech } from '../utils/speech';

export default function QuestionSpeakerButton({ question, options }) {
  const [isSpeaking, setIsSpeaking] = useState(false);

  // Stop speech when unmounting or when question changes
  useEffect(() => {
    stopSpeech();
    setIsSpeaking(false);
    return () => {
      stopSpeech();
    };
  }, [question]);

  const handleToggle = () => {
    if (isSpeaking) {
      stopSpeech();
      setIsSpeaking(false);
    } else {
      setIsSpeaking(true);
      const started = speakQuestionWithOptions(question, options, () => {
        setIsSpeaking(false);
      });
      if (!started) {
        setIsSpeaking(false);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleToggle}
      title={isSpeaking ? "Stop reading aloud" : "Read question and choices aloud"}
      aria-label={isSpeaking ? "Stop reading aloud" : "Read question and choices aloud"}
      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-bold text-xs transition-all shadow-sm active:scale-95 border ${
        isSpeaking
          ? 'bg-purple-600 text-white border-purple-700 animate-pulse shadow-purple-200'
          : 'bg-white hover:bg-purple-50 text-purple-700 border-purple-300 hover:border-purple-400'
      }`}
    >
      {isSpeaking ? (
        <>
          <VolumeX className="w-4 h-4 text-white" />
          <span>Stop Voice ⏹️</span>
        </>
      ) : (
        <>
          <Volume2 className="w-4 h-4 text-purple-600" />
          <span>Read Aloud 🔊</span>
        </>
      )}
    </button>
  );
}
