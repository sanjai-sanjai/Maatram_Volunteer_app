import React from "react";
import { useAdminCommunity } from "./AdminCommunityState";
import { AdminAttendanceReview } from "./AdminAttendanceReview";
import { AdminProofVerification } from "./AdminProofVerification";
import { AdminRequestedFunds } from "./AdminRequestedFunds";
import { AdminFeedbackReview } from "./AdminFeedbackReview";
import { AdminThankNote } from "./AdminThankNote";
import {
  Calendar,
  MapPin,
  CalendarCheck,
  FileCheck2,
  Wallet,
  MessageSquare,
  Award,
  ChevronRight,
  Users,
  CheckCircle2,
  XCircle,
} from "lucide-react";

export const AdminEventManagement: React.FC = () => {
  const {
    selectedCommunity,
    activeMgmtView,
    setActiveMgmtView,
    attendanceList,
    proofsList,
    fundsList,
    feedbackList,
    eligibleVolunteers,
  } = useAdminCommunity();

  // If a sub-view is selected, render it
  if (activeMgmtView === "attendance") {
    return <AdminAttendanceReview />;
  }
  if (activeMgmtView === "proofs") {
    return <AdminProofVerification />;
  }
  if (activeMgmtView === "funds") {
    return <AdminRequestedFunds />;
  }
  if (activeMgmtView === "feedback") {
    return <AdminFeedbackReview />;
  }
  if (activeMgmtView === "thank-note") {
    return <AdminThankNote />;
  }

  // Active statistics calculated from mock state
  const totalVolunteers = attendanceList.length > 0 ? attendanceList.length : 50;
  const markedCount = attendanceList.filter((a) => a.status === "Marked").length || 42;
  const notMarkedCount = attendanceList.filter((a) => a.status === "Not Marked").length || 8;
  const pendingProofsCount = proofsList.filter((p) => p.status === "pending").length || 28;
  const pendingFundsCount = fundsList.filter((f) => f.status === "pending").length || 5;
  const newFeedbackCount = feedbackList.length || 12;
  const eligibleCount = eligibleVolunteers.length || 36;

  return (
    <div style={{ padding: "12px 14px 100px", display: "flex", flexDirection: "column", gap: 12 }}>
      {/* Top Event Hero Banner (Matches Reference Image Exactly) */}
      <div className="adc-event-hero-card">
        {/* Top Header Row: Live Event Badge + Chevron */}
        <div className="adc-event-hero-header">
          <div className="adc-live-event-badge">
            <span className="adc-live-dot" />
            <span>Live Event</span>
          </div>
          <ChevronRight size={18} strokeWidth={2.4} color="#111827" />
        </div>

        {/* Mid Section: Volunteers Silhouette + Event Title & Meta */}
        <div style={{ display: "flex", alignItems: "center", gap: 12, position: "relative", zIndex: 2 }}>
          {/* Volunteer Silhouette Graphic */}
          <div style={{ flexShrink: 0, width: 92, height: 60, display: "flex", alignItems: "flex-end" }}>
            <img
              src="/assets/impact/event-volunteer-silhouette-clean.png"
              alt="Volunteers"
              style={{ width: "100%", height: "auto", objectFit: "contain" }}
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/assets/impact/event-volunteer-silhouette.png";
              }}
            />
          </div>

          {/* Event Details */}
          <div style={{ flex: 1, minWidth: 0 }}>
            <h2 className="adc-hero-event-title">
              {selectedCommunity.name.includes("Sangamam")
                ? "Sangamam Volunteering Event"
                : `${selectedCommunity.eventName}`}
            </h2>
            <div className="adc-hero-event-meta">
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <Calendar size={13} strokeWidth={2.2} color="#111827" />
                <span>{selectedCommunity.eventDate || "Nov 02, 2026"}</span>
              </span>
              <span style={{ color: "#9CA3AF" }}>|</span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4 }}>
                <MapPin size={13} strokeWidth={2.2} color="#111827" />
                <span>Chennai, Tamil Nadu</span>
              </span>
            </div>
          </div>
        </div>

        {/* 3 Stats Columns Grid */}
        <div className="adc-hero-stats-grid">
          {/* 1: Total Volunteers */}
          <div className="adc-hero-stat-col">
            <div className="adc-hero-stat-header">
              <Users size={16} strokeWidth={2.4} color="#111827" />
              <span className="adc-hero-stat-val">{totalVolunteers}</span>
            </div>
            <span className="adc-hero-stat-lbl">Total Volunteers</span>
          </div>

          {/* 2: Attendance Marked */}
          <div className="adc-hero-stat-col">
            <div className="adc-hero-stat-header">
              <CheckCircle2 size={16} strokeWidth={2.4} color="#16A34A" />
              <span className="adc-hero-stat-val">{markedCount}</span>
            </div>
            <span className="adc-hero-stat-lbl">Attendance Marked</span>
          </div>

          {/* 3: Not Marked */}
          <div className="adc-hero-stat-col">
            <div className="adc-hero-stat-header">
              <XCircle size={16} strokeWidth={2.4} color="#DC2626" />
              <span className="adc-hero-stat-val">{notMarkedCount}</span>
            </div>
            <span className="adc-hero-stat-lbl">Not Marked</span>
          </div>
        </div>
      </div>

      {/* 5 Distinct Navigation Cards (Exact Matching attached Reference UI) */}
      <div className="adc-mgmt-cards-list">
        {/* Card 1: Attendance Review */}
        <button
          className="adc-mgmt-card"
          onClick={() => setActiveMgmtView("attendance")}
          type="button"
        >
          <div className="adc-mgmt-card-icon">
            <CalendarCheck size={24} strokeWidth={2.2} />
          </div>
          <div className="adc-mgmt-card-info">
            <h3>Attendance Review</h3>
            <p>View and manage attendance records</p>
          </div>
          <span className="adc-mgmt-card-badge">
            {markedCount} / {totalVolunteers}
          </span>
          <ChevronRight size={18} strokeWidth={2.4} color="#111827" />
        </button>

        {/* Card 2: Proof Verification */}
        <button
          className="adc-mgmt-card"
          onClick={() => setActiveMgmtView("proofs")}
          type="button"
        >
          <div className="adc-mgmt-card-icon">
            <FileCheck2 size={24} strokeWidth={2.2} />
          </div>
          <div className="adc-mgmt-card-info">
            <h3>Proof Verification</h3>
            <p>Verify submitted proofs and photos</p>
          </div>
          <span className="adc-mgmt-card-badge">
            {pendingProofsCount} Pending
          </span>
          <ChevronRight size={18} strokeWidth={2.4} color="#111827" />
        </button>

        {/* Card 3: Requested Funds */}
        <button
          className="adc-mgmt-card"
          onClick={() => setActiveMgmtView("funds")}
          type="button"
        >
          <div className="adc-mgmt-card-icon">
            <Wallet size={24} strokeWidth={2.2} />
          </div>
          <div className="adc-mgmt-card-info">
            <h3>Requested Funds</h3>
            <p>Review funding requests from volunteers</p>
          </div>
          <span className="adc-mgmt-card-badge">
            {pendingFundsCount} Pending
          </span>
          <ChevronRight size={18} strokeWidth={2.4} color="#111827" />
        </button>

        {/* Card 4: Feedback Review */}
        <button
          className="adc-mgmt-card"
          onClick={() => setActiveMgmtView("feedback")}
          type="button"
        >
          <div className="adc-mgmt-card-icon">
            <MessageSquare size={24} strokeWidth={2.2} />
          </div>
          <div className="adc-mgmt-card-info">
            <h3>Feedback Review</h3>
            <p>Read and respond to feedback</p>
          </div>
          <span className="adc-mgmt-card-badge">
            {newFeedbackCount} New
          </span>
          <ChevronRight size={18} strokeWidth={2.4} color="#111827" />
        </button>

        {/* Card 5: Thank Note */}
        <button
          className="adc-mgmt-card"
          onClick={() => setActiveMgmtView("thank-note")}
          type="button"
        >
          <div className="adc-mgmt-card-icon">
            <Award size={24} strokeWidth={2.2} />
          </div>
          <div className="adc-mgmt-card-info">
            <h3>Thank Note</h3>
            <p>Send appreciation to eligible volunteers</p>
          </div>
          <span className="adc-mgmt-card-badge">
            {eligibleCount} Eligible
          </span>
          <ChevronRight size={18} strokeWidth={2.4} color="#111827" />
        </button>
      </div>

      {/* Note: The bottom banner "Together, let's make this event a greater success!" is intentionally removed per user request */}
    </div>
  );
};
