import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ChevronRight, GraduationCap, ShieldCheck, UserPlus, Users } from "lucide-react";
import { A, Hl, Logo, Screen, Strokes } from "@/components/mq";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/welcome")({
  head: () =>
    seo(
      "Continue as",
      "Choose how you want to join Maatram Volunteer Quest: student, alumni, admin or other volunteer.",
    ),
  component: Welcome,
});

function Welcome() {
  const navigate = useNavigate();
  const roles = [
    {
      key: "student",
      title: "Maatram Student",
      sub: "Login with your Maatram ID (QR Scan)",
      icon: <GraduationCap className="mq-role__icon" fill="#FEC802" />,
      to: "/login" as const,
      active: true,
    },
    {
      key: "alumni",
      title: "Alumni",
      sub: "Login with your Maatram ID (QR Scan)",
      icon: <Users className="mq-role__icon" />,
      to: "/login" as const,
    },
    {
      key: "admin",
      title: "Admin",
      sub: "Access to event & volunteer management",
      icon: <ShieldCheck className="mq-role__icon" fill="#FEC802" />,
      to: "/admin" as const,
    },
  ];
  return (
    <Screen deco="tr" footer="waves">
      <div style={{ marginTop: 26 }}>
        <Logo />
      </div>
      <div style={{ position: "relative", marginTop: 20 }}>
        <h1 className="mq-title mq-title--lg">
          Welcome to
          <br />
          Maatram <Hl>Volunteer Quest</Hl>
        </h1>
        <Strokes style={{ right: "2%", top: 0 }} />
      </div>
      <p className="mq-sub">
        A unified platform to discover opportunities, collaborate, and create real impact.
      </p>
      <img
        className="mq-welcome__art"
        src={`${A}/illustrations/welcome-volunteers.jpg`}
        alt="Maatram volunteers walking to school"
      />
      <div className="mq-divider-title">Continue as</div>
      {roles.map((r) => (
        <button
          key={r.key}
          className={r.active ? "mq-role mq-role--active" : "mq-role"}
          onClick={() => navigate({ to: r.to })}
        >
          {r.icon}
          <div>
            <strong>{r.title}</strong>
            <span>{r.sub}</span>
          </div>
          <ChevronRight size={24} />
        </button>
      ))}
      <div className="mq-or">or</div>
      <button className="mq-other" onClick={() => navigate({ to: "/register/basic" })}>
        <UserPlus size={26} /> Other Volunteer
      </button>
      <p className="mq-other-sub">Create a new account and join the Maatram community</p>
      <div style={{ height: 20 }} />
    </Screen>
  );
}
