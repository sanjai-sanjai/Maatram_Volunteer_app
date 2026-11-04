import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, CalendarDays, Check, CircleCheck, ClipboardList, MapPin, Send, UsersRound } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AdminFrame, AdminBack, Chip, Progress, categoryTone } from "@/components/admin/admin-ui";
import { useAdmin, useAdminEvent } from "@/components/admin/AdminState";
import { recipientsFor } from "@/data/admin-mock";
import { seo } from "@/lib/seo";
import p1 from "@/assets/admin/volunteer-portrait-01.jpg.asset.json";
import p2 from "@/assets/admin/volunteer-portrait-02.jpg.asset.json";
import p3 from "@/assets/admin/volunteer-portrait-03.jpg.asset.json";
import p4 from "@/assets/admin/volunteer-portrait-04.jpg.asset.json";

export const Route = createFileRoute("/admin/pulse/success")({
  validateSearch: (s: Record<string, unknown>) => ({ event: typeof s["event"] === "string" ? s["event"] : "palm-seeds", tier: [1, 2, 3].includes(Number(s["tier"])) ? Number(s["tier"]) : 1 }),
  head: () => seo("Announcement Sent", "Your volunteering announcement has been delivered to the selected volunteers."),
  component: Sent,
});

function Sent() {
  const { event, tier } = Route.useSearch();
  const ev = useAdminEvent(event);
  const { recordSent } = useAdmin();
  const count = recipientsFor(tier);
  const [pct, setPct] = useState(0);
  const done = pct >= 100;
  const recorded = useRef(false);
  useEffect(() => {
    const id = window.setInterval(() => setPct((p) => Math.min(100, p + 4)), 70);
    return () => window.clearInterval(id);
  }, []);
  useEffect(() => { if (done && !recorded.current) { recorded.current = true; recordSent({ eventId: ev.id, tier, count }); } }, [done]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <AdminFrame className="ad-page--success">
      <header className="ad-header"><AdminBack to="/admin/pulse" /></header>
      <div className="ad-sending">
        {[p1, p2, p3, p4].map((p, i) => <span key={i} className={`ad-sending__p ad-sending__p--${i + 1} ${done ? "ok" : ""}`}><img src={p.url} alt="" /><i><Check size={12} /></i></span>)}
        <div className="ad-phone"><span className="ad-phone__notch" /><Send className={`ad-phone__plane ${done ? "" : "flying"}`} /><strong>{done ? "Announcement Sent" : "Sending Announcement..."}</strong></div>
      </div>
      <div className="ad-send-progress"><Progress value={pct} /><p><span>Sending to {count.toLocaleString("en-IN")} volunteers...</span><b>{pct}%</b></p></div>

      {done ? (
        <>
          <div className="ad-success-badge"><CircleCheck /></div>
          <h2 className="ad-big-title">Announcement Sent Successfully! <span aria-hidden>🎉</span></h2>
          <p className="ad-big-sub">Your volunteering opportunity has been shared with <strong>{count.toLocaleString("en-IN")}</strong> selected volunteers (Tier {tier}).</p>
          <article className="ad-card ad-sent-card">
            <img src={ev.image} alt="" />
            <div><Chip tone={categoryTone(ev.category)}>{ev.category}</Chip><h3>{ev.name}</h3>
              <p className="ad-inline-meta"><CalendarDays />{ev.date}</p><p className="ad-inline-meta"><MapPin />{ev.fullLocation}</p></div>
            <span className="ad-chip ad-chip--green ad-sent-card__chip"><CircleCheck size={14} /> Announcement Sent</span>
          </article>
          <section className="ad-next">
            <h3>What’s Next?</h3>
            <ol>
              <li><span><Bell /></span>Volunteers will receive a notification.</li>
              <li><span><ClipboardList /></span>They can view the event and register.</li>
              <li><span><UsersRound /></span>Track registrations and fill remaining slots.</li>
            </ol>
          </section>
          <div className="ad-sticky-actions ad-sticky-actions--two">
            <Link to="/admin/manage/$section" params={{ section: "communities" }} className="ad-btn ad-btn--ghost"><UsersRound /> View Community</Link>
            <Link to="/admin/manage/$section" params={{ section: "events" }} className="ad-btn ad-btn--primary"><ClipboardList /> Track Registrations</Link>
          </div>
        </>
      ) : <p className="ad-big-sub" role="status">Delivering your announcement to Tier {tier} volunteers…</p>}
    </AdminFrame>
  );
}
