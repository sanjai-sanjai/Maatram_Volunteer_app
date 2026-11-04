import { createFileRoute, Link, notFound, redirect } from "@tanstack/react-router";
import { Check, MessageCircle, Search, ShieldCheck, UsersRound } from "lucide-react";
import { useState } from "react";
import { AdminFrame, Chip, PageHeader, Progress, categoryTone } from "@/components/admin/admin-ui";
import { useAdmin } from "@/components/admin/AdminState";
import { adminStats, fillPercent, pendingActions } from "@/data/admin-mock";
import { additionalCommunities } from "@/data/mock";
import { seo } from "@/lib/seo";

const sections = {
  events: { title: "Events & Registrations", sub: "Track registrations for every opportunity.", nav: "Events" },
  communities: { title: "Manage Communities", sub: "Event communities and their activity.", nav: "Communities" },
  volunteers: { title: "Volunteers", sub: "Registered and verified Maatram volunteers.", nav: "Volunteers" },
  reports: { title: "Reports", sub: "Impact and participation at a glance.", nav: "Reports" },
  pending: { title: "Pending Actions", sub: "Items waiting for your review.", nav: "Home" },
} as const;
type Key = keyof typeof sections;

export const Route = createFileRoute("/admin/manage/$section")({
  beforeLoad: ({ params }) => { if (params.section === "reports") throw redirect({ to: "/admin/reports" }); if (params.section === "volunteers") throw redirect({ to: "/admin/volunteers" }); },
  loader: ({ params }) => { if (!(params.section in sections)) throw notFound(); },
  head: ({ params }) => {
    const s = sections[params.section as Key];
    return s ? seo(`Admin – ${s.title}`, s.sub) : { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
  },
  component: Manage,
});

const volunteers = [
  { name: "R. Sanjai", id: "MT4507", city: "Coimbatore", hours: 36, verified: true },
  { name: "Kaviya M", id: "MT4112", city: "Chennai", hours: 52, verified: true },
  { name: "Arun Kumar", id: "MT3981", city: "Madurai", hours: 18, verified: false },
  { name: "Divya S", id: "MT4620", city: "Erode", hours: 24, verified: true },
  { name: "Prakash V", id: "MT4733", city: "Salem", hours: 8, verified: false },
];

function Manage() {
  const { section } = Route.useParams();
  const s = sections[section as Key];
  const { events, sent } = useAdmin();
  const [done, setDone] = useState<string[]>([]);
  const [verified, setVerified] = useState<string[]>([]);
  const [q, setQ] = useState("");

  return (
    <AdminFrame nav={s.nav}>
      <PageHeader back="/admin" title={s.title} sub={s.sub} />
      {section === "events" && (
        <div className="ad-event-list">
          {events.map((e) => { const p = fillPercent(e.registered, e.needed); return (
            <article key={e.id} className="ad-card ad-row-card">
              <img src={e.image} alt="" />
              <div><div className="ad-event__chips"><Chip tone={categoryTone(e.category)}>{e.category}</Chip><Chip tone={e.status === "Completed" ? "gray" : e.status === "Upcoming" ? "blue" : "green"}>{e.status}</Chip></div>
                <h3>{e.name}</h3><p className="ad-inline-meta"><UsersRound />{e.registered} / {e.needed} registered · {e.needed - e.registered} slots open</p>
                <div className="ad-progress-row"><Progress value={p} /><span>{p}%</span></div>
                {e.status !== "Completed" && <Link to="/admin/pulse/targeting" search={{ event: e.id }} className="ad-link">Fill remaining slots →</Link>}
              </div>
            </article>); })}
        </div>
      )}
      {section === "communities" && (
        <div className="ad-event-list">
          {events.filter((e) => e.status === "Live").map((e) => (
            <article key={e.id} className="ad-card ad-row-card ad-row-card--plain"><span className="ad-icon-circle"><UsersRound /></span><div><h3>{e.name} – {e.fullLocation.split(",")[0]}</h3><p className="ad-hint">New community · {e.registered} members</p></div><Chip tone="green">New</Chip></article>
          ))}
          {additionalCommunities.map((c) => (
            <article key={c.id} className="ad-card ad-row-card ad-row-card--plain"><span className="ad-icon-circle"><UsersRound /></span><div><h3>{c.name}</h3><p className="ad-hint">{c.category} · {c.members} members · {c.active}</p></div>
              <Link to="/community/$communityId/chat" params={{ communityId: c.id }} className="ad-round-btn" aria-label={`Open ${c.name} chat`}><MessageCircle /></Link></article>
          ))}
        </div>
      )}
      {section === "volunteers" && (
        <>
          <div className="ad-search"><label className="ad-search__box"><Search /><input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search volunteers by name, ID or city" aria-label="Search volunteers" /></label></div>
          <div className="ad-event-list">
            {volunteers.filter((v) => [v.name, v.id, v.city].some((x) => x.toLowerCase().includes(q.toLowerCase()))).map((v) => {
              const ok = v.verified || verified.includes(v.id);
              return (
                <article key={v.id} className="ad-card ad-row-card ad-row-card--plain"><span className="ad-icon-circle">{v.name[0]}</span><div><h3>{v.name}</h3><p className="ad-hint">{v.id} · {v.city} · {v.hours} hrs</p></div>
                  {ok ? <Chip tone="green"><ShieldCheck size={14} /> Verified</Chip> : <button type="button" className="ad-btn ad-btn--primary ad-btn--sm" onClick={() => setVerified((o) => [...o, v.id])}>Verify</button>}</article>
              );
            })}
          </div>
        </>
      )}
      {section === "pending" && (
        <ul className="ad-pending ad-card ad-block">
          {pendingActions.map((p) => (
            <li key={p.id} id={p.id}><div className="ad-pending__static"><span className="ad-pending__text"><strong>{p.title}</strong><small>{p.sub}</small></span>
              {done.includes(p.id) ? <Chip tone="green"><Check size={14} /> Reviewed</Chip> : <><span className="ad-pill-count">{p.count}</span><button type="button" className="ad-btn ad-btn--primary ad-btn--sm" onClick={() => setDone((o) => [...o, p.id])}>Mark reviewed</button></>}
            </div></li>
          ))}
        </ul>
      )}
    </AdminFrame>
  );
}
