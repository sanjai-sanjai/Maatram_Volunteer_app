import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import {
  Menu,
  Bell,
  GraduationCap,
  CalendarDays,
  Clock3,
  HandHeart,
  MapPin,
  Users,
  ArrowRight,
  ClipboardCheck,
  Trophy,
  X,
  LogOut,
  Award,
} from "lucide-react";
import { BottomNav } from "@/components/AppNav";
import { DashboardEntrance } from "@/components/DashboardEntrance";
import {
  mockActive as act,
  mockDashboard as d,
  mockNotifications,
  mockOpportunities,
  mockStudent as s,
} from "@/data/mock";
import { seo } from "@/lib/seo";
import { useMaatramState } from "@/components/MaatramState";

export const Route = createFileRoute("/dashboard")({
  head: () =>
    seo("Student Home", "Your Maatram volunteering dashboard: opportunities, hours and progress."),
  component: Dashboard,
});

const A = "/assets/dashboard/";

function Dashboard() {
  const navigate = useNavigate();
  const maatramState = useMaatramState();
  const [panel, setPanel] = useState<null | "menu" | "notif" | "contribute" | "joined">(null);
  const [showEntrance, setShowEntrance] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (
        urlParams.get("intro") === "1" ||
        urlParams.get("entrance") === "1" ||
        urlParams.get("quote") === "1"
      ) {
        return true;
      }
      return sessionStorage.getItem("maatram-dashboard-entered") !== "true";
    } catch {
      return false;
    }
  });

  useEffect(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      if (
        urlParams.get("intro") === "1" ||
        urlParams.get("entrance") === "1" ||
        urlParams.get("quote") === "1"
      ) {
        setShowEntrance(true);
      } else if (sessionStorage.getItem("maatram-dashboard-entered") !== "true") {
        setShowEntrance(true);
      }
    } catch {
      /* ignore */
    }
  }, []);

  const handleEnterDashboard = () => {
    try {
      sessionStorage.setItem("maatram-dashboard-entered", "true");
    } catch {
      /* ignore */
    }
    setShowEntrance(false);
  };

  const op = mockOpportunities[0];
  if (!op) return null;
  const pct = Math.round((op.joined / op.capacity) * 100);

  const role = typeof window !== "undefined" ? sessionStorage.getItem("maatram-role") : "student";
  const category = role === "alumni" ? "Alumni" : s.category;

  if (showEntrance) {
    const initialStage =
      typeof window !== "undefined" &&
      new URLSearchParams(window.location.search).get("quote") === "1"
        ? "quote"
        : "video";
    return <DashboardEntrance onEnter={handleEnterDashboard} initialStage={initialStage} />;
  }

  return (
    <main className="mq-dashboard">
      <header className="mq-dashboard__topbar">
        <button
          className="mq-dashboard__round-action"
          aria-label="Open menu"
          onClick={() => setPanel("menu")}
        >
          <Menu size={27} />
        </button>
        <img
          className="mq-dashboard__brand"
          src="/assets/brand/maatram-foundation-logo.png"
          alt="Maatram Foundation"
          width={440}
          height={180}
        />
        <button
          className="mq-dashboard__round-action mq-dashboard__notification"
          aria-label="Notifications"
          onClick={() => setPanel("notif")}
        >
          <Bell size={27} />
        </button>
      </header>

      <section className="mq-dashboard__welcome">
        <img
          className="mq-dashboard__avatar"
          src={`${A}student-avatar.jpg`}
          alt="Student profile"
          width={124}
          height={124}
        />
        <div>
          <h1 className="mq-dashboard__greeting">Good morning, {s.firstName}! 👋</h1>
          <p className="mq-dashboard__identity">
            {category} · {s.maatramId}
          </p>
          <p className="mq-dashboard__college">
            <GraduationCap size={17} style={{ display: "inline", verticalAlign: "middle" }} />{" "}
            {s.college}
          </p>
        </div>
      </section>

      <img
        className="mq-dashboard__hero"
        src={`${A}impact-hero.jpg`}
        alt="Make an Impact with Maatram! Volunteer · Lead · Create Change"
        width={755}
        height={271}
      />

      <section className="mq-dashboard__stats" aria-label="Volunteer statistics">
        <Stat
          icon={<CalendarDays className="mq-dashboard__stat-icon" fill="#FEC802" />}
          value={d.opportunities}
          label="Opportunities"
        />
        <Stat
          icon={<Clock3 className="mq-dashboard__stat-icon" fill="#FEC802" />}
          value={d.volunteerHours}
          label="Volunteer Hours"
        />
        <Stat
          icon={<HandHeart className="mq-dashboard__stat-icon" fill="#FEC802" />}
          value={d.contributed}
          label="Volunteering Contributed"
        />
        <Stat
          icon={<Award className="mq-dashboard__stat-icon" fill="#FEC802" />}
          value={d.impactPoints}
          label="Impact Points"
        />
      </section>

      <section className="mq-dashboard__section">
        <div className="mq-dashboard__section-head">
          <h2 className="mq-dashboard__section-title">Upcoming Opportunities</h2>
          <Link className="mq-dashboard__view-all" to="/opportunities">
            View All <span className="mq-dashboard__new">{d.newOpportunities} New</span>
            <ArrowRight size={20} />
          </Link>
        </div>
        <article className="mq-dashboard__opportunity">
          <img
            className="mq-dashboard__opportunity-image"
            src={op.image}
            alt="Volunteers planting seedlings"
            width={265}
            height={327}
          />
          <div className="mq-dashboard__opportunity-content">
            <h3 className="mq-dashboard__opportunity-title">{op.name}</h3>
            <div className="mq-dashboard__meta">
              <span className="mq-dashboard__meta-item">
                <MapPin size={17} /> {op.location}
              </span>
              <span className="mq-dashboard__meta-item">
                <CalendarDays size={16} /> {op.date}
              </span>
              <span className="mq-dashboard__meta-item">
                <Clock3 size={16} /> {op.time}
              </span>
            </div>
            <div className="mq-dashboard__joined">
              <Users size={20} /> {op.joined} / {op.capacity} Volunteers Joined
            </div>
            <div className="mq-dashboard__progress">
              <span style={{ width: `${pct}%` }} />
            </div>
            <div className="mq-dashboard__slots">
              <Users size={30} />
              <div>
                <strong>{op.capacity - op.joined} Slots Remaining!</strong>
                <span>Click to contribute your volunteering.</span>
              </div>
            </div>
            <button
              className="mq-dashboard__contribute"
              onClick={() =>
                navigate({ to: "/opportunities/$opportunityId", params: { opportunityId: op.id } })
              }
            >
              Contribute <ArrowRight size={21} />
            </button>
          </div>
        </article>
      </section>

      <section className="mq-dashboard__section">
        <div className="mq-dashboard__section-head mq-dashboard__section-head--green">
          <h2 className="mq-dashboard__section-title">Your Active Volunteering</h2>
        </div>
        <article className="mq-dashboard__active-card">
          <ClipboardCheck className="mq-dashboard__active-icon" />
          <div>
            <h3 className="mq-dashboard__active-title">{act.name}</h3>
            <div className="mq-dashboard__active-row">
              <div className="mq-dashboard__active-meta">
                <span>
                  <CalendarDays size={16} style={{ display: "inline", verticalAlign: "middle" }} />{" "}
                  {act.date}
                </span>
                <span>
                  <MapPin size={16} style={{ display: "inline", verticalAlign: "middle" }} />{" "}
                  {act.location}
                </span>
              </div>
              <div className="mq-dashboard__active-footer">
                <span className="mq-dashboard__community-status">● {act.status}</span>
                <span style={{ flex: 1 }} />
                <button
                  className="mq-dashboard__outline-action"
                  onClick={() => navigate({ to: "/community" })}
                >
                  Open Community <ArrowRight size={16} />
                </button>
              </div>
            </div>
          </div>
        </article>
      </section>

      <section className="mq-dashboard__section">
        <div className="mq-dashboard__section-head">
          <h2 className="mq-dashboard__section-title">Your Progress</h2>
        </div>
        <div className="mq-dashboard__progress-card">
          <div className="mq-dashboard__goal-ring">
            <div className="mq-dashboard__goal-ring-inner">
              <strong>{d.progress}%</strong>
              <span>Volunteer Goal</span>
            </div>
          </div>
          <div className="mq-dashboard__goal-detail">
            <h3>
              <span style={{ fontSize: 16 }}>🎯</span> Your Goal
            </h3>
            <p>Complete {d.goalHours} Volunteer Hours</p>
            <strong>
              {d.completedHours} / {d.goalHours} Hours
            </strong>
            <div className="mq-dashboard__goal-bar">
              <span />
            </div>
          </div>
          <Link to="/impact" className="mq-dashboard__leaderboard">
            <Trophy size={30} color="#b97f00" fill="#FEC802" style={{ flex: "none" }} />
            <span>
              <strong>{d.hoursToTop3} more</strong>
              <br />
              hours to enter the <strong>Top 3!</strong>
            </span>
            <ArrowRight size={17} />
          </Link>
        </div>
      </section>

      <div className="mq-dashboard__nav-wave" />
      <BottomNav active="Home" />

      {panel && (
        <div className="mq-overlay" onClick={() => setPanel(null)}>
          {panel === "menu" && (
            <aside className="mq-drawer" onClick={(e) => e.stopPropagation()}>
              <img
                src="/assets/brand/maatram-foundation-logo.png"
                alt="Maatram Foundation"
                style={{ width: 150 }}
              />
              <div style={{ marginTop: 18 }}>
                {[
                  ["My Profile", "/profile"],
                  ["Opportunities", "/opportunities"],
                  ["Community", "/community"],
                  ["My Impact", "/impact"],
                ].map(([l, to]) => (
                  <Link key={to} to={to as "/profile"} className="mq-list-item">
                    {l}
                  </Link>
                ))}
                <button
                  type="button"
                  className="mq-list-item"
                  style={{
                    background: "none",
                    border: 0,
                    width: "100%",
                    textAlign: "left",
                    cursor: "pointer",
                    font: "inherit",
                    padding: "10px 0",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                  }}
                  onClick={() => {
                    setPanel(null);
                    try {
                      sessionStorage.removeItem("maatram-dashboard-entered");
                    } catch {
                      /* ignore */
                    }
                    setShowEntrance(true);
                  }}
                >
                  <Award size={18} /> Welcome Animation
                </button>
                <Link
                  to="/welcome"
                  className="mq-list-item"
                  onClick={() => {
                    try {
                      sessionStorage.removeItem("maatram-dashboard-entered");
                    } catch {
                      /* ignore */
                    }
                  }}
                >
                  <LogOut size={18} /> Log out
                </Link>
              </div>
            </aside>
          )}
          {panel === "notif" && (
            <div className="mq-sheet" onClick={(e) => e.stopPropagation()}>
              <SheetHead title="Notifications" onClose={() => setPanel(null)} />
              {mockNotifications.map((n) => (
                <div key={n} className="mq-list-item">
                  <Bell size={18} color="#d99a00" /> {n}
                </div>
              ))}
            </div>
          )}
          {(panel === "contribute" || panel === "joined") && (
            <div className="mq-sheet" onClick={(e) => e.stopPropagation()}>
              <SheetHead title={op.name} onClose={() => setPanel(null)} />
              <img
                src={op.image}
                alt=""
                style={{ width: "100%", height: 160, objectFit: "cover", borderRadius: 18 }}
              />
              <p style={{ color: "var(--mq-navy)" }}>{op.description}</p>
              <p>
                <b>{op.location}</b> · {op.date} · {op.time}
              </p>
              {panel === "joined" ? (
                <p
                  className="mq-dashboard__community-status"
                  style={{ display: "block", textAlign: "center", padding: 12 }}
                >
                  ✓ You're registered! See you there.
                </p>
              ) : (
                <button
                  className="mq-btn"
                  onClick={() => {
                    maatramState.register(op.id);
                    setPanel("joined");
                  }}
                >
                  Confirm Contribution
                </button>
              )}
            </div>
          )}
        </div>
      )}
    </main>
  );
}

function SheetHead({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 12,
      }}
    >
      <h2 style={{ margin: 0, fontSize: 20, fontWeight: 800 }}>{title}</h2>
      <button className="mq-back" aria-label="Close" onClick={onClose}>
        <X size={20} />
      </button>
    </div>
  );
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: number; label: string }) {
  return (
    <div className="mq-dashboard__stat">
      {icon}
      <strong className="mq-dashboard__stat-value">{value}</strong>
      <span className="mq-dashboard__stat-label">{label}</span>
    </div>
  );
}
