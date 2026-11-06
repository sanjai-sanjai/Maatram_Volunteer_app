import { useEffect, useCallback } from "react";
import { X, Sparkles, CheckCircle2, Zap, Clock3 } from "lucide-react";
import goldenBadge from "@/assets/profile/golden-checkmark-badge.png";

const CONFETTI_COLORS = [
  "#FEC802", // Maatram Gold
  "#FFD000", // Bright Yellow
  "#20B83A", // Emerald Green
  "#FF8A00", // Warm Orange
  "#2B4EBC", // Royal Blue
  "#E53935", // Coral Red
  "#00C49F", // Teal
  "#A855F7", // Purple Spark
];

// Generate 48 confetti particles in a full 360-degree radial blast
const CONFETTI_PIECES = Array.from({ length: 48 }, (_, i) => {
  const angle = (i / 48) * Math.PI * 2 + (Math.random() * 0.2 - 0.1);
  const dist = 110 + (i % 6) * 32 + Math.random() * 20;
  return {
    id: i,
    tx: Math.cos(angle) * dist,
    ty: Math.sin(angle) * dist - 30,
    rot: (i * 67 + Math.random() * 45) % 720 - 360,
    delay: (i % 8) * 0.025,
    color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
    w: 7 + (i % 4) * 3,
    h: 12 + (i % 5) * 3,
    isCircle: i % 5 === 0,
  };
});

export interface DashboardBlastPopupProps {
  role?: string;
  onClose: () => void;
}

export function DashboardBlastPopup({ role = "student", onClose }: DashboardBlastPopupProps) {
  const isAlumni = role === "alumni";

  // Play celebratory fanfare chime via Web Audio API on blast appearance
  const playCelebratoryChime = useCallback(() => {
    if (typeof window === "undefined") return;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      if (ctx.state === "suspended") ctx.resume().catch(() => {});

      const now = ctx.currentTime;
      // Celebratory ascending chime: C5, E5, G5, C6 with sparkling harmonics
      const notes = [523.25, 659.25, 783.99, 1046.5];
      notes.forEach((freq, idx) => {
        const start = now + idx * 0.09;
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = "sine";
        osc.frequency.setValueAtTime(freq, start);

        gain.gain.setValueAtTime(0.0001, start);
        gain.gain.linearRampToValueAtTime(0.24, start + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, start + 0.55);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(start);
        osc.stop(start + 0.6);
      });
    } catch {
      // Audio playback restrictions safely handled
    }
  }, []);

  useEffect(() => {
    playCelebratoryChime();
  }, [playCelebratoryChime]);

  return (
    <div
      className="mq-blast-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Welcome Celebration"
      onClick={onClose}
    >
      <div className="mq-blast-card" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          type="button"
          className="mq-blast-close"
          aria-label="Close celebration"
          onClick={onClose}
        >
          <X size={18} />
        </button>

        {/* Central Badge with Confetti Blast Explosion - Large Prominent Tick Badge */}
        <div className="mq-blast-badge-wrap">
          <div className="mq-blast-confetti-origin" aria-hidden="true">
            {CONFETTI_PIECES.map((p) => (
              <span
                key={p.id}
                className="mq-blast-confetti"
                style={
                  {
                    width: p.w,
                    height: p.h,
                    background: p.color,
                    borderRadius: p.isCircle ? "50%" : "2px",
                    "--tx": `${p.tx}px`,
                    "--ty": `${p.ty}px`,
                    "--rot": `${p.rot}deg`,
                    "--delay": `${p.delay}s`,
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
          <img className="mq-blast-badge-img" src={goldenBadge} alt="Verified Celebration Badge" />
        </div>

        {/* Celebratory Title & Role-Specific Message */}
        <div className="mq-blast-header">
          <div className="mq-blast-sparkle-pill">
            <Sparkles size={14} />
            <span>Welcome to Maatram Quest</span>
          </div>
          <h2 className="mq-blast-title">
            {isAlumni ? "Welcome Back, Changemaker!" : "Welcome to Your Journey!"}
          </h2>
          <span className="mq-blast-swoosh" aria-hidden="true" />
          <p className="mq-blast-sub">
            {isAlumni
              ? "Your alumni profile is verified and ready. Inspire the next generation, lead community drives, and continue the Maatram legacy."
              : "Your Maatram ID has been successfully verified. Discover exciting volunteering opportunities, collaborate, and make real impact today."}
          </p>
        </div>

        {/* Quick Highlights Summary Grid: Verified Tick | Opportunity Available | Hours Contributed */}
        <div className="mq-blast-stats">
          <div className="mq-blast-stat">
            <CheckCircle2 className="mq-blast-stat-icon mq-blast-tick-icon" size={28} />
            <strong>Verified</strong>
            <small>{isAlumni ? "Alumni Lead" : "Active Volunteer"}</small>
          </div>
          <div className="mq-blast-stat">
            <Zap className="mq-blast-stat-icon" size={24} />
            <strong>12</strong>
            <small>Opportunity Available</small>
          </div>
          <div className="mq-blast-stat">
            <Clock3 className="mq-blast-stat-icon" size={24} />
            <strong>48 hrs</strong>
            <small>Hours Contributed</small>
          </div>
        </div>

        {/* Action Button to Enter and Explore */}
        <button type="button" className="mq-btn mq-blast-btn" onClick={onClose}>
          Let's Make an Impact!
        </button>
      </div>
    </div>
  );
}
