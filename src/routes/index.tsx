import { createFileRoute, useNavigate, useRouter } from "@tanstack/react-router";
import { useEffect, useCallback } from "react";
import { ClipboardCheck, Users, Trophy } from "lucide-react";
import { A, Logo, Screen, Strokes } from "@/components/mq";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/")({
  head: () =>
    seo("Welcome", "Volunteer. Empower. Transform. — the Maatram Foundation volunteer platform."),
  component: Splash,
});

function Splash() {
  const navigate = useNavigate();
  const router = useRouter();

  const handleProceed = useCallback(() => {
    navigate({ to: "/welcome" });
  }, [navigate]);

  useEffect(() => {
    // Preload next route immediately during splash animation
    router.preloadRoute({ to: "/welcome" }).catch(() => {});
    const t = setTimeout(handleProceed, 3200);
    return () => clearTimeout(t);
  }, [router, handleProceed]);

  return (
    <div
      onClick={handleProceed}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleProceed();
      }}
      style={{ cursor: "pointer" }}
      title="Click anywhere to continue"
    >
      <Screen deco="tr" footer="landscape">
        <div style={{ marginTop: 34 }}>
          <Logo />
        </div>
        <div className="mq-splash__title">
          <h1>Maatram</h1>
          <h1 className="mq-splash__pill">
            <span>Volunteer Quest</span>
          </h1>
          <Strokes style={{ right: "4%", top: 12 }} />
        </div>
        <p className="mq-tagline">Volunteer. Empower. Transform.</p>
        <img className="mq-swoosh" src={`${A}/decorations/yellow-underline-swoosh.png`} alt="" />
        <img
          className="mq-splash__hero"
          src={`${A}/composites/volunteer-hero-scene.png`}
          alt="Maatram volunteer with students"
        />
        <div className="mq-features">
          <div className="mq-feature">
            <ClipboardCheck />
            Find
            <br />
            Opportunities
          </div>
          <div className="mq-feature">
            <Users />
            Collaborate
            <br />
            &amp; Volunteer
          </div>
          <div className="mq-feature">
            <Trophy />
            Earn
            <br />
            Recognition
          </div>
        </div>
        <div className="mq-splash__from">
          <p>
            From Volunteer Identification to
            <br />
            Volunteer Recognition
          </p>
        </div>
        <p className="mq-eco">One Connected Ecosystem</p>
        <div className="mq-loader" role="status" aria-label="Loading" />
        <p className="mq-loading-text">Loading your volunteering space...</p>
      </Screen>
    </div>
  );
}
