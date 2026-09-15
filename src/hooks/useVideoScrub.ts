import { useEffect, useRef, useState, useCallback } from 'react';

export interface VideoScrubOptions {
  videoUrl: string;
  lerpTau?: number;
  snapThreshold?: number;
}

export interface VideoScrubState {
  currentProgress: number;
  targetProgress: number;
  isReady: boolean;
  isBuffering: boolean;
  loadProgress: number;
  fps: number;
  mode: 'webcodecs' | 'video-fallback';
  duration: number;
}

export function useVideoScrub(
  canvasRef: React.RefObject<HTMLCanvasElement | null>,
  videoElementRef?: React.RefObject<HTMLVideoElement | null> | null,
  options?: VideoScrubOptions
) {
  // Handle signature flexibility
  const opts = options || (videoElementRef as any)?.videoUrl ? (videoElementRef as any as VideoScrubOptions) : {
    videoUrl: 'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260821_114821_a8ca298f-be2c-4613-a4dd-51b69e16bbde.mp4',
    lerpTau: 8,
    snapThreshold: 0.001,
  };

  const videoUrl = opts.videoUrl;
  const lerpTau = opts.lerpTau ?? 8;
  const snapThreshold = opts.snapThreshold ?? 0.001;

  const [state, setState] = useState<VideoScrubState>({
    currentProgress: 0,
    targetProgress: 0,
    isReady: false,
    isBuffering: true,
    loadProgress: 0,
    fps: 60,
    mode: 'video-fallback',
    duration: 10,
  });

  const targetProgressRef = useRef<number>(0);
  const currentProgressRef = useRef<number>(0);
  const currentTimeRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const fpsFrameCountRef = useRef<number>(0);
  const fpsLastReportRef = useRef<number>(performance.now());

  // WebCodecs frame bank
  const framesBankRef = useRef<Array<{ timestamp: number; bitmap: ImageBitmap | HTMLCanvasElement }>>([]);
  const isWebCodecsActiveRef = useRef<boolean>(false);
  const durationRef = useRef<number>(10);
  const internalVideoRef = useRef<HTMLVideoElement | null>(null);

  // High-DPI canvas resizing
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const displayWidth = window.innerWidth;
    const displayHeight = window.innerHeight;

    if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
      canvas.width = displayWidth * dpr;
      canvas.height = displayHeight * dpr;
      canvas.style.width = `${displayWidth}px`;
      canvas.style.height = `${displayHeight}px`;
    }
  }, [canvasRef]);

  // Object-cover paint helper
  const drawCoverImage = useCallback((
    ctx: CanvasRenderingContext2D,
    source: CanvasImageSource,
    sourceWidth: number,
    sourceHeight: number
  ) => {
    const canvas = ctx.canvas;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    const sourceAspect = sourceWidth / sourceHeight;
    const canvasAspect = canvasWidth / canvasHeight;

    let drawWidth = canvasWidth;
    let drawHeight = canvasHeight;
    let offsetX = 0;
    let offsetY = 0;

    if (canvasAspect > sourceAspect) {
      drawHeight = canvasWidth / sourceAspect;
      offsetY = (canvasHeight - drawHeight) / 2;
    } else {
      drawWidth = canvasHeight * sourceAspect;
      offsetX = (canvasWidth - drawWidth) / 2;
    }

    ctx.clearRect(0, 0, canvasWidth, canvasHeight);
    ctx.drawImage(source, offsetX, offsetY, drawWidth, drawHeight);
  }, []);

  // Scroll listener: progress = scrollY / (scrollHeight - innerHeight)
  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
    const progress = Math.min(Math.max(scrollY / maxScroll, 0), 1);
    targetProgressRef.current = progress;
  }, []);

  // MP4Box + WebCodecs & Video Fallback Init
  useEffect(() => {
    let isCancelled = false;

    const initWebCodecs = async () => {
      try {
        const hasWebCodecs = typeof window !== 'undefined' && 'VideoDecoder' in window;
        let mp4boxModule: any = null;

        if (hasWebCodecs) {
          try {
            mp4boxModule = await import('mp4box');
          } catch (e) {
            console.warn('MP4Box import fallback:', e);
          }
        }

        if (hasWebCodecs && mp4boxModule) {
          try {
            const response = await fetch(videoUrl, { mode: 'cors' });
            if (response.ok) {
              const arrayBuffer = await response.arrayBuffer();
              if (isCancelled) return;

              const mp4boxFile = mp4boxModule.createFile();
              const framesBank: Array<{ timestamp: number; bitmap: ImageBitmap | HTMLCanvasElement }> = [];

              mp4boxFile.onReady = (info: any) => {
                if (isCancelled) return;
                const videoTrack = info.videoTracks[0];
                if (!videoTrack) return;

                const duration = info.duration / info.timescale;
                durationRef.current = duration;
                setState(s => ({ ...s, duration, isReady: true, isBuffering: false, mode: 'webcodecs' }));

                const decoder = new VideoDecoder({
                  output: (videoFrame: VideoFrame) => {
                    if (isCancelled) {
                      videoFrame.close();
                      return;
                    }
                    createImageBitmap(videoFrame).then(bitmap => {
                      framesBank.push({
                        timestamp: (videoFrame.timestamp || 0) / 1_000_000,
                        bitmap
                      });
                      framesBank.sort((a, b) => a.timestamp - b.timestamp);
                      framesBankRef.current = framesBank;
                      videoFrame.close();
                    }).catch(() => {
                      videoFrame.close();
                    });
                  },
                  error: (e) => {
                    console.warn('WebCodecs decode warning:', e);
                  }
                });

                decoder.configure({
                  codec: videoTrack.codec,
                  codedWidth: videoTrack.video.width,
                  codedHeight: videoTrack.video.height,
                  description: videoTrack.description
                });

                mp4boxFile.setExtractionOptions(videoTrack.id, null, { nbSamples: 1000 });
                mp4boxFile.onSamples = (_id: number, _user: any, samples: any[]) => {
                  for (const sample of samples) {
                    const chunk = new EncodedVideoChunk({
                      type: sample.is_sync ? 'key' : 'delta',
                      timestamp: (sample.cts * 1_000_000) / sample.timescale,
                      duration: (sample.duration * 1_000_000) / sample.timescale,
                      data: sample.data
                    });
                    decoder.decode(chunk);
                  }
                  decoder.flush().then(() => {
                    isWebCodecsActiveRef.current = true;
                  });
                };
                mp4boxFile.start();
              };

              const buffer = arrayBuffer as any;
              buffer.fileStart = 0;
              mp4boxFile.appendBuffer(buffer);
              mp4boxFile.flush();
            }
          } catch (err) {
            console.warn('WebCodecs fetch/demux fallback:', err);
          }
        }
      } catch (err) {
        console.warn('WebCodecs init note:', err);
      }
    };

    initWebCodecs();

    // Fallback video
    let video = videoElementRef?.current;
    if (!video) {
      const v = document.createElement('video');
      v.src = videoUrl;
      v.muted = true;
      v.playsInline = true;
      v.preload = 'auto';
      v.crossOrigin = 'anonymous';
      internalVideoRef.current = v;
      video = v;
    }

    if (video) {
      const onLoadedMetadata = () => {
        if (isCancelled) return;
        const dur = video?.duration || 10;
        durationRef.current = dur;
        setState(s => ({
          ...s,
          duration: dur,
          isReady: true,
          isBuffering: false,
          loadProgress: 100,
        }));
      };

      video.addEventListener('loadedmetadata', onLoadedMetadata);
      video.addEventListener('canplaythrough', () => {
        setState(s => ({ ...s, isBuffering: false, isReady: true }));
      });

      if (video.readyState >= 1) {
        onLoadedMetadata();
      }
    }

    return () => {
      isCancelled = true;
      framesBankRef.current.forEach(f => {
        if ('close' in f.bitmap && typeof (f.bitmap as any).close === 'function') {
          (f.bitmap as any).close();
        }
      });
      framesBankRef.current = [];
      if (internalVideoRef.current) {
        internalVideoRef.current.remove();
        internalVideoRef.current = null;
      }
    };
  }, [videoUrl, videoElementRef]);

  // Main RAF Lerp Animation & Paint Loop
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    handleScroll();

    const renderLoop = (timestamp: number) => {
      const dt = Math.min((timestamp - lastTimeRef.current) / 1000, 0.1);
      lastTimeRef.current = timestamp;

      // FPS Calculation
      fpsFrameCountRef.current++;
      if (timestamp - fpsLastReportRef.current >= 500) {
        const calculatedFps = Math.round((fpsFrameCountRef.current * 1000) / (timestamp - fpsLastReportRef.current));
        fpsFrameCountRef.current = 0;
        fpsLastReportRef.current = timestamp;
        setState(s => ({
          ...s,
          fps: calculatedFps,
          currentProgress: currentProgressRef.current,
          targetProgress: targetProgressRef.current,
        }));
      }

      // Smooth Lerp Scrubbing Calculation:
      // progress = scrollY / (scrollHeight - innerHeight)
      // targetTime = progress * duration
      // currentTime += (targetTime - currentTime) * (1 - Math.exp(-dt * 8))
      const targetProg = targetProgressRef.current;
      const duration = durationRef.current || 10;
      const targetTime = targetProg * duration;

      const diffTime = targetTime - currentTimeRef.current;
      if (Math.abs(diffTime) > snapThreshold) {
        const factor = 1 - Math.exp(-lerpTau * dt);
        currentTimeRef.current += diffTime * factor;
      } else {
        currentTimeRef.current = targetTime;
      }

      currentProgressRef.current = duration > 0 ? currentTimeRef.current / duration : targetProg;

      // Paint to HTML5 Canvas
      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          const frames = framesBankRef.current;
          const currTime = currentTimeRef.current;

          if (isWebCodecsActiveRef.current && frames.length > 0) {
            let closest = frames[0];
            let minDiff = Math.abs(frames[0].timestamp - currTime);
            for (let i = 1; i < frames.length; i++) {
              const d = Math.abs(frames[i].timestamp - currTime);
              if (d < minDiff) {
                minDiff = d;
                closest = frames[i];
              }
            }
            if (closest?.bitmap) {
              drawCoverImage(ctx, closest.bitmap, closest.bitmap.width, closest.bitmap.height);
            }
          } else {
            // HTML5 Video fallback seek
            const video = videoElementRef?.current || internalVideoRef.current;
            if (video && video.readyState >= 2) {
              const seekTime = Math.min(Math.max(currTime, 0), (video.duration || 10) - 0.05);
              if (Math.abs(video.currentTime - seekTime) > 0.02) {
                video.currentTime = seekTime;
              }
              if (video.videoWidth > 0 && video.videoHeight > 0) {
                drawCoverImage(ctx, video, video.videoWidth, video.videoHeight);
              }
            }
          }
        }
      }

      rafIdRef.current = requestAnimationFrame(renderLoop);
    };

    rafIdRef.current = requestAnimationFrame(renderLoop);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', resizeCanvas);
      if (rafIdRef.current) {
        cancelAnimationFrame(rafIdRef.current);
      }
    };
  }, [canvasRef, videoElementRef, drawCoverImage, handleScroll, lerpTau, resizeCanvas, snapThreshold]);

  const setManualProgress = useCallback((progress: number) => {
    const clamped = Math.min(Math.max(progress, 0), 1);
    targetProgressRef.current = clamped;
    const maxScroll = Math.max(
      document.documentElement.scrollHeight - window.innerHeight,
      1
    );
    window.scrollTo({
      top: clamped * maxScroll,
      behavior: 'smooth'
    });
  }, []);

  return {
    state,
    setManualProgress,
  };
}