import React, { useState } from "react";
import { useAdminCommunity } from "./AdminCommunityState";
import {
  ArrowLeft,
  Award,
  CheckCircle2,
  AlertCircle,
  Send,
  X,
  Users,
  HelpCircle,
} from "lucide-react";

export const AdminThankNote: React.FC = () => {
  const {
    selectedCommunity,
    attendanceList,
    eligibleVolunteers,
    ineligibleVolunteers,
    sendThankNotes,
    thankNotesSentCount,
    setActiveMgmtView,
  } = useAdminCommunity();

  const [activeTab, setActiveTab] = useState<"eligible" | "ineligible">("eligible");
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [isSuccessCelebration, setIsSuccessCelebration] = useState(false);

  const totalRegistered = attendanceList.length;
  const eligibleCount = eligibleVolunteers.length;
  const ineligibleCount = ineligibleVolunteers.length;
  const completionRate =
    totalRegistered > 0 ? Math.round((eligibleCount / totalRegistered) * 100) : 0;

  const handleConfirmSend = () => {
    setIsSending(true);
    setTimeout(() => {
      sendThankNotes();
      setIsSending(false);
      setShowPreviewModal(false);
      setIsSuccessCelebration(true);
    }, 1200);
  };

  return (
    <div style={{ padding: "16px", paddingBottom: "90px" }}>
      {/* Sub-view Header */}
      <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
        <button
          onClick={() => setActiveMgmtView("overview")}
          className="adc-header-back-btn"
          aria-label="Back to Event Management"
        >
          <ArrowLeft size={18} />
        </button>
        <div>
          <h2 style={{ fontSize: 18, fontWeight: 800, margin: 0, color: "#111827" }}>
            Thank Note & Certification
          </h2>
          <p style={{ fontSize: 12, color: "#6B7280", margin: "2px 0 0" }}>
            {selectedCommunity.eventName} • Volunteer Recognition
          </p>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="adc-summary-grid">
        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Eligible Scholars <Award size={14} color="#15803D" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#15803D" }}>
            {eligibleCount}
          </span>
          <span className="adc-summary-card-sub">Both attendance & proof verified</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Incomplete <AlertCircle size={14} color="#DC2626" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#DC2626" }}>
            {ineligibleCount}
          </span>
          <span className="adc-summary-card-sub">Missing attendance or proof</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Total Scholars <Users size={14} color="#6B7280" />
          </span>
          <span className="adc-summary-card-value">{totalRegistered}</span>
          <span className="adc-summary-card-sub">Total registered volunteers</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Completion Rate <CheckCircle2 size={14} color="#D97706" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#D97706" }}>
            {completionRate}%
          </span>
          <span className="adc-summary-card-sub">Met certification criteria</span>
        </div>
      </div>

      {/* Eligibility Criteria Notice */}
      <div
        style={{
          background: "#FEF9C3",
          border: "1px solid #FDE047",
          borderRadius: 14,
          padding: "12px 14px",
          marginBottom: 16,
          display: "flex",
          alignItems: "flex-start",
          gap: 10,
        }}
      >
        <HelpCircle size={18} color="#B45309" style={{ flexShrink: 0, marginTop: 2 }} />
        <div style={{ fontSize: 12, color: "#854D0E", lineHeight: 1.45 }}>
          <strong>Strict Thank Note Criteria:</strong>
          <span style={{ display: "block", marginTop: 2 }}>
            Scholars are eligible for the official Maatram Certificate ONLY IF their attendance was marked
            on-site AND their GPS geotag proof photo was verified & approved by an admin.
          </span>
        </div>
      </div>

      {/* Sub Tabs: Eligible vs Incomplete */}
      <div className="adc-subtabs-row">
        <button
          className={`adc-subtab-btn ${activeTab === "eligible" ? "is-active" : ""}`}
          onClick={() => setActiveTab("eligible")}
        >
          <CheckCircle2 size={14} />
          Completed Event
          <span className="adc-subtab-badge">{eligibleCount}</span>
        </button>

        <button
          className={`adc-subtab-btn ${activeTab === "ineligible" ? "is-active" : ""}`}
          onClick={() => setActiveTab("ineligible")}
        >
          <AlertCircle size={14} />
          Incomplete Requirements
          <span className="adc-subtab-badge">{ineligibleCount}</span>
        </button>
      </div>

      {/* List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {activeTab === "eligible" ? (
          eligibleVolunteers.length === 0 ? (
            <div
              style={{
                padding: "40px 20px",
                textAlign: "center",
                background: "#F9FAFB",
                borderRadius: 16,
                border: "1px dashed #D1D5DB",
              }}
            >
              <Award size={32} color="#9CA3AF" style={{ margin: "0 auto 8px" }} />
              <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: 0 }}>
                No eligible scholars yet
              </p>
              <p style={{ fontSize: 12, color: "#6B7280", margin: "4px 0 0" }}>
                Approve pending photo proofs in Proof Verification to qualify scholars.
              </p>
            </div>
          ) : (
            eligibleVolunteers.map(({ volunteer, proof }) => (
              <div key={volunteer.id} className="adc-record-card">
                <img
                  src={volunteer.avatar}
                  alt={volunteer.studentName}
                  className="adc-record-avatar"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
                  }}
                />
                <div className="adc-record-details">
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h4 className="adc-record-name">{volunteer.studentName}</h4>
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: 9999,
                        background: "#DCFCE7",
                        color: "#15803D",
                      }}
                    >
                      Eligible ✓
                    </span>
                  </div>
                  <p className="adc-record-meta">
                    <span style={{ fontWeight: 600 }}>{volunteer.maatramId}</span> • {volunteer.college}
                  </p>
                  <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 4 }}>
                    <span style={{ fontSize: 11, color: "#15803D", fontWeight: 600 }}>
                      ✓ Attendance: {volunteer.hoursContributed} hrs
                    </span>
                    <span style={{ fontSize: 11, color: "#B45309", fontWeight: 600 }}>
                      ✓ Proof Approved
                    </span>
                  </div>
                </div>
              </div>
            ))
          )
        ) : ineligibleVolunteers.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              background: "#F9FAFB",
              borderRadius: 16,
              border: "1px dashed #D1D5DB",
            }}
          >
            <CheckCircle2 size={32} color="#15803D" style={{ margin: "0 auto 8px" }} />
            <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: 0 }}>
              All volunteers have met requirements!
            </p>
          </div>
        ) : (
          ineligibleVolunteers.map(({ volunteer, reason }) => (
            <div key={volunteer.id} className="adc-record-card">
              <img
                src={volunteer.avatar}
                alt={volunteer.studentName}
                className="adc-record-avatar"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
                }}
              />
              <div className="adc-record-details">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h4 className="adc-record-name">{volunteer.studentName}</h4>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: 9999,
                      background: "#FEE2E2",
                      color: "#DC2626",
                    }}
                  >
                    Incomplete
                  </span>
                </div>
                <p className="adc-record-meta">
                  <span style={{ fontWeight: 600 }}>{volunteer.maatramId}</span> • {volunteer.college}
                </p>
                <div style={{ marginTop: 4 }}>
                  <span
                    style={{
                      fontSize: 11,
                      fontWeight: 700,
                      color: "#DC2626",
                      background: "#FEF2F2",
                      padding: "2px 6px",
                      borderRadius: 6,
                    }}
                  >
                    Missing: {reason}
                  </span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="adc-fixed-action-bar">
        <button
          className="adc-btn-primary"
          onClick={() => setShowPreviewModal(true)}
          disabled={eligibleCount === 0}
          style={{ opacity: eligibleCount === 0 ? 0.6 : 1 }}
        >
          <Send size={18} />
          Send Thank Note to Eligible Students ({eligibleCount})
        </button>
      </div>

      {/* Thank Note Preview Modal */}
      {showPreviewModal && (
        <div className="adc-modal-overlay" onClick={() => setShowPreviewModal(false)}>
          <div
            className="adc-modal-card"
            style={{ maxWidth: 460 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="adc-modal-header">
              <div>
                <h3 className="adc-modal-title">Certificate & Thank Note Preview</h3>
                <p style={{ fontSize: 12, color: "#6B7280", margin: "2px 0 0" }}>
                  Ready to send to {eligibleCount} eligible volunteers
                </p>
              </div>
              <button
                className="adc-modal-close-btn"
                onClick={() => setShowPreviewModal(false)}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Certificate Graphic Preview */}
            <div
              style={{
                borderRadius: 16,
                overflow: "hidden",
                border: "2px solid #FDE68A",
                boxShadow: "0 6px 16px rgba(254, 200, 2, 0.2)",
                marginBottom: 16,
                position: "relative",
              }}
            >
              <img
                src="/assets/impact/maatram-thank-you-certificate.png"
                alt="Maatram Certificate Preview"
                style={{ width: "100%", height: "auto", display: "block" }}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=600&auto=format&fit=crop&q=80";
                }}
              />
            </div>

            {/* Note text draft */}
            <div
              style={{
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                borderRadius: 14,
                padding: "14px",
                marginBottom: 16,
                fontSize: 12.5,
                color: "#374151",
                lineHeight: 1.5,
              }}
            >
              <div style={{ fontWeight: 700, color: "#111827", marginBottom: 4 }}>
                Personalized Note Preview:
              </div>
              <p style={{ margin: "0 0 6px" }}>
                "Dear Scholar, On behalf of the entire Maatram Foundation team, we express our heartfelt
                gratitude for your dedicated volunteering at <strong>{selectedCommunity.eventName}</strong>.
                Your service and enthusiasm inspire our entire community!"
              </p>
              <div style={{ fontSize: 11, color: "#6B7280" }}>
                • Individual personalized name & certificate ID automatically injected.
                <br />• Official digital certificate will appear directly in their student profile.
              </div>
            </div>

            {/* Bottom Actions */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="adc-btn-ghost"
                style={{ flex: 1 }}
                onClick={() => setShowPreviewModal(false)}
              >
                Cancel
              </button>
              <button
                className="adc-btn-primary"
                style={{ flex: 1.5 }}
                onClick={handleConfirmSend}
                disabled={isSending}
              >
                {isSending ? (
                  "Sending Certificates..."
                ) : (
                  <>
                    <Send size={16} /> Confirm & Dispatch ({eligibleCount})
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Confetti Celebration Screen */}
      {isSuccessCelebration && (
        <div
          className="adc-modal-overlay"
          style={{ background: "rgba(10, 12, 16, 0.85)", zIndex: 70 }}
        >
          {/* Confetti particles */}
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="adc-confetti-particle"
              style={{
                left: `${(i * 4) + Math.random() * 3}%`,
                top: `${Math.random() * 20}%`,
                background: ["#FEC802", "#10B981", "#3B82F6", "#F59E0B", "#EF4444"][i % 5],
                animationDelay: `${(i % 5) * 0.3}s`,
                width: 6 + (i % 6),
                height: 6 + (i % 6),
              }}
            />
          ))}

          <div
            className="adc-modal-card"
            style={{
              maxWidth: 420,
              textAlign: "center",
              padding: "32px 24px",
              boxShadow: "0 25px 60px rgba(254, 200, 2, 0.3)",
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: "50%",
                background: "#FEF9C3",
                border: "3px solid #FEC802",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
              }}
            >
              <Award size={36} color="#B45309" />
            </div>

            <h3 style={{ fontSize: 20, fontWeight: 800, color: "#111827", margin: "0 0 8px" }}>
              🎉 Thank You Notes Dispatched!
            </h3>

            <p style={{ fontSize: 13.5, color: "#4B5563", lineHeight: 1.5, margin: "0 0 20px" }}>
              Successfully delivered official Maatram Appreciation Certificates & personalized notes to{" "}
              <strong style={{ color: "#111827", fontSize: 15 }}>{eligibleCount}</strong> eligible scholars!
            </p>

            <div
              style={{
                background: "#F9FAFB",
                borderRadius: 14,
                padding: "12px",
                marginBottom: 20,
                fontSize: 12,
                color: "#15803D",
                fontWeight: 600,
              }}
            >
              ✓ In-app congratulatory alerts sent
              <br />✓ Certificates stored in scholars' Impact Portfolios
            </div>

            <button
              className="adc-btn-primary"
              style={{ width: "100%" }}
              onClick={() => setIsSuccessCelebration(false)}
            >
              Done & Return
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
