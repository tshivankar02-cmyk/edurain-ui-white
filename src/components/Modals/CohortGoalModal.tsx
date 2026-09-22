import React, { useEffect, useState } from 'react';
import {
  X,
  CheckCircle2,
  ArrowRight,
  Info,
  ChevronRight,
  GraduationCap,
  Stethoscope,
  Landmark,
  ShieldCheck,
  Medal,
  BookOpenCheck,
  School,
  Briefcase,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export type GoalId = 'iit-jee' | 'neet' | 'upsc' | 'govt-exams' | string;

interface GoalOption {
  id: GoalId;
  title: string;
  subtitle: string;
  icon: React.ComponentType<{ className?: string }>;
}

interface CohortGoalModalProps {
  isOpen: boolean;
  onClose: () => void;
  activeGoal: GoalId;
  onConfirm: (goal: GoalId) => void;
}

/* ------------------------------------------------------------------ */
/*  Data                                                               */
/* ------------------------------------------------------------------ */

const POPULAR_TARGETS: GoalOption[] = [
  { id: 'iit-jee', title: 'IIT-JEE', subtitle: 'Class 11, 12, Repeater', icon: GraduationCap },
  { id: 'neet', title: 'NEET', subtitle: 'UG Medical Entrance', icon: Stethoscope },
  { id: 'upsc', title: 'UPSC', subtitle: 'CSE / State PSCs', icon: Landmark },
  { id: 'govt-exams', title: 'Govt. Exams', subtitle: 'SSC, Railways, Defence', icon: ShieldCheck },
];

const EXPLORE_STREAMS: GoalOption[] = [
  { id: 'engineering-medical', title: 'Engineering & Medical Exams', subtitle: '(UG & PG)', icon: GraduationCap },
  { id: 'college-entrance', title: 'College Entrance Exams', subtitle: '(CUET, BBA, Law)', icon: School },
  { id: 'schools-olympiads', title: 'Schools, Boards & Olympiads', subtitle: '(Class 6-12)', icon: Medal },
  { id: 'govt-jobs', title: 'All Government Job Exams', subtitle: '(State & Center)', icon: ShieldCheck },
  { id: 'ca-cs-banking', title: 'CA, CS, Banking & Finance', subtitle: '(Commerce)', icon: Briefcase },
  { id: 'net-teacher', title: 'NET Exams & Teacher Training', subtitle: '(UGC, CTET)', icon: BookOpenCheck },
];

const EXPLORE_ICON_STYLES: Record<string, string> = {
  'engineering-medical': 'bg-emerald-50 text-emerald-600',
  'college-entrance': 'bg-violet-50 text-violet-600',
  'schools-olympiads': 'bg-emerald-50 text-emerald-600',
  'govt-jobs': 'bg-rose-50 text-rose-500',
  'ca-cs-banking': 'bg-amber-50 text-amber-600',
  'net-teacher': 'bg-amber-50 text-amber-600',
};

const GOAL_LABELS: Record<string, string> = {
  'iit-jee': 'IIT-JEE',
  neet: 'NEET',
  upsc: 'UPSC',
  'govt-exams': 'Govt. Exams',
  'engineering-medical': 'Engineering & Medical Exams',
  'college-entrance': 'College Entrance Exams',
  'schools-olympiads': 'Schools, Boards & Olympiads',
  'govt-jobs': 'All Government Job Exams',
  'ca-cs-banking': 'CA, CS, Banking & Finance',
  'net-teacher': 'NET Exams & Teacher Training',
};

/* ------------------------------------------------------------------ */
/*  Main modal                                                         */
/* ------------------------------------------------------------------ */

export function CohortGoalModal({ isOpen, onClose, activeGoal, onConfirm }: CohortGoalModalProps) {
  const [selectedGoal, setSelectedGoal] = useState<GoalId>(activeGoal);

  // Reset the draft selection to the active goal every time the modal opens
  useEffect(() => {
    if (isOpen) setSelectedGoal(activeGoal);
  }, [isOpen, activeGoal]);

  if (!isOpen) return null;

  const activeLabel = GOAL_LABELS[activeGoal] ?? activeGoal;

  const handleConfirm = () => {
    onConfirm(selectedGoal);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-2xl max-h-[90vh] bg-white rounded-3xl shadow-2xl flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 sm:px-7 pt-6 pb-5 shrink-0 relative">
          <button
            onClick={onClose}
            className="absolute top-5 right-5 w-8 h-8 rounded-full bg-[#EAF3F1] hover:bg-[#dcece7] text-[#175A67] flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          <span className="inline-flex items-center gap-1.5 text-[11px] font-bold bg-emerald-50 text-emerald-600 px-2.5 py-1 rounded-full">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            Adaptive Learning Path
          </span>

          <h2 className="text-xl sm:text-2xl font-bold text-[#0C2E35] mt-3">Select your Goal</h2>
          <p className="text-xs sm:text-sm text-[#64748B] mt-1.5 max-w-lg">
            Choose your primary target exam to personalize your syllabus, diagnostic tests, and ranker notes.
          </p>
        </div>

        {/* Body */}
        <div className="overflow-y-auto px-6 sm:px-7 pb-2 flex-1">
          {/* Popular targets */}
          <div className="flex items-center justify-between mb-3">
            <span className="text-[11px] font-semibold text-[#94A3B8] uppercase tracking-wide">Popular Targets</span>
            <span className="text-[11px] font-semibold text-emerald-600 text-[#0F766ECC]">Active Target: {activeLabel}</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
            {POPULAR_TARGETS.map((target) => {
              const isSelected = selectedGoal === target.id;
              return (
                <button
                  key={target.id}
                  onClick={() => setSelectedGoal(target.id)}
                  className={`relative text-left rounded-2xl p-4 border-2 transition-all ${
                    isSelected
                      ? 'bg-[#0F3B42] border-[#0F3B42] shadow-md'
                      : 'bg-white border-[#EAF3F1] hover:border-[#175A67]/20'
                  }`}
                >
                  {isSelected && (
                    <span className="absolute top-2.5 right-2.5 w-4 h-4 rounded-full bg-emerald-400 flex items-center justify-center">
                      <CheckCircle2 className="w-3.5 h-3.5 text-white" />
                    </span>
                  )}
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center mb-3 ${
                      isSelected ? 'bg-white/15 text-white' : 'bg-[#EAF3F1] text-[#175A67]'
                    }`}
                  >
                    <target.icon className="w-4.5 h-4.5" />
                  </div>
                  <p className={`font-semibold text-sm ${isSelected ? 'text-white' : 'text-[#0C2E35]'}`}>{target.title}</p>
                  <p className={`text-[11px] mt-0.5 ${isSelected ? 'text-white/70' : 'text-[#64748B]'}`}>{target.subtitle}</p>
                </button>
              );
            })}
          </div>

          {/* Explore all streams */}
          <span className="text-[11px] font-bold text-[#2A707C] uppercase tracking-wide">Explore All Streams</span>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-3 mb-2">
            {EXPLORE_STREAMS.map((stream) => {
              const isSelected = selectedGoal === stream.id;
              return (
                <button
                  key={stream.id}
                  onClick={() => setSelectedGoal(stream.id)}
                  className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-3 border transition-all text-left ${
                    isSelected ? 'bg-[#EAF3F1] border-[#175A67]/30' : 'bg-white border-[#EAF3F1] hover:bg-[#EAF3F1]/50'
                  }`}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${EXPLORE_ICON_STYLES[stream.id]}`}>
                      <stream.icon className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="font-semibold text-[#0C2E35] text-xs sm:text-sm truncate">
                        {stream.title} <span className="text-[#2A707C] font-medium">{stream.subtitle}</span>
                      </p>
                    </div>
                  </div>
                  <ChevronRight className="w-4 h-4 text-[#2A707C] shrink-0" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 sm:px-7 py-4 border-t border-[#EAF3F1] shrink-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <p className="flex items-center gap-1.5 text-[11px] text-[#2A707C]">
            <Info className="w-3.5 h-3.5 shrink-0" />
            You can switch your goal anytime from the top navigation.
          </p>
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button onClick={onClose} className="text-sm font-bold text-[#2A707C] hover:text-[#175A67] px-2 transition-colors">
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              className="flex items-center gap-2 bg-[#0F3B42] hover:bg-[#0b2c31] text-white font-bold text-sm px-5 py-2.5 rounded-xl shadow-sm transition-all active:scale-95"
            >
              Confirm &amp; Set Goal
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CohortGoalModal;
