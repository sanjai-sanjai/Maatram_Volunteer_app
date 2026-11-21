import React, { useState, useMemo } from "react";
import { useAdminCommunity } from "./AdminCommunityState";
import {
  ArrowLeft,
  Star,
  MessageSquare,
  Send,
  AlertCircle,
  HelpCircle,
  CornerDownRight,
} from "lucide-react";

export const AdminFeedbackReview: React.FC = () => {
  const {
    selectedCommunity,
    feedbackList,
    replyFeedback,
    setActiveMgmtView,
  } = useAdminCommunity();

  const [activeCategory, setActiveCategory] = useState<"All" | "Positive" | "Suggestions" | "Issues">("All");
  const [replyInputs, setReplyInputs] = useState<Record<string, string>>({});

  const totalCount = feedbackList.length;
  const avgRating =
    totalCount > 0
      ? (feedbackList.reduce((acc, f) => acc + f.rating, 0) / totalCount).toFixed(1)
      : "5.0";
  const suggestionsCount = feedbackList.filter((f) => f.category === "Suggestions" || (f.category as string) === "Suggestion").length;
  const issuesCount = feedbackList.filter((f) => f.category === "Issues" || (f.category as string) === "Issue").length;

  const filteredList = useMemo(() => {
    if (activeCategory === "All") return feedbackList;
    if (activeCategory === "Suggestions") {
      return feedbackList.filter((f) => f.category === "Suggestions" || (f.category as string) === "Suggestion");
    }
    if (activeCategory === "Issues") {
      return feedbackList.filter((f) => f.category === "Issues" || (f.category as string) === "Issue");
    }
    return feedbackList.filter((f) => f.category === activeCategory);
  }, [feedbackList, activeCategory]);

  const handleSendReply = (feedbackId: string) => {
    const text = replyInputs[feedbackId];
    if (!text || !text.trim()) return;
    replyFeedback(feedbackId, text);
    setReplyInputs((prev) => ({ ...prev, [feedbackId]: "" }));
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
            Feedback Review
          </h2>
          <p style={{ fontSize: 12, color: "#6B7280", margin: "2px 0 0" }}>
            {selectedCommunity.eventName} • Volunteer Voices
          </p>
        </div>
      </div>

      {/* 4 Summary Stat Cards */}
      <div className="adc-summary-grid">
        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Responses <MessageSquare size={14} color="#6B7280" />
          </span>
          <span className="adc-summary-card-value">{totalCount}</span>
          <span className="adc-summary-card-sub">Total feedback submissions</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Avg Rating <Star size={14} color="#EAB308" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#EAB308" }}>
            {avgRating} ★
          </span>
          <span className="adc-summary-card-sub">Out of 5.0 rating</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Suggestions <HelpCircle size={14} color="#2563EB" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#2563EB" }}>
            {suggestionsCount}
          </span>
          <span className="adc-summary-card-sub">Improvement ideas</span>
        </div>

        <div className="adc-summary-card">
          <span className="adc-summary-card-title">
            Issues <AlertCircle size={14} color="#DC2626" />
          </span>
          <span className="adc-summary-card-value" style={{ color: "#DC2626" }}>
            {issuesCount}
          </span>
          <span className="adc-summary-card-sub">Action required</span>
        </div>
      </div>

      {/* Filter Category Pills */}
      <div style={{ display: "flex", gap: 8, overflowX: "auto", paddingBottom: 6, marginBottom: 14 }}>
        {(["All", "Positive", "Suggestions", "Issues"] as const).map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            style={{
              padding: "6px 14px",
              borderRadius: 9999,
              border: activeCategory === cat ? "1.5px solid #111827" : "1px solid #E5E7EB",
              background: activeCategory === cat ? "#111827" : "#FFFFFF",
              color: activeCategory === cat ? "#FFFFFF" : "#4B5563",
              fontSize: 12.5,
              fontWeight: 700,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.15s ease",
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Feedback List */}
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
            <MessageSquare size={32} color="#9CA3AF" style={{ margin: "0 auto 8px" }} />
            <p style={{ fontSize: 14, fontWeight: 700, color: "#374151", margin: 0 }}>
              No feedback in {activeCategory}
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
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
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
                    {/* Star rating */}
                    <div style={{ display: "flex", alignItems: "center", gap: 2 }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={13}
                          fill={star <= item.rating ? "#FEC802" : "none"}
                          color={star <= item.rating ? "#FEC802" : "#D1D5DB"}
                        />
                      ))}
                    </div>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                    <span style={{ fontSize: 11.5, color: "#6B7280" }}>{item.college || "Maatram Foundation"}</span>
                    <span style={{ fontSize: 11.5, color: "#9CA3AF" }}>•</span>
                    <span style={{ fontSize: 11, color: "#9CA3AF" }}>{item.submittedAt}</span>
                    <span
                      style={{
                        fontSize: 10,
                        fontWeight: 700,
                        padding: "1px 6px",
                        borderRadius: 6,
                        background:
                          item.category === "Positive"
                            ? "#DCFCE7"
                            : item.category.startsWith("Suggestion")
                            ? "#EFF6FF"
                            : "#FEE2E2",
                        color:
                          item.category === "Positive"
                            ? "#15803D"
                            : item.category.startsWith("Suggestion")
                            ? "#1D4ED8"
                            : "#DC2626",
                      }}
                    >
                      {item.category}
                    </span>
                  </div>
                </div>
              </div>

              {/* Feedback Comment */}
              <div
                style={{
                  fontSize: 13,
                  color: "#374151",
                  lineHeight: 1.45,
                  padding: "10px 12px",
                  background: "#F9FAFB",
                  borderRadius: 12,
                  marginBottom: 10,
                }}
              >
                "{item.comment || item.feedbackText}"
              </div>

              {/* Admin Replies Thread */}
              {item.adminReplies && item.adminReplies.length > 0 && (
                <div style={{ marginBottom: 12, display: "flex", flexDirection: "column", gap: 6 }}>
                  {item.adminReplies.map((reply) => (
                    <div
                      key={reply.id}
                      style={{
                        marginLeft: 16,
                        background: "#FEF9C3",
                        border: "1px solid #FDE68A",
                        borderRadius: 12,
                        padding: "8px 12px",
                        fontSize: 12,
                        color: "#854D0E",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          marginBottom: 2,
                        }}
                      >
                        <span style={{ fontWeight: 700, display: "flex", alignItems: "center", gap: 4 }}>
                          <CornerDownRight size={12} /> {reply.sender}
                        </span>
                        <span style={{ fontSize: 10.5, color: "#A16207" }}>{reply.time}</span>
                      </div>
                      <p style={{ margin: 0, lineHeight: 1.35 }}>{reply.text}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Reply Input Box */}
              <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                <input
                  type="text"
                  placeholder="Type an admin reply to scholar..."
                  value={replyInputs[item.id] ?? ""}
                  onChange={(e) =>
                    setReplyInputs((prev) => ({ ...prev, [item.id]: e.target.value }))
                  }
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSendReply(item.id);
                  }}
                  className="adc-form-input"
                  style={{ fontSize: 12.5, padding: "8px 12px" }}
                />
                <button
                  onClick={() => handleSendReply(item.id)}
                  disabled={!replyInputs[item.id]?.trim()}
                  className="adc-btn-primary"
                  style={{
                    padding: "8px 14px",
                    fontSize: 12.5,
                    width: "auto",
                    boxShadow: "none",
                    opacity: replyInputs[item.id]?.trim() ? 1 : 0.5,
                  }}
                >
                  <Send size={14} /> Reply
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
