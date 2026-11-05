import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useCallback, useState, useRef } from "react";
import splashVideo from "@/assets/splash/splash-animation.mp4";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo("Welcome", "Volunteer. Empower. Transform. — the Maatram Foundation volunteer platform."),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const router = useRouter();
  const [isExiting, setIsExiting] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  const handleProceed = useCallback(() => {
    setIsExiting(true);
    setTimeout(() => {
      navigate({ to: "/welcome" });
    }, 280);
  }, [navigate]);

  useEffect(() => {
    // Preload next route immediately during splash animation
    router.preloadRoute({ to: "/welcome" }).catch(() => {});

    // Fallback timer ensures transition even under extreme device power-saver modes
    const fallbackTimer = setTimeout(handleProceed, 10200);

    const video = videoRef.current;
    if (video) {
      video.currentTime = 0;
      video.play().catch(() => {});
    }

    return () => clearTimeout(fallbackTimer);
  }, [router, handleProceed]);

  return (
    <div
      className="mq-splash-video-overlay"
      onClick={handleProceed}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleProceed();
      }}
      aria-label="Maatram Foundation Splash Animation"
    >
      <div className={`mq-splash-video-card ${isExiting ? "is-exiting" : ""}`}>
        <video
          ref={videoRef}
          className="mq-splash-video"
          src={splashVideo}
          autoPlay
          muted
          playsInline
          preload="auto"
          onEnded={handleProceed}
        />
      </div>
    </div>
  );
}
