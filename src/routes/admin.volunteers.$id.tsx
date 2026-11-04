import { createFileRoute, notFound } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, CalendarDays, CheckCircle2, Clock, Crown, Eye, FileText, GraduationCap, Info, MapPin, MoreVertical, Pencil, Send, Sprout, UserRound, UsersRound } from "lucide-react";
import { useState } from "react";
import { ActivityItem, BackButton, StatusBadge, Toast, VolunteerFrame, WorkIcon, useApproved } from "@/components/admin/volunteers";
import { getVolunteer } from "@/data/volunteers-mock";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/volunteers/$id")({
  loader: ({ params }) => { const v = getVolunteer(params.id); if (!v) throw notFound(); return v; },
  head: ({ loaderData }) => loaderData ? seo(`${loaderData.name} – Volunteer Profile`, "Volunteer details and engagement.") : { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] },
  component: Profile,
});

const TABS = ["Overview", "Activity History", "Availability", "Documents"] as const;

function Profile() {
  const v = Route.useLoaderData();
  const approved = useApproved();
  const verified = !v.pending || approved.includes(v.id);
  const [tab, setTab] = useState<(typeof TABS)[number]>("Overview");
  const [toast, setToast] = useState("");
  const [tier, setTier] = useState(v.tier);

  return (
    <VolunteerFrame>
      <header className="vl-phead">
        <BackButton />
        <div><h1>Volunteer Profile</h1><p>Volunteer details and engagement</p></div>
        <button type="button" className="vl-more" aria-label="More options" onClick={() => setToast("More options coming soon")}><MoreVertical /></button>
      </header>

      <section className="vl-card vl-summary">
        <img src={v.photo} alt={v.name} className="vl-summary__img" />
        <div className="vl-summary__body">
          <span className="vl-idtag">ID: {v.id}</span>
          <h2>{v.name} {verified ? <StatusBadge kind="verified" /> : <StatusBadge kind="pending" />}</h2>
          <span className="vl-tierpill"><Crown /> {tier}</span>
          <ul>
            <li><UserRound />{v.status}</li>
            <li>{v.status === "Student" ? <GraduationCap /> : <WorkIcon s={v.status} />}{v.org}</li>
            <li><MapPin />{v.location}</li>
          </ul>
        </div>
        <div className="vl-stats">
          <div><Sprout className="vl-green" /><b>{v.activities}</b><span>Volunteering Activities</span></div>
          <div><CalendarDays className="vl-gold" /><b>{v.events}</b><span>Events Attended</span></div>
          <div><Clock className="vl-gold" /><b>{v.hours} hrs</b><span>Total Service Time</span></div>
        </div>
      </section>

      <div className="vl-pbtns">
        <button type="button" className="vl-btn vl-btn--primary" onClick={() => setToast(`Announcement sent to ${v.name}`)}><Send /> Send Announcement</button>
        <button type="button" className="vl-btn vl-btn--ghost" onClick={() => { const n = tier.startsWith("Tier 1") ? "Tier 2 Volunteer" : "Tier 1 Volunteer"; setTier(n); setToast(`Changed to ${n}`); }}><BadgeCheck /> Change Tier</button>
        <button type="button" className="vl-btn vl-btn--ghost" onClick={() => setToast("Editing is not available in this preview")}><Pencil /> Edit Details</button>
      </div>

      <div className="vl-tabs" role="tablist">
        {TABS.map((t) => <button key={t} type="button" role="tab" aria-selected={tab === t} className={tab === t ? "is-on" : ""} onClick={() => setTab(t)}>{t}</button>)}
      </div>

      {tab === "Overview" && (
        <section className="vl-card vl-sec">
          <div className="vl-sec__head"><span className="vl-tile"><Info /></span><div><h2>About</h2><p className="vl-ink">{v.about}</p></div></div>
          <div className="vl-facts">
            <div><span className="vl-tile vl-tile--sm"><CalendarDays /></span><div><b>Joined On</b><span>{v.joined}</span></div></div>
            <div><span className="vl-tile vl-tile--sm"><UsersRound /></span><div><b>Volunteer Type</b><span>{v.status === "Student" ? "Student Volunteer" : "Other Volunteer"}</span></div></div>
          </div>
        </section>
      )}
      {tab === "Activity History" && (
        <section className="vl-card vl-sec">
          {v.recent.length ? v.recent.map((a) => <ActivityItem key={a.name} a={a} />) : <p className="vl-empty">No activities yet.</p>}
        </section>
      )}
      {tab === "Availability" && (
        <section className="vl-card vl-sec">
          <div className="vl-facts">
            <div><span className="vl-tile vl-tile--sm"><CalendarDays /></span><div><b>Preferred days</b><span>{v.availability}</span></div></div>
            <div><span className="vl-tile vl-tile--sm"><MapPin /></span><div><b>Preferred area</b><span>{v.location}</span></div></div>
          </div>
        </section>
      )}
      {tab === "Documents" && (
        <section className="vl-card vl-sec">
          <div className="vl-doc"><span className="vl-tile vl-tile--sm"><FileText /></span><div><b>{v.idDoc.type}</b><span>ID Proof • {v.idDoc.size}</span></div><CheckCircle2 className="vl-green" /><button type="button" className="vl-btn vl-btn--ghost vl-btn--sm" onClick={() => setToast(`Opening ${v.idDoc.type}`)}><Eye /> View</button></div>
        </section>
      )}

      <section className="vl-card vl-sec">
        <div className="vl-sec__head vl-sec__head--row">
          <span className="vl-tile"><Sprout /></span><h2>Recent Volunteer Activities</h2>
          <button type="button" className="vl-viewall" onClick={() => setTab("Activity History")}>View All <ArrowRight /></button>
        </div>
        {v.recent.length ? v.recent.map((a) => <ActivityItem key={a.name} a={a} />) : <p className="vl-empty">No activities yet.</p>}
      </section>
      {toast && <Toast text={toast} onDone={() => setToast("")} />}
    </VolunteerFrame>
  );
}
