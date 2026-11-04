import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { ChartNoAxesColumnIncreasing, Eye, Megaphone, Share2, UsersRound, X } from "lucide-react";
import { useState } from "react";
import { AdminFrame, EventSummaryCard, PageHeader } from "@/components/admin/admin-ui";
import { useAdmin, useAdminEvent } from "@/components/admin/AdminState";
import { seo } from "@/lib/seo";
import megaphone from "@/assets/admin/megaphone-success.png";

export const Route = createFileRoute("/admin/opportunities/published")({
  head: () => seo("Opportunity Published", "Your volunteering event is now live for Maatram volunteers."),
  component: Published,
});

function Published() {
  const { published, draft, resetDraft } = useAdmin();
  const fallback = useAdminEvent("palm-seeds");
  const ev = published ?? fallback;
  const navigate = useNavigate();
  const [preview, setPreview] = useState(false);
  const [note, setNote] = useState("");
  const share = async () => {
    const text = `Join "${ev.name}" on ${ev.date} at ${ev.fullLocation} with Maatram Foundation!`;
    try {
      if (navigator.share) await navigator.share({ title: ev.name, text });
      else { await navigator.clipboard.writeText(text); setNote("Event details copied to clipboard."); }
    } catch { setNote("Sharing was cancelled."); }
  };

  return (
    <AdminFrame className="ad-page--success">
      <PageHeader back="/admin" title="Opportunity Published" sub="Your volunteering event is now live!" />
      <div className="ad-hero-art"><span className="ad-hills" aria-hidden /><img src={megaphone} alt="Published" width={1024} height={1024} /></div>
      <h2 className="ad-big-title">Opportunity Published!</h2>
      <p className="ad-big-sub">The event has been successfully created and is now live for volunteers to join.</p>
      <EventSummaryCard ev={ev} badge={<span className="ad-chip ad-chip--live"><i />Live</span>} />
      <div className="ad-shortcuts">
        <button type="button" onClick={() => setPreview(true)}><span><Eye /></span>View Event</button>
        <button type="button" onClick={share}><span><Share2 /></span>Share</button>
        <Link to="/admin/manage/$section" params={{ section: "communities" }}><span><UsersRound /></span>View Community</Link>
        <Link to="/admin/manage/$section" params={{ section: "events" }}><span><ChartNoAxesColumnIncreasing /></span>Track Registrations</Link>
      </div>
      {note && <p className="ad-hint ad-center" role="status">{note}</p>}
      <div className="ad-green-note"><span><UsersRound /></span><p>Volunteers can now discover <em>and</em> register for this opportunity.</p></div>
      <button type="button" className="ad-btn ad-btn--primary ad-btn--wide" onClick={() => { resetDraft(); navigate({ to: "/admin/pulse/targeting", search: { event: ev.id } }); }}><Megaphone /> Send Announcement</button>

      {preview && (
        <div className="ad-modal" role="dialog" aria-label="Event preview" onClick={() => setPreview(false)}>
          <div className="ad-modal__panel" onClick={(e) => e.stopPropagation()}>
            <div className="ad-modal__head"><h2>Volunteer view</h2><button type="button" className="ad-round-btn" aria-label="Close" onClick={() => setPreview(false)}><X /></button></div>
            <img src={ev.image} alt="" className="ad-preview-img" />
            <h3>{ev.name}</h3>
            <p className="ad-navy">{ev.fullLocation} · {ev.date} · {ev.time}</p>
            <p>{published ? draft.description : "Join fellow volunteers to plant palm seeds and restore green cover."}</p>
            <p className="ad-hint">{ev.registered} of {ev.needed} volunteers registered</p>
          </div>
        </div>
      )}
    </AdminFrame>
  );
}
