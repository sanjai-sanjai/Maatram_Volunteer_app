import { useState } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Bookmark,
  BookOpen,
  CalendarDays,
  Check,
  ChevronDown,
  ClipboardList,
  Clock3,
  Download,
  HandHeart,
  Info,
  Leaf,
  MapPin,
  Search,
  Share2,
  SlidersHorizontal,
  Target,
  Users,
  XCircle,
  Phone,
  GraduationCap,
  Laptop,
  Mail,
  UserRound,
} from "lucide-react";
import {
  additionalOpportunities,
  canConfirmRegistration,
  eventGuide,
  registrationAcknowledgements,
} from "@/data/mock";
import { useMaatramState } from "@/components/MaatramState";
import {
  Action,
  Forward,
  Header,
  Heading,
  IconAction,
  Meta,
  Modal,
  Page,
  photos,
  Primary,
  Progress,
} from "@/components/additional-shared";
import { Logo } from "@/components/mq";
import goldenBadge from "@/assets/profile/golden-checkmark-badge.png";
export type Opportunity = (typeof additionalOpportunities)[number];
const guideIcons = [Target, Users, ClipboardList, CalendarDays, Phone];
const confettiColors = ["#FEC802", "#FFD000", "#20B83A", "#FF8A00", "#2B4EBC", "#E53935"];
const confettiPieces = Array.from({ length: 32 }, (_, i) => {
  const angle = (i / 32) * Math.PI * 2;
  const dist = 90 + (i % 6) * 28;
  return {
    id: i,
    tx: Math.cos(angle) * dist,
    ty: Math.sin(angle) * dist - 20,
    rot: (i * 47) % 360,
    delay: (i % 8) * 0.035,
    color: confettiColors[i % confettiColors.length],
    w: 6 + (i % 3) * 3,
    h: 10 + (i % 4) * 3,
  };
});
export function getOpportunity(id: string): Opportunity {
  return additionalOpportunities.find((op) => op.id === id) ?? additionalOpportunities[0]!;
}
export function RegistrationModal({
  op,
  open,
  onClose,
}: {
  op: Opportunity;
  open: boolean;
  onClose: () => void;
}) {
  const [checks, setChecks] = useState([true, true, true, true]);
  const [celebrate, setCelebrate] = useState(false);
  const state = useMaatramState();
  const navigate = useNavigate();

  const handleRegister = () => {
    state.register(op.id);
    setCelebrate(true);
  };

  const handleGoToCommunity = () => {
    setCelebrate(false);
    onClose();
    navigate({
      to: "/community/$communityId",
      params: {
        communityId: op.id === "palm-seeds" ? "palm-plantation" : "physical-verification",
      },
    });
  };

  return (
    <>
      <Modal open={open && !celebrate} onClose={onClose} title="Registration Confirmation">
        <Logo small />
        <Heading
          title="Registration Confirmation"
          subtitle="Review the details before officially joining"
        />
        <div className="ma-confirm-summary">
          <img src={photos[op.photo]} alt={op.name} />
          <div>
            <h3>{op.name}</h3>
            <Category text={op.category} />
            <Meta op={op} />
            <small>
              <Users /> {op.joined} / {op.capacity} Volunteers Joined
            </small>
            <Progress value={op.joined} max={op.capacity} />
          </div>
        </div>
        <Heading
          title="Confirm Your Registration"
          subtitle="By joining, you agree to the following."
        />
        <div className="ma-checklist">
          {registrationAcknowledgements.map((text, i) => (
            <label key={text}>
              <input
                type="checkbox"
                checked={checks[i]}
                onChange={(e) =>
                  setChecks((old) => old.map((v, n) => (n === i ? e.target.checked : v)))
                }
              />
              <span>{text}</span>
            </label>
          ))}
        </div>
        <p className="ma-notice">
          <Info /> Once you confirm, you will be added to the event community for all updates and
          coordination.
        </p>
        <Primary onClick={handleRegister}>
          <HandHeart />{" "}
          <span>
            Yes, Register Me<small>Join the opportunity</small>
          </span>
          <ArrowRight />
        </Primary>
        <Action className="ma-cancel" onClick={onClose}>
          <XCircle /> Cancel
        </Action>
      </Modal>

      {/* ATTRACTIVE POPUP CONGRATULATIONS ANIMATION */}
      {open && celebrate && (
        <div
          className="ma-celebrate ma-reg-celebrate"
          role="dialog"
          aria-modal="true"
          aria-label="Registration confirmed celebration"
        >
          <div className="ma-celebrate-card ma-reg-celebrate-card">
            <button
              type="button"
              className="ma-celebrate-close"
              aria-label="Close"
              onClick={() => {
                setCelebrate(false);
                onClose();
              }}
            >
              <XCircle size={20} />
            </button>

            {/* Glowing Golden Badge & Bursting Confetti */}
            <div className="ma-celebrate-badge ma-reg-celebrate-badge">
              <img src={goldenBadge} alt="Registration badge" />
              {confettiPieces.map((p) => (
                <span
                  key={p.id}
                  className="ma-celebrate-confetti"
                  style={
                    {
                      width: p.w,
                      height: p.h,
                      background: p.color,
                      "--tx": `${p.tx}px`,
                      "--ty": `${p.ty}px`,
                      "--rot": `${p.rot}deg`,
                      "--delay": `${p.delay}s`,
                    } as React.CSSProperties
                  }
                />
              ))}
            </div>

            <div className="ma-reg-badge-tag">
              <span>🎉 SEAT CONFIRMED</span>
            </div>

            <h2 className="ma-reg-congrats-title">
              Congratulations!
            </h2>
            <p className="ma-reg-congrats-sub">
              You are officially registered as a volunteer for
            </p>

            {/* Event Dossier Pass */}
            <div className="ma-reg-pass-card">
              <h3 className="ma-reg-pass-event">{op.name}</h3>
              <div className="ma-reg-pass-meta">
                <span>
                  <CalendarDays size={13} />
                  {op.date}
                </span>
                <span>
                  <Clock3 size={13} />
                  {op.time}
                </span>
                <span>
                  <MapPin size={13} />
                  {op.location}
                </span>
              </div>
              <div className="ma-reg-pass-volunteer">
                <span>Volunteer: <strong>Sanjai R · MT4507</strong></span>
                <span className="ma-status-pill ma-status-pill--green">✓ Enrolled</span>
              </div>
            </div>

            {/* Perks & What's Next */}
            <div className="ma-reg-perks-list">
              <div className="ma-reg-perk-item">
                <span className="ma-reg-perk-icon">💬</span>
                <span>Community group chat unlocked</span>
              </div>
              <div className="ma-reg-perk-item">
                <span className="ma-reg-perk-icon">📍</span>
                <span>GPS geofence check-in pass active</span>
              </div>
              <div className="ma-reg-perk-item">
                <span className="ma-reg-perk-icon">🏆</span>
                <span>Hours eligible for volunteer certificate</span>
              </div>
            </div>

            <button
              type="button"
              className="ma-reg-btn-primary"
              onClick={handleGoToCommunity}
            >
              <span>Enter Event Community &amp; Chats</span>
              <ArrowRight size={17} />
            </button>

            <button
              type="button"
              className="ma-reg-btn-secondary"
              onClick={() => {
                setCelebrate(false);
                onClose();
              }}
            >
              Done, Stay Here
            </button>
          </div>
        </div>
      )}
    </>
  );
}
export function Category({ text }: { text: string }) {
  return (
    <span className="ma-category">
      <Leaf />
      {text}
    </span>
  );
}
export function OpportunityCard({ op }: { op: Opportunity }) {
  const { joined } = useMaatramState();
  const navigate = useNavigate();
  const onContribute = () =>
    navigate({ to: "/opportunities/$opportunityId", params: { opportunityId: op.id } });
  const registered = joined.includes(op.id);
  const count = op.joined + (registered ? 1 : 0);
  return (
    <article className="ma-op-card">
      <Link
        to="/opportunities/$opportunityId"
        params={{ opportunityId: op.id }}
        className="ma-op-photo"
      >
        <img src={photos[op.photo]} alt={op.name} />
        {op.trending && <span className="ma-trending">🔥 Trending</span>}
      </Link>
      <div className="ma-op-body">
        <Link to="/opportunities/$opportunityId" params={{ opportunityId: op.id }}>
          <h2>{op.name}</h2>
        </Link>
        {!op.trending && <span className="ma-slots-mini">{op.capacity - count} Slots Left</span>}
        <Meta op={op} />
        <p className="ma-joined">
          <Users />
          <b>
            {count} / {op.capacity}
          </b>{" "}
          Volunteers Joined
        </p>
        <Progress value={count} max={op.capacity} />
        {op.trending && (
          <div className="ma-slots">
            <Users />
            <span>
              <b>{op.capacity - count} Slots Remaining!</b>
              <small>Click to contribute your volunteering.</small>
            </span>
          </div>
        )}
        <Primary onClick={onContribute}>
          {registered ? "Joined" : "Contribute"} {registered ? <Check /> : <ArrowRight />}
        </Primary>
      </div>
    </article>
  );
}
export function OpportunitiesScreen() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState(false);
  const [filter, setFilter] = useState(false);
  const [city, setCity] = useState("All locations");
  const categories = [
    "All",
    "School Visits",
    "Admissions Support",
    "Physical Verification",
    "Mock Interviews",
    "Admission Panel Interviews",
  ];
  const shown = additionalOpportunities.filter(
    (op) =>
      (category === "All" || op.category === category) &&
      (city === "All locations" || op.location === city) &&
      `${op.name} ${op.location}`.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Page active="Explore">
      <Header
        tools={
          <>
            <IconAction label="Search opportunities" onClick={() => setSearch(!search)}>
              <Search />
            </IconAction>
            <IconAction label="Filter opportunities" onClick={() => setFilter(!filter)}>
              <SlidersHorizontal />
            </IconAction>
          </>
        }
      />
      <Heading title="Upcoming Opportunities" subtitle="Browse all active opportunities" />
      {search && (
        <label className="ma-search">
          <Search />
          <input
            autoFocus
            placeholder="Search opportunities…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </label>
      )}
      {filter && (
        <label className="ma-field">
          Location
          <select value={city} onChange={(e) => setCity(e.target.value)}>
            <option>All locations</option>
            <option>Chennai</option>
            <option>Coimbatore</option>
          </select>
        </label>
      )}
      <div className="ma-filters">
        {categories.map((c, i) => {
          const Icon = i === 1 ? GraduationCap : i === 3 ? ClipboardList : i === 4 ? Laptop : Users;
          return (
            <Action
              className={category === c ? "is-active" : ""}
              key={c}
              onClick={() => setCategory(c)}
            >
              {i > 0 && <Icon />}
              {c}
            </Action>
          );
        })}
      </div>
      <div className="ma-op-list">
        {shown.map((op) => (
          <OpportunityCard key={op.id} op={op} />
        ))}
        {!shown.length && <p className="ma-empty">No opportunities match your search.</p>}
      </div>
    </Page>
  );
}
export function DetailsScreen({ id }: { id: string }) {
  const op = getOpportunity(id);
  const [modal, setModal] = useState(false);
  const [saved, setSaved] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [notOpen, setNotOpen] = useState(false);
  const { joined } = useMaatramState();
  const navigate = useNavigate();
  if (!op) return null;
  return (
    <Page className="ma-details">
      <Header
        back="/opportunities"
        tools={
          <>
            <IconAction
              label={saved ? "Remove bookmark" : "Bookmark opportunity"}
              onClick={() => setSaved(!saved)}
            >
              {saved ? <Check /> : <Bookmark />}
            </IconAction>
            <IconAction
              label="Share opportunity"
              onClick={() => {
                setFeedback("Opportunity link copied.");
                if (navigator.clipboard) void navigator.clipboard.writeText(window.location.href);
              }}
            >
              <Share2 />
            </IconAction>
          </>
        }
      />
      <Heading
        title="Opportunity Details"
        subtitle="View complete details and contribute to this opportunity"
      />
      <div className="ma-detail-hero">
        <img src={photos[op.id === "palm-seeds" ? "hero" : op.photo]} alt={op.name} />
        <Category text={op.category} />
      </div>
      <Heading title={op.name} subtitle={op.description} />
      <div className="ma-metrics">
        {[
          [MapPin, op.location, ""],
          [CalendarDays, op.date, ""],
          [Clock3, op.time.split(" – ")[0], op.time.split(" – ")[1]],
          [
            Users,
            `${op.joined + (joined.includes(op.id) ? 1 : 0)} / ${op.capacity}`,
            "Volunteers Joined",
          ],
        ].map(([Icon, value, sub], i) => {
          const I = Icon as typeof MapPin;
          return (
            <div key={i}>
              <I />
              <strong>{String(value)}</strong>
              <small>{String(sub)}</small>
            </div>
          );
        })}
      </div>
      <section className="ma-about">
        <Heading title="About the Event" />
        <img src={photos["palm-team"]} alt="Palm sapling" />
        <p>
          A tree plantation drive aimed at planting palm seeds across designated areas to restore
          green cover, combat climate change and create a cleaner, healthier environment for our
          future generations. This initiative encourages student participation in hands-on
          environmental action, fostering a sense of responsibility towards nature and a sustainable
          tomorrow.
        </p>
        <Action
          onClick={() =>
            setFeedback("Every seed planted contributes to biodiversity and a greener community.")
          }
        >
          Read More <ArrowRight />
        </Action>
      </section>
      <Heading
        title="Event Guide"
        subtitle="Complete details to help you participate effectively."
      />
      <div className="ma-accordion">
        {eventGuide.map((g, i) => {
          const Icon = guideIcons[i];
          return (
            <details key={g.title}>
              <summary>
                {Icon && <Icon />}
                <b>{g.title}</b>
                <span>{g.text.split("\n")[0]}</span>
                <ChevronDown />
              </summary>
              <p>{g.text}</p>
            </details>
          );
        })}
      </div>
      <div className="ma-slot-panel">
        <Users />
        <div>
          <b>{op.capacity - op.joined - (joined.includes(op.id) ? 1 : 0)} Slots Remaining!</b>
          <small>Be a part of this green mission.</small>
        </div>
        <Users />
        <div>
          <b>
            {op.joined + (joined.includes(op.id) ? 1 : 0)} / {op.capacity}
          </b>
          <small>Slots Filled</small>
        </div>
      </div>
      {feedback && (
        <p role="status" className="ma-feedback">
          {feedback}
        </p>
      )}
      <div className="ma-detail-actions">
        <div className="ma-detail-actions-primary-row">
          <Primary onClick={() => setModal(true)} className="ma-detail-btn-interested">
            <HandHeart />
            <span>
              {joined.includes(op.id) ? "Joined" : "Interested"}
              <small>(Contribute)</small>
            </span>
          </Primary>
          <Action onClick={() => setNotOpen(true)} className="ma-detail-btn-not-interested">
            <XCircle />
            <span>Not Interested</span>
          </Action>
        </div>
        <div className="ma-detail-actions-secondary-row">
          <Action asChild className="ma-detail-btn-guide">
            <Link to="/opportunities/$opportunityId/guide" params={{ opportunityId: op.id }}>
              <BookOpen />
              <span>Read Guide</span>
            </Link>
          </Action>
        </div>
      </div>
      <RegistrationModal op={op} open={modal} onClose={() => setModal(false)} />
      <Modal open={notOpen} onClose={() => setNotOpen(false)} title="Not interested confirmation">
        <div className="ma-alert">
          <span className="ma-alert-icon">
            <XCircle />
          </span>
          <h2>Are you sure?</h2>
          <p>
            You are about to mark <b>{op.name}</b> as not interested. You can still come back and
            contribute later.
          </p>
          <div className="ma-alert-actions">
            <Action className="ma-cancel" onClick={() => setNotOpen(false)}>
              No, Go Back
            </Action>
            <Primary
              onClick={() => {
                setNotOpen(false);
                navigate({ to: "/opportunities" });
              }}
            >
              Yes, I'm Sure
            </Primary>
          </div>
        </div>
      </Modal>
    </Page>
  );
}
export async function downloadGuide(op: Opportunity) {
  const { buildGuidePdf } = await import("@/lib/guide-pdf");
  const blob = await buildGuidePdf(op);
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `Maatram-${op.name.replace(/\s+/g, "-")}-Guide.pdf`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 30000);
}
export function GuideScreen({ id }: { id: string }) {
  const op = getOpportunity(id);
  const [saved, setSaved] = useState(false);
  const [feedback, setFeedback] = useState("");
  if (!op) return null;
  return (
    <Page className="ma-guide">
      <Header
        back={`/opportunities/${op.id}`}
        tools={
          <>
            <IconAction
              label="Share guide"
              onClick={() => {
                setFeedback("Guide link copied.");
                if (navigator.clipboard) void navigator.clipboard.writeText(window.location.href);
              }}
            >
              <Share2 />
            </IconAction>
            <IconAction label="Bookmark guide" onClick={() => setSaved(!saved)}>
              {saved ? <Check /> : <Bookmark />}
            </IconAction>
          </>
        }
      />
      <Heading title="Event Guide" subtitle="All the details you need to participate effectively" />
      <div className="ma-guide-summary">
        <img src={photos[op.photo]} alt={op.name} />
        <div>
          <h2>{op.name}</h2>
          <Meta op={op} />
          <Category text="Event Guide" />
        </div>
      </div>
      {eventGuide.map((g, i) => {
        const Icon = guideIcons[i];
        return (
          <section className="ma-guide-section" key={g.title}>
            <div className="ma-guide-icon">{Icon && <Icon />}</div>
            <div>
              <h2>{g.title}</h2>
              {g.title === "Responsibilities" || g.title === "Preparation Requirements" ? (
                <ul>
                  {g.text.split("\n").map((t) => (
                    <li key={t}>{t}</li>
                  ))}
                </ul>
              ) : g.title === "Schedule" ? (
                <ol className="ma-timeline">
                  {g.text.split("\n").map((t) => {
                    const [time, label] = t.split(" — ");
                    return (
                      <li key={t}>
                        <b>{time}</b>
                        <span>– {label}</span>
                      </li>
                    );
                  })}
                </ol>
              ) : g.title === "Contact Details" ? (
                <div className="ma-contact">
                  <div>
                    <UserRound />
                    <span>
                      <b>Mr. Aravind K</b>
                      <small>Event Coordinator</small>
                    </span>
                  </div>
                  <div>
                    <a href="tel:+919876543210">
                      <Phone />
                      +91 98765 43210
                    </a>
                    <a href="mailto:aravind@maatram.org">
                      <Mail />
                      aravind@maatram.org
                    </a>
                  </div>
                </div>
              ) : (
                <p>{g.text}</p>
              )}
            </div>
          </section>
        );
      })}
      {feedback && (
        <p role="status" className="ma-feedback">
          {feedback}
        </p>
      )}
      <Primary onClick={() => void downloadGuide(op)}>
        <Download />
        Download Guide
      </Primary>
    </Page>
  );
}
