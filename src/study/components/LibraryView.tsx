import React, { useRef, useState } from 'react';
import {
  Download,
  Star,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Folder,
  PackageCheck,
  Zap,
  Truck,
  ClipboardEdit,
  Atom,
  Sigma,
  FlaskConical,
  Dna,
  Landmark,
  Scale,
  CheckCircle2,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

type Category = 'IIT-JEE' | 'NEET' | 'UPSC';

interface LibraryModule {
  id: string;
  category: Category;
  subject: string;
  icon: React.ComponentType<{ className?: string }>;
  rating: number;
  title: string;
  tags: string[];
  countLabel: string;
  sizeLabel: string;
}

interface LibraryViewProps {
  onOpenUpgrade: () => void;
}

/* ------------------------------------------------------------------ */
/*  Dummy content                                                       */
/* ------------------------------------------------------------------ */

const CATEGORIES: Category[] = ['IIT-JEE', 'NEET', 'UPSC'];

const MODULES: LibraryModule[] = [
  // IIT-JEE
  {
    id: 'm1',
    category: 'IIT-JEE',
    subject: 'Physics',
    icon: Atom,
    rating: 4.9,
    title: 'Rotational Dynamics & Rigid Bodies',
    tags: ['Rotational Motion', 'Wave Optics', 'Electrodynamics'],
    countLabel: '12 PDFs',
    sizeLabel: '48.2 MB',
  },
  {
    id: 'm2',
    category: 'IIT-JEE',
    subject: 'Mathematics',
    icon: Sigma,
    rating: 4.8,
    title: 'Calculus & Differential Equations',
    tags: ['Definite Integrals', 'Area Under Curve', 'Vectors'],
    countLabel: '8 PDFs',
    sizeLabel: '32.6 MB',
  },
  {
    id: 'm3',
    category: 'IIT-JEE',
    subject: 'Chemistry',
    icon: FlaskConical,
    rating: 4.9,
    title: 'Organic Reaction Mechanisms Vault',
    tags: ['Named Reactions', 'Electrophiles', 'Stereochem'],
    countLabel: '15 PDFs',
    sizeLabel: '61.0 MB',
  },
  {
    id: 'm4',
    category: 'IIT-JEE',
    subject: 'Physics',
    icon: Atom,
    rating: 4.7,
    title: 'Electrostatics & Gauss Law Notes',
    tags: ['Capacitors', 'Field Lines', 'Gauss Law'],
    countLabel: '10 PDFs',
    sizeLabel: '39.4 MB',
  },

  // NEET
  {
    id: 'n1',
    category: 'NEET',
    subject: 'Biology',
    icon: Dna,
    rating: 4.9,
    title: 'Human Physiology Master Sheet',
    tags: ['Nervous System', 'Excretion', 'Circulation'],
    countLabel: '18 PDFs',
    sizeLabel: '55.2 MB',
  },
  {
    id: 'n2',
    category: 'NEET',
    subject: 'Biology',
    icon: Dna,
    rating: 4.8,
    title: 'Genetics & Evolution Compendium',
    tags: ['Mendelian Genetics', 'Evolution', 'Molecular Basis'],
    countLabel: '14 PDFs',
    sizeLabel: '44.8 MB',
  },
  {
    id: 'n3',
    category: 'NEET',
    subject: 'Chemistry',
    icon: FlaskConical,
    rating: 4.7,
    title: 'NEET Organic Chemistry Vault',
    tags: ['Reaction Maps', 'Isomerism', 'Biomolecules'],
    countLabel: '11 PDFs',
    sizeLabel: '38.0 MB',
  },

  // UPSC
  {
    id: 'u1',
    category: 'UPSC',
    subject: 'GS Paper II',
    icon: Landmark,
    rating: 4.9,
    title: 'Indian Polity Ranker Notes',
    tags: ['Constitution', 'Parliament', 'Judiciary'],
    countLabel: '20 PDFs',
    sizeLabel: '62.5 MB',
  },
  {
    id: 'u2',
    category: 'UPSC',
    subject: 'GS Paper I',
    icon: Landmark,
    rating: 4.8,
    title: 'Modern History Timeline Sheets',
    tags: ['Freedom Struggle', 'Revolts', 'Movements'],
    countLabel: '16 PDFs',
    sizeLabel: '49.3 MB',
  },
  {
    id: 'u3',
    category: 'UPSC',
    subject: 'GS Paper IV',
    icon: Scale,
    rating: 4.7,
    title: 'Ethics & Case Study Handbook',
    tags: ['Case Studies', 'Thinkers', 'Values'],
    countLabel: '9 PDFs',
    sizeLabel: '28.7 MB',
  },
];

/* ------------------------------------------------------------------ */
/*  Module card                                                         */
/* ------------------------------------------------------------------ */

function ModuleCard({ module, onView }: { module: LibraryModule; onView: () => void }) {
  return (
    <div className="shrink-0 w-[260px] sm:w-[280px] bg-gradient-to-br from-[#0F3B42] to-[#0b2c31] rounded-2xl p-5 flex flex-col justify-between min-h-[280px]">
      <div>
        <div className="flex items-center justify-between mb-4">
          <span className="text-[10px] font-bold bg-white/15 text-white px-2.5 py-1 rounded-full">{module.subject}</span>
          <span className="flex items-center gap-1 text-xs font-bold text-amber-300">
            <Star className="w-3.5 h-3.5 fill-amber-300" />
            {module.rating}
          </span>
        </div>

        <div className="w-11 h-11 rounded-xl bg-white/10 flex items-center justify-center mb-4">
          <module.icon className="w-5 h-5 text-white" />
        </div>

        <h3 className="font-bold text-white text-base leading-snug mb-3 min-h-[2.6rem]">{module.title}</h3>

        <div className="flex flex-wrap gap-1.5">
          {module.tags.map((tag) => (
            <span key={tag} className="text-[10px] font-semibold bg-white/10 text-white/85 px-2 py-1 rounded-md">
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between mt-5 pt-4 border-t border-white/10 text-xs">
        <span className="text-white/60 font-medium">
          {module.countLabel} · {module.sizeLabel}
        </span>
        <button onClick={onView} className="text-white font-bold flex items-center gap-1 hover:gap-1.5 transition-all">
          View Pack
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Main view                                                           */
/* ------------------------------------------------------------------ */

export function LibraryView({ onOpenUpgrade }: LibraryViewProps) {
  const [activeCategory, setActiveCategory] = useState<Category>('IIT-JEE');
  const [toast, setToast] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const modules = MODULES.filter((m) => m.category === activeCategory);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2400);
  };

  const scroll = (dir: 'left' | 'right') => {
    scrollRef.current?.scrollBy({ left: dir === 'left' ? -300 : 300, behavior: 'smooth' });
  };

  return (
    <div className="bg-[#DCEAE3] rounded-[28px] p-4 sm:p-6 lg:p-8 relative">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-5 mb-6 bg-[#F0FCFE] p-7 rounded-[24px]">
        <div>
          <div className="flex items-center gap-2 text-[11px] sm:text-xs font-bold text-[#175A67] mb-2 bg-[#E5EEFF] w-[324px] p-2 rounded-full">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#175A67] opacity-50" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#175A67]" />
            </span>
            <span className="uppercase tracking-wide">Ranker-Curated Archive</span>
            <span className="text-[#2A707C] font-medium">· Updated 2h ago</span>
          </div>

          <div className="flex items-center gap-2.5 flex-wrap">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0B1C30]">Resource Library</h1>
            <span className="text-[10px] font-black uppercase bg-[#0F3B42] text-white px-2.5 py-1 rounded-full">Pro</span>
          </div>

          <p className="text-xs sm:text-sm text-[#40484B] mt-2 max-w-xl">
            Comprehensive high-yield notes, derivation sheets, and Irodov problem breakdowns curated by IIT Top 100 rankers.
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-3 shrink-0">
          <div className="flex items-center bg-white/70 border border-white rounded-full p-1 shadow-sm">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
                  activeCategory === cat ? 'bg-[#0F3B42] text-white shadow-md' : 'text-[#175A67] hover:bg-white/70'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <button
            onClick={() => showToast('Preparing your High-Yield PDF bundle for download…')}
            className="flex items-center gap-2 bg-[#0F3B42] hover:bg-[#0b2c31] text-white font-semibold text-xs sm:text-sm px-4 py-2.5 rounded-full shadow-sm transition-all active:scale-95"
          >
            <Download className="w-4 h-4" />
            Download All High-Yield PDFs
          </button>
        </div>
      </div>

      {/* Saved Vault card */}
      <div className="bg-[#F0FCFE] rounded-2xl p-7 sm:p-5 shadow-[0_6px_24px_rgb(0,0,0,0.05)] flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-orange-100 flex items-center justify-center shrink-0">
            <Folder className="w-6 h-6 text-orange-500" />
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="font-bold text-[#0B1C30] text-sm sm:text-base">Saved Vault: 6 Modules</h3>
              <span className="flex items-center gap-1 text-[10px] font-bold bg-sky-100 text-sky-700 px-2.5 py-1 rounded-full">
                <PackageCheck className="w-3 h-3" />
                Ready Offline
              </span>
            </div>
            <p className="text-xs text-[#2A707C] mt-1">
              128 MB cached ·{' '}
              <button
                onClick={() => showToast('Syncing 3 updated PDFs to your offline vault…')}
                className="text-[#175A67] font-semibold hover:underline"
              >
                3 PDF updates available
              </button>
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            onClick={() => showToast('Quick Formula Sheet unlocked — +15 XP earned!')}
            className="flex items-center gap-1.5 bg-sky-100 hover:bg-sky-200 text-sky-700 text-xs font-bold px-3.5 py-2 rounded-full transition-all active:scale-95"
          >
            <Zap className="w-3.5 h-3.5" />
            Quick Formula Sheet
            <span className="text-sky-800">(+15 XP)</span>
          </button>
          <button
            onClick={() => showToast('Tracking your hardcopy notes delivery…')}
            className="flex items-center gap-1.5 bg-[#EAF3F1] hover:bg-[#dcece7] text-[#175A67] text-xs font-bold px-3.5 py-2 rounded-full transition-all active:scale-95"
          >
            <Truck className="w-3.5 h-3.5" />
            Track Hardcopy Delivery
          </button>
          <button
            onClick={() => showToast('Request sent — a ranker will annotate your notes soon.')}
            className="flex items-center gap-1.5 bg-amber-200 hover:bg-amber-300 text-amber-900 text-xs font-bold px-3.5 py-2 rounded-full transition-all active:scale-95"
          >
            <ClipboardEdit className="w-3.5 h-3.5" />
            Request Ranker Notes
          </button>
        </div>
      </div>

      {/* High-Yield Modules */}
      <section className="pb-2 bg-[#F0FCFE] p-7 rounded-[24px]">
        <div className="flex items-start justify-between mb-4 gap-3">
          <div>
            <h2 className="text-lg sm:text-xl font-semibold text-[#0B1C30]">High-Yield Modules</h2>
            <p className="text-xs text-[#2A707C] mt-1">Pick up where your AI diagnostic recommended based on syllabus gaps</p>
          </div>
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            <button
              onClick={() => scroll('left')}
              className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#175A67] hover:bg-white/80 transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-9 h-9 rounded-full bg-white shadow-sm flex items-center justify-center text-[#175A67] hover:bg-white/80 transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {modules.length === 0 ? (
          <p className="text-sm text-[#2A707C]">No modules available for {activeCategory} yet.</p>
        ) : (
          <div ref={scrollRef} className="flex gap-4 overflow-x-auto no-scrollbar scroll-smooth pb-1 my-5">
            {modules.map((module) => (
              <ModuleCard
                key={module.id}
                module={module}
                onView={() => showToast(`Opening "${module.title}" pack…`)}
              />
            ))}
          </div>
        )}
      </section>

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

export default LibraryView;
