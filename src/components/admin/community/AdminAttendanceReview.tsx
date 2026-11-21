import React, { useState, useMemo } from "react";
import { useAdminCommunity } from "./AdminCommunityState";
import {
  ArrowLeft,
  Search,
  CheckCircle2,
  XCircle,
  Clock,
  Download,
  Users,
  Award,
  Phone,
  FileText,
} from "lucide-react";

export const AdminAttendanceReview: React.FC = () => {
  const {
    selectedCommunity,
    attendanceList,
    exportAttendanceCsv,
    isExportingCsv,
    setActiveMgmtView,
  } = useAdminCommunity();

  const [activeTab, setActiveTab] = useState<"marked" | "not-marked">("marked");
  const [searchQuery, setSearchQuery] = useState("");

  const markedList = useMemo(
    () => attendanceList.filter((a) => a.status === "Marked"),
    [attendanceList]
  );
  const notMarkedList = useMemo(
    () => attendanceList.filter((a) => a.status === "Not Marked"),
    [attendanceList]
  );

  const displayedList = useMemo(() => {
    const base = activeTab === "marked" ? markedList : notMarkedList;
    if (!searchQuery.trim()) return base;
    const q = searchQuery.toLowerCase();
    return base.filter(
      (a) =>
        a.studentName.toLowerCase().includes(q) ||
        a.maatramId.toLowerCase().includes(q) ||
        a.college.toLowerCase().includes(q)
    );
  }, [activeTab, markedList, notMarkedList, searchQuery]);

  const totalRegistered = attendanceList.length;
  const markedCount = markedList.length;
  const notMarkedCount = notMarkedList.length;
  const attendanceRate = totalRegistered > 0 ? Math.round((markedCount / totalRegistered) * 100) : 0;

  return (
    <div style={{ padding: "16px", paddingBottom: "90px" }}>
      {/* Sub-view Navigation Header */}
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
            Attendance Review
          </h2>
          <p style={{ fontSize: 12, color: "#6B7280", margin: "2px 0 0" }}>
            {selectedCommunity.eventName} • {selectedCommunity.name}
          </p>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="adc-summary-grid">
        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Registered <Users size={14} color="#6B7280" />
          </span>
          <span className="adc-summary-card-value">{totalRegistered}</span>
          <span className="adc-summary-card-sub">Total enrolled scholars</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Marked <CheckCircle2 size={14} color="#15803D" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#15803D" }}>
            {markedCount}
          </span>
          <span className="adc-summary-card-sub">Verified on-site</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Not Marked <XCircle size={14} color="#DC2626" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#DC2626" }}>
            {notMarkedCount}
          </span>
          <span className="adc-summary-card-sub">Absent / Out of zone</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Turnout Rate <Award size={14} color="#D97706" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#D97706" }}>
            {attendanceRate}%
          </span>
          <span className="adc-summary-card-sub">Target: 80%+</span>
        </div>
      </div>

      {/* Search Input */}
      <div style={{ position: "relative", marginBottom: 14 }}>
        <Search
          size={16}
          style={{
            position: "absolute",
            left: 12,
            top: "50%",
            transform: "translateY(-50%)",
            color: "#9CA3AF",
          }}
        />
        <input
          type="text"
          placeholder="Search by student name or Maatram ID..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="adc-form-input"
          style={{ paddingLeft: 36, fontSize: 13 }}
        />
      </div>

      {/* Sub Tabs: Marked vs Not Marked */}
      <div className="adc-subtabs-row">
        <button
          className={`adc-subtab-btn ${activeTab === "marked" ? "is-active" : ""}`}
          onClick={() => setActiveTab("marked")}
        >
          <CheckCircle2 size={14} />
          Marked
          <span className="adc-subtab-badge">{markedCount}</span>
        </button>

        <button
          className={`adc-subtab-btn ${activeTab === "not-marked" ? "is-active" : ""}`}
          onClick={() => setActiveTab("not-marked")}
        >
          <XCircle size={14} />
          Not Marked
          <span className="adc-subtab-badge">{notMarkedCount}</span>
        </button>
      </div>

      {/* Volunteer Attendance Cards */}
      <div style={{ display: "flex", flexDirection: "column" }}>
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
            <FileText size={32} color="#9CA3AF" style={{ margin: "0 auto 8px" }} />
            <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: 0 }}>
              No scholars found
            </p>
            <p style={{ fontSize: 12, color: "#6B7280", margin: "4px 0 0" }}>
              Try adjusting your search criteria.
            </p>
          </div>
        ) : (
          displayedList.map((item) => (
            <div key={item.id} className="adc-record-card">
              <img
                src={item.avatar}
                alt={item.studentName}
                className="adc-record-avatar"
                onError={(e) => {
                  (e.target as HTMLImageElement).src =
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
                }}
              />
              <div className="adc-record-details">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <h4 className="adc-record-name">{item.studentName}</h4>
                  <span
                    style={{
                      fontSize: 10.5,
                      fontWeight: 800,
                      padding: "2px 8px",
                      borderRadius: 9999,
                      background: item.status === "Marked" ? "#DCFCE7" : "#FEE2E2",
                      color: item.status === "Marked" ? "#15803D" : "#DC2626",
                    }}
                  >
                    {item.status}
                  </span>
                </div>
                <p className="adc-record-meta">
                  <span style={{ fontWeight: 600, color: "#4B5563" }}>{item.maatramId}</span> •{" "}
                  {item.college}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: "#6B7280", display: "flex", alignItems: "center", gap: 4 }}>
                    <Phone size={11} /> {item.phone}
                  </span>
                  {item.status === "Marked" ? (
                    <span className="adc-record-timing">
                      <Clock size={11} /> {item.markedAt} • {item.hoursContributed} hrs
                    </span>
                  ) : (
                    <span className="adc-record-timing is-warning">
                      <XCircle size={11} /> Absent / Out of range
                    </span>
                  )}
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
          onClick={exportAttendanceCsv}
          disabled={isExportingCsv}
          style={{ opacity: isExportingCsv ? 0.75 : 1 }}
        >
          <Download size={18} />
          {isExportingCsv
            ? "Generating Spreadsheet..."
            : `Download Attendance G-Sheet (${markedCount} marked)`}
        </button>
      </div>
    </div>
  );
};
