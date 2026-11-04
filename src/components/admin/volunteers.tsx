import { Link, useRouter } from "@tanstack/react-router";
import {
  ArrowLeft,
  Bell,
  BriefcaseBusiness,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Clock,
  Crown,
  Eye,
  Filter,
  GraduationCap,
  House,
  MapPin,
  Menu,
  Pause,
  Play,
  Search,
  ShieldCheck,
  UserRound,
  UserX,
  Users,
  UsersRound,
} from "lucide-react";
import { useEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import avatar from "@/assets/admin/admin-profile-avatar.png";
import mark from "@/assets/admin/maatram-logo-full.png";
import { formatDuration, type Activity, type Volunteer } from "@/data/volunteers-mock";

/* ---------- session-only approval store ---------- */
let approved: string[] = [];
const subs = new Set<() => void>();
export const approveVolunteer = (id: string) => {
  if (!approved.includes(id)) {
    approved = [...approved, id];
    subs.forEach((f) => f());
  }
};
export function useApproved() {
  return useSyncExternalStore(
    (f) => {
      subs.add(f);
      return () => {
        subs.delete(f);
      };
    },
    () => approved,
    () => approved,
  );
}

/* ---------- shell ---------- */
export function VolunteerFrame({
  children,
  nav = true,
  export: exp = false,
}: {
  children: ReactNode;
  nav?: boolean;
  export?: boolean;
}) {
  return (
    <div className="ad-shell vl-shell">
      <main className={`vl-page ${nav ? "vl-page--nav" : ""} ${exp ? "vl-page--export" : ""}`}>
        {children}
        {nav && <BottomNavigation active="Volunteers" />}
      </main>
    </div>
  );
}

export function VolunteerHeader({ crumb }: { crumb?: string | undefined }) {
  const [bell, setBell] = useState(false);
  return (
    <header className="vl-head">
      <Link to="/admin" className="vl-round" aria-label="Menu">
        <Menu />
      </Link>
      <img className="vl-head__logo" src={mark} alt="Maatram Foundation" />
      <div className="vl-head__text">
        <strong>Maatram Foundation</strong>
        <span>
          Volunteers
          {crumb && (
            <>
              {" "}
              / <b>{crumb}</b>
            </>
          )}
        </span>
      </div>
      <button
        type="button"
        className="vl-round vl-bell"
        aria-label="Notifications"
        onClick={() => setBell((b) => !b)}
      >
        <Bell />
        <i />
      </button>
      <span className="vl-avatar">
        <img src={avatar} alt="Admin" />
      </span>
      {bell && (
        <div className="vl-pop vl-pop--bell" role="dialog" aria-label="Notifications">
          <p>
            <ShieldCheck size={16} /> 18 volunteer profiles await verification
          </p>
          <p>
            <Users size={16} /> 42 new volunteers joined this week
          </p>
        </div>
      )}
    </header>
  );
}

function HeroArt() {
  return (
    <svg className="vl-hero__art" viewBox="0 0 170 130" aria-hidden>
      <g fill="#FFC900">
        <circle cx="38" cy="66" r="15" />
        <path d="M8 128c0-24 13-38 30-38s30 14 30 38z" />
        <circle cx="132" cy="66" r="15" />
        <path d="M102 128c0-24 13-38 30-38s30 14 30 38z" />
      </g>
      <g fill="#FFC900" stroke="#fff" strokeWidth="4">
        <circle cx="85" cy="50" r="22" />
        <path d="M42 130c0-32 19-52 43-52s43 20 43 52z" />
      </g>
      <g stroke="#FFC900" strokeWidth="5" strokeLinecap="round">
        <path d="M128 8l-4 18" />
        <path d="M156 16l-16 14" />
        <path d="M164 40l-20 2" />
      </g>
    </svg>
  );
}

export function VolunteerHero() {
  return (
    <section className="vl-hero">
      <div className="vl-hero__wave" aria-hidden />
      <div className="vl-hero__text">
        <h1>Volunteers</h1>
        <p>Manage, verify and organize your volunteer community.</p>
      </div>
      <HeroArt />
    </section>
  );
}

export type VolTab = "verification" | "all" | "active" | "tiers";
export function VolunteerCategoryCard({
  icon,
  label,
  active,
  onClick,
}: {
  icon: ReactNode;
  label: ReactNode;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      className={`vl-cat ${active ? "is-active" : ""}`}
      aria-pressed={active}
      onClick={onClick}
    >
      <span className="vl-cat__icon">{icon}</span>
      <span className="vl-cat__label">{label}</span>
    </button>
  );
}

export function VolunteerCategories({
  tab,
  onTab,
  pending,
}: {
  tab: VolTab;
  onTab: (t: VolTab) => void;
  pending: number;
}) {
  return (
    <div className="vl-cats">
      <VolunteerCategoryCard
        icon={<ShieldCheck />}
        label={
          <>
            Verification
            <br />({pending})
          </>
        }
        active={tab === "verification"}
        onClick={() => onTab("verification")}
      />
      <VolunteerCategoryCard
        icon={<UsersRound />}
        label={
          <>
            All
            <br />
            Volunteers
            <br />
            (4,500)
          </>
        }
        active={tab === "all"}
        onClick={() => onTab("all")}
      />
      <VolunteerCategoryCard
        icon={<span className="vl-dot" />}
        label={
          <>
            Active
            <br />
            (286)
          </>
        }
        active={tab === "active"}
        onClick={() => onTab("active")}
      />
      <VolunteerCategoryCard
        icon={<Crown className="vl-crown" />}
        label={
          <>
            Tier
            <br />
            Management
          </>
        }
        active={tab === "tiers"}
        onClick={() => onTab("tiers")}
      />
    </div>
  );
}

export function ListHead({
  title,
  count,
  sub,
  badge,
}: {
  title: string;
  count?: string;
  sub: string;
  badge?: number;
}) {
  return (
    <div className="vl-listhead">
      <span className="vl-listhead__bar" aria-hidden />
      <div>
        <h2>
          {title}
          {count && <small> {count}</small>}
          {badge !== undefined && <em className="vl-count">{badge}</em>}
        </h2>
        <p>{sub}</p>
      </div>
    </div>
  );
}

export function SearchBar({
  value,
  onChange,
  placeholder,
  filter,
  onFilter,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
  filter: string;
  onFilter: (f: string) => void;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="vl-search">
      <label className="vl-search__box">
        <Search />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          aria-label="Search volunteers"
        />
      </label>
      <button
        type="button"
        className={`vl-round vl-filter ${filter !== "All" ? "is-on" : ""}`}
        aria-label="Filter"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
      >
        <Filter />
      </button>
      {open && (
        <div className="vl-pop vl-pop--filter" role="menu">
          <strong>Working status</strong>
          {["All", "Student", "Employee"].map((f) => (
            <button
              key={f}
              type="button"
              className={filter === f ? "is-on" : ""}
              onClick={() => {
                onFilter(f);
                setOpen(false);
              }}
            >
              {f}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function StatusBadge({
  kind,
}: {
  kind: "pending" | "volunteered" | "non" | "verified" | "completed" | "upcoming";
}) {
  const map = {
    pending: [<Clock key="i" />, "Pending"],
    volunteered: [<CheckCircle2 key="i" />, "Volunteered"],
    non: [<UserX key="i" />, "Non-Volunteered"],
    verified: [<CheckCircle2 key="i" />, "Verified"],
    completed: [null, "Completed"],
    upcoming: [null, "Upcoming"],
  } as const;
  const [icon, text] = map[kind];
  return (
    <span className={`vl-badge vl-badge--${kind}`}>
      {icon}
      {text}
    </span>
  );
}

export const WorkIcon = ({ s }: { s: Volunteer["status"] }) =>
  s === "Student" ? <GraduationCap /> : <BriefcaseBusiness />;

export function VolunteerListItem({ v, mode }: { v: Volunteer; mode: "pending" | "directory" }) {
  const inner = (
    <>
      <img className="vl-item__img" src={v.avatar} alt="" />
      <div className="vl-item__body">
        <h3>{v.name}</h3>
        {mode === "pending" ? (
          <p>
            <WorkIcon s={v.status} />
            {v.status}
          </p>
        ) : (
          <p>
            <UserRound />
            {v.status}
            <span className="vl-sep">•</span>ID: {v.id}
          </p>
        )}
        <p>
          <MapPin />
          {v.location}
        </p>
      </div>
      <div className="vl-item__side">
        {mode === "pending" ? (
          <StatusBadge kind="pending" />
        ) : (
          <>
            <StatusBadge kind={v.volunteered ? "volunteered" : "non"} />
            <span className="vl-item__acts">
              <CalendarDays />
              {v.activities} Activities
            </span>
          </>
        )}
      </div>
      <ChevronRight className="vl-item__chev" />
    </>
  );
  return mode === "pending" ? (
    <Link to="/admin/volunteers/review/$id" params={{ id: v.id }} className="vl-item">
      {inner}
    </Link>
  ) : (
    <Link to="/admin/volunteers/$id" params={{ id: v.id }} className="vl-item">
      {inner}
    </Link>
  );
}

export function Pagination({ total }: { total: number }) {
  const [p, setP] = useState(1);
  const last = Math.ceil(total / 10);
  const pages = [1, 2, 3];
  return (
    <div className="vl-pager">
      <span>
        Showing {(p - 1) * 10 + 1} – {p * 10} of {total.toLocaleString("en-IN")} volunteers
      </span>
      <div>
        <button
          type="button"
          aria-label="Previous page"
          onClick={() => setP((x) => Math.max(1, x - 1))}
        >
          <ChevronLeft />
        </button>
        {pages.map((n) => (
          <button key={n} type="button" className={p === n ? "is-on" : ""} onClick={() => setP(n)}>
            {n}
          </button>
        ))}
        <i>•••</i>
        <button type="button" className={p === last ? "is-on" : ""} onClick={() => setP(last)}>
          {last}
        </button>
        <button
          type="button"
          aria-label="Next page"
          onClick={() => setP((x) => Math.min(last, x + 1))}
        >
          <ChevronRight />
        </button>
      </div>
    </div>
  );
}

export function SheetsIcon() {
  return (
    <svg viewBox="0 0 24 32" width="26" height="34" aria-hidden>
      <path d="M2 0h14l8 8v22a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z" fill="#0F9D58" />
      <path d="M16 0l8 8h-6a2 2 0 0 1-2-2z" fill="#87CEAC" />
      <path d="M5 14h14v11H5z" fill="#fff" />
      <path
        d="M6.5 15.5h4.5v3H6.5zM13 15.5h4.5v3H13zM6.5 20.5h4.5v3H6.5zM13 20.5h4.5v3H13z"
        fill="#0F9D58"
      />
    </svg>
  );
}

/* ---------- review screen pieces ---------- */
export function BackButton({ to }: { to?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      className="vl-round vl-round--sq"
      aria-label="Go back"
      onClick={() => (to ? router.navigate({ to: to as "/admin" }) : router.history.back())}
    >
      <ArrowLeft />
    </button>
  );
}

export function Sparks({ className = "" }: { className?: string }) {
  return (
    <svg className={`vl-sparks ${className}`} viewBox="0 0 40 30" aria-hidden>
      <g stroke="#FFC900" strokeWidth="3.5" strokeLinecap="round">
        <path d="M8 4l-3 10" />
        <path d="M24 4l-10 10" />
        <path d="M32 18l-14 2" />
      </g>
    </svg>
  );
}

export function InfoSection({
  icon,
  title,
  sub,
  children,
  className = "",
}: {
  icon: ReactNode;
  title: string;
  sub?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`vl-card vl-sec ${className}`}>
      <div className="vl-sec__head">
        <span className="vl-tile">{icon}</span>
        <div>
          <h2>{title}</h2>
          {sub && <p>{sub}</p>}
        </div>
      </div>
      {children}
    </section>
  );
}

export function DetailRow({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="vl-detail">
      {icon}
      <span className="vl-detail__label">{label}</span>
      <span className="vl-detail__colon">:</span>
      <strong>{value}</strong>
    </div>
  );
}

function AadhaarVisual() {
  return (
    <div className="vl-aadhaar" aria-label="Aadhaar card preview">
      <div className="vl-aadhaar__top">
        <div className="vl-aadhaar__logo">
          <svg viewBox="0 0 40 22" aria-hidden>
            {Array.from({ length: 9 }).map((_, i) => {
              const a = Math.PI - (i * Math.PI) / 8;
              return (
                <line
                  key={i}
                  x1={20 + Math.cos(a) * 7}
                  y1={20 - Math.sin(a) * 7}
                  x2={20 + Math.cos(a) * 17}
                  y2={20 - Math.sin(a) * 17}
                  stroke={i % 2 ? "#E8312F" : "#F6A51C"}
                  strokeWidth="2.6"
                  strokeLinecap="round"
                />
              );
            })}
            <circle cx="20" cy="20" r="5" fill="#E8312F" />
          </svg>
          <b>AADHAAR</b>
        </div>
        <div className="vl-aadhaar__flag">
          <i />
          <i />
        </div>
      </div>
      <div className="vl-aadhaar__bottom">
        <span className="vl-aadhaar__photo">
          <UserRound />
        </span>
        <div className="vl-aadhaar__lines">
          <i />
          <i />
          <i />
        </div>
      </div>
    </div>
  );
}

export function IdentityDocumentCard({
  type,
  size,
  onView,
}: {
  type: string;
  size: string;
  onView: () => void;
}) {
  return (
    <div className="vl-idcard">
      <div className="vl-idcard__info">
        <h3>
          <CheckCircle2 className="vl-green" />
          {type}
        </h3>
        <p>
          ID Proof <span>•</span> Uploaded ({size})
        </p>
        <button type="button" className="vl-btn vl-btn--ghost vl-btn--sm" onClick={onView}>
          <Eye /> View Document
        </button>
      </div>
      <span className="vl-idcard__div" aria-hidden />
      <AadhaarVisual />
    </div>
  );
}

const WAVE = [
  6, 10, 14, 8, 18, 12, 22, 9, 15, 24, 11, 7, 16, 20, 10, 26, 13, 18, 9, 22, 14, 8, 19, 25, 12, 7,
  16, 10, 21, 13, 8, 17, 11, 23, 9, 14, 6, 10, 5, 4,
];
export function VoiceNotePlayer({
  duration,
  src,
  label = "Volunteer Voice Note",
}: {
  duration: number;
  src?: string | undefined;
  label?: string;
}) {
  const [playing, setPlaying] = useState(false);
  const [t, setT] = useState(0);
  const audio = useRef<HTMLAudioElement>(null);
  useEffect(() => {
    if (!playing || src) return;
    const id = setInterval(
      () =>
        setT((x) => {
          if (x + 0.25 >= duration) {
            setPlaying(false);
            return 0;
          }
          return x + 0.25;
        }),
      250,
    );
    return () => clearInterval(id);
  }, [playing, src, duration]);
  const toggle = () => {
    if (src && audio.current) {
      if (playing) audio.current.pause();
      else void audio.current.play();
    }
    setPlaying((p) => !p);
  };
  const pct = t / duration;
  return (
    <div className="vl-voice">
      {src && (
        <audio
          ref={audio}
          src={src}
          onTimeUpdate={(e) => setT(e.currentTarget.currentTime)}
          onEnded={() => {
            setPlaying(false);
            setT(0);
          }}
        />
      )}
      <button
        type="button"
        className="vl-voice__play"
        aria-label={playing ? "Pause voice note" : "Play voice note"}
        onClick={toggle}
      >
        {playing ? <Pause /> : <Play />}
      </button>
      <div className="vl-voice__body">
        <strong>{label}</strong>
        <div className="vl-voice__wave" aria-hidden>
          {WAVE.map((h, i) => (
            <i
              key={i}
              style={{ height: h }}
              className={i / WAVE.length <= pct || (!playing && t === 0 && i < 26) ? "on" : ""}
            />
          ))}
        </div>
      </div>
      <span className="vl-voice__time">
        {playing || t > 0 ? formatDuration(t) : formatDuration(duration)}
      </span>
    </div>
  );
}

/* ---------- profile pieces ---------- */
export function ActivityItem({ a }: { a: Activity }) {
  return (
    <div className="vl-activity">
      <img src={a.image} alt="" />
      <div>
        <h3>{a.name}</h3>
        <p>
          <span>
            <CalendarDays />
            {a.date}
          </span>
          <span>
            <MapPin />
            {a.location}
          </span>
        </p>
      </div>
      <StatusBadge kind={a.status === "Completed" ? "completed" : "upcoming"} />
    </div>
  );
}

export function Toast({ text, onDone }: { text: string; onDone: () => void }) {
  useEffect(() => {
    const id = setTimeout(onDone, 2600);
    return () => clearTimeout(id);
  }, [onDone]);
  return (
    <div className="vl-toast" role="status">
      <CheckCircle2 />
      {text}
    </div>
  );
}

/* ---------- bottom nav ---------- */
export function BottomNavigation({ active }: { active: string }) {
  const items = [
    {
      label: "Home",
      icon: <House />,
      el: (c: ReactNode) => (
        <Link to="/admin" className="vl-nav__item">
          {c}
        </Link>
      ),
    },
    {
      label: "Events",
      icon: <CalendarDays />,
      el: (c: ReactNode) => (
        <Link to="/admin/manage/$section" params={{ section: "events" }} className="vl-nav__item">
          {c}
        </Link>
      ),
    },
    {
      label: "Communities",
      icon: <UsersRound />,
      el: (c: ReactNode) => (
        <Link
          to="/admin/manage/$section"
          params={{ section: "communities" }}
          className="vl-nav__item"
        >
          {c}
        </Link>
      ),
    },
    {
      label: "Volunteers",
      icon: <Users />,
      el: (c: ReactNode) => (
        <Link to="/admin/volunteers" className="vl-nav__item">
          {c}
        </Link>
      ),
    },
    {
      label: "Reports",
      icon: <ChartNoAxesColumnIncreasing />,
      el: (c: ReactNode) => (
        <Link to="/admin/reports" className="vl-nav__item">
          {c}
        </Link>
      ),
    },
  ];
  return (
    <nav className="vl-nav" aria-label="Admin navigation">
      {items.map((i) => (
        <span
          key={i.label}
          className={active === i.label ? "is-active" : ""}
          aria-current={active === i.label ? "page" : undefined}
        >
          {i.el(
            <>
              {i.icon}
              <span>{i.label}</span>
            </>,
          )}
        </span>
      ))}
    </nav>
  );
}
