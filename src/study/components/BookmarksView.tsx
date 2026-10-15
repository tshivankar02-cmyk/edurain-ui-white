import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Bookmark,
  History,
  RotateCcw,
  Play,
  Clock3,
  ArrowRight,
  FolderOpen,
  Files,
  ExternalLink,
  FilePlus2,
} from 'lucide-react';

/* ------------------------------------------------------------------ */
/*  Types & mock data                                                  */
/* ------------------------------------------------------------------ */

interface HistoryVideo {
  id: string;
  badge: string;
  badgeColor: string;
  title: string;
  duration: string;
}

const HISTORY_VIDEOS: HistoryVideo[] = [
  {
    id: 'h1',
    badge: 'Physics • 12th',
    badgeColor: 'bg-amber-100 text-amber-800',
    title: "Electrostatics – Gauss's Law Applications",
    duration: '45:10',
  },
  {
    id: 'h2',
    badge: 'Biology • 11th',
    badgeColor: 'bg-amber-100 text-amber-800',
    title: 'Human Physiology: Chemical Coordination',
    duration: '32:00',
  },
  {
    id: 'h3',
    badge: 'Dropper Special',
    badgeColor: 'bg-orange-100 text-orange-800',
    title: 'Thermodynamics & Heat Transfer PYQs',
    duration: '58:15',
  },
];

interface BookmarksViewProps {
  onBack: () => void;
  onSearch?: (query: string) => void;
  onClearHistory?: () => void;
  onWatchVideo?: (video: HistoryVideo) => void;
  onOpenPdfViewer?: () => void;
  onOpenWatchLater?: () => void;
  onAddDocument?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Main view                                                           */
/* ------------------------------------------------------------------ */

export function BookmarksView({
  onBack,
  onSearch,
  onClearHistory,
  onWatchVideo,
  onOpenPdfViewer,
  onOpenWatchLater,
  onAddDocument,
}: BookmarksViewProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    onSearch?.(e.target.value);
  };

  return (
    <div className="bg-[#DCEAE3] rounded-[28px] p-4 sm:p-6 lg:p-8 pb-10 relative space-y-6">
      {/* Back + Search */}
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2.5 rounded-xl bg-white hover:bg-white/80 border border-white/80 text-[#175A67] transition-all shadow-sm shrink-0"
          title="Back to Study Central"
        >
          <ArrowLeft className="w-4 h-4" />
        </button>

        <div className="relative flex-1">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#70787C]" />
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearchChange}
            placeholder="Search formulas, reaction mechanisms, mocks..."
            className="w-full pl-11 pr-4 py-3 rounded-2xl bg-white border border-white text-sm text-[#0B1C30] placeholder-[#70787C] focus:outline-none focus:ring-2 focus:ring-[#175A67]/15 shadow-sm"
          />
        </div>
      </div>

      {/* Page title card */}
      <div className="bg-white rounded-2xl p-5 sm:p-6 shadow-[0_6px_24px_rgb(0,0,0,0.05)] flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#0F3B42] text-white flex items-center justify-center shrink-0">
          <Bookmark className="w-5 h-5" />
        </div>
        <h1 className="text-xl sm:text-2xl font-bold text-[#0B1C30]">Bookmark</h1>
      </div>

      {/* History */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <History className="w-4.5 h-4.5 text-[#175A67]" />
            <h2 className="text-base sm:text-lg font-bold text-[#0B1C30]">History</h2>
          </div>
          <button
            onClick={onClearHistory}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#175A67] hover:underline"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {HISTORY_VIDEOS.map((video) => (
            <div key={video.id} className="bg-white rounded-2xl overflow-hidden shadow-[0_6px_24px_rgb(0,0,0,0.05)]">
              <button
                onClick={() => onWatchVideo?.(video)}
                className="relative w-full aspect-video bg-gradient-to-br from-[#0f2e2c] to-[#03110d] flex items-center justify-center group"
              >
                <span className={`absolute top-3 left-3 text-[10px] font-bold px-2.5 py-1 rounded-full ${video.badgeColor}`}>
                  {video.badge}
                </span>
                <span className="w-11 h-11 rounded-full bg-white/90 group-hover:bg-white flex items-center justify-center transition-all group-hover:scale-105">
                  <Play className="w-4.5 h-4.5 text-[#0F3B42] fill-[#0F3B42] ml-0.5" />
                </span>
                <span className="absolute bottom-3 right-3 flex items-center gap-1 text-[10px] font-semibold text-white bg-black/40 px-2 py-1 rounded-md">
                  <Clock3 className="w-3 h-3" />
                  {video.duration}
                </span>
              </button>

              <div className="p-4">
                <h3 className="text-sm font-bold text-[#0B1C30] leading-snug min-h-[2.5rem]">{video.title}</h3>
                <button
                  onClick={() => onWatchVideo?.(video)}
                  className="mt-3 w-full flex items-center justify-center gap-1.5 bg-[#0F3B42] hover:bg-[#0b2c31] text-white font-bold text-xs py-2.5 rounded-xl transition-all active:scale-95"
                >
                  Watch Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Wishlist */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FolderOpen className="w-4.5 h-4.5 text-[#175A67]" />
            <h2 className="text-base sm:text-lg font-bold text-[#0B1C30]">Wishlist</h2>
          </div>
          <button
            onClick={onAddDocument}
            className="flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#175A67] hover:underline"
          >
            <FilePlus2 className="w-3.5 h-3.5" />
            Add Document
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          <div className="bg-white rounded-2xl p-5 shadow-[0_6px_24px_rgb(0,0,0,0.05)]">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#EAF3F1] text-[#175A67] flex items-center justify-center shrink-0">
                <Files className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0B1C30]">Your Saved Pdf</h3>
            </div>
            <button
              onClick={onOpenPdfViewer}
              className="w-full flex items-center justify-center gap-1.5 bg-[#0F3B42] hover:bg-[#0b2c31] text-white font-bold text-xs py-2.5 rounded-xl transition-all active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open PDF Viewer
            </button>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow-[0_6px_24px_rgb(0,0,0,0.05)]">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[#EAF3F1] text-[#175A67] flex items-center justify-center shrink-0">
                <Play className="w-4 h-4" />
              </div>
              <h3 className="text-sm font-bold text-[#0B1C30]">Watch Later</h3>
            </div>
            <button
              onClick={onOpenWatchLater}
              className="w-full flex items-center justify-center gap-1.5 bg-[#0F3B42] hover:bg-[#0b2c31] text-white font-bold text-xs py-2.5 rounded-xl transition-all active:scale-95"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              View
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default BookmarksView;
