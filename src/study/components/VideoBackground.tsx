import React, { useRef, useState } from 'react';
import { useVideoScrub } from '../hooks/useVideoScrub';
import { Cpu, Eye, EyeOff, Activity, ChevronUp, ChevronDown, Sparkles } from 'lucide-react';

interface VideoBackgroundProps {
  videoUrl?: string;
  cinematicMode?: boolean;
  onToggleCinematic?: () => void;
}

export const VideoBackground: React.FC<VideoBackgroundProps> = ({
  videoUrl = 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4',
  cinematicMode = false,
  onToggleCinematic
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [showHud, setShowHud] = useState(false);

  const { state, setManualProgress } = useVideoScrub(canvasRef, videoRef, {
    videoUrl,
    lerpTau: 8,
    snapThreshold: 0.001,
  });

  const progressPercent = Math.round(state.currentProgress * 100);

  return (
    <>
      {/* Canvas Video Layer */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none -z-10 w-full h-full object-cover transition-opacity duration-700"
        style={{ opacity: state.isReady ? 1 : 0.6 }}
      />

      {/* Underlying fallback video element */}
      <video
        ref={videoRef}
        src={videoUrl}
        muted
        playsInline
        preload="auto"
        className="hidden"
        crossOrigin="anonymous"
      />

      {/* Atmospheric Glass Overlay */}
      <div 
        className={`fixed inset-0 pointer-events-none -z-10 transition-all duration-700 ${
          cinematicMode 
            ? 'bg-white/10 backdrop-blur-[0.5px]' 
            : 'bg-white/20 backdrop-blur-[1.5px] bg-gradient-to-b from-white/40 via-white/15 to-white/35'
        }`}
      />

      {/* Video Scrub Telemetry HUD Pill */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2 text-xs select-none">
        {showHud ? (
          <div className="bg-white/80 backdrop-blur-xl border border-[#187948]/30 rounded-2xl p-3 shadow-2xl text-slate-800 flex flex-col gap-2 min-w-[240px] animate-fadeIn transition-all">
            <div className="flex items-center justify-between border-b border-[#187948]/20 pb-2">
              <div className="flex items-center gap-1.5 font-bold text-[#187948]">
                <Cpu className="w-3.5 h-3.5 animate-pulse text-[#187948]" />
                <span>Video Scrub HUD</span>
              </div>
              <div className="flex items-center gap-1">
                {onToggleCinematic && (
                  <button
                    onClick={onToggleCinematic}
                    className="p-1 hover:bg-[#187948]/10 rounded-md transition-colors text-slate-600 hover:text-[#187948]"
                    title={cinematicMode ? "Exit Cinematic View" : "Enter Cinematic View"}
                  >
                    {cinematicMode ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                  </button>
                )}
                <button
                  onClick={() => setShowHud(false)}
                  className="p-1 hover:bg-[#187948]/10 rounded-md transition-colors text-slate-400 hover:text-slate-800"
                  title="Minimize HUD"
                >
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-[11px]">
              <div className="bg-slate-50/80 rounded-lg p-1.5 border border-[#187948]/15">
                <span className="text-slate-500 block">Scrub Position</span>
                <span className="font-mono text-[#187948] font-bold text-sm">
                  {progressPercent}%
                </span>
              </div>
              <div className="bg-slate-50/80 rounded-lg p-1.5 border border-[#187948]/15">
                <span className="text-slate-500 block">Render FPS</span>
                <span className="font-mono text-slate-800 font-bold text-sm flex items-center gap-1">
                  <Activity className="w-3 h-3 text-[#187948]" />
                  {state.fps}
                </span>
              </div>
            </div>

            <div className="space-y-1.5 text-[10px]">
              <div className="flex justify-between items-center text-slate-600">
                <span className="flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#187948]" />
                  Engine:
                </span>
                <span className="font-mono bg-[#187948]/10 text-[#187948] px-1.5 py-0.5 rounded border border-[#187948]/20 font-bold">
                  {state.mode === 'webcodecs' ? 'WebCodecs Frame-Bank' : 'Lerp Video Canvas (60fps)'}
                </span>
              </div>

              <div>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.001"
                  value={state.currentProgress}
                  onChange={(e) => setManualProgress(parseFloat(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-[#187948]"
                />
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowHud(true)}
            className="flex items-center gap-1.5 bg-white/80 hover:bg-white border border-[#187948]/30 text-[#187948] font-bold text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md transition-all hover:scale-105"
          >
            <Cpu className="w-3.5 h-3.5 text-[#187948]" />
            <span>Scrub {progressPercent}%</span>
            <ChevronUp className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </>
  );
};