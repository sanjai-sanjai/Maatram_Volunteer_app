import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useCallback, useState, useRef } from "react";
import splashVideo from "@/assets/splash/splash-animation.mp4";
import introVideo from "@/assets/dashboard/intro-animation.mp4";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo("Welcome", "Volunteer. Empower. Transform. — the Maatram Foundation volunteer platform."),
  component: SplashSequence,
});

/**
 * Cleanly stops and releases an HTML5 video element's hardware decoder and buffer.
 * In Blink and WebKit, clearing src and invoking load() releases GPU textures
 * and decoding threads immediately rather than waiting on garbage collection.
 */
function releaseMediaElement(video: HTMLVideoElement | null) {
  if (!video) return;
  try {
    video.pause();
    video.removeAttribute("src");
    video.load();
  } catch {
    /* safely ignore browser-specific errors */
  }
}

type SplashPhase = "video1" | "transition" | "video2" | "exiting";

function SplashSequence() {
  const navigate = useNavigate();
  const router = useRouter();

  const [phase, setPhase] = useState<SplashPhase>("video1");
  const [fadeState, setFadeState] = useState<"visible" | "fading">("visible");

  const video1Ref = useRef<HTMLVideoElement | null>(null);
  const video2Ref = useRef<HTMLVideoElement | null>(null);

  // Smooth final navigation to the main application / dashboard
  const handleFinalNavigation = useCallback(() => {
    setFadeState("fading");
    setTimeout(() => {
      // Smooth navigation to /dashboard with inspirational quote entrance ready
      navigate({ to: "/dashboard", search: { quote: "1" } });
    }, 240);
  }, [navigate]);

  // Transition from Video 1 to Video 2
  const handleVideo1End = useCallback(() => {
    setFadeState("fading");

    setTimeout(() => {
      // 1. Fully release Video 1 hardware decoder
      releaseMediaElement(video1Ref.current);
      // 2. Advance state to Video 2, completely unmounting Video 1 from the DOM
      setPhase("video2");
      setFadeState("visible");
    }, 180);
  }, []);

  // Video 2 completed
  const handleVideo2End = useCallback(() => {
    // Fully release Video 2 hardware decoder
    releaseMediaElement(video2Ref.current);
    handleFinalNavigation();
  }, [handleFinalNavigation]);

  // Handle Video 1 mounting & playback
  useEffect(() => {
    if (phase !== "video1") return;

    const v1 = video1Ref.current;
    if (v1) {
      v1.currentTime = 0;
      v1.play().catch(() => {
        if (v1) {
          v1.muted = true;
          v1.play().catch(() => {});
        }
      });
    }

    // Safety fallback timer if Video 1 gets blocked or paused by power saver
    const fallbackTimer = setTimeout(handleVideo1End, 10500);

    return () => {
      clearTimeout(fallbackTimer);
      releaseMediaElement(v1);
    };
  }, [phase, handleVideo1End]);

  // Handle Video 2 mounting & playback + preloading dashboard route
  useEffect(() => {
    if (phase !== "video2") return;

    // Preload dashboard route and its assets while Video 2 is running
    router.preloadRoute({ to: "/dashboard" }).catch(() => {});

    const v2 = video2Ref.current;
    if (v2) {
      v2.currentTime = 0;
      v2.play().catch(() => {
        if (v2) {
          v2.muted = true;
          v2.play().catch(() => {});
        }
      });
    }

    // Safety fallback timer if Video 2 gets blocked
    const fallbackTimer = setTimeout(handleVideo2End, 10500);

    return () => {
      clearTimeout(fallbackTimer);
      releaseMediaElement(v2);
    };
  }, [phase, router, handleVideo2End]);

  // Skip / advance on user tap or keyboard
  const handleUserSkip = useCallback(() => {
    if (phase === "video1") {
      handleVideo1End();
    } else if (phase === "video2") {
      handleVideo2End();
    }
  }, [phase, handleVideo1End, handleVideo2End]);

  return (
    <div
      className="mq-splash-video-overlay"
      onClick={handleUserSkip}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleUserSkip();
      }}
      aria-label="Maatram Foundation Opening Experience"
    >
      <div className={`mq-splash-video-card ${fadeState === "fading" ? "is-fading" : ""}`}>
        {/* PHASE 1: Video 1 is mounted ONLY while phase === 'video1' */}
        {phase === "video1" && (
          <video
            ref={video1Ref}
            className="mq-splash-video"
            src={splashVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
            x5-playsinline="true"
            onEnded={handleVideo1End}
            onError={handleVideo1End}
          />
        )}

        {/* PHASE 2: Video 2 is mounted ONLY while phase === 'video2' */}
        {phase === "video2" && (
          <video
            ref={video2Ref}
            className="mq-splash-video"
            src={introVideo}
            autoPlay
            muted
            playsInline
            preload="auto"
            webkit-playsinline="true"
            x5-playsinline="true"
            onEnded={handleVideo2End}
            onError={handleVideo2End}
          />
        )}
      </div>
    </div>
  );
}
