import React, { useState, useMemo } from "react";
import { useAdminCommunity } from "./AdminCommunityState";
import { FundingRequest } from "@/data/admin-community-mock";
import {
  ArrowLeft,
  DollarSign,
  Clock,
  CheckCircle2,
  XCircle,
  FileText,
  X,
  Check,
  CreditCard,
  Tag,
} from "lucide-react";

export const AdminRequestedFunds: React.FC = () => {
  const {
    selectedCommunity,
    fundsList,
    proceedFundingRequest,
    rejectFundingRequest,
    setActiveMgmtView,
  } = useAdminCommunity();

  const [activeFilter, setActiveFilter] = useState<"all" | "pending" | "approved" | "rejected">("all");
  const [selectedReceipt, setSelectedReceipt] = useState<FundingRequest | null>(null);
  const [approvingRequest, setApprovingRequest] = useState<FundingRequest | null>(null);
  const [rejectingRequest, setRejectingRequest] = useState<FundingRequest | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [quickReason, setQuickReason] = useState("Receipt image is unclear or missing details");

  const totalRequested = fundsList.reduce((acc, f) => acc + f.amount, 0);
  const totalApproved = fundsList
    .filter((f) => f.status === "approved")
    .reduce((acc, f) => acc + f.amount, 0);
  const pendingCount = fundsList.filter((f) => f.status === "pending").length;
  const rejectedCount = fundsList.filter((f) => f.status === "rejected").length;

  const filteredList = useMemo(() => {
    if (activeFilter === "all") return fundsList;
    return fundsList.filter((f) => f.status === activeFilter);
  }, [fundsList, activeFilter]);

  const handleConfirmApprove = () => {
    if (!approvingRequest) return;
    proceedFundingRequest(approvingRequest.id);
    setApprovingRequest(null);
  };

  const handleConfirmReject = () => {
    if (!rejectingRequest) return;
    const finalReason = rejectReason.trim() ? rejectReason.trim() : quickReason;
    rejectFundingRequest(rejectingRequest.id, finalReason);
    setRejectingRequest(null);
    setRejectReason("");
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
            Requested Funds
          </h2>
          <p style={{ fontSize: 12, color: "#6B7280", margin: "2px 0 0" }}>
            {selectedCommunity.eventName} • Expense Approvals
          </p>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="adc-summary-grid">
        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Total Claims <DollarSign size={14} color="#6B7280" />
          </span>
          <span className="adc-summary-card-value">₹{totalRequested.toLocaleString()}</span>
          <span className="adc-summary-card-sub">{fundsList.length} total claims</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Pending <Clock size={14} color="#D97706" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#D97706" }}>
            {pendingCount}
          </span>
          <span className="adc-summary-card-sub">Awaiting decision</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Disbursed <CheckCircle2 size={14} color="#15803D" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#15803D" }}>
            ₹{totalApproved.toLocaleString()}
          </span>
          <span className="adc-summary-card-sub">Approved & forwarded</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Rejected <XCircle size={14} color="#DC2626" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#DC2626" }}>
            {rejectedCount}
          </span>
          <span className="adc-summary-card-sub">Declined claims</span>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="adc-subtabs-row">
        {(["all", "pending", "approved", "rejected"] as const).map((tab) => (
          <button
            key={tab}
            className={`adc-subtab-btn ${activeFilter === tab ? "is-active" : ""}`}
            onClick={() => setActiveFilter(tab)}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Claims List */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {filteredList.length === 0 ? (
          <div
            style={{
              padding: "40px 20px",
              textAlign: "center",
              background: "#F9FAFB",
              borderRadius: 16,
              border: "1px dashed #D1D5DB",
            }}
          >
            <CreditCard size={32} color="#9CA3AF" style={{ margin: "0 auto 8px" }} />
            <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: 0 }}>
              No claims in {activeFilter}
            </p>
          </div>
        ) : (
          filteredList.map((item) => (
            <div
              key={item.id}
              style={{
                background: "#FFFFFF",
                border: "1px solid #E5E7EB",
                borderRadius: 18,
                padding: "16px",
                boxShadow: "0 2px 6px rgba(0,0,0,0.02)",
              }}
            >
              {/* Header */}
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                <img
                  src={item.avatar}
                  alt={item.studentName}
                  style={{ width: 44, height: 44, borderRadius: "50%", objectFit: "cover" }}
                  onError={(e) => {
                    (e.target as HTMLImageElement).src =
                      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80";
                  }}
                />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <h4 style={{ fontSize: 14.5, fontWeight: 700, color: "#111827", margin: 0 }}>
                      {item.studentName}
                    </h4>
                    <span
                      style={{
                        fontSize: 16,
                        fontWeight: 800,
                        color: "#111827",
                      }}
                    >
                      ₹{item.amount.toLocaleString()}
                    </span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                    <span style={{ fontSize: 11.5, color: "#6B7280" }}>{item.maatramId}</span>
                    <span style={{ fontSize: 11.5, color: "#9CA3AF" }}>•</span>
                    <span style={{ fontSize: 11.5, color: "#6B7280" }}>{item.date || item.submittedAt}</span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "1px 6px",
                        borderRadius: 6,
                        background: "#EFF6FF",
                        color: "#1D4ED8",
                        display: "inline-flex",
                        alignItems: "center",
                        gap: 3,
                      }}
                    >
                      <Tag size={9} /> {item.category || item.purpose}
                    </span>
                  </div>
                </div>
              </div>

              {/* Purpose & Description */}
              <div
                style={{
                  background: "#F9FAFB",
                  borderRadius: 12,
                  padding: "10px 12px",
                  marginBottom: 12,
                }}
              >
                <div style={{ fontSize: 12.5, fontWeight: 700, color: "#1F2937", marginBottom: 2 }}>
                  {item.purpose}
                </div>
                <div style={{ fontSize: 12, color: "#4B5563", lineHeight: 1.4 }}>
                  {item.description}
                </div>
                {item.upiId && (
                  <div
                    style={{
                      fontSize: 11.5,
                      color: "#6B7280",
                      marginTop: 6,
                      display: "flex",
                      alignItems: "center",
                      gap: 4,
                    }}
                  >
                    <CreditCard size={12} color="#4B5563" />
                    <strong>UPI:</strong> {item.upiId}
                  </div>
                )}
              </div>

              {/* Receipt thumbnail button */}
              {item.receiptUrl && (
                <div style={{ marginBottom: 12 }}>
                  <button
                    onClick={() => setSelectedReceipt(item)}
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: 6,
                      border: "1px dashed #CBD5E1",
                      borderRadius: 10,
                      background: "#F8FAFC",
                      padding: "6px 10px",
                      cursor: "pointer",
                      fontSize: 11.5,
                      fontWeight: 600,
                      color: "#2563EB",
                    }}
                  >
                    <FileText size={13} /> View Attached Bill / Receipt
                  </button>
                </div>
              )}

              {/* Rejection notice */}
              {item.status === "rejected" && item.rejectionReason && (
                <div
                  style={{
                    background: "#FEF2F2",
                    border: "1px solid #FCA5A5",
                    borderRadius: 10,
                    padding: "8px 10px",
                    marginBottom: 12,
                    fontSize: 11.5,
                    color: "#991B1B",
                  }}
                >
                  <strong>Declined Reason:</strong> {item.rejectionReason}
                </div>
              )}

              {/* Status or Action Buttons */}
              {item.status === "pending" ? (
                <div style={{ display: "flex", gap: 8 }}>
                  <button
                    className="adc-btn-danger"
                    style={{ flex: 1, padding: "8px 10px", fontSize: 12.5 }}
                    onClick={() => {
                      setRejectingRequest(item);
                      setRejectReason("");
                    }}
                  >
                    <X size={14} /> Reject
                  </button>
                  <button
                    className="adc-btn-primary"
                    style={{ flex: 1.2, padding: "8px 10px", fontSize: 12.5 }}
                    onClick={() => setApprovingRequest(item)}
                  >
                    <Check size={14} /> Proceed (Approve)
                  </button>
                </div>
              ) : (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    padding: "6px 12px",
                    borderRadius: 10,
                    fontSize: 12,
                    fontWeight: 700,
                    background: item.status === "approved" ? "#DCFCE7" : "#FEE2E2",
                    color: item.status === "approved" ? "#15803D" : "#DC2626",
                    gap: 6,
                  }}
                >
                  {item.status === "approved" ? (
                    <>
                      <CheckCircle2 size={14} /> Approved & Disbursed (₹{item.amount})
                    </>
                  ) : (
                    <>
                      <XCircle size={14} /> Claim Rejected
                    </>
                  )}
                </div>
              )}
            </div>
          ))
        )}
      </div>

      {/* Bill/Receipt Preview Modal */}
      {selectedReceipt && (
        <div className="adc-modal-overlay" onClick={() => setSelectedReceipt(null)}>
          <div
            className="adc-modal-card"
            style={{ maxWidth: 420 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="adc-modal-header">
              <h3 className="adc-modal-title">Expense Receipt</h3>
              <button className="adc-modal-close-btn" onClick={() => setSelectedReceipt(null)}>
                <X size={16} />
              </button>
            </div>
            <div style={{ borderRadius: 14, overflow: "hidden", marginBottom: 14 }}>
              <img
                src={selectedReceipt.receiptUrl}
                alt="Receipt"
                style={{ width: "100%", height: 300, objectFit: "contain", background: "#F1F5F9" }}
              />
            </div>
            <div style={{ fontSize: 12, color: "#6B7280", textAlign: "center" }}>
              Uploaded by {selectedReceipt.studentName} for ₹{selectedReceipt.amount}
            </div>
          </div>
        </div>
      )}

      {/* Proceed / Approve Confirmation Modal */}
      {approvingRequest && (
        <div className="adc-modal-overlay" onClick={() => setApprovingRequest(null)}>
          <div
            className="adc-modal-card"
            style={{ maxWidth: 400 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="adc-modal-header">
              <h3 className="adc-modal-title" style={{ color: "#15803D" }}>
                Confirm Disbursal
              </h3>
              <button className="adc-modal-close-btn" onClick={() => setApprovingRequest(null)}>
                <X size={16} />
              </button>
            </div>
            <p style={{ fontSize: 13, color: "#374151", margin: "0 0 12px" }}>
              Are you sure you want to approve funding of{" "}
              <strong style={{ fontSize: 15, color: "#111827" }}>
                ₹{approvingRequest.amount}
              </strong>{" "}
              for <strong>{approvingRequest.studentName}</strong>?
            </p>
            <div
              style={{
                background: "#F9FAFB",
                borderRadius: 12,
                padding: "12px",
                marginBottom: 16,
                fontSize: 12,
                color: "#4B5563",
              }}
            >
              <div><strong>Purpose:</strong> {approvingRequest.purpose}</div>
              <div><strong>UPI ID:</strong> {approvingRequest.upiId ?? "On record"}</div>
              <div style={{ marginTop: 6, color: "#15803D", fontWeight: 600 }}>
                ✓ Once approved, this request is immediately transmitted to the Maatram Accounts Desk.
              </div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="adc-btn-ghost" style={{ flex: 1 }} onClick={() => setApprovingRequest(null)}>
                Cancel
              </button>
              <button className="adc-btn-primary" style={{ flex: 1.2 }} onClick={handleConfirmApprove}>
                <CheckCircle2 size={16} /> Confirm & Approve
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Reject Reason Modal */}
      {rejectingRequest && (
        <div className="adc-modal-overlay" onClick={() => setRejectingRequest(null)}>
          <div
            className="adc-modal-card"
            style={{ maxWidth: 400 }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="adc-modal-header">
              <h3 className="adc-modal-title" style={{ color: "#DC2626" }}>
                Decline Claim
              </h3>
              <button className="adc-modal-close-btn" onClick={() => setRejectingRequest(null)}>
                <X size={16} />
              </button>
            </div>
            <div className="adc-form-group">
              <label>Reason for rejection</label>
              <select
                className="adc-form-select"
                value={quickReason}
                onChange={(e) => setQuickReason(e.target.value)}
              >
                <option value="Receipt image is unclear or missing details">
                  Receipt image is unclear or missing details
                </option>
                <option value="Expense not eligible under volunteer guidelines">
                  Expense not eligible under volunteer guidelines
                </option>
                <option value="Amount exceeds approved budget for category">
                  Amount exceeds approved budget for category
                </option>
                <option value="Duplicate claim already processed">
                  Duplicate claim already processed
                </option>
              </select>
            </div>
            <div className="adc-form-group">
              <label>Additional Note</label>
              <textarea
                className="adc-form-textarea"
                placeholder="Give constructive feedback so the student understands..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
              />
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button className="adc-btn-ghost" style={{ flex: 1 }} onClick={() => setRejectingRequest(null)}>
                Cancel
              </button>
              <button className="adc-btn-danger" style={{ flex: 1 }} onClick={handleConfirmReject}>
                Confirm Decline
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
