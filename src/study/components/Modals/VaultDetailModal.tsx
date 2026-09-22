import React from 'react';
import { X, Download, Star, FileText, CheckCircle2, BookOpen } from 'lucide-react';
import { VaultResource } from '../../types';

interface VaultDetailModalProps {
  item: VaultResource | null;
  onClose: () => void;
  onOpenUpgrade: () => void;
}

export const VaultDetailModal: React.FC<VaultDetailModalProps> = ({ item, onClose, onOpenUpgrade }) => {
  if (!item) return null;

  const handleDownload = () => {
    alert(`Downloading high-yield bundle: "${item.title}". File is saved to offline study cache.`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-lg max-h-[90vh] bg-[#EAE3DE]/95 backdrop-blur-2xl border border-[#175A67]/30 rounded-3xl p-5 sm:p-7 shadow-2xl text-[#175A67] z-10 overflow-y-auto no-scrollbar">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/60 hover:bg-white text-[#175A67] transition-colors shadow-sm"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-[#175A67] text-white flex items-center justify-center shadow-md">
            <BookOpen className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full bg-white/60 text-[#175A67] border border-[#175A67]/20 text-[10px] font-bold">
                {item.subject}
              </span>
              <span className="text-xs font-bold text-[#10B981] flex items-center gap-1">
                <Star className="w-3.5 h-3.5 fill-[#10B981]" />
                {item.rating || 4.9}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-bold text-[#175A67] mt-0.5">{item.title}</h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-[#2A707C] leading-relaxed mb-4">
          {item.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {item.tags.map((tag) => (
            <span key={tag} className="text-xs font-semibold bg-white/60 border border-[#175A67]/20 text-[#175A67] px-3 py-1 rounded-full">
              #{tag}
            </span>
          ))}
        </div>

        {/* Resource Details Box */}
        <div className="p-4 rounded-2xl bg-white/60 border border-[#175A67]/15 mb-5 space-y-2 text-xs">
          <div className="flex justify-between text-[#2A707C]">
            <span>Content Quantity</span>
            <span className="font-bold text-[#175A67]">{item.countLabel}</span>
          </div>
          <div className="flex justify-between text-[#2A707C]">
            <span>Download Package Size</span>
            <span className="font-bold text-[#175A67]">{item.downloadSize || '48.2 MB'}</span>
          </div>
          <div className="flex justify-between text-[#2A707C]">
            <span>Verified By</span>
            <span className="font-bold text-[#10B981]">IIT-JEE Top 100 Ranker Board</span>
          </div>
        </div>

        {/* Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleDownload}
            className="w-full py-3 rounded-xl bg-[#175A67] hover:bg-[#124853] text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download All High-Yield PDFs</span>
          </button>
          <button
            onClick={onOpenUpgrade}
            className="w-full py-2.5 rounded-xl bg-white/60 hover:bg-white text-[#175A67] border border-[#175A67]/25 font-bold text-xs transition-all"
          >
            Upgrade for Physical Hardcopy Delivery
          </button>
        </div>

      </div>
    </div>
  );
};
