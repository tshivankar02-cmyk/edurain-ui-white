import React from 'react';
import { BookOpen, Play, CheckCircle2, Clock, Users, ArrowRight, ArrowLeft } from 'lucide-react';

interface CoursesViewProps {
  onBack: () => void;
  onOpenUpgrade: () => void;
}

export const CoursesView: React.FC<CoursesViewProps> = ({ onBack, onOpenUpgrade }) => {
  const activeCourses = [
    {
      id: 'c1',
      title: 'JEE Advanced Physics Masterclass (Mechanics to Modern Physics)',
      instructor: 'Dr. Arvind Sharma (AIR 14 IIT Kharagpur)',
      progress: 68,
      totalLectures: 48,
      completedLectures: 32,
      currentTopic: 'Lecture 33: Coupled Oscillations & Resonance',
      batch: '12th - IIT JEE',
      badge: 'In Progress'
    },
    {
      id: 'c2',
      title: 'Integral & Differential Calculus Rank Booster',
      instructor: 'Prof. Rajesh K. (Ex-IIT Delhi Faculty)',
      progress: 82,
      totalLectures: 36,
      completedLectures: 29,
      currentTopic: 'Lecture 30: Area Under Curves (Advanced Traps)',
      batch: '12th - IIT JEE',
      badge: 'In Progress'
    },
    {
      id: 'c3',
      title: 'Organic Chemistry Synthesis & Reaction Mechanisms',
      instructor: 'Aman Singhal (100 Percentile Chemistry)',
      progress: 54,
      totalLectures: 40,
      completedLectures: 22,
      currentTopic: 'Lecture 23: Aldol & Cannizzaro Crossed Reactions',
      batch: '12th - IIT JEE',
      badge: 'In Progress'
    }
  ];

  return (
    <div className="space-y-6 pb-20 animate-fadeIn">
      {/* Top Banner */}
      <div className="rounded-2xl bg-white/60 backdrop-blur-md border border-white/80 p-5 sm:p-7 shadow-[0_8px_30px_rgb(0,0,0,0.05)]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-2 rounded-xl bg-white/60 hover:bg-white/90 border border-white/80 text-[#175A67] transition-all shadow-sm"
              title="Back to Study Central"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-bold text-[#175A67]">Your Enrolled Courses</h1>
                <span className="px-2.5 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] border border-[#10B981]/30 text-[10px] font-bold">
                  3 ACTIVE
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#2A707C] mt-0.5 font-medium">
                Live & recorded syllabus tracks tailored for Target IIT-JEE Advanced.
              </p>
            </div>
          </div>

          <button
            onClick={onOpenUpgrade}
            className="self-start sm:self-auto px-4 py-2 rounded-xl bg-[#175A67] hover:bg-[#124853] text-white text-xs font-bold transition-all shadow-sm flex items-center gap-1.5"
          >
            <span>Explore All 42+ Batches</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {activeCourses.map((course) => (
          <div
            key={course.id}
            className="rounded-2xl bg-white/60 hover:bg-white/85 backdrop-blur-md border border-white/80 p-5 shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.09)] flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-white/70 text-[#175A67] border border-white/80 text-[10px] font-bold">
                  {course.batch}
                </span>
                <span className="text-[11px] text-[#10B981] font-bold">{course.progress}% Completed</span>
              </div>

              <h3 className="text-base font-bold text-[#175A67] leading-snug">{course.title}</h3>
              <p className="text-xs text-[#2A707C] mt-1 font-medium">{course.instructor}</p>

              <div className="mt-4 p-3 rounded-xl bg-white/60 border border-slate-200/60 backdrop-blur-sm">
                <div className="text-[10px] text-[#2A707C] uppercase font-bold tracking-wider">Current Topic</div>
                <div className="text-xs font-semibold text-[#175A67] mt-0.5">{course.currentTopic}</div>
              </div>

              <div className="mt-4 space-y-1.5">
                <div className="flex justify-between text-[11px] text-[#2A707C] font-medium">
                  <span>Progress</span>
                  <span>{course.completedLectures} / {course.totalLectures} Lectures</span>
                </div>
                <div className="w-full bg-[#175A67]/15 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-[#10B981] h-2 rounded-full transition-all duration-500" 
                    style={{ width: `${course.progress}%` }} 
                  />
                </div>
              </div>
            </div>

            <button
              onClick={() => alert(`Resuming: ${course.currentTopic}`)}
              className="mt-5 w-full py-2.5 rounded-xl bg-[#175A67] hover:bg-[#124853] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-white" />
              <span>Resume Lecture</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
