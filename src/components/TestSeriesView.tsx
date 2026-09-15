import React, { useState } from 'react';
import { FileText, Clock, Trophy, Award, CheckCircle, Play, ArrowLeft, Swords } from 'lucide-react';
import confetti from 'canvas-confetti';

interface TestSeriesViewProps {
  onBack: () => void;
  onOpenUpgrade: () => void;
}

export const TestSeriesView: React.FC<TestSeriesViewProps> = ({ onBack, onOpenUpgrade }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'live' | 'completed'>('all');

  const tests = [
    {
      id: 't1',
      title: 'EduRain All-India JEE Advanced Major Test 04',
      type: 'Full Syllabus CBT',
      duration: '3 Hours',
      questions: 54,
      totalMarks: 180,
      status: 'LIVE NOW',
      live: true,
      attempts: '14,280 Aspirants',
      difficulty: 'Hard (JEE Adv Level)'
    },
    {
      id: 't2',
      title: 'Physics Sectional: Electromagnetism & Optics Drill',
      type: 'Subject Test',
      duration: '60 Mins',
      questions: 18,
      totalMarks: 60,
      status: 'Available',
      attempts: '8,420 Aspirants',
      difficulty: 'Moderate-Hard'
    },
    {
      id: 't3',
      title: 'Mathematics Sectional: Integral Calculus Marathon',
      type: 'Subject Test',
      duration: '60 Mins',
      questions: 18,
      totalMarks: 60,
      status: 'Available',
      attempts: '7,190 Aspirants',
      difficulty: 'JEE Advanced'
    },
    {
      id: 't4',
      title: 'Chemistry Sectional: Organic Synthesis Speed Test',
      type: 'Subject Test',
      duration: '45 Mins',
      questions: 20,
      totalMarks: 60,
      status: 'Available',
      attempts: '9,340 Aspirants',
      difficulty: 'Speed & Accuracy'
    }
  ];

  const handleStartTest = (title: string) => {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#10B981', '#175A67', '#F59E0B']
    });
    alert(`Launching Real-Time CBT Simulation: "${title}". Initializing secure exam sandbox...`);
  };

  const filteredTests = tests.filter(t => {
    if (activeTab === 'live') return t.live;
    if (activeTab === 'completed') return false;
    return true;
  });

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Banner */}
      <div className="rounded-2xl bg-[#EAE3DE]/40 border border-[#175A67]/20 p-5 sm:p-7 backdrop-blur-md shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-white/50 hover:bg-white/80 border border-[#175A67]/20 text-[#175A67] transition-all"
              title="Back to Study Central"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#175A67]">All-India CBT Test Series</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] border border-[#10B981]/30 text-[10px] font-bold">
                  NTA ENGINE READY
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#2A707C] mt-0.5">
                Simulate authentic CBT conditions with instant percentile rank & weak point diagnostic.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {(['all', 'live'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                  activeTab === tab
                    ? 'bg-[#175A67] text-white shadow-sm'
                    : 'bg-white/50 text-[#175A67] hover:bg-white/80'
                }`}
              >
                {tab === 'all' ? 'All Tests' : '🔴 Live Now'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Test Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {filteredTests.map((test) => (
          <div
            key={test.id}
            className="rounded-2xl bg-[#EAE3DE]/35 hover:bg-[#EAE3DE]/50 border border-[#175A67]/20 p-5 sm:p-6 backdrop-blur-md shadow-sm flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-white/60 text-[#175A67] border border-[#175A67]/20 text-[10px] font-bold">
                  {test.type}
                </span>
                {test.live ? (
                  <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/20 text-[#059669] border border-[#10B981]/40 text-[10px] font-black animate-pulse flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
                    LIVE NOW
                  </span>
                ) : (
                  <span className="text-[11px] text-[#2A707C] font-semibold">{test.status}</span>
                )}
              </div>

              <h3 className="text-base sm:text-lg font-bold text-[#175A67] leading-snug">{test.title}</h3>

              <div className="grid grid-cols-3 gap-2 mt-4 p-3 rounded-xl bg-white/40 border border-[#175A67]/15 text-center">
                <div>
                  <div className="text-[10px] text-[#2A707C] uppercase font-bold">Duration</div>
                  <div className="text-xs font-bold text-[#175A67] mt-0.5">{test.duration}</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#2A707C] uppercase font-bold">Questions</div>
                  <div className="text-xs font-bold text-[#175A67] mt-0.5">{test.questions} Qs</div>
                </div>
                <div>
                  <div className="text-[10px] text-[#2A707C] uppercase font-bold">Marks</div>
                  <div className="text-xs font-bold text-[#175A67] mt-0.5">{test.totalMarks} M</div>
                </div>
              </div>

              <div className="flex items-center justify-between mt-3 text-xs text-[#2A707C]">
                <span>{test.attempts}</span>
                <span className="font-semibold text-[#175A67]">{test.difficulty}</span>
              </div>
            </div>

            <button
              onClick={() => handleStartTest(test.title)}
              className="mt-5 w-full py-2.5 rounded-xl bg-[#175A67] hover:bg-[#124853] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Start CBT Exam</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
