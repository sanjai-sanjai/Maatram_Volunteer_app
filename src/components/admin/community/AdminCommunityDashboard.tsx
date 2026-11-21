import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useAdminCommunity } from "./AdminCommunityState";
import { AdminCommunityChat } from "./AdminCommunityChat";
import { AdminEventManagement } from "./AdminEventManagement";
import { AdminFloatingPlusModal } from "./AdminFloatingPlusModal";
import {
  ArrowLeft,
  ChevronRight,
  LayoutGrid,
  Megaphone,
  MessageSquare,
  MoreVertical,
  Volume2,
  VolumeX,
  X,
  Calendar,
  Users,
  Info,
  Radio,
  Send,
  MapPin,
  Clock,
  ShieldCheck,
} from "lucide-react";

function WalkieTalkie() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="27"
      height="27"
      fill="none"
      stroke="#1F2937"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8.5 2v4.5" />
      <path d="M15.5 3.5v3" />
      <rect x="5" y="6" width="14" height="16" rx="3" fill="#FEC802" fillOpacity="0.18" stroke="#1F2937" />
      <rect x="7.5" y="8.5" width="9" height="4.5" rx="1" fill="#FEF3C7" stroke="#1F2937" strokeWidth="1.4" />
      <path d="M9.5 10.8h5" stroke="#1F2937" strokeWidth="1.2" />
      <circle cx="9.5" cy="16" r="1.1" fill="#1F2937" stroke="none" />
      <circle cx="14.5" cy="16" r="1.1" fill="#1F2937" stroke="none" />
      <circle cx="9.5" cy="19" r="1.1" fill="#1F2937" stroke="none" />
      <circle cx="14.5" cy="19" r="1.1" fill="#1F2937" stroke="none" />
    </svg>
  );
}

function playWalkieSquelch(isStart: boolean) {
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);

    if (isStart) {
      osc.type = "sine";
      osc.frequency.setValueAtTime(920, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1450, ctx.currentTime + 0.07);
      gain.gain.setValueAtTime(0.12, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } else {
      osc.type = "triangle";
      osc.frequency.setValueAtTime(440, ctx.currentTime);
      gain.gain.setValueAtTime(0.09, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    }
  } catch {
    // AudioContext blocked or silent fallback
  }
}

export const AdminCommunityDashboard: React.FC = () => {
  const {
    selectedCommunity,
    activeTab,
    setActiveTab,
    setActiveMgmtView,
    sendMessage,
    toastMessage,
    clearToast,
  } = useAdminCommunity();

  const [showWalkieModal, setShowWalkieModal] = useState(false);
  const [showThreeDotMenu, setShowThreeDotMenu] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [walkieTalking, setWalkieTalking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [voiceDispatchText, setVoiceDispatchText] = useState("");

  const handleStartTalk = () => {
    playWalkieSquelch(true);
    setWalkieTalking(true);
  };

  const handleStopTalk = () => {
    if (walkieTalking) {
      playWalkieSquelch(false);
      setWalkieTalking(false);
    }
  };

  const handleSendVoiceDispatch = () => {
    const content =
      voiceDispatchText.trim() ||
      `Attention all ${selectedCommunity.name} volunteers on site: Lead marshals please assemble near registration desk.`;
    sendMessage(`🎙️ [Walkie Dispatch - Live Ops] Ops Lead: "${content}"`);
    setVoiceDispatchText("");
    setShowWalkieModal(false);
  };

  return (
    <div className="ma-chat ma-chat-fixed-container">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: 20,
            left: "50%",
            transform: "translateX(-50%)",
            background: "#111827",
            color: "#FFFFFF",
            padding: "10px 18px",
            borderRadius: 9999,
            fontSize: 13,
            fontWeight: 700,
            zIndex: 90,
            boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
            display: "flex",
            alignItems: "center",
            gap: 8,
            animation: "adc-slide-down 0.2s ease-out",
          }}
        >
          <span>{toastMessage}</span>
          <button
            onClick={clearToast}
            style={{
              background: "transparent",
              border: "none",
              color: "#9CA3AF",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
            }}
          >
            <X size={14} />
          </button>
        </div>
      )}

      {/* 1. FIXED TOP DOCK (Community Header, Tabs Switcher, and Pinned Attendance Banner) */}
      <div className="ma-chat-pinned-top">
        {/* Top Header */}
        <header className="ma-chat-header" style={{ position: "relative" }}>
          {/* Back button */}
          <Link
            to="/admin/communities"
            className="ma-icon"
            aria-label="Back to communities"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "#F3F4F6",
              color: "#111827",
              textDecoration: "none",
              flexShrink: 0,
            }}
          >
            <ArrowLeft size={18} />
          </Link>

          {/* Center Identity block: Logo + Name + Tagline */}
          <div
            className="ma-chat-header-info"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              flex: "1 1 auto",
              minWidth: 0,
            }}
          >
            <img
              src={selectedCommunity.logo || "/assets/brand/maatram-foundation-logo.png"}
              alt={selectedCommunity.name}
              style={{
                width: 42,
                height: 42,
                objectFit: "cover",
                borderRadius: "50%",
                background: "#FFFFFF",
                border: "1.5px solid #F3F4F6",
                padding: 1,
                flexShrink: 0,
                boxShadow: "0 2px 5px rgba(0,0,0,0.06)",
              }}
              onError={(e) => {
                (e.target as HTMLImageElement).src =
                  "/assets/brand/maatram-foundation-logo.png";
              }}
            />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 5, minWidth: 0 }}>
                <h1
                  style={{
                    fontSize: 14.5,
                    fontWeight: 800,
                    color: "#111827",
                    margin: 0,
                    lineHeight: 1.2,
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={selectedCommunity.name}
                >
                  {selectedCommunity.name}
                </h1>
                <span
                  style={{
                    background: "#FEF3C7",
                    color: "#92400E",
                    fontSize: 9.5,
                    fontWeight: 800,
                    padding: "1px 5px",
                    borderRadius: 4,
                    flexShrink: 0,
                  }}
                >
                  Admin 👑
                </span>
              </div>
              <p
                style={{
                  fontSize: 10.5,
                  color: "#6B7280",
                  margin: "2px 0 0",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {selectedCommunity.tagline}
              </p>
            </div>
          </div>

          {/* Top-Right Action Controls (Walkie-Talkie & 3-Dot Menu) */}
          <div
            className="ma-chat-header-actions"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              flex: "0 0 auto",
              flexShrink: 0,
              marginLeft: "auto",
              justifyContent: "flex-end",
            }}
          >
            {/* Walkie-Talkie Button */}
            <button
              type="button"
              className="ma-chat-walkie-btn"
              onClick={() => {
                playWalkieSquelch(true);
                setShowWalkieModal(true);
              }}
              aria-label="Walkie-Talkie Channel"
              title="Push-to-Talk Field Ops Channel"
              style={{
                width: 40,
                height: 40,
                borderRadius: 12,
                background: "#FEF3C7",
                border: "1.5px solid #FDE68A",
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                boxShadow: "0 2px 6px rgba(245, 158, 11, 0.15)",
                transition: "transform 0.12s ease, background 0.12s ease",
              }}
            >
              <WalkieTalkie />
            </button>

            {/* Three-Dot Controls Button */}
            <div style={{ position: "relative", display: "flex", alignItems: "center" }}>
              <button
                type="button"
                className="ma-icon"
                onClick={() => setShowThreeDotMenu(!showThreeDotMenu)}
                aria-label="Community Controls"
                style={{
                  width: 36,
                  height: 40,
                  background: showThreeDotMenu ? "#F3F4F6" : "transparent",
                  border: "none",
                  borderRadius: 8,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#111827",
                  padding: 0,
                  transition: "background 0.15s ease",
                }}
              >
                <MoreVertical size={20} />
              </button>

              {showThreeDotMenu && (
                <>
                  {/* Backdrop to close menu */}
                  <div
                    style={{
                      position: "fixed",
                      inset: 0,
                      zIndex: 49,
                    }}
                    onClick={() => setShowThreeDotMenu(false)}
                  />
                  <div
                    style={{
                      position: "absolute",
                      top: 42,
                      right: 0,
                      width: 220,
                      background: "#FFFFFF",
                      borderRadius: 14,
                      boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
                      border: "1px solid #E5E7EB",
                      padding: 6,
                      zIndex: 50,
                      animation: "adc-scale-up 0.15s ease-out",
                    }}
                  >
                    <button
                      onClick={() => {
                        setShowThreeDotMenu(false);
                        setActiveTab("event-mgmt");
                        setActiveMgmtView("attendance");
                      }}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        background: "transparent",
                        border: "none",
                        textAlign: "left",
                        fontSize: 13,
                        color: "#111827",
                        borderRadius: 8,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Calendar size={15} color="#2563EB" /> Attendance Records
                    </button>

                    <button
                      onClick={() => {
                        setShowThreeDotMenu(false);
                        setActiveTab("event-mgmt");
                        setActiveMgmtView("proofs");
                      }}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        background: "transparent",
                        border: "none",
                        textAlign: "left",
                        fontSize: 13,
                        color: "#111827",
                        borderRadius: 8,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Users size={15} color="#16A34A" /> Review Proofs
                    </button>

                    <button
                      onClick={() => {
                        setShowThreeDotMenu(false);
                        setActiveTab("event-mgmt");
                        setActiveMgmtView("funds");
                      }}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        background: "transparent",
                        border: "none",
                        textAlign: "left",
                        fontSize: 13,
                        color: "#111827",
                        borderRadius: 8,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <LayoutGrid size={15} color="#D97706" /> Review Funds
                    </button>

                    <button
                      onClick={() => {
                        setIsMuted(!isMuted);
                        setShowThreeDotMenu(false);
                      }}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        background: "transparent",
                        border: "none",
                        textAlign: "left",
                        fontSize: 13,
                        color: "#111827",
                        borderRadius: 8,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      {isMuted ? (
                        <>
                          <VolumeX size={15} color="#DC2626" /> Unmute Notifications
                        </>
                      ) : (
                        <>
                          <Volume2 size={15} color="#6B7280" /> Mute Notifications
                        </>
                      )}
                    </button>

                    <div style={{ height: 1, background: "#E5E7EB", margin: "4px 0" }} />

                    <button
                      onClick={() => {
                        setShowThreeDotMenu(false);
                        setShowDetailsModal(true);
                      }}
                      style={{
                        width: "100%",
                        padding: "8px 12px",
                        background: "transparent",
                        border: "none",
                        textAlign: "left",
                        fontSize: 13,
                        color: "#111827",
                        borderRadius: 8,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                      }}
                    >
                      <Info size={15} color="#4F46E5" /> Community Details
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Two Primary Navigation Tabs (Pill Container) */}
        <div className="ma-chat-tabs-card" role="tablist" aria-label="Community navigation">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "chats"}
            className={`ma-chat-tab ${activeTab === "chats" ? "is-active" : ""}`}
            onClick={() => setActiveTab("chats")}
          >
            <MessageSquare size={16} strokeWidth={2.4} />
            <span>Chats</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "event-mgmt"}
            className={`ma-chat-tab ${activeTab === "event-mgmt" ? "is-active" : ""}`}
            onClick={() => {
              setActiveTab("event-mgmt");
              setActiveMgmtView("overview");
            }}
          >
            <LayoutGrid size={16} strokeWidth={2.2} />
            <span>Event Management</span>
          </button>
        </div>

        {/* Pinned Attendance Banner: Visible only during Chats view */}
        {activeTab === "chats" && (
          <div
            className="ma-attendance-banner"
            role="button"
            tabIndex={0}
            onClick={() => {
              setActiveTab("event-mgmt");
              setActiveMgmtView("attendance");
            }}
          >
            <div className="ma-attendance-banner-icon">
              <Megaphone size={20} strokeWidth={2.2} />
            </div>
            <div className="ma-attendance-banner-content">
              <h3 className="ma-attendance-banner-title">Mark Your Attendance!</h3>
              <p className="ma-attendance-banner-desc">
                Attendance for {selectedCommunity.eventName} is now open.
              </p>
              <span className="ma-attendance-banner-link">Click to inspect live turnout.</span>
            </div>
            <ChevronRight size={18} strokeWidth={2.2} className="ma-attendance-banner-arrow" />
          </div>
        )}
      </div>

      {/* 2. SCROLLABLE CONTENT BODY */}
      <div className="ma-chat-scrollable-content" style={{ padding: 0 }}>
        {activeTab === "chats" ? <AdminCommunityChat /> : <AdminEventManagement />}
      </div>

      {/* Floating Plus Button (Available strictly in Event Management view) */}
      {activeTab === "event-mgmt" && <AdminFloatingPlusModal />}

      {/* Walkie-Talkie Push-to-Talk Modal */}
      {showWalkieModal && (
        <div className="adc-modal-overlay" onClick={() => setShowWalkieModal(false)}>
          <div
            className="adc-modal-card"
            style={{ maxWidth: 390, textAlign: "center" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="adc-modal-header">
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Radio size={18} color="#D97706" />
                <h3 className="adc-modal-title">Live Ops Walkie-Talkie</h3>
              </div>
              <button
                className="adc-modal-close-btn"
                onClick={() => setShowWalkieModal(false)}
              >
                <X size={16} />
              </button>
            </div>

            <p style={{ fontSize: 13, color: "#4B5563", margin: "0 0 16px" }}>
              Direct live push-to-talk voice channel connecting Admin Leads and field volunteers on duty.
            </p>

            {/* PTT Dial Button */}
            <div
              style={{
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: walkieTalking
                  ? "radial-gradient(circle, #DCFCE7 40%, #BBF7D0 100%)"
                  : "radial-gradient(circle, #FEF3C7 40%, #FDE68A 100%)",
                border: walkieTalking ? "5px solid #16A34A" : "5px solid #FEC802",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                cursor: "pointer",
                userSelect: "none",
                transition: "all 0.15s ease",
                boxShadow: walkieTalking
                  ? "0 0 35px rgba(22, 163, 74, 0.5), inset 0 0 15px rgba(22, 163, 74, 0.2)"
                  : "0 8px 24px rgba(254, 200, 2, 0.25)",
                transform: walkieTalking ? "scale(1.04)" : "scale(1)",
              }}
              onMouseDown={handleStartTalk}
              onMouseUp={handleStopTalk}
              onMouseLeave={handleStopTalk}
              onTouchStart={handleStartTalk}
              onTouchEnd={handleStopTalk}
            >
              <Volume2
                size={38}
                color={walkieTalking ? "#15803D" : "#B45309"}
                style={{
                  animation: walkieTalking ? "bounce 0.4s infinite alternate" : "none",
                }}
              />
              <span
                style={{
                  fontSize: 11,
                  fontWeight: 800,
                  color: walkieTalking ? "#15803D" : "#B45309",
                  marginTop: 4,
                  letterSpacing: "0.4px",
                }}
              >
                {walkieTalking ? "TRANSMITTING..." : "HOLD TO TALK"}
              </span>
            </div>

            {/* Live Audio Visualizer Bars when transmitting */}
            {walkieTalking && (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 4,
                  height: 24,
                  marginBottom: 12,
                }}
              >
                {[14, 22, 10, 24, 18, 22, 12, 20].map((h, i) => (
                  <span
                    key={i}
                    style={{
                      width: 3.5,
                      height: h,
                      borderRadius: 2,
                      background: "#16A34A",
                      animation: "pulse 0.4s infinite alternate",
                      animationDelay: `${i * 0.05}s`,
                    }}
                  />
                ))}
              </div>
            )}

            {/* Active Channel Details */}
            <div
              style={{
                fontSize: 12,
                color: "#4B5563",
                background: "#F9FAFB",
                border: "1px solid #E5E7EB",
                padding: "8px 12px",
                borderRadius: 10,
                marginBottom: 14,
              }}
            >
              Frequency: <strong>146.520 MHz</strong> • Channel:{" "}
              <strong>{selectedCommunity.name} Ops</strong> • {selectedCommunity.activeVolunteers} Volunteers Listening
            </div>

            {/* Quick Dispatch Broadcast to Chat */}
            <div style={{ textAlign: "left" }}>
              <label
                style={{
                  fontSize: 11.5,
                  fontWeight: 700,
                  color: "#374151",
                  display: "block",
                  marginBottom: 4,
                }}
              >
                Broadcast Voice Dispatch to Chat:
              </label>
              <div style={{ display: "flex", gap: 6 }}>
                <input
                  type="text"
                  placeholder="e.g. Muster at Gate 2 in 10 minutes..."
                  value={voiceDispatchText}
                  onChange={(e) => setVoiceDispatchText(e.target.value)}
                  style={{
                    flex: 1,
                    fontSize: 12,
                    padding: "7px 10px",
                    borderRadius: 8,
                    border: "1px solid #D1D5DB",
                    outline: "none",
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendVoiceDispatch();
                  }}
                />
                <button
                  type="button"
                  onClick={handleSendVoiceDispatch}
                  style={{
                    background: "#111827",
                    color: "#FFFFFF",
                    border: "none",
                    borderRadius: 8,
                    padding: "0 12px",
                    fontSize: 12,
                    fontWeight: 700,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  <Send size={13} /> Send
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Community Details Modal */}
      {showDetailsModal && (
        <div className="adc-modal-overlay" onClick={() => setShowDetailsModal(false)}>
          <div
            className="adc-modal-card"
            style={{ maxWidth: 410 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="adc-modal-header">
              <h3 className="adc-modal-title">Community Details</h3>
              <button
                className="adc-modal-close-btn"
                onClick={() => setShowDetailsModal(false)}
              >
                <X size={16} />
              </button>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
              <img
                src={selectedCommunity.logo || "/assets/brand/maatram-foundation-logo.png"}
                alt={selectedCommunity.name}
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #F3F4F6",
                }}
              />
              <div>
                <h4 style={{ fontSize: 16, fontWeight: 800, color: "#111827", margin: 0 }}>
                  {selectedCommunity.name}
                </h4>
                <span
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    padding: "2px 8px",
                    borderRadius: 6,
                    background: "#FEF3C7",
                    color: "#92400E",
                    display: "inline-block",
                    marginTop: 3,
                  }}
                >
                  {selectedCommunity.category}
                </span>
              </div>
            </div>

            <p style={{ fontSize: 13, color: "#4B5563", lineHeight: 1.5, margin: "0 0 14px" }}>
              {selectedCommunity.description}
            </p>

            <div
              style={{
                background: "#F9FAFB",
                borderRadius: 12,
                padding: "12px 14px",
                border: "1px solid #E5E7EB",
                fontSize: 12,
                color: "#374151",
                display: "flex",
                flexDirection: "column",
                gap: 8,
                marginBottom: 16,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Calendar size={14} color="#D97706" />
                <span>
                  <strong>Active Event:</strong> {selectedCommunity.eventName}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Clock size={14} color="#D97706" />
                <span>
                  {selectedCommunity.eventDate} • {selectedCommunity.eventTime}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <MapPin size={14} color="#D97706" />
                <span>
                  {selectedCommunity.eventLocation} (Radius: {selectedCommunity.eventRadius})
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Users size={14} color="#D97706" />
                <span>
                  {selectedCommunity.members} Total Scholars • {selectedCommunity.activeVolunteers} Active on Site
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <ShieldCheck size={14} color="#16A34A" />
                <span>
                  <strong>Lead Desk:</strong> Maatram Foundation Central Operations
                </span>
              </div>
            </div>

            <button
              type="button"
              className="adc-btn-primary"
              style={{ width: "100%" }}
              onClick={() => setShowDetailsModal(false)}
            >
              Close Details
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
