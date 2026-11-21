import React, { useState, useRef } from "react";
import {
  Calendar,
  Camera,
  Check,
  CheckCheck,
  Clock,
  FileText,
  Hourglass,
  Image,
  MapPin,
  Mic,
  MoreVertical,
  Paperclip,
  Plus,
  Send,
  Users,
  Video,
  X,
  BarChart3,
  ExternalLink,
} from "lucide-react";
import { useAdminCommunity } from "./AdminCommunityState";

export function AdminCommunityChat() {
  const {
    messages,
    sendMessage,
    scheduleMeeting,
    createPoll,
    votePoll,
    shareLocation,
    shareMedia,
    selectedCommunity,
    setActiveMgmtView,
    setActiveTab,
  } = useAdminCommunity();

  const [text, setText] = useState("");
  const [showPinMenu, setShowPinMenu] = useState(false);

  // Modals for the 4 pin options
  const [meetingModal, setMeetingModal] = useState(false);
  const [pollModal, setPollModal] = useState(false);
  const [locationModal, setLocationModal] = useState(false);
  const [mediaModal, setMediaModal] = useState(false);

  // Meeting Form
  const [meetingTitle, setMeetingTitle] = useState("Volunteers Sync & Site Briefing");
  const [meetingDesc, setMeetingDesc] = useState(
    "Pre-event review of sector trench boundaries, role assignments, and refresh points."
  );
  const [meetingDate, setMeetingDate] = useState("Nov 02, 2026");
  const [meetingStart, setMeetingStart] = useState("08:30 AM");
  const [meetingEnd, setMeetingEnd] = useState("09:00 AM");

  // Poll Form
  const [pollQuestion, setPollQuestion] = useState(
    "Which area requires extra volunteer deployment for the 2nd hour?"
  );
  const [pollOptions, setPollOptions] = useState([
    "North Bund Trench B",
    "South Embankment Sector",
    "Seed Bag Distribution Desk",
  ]);
  const [allowMultiple, setAllowMultiple] = useState(false);

  // Location Form
  const [locTitle, setLocTitle] = useState("Madhavaram Botanical Garden - Assembly Gate 2");
  const [locAddress, setLocAddress] = useState(
    "Madhavaram Botanical Garden, Madhavaram, Chennai, Tamil Nadu 600060"
  );
  const [locCoords, setLocCoords] = useState("13.1485° N, 80.2312° E");

  // Media Form
  const [mediaCaption, setMediaCaption] = useState("Sector Map & Trench Allocation Blueprint 🗺️");
  const [selectedMedia, setSelectedMedia] = useState("/assets/dashboard/palm-seeds-opportunity.jpg");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      sendMessage(text);
      setText("");
    }
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (meetingTitle.trim()) {
      scheduleMeeting({
        title: meetingTitle,
        description: meetingDesc,
        date: meetingDate,
        startTime: meetingStart,
        endTime: meetingEnd,
      });
      setMeetingModal(false);
      setShowPinMenu(false);
    }
  };

  const handlePollSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validOptions = pollOptions.filter((o) => o.trim().length > 0);
    if (pollQuestion.trim() && validOptions.length >= 2) {
      createPoll({
        question: pollQuestion,
        options: validOptions,
        multiple: allowMultiple,
      });
      setPollModal(false);
      setShowPinMenu(false);
    }
  };

  const handleLocationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (locTitle.trim()) {
      shareLocation(locTitle, locAddress, locCoords);
      setLocationModal(false);
      setShowPinMenu(false);
    }
  };

  const handleMediaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    shareMedia(selectedMedia, mediaCaption, "Sector_Plan_Blueprint.jpg", "1.4 MB");
    setMediaModal(false);
    setShowPinMenu(false);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", position: "relative" }}>
      {/* Scrollable WhatsApp Timeline */}
      <div className="ma-chat-timeline" style={{ padding: "16px 12px 90px", flex: 1, overflowY: "auto" }}>
        {/* WhatsApp Date Separator */}
        <div className="ma-date">Today · {selectedCommunity.eventDate || "Nov 02, 2026"}</div>

        {/* Messages List */}
        {messages.map((m) => {
          const isOutgoing = m.role === "Admin" || m.sender === "Sujith Kumar";

          if (isOutgoing) {
            return (
              <div key={m.id} className="ma-outgoing">
                <div>
                  {/* Sender Tag for Admin */}
                  <div
                    style={{
                      fontSize: 10,
                      fontWeight: 800,
                      color: "#92400E",
                      marginBottom: 3,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <span>{m.sender}</span>
                    <span
                      style={{
                        background: "#FEF3C7",
                        padding: "1px 5px",
                        borderRadius: 4,
                        fontSize: 9,
                      }}
                    >
                      Admin 👑
                    </span>
                  </div>

                  {/* Text Message */}
                  {m.text && (
                    <p style={{ margin: "0 0 4px", fontSize: 13, lineHeight: 1.4, color: "#111827" }}>
                      {m.text}
                    </p>
                  )}

                  {/* Meeting Card */}
                  {m.meeting && (
                    <div
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #FDE68A",
                        borderRadius: 12,
                        padding: "10px 12px",
                        margin: "4px 0",
                        boxShadow: "0 2px 6px rgba(0,0,0,0.03)",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontWeight: 700,
                          fontSize: 13,
                          color: "#1E40AF",
                          marginBottom: 4,
                        }}
                      >
                        <Video size={15} />
                        <span>{m.meeting.title}</span>
                      </div>
                      <p style={{ fontSize: 11.5, color: "#4B5563", margin: "0 0 6px" }}>
                        {m.meeting.description}
                      </p>
                      <div
                        style={{
                          fontSize: 11,
                          color: "#6B7280",
                          display: "flex",
                          gap: 10,
                          marginBottom: 8,
                        }}
                      >
                        <span>📅 {m.meeting.date}</span>
                        <span>
                          ⏰ {m.meeting.startTime} – {m.meeting.endTime}
                        </span>
                      </div>
                      <a
                        href={m.meeting.meetUrl}
                        target="_blank"
                        rel="noreferrer"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: 5,
                          background: "#1E40AF",
                          color: "#FFFFFF",
                          fontSize: 11.5,
                          fontWeight: 700,
                          padding: "5px 12px",
                          borderRadius: 8,
                          textDecoration: "none",
                        }}
                      >
                        Join Video Meeting <ExternalLink size={12} />
                      </a>
                    </div>
                  )}

                  {/* WhatsApp Interactive Poll Card */}
                  {m.poll && (
                    <div
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderRadius: 14,
                        padding: "12px",
                        margin: "4px 0",
                        minWidth: 220,
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: 13, color: "#111827", marginBottom: 8 }}>
                        📊 {m.poll.question}
                      </div>
                      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                        {m.poll.options.map((opt) => {
                          const pct =
                            m.poll!.totalVotes > 0
                              ? Math.round((opt.votes / m.poll!.totalVotes) * 100)
                              : 0;
                          const hasVoted = m.poll!.userVoted?.includes(opt.id);

                          return (
                            <button
                              key={opt.id}
                              onClick={() => votePoll(m.id, opt.id)}
                              type="button"
                              style={{
                                background: hasVoted ? "#FEF9C3" : "#F9FAFB",
                                border: hasVoted ? "1.5px solid #FEC802" : "1px solid #E5E7EB",
                                borderRadius: 10,
                                padding: "8px 10px",
                                textAlign: "left",
                                cursor: "pointer",
                                position: "relative",
                                overflow: "hidden",
                              }}
                            >
                              {/* Progress bar background fill */}
                              <div
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  bottom: 0,
                                  width: `${pct}%`,
                                  background: "rgba(254, 200, 2, 0.25)",
                                  zIndex: 0,
                                  transition: "width 0.3s ease",
                                }}
                              />
                              <div
                                style={{
                                  position: "relative",
                                  zIndex: 1,
                                  display: "flex",
                                  justifyContent: "space-between",
                                  fontSize: 12,
                                  color: "#111827",
                                }}
                              >
                                <span>{opt.text}</span>
                                <span style={{ fontWeight: 700 }}>
                                  {pct}% ({opt.votes})
                                </span>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                      <div
                        style={{
                          fontSize: 10.5,
                          color: "#6B7280",
                          marginTop: 6,
                          textAlign: "right",
                        }}
                      >
                        {m.poll.totalVotes} votes total
                      </div>
                    </div>
                  )}

                  {/* Location Card */}
                  {m.location && (
                    <div
                      style={{
                        background: "#FFFFFF",
                        border: "1px solid #E5E7EB",
                        borderRadius: 12,
                        padding: "10px",
                        margin: "4px 0",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 6,
                          fontWeight: 700,
                          fontSize: 12.5,
                          color: "#15803D",
                        }}
                      >
                        <MapPin size={15} />
                        <span>{m.location.title}</span>
                      </div>
                      <p style={{ fontSize: 11, color: "#6B7280", margin: "3px 0 0" }}>
                        {m.location.address}
                      </p>
                      <div style={{ fontSize: 10.5, color: "#9CA3AF", marginTop: 2 }}>
                        Coordinates: {m.location.coordinates}
                      </div>
                    </div>
                  )}

                  {/* Media Card */}
                  {m.media && (
                    <div style={{ borderRadius: 12, overflow: "hidden", margin: "4px 0" }}>
                      <img
                        src={m.media.url}
                        alt="Media attachment"
                        style={{ width: "100%", maxHeight: 180, objectFit: "cover", display: "block" }}
                      />
                      {m.media.caption && (
                        <div
                          style={{
                            background: "#FFFFFF",
                            padding: "6px 10px",
                            fontSize: 11.5,
                            color: "#374151",
                          }}
                        >
                          {m.media.caption}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Time + Blue Checkmarks */}
                  <small style={{ display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 3 }}>
                    <span>{m.time}</span>
                    <CheckCheck size={13} color="#2563EB" />
                  </small>
                </div>
              </div>
            );
          }

          // Incoming Messages
          return (
            <div key={m.id} className="ma-incoming">
              <img
                src={m.avatar}
                alt={m.sender}
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
                }}
              />
              <div>
                <div className="ma-sender">
                  {m.sender} {m.role && <i>({m.role})</i>}
                </div>
                <div className="ma-bubble">
                  {m.text && <p style={{ margin: "0 0 4px" }}>{m.text}</p>}
                  <small className="ma-time">{m.time}</small>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Attachment Pop-up Sheet (When clicking Paperclip) */}
      {showPinMenu && (
        <>
          <div
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 35,
            }}
            onClick={() => setShowPinMenu(false)}
          />
          <div
            style={{
              position: "fixed",
              bottom: 68,
              left: "50%",
              transform: "translateX(-50%)",
              width: "calc(100% - 24px)",
              maxWidth: 456,
              background: "#FFFFFF",
              borderRadius: 18,
              boxShadow: "0 10px 30px rgba(0,0,0,0.18)",
              padding: "14px 12px",
              zIndex: 40,
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 8,
              border: "1px solid #E5E7EB",
              animation: "adc-slide-up 0.18s ease-out",
            }}
          >
            {/* 1. Schedule Meeting */}
            <button
              type="button"
              onClick={() => {
                setShowPinMenu(false);
                setMeetingModal(true);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "#DBEAFE",
                  color: "#1D4ED8",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Video size={20} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#374151" }}>Meeting</span>
            </button>

            {/* 2. Create Poll */}
            <button
              type="button"
              onClick={() => {
                setShowPinMenu(false);
                setPollModal(true);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "#FEF3C7",
                  color: "#B45309",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <BarChart3 size={20} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#374151" }}>Poll</span>
            </button>

            {/* 3. Location */}
            <button
              type="button"
              onClick={() => {
                setShowPinMenu(false);
                setLocationModal(true);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "#DCFCE7",
                  color: "#15803D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <MapPin size={20} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#374151" }}>Location</span>
            </button>

            {/* 4. Media */}
            <button
              type="button"
              onClick={() => {
                setShowPinMenu(false);
                setMediaModal(true);
              }}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 6,
                background: "transparent",
                border: "none",
                cursor: "pointer",
              }}
            >
              <div
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "#F3E8FF",
                  color: "#7E22CE",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image size={20} />
              </div>
              <span style={{ fontSize: 11, fontWeight: 700, color: "#374151" }}>Media</span>
            </button>
          </div>
        </>
      )}

      {/* WhatsApp Styled Bottom Composer (Matches Student Dashboard) */}
      <form className="ma-composer" onSubmit={handleSend}>
        <button
          type="button"
          className="ma-composer-circle-btn"
          aria-label="Attachments"
          onClick={() => setShowPinMenu(!showPinMenu)}
        >
          <Paperclip size={20} />
        </button>

        <div className="ma-composer-capsule">
          <input
            placeholder="Type a message…"
            aria-label="Type a message"
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <div className="ma-composer-divider" />
          <button
            type="button"
            className="ma-composer-camera-btn"
            aria-label="Media camera"
            onClick={() => setMediaModal(true)}
          >
            <Camera size={20} />
          </button>
        </div>

        {text.trim() ? (
          <button
            type="submit"
            className="ma-composer-action-btn"
            aria-label="Send message"
          >
            <Send size={20} />
          </button>
        ) : (
          <button
            type="button"
            className="ma-composer-action-btn"
            aria-label="Record voice note"
            onClick={() => {
              sendMessage("🎤 Voice note · 0:12");
            }}
          >
            <Mic size={22} />
          </button>
        )}
      </form>

      {/* Modals for Pin Options */}
      {/* 1. Schedule Meeting Modal */}
      {meetingModal && (
        <div className="adc-modal-overlay" onClick={() => setMeetingModal(false)}>
          <div className="adc-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adc-modal-header">
              <h3 className="adc-modal-title">Schedule Google Meet</h3>
              <button className="adc-modal-close-btn" onClick={() => setMeetingModal(false)}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleScheduleSubmit}>
              <div className="adc-form-group">
                <label>Meeting Title</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={meetingTitle}
                  onChange={(e) => setMeetingTitle(e.target.value)}
                  required
                />
              </div>
              <div className="adc-form-group">
                <label>Description / Agenda</label>
                <textarea
                  className="adc-form-textarea"
                  value={meetingDesc}
                  onChange={(e) => setMeetingDesc(e.target.value)}
                />
              </div>
              <div className="adc-form-group">
                <label>Date</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={meetingDate}
                  onChange={(e) => setMeetingDate(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div className="adc-form-group">
                  <label>Start Time</label>
                  <input
                    type="text"
                    className="adc-form-input"
                    value={meetingStart}
                    onChange={(e) => setMeetingStart(e.target.value)}
                    required
                  />
                </div>
                <div className="adc-form-group">
                  <label>End Time</label>
                  <input
                    type="text"
                    className="adc-form-input"
                    value={meetingEnd}
                    onChange={(e) => setMeetingEnd(e.target.value)}
                    required
                  />
                </div>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button
                  type="button"
                  className="adc-btn-ghost"
                  style={{ flex: 1 }}
                  onClick={() => setMeetingModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adc-btn-primary" style={{ flex: 1.3 }}>
                  <Check size={16} /> Schedule &amp; Share
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Create Poll Modal */}
      {pollModal && (
        <div className="adc-modal-overlay" onClick={() => setPollModal(false)}>
          <div className="adc-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adc-modal-header">
              <h3 className="adc-modal-title">Create WhatsApp Community Poll</h3>
              <button className="adc-modal-close-btn" onClick={() => setPollModal(false)}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handlePollSubmit}>
              <div className="adc-form-group">
                <label>Poll Question</label>
                <input
                  type="text"
                  className="adc-form-input"
                  placeholder="Ask your community a question…"
                  value={pollQuestion}
                  onChange={(e) => setPollQuestion(e.target.value)}
                  required
                />
              </div>
              <div className="adc-form-group">
                <label>Options</label>
                {pollOptions.map((opt, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <input
                      type="text"
                      className="adc-form-input"
                      value={opt}
                      onChange={(e) => {
                        const next = [...pollOptions];
                        next[i] = e.target.value;
                        setPollOptions(next);
                      }}
                      placeholder={`Option ${i + 1}`}
                      required
                    />
                    {pollOptions.length > 2 && (
                      <button
                        type="button"
                        onClick={() => setPollOptions(pollOptions.filter((_, idx) => idx !== i))}
                        className="adc-modal-close-btn"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                ))}
                {pollOptions.length < 5 && (
                  <button
                    type="button"
                    onClick={() => setPollOptions([...pollOptions, ""])}
                    className="adc-btn-ghost"
                    style={{ width: "100%", marginTop: 4, fontSize: 12 }}
                  >
                    + Add Another Option
                  </button>
                )}
              </div>
              <div className="adc-form-group">
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={allowMultiple}
                    onChange={(e) => setAllowMultiple(e.target.checked)}
                    style={{ width: 16, height: 16, accentColor: "#FEC802" }}
                  />
                  <span>Allow multiple answers</span>
                </label>
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button
                  type="button"
                  className="adc-btn-ghost"
                  style={{ flex: 1 }}
                  onClick={() => setPollModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adc-btn-primary" style={{ flex: 1.3 }}>
                  <Check size={16} /> Create &amp; Post Poll
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Location Modal */}
      {locationModal && (
        <div className="adc-modal-overlay" onClick={() => setLocationModal(false)}>
          <div className="adc-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adc-modal-header">
              <h3 className="adc-modal-title">Share Event Location</h3>
              <button className="adc-modal-close-btn" onClick={() => setLocationModal(false)}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleLocationSubmit}>
              <div className="adc-form-group">
                <label>Venue / Location Name</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={locTitle}
                  onChange={(e) => setLocTitle(e.target.value)}
                  required
                />
              </div>
              <div className="adc-form-group">
                <label>Full Address</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={locAddress}
                  onChange={(e) => setLocAddress(e.target.value)}
                  required
                />
              </div>
              <div className="adc-form-group">
                <label>GPS Coordinates</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={locCoords}
                  onChange={(e) => setLocCoords(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button
                  type="button"
                  className="adc-btn-ghost"
                  style={{ flex: 1 }}
                  onClick={() => setLocationModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adc-btn-primary" style={{ flex: 1.3 }}>
                  <Check size={16} /> Share Location Pin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Media Modal */}
      {mediaModal && (
        <div className="adc-modal-overlay" onClick={() => setMediaModal(false)}>
          <div className="adc-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adc-modal-header">
              <h3 className="adc-modal-title">Share Photo / Document</h3>
              <button className="adc-modal-close-btn" onClick={() => setMediaModal(false)}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={handleMediaSubmit}>
              <div style={{ borderRadius: 12, overflow: "hidden", marginBottom: 12 }}>
                <img
                  src={selectedMedia}
                  alt="Selected"
                  style={{ width: "100%", height: 160, objectFit: "cover" }}
                />
              </div>
              <div className="adc-form-group">
                <label>Caption</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={mediaCaption}
                  onChange={(e) => setMediaCaption(e.target.value)}
                  required
                />
              </div>
              <div style={{ display: "flex", gap: 10, marginTop: 14 }}>
                <button
                  type="button"
                  className="adc-btn-ghost"
                  style={{ flex: 1 }}
                  onClick={() => setMediaModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="adc-btn-primary" style={{ flex: 1.3 }}>
                  <Check size={16} /> Share to Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
