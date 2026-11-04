import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Clock3,
  Crown,
  GraduationCap,
  Megaphone,
  MessagesSquare,
  School,
  Search,
  ShieldCheck,
  Sprout,
  Trophy,
  Users,
} from "lucide-react";
import { Action, Modal, Page } from "@/components/additional-shared";
import { impactArena, impactHours, type ImpactPeriod } from "@/data/mock";
import hero from "@/assets/impact/hero-banner.webp";
import avatar from "@/assets/impact/volunteer-avatar-placeholder.svg";
import tenHours from "@/assets/impact/badge-10-hours.svg";
import fiftyHours from "@/assets/impact/badge-50-hours.svg";
import eco from "@/assets/impact/badge-eco-warrior.svg";
import education from "@/assets/impact/badge-education.svg";
import community from "@/assets/impact/badge-community.svg";
import goldTrophy from "@/assets/impact/gold-trophy.png";
import silverTrophy from "@/assets/impact/silver-trophy.png";
import bronzeTrophy from "@/assets/impact/bronze-trophy.png";

const podiumTrophies = [goldTrophy, silverTrophy, bronzeTrophy];

const badges = [
  {
    name: "10 Hours Club",
    image: tenHours,
    tone: "recognition",
    detail: "Celebrate your first 10 hours of volunteering.",
  },
  {
    name: "50 Hours Club",
    image: fiftyHours,
    tone: "gold",
    detail: "Celebrate 50 hours of volunteering.",
    progress: true,
  },
  {
    name: "Eco Warrior",
    image: eco,
    tone: "green",
    detail: "Recognizing your contribution to a greener environment.",
  },
  {
    name: "Education Supporter",
    image: education,
    tone: "blue",
    detail: "Recognizing your support for students and their education.",
  },
  {
    name: "Community Champion",
    image: community,
    tone: "pink",
    detail: "Celebrating meaningful contributions to your community.",
  },
];
function ContributionIcon({ category }: { category: string }) {
  const Icon =
    category === "environment"
      ? Sprout
      : category === "education"
        ? GraduationCap
        : category === "awareness"
          ? Megaphone
          : category === "verification"
            ? ShieldCheck
            : category === "school"
              ? School
              : category === "interview"
                ? MessagesSquare
                : Users;
  return (
    <Icon
      className={category === "environment" ? "ma-impact-green" : "ma-impact-gold"}
      aria-hidden="true"
    />
  );
}
function SectionTitle({
  title,
  subtitle,
  crown = false,
}: {
  title: string;
  subtitle: string;
  crown?: boolean;
}) {
  return (
    <div className={`ma-impact-title ${crown ? "ma-impact-title--crown" : ""}`}>
      {crown && <Trophy aria-hidden="true" />}
      <div>
        <h2>{title}</h2>
        <p>{subtitle}</p>
      </div>
    </div>
  );
}
export function ImpactScreen() {
  const [period, setPeriod] = useState<ImpactPeriod>("Monthly");
  const [dialog, setDialog] = useState<"leaderboard" | "badges" | "privacy" | null>(null);
  const [selectedBadge, setSelectedBadge] = useState<(typeof badges)[number] | null>(null);
  const [search, setSearch] = useState("");
  const contributors = [...impactArena.contributors].sort(
    (a, b) => impactHours(b, period) - impactHours(a, period),
  );
  const caption =
    period === "Weekly" ? "This week's" : period === "All Time" ? "Our all-time" : "This month's";
  function Leaderboard({ filtered = false }: { filtered?: boolean }) {
    return (
      <>
        <div className="ma-impact-table-heading">
          <span>Rank</span>
          <span>Volunteer</span>
          <span>Hours</span>
        </div>
        <ol className="ma-impact-ranking">
          {contributors
            .filter(
              (person) =>
                !filtered ||
                `Volunteer #${person.id} ${person.city} ${person.role}`
                  .toLowerCase()
                  .includes(search.toLowerCase()),
            )
            .map((person) => (
              <li key={person.id} data-rank={contributors.indexOf(person) + 1}>
                <span className="ma-impact-rank">
                  {contributors.indexOf(person) < 3 && <Crown aria-hidden="true" />}
                  <b>{String(contributors.indexOf(person) + 1).padStart(2, "0")}</b>
                </span>
                <img src={avatar} alt="" />
                <div className="ma-impact-person">
                  <h3>Volunteer #{person.id}</h3>
                  <p>
                    {person.role}
                    <span>{person.city}</span>
                  </p>
                </div>
                <strong className="ma-impact-hours">
                  {impactHours(person, period)}
                  <small>hrs</small>
                </strong>
                <div className="ma-impact-contribution">
                  <ContributionIcon category={person.category} />
                  <span>{person.contribution}</span>
                </div>
              </li>
            ))}
        </ol>
      </>
    );
  }
  return (
    <Page active="Impact" className="ma-impact">
      <header className="ma-impact-header">
        <Action asChild className="ma-icon">
          <Link to="/dashboard" aria-label="Go back">
            <ArrowLeft />
          </Link>
        </Action>
        <span className="ma-impact-heading-icon">
          <ChartNoAxesColumnIncreasing />
        </span>
        <div>
          <h1>Impact leaderboard</h1>
          <p>Celebrating the difference we make</p>
        </div>
        <Action className="ma-impact-privacy" onClick={() => setDialog("privacy")}>
          <ShieldCheck />
          Privacy First
        </Action>
      </header>
      <img
        className="ma-impact-hero"
        src={hero}
        alt="Your Impact Creates Change! Guiding students, creating opportunities and building a brighter future."
      />
      <SectionTitle
        title="Overall Impact"
        subtitle="The collective difference we've made together."
      />
      <div className="ma-impact-totals">
        {[
          {
            Icon: Users,
            value: impactArena.totals.volunteers,
            label: (
              <>
                Active
                <br />
                Volunteers
              </>
            ),
          },
          {
            Icon: Clock3,
            value: impactArena.totals.hours,
            label: (
              <>
                Hours
                <br />
                Contributed
              </>
            ),
          },
          {
            Icon: CalendarDays,
            value: impactArena.totals.events,
            label: (
              <>
                Events
                <br />
                Completed
              </>
            ),
          },
          {
            Icon: Clock3,
            value: impactArena.totals.hours / impactArena.totals.events,
            label: (
              <>
                Avg. Hours
                <br />
                per Event
              </>
            ),
          },
        ].map(({ Icon, value, label }, i) => (
          <div key={i}>
            <Icon className={i === 3 ? "ma-impact-green" : "ma-impact-gold"} />
            <strong>{value.toLocaleString("en-IN")}</strong>
            <span>{label}</span>
          </div>
        ))}
      </div>
      <div className="ma-impact-period" role="group" aria-label="Leaderboard period">
        {(["Weekly", "Monthly", "All Time"] as const).map((value) => (
          <Action key={value} aria-pressed={period === value} onClick={() => setPeriod(value)}>
            {value}
          </Action>
        ))}
      </div>
      <SectionTitle
        title="Top 3 Contributors"
        subtitle={`${caption} most impactful volunteers.`}
        crown
      />
      <div className="ma-impact-podium">
        {[1, 0, 2].map((index) => {
          const person = contributors[index];
          if (!person) return null;
          return (
            <article className={`ma-impact-winner ma-impact-winner--${index + 1}`} key={person.id}>
              <div className="ma-impact-medal">
                <img className="ma-impact-trophy" src={podiumTrophies[index]} alt="" />
                <b>{index + 1}</b>
              </div>
              <h3>
                Volunteer <span>#{person.id}</span>
              </h3>
              <p>
                <GraduationCap />
                {person.role}
              </p>
              <strong className="ma-impact-hours">{impactHours(person, period)} hrs</strong>
              <div className="ma-impact-podium-story">
                <ContributionIcon category={person.category} />
                <span>{person.contribution}</span>
              </div>
            </article>
          );
        })}
      </div>
      <SectionTitle
        title="Top 10 Impact Contributors"
        subtitle={`The top volunteers making the biggest difference ${period === "Monthly" ? "this month" : period === "Weekly" ? "this week" : "over time"}.`}
      />
      <section className="ma-impact-list" aria-label="Top 10 impact contributors">
        <Leaderboard />
        <Action className="ma-impact-view" onClick={() => setDialog("leaderboard")}>
          View Detailed Leaderboard <ArrowRight />
        </Action>
      </section>
      <aside className="ma-impact-position" aria-label="Your current leaderboard position">
        <Trophy />
        <p>
          <strong>{impactArena.position}th</strong>
          <span>Your Current Position</span>
        </p>
        <div>
          <Clock3 />
          <span>
            <b>{impactArena.hours} hrs</b>
            <small>Total Contribution</small>
          </span>
        </div>
      </aside>
      <div className="ma-impact-achievement-heading">
        <SectionTitle
          title="Your Achievements"
          subtitle="Badges that celebrate your contribution."
        />
        <Action onClick={() => setDialog("badges")}>
          View All Badges <ArrowRight />
        </Action>
      </div>
      <div className="ma-impact-badges">
        {badges.map((badge) => (
          <Action
            key={badge.name}
            className={`ma-impact-badge ma-impact-badge--${badge.tone}`}
            onClick={() => setSelectedBadge(badge)}
          >
            <img src={badge.image} alt="" />
            <span>{badge.name}</span>
          </Action>
        ))}
      </div>
      <Modal
        open={dialog !== null}
        onClose={() => {
          setDialog(null);
          setSearch("");
        }}
        title={
          dialog === "privacy"
            ? "Privacy First"
            : dialog === "badges"
              ? "Your Achievements"
              : "Detailed Leaderboard"
        }
      >
        <div className="ma-impact-dialog">
          {dialog === "privacy" ? (
            <>
              <ShieldCheck />
              <h2>Privacy First</h2>
              <p>
                Volunteers are identified by anonymous numbers. Names, photos and personal contact
                details are not shown on the leaderboard.
              </p>
            </>
          ) : dialog === "badges" ? (
            <>
              <h2>Your Achievements</h2>
              <div className="ma-impact-badge-details">
                {badges.map((badge) => (
                  <div key={badge.name}>
                    <img src={badge.image} alt="" />
                    <div>
                      <h3>{badge.name}</h3>
                      <p>{badge.detail}</p>
                      {badge.progress && (
                        <>
                          <progress
                            value={impactArena.hours}
                            max={50}
                            aria-label="36 of 50 volunteer hours"
                          />
                          <small>{impactArena.hours} / 50 hrs</small>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <>
              <h2>Detailed Leaderboard</h2>
              <p>{period} · Hours contributed</p>
              <label className="ma-search">
                <Search />
                <input
                  aria-label="Search leaderboard"
                  placeholder="Search volunteer or city"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                />
              </label>
              <Leaderboard filtered />
              {!contributors.some((person) =>
                `Volunteer #${person.id} ${person.city} ${person.role}`
                  .toLowerCase()
                  .includes(search.toLowerCase()),
              ) && <p>No volunteers found.</p>}
            </>
          )}
        </div>
      </Modal>
      <Modal
        open={selectedBadge !== null}
        onClose={() => setSelectedBadge(null)}
        title={selectedBadge?.name ?? "Achievement"}
      >
        {selectedBadge && (
          <div className="ma-impact-badge-detail">
            <img src={selectedBadge.image} alt="" />
            <h2>{selectedBadge.name}</h2>
            <p>{selectedBadge.detail}</p>
            {selectedBadge.progress && (
              <>
                <progress
                  value={impactArena.hours}
                  max={50}
                  aria-label="36 of 50 volunteer hours"
                />
                <p>{impactArena.hours} / 50 hrs contributed</p>
              </>
            )}
          </div>
        )}
      </Modal>
    </Page>
  );
}
