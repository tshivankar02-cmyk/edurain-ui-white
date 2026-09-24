import React from 'react';
import {
  ArrowLeft,
  ArrowUp,
  ArrowRight,
  ShieldCheck,
  Info,
  CheckCircle2,
  Clock3,
  BarChart3,
  History,
  ChevronRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types & mock data                                                  */
/* ------------------------------------------------------------------ */

interface WeakSpot {
  id: string;
  rank: number;
  subject: string;
  topic: string;
  description: string;
  potentialMarks: number;
  drillCount: number;
}

const WEAK_SPOTS: WeakSpot[] = [
  {
    id: 'w1',
    rank: 1,
    subject: 'Chemistry',
    topic: 'Aldol Crossed Reactions & Coordination Isomers',
    description: 'Accuracy dropped to 48% on multi-correct problems. Review isomer counting edge-cases.',
    potentialMarks: 6,
    drillCount: 8,
  },
  {
    id: 'w2',
    rank: 2,
    subject: 'Mathematics',
    topic: 'Definite Integrals & Leibniz Rule',
    description: 'High solve latency (avg 4m 12s per question). Requires substitution shortcut drill.',
    potentialMarks: 8,
    drillCount: 6,
  },
];

interface PerformanceProjectionViewProps {
  onBack: () => void;
  onOpenSubjectBreakdown?: () => void;
  onOpenTestHistory?: () => void;
  onPracticeDrills?: (weakSpot: WeakSpot) => void;
}

/* ------------------------------------------------------------------ */
/*  Small shared bits                                                   */
/* ------------------------------------------------------------------ */

function StatBlock({ label, children, sub }: { label: string; children: React.ReactNode; sub: string }) {
  return (
    <div>
      <p className="text-[10px] font-semibold text-[#70787C] uppercase tracking-wide">{label}</p>
      <div className="mt-1">{children}</div>
      <p className="text-[11px] text-[#2A707C] mt-1">{sub}</p>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main view                                                           */
/* ------------------------------------------------------------------ */

export function PerformanceProjectionView({
  onBack,
  onOpenSubjectBreakdown,
  onOpenTestHistory,
  onPracticeDrills,
}: PerformanceProjectionViewProps) {
  return (
    <div className="bg-[#DCEAE3] rounded-[28px] p-4 sm:p-6 lg:p-8 pb-10 relative space-y-5">
      {/* Breadcrumb + title */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <button
            onClick={onBack}
            className="flex items-center gap-1 text-xs font-bold text-[#40484B] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            Back to Profile
          </button>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0B1C30] mt-1.5">Performance Projection</h1>
        </div>

        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2A707C] bg-white px-3.5 py-1.5 rounded-full shadow-sm">
          <Clock3 className="w-3.5 h-3.5" />
          Updated after Mock Test 5 &bull; Today at 14:30
        </span>
      </div>

      {/* Hero: AIR + qualification prob + baseline stats */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_6px_24px_rgb(0,0,0,0.05)]">
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5">
          <div>
            <p className="text-[10px] font-semibold text-[#70787C] uppercase tracking-wide">Estimated All India Rank (AIR)</p>
            <div className="flex items-center gap-3 flex-wrap mt-1.5">
              <h2 className="text-3xl sm:text-4xl font-black text-[#0B1C30]">
                AIR <span>1,420</span>
              </h2>
              <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
                <ArrowUp className="w-3.5 h-3.5" />
                +340 ranks since last mock
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#2A707C] mt-2">Puts you in the top 0.8% nationwide target band.</p>
          </div>

          <div className="shrink-0 bg-sky-50 border border-sky-100 rounded-2xl p-4 flex items-center gap-3 min-w-[240px]">
            <div className="w-9 h-9 rounded-xl bg-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck className="w-4.5 h-4.5 text-sky-600" />
            </div>
            <div className="min-w-0">
              <p className="text-[10px] font-bold text-sky-700 uppercase tracking-wide">IIT Qualification Prob.</p>
              <p className="text-sm font-bold text-[#0B1C30] mt-0.5">98.4% (Guaranteed Seat Band)</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6 pt-5 border-t border-[#175A67]/10">
          <StatBlock label="Score Baseline (Normalized)" sub="Average across last 3 papers">
            <p className="text-lg font-black text-[#0B1C30]">
              218 <span className="text-sm font-semibold text-[#70787C]">/ 300</span>
            </p>
          </StatBlock>

          <StatBlock label="Projected AIR Range" sub="90% confidence interval">
            <p className="text-lg font-black text-[#0B1C30]">1,180 &ndash; 1,650</p>
          </StatBlock>

          <StatBlock label="Distance to Top 1,000" sub="~3 additional correct questions">
            <p className="text-lg font-black text-[#10B981]">+12 marks</p>
          </StatBlock>
        </div>
      </div>

      {/* Prediction Accuracy & Baseline */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_6px_24px_rgb(0,0,0,0.05)]">
        <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div>
            <h3 className="font-bold text-[#0B1C30] text-sm sm:text-base">Prediction Accuracy &amp; Baseline</h3>
            <p className="text-xs text-[#2A707C] mt-0.5">Statistical validity calculated from real examination condition telemetry.</p>
          </div>
          <span className="flex items-center gap-1.5 text-[11px] font-bold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-full shrink-0">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            92% High Confidence
          </span>
        </div>

        <div className="flex items-center justify-between text-xs font-semibold text-[#40484B] mb-1.5">
          <span>Model Confidence Index</span>
          <span className="text-[#0B1C30] font-bold">92 / 100</span>
        </div>
        <div className="w-full h-2 rounded-full bg-[#175A67]/10 overflow-hidden">
          <div className="h-full bg-[#0F3B42] rounded-full transition-all duration-500" style={{ width: '92%' }} />
        </div>

        <div className="mt-4 bg-sky-50 border border-sky-100 rounded-xl px-4 py-3 flex items-start gap-2.5">
          <Info className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
          <p className="text-xs text-[#0B1C30] font-medium">
            High confidence &mdash; based on consistent timing and score variance across tests.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
          <div className="bg-[#EAF3F1]/70 rounded-2xl p-4">
            <p className="text-[10px] font-semibold text-[#70787C] uppercase tracking-wide">Data Basis</p>
            <p className="text-sm font-bold text-[#0B1C30] mt-1">5 full-length mock tests analyzed</p>
            <p className="flex items-center gap-1.5 text-[11px] text-[#2A707C] font-medium mt-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              All completed in supervised timed window
            </p>
          </div>

          <div className="bg-[#EAF3F1]/70 rounded-2xl p-4">
            <p className="text-[10px] font-semibold text-[#70787C] uppercase tracking-wide">Behavioral Metric</p>
            <p className="text-sm font-bold text-[#0B1C30] mt-1">Stable response latency &amp; low guesswork detected</p>
            <p className="flex items-center gap-1.5 text-[11px] text-[#2A707C] font-medium mt-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981] shrink-0" />
              4.8% negative mark ratio (well below national 14%)
            </p>
          </div>
        </div>
      </div>

      {/* Where to improve */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_6px_24px_rgb(0,0,0,0.05)]">
        <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
          <div>
            <h3 className="font-bold text-[#0B1C30] text-sm sm:text-base">Where to improve</h3>
            <p className="text-xs text-[#2A707C] mt-0.5">2 targeted weak spots to cross into the Top 1,000 threshold.</p>
          </div>
          <span className="text-[11px] font-bold text-[#175A67] bg-[#EAF3F1] px-3 py-1.5 rounded-full shrink-0">
            Target: AIR &lt; 1,000
          </span>
        </div>

        <div className="space-y-3">
          {WEAK_SPOTS.map((spot) => (
            <div
              key={spot.id}
              className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-[#175A67]/10 hover:border-[#175A67]/20 bg-[#F8FAFC] hover:bg-white transition-all p-4"
            >
              <div className="flex items-start gap-3 min-w-0">
                <div className="w-6 h-6 rounded-full bg-[#0F3B42] text-white text-[11px] font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {spot.rank}
                </div>
                <div className="min-w-0">
                  <p className="font-bold text-[#0B1C30] text-sm">
                    {spot.subject} <span className="text-[#70787C] font-semibold">&bull;</span> {spot.topic}
                  </p>
                  <p className="text-xs text-[#2A707C] mt-1 leading-relaxed">{spot.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5 shrink-0 sm:pl-3">
                <span className="text-[11px] font-bold text-amber-700 bg-amber-100 px-2.5 py-1 rounded-full whitespace-nowrap">
                  Potential: +{spot.potentialMarks} marks
                </span>
                <button
                  onClick={() => onPracticeDrills?.(spot)}
                  className="flex items-center gap-1 text-xs font-bold text-[#175A67] hover:underline whitespace-nowrap"
                >
                  Practice {spot.drillCount} drills
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 mt-5">
          <button
            onClick={onOpenSubjectBreakdown}
            className="flex items-center justify-center gap-1.5 bg-[#0F3B42] hover:bg-[#0b2c31] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95"
          >
            <BarChart3 className="w-3.5 h-3.5" />
            View breakdown by subject
          </button>
          <button
            onClick={onOpenTestHistory}
            className="flex items-center justify-center gap-1.5 bg-white hover:bg-[#EAF3F1] text-[#175A67] border border-[#175A67]/25 font-bold text-xs px-4 py-2.5 rounded-xl transition-all active:scale-95"
          >
            <History className="w-3.5 h-3.5" />
            Test history
          </button>
        </div>
      </div>
    </div>
  );
}

export default PerformanceProjectionView;
