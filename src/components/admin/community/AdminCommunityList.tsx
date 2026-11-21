import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CalendarDays,
  CheckCircle2,
  Radio,
  Search,
  Sparkles,
  Users,
  UsersRound,
} from "lucide-react";
import { useAdminCommunity } from "./AdminCommunityState";
import {
  Action,
  Header,
  Heading,
  Page,
  photos,
} from "@/components/additional-shared";
import { Category } from "@/components/opportunity-screens";

export function AdminCommunityList() {
  const { communities } = useAdminCommunity();
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

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
    <Page active="Communities">
      {/* Top Header with Back to Admin Home */}
      <Header back="/admin" />

      {/* Page Heading matching Student Dashboard design */}
      <Heading
        title="Manage Communities"
        subtitle="Event taskforces, volunteer attendance and operations hub"
      />

      {/* Admin Stats Strip in Student Card Style */}
      <section className="ma-student">
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
    </Page>
  );
}
