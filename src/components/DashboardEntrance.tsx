import { useEffect, useState, useRef, useCallback } from "react";
import { Volume2, VolumeX } from "lucide-react";
import entranceBg from "@/assets/dashboard/dashboard-entrance-bg.jpg";

const LINE1 = "Be the hands that help.";
const LINE2 = "Be the change that lasts.";

export function DashboardEntrance({ onEnter }: { onEnter: () => void }) {
  const [displayedLine1, setDisplayedLine1] = useState("");
  const [displayedLine2, setDisplayedLine2] = useState("");
  const [activeLine, setActiveLine] = useState<1 | 2 | "done">(1);
  const [isMuted, setIsMuted] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Play realistic typewriter mechanical key-click sound
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

      // 1. High frequency mechanical contact click (1200 - 1600 Hz)
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

  // Unmute / unlock AudioContext on first user interaction
  const handleUserInteract = useCallback(() => {
    if (audioCtxRef.current && audioCtxRef.current.state === "suspended") {
      audioCtxRef.current.resume().catch(() => {});
    }
  }, []);

  // Skip animation on screen tap if still typing
  const handleSkipTyping = useCallback(() => {
    handleUserInteract();
    if (activeLine !== "done") {
      setDisplayedLine1(LINE1);
      setDisplayedLine2(LINE2);
      setActiveLine("done");
    }
  }, [activeLine, handleUserInteract]);

  // Typewriter animation loop
  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    // Initial pause before typing starts
    timer = setTimeout(() => {
      let idx1 = 0;
      const typeLine1 = () => {
        if (idx1 < LINE1.length) {
          idx1++;
          setDisplayedLine1(LINE1.slice(0, idx1));
          playClickSound();
          timer = setTimeout(typeLine1, 58);
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
                timer = setTimeout(typeLine2, 58);
              } else {
                setActiveLine("done");
              }
            };
            typeLine2();
          }, 360);
        }
      };
      typeLine1();
    }, 280);

    return () => clearTimeout(timer);
  }, [playClickSound]);

  return (
    <div
      className="mq-entrance-overlay"
      onClick={handleUserInteract}
      role="region"
      aria-label="Welcome to Maatram Dashboard"
    >
      <div className="mq-entrance-card" style={{ backgroundImage: `url(${entranceBg})` }}>
        {/* Audio Mute / Unmute Toggle */}
        <button
          type="button"
          className="mq-entrance-mute-btn"
          aria-label={isMuted ? "Unmute typing sound" : "Mute typing sound"}
          onClick={(e) => {
            e.stopPropagation();
            setIsMuted((m) => !m);
          }}
          title={isMuted ? "Unmute sound" : "Mute sound"}
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </button>

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
            <button
              type="button"
              className="mq-entrance-btn"
              onClick={(e) => {
                e.stopPropagation();
                onEnter();
              }}
            >
              Enter Dashboard
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
