import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Crown, Trophy, UserX, UsersRound } from "lucide-react";
import { useState } from "react";
import {
  ListHead, Pagination, SearchBar, SheetsIcon, Toast, VolunteerCategories, VolunteerFrame, VolunteerHeader, VolunteerHero,
  VolunteerListItem, useApproved, type VolTab,
} from "@/components/admin/volunteers";
import { matchesSearch, volunteerCounts, volunteers } from "@/data/volunteers-mock";
import { seo } from "@/lib/seo";

import { exportVolunteersSheet } from "@/lib/export-volunteers";
const tabs: VolTab[] = ["verification", "all", "active", "tiers"];
export const Route = createFileRoute("/admin/volunteers/")({
  validateSearch: (s: Record<string, unknown>): { tab?: VolTab } => (tabs.includes(s["tab"] as VolTab) ? { tab: s["tab"] as VolTab } : {}),
  head: () => seo("Admin – Volunteers", "Manage, verify and organize the Maatram volunteer community."),
  component: VolunteersPage,
});

type Seg = "volunteered" | "non" | "top";

function VolunteersPage() {
  const { tab = "verification" } = Route.useSearch();
  const navigate = useNavigate({ from: "/admin/volunteers/" });
  const approved = useApproved();
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [seg, setSeg] = useState<Seg>("volunteered");
  const [toast, setToast] = useState("");

  const base = volunteers.filter((v) => matchesSearch(v, q) && (filter === "All" || v.status === filter));
  const pending = base.filter((v) => v.pending && !approved.includes(v.id));
  const pendingCount = volunteerCounts.verification - approved.length;
  // reference list shows all five core volunteers in the directory; segments re-order / narrow it
  const dir = base.filter((v) => (seg === "non" ? !v.volunteered : seg === "top" ? v.top : true));
  const crumb = tab === "all" ? "All Volunteers" : tab === "active" ? "Active" : tab === "tiers" ? "Tier Management" : undefined;

  return (
    <VolunteerFrame export={tab === "all" || tab === "active"}>
      <VolunteerHeader crumb={crumb} />
      <VolunteerHero />
      <VolunteerCategories tab={tab} pending={pendingCount} onTab={(t) => { setQ(""); navigate({ search: t === "verification" ? {} : { tab: t } }); }} />

      {tab === "verification" && (
        <section className="vl-card vl-panel">
          <ListHead title="Volunteer Verification" sub="Review and verify volunteer profiles." badge={pendingCount} />
          <SearchBar value={q} onChange={setQ} placeholder="Search by name, email or location..." filter={filter} onFilter={setFilter} />
          <div className="vl-list">
            {pending.map((v) => <VolunteerListItem key={v.id} v={v} mode="pending" />)}
            {pending.length === 0 && <p className="vl-empty">No pending volunteers match your search.</p>}
          </div>
        </section>
      )}

      {(tab === "all" || tab === "active") && (
        <>
          <section className="vl-card vl-panel">
            <ListHead title={tab === "all" ? "All Volunteers" : "Active Volunteers"} count={tab === "all" ? "(4,500)" : "(286)"} sub={tab === "all" ? "Complete list of students and other volunteers." : "Volunteers engaged in the last 30 days."} />
            <SearchBar value={q} onChange={setQ} placeholder="Search by name, email, ID or location..." filter={filter} onFilter={setFilter} />
            {tab === "all" && (
              <div className="vl-segs" role="tablist">
                <button type="button" role="tab" aria-selected={seg === "volunteered"} className={seg === "volunteered" ? "is-on" : ""} onClick={() => setSeg("volunteered")}><UsersRound /><span>Volunteered<br />(3,240)</span></button>
                <button type="button" role="tab" aria-selected={seg === "non"} className={seg === "non" ? "is-on" : ""} onClick={() => setSeg("non")}><UserX /><span>Non-Volunteered<br />(980)</span></button>
                <button type="button" role="tab" aria-selected={seg === "top"} className={seg === "top" ? "is-on" : ""} onClick={() => setSeg("top")}><Trophy /><span>Top Volunteered<br />(120)</span></button>
              </div>
            )}
            <div className="vl-list">
              {(tab === "active" ? base.filter((v) => v.volunteered) : dir).map((v) => <VolunteerListItem key={v.id} v={v} mode="directory" />)}
              {(tab === "active" ? base.filter((v) => v.volunteered) : dir).length === 0 && <p className="vl-empty">No volunteers match your search.</p>}
            </div>
            <Pagination total={tab === "all" ? (seg === "volunteered" ? volunteerCounts.all : seg === "non" ? volunteerCounts.nonVolunteered : volunteerCounts.top) : volunteerCounts.active} />
          </section>
          <button type="button" className="vl-export" onClick={() => { setToast("Preparing sheet download…"); void exportVolunteersSheet().then(() => setToast("Volunteer sheet downloaded")); }}><SheetsIcon />Export G-Sheet Data</button>
        </>
      )}

      {tab === "tiers" && (
        <section className="vl-card vl-panel">
          <ListHead title="Tier Management" sub="Recognise volunteers by their level of engagement." />
          <div className="vl-tiers">
            {[["Tier 1", "40+ service hours", 120], ["Tier 2", "15–40 service hours", 860], ["Tier 3", "Under 15 service hours", 2260]].map(([t, d, n]) => (
              <div key={t} className="vl-tier"><span className="vl-tile"><Crown className="vl-crown" /></span><div><strong>{t} Volunteers</strong><p>{d}</p></div><b>{Number(n).toLocaleString("en-IN")}</b></div>
            ))}
          </div>
        </section>
      )}
      {toast && <Toast text={toast} onDone={() => setToast("")} />}
    </VolunteerFrame>
  );
}
