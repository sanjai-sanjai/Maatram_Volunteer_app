import React, { useState, useMemo } from "react";
import { useAdminCommunity } from "./AdminCommunityState";
import { ProofSubmission } from "@/data/admin-community-mock";
import {
  ArrowLeft,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Eye,
  X,
  Check,
  Info,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from "lucide-react";

export const AdminProofVerification: React.FC = () => {
  const {
    selectedCommunity,
    proofsList,
    approveProof,
    rejectProof,
    setActiveMgmtView,
  } = useAdminCommunity();

  const [activeTab, setActiveTab] = useState<"pending" | "approved" | "rejected">("pending");
  const [selectedProof, setSelectedProof] = useState<ProofSubmission | null>(null);
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [rejectingProof, setRejectingProof] = useState<ProofSubmission | null>(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [quickReason, setQuickReason] = useState("Photo is blurry / Low clarity");

  const pendingList = useMemo(() => proofsList.filter((p) => p.status === "pending"), [proofsList]);
  const approvedList = useMemo(() => proofsList.filter((p) => p.status === "approved"), [proofsList]);
  const rejectedList = useMemo(() => proofsList.filter((p) => p.status === "rejected"), [proofsList]);

  const displayedList = useMemo(() => {
    if (activeTab === "pending") return pendingList;
    if (activeTab === "approved") return approvedList;
    return rejectedList;
  }, [activeTab, pendingList, approvedList, rejectedList]);

  const handleConfirmReject = () => {
    if (!rejectingProof) return;
    const finalReason = rejectionReason.trim() ? rejectionReason.trim() : quickReason;
    rejectProof(rejectingProof.id, finalReason);
    setRejectingProof(null);
    setRejectionReason("");
    if (selectedProof?.id === rejectingProof.id) {
      setSelectedProof(null);
    }
  };

  return (
    <div style={{ padding: "16px", paddingBottom: "80px" }}>
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
            Proof Verification
          </h2>
          <p style={{ fontSize: 12, color: "#6B7280", margin: "2px 0 0" }}>
            {selectedCommunity.eventName} • GPS Geotag Audit
          </p>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="adc-summary-grid">
        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Submitted <Clock size={14} color="#6B7280" />
          </span>
          <span className="adc-summary-card-value">{proofsList.length}</span>
          <span className="adc-summary-card-sub">Total photo proofs</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Pending <Clock size={14} color="#D97706" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#D97706" }}>
            {pendingList.length}
          </span>
          <span className="adc-summary-card-sub">Requires verification</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Approved <CheckCircle2 size={14} color="#15803D" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#15803D" }}>
            {approvedList.length}
          </span>
          <span className="adc-summary-card-sub">Eligible for Thank Note</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Rejected <XCircle size={14} color="#DC2626" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#DC2626" }}>
            {rejectedList.length}
          </span>
          <span className="adc-summary-card-sub">Resubmission allowed</span>
        </div>
      </div>

      {/* 3 Tabs: Pending / Approved / Rejected */}
      <div className="adc-subtabs-row">
        <button
          className={`adc-subtab-btn ${activeTab === "pending" ? "is-active" : ""}`}
          onClick={() => setActiveTab("pending")}
        >
          <Clock size={13} />
          Pending
          <span className="adc-subtab-badge">{pendingList.length}</span>
        </button>

        <button
          className={`adc-subtab-btn ${activeTab === "approved" ? "is-active" : ""}`}
          onClick={() => setActiveTab("approved")}
        >
          <CheckCircle2 size={13} />
          Approved
          <span className="adc-subtab-badge">{approvedList.length}</span>
        </button>

        <button
          className={`adc-subtab-btn ${activeTab === "rejected" ? "is-active" : ""}`}
          onClick={() => setActiveTab("rejected")}
        >
          <XCircle size={13} />
          Rejected
          <span className="adc-subtab-badge">{rejectedList.length}</span>
        </button>
      </div>

      {/* Proof Submissions List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {displayedList.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              background: "#F9FAFB",
              borderRadius: 16,
              border: "1px dashed #D1D5DB",
            }}
          >
            <CheckCircle2 size={32} color="#9CA3AF" style={{ margin: "0 auto 8px" }} />
            <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: 0 }}>
              No proofs in {activeTab}
            </p>
            <p style={{ fontSize: 12, color: "#6B7280", margin: "4px 0 0" }}>
              All submissions in this category are up to date.
            </p>
          </div>
        ) : (
          displayedList.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 18,
                padding: "14px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
              }}
            >
              {/* Header row: student info */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <img
                  src={item.avatar}
                  alt={item.studentName}
                  style={{ width: 42, height: 42, borderRadius: "50%", objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h4 style={{ fontSize: 14, fontWeight: 700, color: "#111827", margin: 0 }}>
                      {item.studentName}
                    </h4>
                    <span
                      style={{
                        fontSize: 10.5,
                        fontWeight: 800,
                        padding: "2px 8px",
                        borderRadius: 9999,
                        background:
                          item.status === "approved"
                            ? "#DCFCE7"
                            : item.status === "rejected"
                            ? "#FEE2E2"
                            : "#FEF3C7",
                        color:
                          item.status === "approved"
                            ? "#15803D"
                            : item.status === "rejected"
                            ? "#DC2626"
                            : "#B45309",
                      }}
                    >
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <p style={{ fontSize: 11.5, color: "#6B7280", margin: "2px 0 0" }}>
                    <span style={{ fontWeight: 600 }}>{item.maatramId}</span> • {item.submittedAt}
                  </p>
                </div>
              </div>

              {/* Photo Thumbnail + Geotag Stamp */}
              {(() => {
                const cardPhotos = item.photoUrls && item.photoUrls.length ? item.photoUrls : [item.photoUrl];
                return (
                  <div
                    style={{
                      position: "relative",
                      borderRadius: 14,
                      overflow: "hidden",
                      cursor: "pointer",
                      height: 200,
                      background: "#000",
                    }}
                    onClick={() => {
                      setSelectedProof(item);
                      setActivePhotoIndex(0);
                    }}
                  >
                    <img
                      src={cardPhotos[0]}
                      alt="Proof submission"
                      style={{ width: "100%", height: "100%", objectFit: "cover", opacity: 0.94 }}
                    />

                    {/* Multiple Photos Badge */}
                    <div
                      style={{
                        position: "absolute",
                        top: 8,
                        right: 8,
                        background: "rgba(0,0,0,0.72)",
                        color: "#FEC802",
                        padding: "4px 8px",
                        borderRadius: 8,
                        fontSize: 11,
                        fontWeight: 700,
                        display: "flex",
                        alignItems: "center",
                        gap: 5,
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      <span>📷 {cardPhotos.length} Photo{cardPhotos.length !== 1 ? "s" : ""}</span>
                      <Eye size={12} color="#FFF" />
                    </div>

                    {/* Official Maatram Geotag Watermark Overlay (Matching Student Geotag Flow) */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "rgba(10, 12, 16, 0.92)",
                        borderTop: "2px solid #FEC802",
                        padding: "8px 10px",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        backdropFilter: "blur(4px)",
                      }}
                    >
                      {/* Mini Map View */}
                      <div
                        style={{
                          width: 48,
                          height: 48,
                          borderRadius: 6,
                          background: "#E2E8F0",
                          position: "relative",
                          overflow: "hidden",
                          flexShrink: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            width: 28,
                            height: 28,
                            borderRadius: "50%",
                            background: "#86EFAC",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: 2,
                            background: "#94A3B8",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            height: "100%",
                            width: 2,
                            background: "#94A3B8",
                          }}
                        />
                        <div
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: "50%",
                            background: "#EF4444",
                            border: "1.5px solid #FFF",
                            zIndex: 2,
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            bottom: 1,
                            fontSize: 7,
                            fontWeight: 800,
                            color: "#1E293B",
                            letterSpacing: 0.2,
                          }}
                        >
                          MAP VIEW
                        </span>
                      </div>

                      {/* Details */}
                      <div style={{ flex: 1, minWidth: 0, fontSize: 10.5 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 5 }}>
                          <span style={{ color: "#FEC802", fontWeight: 800, fontSize: 10.5 }}>
                            ★ MAATRAM FOUNDATION
                          </span>
                          <span
                            style={{
                              background: "#1E3A8A",
                              color: "#BFDBFE",
                              fontSize: 8,
                              fontWeight: 700,
                              padding: "1px 4px",
                              borderRadius: 4,
                            }}
                          >
                            OFFICIAL GEOTAG
                          </span>
                        </div>
                        <div style={{ fontWeight: 700, color: "#FFFFFF", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {selectedCommunity.name} · {selectedCommunity.eventName}
                        </div>
                        <div style={{ color: "#9CA3AF", fontSize: 9.5, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                          {item.gps?.locationName || item.locationName || selectedCommunity.eventLocation}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 1 }}>
                          <span style={{ color: "#FDE68A", fontWeight: 700, fontSize: 9.5 }}>
                            📍 {item.gps ? `${item.gps.latitude}, ${item.gps.longitude}` : "13.0067° N, 80.0033° E"}
                          </span>
                          <span
                            style={{
                              background: "rgba(34, 197, 94, 0.25)",
                              color: "#4ADE80",
                              fontSize: 8.5,
                              fontWeight: 700,
                              padding: "0 4px",
                              borderRadius: 4,
                            }}
                          >
                            ±{item.gps?.accuracy || "4.2m"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })()}

              {/* Activity description */}
              <p style={{ fontSize: 12, color: "#4B5563", margin: "10px 0 8px", lineHeight: 1.4 }}>
                <strong>Activity Note:</strong> {item.studentNotes || item.activityNote || "Field planting completed"}
              </p>

              {/* Rejection note if present */}
              {item.status === "rejected" && item.rejectionReason && (
                <div
                  style={{
                    background: "#FEF2F2",
                    border: "1px solid #FCA5A5",
                    borderRadius: 10,
                    padding: "8px 10px",
                    marginBottom: 10,
                    fontSize: 11.5,
                    color: "#991B1B",
                  }}
                >
                  <strong>Rejection Note:</strong> {item.rejectionReason}
                  <div style={{ fontSize: 10.5, color: "#B91C1C", marginTop: 2 }}>
                    Scholar has been notified and can submit replacement photos.
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: 8, marginTop: 8 }}>
                <button
                  onClick={() => setSelectedProof(item)}
                  className="adc-btn-ghost"
                  style={{ flex: 1, padding: "8px 10px", fontSize: 12.5 }}
                >
                  <Eye size={14} /> Full View
                </button>

                {item.status !== "approved" && (
                  <button
                    onClick={() => approveProof(item.id)}
                    className="adc-btn-primary"
                    style={{ flex: 1, padding: "8px 10px", fontSize: 12.5 }}
                  >
                    <Check size={14} /> Approve
                  </button>
                )}

                {item.status !== "rejected" && (
                  <button
                    onClick={() => {
                      setRejectingProof(item);
                      setRejectionReason("");
                    }}
                    className="adc-btn-danger"
                    style={{ flex: 1, padding: "8px 10px", fontSize: 12.5 }}
                  >
                    <X size={14} /> Reject
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>

      {/* Large Proof Review Modal */}
      {selectedProof && (
        <div className="adc-modal-overlay" onClick={() => setSelectedProof(null)}>
          <div
            className="adc-modal-card"
            style={{ maxWidth: 460 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="adc-modal-header">
              <div>
                <h3 className="adc-modal-title">Geotag Proof Audit</h3>
                <p style={{ fontSize: 12, color: "#6B7280", margin: "2px 0 0" }}>
                  {selectedProof.studentName} ({selectedProof.maatramId})
                </p>
              </div>
              <button
                className="adc-modal-close-btn"
                onClick={() => setSelectedProof(null)}
                aria-label="Close modal"
              >
                <X size={16} />
              </button>
            </div>

            {/* Instruction by Admin Banner */}
            <div
              style={{
                background: "#FEF9C3",
                border: "1px solid #FDE047",
                borderRadius: 12,
                padding: "10px 12px",
                marginBottom: 14,
                display: "flex",
                alignItems: "flex-start",
                gap: 10,
              }}
            >
              <Info size={16} color="#B45309" style={{ flexShrink: 0, marginTop: 2 }} />
              <div style={{ fontSize: 11.5, color: "#854D0E", lineHeight: 1.4 }}>
                <strong>Instruction by Admin:</strong>
                <ul style={{ margin: "4px 0 0", paddingLeft: 16 }}>
                  <li>Ensure active tree plantation or on-field service is visible.</li>
                  <li>Verify geotag coordinates fall inside the designated 300m event zone.</li>
                  <li>Check timestamp matches event hours (9:00 AM – 1:00 PM).</li>
                </ul>
              </div>
            </div>

            {/* Swipable Multiple Photos Carousel with Exact Geotag Watermark */}
            {(() => {
              const modalPhotos =
                selectedProof.photoUrls && selectedProof.photoUrls.length
                  ? selectedProof.photoUrls
                  : [selectedProof.photoUrl];
              const currentIndex = Math.min(activePhotoIndex, modalPhotos.length - 1);
              const activePhoto = modalPhotos[currentIndex] || modalPhotos[0];

              return (
                <div style={{ marginBottom: 14 }}>
                  {/* Photo Counter Header */}
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      marginBottom: 8,
                    }}
                  >
                    <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>
                      Submitted Proof Photos ({modalPhotos.length})
                    </span>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 700,
                        background: "#FEF3C7",
                        color: "#92400E",
                        padding: "2px 8px",
                        borderRadius: 6,
                      }}
                    >
                      Photo {currentIndex + 1} of {modalPhotos.length}
                    </span>
                  </div>

                  {/* Main Carousel Viewport */}
                  <div
                    style={{
                      position: "relative",
                      borderRadius: 16,
                      overflow: "hidden",
                      background: "#000",
                      height: 270,
                    }}
                  >
                    <img
                      src={activePhoto}
                      alt={`Proof view ${currentIndex + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                        display: "block",
                      }}
                    />

                    {/* Carousel Nav Arrows (Left / Right) */}
                    {modalPhotos.length > 1 && (
                      <>
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePhotoIndex((prev) =>
                              prev > 0 ? prev - 1 : modalPhotos.length - 1
                            );
                          }}
                          style={{
                            position: "absolute",
                            top: "38%",
                            left: 8,
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.55)",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "50%",
                            width: 34,
                            height: 34,
                            display: "grid",
                            placeItems: "center",
                            cursor: "pointer",
                            zIndex: 10,
                            backdropFilter: "blur(4px)",
                          }}
                          aria-label="Previous photo"
                        >
                          <ChevronLeft size={20} />
                        </button>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setActivePhotoIndex((prev) =>
                              prev < modalPhotos.length - 1 ? prev + 1 : 0
                            );
                          }}
                          style={{
                            position: "absolute",
                            top: "38%",
                            right: 8,
                            transform: "translateY(-50%)",
                            background: "rgba(0, 0, 0, 0.55)",
                            color: "#FFFFFF",
                            border: "none",
                            borderRadius: "50%",
                            width: 34,
                            height: 34,
                            display: "grid",
                            placeItems: "center",
                            cursor: "pointer",
                            zIndex: 10,
                            backdropFilter: "blur(4px)",
                          }}
                          aria-label="Next photo"
                        >
                          <ChevronRight size={20} />
                        </button>
                      </>
                    )}

                    {/* Exact Official Maatram Geotag Watermark Overlay (Matching Reference Image) */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        background: "rgba(10, 12, 16, 0.94)",
                        borderTop: "2.5px solid #FEC802",
                        padding: "10px 12px",
                        color: "#FFFFFF",
                        display: "flex",
                        alignItems: "center",
                        gap: 12,
                        backdropFilter: "blur(4px)",
                        zIndex: 5,
                      }}
                    >
                      {/* Left Mini Map Tile */}
                      <div
                        style={{
                          width: 54,
                          height: 54,
                          borderRadius: 8,
                          background: "#E2E8F0",
                          position: "relative",
                          overflow: "hidden",
                          flexShrink: 0,
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "center",
                          justifyContent: "center",
                          border: "1px solid #CBD5E1",
                        }}
                      >
                        <div
                          style={{
                            position: "absolute",
                            width: 34,
                            height: 34,
                            borderRadius: "50%",
                            background: "#86EFAC",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            width: "100%",
                            height: 2.5,
                            background: "#94A3B8",
                          }}
                        />
                        <div
                          style={{
                            position: "absolute",
                            height: "100%",
                            width: 2.5,
                            background: "#94A3B8",
                          }}
                        />
                        <div
                          style={{
                            width: 10,
                            height: 10,
                            borderRadius: "50%",
                            background: "#EF4444",
                            border: "2px solid #FFF",
                            boxShadow: "0 0 6px rgba(239, 68, 68, 0.8)",
                            zIndex: 2,
                          }}
                        />
                        <span
                          style={{
                            position: "absolute",
                            bottom: 2,
                            fontSize: 7.5,
                            fontWeight: 900,
                            color: "#0F172A",
                            letterSpacing: 0.3,
                          }}
                        >
                          MAP VIEW
                        </span>
                      </div>

                      {/* Right Details */}
                      <div style={{ flex: 1, minWidth: 0, fontSize: 11 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                          <span style={{ color: "#FEC802", fontWeight: 800, fontSize: 11 }}>
                            ★ MAATRAM FOUNDATION
                          </span>
                          <span
                            style={{
                              background: "#1E3A8A",
                              color: "#BFDBFE",
                              fontSize: 8.5,
                              fontWeight: 700,
                              padding: "1px 5px",
                              borderRadius: 4,
                            }}
                          >
                            OFFICIAL EVENT GEOTAG
                          </span>
                        </div>

                        <div
                          style={{
                            fontWeight: 800,
                            color: "#FFFFFF",
                            fontSize: 11.5,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {selectedCommunity.name} · {selectedCommunity.eventName}
                        </div>

                        <div
                          style={{
                            color: "#9CA3AF",
                            fontSize: 10,
                            lineHeight: 1.25,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            margin: "1px 0",
                          }}
                        >
                          {selectedProof.gps?.locationName || selectedProof.locationName || selectedCommunity.eventLocation}
                        </div>

                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2, flexWrap: "wrap" }}>
                          <span style={{ color: "#FDE68A", fontWeight: 700, fontSize: 10 }}>
                            📍 {selectedProof.gps ? `${selectedProof.gps.latitude}, ${selectedProof.gps.longitude}` : "13.0067° N, 80.0033° E"}
                          </span>
                          <span style={{ color: "#93C5FD", fontSize: 9.5 }}>
                            🕒 {selectedProof.gps?.timestamp || selectedProof.submittedAt}
                          </span>
                          <span
                            style={{
                              background: "rgba(34, 197, 94, 0.25)",
                              color: "#4ADE80",
                              fontSize: 8.5,
                              fontWeight: 700,
                              padding: "1px 5px",
                              borderRadius: 4,
                            }}
                          >
                            ±{selectedProof.gps?.accuracy || "3.8m"}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Thumbnail Row Selector */}
                  {modalPhotos.length > 1 && (
                    <div
                      style={{
                        display: "flex",
                        gap: 8,
                        overflowX: "auto",
                        marginTop: 10,
                        paddingBottom: 4,
                      }}
                    >
                      {modalPhotos.map((p, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => setActivePhotoIndex(idx)}
                          style={{
                            width: 60,
                            height: 48,
                            borderRadius: 8,
                            overflow: "hidden",
                            border: idx === currentIndex ? "2.5px solid #FEC802" : "1px solid #D1D5DB",
                            padding: 0,
                            cursor: "pointer",
                            flexShrink: 0,
                            opacity: idx === currentIndex ? 1 : 0.65,
                            transition: "all 0.15s ease",
                            background: "#000",
                          }}
                        >
                          <img
                            src={p}
                            alt={`Thumb ${idx + 1}`}
                            style={{ width: "100%", height: "100%", objectFit: "cover" }}
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              );
            })()}

            {/* Mini Map Visual Representation */}
            <div
              style={{
                background: "#F3F4F6",
                border: "1px solid #E5E7EB",
                borderRadius: 14,
                padding: "12px",
                marginBottom: 16,
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 8,
                }}
              >
                <span style={{ fontSize: 12, fontWeight: 700, color: "#374151" }}>
                  Event Geofence Check
                </span>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    color: "#15803D",
                    background: "#DCFCE7",
                    padding: "2px 8px",
                    borderRadius: 9999,
                  }}
                >
                  Within 300m Radius
                </span>
              </div>
              <div
                style={{
                  height: 80,
                  background:
                    "radial-gradient(circle at center, #86EFAC 10%, #E2E8F0 60%, #CBD5E1 100%)",
                  borderRadius: 10,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  border: "1px dashed #94A3B8",
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    background: "rgba(22, 163, 74, 0.2)",
                    border: "2px solid #16A34A",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <MapPin size={20} color="#DC2626" />
                </div>
                <span
                  style={{
                    position: "absolute",
                    bottom: 6,
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#475569",
                  }}
                >
                  Distance: 64 meters from venue center
                </span>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="adc-btn-danger"
                style={{ flex: 1 }}
                onClick={() => {
                  setRejectingProof(selectedProof);
                  setRejectionReason("");
                }}
              >
                <X size={16} /> Reject Proof
              </button>

              <button
                className="adc-btn-primary"
                style={{ flex: 1.2 }}
                onClick={() => {
                  approveProof(selectedProof.id);
                  setSelectedProof(null);
                }}
              >
                <CheckCircle2 size={16} /> Approve Proof
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Dialog Modal */}
      {rejectingProof && (
        <div className="adc-modal-overlay" onClick={() => setRejectingProof(null)}>
          <div
            className="adc-modal-card"
            style={{ maxWidth: 400 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="adc-modal-header">
              <h3 className="adc-modal-title" style={{ color: "#DC2626" }}>
                Reject Photo Proof
              </h3>
              <button className="adc-modal-close-btn" onClick={() => setRejectingProof(null)}>
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: 13, color: "#4B5563", margin: "0 0 12px" }}>
              Provide a clear reason for rejecting <strong>{rejectingProof.studentName}</strong>'s
              submission. A feedback note will be sent automatically.
            </p>

            <div className="adc-form-group">
              <label>Common Reasons</label>
              <select
                className="adc-form-select"
                value={quickReason}
                onChange={(e) => setQuickReason(e.target.value)}
              >
                <option value="Photo is blurry / Low clarity">Photo is blurry / Low clarity</option>
                <option value="Outside event radius (> 300m)">Outside event radius (&gt; 300m)</option>
                <option value="Face or volunteer ID not visible">Face or volunteer ID not visible</option>
                <option value="Duplicate / Stock photo detected">Duplicate / Stock photo detected</option>
                <option value="No volunteer activity shown">No volunteer activity shown</option>
              </select>
            </div>

            <div className="adc-form-group">
              <label>Additional Feedback / Note (Optional)</label>
              <textarea
                className="adc-form-textarea"
                placeholder="Explain what the student needs to re-upload..."
                value={rejectionReason}
                onChange={(e) => setRejectionReason(e.target.value)}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontSize: 12,
                color: "#15803D",
                marginBottom: 16,
              }}
            >
              <CheckCircle2 size={14} />
              Student will be granted permission to re-submit proof immediately.
            </div>

            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="adc-btn-ghost"
                style={{ flex: 1 }}
                onClick={() => setRejectingProof(null)}
              >
                Cancel
              </button>
              <button
                className="adc-btn-danger"
                style={{ flex: 1 }}
                onClick={handleConfirmReject}
              >
                Confirm Reject
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
