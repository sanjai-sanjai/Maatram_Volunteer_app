import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useCallback, useState, useRef } from "react";
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

    const video = videoRef.current;
    if (video) {
      video.defaultMuted = true;
      video.muted = true;
      video.playsInline = true;

      // Play video with autoplay fallback
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => {
          console.warn("Video autoplay prevented by browser policy:", err);
          // If browser policy blocks autoplay, ensure muted is enforced and retry
          video.muted = true;
          video.play().catch(() => {});
        });
      }
    }

    // Safety fallback timer (e.g. 10.5 seconds if video ends or cannot play)
    const fallbackTimer = setTimeout(handleProceed, 10500);

    return () => {
      clearTimeout(fallbackTimer);
      if (video) {
        video.pause();
      }
    };
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
          src="/assets/splash/splash-animation.mp4"
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
