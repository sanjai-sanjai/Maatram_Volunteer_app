import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { BookOpen, CalendarDays, ClipboardList, FileText, Megaphone, Pencil, Phone, SquareCheckBig, Target, UsersRound, X } from "lucide-react";
import { useState } from "react";
import { AdminFrame, EditBtn, EventSummaryCard, SectionHead, WizardHeader } from "@/components/admin/admin-ui";
import { useAdmin } from "@/components/admin/AdminState";
import { validateDetails, validateGuide } from "@/data/admin-mock";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/opportunities/new/review")({
  head: () => seo("Create Opportunity – Review & Publish", "Step 3 of 3: review every detail and publish the opportunity."),
  component: Review,
});

const firstLine = (t: string) => t.split("\n").map((l) => l.replace(/^•\s*/, "").replace(/\.$/, "")).join(", ");

function Review() {
  const { draft, update, publish } = useAdmin();
  const navigate = useNavigate();
  const [editing, setEditing] = useState<null | "summary" | "community">(null);
  const [community, setCommunity] = useState("A dedicated group for communication, updates, attendance, proofs and coordination of this event.");
  const [problem, setProblem] = useState("");
  const city = draft.location.split(",")[0];
  const sched = draft.schedule[0] ? `${draft.schedule[0].time.replace(/^0/, "")} – ${draft.schedule[draft.schedule.length - 1]!.time.replace(/^0/, "")}` : draft.time;

  const doPublish = () => {
    const missing = { ...validateDetails(draft), ...validateGuide(draft) };
    if (Object.keys(missing).length) { setProblem(Object.values(missing)[0] ?? ""); return; }
    publish();
    navigate({ to: "/admin/opportunities/published" });
  };

  return (
    <AdminFrame>
      <WizardHeader step={3} onStep={(to) => navigate({ to })} />
      <section className="ad-review-head"><SectionHead icon={<SquareCheckBig />} title="Review & Publish" sub="Please review all the details before publishing the opportunity." /></section>

      <EventSummaryCard ev={{ name: draft.name, category: draft.type, fullLocation: draft.location, date: draft.date, time: draft.time, needed: draft.volunteers, image: draft.image ?? "" }} onEdit={() => setEditing("summary")} />

      <section className="ad-card ad-rsec">
        <div className="ad-rsec__head"><span className="ad-icon-circle"><FileText /></span><h2>Event Description</h2><EditBtn onClick={() => navigate({ to: "/admin/opportunities/new", hash: "description" })} /></div>
        <p>{draft.description}</p>
      </section>

      <section className="ad-card ad-rsec">
        <div className="ad-rsec__head"><span className="ad-icon-circle"><BookOpen /></span><h2>Event Guide</h2><EditBtn onClick={() => navigate({ to: "/admin/opportunities/new/guide" })} /></div>
        <div className="ad-guide-grid">
          <div><Target /><span><strong>Purpose</strong>{draft.purpose}</span></div>
          <div><UsersRound /><span><strong>Responsibilities</strong>{firstLine(draft.responsibilities)}</span></div>
          <div><ClipboardList /><span><strong>Preparation Requirements</strong>{firstLine(draft.preparation)}</span></div>
          <div><CalendarDays /><span><strong>Schedule</strong>{sched}<br />({draft.schedule.slice(0, 3).map((s) => s.label.split(" ")[0]).join(", ")})</span></div>
          <div className="wide"><Phone /><span><strong>Contact Details</strong>{draft.contactName} ({draft.contactRole}) &nbsp;|&nbsp; {draft.phone} &nbsp;|&nbsp; {draft.email}</span></div>
        </div>
      </section>

      <section className="ad-card ad-rsec">
        <div className="ad-rsec__head"><span className="ad-icon-circle"><UsersRound /></span><h2>Community</h2><EditBtn onClick={() => setEditing("community")} /></div>
        <h3>{draft.name} – {city}</h3>
        <p className="ad-navy">{community}</p>
      </section>

      {problem && <p className="ad-error ad-error--box" role="alert">{problem}</p>}
      <div className="ad-sticky-actions ad-sticky-actions--two">
        <button type="button" className="ad-btn ad-btn--ghost" onClick={() => navigate({ to: "/admin/opportunities/new" })}><Pencil /> Edit Details</button>
        <button type="button" className="ad-btn ad-btn--primary" onClick={doPublish}><Megaphone /> Publish Opportunity</button>
      </div>

      {editing && (
        <div className="ad-modal" role="dialog" aria-label="Edit" onClick={() => setEditing(null)}>
          <div className="ad-modal__panel" onClick={(e) => e.stopPropagation()}>
            <div className="ad-modal__head"><h2>{editing === "summary" ? "Edit Event Summary" : "Edit Community"}</h2><button type="button" className="ad-round-btn" aria-label="Close" onClick={() => setEditing(null)}><X /></button></div>
            {editing === "summary" ? (
              <div className="ad-modal__form">
                <label>Event Name<input className="ad-input" value={draft.name} onChange={(e) => update({ name: e.target.value })} /></label>
                <label>Location<input className="ad-input" value={draft.location} onChange={(e) => update({ location: e.target.value })} /></label>
                <label>Date<input className="ad-input" value={draft.date} onChange={(e) => update({ date: e.target.value })} /></label>
                <label>Time<input className="ad-input" value={draft.time} onChange={(e) => update({ time: e.target.value })} /></label>
                <label>Volunteers Needed<input className="ad-input" type="number" min={5} max={50} value={draft.volunteers} onChange={(e) => update({ volunteers: Math.max(5, Math.min(50, Number(e.target.value) || 5)) })} /></label>
              </div>
            ) : (
              <div className="ad-modal__form"><label>Community description<textarea className="ad-input" rows={4} value={community} onChange={(e) => setCommunity(e.target.value)} /></label></div>
            )}
            <button type="button" className="ad-btn ad-btn--primary ad-btn--wide" onClick={() => setEditing(null)}>Save changes</button>
          </div>
        </div>
      )}
    </AdminFrame>
  );
}
