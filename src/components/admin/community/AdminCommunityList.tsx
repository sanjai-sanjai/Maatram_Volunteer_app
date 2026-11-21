import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Bell,
  CalendarDays,
  CheckCircle2,
  Radio,
  Search,
  Sparkles,
  Users,
  UsersRound,
  X,
} from "lucide-react";
import { useAdminCommunity } from "./AdminCommunityState";
import { AdminBack, AdminFrame } from "@/components/admin/admin-ui";
import { Category } from "@/components/opportunity-screens";
import avatar from "@/assets/admin/admin-profile-avatar.png";
import logoBadge from "@/assets/admin/maatram-logo-badge.png";

export function AdminCommunityList() {
  const { communities } = useAdminCommunity();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [bell, setBell] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const communityNotes = [
    "Sangamam Volunteering Event attendance is live (42/50 marked)",
    "28 geotagged proof photos submitted for verification",
    "5 volunteer fund requests pending review",
    "School Visits Taskforce drive scheduled for Nov 08",
  ];

  const categories = [
    "All",
    "School Visits",
    "Admissions Support",
    "BGV",
    "Mock Interviews",
    "Admission Panel Interviews",
  ];

  const filteredCommunities = communities.filter((c) => {
    const matchesCategory =
      selectedCategory === "All" || c.category === selectedCategory;
    const matchesSearch =
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.description.toLowerCase().includes(search.toLowerCase()) ||
      c.eventName.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <AdminFrame nav="Communities">
      {/* Admin Communities Top Header */}
      <header className="ad-dash-head" style={{ marginBottom: 4 }}>
        <AdminBack to="/admin" />
        <img
          className="ad-dash-head__logo"
          src={logoBadge}
          alt="Maatram Foundation"
          width={44}
          height={44}
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/brand/maatram-foundation-logo.png";
          }}
        />
        <div className="ad-dash-head__text">
          <strong>Maatram Foundation</strong>
          <span>Manage Communities</span>
        </div>
        <button
          type="button"
          className="ad-round-btn ad-bell"
          aria-label="Notifications"
          aria-expanded={bell}
          onClick={() => {
            setBell((b) => !b);
            setProfileOpen(false);
          }}
        >
          <Bell size={20} />
          <i />
        </button>
        <button
          type="button"
          className="ad-avatar"
          aria-label="Admin profile menu"
          aria-expanded={profileOpen}
          onClick={() => {
            setProfileOpen((p) => !p);
            setBell(false);
          }}
        >
          <img
            src={avatar}
            alt="Operations Lead"
            onError={(e) => {
              (e.target as HTMLImageElement).src =
                "/assets/brand/maatram-foundation-logo.png";
            }}
          />
        </button>

        {/* Notifications Popover */}
        {bell && (
          <div
            className="ad-popover ad-popover--notes"
            role="dialog"
            aria-label="Community Operations Notifications"
            style={{ zIndex: 100 }}
          >
            <div className="ad-popover__head">
              <strong>Operations Alerts</strong>
              <button
                type="button"
                aria-label="Close notifications"
                onClick={() => setBell(false)}
                style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
              >
                <X size={18} />
              </button>
            </div>
            {communityNotes.map((n, idx) => (
              <p key={idx}>
                <Bell size={16} />
                {n}
              </p>
            ))}
          </div>
        )}

        {/* Profile Quick Popover */}
        {profileOpen && (
          <div
            className="ad-popover ad-popover--menu"
            role="dialog"
            aria-label="Admin Profile Summary"
            style={{
              top: 56,
              right: 0,
              width: 220,
              padding: "12px 14px",
              zIndex: 100,
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                marginBottom: 8,
              }}
            >
              <img
                src={avatar}
                alt="Operations Lead"
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: "50%",
                  objectFit: "cover",
                }}
              />
              <div>
                <strong
                  style={{
                    fontSize: 13,
                    display: "block",
                    color: "#111827",
                    lineHeight: 1.2,
                  }}
                >
                  Sujith Kumar
                </strong>
                <span style={{ fontSize: 11, color: "#D97706", fontWeight: 700 }}>
                  Operations Lead 👑
                </span>
              </div>
            </div>
            <div
              style={{
                borderTop: "1px solid #E5E7EB",
                paddingTop: 8,
                fontSize: 11,
                color: "#4B5563",
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              <span style={{ fontWeight: 600 }}>Maatram Foundation</span>
              <span style={{ color: "#9CA3AF" }}>admin@maatramedu.org</span>
            </div>
          </div>
        )}
      </header>

      {/* Admin Stats Strip in Student Card Style */}
      <section className="ma-student" style={{ margin: "8px 0 14px" }}>
        <img
          src="/assets/admin/admin-profile-avatar.png"
          alt="Operations Lead"
          onError={(e) => {
            (e.target as HTMLImageElement).src =
              "/assets/brand/maatram-foundation-logo.png";
          }}
        />
        <div>
          <h2>Operations Desk 👑</h2>
          <p>Maatram Foundation · Community Operations</p>
          <div className="ma-student-stats">
            <div>
              <Users />
              <b>{communities.length}</b>
              <span>
                Active
                <br />
                Communities
              </span>
            </div>
            <div>
              <CalendarDays />
              <b>3</b>
              <span>
                Managed
                <br />
                Events
              </span>
            </div>
            <div>
              <CheckCircle2 />
              <b>520+</b>
              <span>
                Registered
                <br />
                Scholars
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Search Input in Student Dashboard Style */}
      <label className="ma-search">
        <Search />
        <input
          placeholder="Search communities, drives or keywords…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </label>

      {/* Category Filter Pills */}
      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          paddingBottom: 6,
          margin: "4px 0 12px",
          scrollbarWidth: "none",
        }}
      >
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setSelectedCategory(cat)}
            style={{
              padding: "5px 12px",
              borderRadius: 9999,
              fontSize: 12,
              fontWeight: 700,
              border: "none",
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s ease",
              background: selectedCategory === cat ? "#111827" : "#F3F4F6",
              color: selectedCategory === cat ? "#FFFFFF" : "#4B5563",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Community List in Exact .ma-community-card Student Style */}
      <div className="ma-community-list" style={{ paddingBottom: "80px" }}>
        {filteredCommunities.map((c) => (
          <Link
            className="ma-community-card"
            to="/admin/community/$communityId"
            params={{ communityId: c.id }}
            key={c.id}
          >
            <img
              src={c.logo || "/assets/brand/maatram-foundation-logo.png"}
              alt={c.name}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/brand/maatram-foundation-logo.png";
              }}
            />
            <div>
              <h2>{c.name}</h2>
              <Category text={c.category} />
              <p>
                <Users />
                {c.members} Members{" "}
                <span className={c.eventStatus === "Live" ? "ma-active" : "ma-muted"}>
                  ● {c.eventStatus === "Live" ? "Active Drive" : "Upcoming Event"}
                </span>
              </p>
            </div>
            <span className="ma-community-arrow">
              <ArrowRight />
            </span>
          </Link>
        ))}
      </div>
    </AdminFrame>
  );
}
