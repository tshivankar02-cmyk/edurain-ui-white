import React, { useState } from 'react';
import { Database, Search, Download, Star, Filter, BookOpen, FolderArchive, ArrowRight } from 'lucide-react';
import { VaultResource } from '../types';

interface VaultViewProps {
  onOpenVaultItem: (item: VaultResource) => void;
  onOpenUpgrade: () => void;
}

export const VaultView: React.FC<VaultViewProps> = ({ onOpenVaultItem, onOpenUpgrade }) => {
  const [activeSubject, setActiveSubject] = useState<'All' | 'Physics' | 'Chemistry' | 'Mathematics'>('All');
  const [searchTerm, setSearchTerm] = useState('');

  const resources: VaultResource[] = [
    {
      id: 'v1',
      title: 'Thermodynamics & Heat Transfer Cheatbook',
      subject: 'Physics',
      countLabel: '18 PDFs',
      tags: ['Carnot Engines', 'Entropy', 'Radiation Laws'],
      iconType: 'book',
      description: 'Handwritten summaries with color-coded graphs and 50 toughest IIT JEE Advanced multi-correct problems.',
      rating: 4.9,
      downloadSize: '24.2 MB',
      second_text: ''
    },
    {
      id: 'v2',
      title: 'Organic Chemistry Reaction Roadmap Matrix',
      subject: 'Chemistry',
      countLabel: '12 PDFs',
      tags: ['Named Reactions', 'Reagents', 'Mechanisms'],
      iconType: 'archive',
      description: 'Complete high-yield reagent flowchart from Grignard to Diazonium conversions with stereochemistry traps.',
      rating: 5.0,
      downloadSize: '38.0 MB',
      second_text: ''
    },
    {
      id: 'v3',
      title: 'Integral Calculus & Differential Equations Master Drill',
      subject: 'Mathematics',
      countLabel: '22 PDFs',
      tags: ['Definite Integrals', 'Leibniz Rule', 'Differential Eq'],
      iconType: 'analytics',
      description: 'King property shortcuts, reduction formulas, and IIT Advanced subjective question archive.',
      rating: 4.9,
      downloadSize: '41.5 MB',
      second_text: ''
    },
    {
      id: 'v4',
      title: 'Electrodynamics & Gauss Law Field Visualizer',
      subject: 'Physics',
      countLabel: '15 PDFs',
      tags: ['Capacitors', 'Magnetic Fields', 'EMI & AC'],
      iconType: 'book',
      description: 'Detailed field-line geometry and LC oscillation circuit analysis.',
      rating: 4.8,
      downloadSize: '29.1 MB',
      second_text: ''
    },
    {
      id: 'v5',
      title: 'Inorganic NCERT Line-by-Line Highlight Vault',
      subject: 'Chemistry',
      countLabel: '8 Books',
      tags: ['p-Block', 'Coordination', 'Metallurgy'],
      iconType: 'archive',
      description: 'Every exception and reaction highlighted directly from NCERT textbook editions.',
      rating: 4.9,
      downloadSize: '52.0 MB',
      second_text: ''
    },
    {
      id: 'v6',
      title: 'Vectors, 3D Geometry & Complex Numbers Compendium',
      subject: 'Mathematics',
      countLabel: '14 PDFs',
      tags: ['Planes & Lines', 'Cube Roots of Unity', 'Dot/Cross'],
      iconType: 'analytics',
      description: 'Vector triple product identities and shortest distance parametric equations.',
      rating: 4.9,
      downloadSize: '36.4 MB',
      second_text: ''
    }
  ];

  const filtered = resources.filter(r => {
    const matchSubject = activeSubject === 'All' || r.subject === activeSubject;
    const matchSearch = r.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      r.tags.some(t => t.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchSubject && matchSearch;
  });

  return (
    <div className="space-y-6 pb-20">
      {/* Vault Header */}
      <div className="rounded-3xl bg-gradient-to-r from-[#061d15] to-[#04140f] border border-emerald-500/30 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 rounded-xl bg-teal-500/20 text-teal-400 border border-teal-500/30">
            <Database className="w-6 h-6" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-black text-white">The Vault Repository</h1>
            <p className="text-xs sm:text-sm text-slate-300">Over 4,800+ curated PDFs, handwritten notes, and formula sheets by IIT Top 100 rankers.</p>
          </div>
        </div>

        {/* Filter bar */}
        <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
          <div className="flex bg-slate-900/80 p-1 rounded-xl border border-emerald-500/20 w-full sm:w-auto">
            {(['All', 'Physics', 'Chemistry', 'Mathematics'] as const).map((sub) => (
              <button
                key={sub}
                onClick={() => setActiveSubject(sub)}
                className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  activeSubject === sub
                    ? 'bg-emerald-500 text-slate-950 shadow-md'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-emerald-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search documents by chapter, formula, or tag..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#030e0a] border border-emerald-500/30 text-xs text-slate-100 placeholder-slate-400 focus:outline-none focus:border-emerald-400"
            />
          </div>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((item) => (
          <div
            key={item.id}
            onClick={() => onOpenVaultItem(item)}
            className="group rounded-2xl bg-[#0a1f18]/85 hover:bg-[#0f2e24] border border-emerald-500/25 hover:border-emerald-400/60 p-5 backdrop-blur-xl shadow-glass transition-all duration-300 hover:-translate-y-1 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold">
                  {item.subject}
                </span>
                <span className="text-[11px] text-slate-400 font-semibold">{item.countLabel}</span>
              </div>

              <h3 className="text-base font-bold text-white group-hover:text-emerald-300 transition-colors">
                {item.title}
              </h3>
              <p className="text-xs text-slate-300 mt-2 line-clamp-2 leading-relaxed">
                {item.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mt-3">
                {item.tags.map((tag) => (
                  <span key={tag} className="text-[10px] px-2 py-0.5 rounded bg-emerald-950/60 text-emerald-300 border border-emerald-500/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-emerald-500/15 flex items-center justify-between text-xs font-bold text-emerald-400">
              <span className="flex items-center gap-1 text-amber-300">
                <Star className="w-3.5 h-3.5 fill-amber-400" />
                {item.rating}
              </span>
              <span className="flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                Enter Vault &gt;
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
