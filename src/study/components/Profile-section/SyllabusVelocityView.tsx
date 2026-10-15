import React from 'react';
import {
  ArrowLeft,
  ChevronRight,
  TrendingUp,
  BarChart3,
  ShieldCheck,
  NotebookPen,
  ArrowRight,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types & mock data                                                  */
/* ------------------------------------------------------------------ */

interface SubjectProgress {
  id: string;
  subject: string;
  scopeLabel: string;
  completedChapters: number;
  totalChapters: number;
  percent: number;
  needsBoost?: boolean;
}

const SUBJECT_BREAKDOWN: SubjectProgress[] = [
  {
    id: 'physics',
    subject: 'Physics',
    scopeLabel: 'Mechanics, Electrodynamics & Optics',
    completedChapters: 23,
    totalChapters: 31,
    percent: 74,
  },
  {
    id: 'maths',
    subject: 'Mathematics',
    scopeLabel: 'Calculus, Vectors & Coordinate Geometry',
    completedChapters: 18,
    totalChapters: 26,
    percent: 69,
  },
  {
    id: 'chemistry',
    subject: 'Chemistry',
    scopeLabel: 'Organic Chemistry & Thermodynamics',
    completedChapters: 14,
    totalChapters: 23,
    percent: 62,
    needsBoost: true,
  },
];

interface SyllabusVelocityViewProps {
  onBack: () => void;
  onViewChapterChecklist?: () => void;
  onOpenRevisionPlan?: () => void;
  onOpenSubject?: (subject: SubjectProgress) => void;
}

/* ------------------------------------------------------------------ */
/*  Main view                                                           */
/* ------------------------------------------------------------------ */

export function SyllabusVelocityView({
  onBack,
  onViewChapterChecklist,
  onOpenRevisionPlan,
  onOpenSubject,
}: SyllabusVelocityViewProps) {
  return (
    <div className="bg-[#DCEAE3] rounded-[28px] p-4 sm:p-6 lg:p-8 pb-10 relative space-y-5">
      {/* Breadcrumb + title */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold">
            <button onClick={onBack} className="flex items-center gap-1 text-[#40484B] hover:underline">
              <ArrowLeft className="w-3.5 h-3.5" />
              Study Plan
            </button>
            <ChevronRight className="w-3.5 h-3.5 text-[#40484B]" />
            <span className="text-[#40484B]">Syllabus Velocity</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-semibold text-[#0B1C30] mt-1.5">Syllabus Coverage &amp; Pacing</h1>
        </div>

        <span className="flex items-center gap-1.5 text-[11px] font-semibold text-[#2A707C] bg-white px-3.5 py-1.5 rounded-full shadow-sm">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          Updated today at 14:30
          <span className="text-[#175A67]/30">&bull;</span>
          <span className="text-[#0F766E] font-bold">14 days ahead</span>
          of average qualifier pace
        </span>
      </div>

      {/* Total velocity + weekly throughput */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Total Syllabus Velocity */}
        <div className="lg:col-span-2 bg-white rounded-2xl p-5 sm:p-6 shadow-[0_6px_24px_rgb(0,0,0,0.05)]">
          <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
            <p className="text-[10px] font-semibold text-[#70787C] uppercase tracking-wide">Total Syllabus Velocity</p>
            <span className="text-[11px] font-bold text-sky-700 bg-sky-50 px-2.5 py-1 rounded-full">JEE Advanced '26 Scope</span>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <h2 className="text-3xl sm:text-4xl font-black text-[#0B1C30]">
              68.4% <span className="text-sm font-semibold text-[#70787C]">completed</span>
            </h2>
            <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">
              <TrendingUp className="w-3.5 h-3.5" />
              +4.2% pace vs baseline
            </span>
          </div>

          <div className="w-full h-2.5 rounded-full bg-[#175A67]/10 overflow-hidden mt-4">
            <div className="h-full bg-[#0F3B42] rounded-full transition-all duration-500" style={{ width: '68.4%' }} />
          </div>

          <div className="flex items-center justify-between flex-wrap gap-2 mt-3 text-xs">
            <span className="text-[#2A707C] font-medium">On track for full syllabus wrap by Dec 15, 2026.</span>
            <span className="font-bold text-[#0B1C30]">55 of 80 Total Modules Finished</span>
          </div>
        </div>

        {/* Weekly Throughput */}
        <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_6px_24px_rgb(0,0,0,0.05)]">
          <p className="text-[10px] font-semibold text-[#70787C] uppercase tracking-wide mb-3">Weekly Throughput</p>

          <div className="space-y-2.5 text-xs sm:text-sm">
            <div className="flex items-center justify-between">
              <span className="text-[#2A707C] font-medium">Target Velocity:</span>
              <span className="font-bold text-[#0B1C30]">2.5 chapters / wk</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#2A707C] font-medium">Current Rate:</span>
              <span className="font-bold text-[#0F766E]">3.1 chapters / wk</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[#2A707C] font-medium">Estimated Finish:</span>
              <span className="font-bold text-[#0B1C30]">11 weeks left</span>
            </div>
          </div>

          <p className="text-[11px] text-[#0F766E] font-semibold mt-4">Pacing efficiency is currently at +124%</p>
        </div>
      </div>

      {/* Subject breakdown */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_6px_24px_rgb(0,0,0,0.05)]">
        <div className="flex items-center justify-between flex-wrap gap-3 mb-5">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-[#175A67]" />
            <h3 className="font-bold text-[#0B1C30] text-sm sm:text-base">Subject Breakdown</h3>
            <span className="text-xs text-[#2A707C] font-medium">(PCM Distribution &amp; Sub-Units)</span>
          </div>
          <div className="flex items-center gap-4 text-xs">
            <span className="text-[#2A707C] font-medium">
              Overall Target: <span className="font-bold text-[#0B1C30]">75% by Oct 15</span>
            </span>
            <span className="flex items-center gap-1.5 font-bold text-[#0F766E]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
              55/80 Total Completed
            </span>
          </div>
        </div>

        <div className="space-y-5">
          {SUBJECT_BREAKDOWN.map((subject) => (
            <button
              key={subject.id}
              onClick={() => onOpenSubject?.(subject)}
              className="w-full text-left group"
            >
              <div className="flex items-center justify-between flex-wrap gap-2 mb-1.5">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-[#0B1C30] text-sm group-hover:underline">{subject.subject}</span>
                  <span className="text-xs text-[#2A707C] font-medium">({subject.scopeLabel})</span>
                  {subject.needsBoost && (
                    <span className="text-[10px] font-bold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full">
                      NEEDS BOOST
                    </span>
                  )}
                </div>
                <span className="text-xs text-[#2A707C] font-medium shrink-0">
                  {subject.completedChapters} of {subject.totalChapters} chapters{' '}
                  <span className="font-bold text-[#0B1C30]">{subject.percent}%</span>
                </span>
              </div>

              <div className="w-full h-2 rounded-full bg-[#175A67]/10 overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    subject.needsBoost ? 'bg-[#10B981]' : 'bg-[#0F3B42]'
                  }`}
                  style={{ width: `${subject.percent}%` }}
                />
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Velocity Benchmark */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_6px_24px_rgb(0,0,0,0.05)]">
        <div className="flex items-center gap-2 mb-3">
          <ShieldCheck className="w-4 h-4 text-[#0F766E]" />
          <h3 className="text-xs sm:text-sm font-bold text-[#0F766E] uppercase tracking-wide">Velocity Benchmark</h3>
        </div>

        <p className="text-xs sm:text-sm text-[#0B1C30] leading-relaxed">
          At 68.4%, your preparation pace is{' '}
          <span className="font-bold text-[#0F766E]">14 days ahead</span> of JEE Advanced qualifying candidates.
          Maintain 3 chapters/week to secure a 40-day revision runway.
        </p>

        <p className="flex items-center gap-1.5 text-[11px] font-semibold text-[#0F766E] mt-3">
          <span className="w-1.5 h-1.5 rounded-full bg-[#10B981]" />
          Revision Runway: 42 Days reserved pre-exam
        </p>
      </div>

      {/* Today's cycle CTA */}
      <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-[0_6px_24px_rgb(0,0,0,0.05)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-9 h-9 rounded-xl bg-[#EAF3F1] flex items-center justify-center shrink-0">
            <NotebookPen className="w-4.5 h-4.5 text-[#175A67]" />
          </div>
          <div className="min-w-0">
            <p className="font-bold text-[#0B1C30] text-sm">Ready for today's syllabus cycle?</p>
            <p className="text-xs text-[#70787C] mt-0.5 truncate">
              Recommended focus: Aldehydes, Ketones &amp; Carboxylic Acids (Unit 12)
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={onViewChapterChecklist}
            className="bg-white hover:bg-[#EAF3F1] text-[#175A67] border border-[#175A67]/25 font-bold text-xs px-4 py-2.5 rounded-xl transition-all active:scale-95 whitespace-nowrap"
          >
            View Chapter Checklist
          </button>
          <button
            onClick={onOpenRevisionPlan}
            className="flex items-center gap-1.5 bg-[#0F3B42] hover:bg-[#0b2c31] text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-sm transition-all active:scale-95 whitespace-nowrap"
          >
            Open Chemistry Revision Plan
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default SyllabusVelocityView;
