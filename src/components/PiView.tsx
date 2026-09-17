import React, { useState, useMemo, useRef, useEffect } from 'react';
import {
  Search,
  Play,
  Trophy,
  Wallet,
  Zap,
  Brain,
  Sparkles,
  IndianRupee,
  Star,
  ChevronLeft,
  ChevronRight,
  X,
  CheckCircle2,
  Lock,
  Clock,
  Flame,
  Gift,
  ArrowRight,
  TrendingUp,
  Coins,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Category = 'IIT-JEE' | 'NEET' | 'UPSC';

interface PiCourse {
  id: string;
  title: string;
  category: Category;
  instructor: string;
  subject: string;
  lessons: number;
  duration: string;
  priceINR: number;
  rating: number;
  enrolled: string;
  progress?: number;
  gradient: string;
  isNew?: boolean;
}

interface GameDef {
  id: 'quiz' | 'reflex' | 'spin';
  title: string;
  tagline: string;
  icon: React.ComponentType<{ className?: string }>;
  reward: string;
  accent: string;
}

interface PiViewProps {
  onOpenUpgrade: () => void;
  onOpenDoubtSolver: () => void;
}

/* ------------------------------------------------------------------ */
/*  Dummy content                                                      */
/* ------------------------------------------------------------------ */

const COURSES: PiCourse[] = [
  // IIT-JEE
  { id: 'c1', title: 'Rotational Dynamics Mastery', category: 'IIT-JEE', instructor: 'Er. Kabir Rana', subject: 'Physics', lessons: 42, duration: '18h 20m', priceINR: 149, rating: 4.8, enrolled: '18.2k', progress: 62, gradient: 'from-teal-600 to-emerald-500' },
  { id: 'c2', title: 'Organic Reactions Vault', category: 'IIT-JEE', instructor: 'Dr. Neha Kapoor', subject: 'Chemistry', lessons: 55, duration: '24h 10m', priceINR: 199, rating: 4.9, enrolled: '22.5k', gradient: 'from-sky-600 to-teal-500' },
  { id: 'c3', title: 'Calculus for Advanced', category: 'IIT-JEE', instructor: 'Prof. Amit Verma', subject: 'Mathematics', lessons: 38, duration: '16h 45m', priceINR: 129, rating: 4.7, enrolled: '15.9k', progress: 21, gradient: 'from-emerald-600 to-teal-500' },
  { id: 'c4', title: 'Electrostatics from Zero', category: 'IIT-JEE', instructor: 'Er. Kabir Rana', subject: 'Physics', lessons: 30, duration: '14h 05m', priceINR: 99, rating: 4.6, enrolled: '11.3k', isNew: true, gradient: 'from-cyan-600 to-teal-500' },

  // NEET
  { id: 'n1', title: 'Human Physiology Deep Dive', category: 'NEET', instructor: 'Dr. Ritu Sharma', subject: 'Biology', lessons: 60, duration: '28h 30m', priceINR: 179, rating: 4.9, enrolled: '31.4k', progress: 45, gradient: 'from-emerald-600 to-lime-500' },
  { id: 'n2', title: 'Genetics & Evolution Sprint', category: 'NEET', instructor: 'Dr. Ritu Sharma', subject: 'Biology', lessons: 34, duration: '15h 00m', priceINR: 149, rating: 4.8, enrolled: '19.7k', gradient: 'from-teal-600 to-green-500' },
  { id: 'n3', title: 'Chemical Bonding NEET Edition', category: 'NEET', instructor: 'Dr. Neha Kapoor', subject: 'Chemistry', lessons: 28, duration: '12h 40m', priceINR: 99, rating: 4.7, enrolled: '14.1k', isNew: true, gradient: 'from-sky-600 to-emerald-500' },
  { id: 'n4', title: 'NEET Physics Crash Course', category: 'NEET', instructor: 'Er. Kabir Rana', subject: 'Physics', lessons: 25, duration: '11h 15m', priceINR: 129, rating: 4.6, enrolled: '9.8k', progress: 80, gradient: 'from-teal-500 to-cyan-500' },

  // UPSC
  { id: 'u1', title: 'Indian Polity Foundations', category: 'UPSC', instructor: 'Ms. Anjali Rao', subject: 'GS Paper II', lessons: 48, duration: '22h 00m', priceINR: 199, rating: 4.9, enrolled: '27.6k', progress: 33, gradient: 'from-amber-600 to-teal-600' },
  { id: 'u2', title: 'Modern History Timeline', category: 'UPSC', instructor: 'Mr. Suresh Iyer', subject: 'GS Paper I', lessons: 40, duration: '19h 50m', priceINR: 149, rating: 4.8, enrolled: '20.3k', gradient: 'from-teal-600 to-amber-500' },
  { id: 'u3', title: 'Ethics & Case Studies', category: 'UPSC', instructor: 'Ms. Anjali Rao', subject: 'GS Paper IV', lessons: 22, duration: '10h 30m', priceINR: 99, rating: 4.7, enrolled: '12.8k', isNew: true, gradient: 'from-emerald-600 to-amber-500' },
  { id: 'u4', title: 'Indian Economy Essentials', category: 'UPSC', instructor: 'Mr. Suresh Iyer', subject: 'GS Paper III', lessons: 36, duration: '17h 20m', priceINR: 169, rating: 4.8, enrolled: '16.5k', gradient: 'from-teal-600 to-lime-500' },
];

const TOP_TEN = [
  { rank: 1, title: 'Rotational Dynamics Mastery', category: 'IIT-JEE' as Category, stat: '18.2k enrolled this week' },
  { rank: 2, title: 'Human Physiology Deep Dive', category: 'NEET' as Category, stat: '15.7k enrolled this week' },
  { rank: 3, title: 'Indian Polity Foundations', category: 'UPSC' as Category, stat: '12.4k enrolled this week' },
  { rank: 4, title: 'Organic Reactions Vault', category: 'IIT-JEE' as Category, stat: '11.9k enrolled this week' },
  { rank: 5, title: 'Genetics & Evolution Sprint', category: 'NEET' as Category, stat: '9.6k enrolled this week' },
  { rank: 6, title: 'Modern History Timeline', category: 'UPSC' as Category, stat: '8.8k enrolled this week' },
  { rank: 7, title: 'Calculus for Advanced', category: 'IIT-JEE' as Category, stat: '7.2k enrolled this week' },
  { rank: 8, title: 'Chemical Bonding NEET Edition', category: 'NEET' as Category, stat: '6.5k enrolled this week' },
  { rank: 9, title: 'Ethics & Case Studies', category: 'UPSC' as Category, stat: '5.9k enrolled this week' },
  { rank: 10, title: 'Electrostatics from Zero', category: 'IIT-JEE' as Category, stat: '5.1k enrolled this week' },
];

const GAMES: GameDef[] = [
  { id: 'quiz', title: 'Speed Quiz', tagline: '5 rapid-fire questions, 25 pts each', icon: Brain, reward: 'Up to 125 pts', accent: 'from-teal-600 to-emerald-500' },
  { id: 'reflex', title: 'Reflex Tap', tagline: 'Tap the instant it turns green', icon: Zap, reward: 'Up to 100 pts', accent: 'from-amber-500 to-teal-600' },
  { id: 'spin', title: 'Daily Spin', tagline: 'One free spin, guaranteed reward', icon: Gift, reward: '10 – 100 pts', accent: 'from-emerald-500 to-sky-600' },
];

const QUIZ_QUESTIONS = [
  { q: 'What is the SI unit of electric resistance?', options: ['Ohm', 'Henry', 'Farad', 'Tesla'], correct: 0 },
  { q: 'Which organelle is the "powerhouse of the cell"?', options: ['Ribosome', 'Golgi body', 'Mitochondria', 'Lysosome'], correct: 2 },
  { q: 'The Indian Constitution was adopted on?', options: ['15 Aug 1947', '26 Jan 1950', '26 Nov 1949', '2 Oct 1950'], correct: 2 },
  { q: 'What is the derivative of sin(x)?', options: ['cos(x)', '-cos(x)', 'tan(x)', '-sin(x)'], correct: 0 },
  { q: 'Which gas is released during photosynthesis?', options: ['Carbon dioxide', 'Nitrogen', 'Oxygen', 'Hydrogen'], correct: 2 },
];

const CATEGORIES: Category[] = ['IIT-JEE', 'NEET', 'UPSC'];
const POINTS_PER_RUPEE = 10; // 10 points = ₹1

/* ------------------------------------------------------------------ */
/*  Small shared bits                                                  */
/* ------------------------------------------------------------------ */

function SectionHeader({
  icon: Icon,
  title,
  action,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-2.5">
        <Icon className="w-5 h-5 text-[#175A67]" />
        <h2 className="text-lg sm:text-xl font-bold text-[#175A67]">{title}</h2>
      </div>
      {action}
    </div>
  );
}

function ScrollRow({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: 'left' | 'right') => {
    ref.current?.scrollBy({ left: dir === 'left' ? -320 : 320, behavior: 'smooth' });
  };
  return (
    <div className="relative group/row">
      <div ref={ref} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-1">
        {children}
      </div>
      <button
        onClick={() => scroll('left')}
        className="hidden lg:flex absolute -left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-white shadow-md items-center justify-center text-[#175A67] opacity-0 group-hover/row:opacity-100 transition-opacity"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>
      <button
        onClick={() => scroll('right')}
        className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-white/90 border border-white shadow-md items-center justify-center text-[#175A67] opacity-0 group-hover/row:opacity-100 transition-opacity"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}

function CourseCard({
  course,
  owned,
  onBuy,
}: {
  course: PiCourse;
  owned: boolean;
  onBuy: (course: PiCourse) => void;
}) {
  return (
    <div className="shrink-0 w-[230px] sm:w-[250px] bg-white/60 hover:bg-white/85 backdrop-blur-md border border-white/80 rounded-2xl overflow-hidden shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.09)] transition-all duration-300 hover:-translate-y-1">
      <div className={`relative h-28 bg-gradient-to-br ${course.gradient} flex items-center justify-center`}>
        <Play className="w-9 h-9 text-white/90 fill-white/20" />
        {course.isNew && (
          <span className="absolute top-2 left-2 text-[10px] font-bold bg-white/90 text-[#175A67] px-2 py-0.5 rounded-full">NEW</span>
        )}
        <span className="absolute top-2 right-2 text-[10px] font-bold bg-black/30 text-white px-2 py-0.5 rounded-full backdrop-blur-sm">{course.subject}</span>
        {typeof course.progress === 'number' && (
          <div className="absolute bottom-0 left-0 right-0 h-1.5 bg-black/20">
            <div className="h-full bg-[#10B981]" style={{ width: `${course.progress}%` }} />
          </div>
        )}
      </div>
      <div className="p-3.5">
        <h3 className="font-bold text-[#175A67] text-sm leading-snug line-clamp-2 min-h-[2.5rem]">{course.title}</h3>
        <p className="text-[11px] text-[#2A707C] mt-0.5">{course.instructor}</p>
        <div className="flex items-center gap-1 mt-1.5 text-[11px] text-[#2A707C]">
          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
          <span className="font-semibold text-[#175A67]">{course.rating}</span>
          <span>· {course.lessons} lessons · {course.duration}</span>
        </div>
        <div className="flex items-center justify-between mt-3">
          {owned ? (
            <span className="text-xs font-bold text-[#10B981] flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Enrolled
            </span>
          ) : (
            <span className="text-sm font-bold text-[#175A67] flex items-center">
              <IndianRupee className="w-3.5 h-3.5" />{course.priceINR}
            </span>
          )}
          {!owned && (
            <button
              onClick={() => onBuy(course)}
              className="text-[11px] font-bold bg-[#175A67] hover:bg-[#124853] text-white px-3 py-1.5 rounded-lg transition-all active:scale-95"
            >
              Buy
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Game panel                                                         */
/* ------------------------------------------------------------------ */

function GamePanel({
  game,
  onClose,
  onReward,
}: {
  game: GameDef;
  onClose: () => void;
  onReward: (points: number, message: string) => void;
}) {
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-md bg-[#F8FAFC] rounded-3xl shadow-2xl border border-white/80 overflow-hidden">
        <div className={`bg-gradient-to-br ${game.accent} p-5 flex items-center justify-between`}>
          <div className="flex items-center gap-2.5 text-white">
            <game.icon className="w-5 h-5" />
            <h3 className="font-bold text-base">{game.title}</h3>
          </div>
          <button onClick={onClose} className="text-white/90 hover:text-white p-1 rounded-full hover:bg-white/15">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="p-5">
          {game.id === 'quiz' && <QuizGame onReward={onReward} onClose={onClose} />}
          {game.id === 'reflex' && <ReflexGame onReward={onReward} onClose={onClose} />}
          {game.id === 'spin' && <SpinGame onReward={onReward} onClose={onClose} />}
        </div>
      </div>
    </div>
  );
}

function QuizGame({ onReward, onClose }: { onReward: (p: number, m: string) => void; onClose: () => void }) {
  const [step, setStep] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const question = QUIZ_QUESTIONS[step];

  const handleSelect = (idx: number) => {
    if (selected !== null) return;
    setSelected(idx);
    const correct = idx === question.correct;
    const gained = correct ? 25 : 0;
    setScore((s) => s + gained);
    setTimeout(() => {
      if (step + 1 < QUIZ_QUESTIONS.length) {
        setStep((s) => s + 1);
        setSelected(null);
      } else {
        setDone(true);
      }
    }, 700);
  };

  if (done) {
    return (
      <div className="text-center py-4">
        <Trophy className="w-10 h-10 text-amber-400 mx-auto mb-2" />
        <p className="text-[#175A67] font-bold text-lg">You scored {score} points!</p>
        <p className="text-xs text-[#2A707C] mt-1">{score >= 100 ? 'Outstanding run.' : score >= 50 ? 'Solid effort, keep going.' : 'Play again to sharpen up.'}</p>
        <button
          onClick={() => {
            if (score > 0) onReward(score, `Speed Quiz: +${score} pts`);
            onClose();
          }}
          className="mt-4 w-full bg-[#175A67] hover:bg-[#124853] text-white font-bold text-sm py-2.5 rounded-xl transition-all active:scale-95"
        >
          Collect & Close
        </button>
      </div>
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between text-xs font-semibold text-[#2A707C] mb-3">
        <span>Question {step + 1} / {QUIZ_QUESTIONS.length}</span>
        <span className="text-[#175A67]">Score: {score}</span>
      </div>
      <p className="text-[#175A67] font-bold text-sm mb-4">{question.q}</p>
      <div className="space-y-2">
        {question.options.map((opt, idx) => {
          const isCorrect = selected !== null && idx === question.correct;
          const isWrong = selected === idx && idx !== question.correct;
          return (
            <button
              key={opt}
              onClick={() => handleSelect(idx)}
              disabled={selected !== null}
              className={`w-full text-left text-sm font-semibold px-4 py-2.5 rounded-xl border transition-all ${
                isCorrect
                  ? 'bg-[#10B981]/15 border-[#10B981] text-[#0f766e]'
                  : isWrong
                  ? 'bg-red-50 border-red-300 text-red-600'
                  : 'bg-white/70 border-white/90 text-[#175A67] hover:bg-white'
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ReflexGame({ onReward, onClose }: { onReward: (p: number, m: string) => void; onClose: () => void }) {
  const [phase, setPhase] = useState<'idle' | 'waiting' | 'go' | 'result' | 'early'>('idle');
  const [reactionMs, setReactionMs] = useState<number | null>(null);
  const timeoutRef = useRef<number | null>(null);
  const startRef = useRef<number>(0);

  useEffect(() => () => {
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
  }, []);

  const start = () => {
    setPhase('waiting');
    const delay = 1000 + Math.random() * 2000;
    timeoutRef.current = window.setTimeout(() => {
      startRef.current = performance.now();
      setPhase('go');
    }, delay);
  };

  const handleTap = () => {
    if (phase === 'waiting') {
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
      setPhase('early');
      return;
    }
    if (phase === 'go') {
      const ms = Math.round(performance.now() - startRef.current);
      setReactionMs(ms);
      setPhase('result');
    }
  };

  const points = reactionMs === null ? 0 : reactionMs < 200 ? 100 : reactionMs < 400 ? 60 : reactionMs < 600 ? 30 : 10;

  return (
    <div>
      {phase === 'idle' && (
        <div className="text-center py-4">
          <p className="text-sm text-[#2A707C] mb-4">Wait for the box to turn green, then tap as fast as you can. Tap early and you score nothing.</p>
          <button onClick={start} className="w-full bg-[#175A67] hover:bg-[#124853] text-white font-bold text-sm py-2.5 rounded-xl transition-all active:scale-95">
            Start
          </button>
        </div>
      )}

      {(phase === 'waiting' || phase === 'go') && (
        <button
          onClick={handleTap}
          className={`w-full h-40 rounded-2xl flex items-center justify-center font-bold text-lg transition-colors ${
            phase === 'go' ? 'bg-[#10B981] text-white' : 'bg-[#175A67]/15 text-[#175A67]'
          }`}
        >
          {phase === 'go' ? 'TAP NOW!' : 'Wait for green…'}
        </button>
      )}

      {phase === 'early' && (
        <div className="text-center py-4">
          <p className="text-red-600 font-bold text-sm mb-3">Too soon! That's a false start.</p>
          <button onClick={start} className="w-full bg-[#175A67] hover:bg-[#124853] text-white font-bold text-sm py-2.5 rounded-xl transition-all active:scale-95">
            Try Again
          </button>
        </div>
      )}

      {phase === 'result' && (
        <div className="text-center py-4">
          <p className="text-[#175A67] font-bold text-lg">{reactionMs} ms</p>
          <p className="text-xs text-[#2A707C] mt-1 mb-4">+{points} points</p>
          <button
            onClick={() => {
              if (points > 0) onReward(points, `Reflex Tap: +${points} pts`);
              onClose();
            }}
            className="w-full bg-[#175A67] hover:bg-[#124853] text-white font-bold text-sm py-2.5 rounded-xl transition-all active:scale-95"
          >
            Collect & Close
          </button>
        </div>
      )}
    </div>
  );
}

function SpinGame({ onReward, onClose }: { onReward: (p: number, m: string) => void; onClose: () => void }) {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<number | null>(null);
  const rewards = [10, 20, 30, 50, 75, 100];

  const spin = () => {
    setSpinning(true);
    setTimeout(() => {
      const reward = rewards[Math.floor(Math.random() * rewards.length)];
      setResult(reward);
      setSpinning(false);
    }, 1200);
  };

  return (
    <div className="text-center py-4">
      <div
        className={`w-28 h-28 mx-auto rounded-full border-4 border-[#175A67]/20 flex items-center justify-center bg-gradient-to-br from-emerald-500 to-sky-600 text-white font-bold text-xl mb-5 ${
          spinning ? 'animate-spin' : ''
        }`}
      >
        {result !== null && !spinning ? `+${result}` : <Gift className="w-9 h-9" />}
      </div>
      {result === null ? (
        <button
          onClick={spin}
          disabled={spinning}
          className="w-full bg-[#175A67] hover:bg-[#124853] disabled:opacity-60 text-white font-bold text-sm py-2.5 rounded-xl transition-all active:scale-95"
        >
          {spinning ? 'Spinning…' : 'Spin Now'}
        </button>
      ) : (
        <button
          onClick={() => {
            onReward(result, `Daily Spin: +${result} pts`);
            onClose();
          }}
          className="w-full bg-[#175A67] hover:bg-[#124853] text-white font-bold text-sm py-2.5 rounded-xl transition-all active:scale-95"
        >
          Collect & Close
        </button>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Convert points panel                                               */
/* ------------------------------------------------------------------ */

function ConvertPanel({
  points,
  onClose,
  onConvert,
}: {
  points: number;
  onClose: () => void;
  onConvert: (pointsToConvert: number) => void;
}) {
  const maxConvertible = Math.floor(points / POINTS_PER_RUPEE) * POINTS_PER_RUPEE;
  const [value, setValue] = useState(Math.min(100, maxConvertible));

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-sm bg-[#F8FAFC] rounded-3xl shadow-2xl border border-white/80 p-5">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2 text-[#175A67] font-bold">
            <Coins className="w-5 h-5" />
            <span>Convert Points</span>
          </div>
          <button onClick={onClose} className="text-[#2A707C] hover:text-[#175A67] p-1 rounded-full hover:bg-black/5">
            <X className="w-5 h-5" />
          </button>
        </div>

        {maxConvertible < POINTS_PER_RUPEE ? (
          <p className="text-sm text-[#2A707C]">You need at least {POINTS_PER_RUPEE} points to convert. Play a game to earn more.</p>
        ) : (
          <>
            <p className="text-xs text-[#2A707C] mb-3">{POINTS_PER_RUPEE} points = ₹1. You have {points} points available.</p>
            <input
              type="range"
              min={POINTS_PER_RUPEE}
              max={maxConvertible}
              step={POINTS_PER_RUPEE}
              value={value}
              onChange={(e) => setValue(Number(e.target.value))}
              className="w-full accent-[#175A67]"
            />
            <div className="flex items-center justify-between mt-3 mb-5">
              <span className="text-sm font-semibold text-[#175A67]">{value} points</span>
              <span className="text-sm font-bold text-[#10B981] flex items-center">
                <ArrowRight className="w-3.5 h-3.5 mx-1" /> <IndianRupee className="w-3.5 h-3.5" />{value / POINTS_PER_RUPEE}
              </span>
            </div>
            <button
              onClick={() => {
                onConvert(value);
                onClose();
              }}
              className="w-full bg-[#175A67] hover:bg-[#124853] text-white font-bold text-sm py-2.5 rounded-xl transition-all active:scale-95"
            >
              Convert to Wallet
            </button>
          </>
        )}
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main view                                                          */
/* ------------------------------------------------------------------ */

export function PiView({ onOpenUpgrade, onOpenDoubtSolver }: PiViewProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('IIT-JEE');
  const [searchQuery, setSearchQuery] = useState('');
  const [points, setPoints] = useState(240);
  const [inrBalance, setInrBalance] = useState(0);
  const [ownedCourses, setOwnedCourses] = useState<string[]>([]);
  const [activeGame, setActiveGame] = useState<GameDef | null>(null);
  const [showConvert, setShowConvert] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [insufficientFor, setInsufficientFor] = useState<PiCourse | null>(null);

  useEffect(() => {
    if (!toast) return;
    const t = setTimeout(() => setToast(null), 2600);
    return () => clearTimeout(t);
  }, [toast]);

  const categoryCourses = useMemo(
    () =>
      COURSES.filter((c) => c.category === activeCategory).filter(
        (c) =>
          !searchQuery ||
          c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.instructor.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [activeCategory, searchQuery]
  );

  const continueWatching = useMemo(
    () => COURSES.filter((c) => c.category === activeCategory && typeof c.progress === 'number'),
    [activeCategory]
  );

  const topTenFiltered = useMemo(() => TOP_TEN.filter((t) => t.category === activeCategory), [activeCategory]);

  const handleReward = (gained: number, message: string) => {
    setPoints((p) => p + gained);
    setToast(message);
  };

  const handleBuy = (course: PiCourse) => {
    if (ownedCourses.includes(course.id)) return;
    if (inrBalance >= course.priceINR) {
      setInrBalance((b) => b - course.priceINR);
      setOwnedCourses((o) => [...o, course.id]);
      setToast(`Enrolled in "${course.title}"`);
    } else {
      setInsufficientFor(course);
    }
  };

  return (
    <div className="relative">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-[#175A67] flex items-center justify-center shadow-md">
              <Sparkles className="w-4.5 h-4.5 text-white" />
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-[#175A67]">PI</h1>
          </div>
          <p className="text-xs sm:text-sm text-[#2A707C] mt-1">
            Everything for IIT-JEE, NEET & UPSC — courses, rankings, and games that pay you back.
          </p>
        </div>

        {/* Wallet */}
        <div className="flex items-center gap-2.5 self-start lg:self-auto">
          <div className="flex items-center gap-2 bg-white/60 border border-white/80 backdrop-blur-md rounded-2xl px-4 py-2 shadow-sm">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span className="text-sm font-bold text-[#175A67]">{points} pts</span>
          </div>
          <div className="flex items-center gap-2 bg-white/60 border border-white/80 backdrop-blur-md rounded-2xl px-4 py-2 shadow-sm">
            <Wallet className="w-4 h-4 text-[#10B981]" />
            <span className="text-sm font-bold text-[#175A67] flex items-center">
              <IndianRupee className="w-3.5 h-3.5" />{inrBalance}
            </span>
          </div>
          <button
            onClick={() => setShowConvert(true)}
            className="text-xs font-bold bg-[#175A67] hover:bg-[#124853] text-white px-3.5 py-2.5 rounded-2xl transition-all active:scale-95 shadow-sm"
          >
            Convert
          </button>
          <button
            onClick={onOpenDoubtSolver}
            title="Ask a doubt"
            className="flex items-center gap-1.5 text-xs font-bold bg-white/60 border border-white/80 backdrop-blur-md text-[#175A67] hover:bg-white/85 px-3.5 py-2.5 rounded-2xl transition-all active:scale-95 shadow-sm"
          >
            <Brain className="w-4 h-4" />
            <span className="hidden sm:inline">Ask Doubt</span>
          </button>
        </div>
      </div>

      {/* Search + category */}
      <div className="flex flex-col sm:flex-row gap-3 mb-8">
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#2A707C] pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder={`Search ${activeCategory} content`}
            className="w-full bg-white/60 border border-white/80 text-[#175A67] placeholder-[#2A707C] pl-10 pr-4 py-2.5 rounded-full text-sm focus:outline-none focus:border-[#175A67] focus:ring-2 focus:ring-[#175A67]/20 transition-all shadow-inner backdrop-blur-md"
          />
        </div>
        <div className="flex items-center gap-2 bg-white/50 border border-white/80 backdrop-blur-md rounded-full p-1 shadow-sm self-start">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                activeCategory === cat ? 'bg-[#175A67] text-white shadow-md' : 'text-[#175A67] hover:bg-white/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Continue Watching */}
      {continueWatching.length > 0 && (
        <section className="mb-9">
          <SectionHeader icon={Clock} title="Continue Watching" />
          <ScrollRow>
            {continueWatching.map((c) => (
              <CourseCard key={c.id} course={c} owned={ownedCourses.includes(c.id)} onBuy={handleBuy} />
            ))}
          </ScrollRow>
        </section>
      )}

      {/* Top 10 this week */}
      <section className="mb-9">
        <SectionHeader icon={TrendingUp} title="Top 10 This Week" />
        <ScrollRow>
          {topTenFiltered.map((t) => (
            <div
              key={t.rank}
              className="shrink-0 w-[240px] bg-white/60 hover:bg-white/85 backdrop-blur-md border border-white/80 rounded-2xl p-4 shadow-[0_8px_30px_rgb(0,0,0,0.05)] hover:shadow-[0_12px_40px_rgb(0,0,0,0.09)] transition-all duration-300 hover:-translate-y-1 flex items-center gap-3"
            >
              <span className="text-2xl font-black text-[#175A67]/25 w-8 shrink-0">{t.rank}</span>
              <div className="min-w-0">
                <p className="font-bold text-[#175A67] text-sm leading-snug truncate">{t.title}</p>
                <p className="text-[11px] text-[#2A707C] mt-1">{t.stat}</p>
              </div>
            </div>
          ))}
        </ScrollRow>
      </section>

      {/* Games */}
      <section className="mb-9">
        <SectionHeader icon={Flame} title="Play & Earn Points" />
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {GAMES.map((game) => (
            <div
              key={game.id}
              onClick={() => setActiveGame(game)}
              className="group cursor-pointer bg-white/50 hover:bg-white/70 backdrop-blur-xl border border-white/70 hover:border-white rounded-2xl p-5 shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] hover:shadow-[0_14px_44px_0_rgba(31,38,135,0.12)] transition-all duration-300 ease-out hover:-translate-y-1 active:scale-[0.98]"
            >
              <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${game.accent} text-white flex items-center justify-center shadow-md group-hover:scale-105 transition-transform`}>
                <game.icon className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-[#175A67] text-sm mt-3">{game.title}</h3>
              <p className="text-[#2A707C] text-xs mt-1">{game.tagline}</p>
              <p className="text-[11px] font-bold text-[#10B981] mt-2">{game.reward}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category courses */}
      <section className="pb-8">
        <SectionHeader icon={Play} title={`${activeCategory} Courses`} />
        {categoryCourses.length === 0 ? (
          <p className="text-sm text-[#2A707C]">No content matches "{searchQuery}" in {activeCategory}.</p>
        ) : (
          <ScrollRow>
            {categoryCourses.map((c) => (
              <CourseCard key={c.id} course={c} owned={ownedCourses.includes(c.id)} onBuy={handleBuy} />
            ))}
          </ScrollRow>
        )}
      </section>

      {/* Game overlay */}
      {activeGame && <GamePanel game={activeGame} onClose={() => setActiveGame(null)} onReward={handleReward} />}

      {/* Convert overlay */}
      {showConvert && (
        <ConvertPanel
          points={points}
          onClose={() => setShowConvert(false)}
          onConvert={(p) => {
            setPoints((prev) => prev - p);
            setInrBalance((prev) => prev + p / POINTS_PER_RUPEE);
            setToast(`Converted ${p} pts to ₹${p / POINTS_PER_RUPEE}`);
          }}
        />
      )}

      {/* Insufficient balance prompt */}
      {insufficientFor && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setInsufficientFor(null)} />
          <div className="relative w-full max-w-sm bg-[#F8FAFC] rounded-3xl shadow-2xl border border-white/80 p-5 text-center">
            <Lock className="w-8 h-8 text-[#175A67] mx-auto mb-2" />
            <p className="font-bold text-[#175A67]">Not enough balance</p>
            <p className="text-xs text-[#2A707C] mt-1 mb-4">
              "{insufficientFor.title}" costs ₹{insufficientFor.priceINR}. Play a game or convert points to top up.
            </p>
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setInsufficientFor(null);
                  setShowConvert(true);
                }}
                className="flex-1 bg-white/80 border border-[#175A67]/20 text-[#175A67] font-bold text-xs py-2.5 rounded-xl transition-all active:scale-95"
              >
                Convert Points
              </button>
              <button
                onClick={() => {
                  setInsufficientFor(null);
                  onOpenUpgrade();
                }}
                className="flex-1 bg-[#175A67] hover:bg-[#124853] text-white font-bold text-xs py-2.5 rounded-xl transition-all active:scale-95"
              >
                Go Pro Instead
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[70] bg-[#175A67] text-white text-sm font-semibold px-4 py-2.5 rounded-full shadow-xl flex items-center gap-2 animate-fadeIn">
          <CheckCircle2 className="w-4 h-4 text-[#10B981]" />
          {toast}
        </div>
      )}
    </div>
  );
}

export default PiView;
