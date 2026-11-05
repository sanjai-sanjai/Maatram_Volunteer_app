import { useEffect, useState, useRef, useCallback } from "react";
import { Volume2, VolumeX, ChevronRight } from "lucide-react";
import entranceBg from "@/assets/dashboard/dashboard-entrance-bg.jpg";
import introVideo from "@/assets/dashboard/intro-animation.mp4";

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
  const [isMuted, setIsMuted] = useState(false);
  const [videoProgress, setVideoProgress] = useState(0);

  // Quote typewriter states
  const [displayedLine1, setDisplayedLine1] = useState("");
  const [displayedLine2, setDisplayedLine2] = useState("");
  const [activeLine, setActiveLine] = useState<1 | 2 | "done">(1);

  const audioCtxRef = useRef<AudioContext | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Mechanical typewriter key-click sound synthesis via Web Audio API
  const playClickSound = useCallback(() => {
    if (isMuted || typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;

      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioCtx();
      }
      const ctx = audioCtxRef.current;
      if (ctx.state === "suspended") {
        ctx.resume().catch(() => {});
      }
      if (ctx.state !== "running") return;

      const now = ctx.currentTime;

      // 1. Mechanical contact click (1200 - 1600 Hz)
      const click = ctx.createOscillator();
      const clickGain = ctx.createGain();
      click.type = "sine";
      const freq = 1350 + (Math.random() * 300 - 150);
      click.frequency.setValueAtTime(freq, now);
      click.frequency.exponentialRampToValueAtTime(300, now + 0.022);

      clickGain.gain.setValueAtTime(0.065, now);
      clickGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.022);

      click.connect(clickGain);
      clickGain.connect(ctx.destination);
      click.start(now);
      click.stop(now + 0.022);

      // 2. Subtle low body thud (130 - 170 Hz)
      const thud = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thud.type = "triangle";
      thud.frequency.setValueAtTime(150 + (Math.random() * 25 - 12), now);
      thud.frequency.exponentialRampToValueAtTime(45, now + 0.032);

      thudGain.gain.setValueAtTime(0.075, now);
      thudGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.032);

      thud.connect(thudGain);
      thudGain.connect(ctx.destination);
      thud.start(now);
      thud.stop(now + 0.032);
    } catch {
      // Audio playback restrictions safely handled
    }
  }, [isMuted]);

  // Unmute / unlock AudioContext on user interaction
  const handleUserInteract = useCallback(() => {
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }
  }, []);

  // Video Autoplay handler with audio policy fallback
  useEffect(() => {
    if (stage !== "video") return;
    const v = videoRef.current;
    if (!v) return;

    v.currentTime = 0;
    const playPromise = v.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay policy prevented unmuted playback, mute and continue automatically
        if (videoRef.current) {
          videoRef.current.muted = true;
          setIsMuted(true);
          videoRef.current.play().catch(() => {});
        }
      });
    }
  }, [stage]);

  // Handle video progress updates
  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v || !v.duration) return;
    const pct = Math.min(100, Math.max(0, (v.currentTime / v.duration) * 100));
    setVideoProgress(pct);
  };

  // Video ended -> transition smoothly to quote stage
  const handleVideoEnd = useCallback(() => {
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

  // Toggle mute state for video and typewriter sound
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

    // Initial pause before typing starts
    timer = setTimeout(() => {
      let idx1 = 0;
      const typeLine1 = () => {
        if (idx1 < LINE1.length) {
          idx1++;
          setDisplayedLine1(LINE1.slice(0, idx1));
          playClickSound();
          timer = setTimeout(typeLine1, 56);
        } else {
          setActiveLine(2);
          // Pause between line 1 and line 2 (carriage return)
          timer = setTimeout(() => {
            let idx2 = 0;
            const typeLine2 = () => {
              if (idx2 < LINE2.length) {
                idx2++;
                setDisplayedLine2(LINE2.slice(0, idx2));
                playClickSound();
                timer = setTimeout(typeLine2, 56);
              } else {
                setActiveLine("done");
              }
            };
            typeLine2();
          }, 340);
        }
      };
      typeLine1();
    }, 260);

    return () => clearTimeout(timer);
  }, [stage, playClickSound]);

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
            STAGE 1: Video Intro Animation Layer
            ========================================================================= */}
        <div
          className={`mq-entrance-layer mq-entrance-video-layer ${
            stage === "video" ? "is-active" : "is-hidden"
          }`}
          onClick={handleSkipVideo}
        >
          <video
            ref={videoRef}
            className="mq-entrance-video"
            src={introVideo}
            playsInline
            autoPlay
            muted={isMuted}
            preload="auto"
            onEnded={handleVideoEnd}
            onTimeUpdate={handleTimeUpdate}
            onError={handleVideoEnd}
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
              className="mq-entrance-video-progress-fill"
              style={{ width: `${videoProgress}%` }}
            />
          </div>
        </div>

        {/* =========================================================================
            STAGE 2: Inspirational Quote & Enter Dashboard Layer
            ========================================================================= */}
        <div
          className={`mq-entrance-layer mq-entrance-quote-layer ${
            stage === "quote" ? "is-active" : "is-hidden"
          }`}
          style={{ backgroundImage: `url(${entranceBg})` }}
        >
          {/* Audio Mute / Unmute Toggle */}
          <div className="mq-entrance-top-controls">
            <button
              type="button"
              className="mq-entrance-mute-btn"
              aria-label={isMuted ? "Unmute typing sound" : "Mute typing sound"}
              onClick={handleToggleMute}
              title={isMuted ? "Unmute sound" : "Mute sound"}
            >
              {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            </button>
          </div>

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

            {/* Yellow Enter Dashboard Button */}
            <div className="mq-entrance-btn-wrap">
              <button type="button" className="mq-entrance-btn" onClick={handleEnterClick}>
                Enter Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
