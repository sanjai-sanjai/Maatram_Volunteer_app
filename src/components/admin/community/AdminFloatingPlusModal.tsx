import React, { useState } from "react";
import { useAdminCommunity } from "./AdminCommunityState";
import {
  Plus,
  CheckSquare,
  Camera,
  Video,
  UserPlus,
  X,
  Check,
} from "lucide-react";

export const AdminFloatingPlusModal: React.FC = () => {
  const {
    selectedCommunity,
    postAttendanceAnnouncement,
    postProofInstructionAnnouncement,
    scheduleMeeting,
    postExtraVolunteersAnnouncement,
  } = useAdminCommunity();

  const [isOpen, setIsOpen] = useState(false);
  const [activeModal, setActiveModal] = useState<
    "attendance" | "proof" | "meeting" | "recruit" | null
  >(null);

  // Form states
  // 1. Attendance Marking Form
  const [attEventName, setAttEventName] = useState(selectedCommunity.eventName);
  const [attLocation, setAttLocation] = useState(selectedCommunity.eventLocation);
  const [attRadius, setAttRadius] = useState("300 meters");
  const [attDate, setAttDate] = useState("Nov 02, 2026");
  const [attStartTime, setAttStartTime] = useState("09:00 AM");
  const [attEndTime, setAttEndTime] = useState("01:00 PM");
  const [attInstructions, setAttInstructions] = useState(
    "Mark attendance within 300m radius of event entrance upon arrival."
  );

  // 2. Proof Instructions Form
  const [proofTitle, setProofTitle] = useState(`${selectedCommunity.eventName} Proof Guidelines`);
  const [proofDesc, setProofDesc] = useState(
    "Submit your on-field activity photos with verified GPS geotags."
  );
  const [proofCount, setProofCount] = useState(2);
  const [proofGeotag, setProofGeotag] = useState(true);
  const [proofDeadline, setProofDeadline] = useState("Today, 04:00 PM");
  const [proofInstructions, setProofInstructions] = useState(
    "Ensure your volunteer badge and active work are clearly captured in daylight."
  );

  // 3. Meeting Form
  const [meetTitle, setMeetTitle] = useState(`Pre-Event Volunteer Briefing: ${selectedCommunity.name}`);
  const [meetDesc, setMeetDesc] = useState(
    "Reviewing role assignments, logistical guidelines, and emergency protocols."
  );
  const [meetDate, setMeetDate] = useState("Tomorrow");
  const [meetStart, setMeetStart] = useState("07:00 PM");
  const [meetEnd, setMeetEnd] = useState("08:00 PM");

  // 4. Recruit Extra Volunteers Form
  const [recRole, setRecRole] = useState("Crowd Coordination & Seed Bag Handling");
  const [recCount, setRecCount] = useState(15);
  const [recSkills, setRecSkills] = useState("Active physical agility & enthusiasm");
  const [recLocation, setRecLocation] = useState(selectedCommunity.eventLocation);
  const [recDate, setRecDate] = useState("Nov 02, 2026");
  const [recDesc, setRecDesc] = useState(
    "Due to increased community turnout, we need additional hands to help manage distribution!"
  );

  const handleOpenOption = (opt: "attendance" | "proof" | "meeting" | "recruit") => {
    setIsOpen(false);
    setActiveModal(opt);
  };

  const submitAttendance = (e: React.FormEvent) => {
    e.preventDefault();
    postAttendanceAnnouncement({
      eventName: attEventName,
      location: attLocation,
      radius: attRadius,
      date: attDate,
      startTime: attStartTime,
      endTime: attEndTime,
      instructions: attInstructions,
    });
    setActiveModal(null);
  };

  const submitProof = (e: React.FormEvent) => {
    e.preventDefault();
    postProofInstructionAnnouncement({
      title: proofTitle,
      description: proofDesc,
      photosRequired: proofCount,
      geotagRequired: proofGeotag,
      instructions: proofInstructions,
      deadline: proofDeadline,
    });
    setActiveModal(null);
  };

  const submitMeeting = (e: React.FormEvent) => {
    e.preventDefault();
    scheduleMeeting({
      title: meetTitle,
      description: meetDesc,
      date: meetDate,
      startTime: meetStart,
      endTime: meetEnd,
    });
    setActiveModal(null);
  };

  const submitRecruit = (e: React.FormEvent) => {
    e.preventDefault();
    postExtraVolunteersAnnouncement({
      requirement: recRole,
      count: recCount,
      skills: recSkills,
      location: recLocation,
      date: recDate,
      description: recDesc,
    });
    setActiveModal(null);
  };

  return (
    <>
      {/* Blurred / click-outside backdrop when FAB dropdown is open */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 42,
            background: "rgba(0, 0, 0, 0.25)",
            backdropFilter: "blur(4px)",
            WebkitBackdropFilter: "blur(4px)",
          }}
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Floating Action Button */}
      <div className="adc-fab-wrap">
        {/* Popup Menu */}
        {isOpen && (
          <div className="adc-fab-popup-menu">
            <button
              className="adc-fab-item"
              onClick={() => handleOpenOption("attendance")}
              type="button"
            >
              <div className="adc-fab-icon" style={{ color: "#15803D" }}>
                <CheckSquare size={18} />
              </div>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>Attendance Marking</strong>
                <span style={{ fontSize: 11, color: "#6B7280" }}>Broadcast attendance rules</span>
              </div>
            </button>

            <button
              className="adc-fab-item"
              onClick={() => handleOpenOption("proof")}
              type="button"
            >
              <div className="adc-fab-icon" style={{ color: "#B45309" }}>
                <Camera size={18} />
              </div>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>Proof Instructions</strong>
                <span style={{ fontSize: 11, color: "#6B7280" }}>Post guidelines & rules</span>
              </div>
            </button>

            <button
              className="adc-fab-item"
              onClick={() => handleOpenOption("meeting")}
              type="button"
            >
              <div className="adc-fab-icon" style={{ color: "#1D4ED8" }}>
                <Video size={18} />
              </div>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>Schedule Meeting</strong>
                <span style={{ fontSize: 11, color: "#6B7280" }}>Plan virtual volunteer call</span>
              </div>
            </button>

            <button
              className="adc-fab-item"
              onClick={() => handleOpenOption("recruit")}
              type="button"
            >
              <div className="adc-fab-icon" style={{ color: "#7E22CE" }}>
                <UserPlus size={18} />
              </div>
              <div>
                <strong style={{ fontSize: 13, display: "block" }}>Recruit Extra Volunteers</strong>
                <span style={{ fontSize: 11, color: "#6B7280" }}>Request emergency hands</span>
              </div>
            </button>
          </div>
        )}

        {/* Plus Button */}
        <button
          className={`adc-fab-btn ${isOpen ? "is-open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Admin Community Quick Actions"
        >
          <Plus size={26} />
        </button>
      </div>

      {/* 1. Attendance Marking Modal */}
      {activeModal === "attendance" && (
        <div className="adc-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="adc-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adc-modal-header">
              <h3 className="adc-modal-title">Configure Attendance Marking</h3>
              <button className="adc-modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={submitAttendance}>
              <div className="adc-form-group">
                <label>Event Name</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={attEventName}
                  onChange={(e) => setAttEventName(e.target.value)}
                  required
                />
              </div>

              <div className="adc-form-group">
                <label>Designated Location</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={attLocation}
                  onChange={(e) => setAttLocation(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div className="adc-form-group">
                  <label>Geofence Radius</label>
                  <select
                    className="adc-form-select"
                    value={attRadius}
                    onChange={(e) => setAttRadius(e.target.value)}
                  >
                    <option value="150 meters">150 meters</option>
                    <option value="300 meters">300 meters (Default)</option>
                    <option value="500 meters">500 meters</option>
                    <option value="1 kilometer">1 kilometer</option>
                  </select>
                </div>
                <div className="adc-form-group">
                  <label>Event Date</label>
                  <input
                    type="text"
                    className="adc-form-input"
                    value={attDate}
                    onChange={(e) => setAttDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div className="adc-form-group">
                  <label>Start Time</label>
                  <input
                    type="text"
                    className="adc-form-input"
                    value={attStartTime}
                    onChange={(e) => setAttStartTime(e.target.value)}
                    required
                  />
                </div>
                <div className="adc-form-group">
                  <label>End Time</label>
                  <input
                    type="text"
                    className="adc-form-input"
                    value={attEndTime}
                    onChange={(e) => setAttEndTime(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="adc-form-group">
                <label>Instructions for Scholars</label>
                <textarea
                  className="adc-form-textarea"
                  value={attInstructions}
                  onChange={(e) => setAttInstructions(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button
                  type="button"
                  className="adc-btn-ghost"
                  style={{ flex: 1 }}
                  onClick={() => setActiveModal(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="adc-btn-primary" style={{ flex: 1.3 }}>
                  <Check size={16} /> Publish to Chat
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Proof Instructions Modal */}
      {activeModal === "proof" && (
        <div className="adc-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="adc-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adc-modal-header">
              <h3 className="adc-modal-title">Configure Proof Instructions</h3>
              <button className="adc-modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={submitProof}>
              <div className="adc-form-group">
                <label>Guideline Title</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={proofTitle}
                  onChange={(e) => setProofTitle(e.target.value)}
                  required
                />
              </div>

              <div className="adc-form-group">
                <label>Description</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={proofDesc}
                  onChange={(e) => setProofDesc(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div className="adc-form-group">
                  <label>Min Photos Required</label>
                  <select
                    className="adc-form-select"
                    value={proofCount}
                    onChange={(e) => setProofCount(Number(e.target.value))}
                  >
                    <option value={1}>1 Photo</option>
                    <option value={2}>2 Photos (Recommended)</option>
                    <option value={3}>3 Photos</option>
                    <option value={5}>5 Photos</option>
                  </select>
                </div>
                <div className="adc-form-group">
                  <label>Submission Deadline</label>
                  <input
                    type="text"
                    className="adc-form-input"
                    value={proofDeadline}
                    onChange={(e) => setProofDeadline(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="adc-form-group">
                <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                  <input
                    type="checkbox"
                    checked={proofGeotag}
                    onChange={(e) => setProofGeotag(e.target.checked)}
                    style={{ width: 16, height: 16, accentColor: "#FEC802" }}
                  />
                  <span>Enforce live GPS Geotag watermark on camera capture</span>
                </label>
              </div>

              <div className="adc-form-group">
                <label>Photo Instructions for Scholars</label>
                <textarea
                  className="adc-form-textarea"
                  value={proofInstructions}
                  onChange={(e) => setProofInstructions(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button
                  type="button"
                  className="adc-btn-ghost"
                  style={{ flex: 1 }}
                  onClick={() => setActiveModal(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="adc-btn-primary" style={{ flex: 1.3 }}>
                  <Check size={16} /> Publish Guidelines
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 3. Schedule Meeting Modal */}
      {activeModal === "meeting" && (
        <div className="adc-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="adc-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adc-modal-header">
              <h3 className="adc-modal-title">Schedule Volunteer Meeting</h3>
              <button className="adc-modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={submitMeeting}>
              <div className="adc-form-group">
                <label>Meeting Title</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={meetTitle}
                  onChange={(e) => setMeetTitle(e.target.value)}
                  required
                />
              </div>

              <div className="adc-form-group">
                <label>Agenda / Description</label>
                <textarea
                  className="adc-form-textarea"
                  value={meetDesc}
                  onChange={(e) => setMeetDesc(e.target.value)}
                />
              </div>

              <div className="adc-form-group">
                <label>Date</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={meetDate}
                  onChange={(e) => setMeetDate(e.target.value)}
                  placeholder="e.g. Tomorrow or Nov 01, 2026"
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div className="adc-form-group">
                  <label>Start Time</label>
                  <input
                    type="text"
                    className="adc-form-input"
                    value={meetStart}
                    onChange={(e) => setMeetStart(e.target.value)}
                    required
                  />
                </div>
                <div className="adc-form-group">
                  <label>End Time</label>
                  <input
                    type="text"
                    className="adc-form-input"
                    value={meetEnd}
                    onChange={(e) => setMeetEnd(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button
                  type="button"
                  className="adc-btn-ghost"
                  style={{ flex: 1 }}
                  onClick={() => setActiveModal(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="adc-btn-primary" style={{ flex: 1.3 }}>
                  <Check size={16} /> Schedule & Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. Recruit Extra Volunteers Modal */}
      {activeModal === "recruit" && (
        <div className="adc-modal-overlay" onClick={() => setActiveModal(null)}>
          <div className="adc-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="adc-modal-header">
              <h3 className="adc-modal-title">Recruit Extra Volunteers</h3>
              <button className="adc-modal-close-btn" onClick={() => setActiveModal(null)}>
                <X size={16} />
              </button>
            </div>
            <form onSubmit={submitRecruit}>
              <div className="adc-form-group">
                <label>Role / Task Requirement</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={recRole}
                  onChange={(e) => setRecRole(e.target.value)}
                  required
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div className="adc-form-group">
                  <label>Extra Volunteers Needed</label>
                  <input
                    type="number"
                    min={1}
                    max={100}
                    className="adc-form-input"
                    value={recCount}
                    onChange={(e) => setRecCount(Number(e.target.value))}
                    required
                  />
                </div>
                <div className="adc-form-group">
                  <label>Event Date</label>
                  <input
                    type="text"
                    className="adc-form-input"
                    value={recDate}
                    onChange={(e) => setRecDate(e.target.value)}
                    required
                  />
                </div>
              </div>

              <div className="adc-form-group">
                <label>Location</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={recLocation}
                  onChange={(e) => setRecLocation(e.target.value)}
                  required
                />
              </div>

              <div className="adc-form-group">
                <label>Preferred Skills / Traits</label>
                <input
                  type="text"
                  className="adc-form-input"
                  value={recSkills}
                  onChange={(e) => setRecSkills(e.target.value)}
                  required
                />
              </div>

              <div className="adc-form-group">
                <label>Announcement Description</label>
                <textarea
                  className="adc-form-textarea"
                  value={recDesc}
                  onChange={(e) => setRecDesc(e.target.value)}
                />
              </div>

              <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
                <button
                  type="button"
                  className="adc-btn-ghost"
                  style={{ flex: 1 }}
                  onClick={() => setActiveModal(null)}
                >
                  Cancel
                </button>
                <button type="submit" className="adc-btn-primary" style={{ flex: 1.3 }}>
                  <Check size={16} /> Broadcast Call
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};
