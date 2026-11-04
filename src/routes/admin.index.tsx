import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUp, Bell, CalendarDays, ChartNoAxesColumnIncreasing, ChevronRight, Crown, Hourglass, ImageIcon, IndianRupee, LogOut, MapPin, Menu, Plus, Radio, ShieldCheck, UserCheck, UserPlus, UsersRound, X } from "lucide-react";
import { useState } from "react";
import { AdminFrame, Chip, Progress } from "@/components/admin/admin-ui";
import { useAdmin } from "@/components/admin/AdminState";
import { adminStats, fillPercent, pendingActions } from "@/data/admin-mock";
import { seo } from "@/lib/seo";
import avatar from "@/assets/admin/admin-profile-avatar.png.asset.json";
import logoBadge from "@/assets/admin/maatram-logo-full.png.asset.json";
import analyticsArt from "@/assets/admin/analytics-3d-icon.png.asset.json";

export const Route = createFileRoute("/admin/")({
  head: () => seo("Admin Dashboard", "Overview of today's Maatram volunteering operations, events and pending actions."),
  component: AdminDashboard,
});

const pendingIcons = { image: <ImageIcon />, rupee: <IndianRupee />, attendance: <UserCheck />, profile: <UserPlus /> };

function AdminDashboard() {
  const { events, published, sent } = useAdmin();
  const [menu, setMenu] = useState(false);
  const [bell, setBell] = useState(false);
  const ongoing = events.find((e) => e.id === "palm-seeds")!;
  const pct = fillPercent(ongoing.registered, ongoing.needed);
  const notes = [
    ...(published ? [`“${published.name}” is live for volunteers`] : []),
    ...sent.map((s) => `Announcement sent to ${s.count.toLocaleString("en-IN")} volunteers`),
    "8 new proofs uploaded for Palm Seeds Plantation",
    "3 fund requests are waiting for approval",
    "Book Donation Drive opens registrations on Nov 10",
  ];

  return (
    <AdminFrame nav="Home" className="ad-page--wide">
      <header className="ad-dash-head">
        <button type="button" className="ad-round-btn" aria-label="Open menu" onClick={() => setMenu(true)}><Menu /></button>
        <img className="ad-dash-head__logo" src={logoBadge.url} alt="Maatram Foundation" />
        <div className="ad-dash-head__text"><strong>Maatram Foundation</strong><span>Admin Dashboard</span></div>
        <button type="button" className="ad-round-btn ad-bell" aria-label="Notifications" aria-expanded={bell} onClick={() => setBell((b) => !b)}><Bell /><i /></button>
        <button type="button" className="ad-avatar" aria-label="Admin profile menu" onClick={() => setMenu(true)}><img src={avatar.url} alt="" /></button>
        {bell && (
          <div className="ad-popover ad-popover--notes" role="dialog" aria-label="Notifications">
            <div className="ad-popover__head"><strong>Notifications</strong><button type="button" aria-label="Close" onClick={() => setBell(false)}><X size={18} /></button></div>
            {notes.map((n) => <p key={n}><Bell size={16} />{n}</p>)}
          </div>
        )}
      </header>

      <section className="ad-welcome">
        <div className="ad-welcome__waves" aria-hidden>
          <svg viewBox="0 0 600 120" preserveAspectRatio="none" focusable="false">
            <path fill="var(--ad-gold-soft)" d="M0 120 L0 116 C110 114 200 102 300 78 C400 54 480 64 600 30 L600 120 Z" />
            <path fill="var(--ad-gold-deep)" d="M0 120 L0 120 C130 118 230 112 330 96 C430 80 520 88 600 62 L600 120 Z" />
          </svg>
        </div>
        <div className="ad-welcome__text">
          <div className="ad-welcome__row">
            <span className="ad-welcome__badge"><Crown /></span>
            <h1>Welcome back, Admin! <span aria-hidden>👋</span></h1>
          </div>
          <p>Here’s the overview of today’s volunteering operations.</p>
          <span className="ad-welcome__rule" aria-hidden />
        </div>
        <img className="ad-welcome__art" src={analyticsArt.url} alt="" aria-hidden />
      </section>

      <section className="ad-kpis">
        <Link to="/admin/manage/$section" params={{ section: "events" }} className="ad-kpi"><span className="ad-icon-tile"><CalendarDays /></span><strong>{adminStats.activeEvents}</strong><span>Active Events</span><Chip tone="green"><ArrowUp size={14} /> +{adminStats.newEventsWeek} this week</Chip></Link>
        <Link to="/admin/volunteers" className="ad-kpi"><span className="ad-icon-tile"><UsersRound /></span><strong>{adminStats.registered}</strong><span>Registered Volunteers</span><Chip tone="green"><ArrowUp size={14} /> +{adminStats.newVolunteersWeek} this week</Chip></Link>
        <Link to="/admin/volunteers" className="ad-kpi"><span className="ad-icon-tile ad-icon-tile--green"><ShieldCheck /></span><strong>{adminStats.verified}</strong><span>Verified Volunteers</span><Chip tone="blue">{Math.round((adminStats.verified / adminStats.registered) * 100)}% of total</Chip></Link>
        <Link to="/admin/manage/$section" params={{ section: "pending" }} className="ad-kpi"><span className="ad-icon-tile"><Hourglass /></span><strong>{adminStats.pending}</strong><span>Pending Actions</span><Chip tone="yellow">Needs Attention</Chip></Link>
      </section>

      <section className="ad-card ad-block">
        <h2 className="ad-block__title">Quick Actions</h2>
        <div className="ad-quick">
          <Link to="/admin/opportunities/new" className="ad-quick__item active"><Plus /><strong>Create Opportunity</strong></Link>
          <Link to="/admin/pulse" className="ad-quick__item"><Radio /><strong>Pulse</strong><small>(Send Notification)</small></Link>
          <Link to="/admin/manage/$section" params={{ section: "communities" }} className="ad-quick__item"><UsersRound /><strong>Manage Communities</strong></Link>
          <Link to="/admin/reports" className="ad-quick__item"><ChartNoAxesColumnIncreasing /><strong>View Reports</strong></Link>
        </div>
      </section>

      <section className="ad-card ad-block">
        <div className="ad-block__row"><h2 className="ad-block__title">Ongoing Events</h2><Link to="/admin/manage/$section" params={{ section: "events" }} className="ad-link">View All <ArrowRight size={16} /></Link></div>
        <Link to="/admin/manage/$section" params={{ section: "events" }} className="ad-ongoing">
          <img src={ongoing.image} alt="" />
          <div className="ad-ongoing__body">
            <div className="ad-ongoing__top"><h3>{ongoing.name}</h3><Chip tone="green">In Progress</Chip></div>
            <p className="ad-inline-meta"><MapPin />Chennai <span>•</span><CalendarDays />{ongoing.date}</p>
            <p className="ad-inline-meta"><UsersRound />{ongoing.registered} / {ongoing.needed} Volunteers</p>
            <div className="ad-progress-row"><Progress value={pct} /><span>{pct}% Filled</span></div>
          </div>
          <ChevronRight className="ad-chev" />
        </Link>
      </section>

      <section className="ad-card ad-block">
        <div className="ad-block__row"><h2 className="ad-block__title">Pending Actions <span className="ad-count-badge">{adminStats.pending}</span></h2><Link to="/admin/manage/$section" params={{ section: "pending" }} className="ad-link">View All <ArrowRight size={16} /></Link></div>
        <ul className="ad-pending">
          {pendingActions.map((p) => (
            <li key={p.id}>
              <Link to="/admin/manage/$section" params={{ section: "pending" }} hash={p.id}>
                <span className="ad-icon-circle">{pendingIcons[p.icon]}</span>
                <span className="ad-pending__text"><strong>{p.title}</strong><small>{p.sub}</small></span>
                <span className="ad-pill-count">{p.count}</span>
                <ChevronRight />
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {menu && (
        <div className="ad-drawer" role="dialog" aria-label="Admin menu" onClick={() => setMenu(false)}>
          <aside className="ad-drawer__panel" onClick={(e) => e.stopPropagation()}>
            <div className="ad-drawer__head"><img src={avatar.url} alt="" /><div><strong>Admin</strong><span>Maatram Foundation</span></div><button type="button" className="ad-round-btn" aria-label="Close menu" onClick={() => setMenu(false)}><X /></button></div>
            <Link to="/admin" onClick={() => setMenu(false)}>Dashboard</Link>
            <Link to="/admin/opportunities/new">Create Opportunity</Link>
            <Link to="/admin/pulse">Pulse – Event Broadcasting</Link>
            <Link to="/admin/manage/$section" params={{ section: "events" }}>Events</Link>
            <Link to="/admin/manage/$section" params={{ section: "communities" }}>Communities</Link>
            <Link to="/admin/volunteers">Volunteers</Link>
            <Link to="/admin/reports">Reports</Link>
            <Link to="/welcome" className="ad-drawer__exit"><LogOut size={18} /> Switch role</Link>
          </aside>
        </div>
      )}
    </AdminFrame>
  );
}
