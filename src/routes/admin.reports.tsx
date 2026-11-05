import { createFileRoute, Link } from "@tanstack/react-router";
import {
  Bell,
  CalendarDays,
  ChevronDown,
  Clock,
  Download,
  GraduationCap,
  Sparkles,
  TrendingUp,
  UsersRound,
  X,
} from "lucide-react";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { AdminBack, AdminFrame, Chip } from "@/components/admin/admin-ui";
import {
  contributionMax,
  contributionSeries,
  reportMetrics,
  topAlumni,
  topContributors,
} from "@/data/admin-mock";
import { seo } from "@/lib/seo";
import avatar from "@/assets/admin/admin-profile-avatar.png";
import logoBadge from "@/assets/admin/maatram-logo-badge.png";
import icoVolunteers from "@/assets/admin/reports/rep-icon-volunteers.svg";
import icoCalendar from "@/assets/admin/reports/rep-icon-calendar.svg";
import icoReport from "@/assets/admin/reports/rep-icon-report.svg";
import icoRupee from "@/assets/admin/reports/rep-icon-rupee.svg";
import icoTrophy from "@/assets/admin/reports/rep-icon-trophy.svg";
import wave from "@/assets/admin/reports/rep-yellow-wave.svg";
import glow from "@/assets/admin/reports/rep-soft-glow.svg";

export const Route = createFileRoute("/admin/reports")({
  head: () =>
    seo(
      "Admin – Reports & Analytics",
      "Track volunteering performance, alumni impact and community contributions.",
    ),
  component: ReportsDashboard,
});

const metricIcons = {
  volunteers: icoVolunteers,
  calendar: icoCalendar,
  report: icoReport,
  rupee: icoRupee,
};
const ranges = ["This Month", "Last 3 Months", "This Year"] as const;
const notes = [
  "8 new proofs uploaded for Palm Seeds Plantation",
  "Volunteer hours up 18% compared to last month",
  "3 fund requests are waiting for approval",
];

function RepHead({ icon, title, link }: { icon: ReactNode; title: string; link?: boolean }) {
  return (
    <div className="ad-rep-shead">
      <span className="ad-rep-shead__bar" aria-hidden />
      <span className="ad-rep-shead__tile" aria-hidden>
        {icon}
      </span>
      <h2>{title}</h2>
      {link && (
        <Link to="/admin/manage/$section" params={{ section: "volunteers" }} className="ad-link">
          View All
        </Link>
      )}
    </div>
  );
}

function ContributionChart() {
  const W = 560,
    H = 266,
    L = 44,
    R = 524,
    T = 40,
    B = 232;
  const step = (R - L) / (contributionSeries.length - 1);
  const pts = contributionSeries.map((d, i) => ({
    ...d,
    x: L + i * step,
    y: T + (B - T) * (1 - d.value / contributionMax),
  }));
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
  const area = `${line} L${R} ${B} L${L} ${B} Z`;
  const last = pts.length - 1;
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      role="img"
      aria-label="Volunteer contribution trend from July to November, rising from 680 to 1,250"
    >
      <defs>
        <linearGradient id="rep-area" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFC900" stopOpacity="0.32" />
          <stop offset="1" stopColor="#FFC900" stopOpacity="0" />
        </linearGradient>
      </defs>
      {[0, 250, 500, 750, 1000, 1250].map((v) => {
        const y = T + (B - T) * (1 - v / contributionMax);
        return (
          <g key={v}>
            <line x1={L} x2={R} y1={y} y2={y} stroke="#EEF0F4" strokeWidth="1" />
            <text x={L - 8} y={y + 4} textAnchor="end" fontSize="11" fill="#8A93A6">
              {v.toLocaleString("en-IN")}
            </text>
          </g>
        );
      })}
      <path d={area} fill="url(#rep-area)" />
      <path
        d={line}
        fill="none"
        stroke="#FFC900"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {pts.map((p, i) => (
        <g key={p.label}>
          <circle cx={p.x} cy={p.y} r="5.5" fill="#fff" stroke="#FFC900" strokeWidth="3" />
          <rect
            x={p.x - 27}
            y={p.y - 36}
            width="54"
            height="24"
            rx="12"
            fill={i === last ? "#FFC900" : "#fff"}
            stroke={i === last ? "none" : "#F0E6C8"}
          />
          <text
            x={p.x}
            y={p.y - 19}
            textAnchor="middle"
            fontSize="12"
            fontWeight={i === last ? 700 : 600}
            fill="#10152F"
          >
            {p.value.toLocaleString("en-IN")}
          </text>
          <text
            x={p.x}
            y={H - 10}
            textAnchor="middle"
            fontSize="12"
            fill={i === last ? "#10152F" : "#8A93A6"}
            fontWeight={i === last ? 700 : 500}
          >
            {p.label}
          </text>
        </g>
      ))}
    </svg>
  );
}

function ReportsDashboard() {
  const [range, setRange] = useState<(typeof ranges)[number]>("This Month");
  const [rangeOpen, setRangeOpen] = useState(false);
  const [bell, setBell] = useState(false);

  // Warm the PDF chunk so the first click feels instant.
  useEffect(() => {
    void import("@/lib/report-pdf");
  }, []);

  const exportReport = async () => {
    const { buildReportPdf } = await import("@/lib/report-pdf");
    const blob = await buildReportPdf(range);
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Maatram-Report-Analytics-${range.toLowerCase().replace(/\s+/g, "-")}.pdf`;
    a.click();
    setTimeout(() => URL.revokeObjectURL(url), 30_000);
  };

  return (
    <AdminFrame nav="Reports">
      <header className="ad-dash-head">
        <AdminBack to="/admin" />
        <img
          className="ad-dash-head__logo"
          src={logoBadge}
          alt="Maatram Foundation"
          width={44}
          height={44}
        />
        <div className="ad-dash-head__text">
          <strong>Maatram Foundation</strong>
          <span>Reports & Analytics</span>
        </div>
        <button
          type="button"
          className="ad-round-btn ad-bell"
          aria-label="Notifications"
          aria-expanded={bell}
          onClick={() => setBell((b) => !b)}
        >
          <Bell />
          <i />
        </button>
        <button type="button" className="ad-avatar" aria-label="Admin profile">
          <img src={avatar} alt="" />
        </button>
        {bell && (
          <div className="ad-popover ad-popover--notes" role="dialog" aria-label="Notifications">
            <div className="ad-popover__head">
              <strong>Notifications</strong>
              <button type="button" aria-label="Close" onClick={() => setBell(false)}>
                <X size={18} />
              </button>
            </div>
            {notes.map((n) => (
              <p key={n}>
                <Bell size={16} />
                {n}
              </p>
            ))}
          </div>
        )}
      </header>

      <section className="ad-rep-hero">
        <img className="ad-rep-hero__glow" src={glow} alt="" aria-hidden />
        <img className="ad-rep-hero__wave" src={wave} alt="" aria-hidden />
        <div className="ad-rep-hero__text">
          <span className="ad-rep-hero__badge" aria-hidden>
            <img src={icoReport} alt="" />
          </span>
          <div>
            <h1>Reports &amp; Analytics</h1>
            <p>
              Track volunteering performance, alumni impact and community contributions in real
              time.
            </p>
          </div>
        </div>
        <div className="ad-rep-hero__actions">
          <div className="ad-rep-range">
            <button
              type="button"
              className="ad-rep-range__btn"
              aria-expanded={rangeOpen}
              onClick={() => setRangeOpen((o) => !o)}
            >
              <CalendarDays size={16} /> {range} <ChevronDown size={14} />
            </button>
            {rangeOpen && (
              <div className="ad-rep-range__menu" role="menu" aria-label="Report period">
                {ranges.map((r) => (
                  <button
                    key={r}
                    type="button"
                    role="menuitem"
                    className={r === range ? "active" : ""}
                    onClick={() => {
                      setRange(r);
                      setRangeOpen(false);
                    }}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>
          <button type="button" className="ad-rep-export" onClick={exportReport}>
            <Download size={16} /> Export Report
          </button>
        </div>
      </section>

      <section className="ad-rep-section">
        <RepHead icon={<TrendingUp size={18} />} title="Impact Overview" />
        <div className="ad-rep-metrics">
          {reportMetrics.map((m) => (
            <article key={m.label} className="ad-rep-metric">
              <span className="ad-rep-metric__icon" aria-hidden>
                <img src={metricIcons[m.icon as keyof typeof metricIcons]} alt="" />
              </span>
              <strong>{m.value}</strong>
              <span className="ad-rep-metric__label">{m.label}</span>
              <Chip tone="green">
                <TrendingUp size={12} /> {m.delta}
              </Chip>
            </article>
          ))}
        </div>
      </section>

      <section className="ad-rep-section">
        <RepHead icon={<TrendingUp size={18} />} title="Volunteers Contribution" />
        <div className="ad-card ad-rep-chart">
          <ContributionChart />
        </div>
      </section>

      <section className="ad-rep-section">
        <RepHead icon={<img src={icoTrophy} alt="" />} title="Top Contributed Volunteers" link />
        <div className="ad-card ad-rep-vols">
          {topContributors.map((v) => (
            <div key={v.rank} className="ad-rep-vrow">
              <span
                className={`ad-rep-medal ad-rep-medal--${v.rank}`}
                aria-label={`Rank ${v.rank}`}
              >
                {v.rank}
              </span>
              <img className="ad-rep-ava" src={v.avatar} alt={v.name} />
              <div className="ad-rep-vrow__who">
                <strong>{v.name}</strong>
                <span>
                  <GraduationCap size={13} /> {v.meta}
                </span>
              </div>
              <div className="ad-rep-vrow__hours">
                <span className="ic" aria-hidden>
                  <Clock size={16} />
                </span>
                <div>
                  <strong>{v.hours} hrs</strong>
                  <span>Contributed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="ad-rep-section">
        <RepHead icon={<GraduationCap size={18} />} title="Top Performing Alumni" />
        <div className="ad-card ad-rep-alumni">
          {topAlumni.map((a) => (
            <div key={a.rank} className="ad-rep-arow">
              <span className={`ad-rep-rank ad-rep-rank--${a.rank}`} aria-label={`Rank ${a.rank}`}>
                {a.rank}
              </span>
              <img className="ad-rep-ava" src={a.avatar} alt={a.name} />
              <div className="ad-rep-arow__body">
                <strong>{a.name}</strong>
                <span>
                  <GraduationCap size={13} /> {a.meta}
                </span>
                <div className="ad-rep-arow__stats">
                  <span>
                    <UsersRound size={13} /> <strong>{a.eventsLed}</strong> Events Led
                  </span>
                  <span>
                    <Clock size={13} /> <strong>{a.hours} hrs</strong> Total Contribution
                  </span>
                </div>
              </div>
              <span className="ad-rep-alumni-badge">
                <img src={icoTrophy} alt="" aria-hidden /> {a.badge}
              </span>
            </div>
          ))}
        </div>
      </section>

      <section className="ad-rep-insight">
        <img className="ad-rep-insight__glow" src={glow} alt="" aria-hidden />
        <div className="ad-rep-insight__head">
          <span className="ad-rep-insight__spark" aria-hidden>
            <Sparkles size={18} />
          </span>
          <h2>This Month’s Insight</h2>
        </div>
        <p>
          Volunteer participation <strong>increased by 18%</strong> compared to last month. A total
          of <strong>42 events</strong> were completed, engaging <strong>4,500 volunteers</strong>.{" "}
          <strong>₹5,600</strong> was funded to support volunteer contributions.
        </p>
        <svg className="ad-rep-insight__art" viewBox="0 0 96 74" aria-hidden>
          <path
            d="M6 60 C22 58 44 48 62 30"
            fill="none"
            stroke="#F5B900"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <path
            d="M62 30 l-2 -10 M62 30 l-10 1"
            fill="none"
            stroke="#F5B900"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <rect x="6" y="48" width="14" height="24" rx="4" fill="#FFC900" />
          <rect x="26" y="38" width="14" height="34" rx="4" fill="#FFC900" />
          <rect x="46" y="26" width="14" height="46" rx="4" fill="#FFC900" />
          <rect x="66" y="12" width="14" height="60" rx="4" fill="#F5B900" />
        </svg>
      </section>
    </AdminFrame>
  );
}
