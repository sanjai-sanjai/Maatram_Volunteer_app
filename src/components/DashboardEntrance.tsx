import { useEffect, useState, useRef, useCallback } from "react";
import { Volume2, VolumeX, ChevronRight } from "lucide-react";
import entranceBg from "@/assets/dashboard/dashboard-entrance-bg.jpg";

const LINE1 = "Be the hands that help.";
const LINE2 = "Be the change that lasts.";

export interface DashboardEntranceProps {
  onEnter: () => void;
  initialStage?: "video" | "quote";
}

export function DashboardEntrance({ onEnter, initialStage = "video" }: DashboardEntranceProps) {
  const [stage, setStage] = useState<"video" | "quote">(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search);
      if (p.get("quote") === "1") return "quote";
    }
    return initialStage;
  });

  const [isExiting, setIsExiting] = useState(false);
  // Initially unmuted for full audio experience
  const [isMuted, setIsMuted] = useState(false);

  // Quote typewriter states
  const [displayedLine1, setDisplayedLine1] = useState("");
  const [displayedLine2, setDisplayedLine2] = useState("");
  const [activeLine, setActiveLine] = useState<1 | 2 | "done">(1);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const clickBuffersRef = useRef<{
    char: AudioBuffer;
    space: AudioBuffer;
    punct: AudioBuffer;
  } | null>(null);

  const videoRef = useRef<HTMLVideoElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  // Lazily initialize and unlock AudioContext with pre-computed acoustic transient buffers
  const ensureAudioContext = useCallback(() => {
    if (typeof window === "undefined") return null;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return null;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }

      // Pre-compute high-resolution acoustic transient buffers if not already cached
      if (!clickBuffersRef.current && ctx.state !== "closed") {
        const sr = ctx.sampleRate;

        // 1. Standard character strike noise buffer (16ms)
        const charLen = Math.floor(sr * 0.016);
        const charBuf = ctx.createBuffer(1, charLen, sr);
        const cd = charBuf.getChannelData(0);
        for (let i = 0; i < charLen; i++) {
          const env = Math.exp(-i / (sr * 0.0035));
          cd[i] = (Math.random() * 2 - 1) * env;
        }

        // 2. Spacebar softer thud noise buffer (22ms)
        const spaceLen = Math.floor(sr * 0.022);
        const spaceBuf = ctx.createBuffer(1, spaceLen, sr);
        const sd = spaceBuf.getChannelData(0);
        for (let i = 0; i < spaceLen; i++) {
          const env = Math.exp(-i / (sr * 0.0055));
          sd[i] = (Math.random() * 2 - 1) * env;
        }

        // 3. Punctuation crisp accent noise buffer (20ms)
        const punctLen = Math.floor(sr * 0.02);
        const punctBuf = ctx.createBuffer(1, punctLen, sr);
        const pd = punctBuf.getChannelData(0);
        for (let i = 0; i < punctLen; i++) {
          const env = Math.exp(-i / (sr * 0.004));
          pd[i] = (Math.random() * 2 - 1) * env;
        }

        clickBuffersRef.current = {
          char: charBuf,
          space: spaceBuf,
          punct: punctBuf,
        };
      }

      return ctx;
    } catch {
      return null;
    }
  }, []);

  // Unlock AudioContext eagerly on mount and on user interactions
  useEffect(() => {
    ensureAudioContext();
    // Preload background image so it is immediately cached and rendered without latency
    if (typeof window !== "undefined") {
      const img = new Image();
      img.src = entranceBg;
    }
  }, [ensureAudioContext]);

  const handleUserInteract = useCallback(() => {
    ensureAudioContext();
  }, [ensureAudioContext]);

  // High-fidelity, rich and loud mechanical typewriter sound synthesis via Web Audio API
  const playClickSound = useCallback(
    (char?: string) => {
      try {
        const ctx = ensureAudioContext();
        if (!ctx || ctx.state !== "running") return;

        const now = ctx.currentTime;
        const isSpace = char === " ";
        const isPeriod = char === ".";

        // Master output gain bus for punchy, crisp, loud typing sound
        const masterGain = ctx.createGain();
        const masterVol = isPeriod ? 0.48 : isSpace ? 0.38 : 0.44;
        masterGain.gain.setValueAtTime(masterVol, now);
        masterGain.connect(ctx.destination);

        // 1. Acoustic Transient Noise Clack (Tactile hammer striking platen)
        const buffers = clickBuffersRef.current;
        if (buffers) {
          const buffer = isSpace ? buffers.space : isPeriod ? buffers.punct : buffers.char;
          const noiseSource = ctx.createBufferSource();
          noiseSource.buffer = buffer;

          const noiseFilter = ctx.createBiquadFilter();
          noiseFilter.type = "bandpass";
          const centerFreq = isSpace
            ? 2200
            : isPeriod
              ? 3800
              : 3300 + (Math.random() * 400 - 200);
          noiseFilter.frequency.setValueAtTime(centerFreq, now);
          noiseFilter.Q.setValueAtTime(isSpace ? 1.8 : 2.5, now);

          const noiseGain = ctx.createGain();
          noiseGain.gain.setValueAtTime(0.65, now);
          noiseGain.gain.exponentialRampToValueAtTime(0.001, now + (isSpace ? 0.022 : 0.016));

          noiseSource.connect(noiseFilter);
          noiseFilter.connect(noiseGain);
          noiseGain.connect(masterGain);
          noiseSource.start(now);
        }

        // 2. Metallic Typebar Ring / Tactile Switch Snap (High resonant ping)
        const metalOsc = ctx.createOscillator();
        const metalGain = ctx.createGain();
        metalOsc.type = "sine";
        const metalFreq = isSpace ? 1200 : 2300 + (Math.random() * 300 - 150);
        metalOsc.frequency.setValueAtTime(metalFreq, now);
        metalOsc.frequency.exponentialRampToValueAtTime(isSpace ? 450 : 750, now + 0.026);

        metalGain.gain.setValueAtTime(isSpace ? 0.22 : 0.36, now);
        metalGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.026);

        metalOsc.connect(metalGain);
        metalGain.connect(masterGain);
        metalOsc.start(now);
        metalOsc.stop(now + 0.026);

        // 3. Acoustic Platen Chassis Thump (Deep wooden/body desk resonance)
        const thudOsc = ctx.createOscillator();
        const thudGain = ctx.createGain();
        thudOsc.type = isSpace ? "sine" : "triangle";
        const baseThud = isSpace ? 120 : isPeriod ? 175 : 155;
        const thudFreq = baseThud + (Math.random() * 24 - 12);
        thudOsc.frequency.setValueAtTime(thudFreq, now);
        thudOsc.frequency.exponentialRampToValueAtTime(36, now + 0.042);

        thudGain.gain.setValueAtTime(isSpace ? 0.44 : 0.38, now);
        thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.042);

        thudOsc.connect(thudGain);
        thudGain.connect(masterGain);
        thudOsc.start(now);
        thudOsc.stop(now + 0.042);
      } catch {
        // Audio playback restrictions safely handled
      }
    },
    [ensureAudioContext],
  );

  // Carriage return metallic slide click between line 1 and line 2
  const playCarriageReturn = useCallback(() => {
    try {
      const ctx = ensureAudioContext();
      if (!ctx || ctx.state !== "running") return;
      const now = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(920, now);
      osc.frequency.exponentialRampToValueAtTime(1840, now + 0.035);
      osc.frequency.exponentialRampToValueAtTime(520, now + 0.075);

      gain.gain.setValueAtTime(0.24, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.075);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.075);
    } catch {
      // Audio playback restrictions safely handled
    }
  }, [ensureAudioContext]);

  // Video Autoplay handler - ALWAYS plays with sound initially
  useEffect(() => {
    if (stage !== "video") return;
    const v = videoRef.current;
    if (!v) return;

    // Start unmuted as requested - always initially with sound
    v.defaultMuted = false;
    v.muted = false;
    v.volume = 1.0;
    v.playsInline = true;

    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch((err) => {
        // Autoplay policy may pause until first gesture, play immediately and unlock sound
        console.warn("Autoplay audio restriction caught:", err);
        v.muted = true;
        v.play()
          .then(() => {
            v.muted = false;
          })
          .catch(() => {});
      });
    }

    // Immediately restore full sound on any pointer, touch, or click interaction
    const unlockSound = () => {
      if (v) {
        v.muted = false;
        v.volume = 1.0;
        if (v.paused) v.play().catch(() => {});
      }
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("touchstart", unlockSound);
      window.removeEventListener("click", unlockSound);
    };

    window.addEventListener("pointerdown", unlockSound, { once: true });
    window.addEventListener("touchstart", unlockSound, { once: true });
    window.addEventListener("click", unlockSound, { once: true });

    return () => {
      window.removeEventListener("pointerdown", unlockSound);
      window.removeEventListener("touchstart", unlockSound);
      window.removeEventListener("click", unlockSound);
      if (v) {
        v.pause();
      }
    };
  }, [stage]);

  // Handle video progress updates directly via DOM ref to avoid re-renders
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration || !progressRef.current) return;
    const pct = Math.min(100, Math.max(0, (v.currentTime / v.duration) * 100));
    progressRef.current.style.width = `${pct}%`;
  };

  // Video ended -> cleanly pause and transition to quote stage
  const handleVideoEnd = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setStage("quote");
  }, []);

  // User taps "Skip" during video
  const handleSkipVideo = useCallback(
    (e?: React.MouseEvent) => {
      e?.stopPropagation();
      handleUserInteract();
      if (videoRef.current) {
        videoRef.current.pause();
      }
      setStage("quote");
    },
    [handleUserInteract],
  );

  // Toggle mute state for video
  const handleToggleMute = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMuted((prev) => {
      const next = !prev;
      if (videoRef.current) {
        videoRef.current.muted = next;
      }
      return next;
    });
  }, []);

  // Skip typewriter animation on tap if still typing
  const handleSkipTyping = useCallback(() => {
    handleUserInteract();
    if (activeLine !== "done") {
      setDisplayedLine1(LINE1);
      setDisplayedLine2(LINE2);
      setActiveLine("done");
    }
  }, [activeLine, handleUserInteract]);

  // Typewriter animation effect when in "quote" stage
  useEffect(() => {
    if (stage !== "quote") return;

    let timer: ReturnType<typeof setTimeout>;

    // Start typing immediately after video finishes without delay
    timer = setTimeout(() => {
      let idx1 = 0;
      const typeLine1 = () => {
        if (idx1 < LINE1.length) {
          const char = LINE1[idx1];
          idx1++;
          setDisplayedLine1(LINE1.slice(0, idx1));
          playClickSound(char);
          timer = setTimeout(typeLine1, 56);
        } else {
          setActiveLine(2);
          playCarriageReturn();
          // Pause between line 1 and line 2 (carriage return)
          timer = setTimeout(() => {
            let idx2 = 0;
            const typeLine2 = () => {
              if (idx2 < LINE2.length) {
                const char = LINE2[idx2];
                idx2++;
                setDisplayedLine2(LINE2.slice(0, idx2));
                playClickSound(char);
                timer = setTimeout(typeLine2, 56);
              } else {
                setActiveLine("done");
              }
            };
            typeLine2();
          }, 320);
        }
      };
      typeLine1();
    }, 40);

    return () => clearTimeout(timer);
  }, [stage, playClickSound, playCarriageReturn]);

  // Handle final Enter Dashboard click
  const handleEnterClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsExiting(true);
    setTimeout(() => {
      onEnter();
    }, 280);
  };

  return (
    <div
      className="mq-entrance-overlay"
      onClick={handleUserInteract}
      role="region"
      aria-label="Welcome to Maatram Dashboard"
    >
      <div className={`mq-entrance-card ${isExiting ? "is-exiting" : ""}`}>
        {/* =========================================================================
            STAGE 1: Video Intro Animation Layer (Initially Unmuted)
            ========================================================================= */}
        {stage === "video" && (
          <div
            className="mq-entrance-layer mq-entrance-video-layer is-active"
            onClick={handleSkipVideo}
          >
            <video
              ref={videoRef}
              className="mq-entrance-video"
              src="/assets/dashboard/intro-animation.mp4"
              playsInline
              autoPlay
              muted={isMuted}
              preload="auto"
              onEnded={handleVideoEnd}
              onTimeUpdate={handleTimeUpdate}
            />

            {/* Top Video Controls: Sound Toggle and Skip Button */}
            <div className="mq-entrance-top-controls">
              <button
                type="button"
                className="mq-entrance-mute-btn"
                aria-label={isMuted ? "Unmute video sound" : "Mute video sound"}
                onClick={handleToggleMute}
                title={isMuted ? "Unmute sound" : "Mute sound"}
              >
                {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
              </button>
              <button
                type="button"
                className="mq-entrance-skip-btn"
                aria-label="Skip to quote"
                onClick={handleSkipVideo}
              >
                <span>Skip</span>
                <ChevronRight size={15} />
              </button>
            </div>

            {/* Golden Video Progress Bar */}
            <div className="mq-entrance-video-progress" aria-hidden="true">
              <div
                ref={progressRef}
                className="mq-entrance-video-progress-fill"
                style={{ width: "0%" }}
              />
            </div>
          </div>
        )}

        {/* =========================================================================
            STAGE 2: Inspirational Quote & Enter Dashboard Layer
            (Sound icon removed as requested; louder unmuted typewriter sound active)
            ========================================================================= */}
        <div
          className={`mq-entrance-layer mq-entrance-quote-layer ${
            stage === "quote" ? "is-active" : "is-hidden"
          }`}
          style={{ backgroundImage: `url(${entranceBg})` }}
        >
          {/* Content container aligned over bottom section of background */}
          <div className="mq-entrance-body" onClick={handleSkipTyping}>
            {/* Animated Quote */}
            <div className="mq-entrance-quote" aria-live="polite">
              <p className="mq-entrance-line">
                {displayedLine1}
                {activeLine === 1 && <span className="mq-entrance-cursor">|</span>}
              </p>
              <p className="mq-entrance-line">
                {displayedLine2}
                {activeLine === 2 && <span className="mq-entrance-cursor">|</span>}
              </p>
            </div>

            {/* Yellow Enter Dashboard Button - appears only after typing is completed */}
            {activeLine === "done" && (
              <div className="mq-entrance-btn-wrap mq-entrance-btn-appear">
                <button type="button" className="mq-btn mq-entrance-btn" onClick={handleEnterClick}>
                  Enter Dashboard
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
