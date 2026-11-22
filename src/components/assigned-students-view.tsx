import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  ArrowRight,
  Building2,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  Clock,
  ExternalLink,
  GraduationCap,
  MapPin,
  Navigation,
  Phone,
  PhoneCall,
  PlayCircle,
  Search,
  ShieldCheck,
  SlidersHorizontal,
  Users,
  X,
} from "lucide-react";
import { LiveDeviceCameraModal } from "@/components/chat-media-capture";
import { StudentVerificationDetail } from "@/components/student-verification-detail";
import {
  Candidate,
  StudentStatus,
  initialAssignedCandidates,
} from "@/data/assigned-students-mock";

export type { Candidate, StudentStatus };
export { initialAssignedCandidates };

export function AssignedStudentsView({
  community,
}: {
  community?: { id: string; name: string; category?: string };
}) {
  const [candidates, setCandidates] = useState<Candidate[]>(initialAssignedCandidates);
  const [activeFilter, setActiveFilter] = useState<"All" | "Pending" | "In Progress" | "Submitted">("All");
  const [search, setSearch] = useState("");
  const [detailCandidate, setDetailCandidate] = useState<Candidate | null>(null);
  const [selectedCandidate, setSelectedCandidate] = useState<Candidate | null>(null);
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Verification modal checklist state
  const [checkResidence, setCheckResidence] = useState(true);
  const [checkMarksheets, setCheckMarksheets] = useState(true);
  const [checkIncome, setCheckIncome] = useState(true);
  const [checkHouseCondition, setCheckHouseCondition] = useState(true);
  const [checkAadhaar, setCheckAadhaar] = useState(true);
  const [notes, setNotes] = useState("");
  const [proofPhoto, setProofPhoto] = useState<string | null>(null);

  const [totalCount, setTotalCount] = [candidates.length, () => {}];
  const submittedCount = candidates.filter((c) => c.status === "Submitted").length;
  const inProgressCount = candidates.filter((c) => c.status === "In Progress").length;
  const pendingCount = candidates.filter(
    (c) => c.status === "Assigned" || c.status === "Visit Scheduled" || c.status === "Revisit Required"
  ).length;
  const progressPercent = Math.round((submittedCount / candidates.length) * 100);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const studentId = new URLSearchParams(window.location.search).get("student");
      if (studentId) {
        const found = candidates.find((c) => c.id === studentId || c.applicationNo === studentId);
        if (found) setDetailCandidate(found);
      }
    }
  }, []);

  const openDetailsPage = (candidate: Candidate) => {
    setDetailCandidate(candidate);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.set("student", candidate.id);
      window.history.replaceState({}, "", url.toString());
      setTimeout(() => {
        const sc = document.querySelector(".ma-chat-scrollable-content");
        if (sc) sc.scrollTop = 0;
        window.scrollTo(0, 0);
      }, 0);
    }
  };

  const handleBackFromDetail = () => {
    setDetailCandidate(null);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      url.searchParams.delete("student");
      window.history.replaceState({}, "", url.toString());
    }
  };

  if (detailCandidate) {
    return (
      <StudentVerificationDetail
        candidate={detailCandidate}
        onBack={handleBackFromDetail}
        onUpdateStatus={(candidateId, newStatus, notes) => {
          setCandidates((prev) =>
            prev.map((c) =>
              c.id === candidateId
                ? {
                    ...c,
                    status: newStatus,
                    verifiedAt: "Today · Just now",
                    verifiedBy: "Sanjai R (You)",
                    verifiedNotes: notes,
                  }
                : c
            )
          );
          setDetailCandidate((prev) =>
            prev && prev.id === candidateId
              ? {
                  ...prev,
                  status: newStatus,
                  verifiedAt: "Today · Just now",
                  verifiedBy: "Sanjai R (You)",
                  verifiedNotes: notes,
                }
              : prev
          );
        }}
      />
    );
  }

  const filteredCandidates = candidates.filter((c) => {
    // 1. Status Filter
    if (activeFilter === "Pending") {
      if (c.status !== "Assigned" && c.status !== "Visit Scheduled" && c.status !== "Revisit Required") {
        return false;
      }
    } else if (activeFilter === "In Progress") {
      if (c.status !== "In Progress") return false;
    } else if (activeFilter === "Submitted") {
      if (c.status !== "Submitted") return false;
    }

    // 2. Search Query
    if (search.trim()) {
      const q = search.toLowerCase();
      const matchName = c.name.toLowerCase().includes(q);
      const matchApp = c.applicationNo.toLowerCase().includes(q);
      const matchLoc = c.location.toLowerCase().includes(q);
      const matchPhone = c.phone.toLowerCase().includes(q);
      return matchName || matchApp || matchLoc || matchPhone;
    }
    return true;
  });

  const openDetailsModal = (candidate: Candidate) => {
    setSelectedCandidate(candidate);
    setCheckResidence(true);
    setCheckMarksheets(true);
    setCheckIncome(true);
    setCheckHouseCondition(true);
    setCheckAadhaar(true);
    setProofPhoto(candidate.proofPhotoUrl || null);
    setNotes(
      candidate.verifiedNotes ||
        `On-site physical verification conducted for ${candidate.name} in ${candidate.location}. Inspected original academic marksheets and verified family living condition. Highly deserving scholar.`
    );
  };

  const submitVerification = () => {
    if (!selectedCandidate) return;

    setCandidates((prev) =>
      prev.map((c) => {
        if (c.id === selectedCandidate.id) {
          return {
            ...c,
            status: "Submitted",
            dateLabel: "Submitted On",
            dateValue: "Today · Just now",
            verifiedAt: "Today · Just now",
            verifiedBy: "Sanjai R (You)",
            verifiedNotes: notes,
            proofPhotoUrl: proofPhoto || c.photoUrl,
          };
        }
        return c;
      })
    );

    const name = selectedCandidate.name;
    setSelectedCandidate(null);
    setSuccessToast(`Physical verification for ${name} successfully submitted!`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="ma-assigned-container">
      {/* 1. Header Card: Assigned Student Candidates (Requested by user) */}
      <div className="ma-assigned-hero">
        <div className="ma-assigned-hero-top">
          <div>
            <div className="ma-assigned-tag">
              <ShieldCheck size={13} />
              <span>Physical Verification Drive</span>
            </div>
            <h2>Assigned Student Candidates</h2>
            <p>
              Verify assigned applicants on-site, inspect house conditions & authenticate certificates.
            </p>
          </div>
          <div className="ma-assigned-stat-circle">
            <span className="ma-stat-num">{progressPercent}%</span>
            <span className="ma-stat-sub">Done</span>
          </div>
        </div>

        {/* Metric Pills */}
        <div className="ma-assigned-metrics">
          <div className="ma-metric-item">
            <span className="ma-metric-val">{totalCount}</span>
            <span className="ma-metric-lbl">Total Assigned</span>
          </div>
          <div className="ma-metric-divider" />
          <div className="ma-metric-item is-verified">
            <span className="ma-metric-val">{submittedCount}</span>
            <span className="ma-metric-lbl">Submitted</span>
          </div>
          <div className="ma-metric-divider" />
          <div className="ma-metric-item is-pending">
            <span className="ma-metric-val">{pendingCount}</span>
            <span className="ma-metric-lbl">Pending Visits</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="ma-assigned-progress-wrap">
          <div className="ma-assigned-progress-bar">
            <div
              className="ma-assigned-progress-fill"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
          <div className="ma-assigned-progress-text">
            <span>{submittedCount} of {totalCount} verified</span>
            <span>{pendingCount} remaining</span>
          </div>
        </div>
      </div>

      {/* 2. Success Alert Banner */}
      {successToast && (
        <div className="ma-assigned-alert-success">
          <CheckCircle2 size={16} />
          <span>{successToast}</span>
          <button type="button" onClick={() => setSuccessToast(null)} aria-label="Dismiss">
            <X size={14} />
          </button>
        </div>
      )}

      {/* =========================================================================
          3. REFERENCE UI SECTION (Exact Match to User Reference Image)
          ========================================================================= */}

      {/* A. Search Bar */}
      <div className="ma-ref-search-wrap">
        <Search size={17} className="ma-ref-search-icon" />
        <input
          type="text"
          className="ma-ref-search-input"
          placeholder="Search by student name or application ID..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search && (
          <button
            type="button"
            className="ma-ref-search-clear"
            onClick={() => setSearch("")}
            aria-label="Clear search"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* B. Filter Pills Row */}
      <div className="ma-ref-filters-row">
        <div className="ma-ref-filters-list" role="tablist" aria-label="Student filters">
          <button
            type="button"
            className={`ma-ref-filter-pill ${activeFilter === "All" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("All")}
          >
            All ({totalCount})
          </button>
          <button
            type="button"
            className={`ma-ref-filter-pill ${activeFilter === "Pending" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("Pending")}
          >
            Pending
          </button>
          <button
            type="button"
            className={`ma-ref-filter-pill ${activeFilter === "In Progress" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("In Progress")}
          >
            In Progress
          </button>
          <button
            type="button"
            className={`ma-ref-filter-pill ${activeFilter === "Submitted" ? "is-active" : ""}`}
            onClick={() => setActiveFilter("Submitted")}
          >
            Submitted
          </button>
        </div>

        <button
          type="button"
          className="ma-ref-filter-icon-btn"
          aria-label="Filter options"
          onClick={() => setActiveFilter("All")}
        >
          <SlidersHorizontal size={17} />
        </button>
      </div>

      {/* C. Student Cards List (Exact match to reference image) */}
      <div className="ma-ref-cards-list">
        {filteredCandidates.length === 0 ? (
          <div className="ma-assigned-empty">
            <Users size={36} />
            <h3>No candidates found</h3>
            <p>Try searching with another name or clearing the filter.</p>
          </div>
        ) : (
          filteredCandidates.map((student) => (
            <div
              key={student.id}
              className="ma-ref-card"
              onClick={() => openDetailsPage(student)}
              style={{ cursor: "pointer" }}
            >
              {/* Left Column: Photo of Tamil student */}
              <div className="ma-ref-photo-box">
                <img
                  src={student.photoUrl}
                  alt={student.name}
                  className="ma-ref-photo-img"
                  onError={(e) => {
                    // Fallback to student portrait if asset path requires fallback
                    (e.target as HTMLImageElement).src = "/assets/photos/student-portrait.jpg";
                  }}
                />
              </div>

              {/* Middle Column: Student Name, App ID, Location & Phone */}
              <div className="ma-ref-mid-info">
                <h3 className="ma-ref-student-name">{student.name}</h3>
                <span className="ma-ref-app-id">App ID: {student.applicationNo}</span>

                <div className="ma-ref-meta-row">
                  <MapPin size={13} className="ma-ref-meta-icon" />
                  <span>{student.location}</span>
                </div>

                <div className="ma-ref-meta-row">
                  <Phone size={13} className="ma-ref-meta-icon" />
                  <span>{student.phone}</span>
                </div>
              </div>

              {/* Right Column: Status Badge, Date Info & View Details Button */}
              <div className="ma-ref-right-col">
                {/* Status Badge */}
                {student.status === "Assigned" && (
                  <span className="ma-ref-status-badge is-assigned">
                    <Clock size={12} strokeWidth={2.5} />
                    <span>Assigned</span>
                  </span>
                )}
                {student.status === "Visit Scheduled" && (
                  <span className="ma-ref-status-badge is-scheduled">
                    <Calendar size={12} strokeWidth={2.5} />
                    <span>Visit Scheduled</span>
                  </span>
                )}
                {student.status === "In Progress" && (
                  <span className="ma-ref-status-badge is-progress">
                    <PlayCircle size={12} strokeWidth={2.5} />
                    <span>In Progress</span>
                  </span>
                )}
                {student.status === "Submitted" && (
                  <span className="ma-ref-status-badge is-submitted">
                    <CheckCircle2 size={12} strokeWidth={2.5} />
                    <span>Submitted</span>
                  </span>
                )}
                {student.status === "Revisit Required" && (
                  <span className="ma-ref-status-badge is-revisit">
                    <AlertCircle size={12} strokeWidth={2.5} />
                    <span>Revisit Required</span>
                  </span>
                )}

                {/* Date Row */}
                <div className="ma-ref-date-box">
                  <span className="ma-ref-date-label">
                    {student.status === "Assigned" && (
                      <Calendar size={11} className="ma-ref-date-icon" />
                    )}
                    {student.dateLabel}
                  </span>
                  <span className="ma-ref-date-value">{student.dateValue}</span>
                </div>

                {/* View Details Button */}
                <button
                  type="button"
                  className="ma-ref-view-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    openDetailsPage(student);
                  }}
                  aria-label={`View details for ${student.name}`}
                >
                  <span>View Details</span>
                  <ArrowRight size={13} strokeWidth={2.6} />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* =========================================================================
          4. INTERACTIVE DETAILS & VERIFICATION MODAL
          ========================================================================= */}
      {selectedCandidate && (
        <div className="ma-assigned-modal-backdrop" onClick={() => setSelectedCandidate(null)}>
          <div
            className="ma-assigned-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-ref-title"
          >
            {/* Modal Head */}
            <div className="ma-assigned-modal-head">
              <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <img
                  src={selectedCandidate.photoUrl}
                  alt={selectedCandidate.name}
                  style={{
                    width: 46,
                    height: 54,
                    borderRadius: 10,
                    objectFit: "cover",
                    background: "#BAE6FD",
                  }}
                />
                <div>
                  <h3 id="modal-ref-title">{selectedCandidate.name}</h3>
                  <p>
                    {selectedCandidate.applicationNo} · {selectedCandidate.location}
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="ma-modal-close-btn"
                onClick={() => setSelectedCandidate(null)}
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>

            {/* Modal Body */}
            <div className="ma-assigned-modal-body">
              {/* Quick Actions Row: Call & Directions */}
              <div className="ma-ref-modal-actions-bar">
                <a
                  href={`tel:${selectedCandidate.phone.replace(/\s+/g, "")}`}
                  className="ma-ref-action-link"
                >
                  <Phone size={14} /> Call Candidate
                </a>
                <a
                  href={`tel:${selectedCandidate.parentPhone.replace(/\s+/g, "")}`}
                  className="ma-ref-action-link"
                >
                  <PhoneCall size={14} /> Call Parent
                </a>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    selectedCandidate.address
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="ma-ref-action-link is-map"
                >
                  <Navigation size={14} /> Directions
                </a>
              </div>

              {/* Candidate Info Grid */}
              <div className="ma-verify-report-grid">
                <div className="ma-report-col">
                  <span className="ma-r-lbl">12th Score</span>
                  <span className="ma-r-val">
                    {selectedCandidate.twelfthScore} ({selectedCandidate.percentage})
                  </span>
                </div>
                <div className="ma-report-col">
                  <span className="ma-r-lbl">Desired Course</span>
                  <span className="ma-r-val">{selectedCandidate.desiredCourse}</span>
                </div>
                <div className="ma-report-col">
                  <span className="ma-r-lbl">Annual Income</span>
                  <span className="ma-r-val">{selectedCandidate.annualIncome}</span>
                </div>
                <div className="ma-report-col">
                  <span className="ma-r-lbl">Parent Occupation</span>
                  <span className="ma-r-val">{selectedCandidate.parentOccupation}</span>
                </div>
              </div>

              {/* Address */}
              <div className="ma-verify-section">
                <h4>Home Residence Address</h4>
                <p className="ma-report-p">{selectedCandidate.address}</p>
              </div>

              {/* Physical Audit Checklist */}
              <div className="ma-verify-section">
                <h4>On-Site Physical Verification Checklist</h4>
                <div className="ma-verify-checklist">
                  <label className="ma-check-item">
                    <input
                      type="checkbox"
                      checked={checkResidence}
                      onChange={(e) => setCheckResidence(e.target.checked)}
                    />
                    <span>
                      <strong>Candidate Residence Verified:</strong> Confirmed physical address and student living with family.
                    </span>
                  </label>

                  <label className="ma-check-item">
                    <input
                      type="checkbox"
                      checked={checkMarksheets}
                      onChange={(e) => setCheckMarksheets(e.target.checked)}
                    />
                    <span>
                      <strong>Academic Credentials Authenticated:</strong> 10th & 12th original marksheets inspected ({selectedCandidate.percentage}).
                    </span>
                  </label>

                  <label className="ma-check-item">
                    <input
                      type="checkbox"
                      checked={checkIncome}
                      onChange={(e) => setCheckIncome(e.target.checked)}
                    />
                    <span>
                      <strong>Income Certificate Validated:</strong> Family annual income {selectedCandidate.annualIncome} verified via ration card ({selectedCandidate.rationCardType}).
                    </span>
                  </label>

                  <label className="ma-check-item">
                    <input
                      type="checkbox"
                      checked={checkHouseCondition}
                      onChange={(e) => setCheckHouseCondition(e.target.checked)}
                    />
                    <span>
                      <strong>Living Condition Assessed:</strong> Basic amenities, rural need and living environment evaluated.
                    </span>
                  </label>

                  <label className="ma-check-item">
                    <input
                      type="checkbox"
                      checked={checkAadhaar}
                      onChange={(e) => setCheckAadhaar(e.target.checked)}
                    />
                    <span>
                      <strong>Identity Confirmed:</strong> Candidate & parent Aadhaar verified.
                    </span>
                  </label>
                </div>
              </div>

              {/* Geotag Photo Section */}
              <div className="ma-verify-section">
                <h4>Residence Geotagged Photo</h4>
                {proofPhoto ? (
                  <div className="ma-verify-photo-preview">
                    <img src={proofPhoto} alt="Captured residence proof" />
                    <div className="ma-geotag-watermark-strip">
                      <div className="ma-watermark-row">
                        <MapPin size={12} color="#FEC802" />
                        <span>Maatram Foundation Geotag Verified</span>
                      </div>
                      <small>{selectedCandidate.location} · Verified GPS Residence</small>
                    </div>
                    <button
                      type="button"
                      className="ma-retake-photo-btn"
                      onClick={() => setCameraModalOpen(true)}
                    >
                      <Camera size={13} /> Retake Photo
                    </button>
                  </div>
                ) : (
                  <div className="ma-verify-photo-placeholder">
                    <Camera size={28} />
                    <p>Capture on-site photo outside student residence with GPS geotag watermark.</p>
                    <button
                      type="button"
                      className="ma-capture-btn"
                      onClick={() => setCameraModalOpen(true)}
                    >
                      <Camera size={14} /> Open Device Camera
                    </button>
                  </div>
                )}
              </div>

              {/* Volunteer Observations */}
              <div className="ma-verify-section">
                <h4>Volunteer Observations & Remarks</h4>
                <textarea
                  className="ma-verify-textarea"
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter remarks regarding candidate background, living conditions, motivation..."
                />
              </div>
            </div>

            {/* Modal Foot */}
            <div className="ma-assigned-modal-foot">
              <button
                type="button"
                className="ma-modal-btn-cancel"
                onClick={() => setSelectedCandidate(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="ma-modal-btn-submit"
                onClick={submitVerification}
                disabled={!checkResidence || !checkMarksheets || !checkIncome}
              >
                <ShieldCheck size={16} />
                <span>Submit & Approve Verification</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 5. Live Device Camera Modal for Geotag Capture */}
      <LiveDeviceCameraModal
        open={cameraModalOpen}
        onClose={() => setCameraModalOpen(false)}
        title="Capture Residence Verification Photo"
        withGeotag={true}
        eventDetails={{
          communityName: community?.name || "Physical Verification Team",
          eventName: "Candidate Home Verification",
          address: selectedCandidate?.address || "Tamil Nadu, India",
          lat: 11.0168,
          lng: 76.9558,
        }}
        onCapture={(dataUrl) => {
          setProofPhoto(dataUrl);
          setCameraModalOpen(false);
        }}
      />
    </div>
  );
}
