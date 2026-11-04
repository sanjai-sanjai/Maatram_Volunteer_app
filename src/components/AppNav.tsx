import { Link } from "@tanstack/react-router";
import { ChartNoAxesColumnIncreasing, Compass, House, UserRound, Users } from "lucide-react";
import type { ReactNode } from "react";
import { BackButton, Logo } from "@/components/mq";

const items = [
  { to: "/dashboard", label: "Home", icon: <House /> },
  { to: "/explore", label: "Explore", icon: <Compass /> },
  { to: "/community", label: "Community", icon: <Users /> },
  { to: "/impact", label: "Impact", icon: <ChartNoAxesColumnIncreasing /> },
  { to: "/profile", label: "Profile", icon: <UserRound /> },
] as const;

export function BottomNav({ active }: { active: string }) {
  return (
    <nav className="mq-dashboard__bottom-nav" aria-label="Main navigation">
      {items.map((i) => (
        <Link
          key={i.to}
          to={i.to}
          className="mq-dashboard__nav-item"
          aria-current={active === i.label ? "page" : undefined}
        >
          {i.icon}
          <span>{i.label}</span>
        </Link>
      ))}
    </nav>
  );
}

/** Lightweight secondary page used by Explore / Community / Impact / Profile / View All. */
export function SubPage({
  title,
  active,
  children,
}: {
  title: string;
  active: string;
  children: ReactNode;
}) {
  return (
    <main className="mq-dashboard">
      <header className="mq-dashboard__topbar">
        <BackButton to="/dashboard" />
        <Logo small />
        <span />
      </header>
      <h1 className="mq-dashboard__section-title" style={{ margin: "18px 0 14px", fontSize: 24 }}>
        {title}
      </h1>
      {children}
      <BottomNav active={active} />
    </main>
  );
}
