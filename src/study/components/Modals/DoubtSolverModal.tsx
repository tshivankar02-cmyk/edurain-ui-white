import React, { useState } from 'react';
import { X, Send, Bot, CheckCircle2, Copy, Sparkles, BookOpen } from 'lucide-react';

interface DoubtSolverModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const DoubtSolverModal: React.FC<DoubtSolverModalProps> = ({ isOpen, onClose }) => {
  const [question, setQuestion] = useState('Find the electric field at a distance r from the axis of an infinitely long uniformly charged cylinder of radius R with charge density ρ for both (r < R) and (r ≥ R).');
  const [isSolving, setIsSolving] = useState(false);
  const [solutionShown, setSolutionShown] = useState(true);
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const handleSolve = (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setIsSolving(true);
    setSolutionShown(false);
    setTimeout(() => {
      setIsSolving(false);
      setSolutionShown(true);
    }, 700);
  };

  const handleCopy = () => {
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 animate-fadeIn">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl max-h-[90vh] bg-[#EAE3DE]/95 backdrop-blur-2xl border border-[#175A67]/30 rounded-3xl p-5 sm:p-7 shadow-2xl text-[#175A67] z-10 flex flex-col justify-between overflow-y-auto no-scrollbar">
        
        <div>
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[#175A67]/15 pb-4 mb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#175A67] text-white flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base sm:text-lg font-bold text-[#175A67]">PI AI Mentor & Doubt Solver</h2>
                  <span className="px-2 py-0.5 rounded-full bg-[#10B981]/15 text-[#059669] border border-[#10B981]/30 text-[10px] font-bold">
                    Physics Engine Live
                  </span>
                </div>
                <p className="text-xs text-[#2A707C]">Instant step-by-step JEE Advanced derivation & concept diagnosis</p>
              </div>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full bg-white/60 hover:bg-white text-[#175A67] transition-colors shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2 mb-4">
            {[
              'Carnot Engine Entropy Calculation',
              'Rotational Collision Angular Momentum',
              'Aldol Condensation Stereochemistry',
              'Integration by Partial Fractions Traps'
            ].map((preset) => (
              <button
                key={preset}
                onClick={() => setQuestion(preset)}
                className="text-[11px] font-semibold bg-white/60 hover:bg-white text-[#175A67] border border-[#175A67]/20 px-3 py-1 rounded-full transition-all"
              >
                {preset}
              </button>
            ))}
          </div>

          {/* Solution Container */}
          {solutionShown && (
            <div className="p-4 sm:p-5 rounded-2xl bg-white/70 border border-[#175A67]/20 shadow-inner mb-4 space-y-3 text-xs sm:text-sm">
              <div className="flex items-center justify-between border-b border-[#175A67]/15 pb-2">
                <span className="font-bold text-[#175A67] flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  Synthesized Solution (Gauss's Law):
                </span>
                <button
                  onClick={handleCopy}
                  className="text-xs font-bold text-[#175A67] hover:underline flex items-center gap-1"
                >
                  {copied ? <CheckCircle2 className="w-3.5 h-3.5 text-[#10B981]" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copied ? 'Copied!' : 'Copy'}</span>
                </button>
              </div>

              <div className="text-[#175A67] space-y-2 leading-relaxed">
                <p>
                  <strong>Case 1: For inside points (r &lt; R):</strong><br />
                  Construct a Gaussian cylinder of radius r and length L.<br />
                  Enclosed charge: q_enc = ρ · π r² L.<br />
                  Applying Gauss's Law: ∮ E · dA = E · (2π r L) = q_enc / ε₀ = (ρ π r² L) / ε₀.<br />
                  ⟹ E = (ρ r) / (2 ε₀) r̂ (Field increases linearly with radius).
                </p>
                <p>
                  <strong>Case 2: For outside points (r ≥ R):</strong><br />
                  Enclosed charge: q_enc = ρ · π R² L.<br />
                  E · (2π r L) = (ρ π R² L) / ε₀ ⟹ E = (ρ R²) / (2 ε₀ r) r̂ (Field decays inversely as 1/r).
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Input Form */}
        <form onSubmit={handleSolve} className="mt-2 flex gap-2">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Type any physics, chemistry, or math doubt..."
            className="flex-1 bg-white/80 border border-[#175A67]/30 text-[#175A67] placeholder-[#2A707C] px-4 py-2.5 rounded-xl text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#175A67]/20 shadow-inner"
          />
          <button
            type="submit"
            disabled={isSolving}
            className="px-5 py-2.5 rounded-xl bg-[#175A67] hover:bg-[#124853] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-all active:scale-95"
          >
            {isSolving ? (
              <span>Solving...</span>
            ) : (
              <>
                <span>Solve</span>
                <Send className="w-3.5 h-3.5" />
              </>
            )}
          </button>
        </form>

      </div>
    </div>
  );
};
