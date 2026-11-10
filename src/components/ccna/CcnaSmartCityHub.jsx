import React, { useState } from 'react';
import {
  Sparkles,
  BookOpen,
  Gamepad2,
  Map,
  CheckCircle2,
  ArrowLeft,
  Compass,
  Heart,
  Layers,
  FlaskConical
} from 'lucide-react';
import { all31CcnaTopics, topic1Subtopics } from './ccnaTopicsData';
import CcnaIntroInteractiveSim from './CcnaIntroInteractiveSim';
import CcnaAnimationGameLab from './CcnaAnimationGameLab';
import { sounds } from '../../utils/audio';

export default function CcnaSmartCityHub({ onBack }) {
  // 'testing_lab' | 'topic1' | 'roadmap'
  const [activeView, setActiveView] = useState('testing_lab');
  const [activeSubtopicId, setActiveSubtopicId] = useState(topic1Subtopics[0].id);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredTopics = all31CcnaTopics.filter(
    (t) =>
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.subtopics.some((s) => s.toLowerCase().includes(searchTerm.toLowerCase())) ||
      t.kenyanAnalogy.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 sm:py-8 space-y-8">
      {/* Top Bar / Mode Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-emerald-100 border-2 border-emerald-300 text-emerald-950 font-black text-xs sm:text-sm flex items-center gap-1.5">
            <span>🏙️🇰🇪</span>
            <span>CCNA Smart-City & Kenyan Mtaa Toybox</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => {
              sounds.playPop();
              setActiveView('testing_lab');
            }}
            className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all flex items-center gap-1.5 ${
              activeView === 'testing_lab'
                ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white border-amber-600 shadow-md scale-105'
                : 'bg-amber-50 text-amber-950 border-amber-300 hover:bg-amber-100'
            }`}
          >
            <FlaskConical className="w-4 h-4" />
            <span>🧪 Testing Page (4 New Animation & Game Styles)</span>
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              setActiveView('topic1');
            }}
            className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all flex items-center gap-1.5 ${
              activeView === 'topic1'
                ? 'bg-emerald-600 text-white border-emerald-700 shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-emerald-50'
            }`}
          >
            <Gamepad2 className="w-4 h-4" />
            <span>Original Topic 1 Page (5 Subtopics)</span>
          </button>

          <button
            onClick={() => {
              sounds.playPop();
              setActiveView('roadmap');
            }}
            className={`px-4 py-2 rounded-2xl font-black text-xs sm:text-sm border-2 transition-all flex items-center gap-1.5 ${
              activeView === 'roadmap'
                ? 'bg-sky-600 text-white border-sky-700 shadow-md'
                : 'bg-white text-slate-700 border-slate-300 hover:bg-sky-50'
            }`}
          >
            <Map className="w-4 h-4" />
            <span>All 31 Topics Directory</span>
          </button>
        </div>
      </div>

      {/* Show Hero Banner only on Original Topic 1 or Roadmap views */}
      {activeView !== 'testing_lab' && (
        <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-sky-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg border-4 border-emerald-300 relative overflow-hidden">
          <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="space-y-2.5 max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/25 text-white text-xs font-black backdrop-blur-sm">
                <Sparkles className="w-4 h-4 text-yellow-200" />
                <span>Topic 1 of 31 • Computer Networking - Introduction</span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
                Computer Networking — Introduction 🏘️🛵📦
              </h1>

              <p className="text-emerald-50 font-semibold text-sm sm:text-base leading-relaxed">
                No dry theory or scary screens! Learn each subtopic with <strong>Plain Layman’s English</strong>, <strong>Dual Analogies</strong> (your PDF’s <em>Smart-City Delivery Story</em> + a relatable <em>Kenyan Mtaa / Boda-Boda / Matatu Story</em>), and a <strong>Playable Toybox Animation</strong>!
              </p>
            </div>

            {/* 5 Subtopics Quick Summary Box */}
            <div className="bg-white/95 text-slate-800 rounded-2xl p-4 border-2 border-white shadow-md shrink-0 w-full md:w-72 space-y-2">
              <div className="text-xs font-black uppercase tracking-wider text-emerald-800 flex items-center justify-between">
                <span>Topic 1 Subtopics</span>
                <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-900">5 / 5 Ready</span>
              </div>
              <div className="space-y-1">
                {topic1Subtopics.map((sub) => (
                  <button
                    key={sub.id}
                    onClick={() => {
                      sounds.playPop();
                      setActiveView('topic1');
                      setActiveSubtopicId(sub.id);
                    }}
                    className={`w-full text-left px-2.5 py-1.5 rounded-xl text-xs font-extrabold flex items-center justify-between transition-all ${
                      activeView === 'topic1' && activeSubtopicId === sub.id
                        ? 'bg-emerald-600 text-white'
                        : 'hover:bg-emerald-50 text-slate-700'
                    }`}
                  >
                    <span>
                      {sub.icon} {sub.title}
                    </span>
                    <CheckCircle2 className="w-3.5 h-3.5 shrink-0 opacity-80" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      {activeView === 'testing_lab' ? (
        <CcnaAnimationGameLab onBackToHub={() => setActiveView('topic1')} />
      ) : activeView === 'topic1' ? (
        <CcnaIntroInteractiveSim
          activeSubtopicId={activeSubtopicId}
          onSelectSubtopic={(id) => setActiveSubtopicId(id)}
        />
      ) : (
        /* ALL 31 TOPICS & SUBTOPICS DIRECTORY VIEW */
        <div className="space-y-6">
          <div className="bg-white rounded-3xl p-6 border-4 border-sky-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h2 className="text-2xl font-black text-slate-900">
                🗺️ Complete 31-Topic CCNA Smart-City & Kenyan Mtaa Directory
              </h2>
              <p className="text-sm font-semibold text-slate-600">
                Every topic from your 64-page PDF organized with its subtopics, Original Smart-City analogy, and Kenyan analogy!
              </p>
            </div>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search topic or subtopic..."
              className="px-4 py-2.5 rounded-2xl border-2 border-slate-200 text-xs sm:text-sm font-bold text-slate-800 focus:outline-none focus:border-sky-500 w-full sm:w-64"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {filteredTopics.map((topic) => {
              const isTopic1 = topic.id === 1;
              return (
                <div
                  key={topic.id}
                  onClick={() => {
                    if (isTopic1) {
                      sounds.playSuccess();
                      setActiveView('topic1');
                    }
                  }}
                  className={`rounded-3xl p-6 border-4 transition-all flex flex-col justify-between space-y-4 ${
                    isTopic1
                      ? 'bg-emerald-50/70 border-emerald-400 shadow-md cursor-pointer hover:scale-[1.01]'
                      : 'bg-white border-slate-200/90 shadow-sm'
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-black ${
                          isTopic1
                            ? 'bg-emerald-600 text-white'
                            : 'bg-slate-100 text-slate-700'
                        }`}
                      >
                        Topic #{topic.id} {isTopic1 ? '• 🎮 PLAYABLE NOW' : '• Outlined'}
                      </span>
                      <span className="text-3xl">{topic.icon}</span>
                    </div>

                    <h3 className="text-xl font-black text-slate-900">{topic.title}</h3>

                    {/* Subtopics List */}
                    <div className="space-y-1.5">
                      <div className="text-xs font-black uppercase text-slate-500">
                        Subtopics ({topic.subtopics.length}):
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {topic.subtopics.map((sub, i) => (
                          <span
                            key={i}
                            className="px-2.5 py-1 rounded-xl bg-amber-50 border border-amber-200 text-amber-950 font-extrabold text-xs"
                          >
                            {topic.id}.{i + 1} {sub}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Dual Analogies Preview */}
                    <div className="grid grid-cols-1 gap-2 pt-2">
                      <div className="p-3 rounded-2xl bg-sky-50 border border-sky-200 text-xs">
                        <div className="font-black text-sky-900">
                          🏙️ Smart-City Analogy: {topic.smartCityMeaning}
                        </div>
                        <div className="text-slate-600 font-semibold mt-0.5">
                          {topic.smartCityPicture}
                        </div>
                      </div>
                      <div className="p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-xs">
                        <div className="font-black text-emerald-900">🇰🇪 Kenyan Analogy:</div>
                        <div className="text-slate-700 font-semibold mt-0.5">
                          {topic.kenyanAnalogy}
                        </div>
                      </div>
                    </div>
                  </div>

                  {isTopic1 && (
                    <button className="w-full py-2.5 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-xs shadow-sm">
                      🎮 Open Topic 1 Interactive Playground →
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
