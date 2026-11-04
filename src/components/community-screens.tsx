import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  BookOpen,
  CalendarDays,
  Check,
  ChevronRight,
  ClipboardList,
  Download,
  Info,
  Leaf,
  MapPin,
  MessageCircle,
  MoreVertical,
  Search,
  Sprout,
  Target,
  Users,
} from "lucide-react";
import { additionalCommunities, eventGuide } from "@/data/mock";
import { Action } from "@/components/additional-shared";
import {
  Forward,
  Header,
  Heading,
  IconAction,
  Page,
  photos,
  Primary,
} from "@/components/additional-shared";
import { Category, downloadGuide, getOpportunity } from "@/components/opportunity-screens";
import { useMaatramState } from "@/components/MaatramState";
export function getCommunity(id: string) {
  return additionalCommunities.find((c) => c.id === id) ?? additionalCommunities[0];
}
export function CommunitiesScreen() {
  const [query, setQuery] = useState("");
  const state = useMaatramState();
  return (
    <Page active="Community">
      <Header />
      <Heading title="My Communities" subtitle="All communities you’ve joined as a volunteer" />
      <section className="ma-student">
        <img src="/assets/dashboard/student-avatar.jpg" alt="Sanjai R" />
        <div>
          <h2>Sanjai R</h2>
          <p>Maatram Student · 3rd Year, Mechatronics</p>
          <div className="ma-student-stats">
            <div>
              <Users />
              <b>{4 + state.joined.length}</b>
              <span>
                Communities
                <br />
                Joined
              </span>
            </div>
            <div>
              <CalendarDays />
              <b>7</b>
              <span>
                Events
                <br />
                Contributed
              </span>
            </div>
            <div>
              <Sprout />
              <b>16 hrs</b>
              <span>
                Total
                <br />
                Service
              </span>
            </div>
          </div>
        </div>
      </section>
      <label className="ma-search">
        <Search />
        <input
          placeholder="Search your communities…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </label>
      <div className="ma-community-list">
        {additionalCommunities
          .filter((c) => c.name.toLowerCase().includes(query.toLowerCase()))
          .map((c) => (
            <Link
              className="ma-community-card"
              to="/community/$communityId/chat"
              params={{ communityId: c.id }}
              key={c.id}
            >
              <img src={photos[c.photo]} alt={c.name} />
              <div>
                <h2>{c.name}</h2>
                <Category text={c.category} />
                <p>
                  <Users />
                  {c.members} Members{" "}
                  <span className={c.active === "Active Today" ? "ma-active" : "ma-muted"}>
                    ● {c.active}
                  </span>
                </p>
              </div>
              <span className="ma-community-arrow">
                <ArrowRight />
              </span>
            </Link>
          ))}
      </div>
    </Page>
  );
}
export function CommunityScreen({ id }: { id: string }) {
  const c = getCommunity(id);
  const [tab, setTab] = useState("Overview");
  const [menu, setMenu] = useState(false);
  const [notice, setNotice] = useState("");
  const { joined } = useMaatramState();
  if (!c) return null;
  return (
    <Page className="ma-community-detail">
      <div className="ma-community-cover">
        <img src={photos[c.id === "palm-plantation" ? "cover" : c.photo]} alt={c.name} />
        <Action asChild className="ma-icon">
          <Link
            to="/community/$communityId/chat"
            params={{ communityId: c.id }}
            aria-label="Back to chat"
          >
            <ArrowLeft />
          </Link>
        </Action>
        <IconAction label="Community options" onClick={() => setMenu(!menu)}>
          <MoreVertical />
        </IconAction>
      </div>
      <section className="ma-community-identity">
        <img src="/assets/brand/maatram-foundation-logo.png" alt="Maatram Foundation" />
        <div>
          <h1>{c.name}</h1>
          <Category text={c.category} />
          <span> · Maatram Community</span>
        </div>
        <p>
          <Users />
          {c.members + (joined.includes(c.eventId) ? 1 : 0)} Members{" "}
          <span className="ma-active">● Active Today</span>
        </p>
      </section>
      {menu && (
        <div className="ma-inline-menu">
          <Action
            onClick={() => {
              setNotice("Community notifications muted.");
              setMenu(false);
            }}
          >
            Mute notifications
          </Action>
          <Action
            onClick={() => {
              setNotice("Community link copied.");
              setMenu(false);
              if (navigator.clipboard) void navigator.clipboard.writeText(window.location.href);
            }}
          >
            Share community
          </Action>
        </div>
      )}
      <nav className="ma-tabs" aria-label="Community views">
        {["Overview", "Events", "Members", "Info"].map((t) => (
          <Action key={t} className={t === tab ? "is-active" : ""} onClick={() => setTab(t)}>
            {t}
          </Action>
        ))}
      </nav>
      {(tab === "Overview" || tab === "Events") && (
        <>
          <Link
            className="ma-community-event"
            to="/opportunities/$opportunityId"
            params={{ opportunityId: c.eventId }}
          >
            <div>
              <span>NOV</span>
              <b>02</b>
              <span>SAT</span>
            </div>
            <div>
              <h2>
                {c.id === "palm-plantation" ? "Palm Seeds Plantation" : c.name.replace(" Team", "")}
              </h2>
              <p>
                <MapPin />
                Chennai
              </p>
              <p>
                <CalendarDays />
                9:00 AM – 12:00 PM
              </p>
            </div>
            <Sprout />
          </Link>
          <section className="ma-info-section">
            <Target />
            <div>
              <h2>Event Overview</h2>
              <p>
                A plantation drive to increase green cover by planting native palm seeds, with
                student volunteers, awareness activities, and care planning.
              </p>
            </div>
            <img src={photos["planting"]} alt="Plantation volunteers" />
          </section>
          {tab === "Events" && (
            <Forward to={`/opportunities/${c.eventId}`}>View Event Details</Forward>
          )}
        </>
      )}
      {tab === "Overview" && (
        <>
          <div className="ma-community-columns">
            <section className="ma-info-section">
              <BookOpen />
              <div>
                <h2>Event Guide</h2>
                <p>
                  Step-by-step plan, roles,
                  <br />
                  requirements & Do’s/Don’ts.
                </p>
                <Action onClick={() => void downloadGuide(getOpportunity("palm-seeds"))}>
                  <Download />
                  Download Guide
                </Action>
                <Action asChild>
                  <Link
                    to="/opportunities/$opportunityId/guide"
                    params={{ opportunityId: c.eventId }}
                  >
                    Read Guide
                    <ChevronRight />
                  </Link>
                </Action>
              </div>
            </section>
            <section className="ma-info-section">
              <ClipboardList />
              <div>
                <h2>What to Bring</h2>
                <ul>
                  <li>Water bottle (Reusable)</li>
                  <li>Cap / Hat</li>
                  <li>Comfortable shoes</li>
                  <li>Gloves (If available)</li>
                </ul>
              </div>
            </section>
          </div>
          <AboutCommunity />
          <AdditionalInfo members={c.members} />
        </>
      )}
      {tab === "Members" && (
        <section className="ma-members">
          <Heading
            title="Community Members"
            subtitle={`${c.members} volunteers working together`}
          />
          {[
            ["Aravind K", "Coordinator", "coordinator"],
            ["Kaviya S", "Volunteer", "kaviya"],
            ["Sanjai R", "Student", ""],
          ].map(([name, role, photo]) => (
            <div key={name}>
              <img
                src={photo ? photos[photo] : "/assets/dashboard/student-avatar.jpg"}
                alt={name}
              />
              <span>
                <b>{name}</b>
                <small>{role}</small>
              </span>
              <span className="ma-active">● Active</span>
            </div>
          ))}
        </section>
      )}
      {tab === "Info" && (
        <>
          <AboutCommunity />
          <AdditionalInfo members={c.members} />
          <section className="ma-guide-section">
            <Info />
            <div>
              <h2>Community Coordinator</h2>
              <p>{eventGuide[4]?.text}</p>
            </div>
          </section>
        </>
      )}
      {notice && (
        <p role="status" className="ma-feedback">
          {notice}
        </p>
      )}
      <Forward to={`/community/${c.id}/chat`}>
        <MessageCircle />
        Open Community Chat
      </Forward>
    </Page>
  );
}
function AboutCommunity() {
  return (
    <section className="ma-info-section">
      <Users />
      <div>
        <h2>About This Community</h2>
        <p>
          A Maatram initiative focused on increasing green cover through palm plantation drives,
          awareness, and long-term care.
        </p>
      </div>
      <Sprout />
    </section>
  );
}
function AdditionalInfo({ members }: { members: number }) {
  return (
    <section className="ma-additional-info">
      <h2>
        <Info />
        Additional Information
      </h2>
      <div>
        {[
          [MapPin, "Venue", "Chennai"],
          [Users, "Volunteers", `${members} Members`],
          [Sprout, "Impact Goal", "100+ Palm Seeds"],
          [Bell, "Updates", "Event circulars, photos & reports"],
        ].map(([Icon, title, text], i) => {
          const I = Icon as typeof MapPin;
          return (
            <div key={i}>
              <I />
              <b>{String(title)}</b>
              <small>{String(text)}</small>
            </div>
          );
        })}
      </div>
    </section>
  );
}
