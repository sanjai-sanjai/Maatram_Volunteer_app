import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { CalendarCheck, Check, CircleCheck, Info, MapPin, Megaphone, Send, Sparkles, Target, UserRoundCheck, UsersRound } from "lucide-react";
import { useState } from "react";
import { AdminFrame, EventSummaryCard, PageHeader } from "@/components/admin/admin-ui";
import { useAdminEvent } from "@/components/admin/AdminState";
import { audienceTiers, matchingInsights, recipientsFor, totalMatches } from "@/data/admin-mock";
import { seo } from "@/lib/seo";
import target from "@/assets/admin/target.png";

export const Route = createFileRoute("/admin/pulse/targeting")({
  validateSearch: (s: Record<string, unknown>) => ({ event: typeof s["event"] === "string" ? s["event"] : "palm-seeds" }),
  head: () => seo("Smart Volunteering Announcement", "Reach the right volunteers faster with tiered audience targeting."),
  component: Targeting,
});

const fmt = (n: number) => n.toLocaleString("en-IN");

function Targeting() {
  const { event } = Route.useSearch();
  const ev = useAdminEvent(event);
  const navigate = useNavigate();
  const [tier, setTier] = useState(1);
  const count = recipientsFor(tier);
  const insights = [
    { label: "Location Match", sub: "Volunteers in or near Chennai", v: matchingInsights.location, icon: <MapPin /> },
    { label: "Similar Event Experience", sub: "Attended similar events", v: matchingInsights.experience, icon: <UsersRound /> },
    { label: "Availability Match", sub: "Available on Nov 02, 2026", v: matchingInsights.availability, icon: <CalendarCheck /> },
    { label: "Overall Relevance", sub: "High chance of interest", v: matchingInsights.relevance, icon: <Target />, green: true },
  ];

  return (
    <AdminFrame>
      <PageHeader back="/admin/pulse" icon={<Megaphone />} title="Smart Volunteering Announcement" sub="Reach the right volunteers, faster and smarter." />
      <section className="ad-banner">
        <span className="ad-icon-circle ad-icon-circle--solid"><Sparkles /></span>
        <div><h2>AI-Powered Volunteer Targeting</h2><p>Volunteers are grouped by location, past participation and availability.</p></div>
        <img src={target} alt="" className="ad-banner__art" width={816} height={816} />
      </section>
      <EventSummaryCard ev={ev} />

      <section className="ad-card ad-block">
        <div className="ad-block__row"><h2 className="ad-block__title"><Sparkles className="ad-sparkle" /> Matching Insights</h2><Info size={18} className="ad-muted" /></div>
        <div className="ad-insights">
          {insights.map((i) => (
            <div key={i.label} className={`ad-insight ${i.green ? "green" : ""}`}>
              <span className="ad-icon-circle">{i.icon}</span><strong>{i.label}</strong><small>{i.sub}</small><b>{i.v}%</b>
            </div>
          ))}
        </div>
      </section>

      <section className="ad-card ad-block">
        <div className="ad-block__row"><h2 className="ad-block__title"><UserRoundCheck /> Select Audience Tier</h2><span className="ad-chip ad-chip--yellow">Total Matches: {fmt(totalMatches())}</span></div>
        <div className="ad-tiers" role="radiogroup" aria-label="Audience tier">
          {audienceTiers.map((t) => (
            <button key={t.tier} type="button" role="radio" aria-checked={tier === t.tier} className={`ad-tier ${tier === t.tier ? "on" : ""}`} onClick={() => setTier(t.tier)}>
              <span className="ad-tier__radio">{tier === t.tier && <Check size={16} />}</span>
              <span className="ad-tier__text"><strong>Tier {t.tier}</strong><small>{t.label}</small></span>
              <span className="ad-tier__count"><b>{fmt(t.count)}</b><small>Volunteers</small></span>
            </button>
          ))}
        </div>
      </section>

      <div className="ad-confirm" role="status" aria-live="polite">
        <span className="ad-icon-circle ad-icon-circle--solid"><CircleCheck /></span>
        <p>You are about to send an announcement to <strong>{fmt(count)} volunteers (Tier {tier})</strong> for <strong>{ev.name}</strong>.</p>
      </div>
      <button type="button" className="ad-btn ad-btn--primary ad-btn--wide" onClick={() => navigate({ to: "/admin/pulse/success", search: { event: ev.id, tier } })}><Send /> Send Announcement</button>
    </AdminFrame>
  );
}
