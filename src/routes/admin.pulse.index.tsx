import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  CalendarDays,
  EllipsisVertical,
  MapPin,
  Megaphone,
  Radio,
  Search,
  SlidersHorizontal,
  UsersRound,
} from "lucide-react";
import { useMemo, useState } from "react";
import { AdminFrame, Chip, PageHeader, Progress, categoryTone } from "@/components/admin/admin-ui";
import { useAdmin } from "@/components/admin/AdminState";
import { eventTypes, fillPercent } from "@/data/admin-mock";
import { seo } from "@/lib/seo";
import megaphone from "@/assets/admin/megaphone-success.png";

export const Route = createFileRoute("/admin/pulse/")({
  head: () =>
    seo(
      "Pulse – Event Broadcasting",
      "Select an event and send announcements to the right volunteers.",
    ),
  component: Pulse,
});

const tabs = ["All Events", "Ongoing", "Upcoming", "Completed"] as const;
const statusTone = {
  Ongoing: "green",
  Upcoming: "blue",
  Completed: "gray",
  Live: "green",
} as const;

function Pulse() {
  const { events } = useAdmin();
  const navigate = useNavigate();
  const [tab, setTab] = useState<(typeof tabs)[number]>("All Events");
  const [q, setQ] = useState("");
  const [filterOpen, setFilterOpen] = useState(false);
  const [cats, setCats] = useState<string[]>([]);
  const [menu, setMenu] = useState<string | null>(null);
  const counts = {
    "All Events": 12 + events.filter((e) => e.status === "Live").length,
    Ongoing: 5 + events.filter((e) => e.status === "Live").length,
    Upcoming: 4,
    Completed: 3,
  };
  const list = useMemo(
    () =>
      events.filter((e) => {
        const st = e.status === "Live" ? "Ongoing" : e.status;
        if (tab !== "All Events" && st !== tab) return false;
        if (cats.length && !cats.includes(e.category)) return false;
        const s = q.trim().toLowerCase();
        return (
          !s || [e.name, e.location, e.category, ...e.tags].some((v) => v.toLowerCase().includes(s))
        );
      }),
    [events, tab, q, cats],
  );
  const go = (id: string) => navigate({ to: "/admin/pulse/targeting", search: { event: id } });

  return (
    <AdminFrame nav="Events">
      <PageHeader
        back="/admin"
        icon={<Radio />}
        title="Pulse – Event Broadcasting"
        sub="Select an event and start sending announcements to the right volunteers."
      />
      <section className="ad-banner">
        <span className="ad-icon-circle ad-icon-circle--solid">
          <Radio />
        </span>
        <div>
          <h2>Smart Event Broadcasting</h2>
          <p>Choose an event below to send targeted announcements and invite volunteers to join.</p>
        </div>
        <img src={megaphone} alt="" className="ad-banner__art" width={1024} height={1024} />
      </section>
      <div className="ad-tabs" role="tablist">
        {tabs.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={tab === t}
            className={tab === t ? "active" : ""}
            onClick={() => setTab(t)}
          >
            {t} ({counts[t]})
          </button>
        ))}
      </div>
      <div className="ad-search">
        <label className="ad-search__box">
          <Search />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search events by name, location or tag..."
            aria-label="Search events"
          />
        </label>
        <button
          type="button"
          className={`ad-search__filter ${cats.length ? "on" : ""}`}
          aria-label="Filter events"
          aria-expanded={filterOpen}
          onClick={() => setFilterOpen((o) => !o)}
        >
          <SlidersHorizontal />
          {cats.length > 0 && <b>{cats.length}</b>}
        </button>
        {filterOpen && (
          <div
            className="ad-popover ad-popover--filter"
            role="dialog"
            aria-label="Filter by category"
          >
            <div className="ad-popover__head">
              <strong>Category</strong>
              <button type="button" className="ad-link" onClick={() => setCats([])}>
                Clear
              </button>
            </div>
            {eventTypes.map((c) => (
              <label key={c} className="ad-check">
                <input
                  type="checkbox"
                  checked={cats.includes(c)}
                  onChange={() =>
                    setCats((o) => (o.includes(c) ? o.filter((x) => x !== c) : [...o, c]))
                  }
                />
                {c}
              </label>
            ))}
            <button
              type="button"
              className="ad-btn ad-btn--primary ad-btn--sm"
              onClick={() => setFilterOpen(false)}
            >
              Apply
            </button>
          </div>
        )}
      </div>
      <div className="ad-event-list">
        {list.map((e) => {
          const pct = fillPercent(e.registered, e.needed);
          return (
            <article key={e.id} className="ad-card ad-event">
              <img src={e.image} alt="" />
              <div className="ad-event__body">
                <div className="ad-event__chips">
                  <Chip tone={categoryTone(e.category)}>{e.category}</Chip>
                  <Chip tone={statusTone[e.status]}>{e.status}</Chip>
                </div>
                <h3>{e.name}</h3>
                <p className="ad-inline-meta">
                  <CalendarDays />
                  {e.date}
                </p>
                <p className="ad-inline-meta">
                  <MapPin />
                  {e.location}
                </p>
                <p className="ad-inline-meta">
                  <UsersRound />
                  <strong>{e.registered}</strong>&nbsp;/ {e.needed} Volunteers
                </p>
                <div className="ad-progress-row">
                  <Progress value={pct} />
                  <span>{pct}% Filled</span>
                </div>
              </div>
              <div className="ad-event__side">
                <button
                  type="button"
                  className="ad-kebab"
                  aria-label={`More options for ${e.name}`}
                  onClick={() => setMenu(menu === e.id ? null : e.id)}
                >
                  <EllipsisVertical />
                </button>
                {menu === e.id && (
                  <div className="ad-popover ad-popover--menu">
                    <button type="button" onClick={() => go(e.id)}>
                      Start broadcasting
                    </button>
                    <button
                      type="button"
                      onClick={() =>
                        navigate({ to: "/admin/manage/$section", params: { section: "events" } })
                      }
                    >
                      Track registrations
                    </button>
                    <button type="button" onClick={() => setMenu(null)}>
                      Close
                    </button>
                  </div>
                )}
                <button
                  type="button"
                  className="ad-btn ad-btn--primary ad-btn--sm"
                  disabled={e.status === "Completed"}
                  onClick={() => go(e.id)}
                >
                  <Megaphone size={18} /> Start Broadcasting
                </button>
              </div>
            </article>
          );
        })}
        {!list.length && <p className="ad-empty">No events match your search or filters.</p>}
      </div>
    </AdminFrame>
  );
}
