import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  BookOpen,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  CircleCheck,
  Clock,
  House,
  MapPin,
  Pencil,
  Users,
  UsersRound,
} from "lucide-react";
import type { ReactNode } from "react";

export function AdminFrame({
  children,
  nav,
  className = "",
}: {
  children: ReactNode;
  nav?: string;
  className?: string;
}) {
  return (
    <div className="ad-shell">
      <main className={`ad-page ${nav ? "ad-page--nav" : ""} ${className}`}>
        {children}
        {nav && <AdminBottomNav active={nav} />}
      </main>
    </div>
  );
}

export function AdminBack({ to }: { to?: string | undefined }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="ad-round-btn"
      aria-label="Go back"
      onClick={() => (to ? router.navigate({ to: to as "/admin" }) : router.history.back())}
    >
      <ArrowLeft size={24} />
    </button>
  );
}

export function PageHeader({
  title,
  sub,
  back,
  icon,
  right,
}: {
  title: string;
  sub?: string;
  back?: string | undefined;
  icon?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <header className="ad-header">
      <AdminBack to={back} />
      {icon && <span className="ad-header__icon">{icon}</span>}
      <div className="ad-header__text">
        <h1>{title}</h1>
        {sub && <p>{sub}</p>}
      </div>
      {right}
    </header>
  );
}

const navItems = [
  { label: "Home", to: "/admin", icon: <House /> },
  {
    label: "Events",
    to: "/admin/manage/$section" as const,
    params: { section: "events" },
    icon: <CalendarDays />,
  },
  {
    label: "Communities",
    to: "/admin/manage/$section" as const,
    params: { section: "communities" },
    icon: <UsersRound />,
  },
  { label: "Volunteers", to: "/admin/volunteers" as const, icon: <Users /> },
  { label: "Reports", to: "/admin/reports" as const, icon: <ChartNoAxesColumnIncreasing /> },
] as const;

export function AdminBottomNav({ active }: { active: string }) {
  return (
    <nav className="ad-bottom-nav" aria-label="Admin navigation">
      {navItems.map((i) => (
        <Link
          key={i.label}
          {...("params" in i ? { to: i.to, params: i.params } : { to: i.to })}
          activeOptions={{ exact: true }}
          className="ad-bottom-nav__item"
          aria-current={active === i.label ? "page" : undefined}
        >
          {i.icon}
          <span>{i.label}</span>
        </Link>
      ))}
    </nav>
  );
}

const steps = [
  { label: "Event Details", icon: <CalendarDays />, to: "/admin/opportunities/new" },
  { label: "Event Guide", icon: <BookOpen />, to: "/admin/opportunities/new/guide" },
  { label: "Review & Publish", icon: <CircleCheck />, to: "/admin/opportunities/new/review" },
] as const;

export function WizardHeader({ step, onStep }: { step: 1 | 2 | 3; onStep?: (to: string) => void }) {
  return (
    <>
      <header className="ad-header">
        <AdminBack to={step === 1 ? "/admin" : steps[step - 2]!.to} />
        <div className="ad-header__text">
          <h1>Create Opportunity</h1>
          <p>Add a new volunteering event</p>
        </div>
        <div className="ad-step-count" aria-label={`Step ${step} of 3`}>
          <strong>{step} / 3</strong>
          <span className="ad-step-count__track">
            {[1, 2, 3].map((n) => (
              <i key={n} className={n < step ? "done" : n === step ? "active" : ""} />
            ))}
          </span>
        </div>
      </header>
      <div className="ad-steps">
        {steps.map((s, i) => (
          <button
            key={s.label}
            type="button"
            className={`ad-steps__item ${i + 1 === step ? "active" : ""}`}
            disabled={i + 1 > step}
            onClick={() => onStep?.(s.to)}
          >
            {s.icon}
            <span>{s.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

export function SectionHead({
  icon,
  title,
  sub,
  art,
  children,
}: {
  icon: ReactNode;
  title: string;
  sub?: string;
  art?: ReactNode;
  children?: ReactNode;
}) {
  return (
    <div className="ad-section-head">
      <span className="ad-icon-tile ad-icon-tile--lg">{icon}</span>
      <div>
        <h2>{title}</h2>
        {sub && <p>{sub}</p>}
      </div>
      {art}
      {children}
    </div>
  );
}

export function Chip({
  children,
  tone = "yellow",
}: {
  children: ReactNode;
  tone?: "yellow" | "green" | "blue" | "purple" | "mint" | "gray";
}) {
  return <span className={`ad-chip ad-chip--${tone}`}>{children}</span>;
}

export function categoryTone(c: string) {
  return c === "Community Service"
    ? "purple"
    : c === "Environment"
      ? "mint"
      : c === "Event Support"
        ? "purple"
        : "yellow";
}

type Summary = {
  name: string;
  category: string;
  fullLocation: string;
  date: string;
  time: string;
  needed: number;
  image: string;
};
export function EventSummaryCard({
  ev,
  onEdit,
  badge,
}: {
  ev: Summary;
  onEdit?: () => void;
  badge?: ReactNode;
}) {
  return (
    <article className="ad-card ad-summary">
      <img src={ev.image} alt={ev.name} className="ad-summary__img" />
      <div className="ad-summary__body">
        <div className="ad-summary__top">
          <Chip tone={categoryTone(ev.category)}>{ev.category}</Chip>
          {onEdit && <EditBtn onClick={onEdit} />}
          {badge}
        </div>
        <h3>{ev.name}</h3>
        <ul className="ad-meta-list">
          <li>
            <MapPin />
            {ev.fullLocation}
          </li>
          <li>
            <CalendarDays />
            {ev.date}
          </li>
          <li>
            <Clock />
            {ev.time}
          </li>
          <li>
            <Users />
            {ev.needed} Volunteers Needed
          </li>
        </ul>
      </div>
    </article>
  );
}

export function EditBtn({ onClick }: { onClick: () => void }) {
  return (
    <button type="button" className="ad-edit-btn" onClick={onClick}>
      <Pencil size={18} /> Edit
    </button>
  );
}

export function Progress({ value }: { value: number }) {
  return (
    <div
      className="ad-progress"
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <span style={{ width: `${Math.min(100, value)}%` }} />
    </div>
  );
}
