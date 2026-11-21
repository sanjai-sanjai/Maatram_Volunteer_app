import React, { createContext, useContext, useState, useMemo } from "react";
import {
  AdminCommunity,
  AttendanceRecord,
  CommunityChatMessage,
  FeedbackItem,
  FundingRequest,
  ProofSubmission,
  mockAdminCommunities,
  mockAttendanceRecords,
  mockCommunityChatMessages,
  mockFeedbackItems,
  mockFundingRequests,
  mockProofSubmissions,
} from "@/data/admin-community-mock";

interface AdminCommunityContextType {
  communities: AdminCommunity[];
  selectedCommunity: AdminCommunity;
  selectCommunity: (id: string) => void;
  activeTab: "chats" | "event-mgmt";
  setActiveTab: (tab: "chats" | "event-mgmt") => void;
  activeMgmtView: "overview" | "attendance" | "proofs" | "funds" | "feedback" | "thank-note";
  setActiveMgmtView: (view: "overview" | "attendance" | "proofs" | "funds" | "feedback" | "thank-note") => void;

  // Chat
  messages: CommunityChatMessage[];
  sendMessage: (text: string) => void;
  scheduleMeeting: (meeting: { title: string; description: string; date: string; startTime: string; endTime: string }) => void;
  createPoll: (poll: { question: string; options: string[]; multiple: boolean }) => void;
  votePoll: (messageId: string, optionId: string) => void;
  shareLocation: (title: string, address: string, coordinates: string) => void;
  shareMedia: (fileUrl: string, caption: string, fileName: string, fileSize: string) => void;

  // Attendance
  attendanceList: AttendanceRecord[];
  exportAttendanceCsv: () => void;
  isExportingCsv: boolean;

  // Proofs
  proofsList: ProofSubmission[];
  approveProof: (proofId: string) => void;
  rejectProof: (proofId: string, reason: string) => void;

  // Funds
  fundsList: FundingRequest[];
  proceedFundingRequest: (requestId: string) => void;
  rejectFundingRequest: (requestId: string, reason: string) => void;

  // Feedback
  feedbackList: FeedbackItem[];
  replyFeedback: (feedbackId: string, replyText: string) => void;

  // Thank Note
  eligibleVolunteers: Array<{ volunteer: AttendanceRecord; proof: ProofSubmission }>;
  ineligibleVolunteers: Array<{ volunteer: AttendanceRecord; reason: string }>;
  sendThankNotes: () => void;
  thankNotesSentCount: number | null;

  // Plus button configurations that post to chat
  postAttendanceAnnouncement: (config: {
    eventName: string;
    location: string;
    radius: string;
    date: string;
    startTime: string;
    endTime: string;
    instructions: string;
  }) => void;
  postProofInstructionAnnouncement: (config: {
    title: string;
    description: string;
    photosRequired: number;
    geotagRequired: boolean;
    instructions: string;
    deadline: string;
  }) => void;
  postExtraVolunteersAnnouncement: (config: {
    requirement: string;
    count: number;
    skills: string;
    location: string;
    date: string;
    description: string;
  }) => void;

  toastMessage: string | null;
  clearToast: () => void;
}

const AdminCommunityContext = createContext<AdminCommunityContextType | null>(null);

export function AdminCommunityProvider({
  children,
  initialCommunityId = "sangamam",
}: {
  children: React.ReactNode;
  initialCommunityId?: string;
}) {
  const [communityId, setCommunityId] = useState(initialCommunityId);
  const [activeTab, setActiveTab] = useState<"chats" | "event-mgmt">("chats");
  const [activeMgmtView, setActiveMgmtView] = useState<
    "overview" | "attendance" | "proofs" | "funds" | "feedback" | "thank-note"
  >("overview");

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const selectedCommunity = useMemo(() => {
    return (
      mockAdminCommunities.find((c) => c.id === communityId) ??
      mockAdminCommunities[0]!
    );
  }, [communityId]);

  const eventId = selectedCommunity.eventId;

  // Local mutable state
  const [chatStore, setChatStore] = useState<Record<string, CommunityChatMessage[]>>(mockCommunityChatMessages);
  const [attendanceStore, setAttendanceStore] = useState<Record<string, AttendanceRecord[]>>(mockAttendanceRecords);
  const [proofStore, setProofStore] = useState<Record<string, ProofSubmission[]>>(mockProofSubmissions);
  const [fundsStore, setFundsStore] = useState<Record<string, FundingRequest[]>>(mockFundingRequests);
  const [feedbackStore, setFeedbackStore] = useState<Record<string, FeedbackItem[]>>(mockFeedbackItems);
  const [isExportingCsv, setIsExportingCsv] = useState(false);
  const [thankNotesSentCount, setThankNotesSentCount] = useState<number | null>(null);

  // Active event items
  const messages = chatStore[communityId] ?? [];
  const attendanceList = attendanceStore[eventId] ?? mockAttendanceRecords["palm-seeds"] ?? [];
  const proofsList = proofStore[eventId] ?? mockProofSubmissions["palm-seeds"] ?? [];
  const fundsList = fundsStore[eventId] ?? mockFundingRequests["palm-seeds"] ?? [];
  const feedbackList = feedbackStore[eventId] ?? mockFeedbackItems["palm-seeds"] ?? [];

  // Chat Actions
  const sendMessage = (text: string) => {
    if (!text.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: CommunityChatMessage = {
      id: `msg-${Date.now()}`,
      sender: "Sujith Kumar",
      role: "Admin",
      avatar: "/assets/admin/admin-profile-avatar.png",
      time: timeStr,
      type: "text",
      text: text.trim(),
    };
    setChatStore((prev) => ({
      ...prev,
      [communityId]: [...(prev[communityId] ?? []), newMsg],
    }));
  };

  const scheduleMeeting = (meeting: {
    title: string;
    description: string;
    date: string;
    startTime: string;
    endTime: string;
  }) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: CommunityChatMessage = {
      id: `meet-${Date.now()}`,
      sender: "Admin (Operations)",
      role: "Admin",
      avatar: "/assets/admin/admin-profile-avatar.png",
      time: timeStr,
      type: "meeting",
      text: `📅 Scheduled: ${meeting.title}`,
      meeting: {
        ...meeting,
        meetUrl: "https://meet.google.com/mq-volunteer-sync",
      },
    };
    setChatStore((prev) => ({
      ...prev,
      [communityId]: [...(prev[communityId] ?? []), newMsg],
    }));
    showToast(`Meeting "${meeting.title}" scheduled and posted to chat!`);
  };

  const createPoll = (poll: { question: string; options: string[]; multiple: boolean }) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: CommunityChatMessage = {
      id: `poll-${Date.now()}`,
      sender: "Admin (Polls)",
      role: "Admin",
      avatar: "/assets/admin/admin-profile-avatar.png",
      time: timeStr,
      type: "poll",
      poll: {
        question: poll.question,
        options: poll.options.map((opt, i) => ({ id: `opt-${Date.now()}-${i}`, text: opt, votes: 0 })),
        multiple: poll.multiple,
        totalVotes: 0,
        userVoted: [],
      },
    };
    setChatStore((prev) => ({
      ...prev,
      [communityId]: [...(prev[communityId] ?? []), newMsg],
    }));
    showToast("Poll created and posted to chat!");
  };

  const votePoll = (messageId: string, optionId: string) => {
    setChatStore((prev) => {
      const msgs = prev[communityId] ?? [];
      const updated = msgs.map((m) => {
        if (m.id !== messageId || !m.poll) return m;
        const currentVoted = m.poll.userVoted ?? [];
        if (currentVoted.includes(optionId)) return m; // already voted
        const nextVoted = m.poll.multiple ? [...currentVoted, optionId] : [optionId];
        const nextOptions = m.poll.options.map((opt) => {
          if (opt.id === optionId) return { ...opt, votes: opt.votes + 1 };
          return opt;
        });
        return {
          ...m,
          poll: {
            ...m.poll,
            options: nextOptions,
            totalVotes: m.poll.totalVotes + 1,
            userVoted: nextVoted,
          },
        };
      });
      return { ...prev, [communityId]: updated };
    });
  };

  const shareLocation = (title: string, address: string, coordinates: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: CommunityChatMessage = {
      id: `loc-${Date.now()}`,
      sender: "Admin (Location)",
      role: "Admin",
      avatar: "/assets/admin/admin-profile-avatar.png",
      time: timeStr,
      type: "location",
      text: `📍 Event Location: ${title}`,
      location: { title, address, coordinates },
    };
    setChatStore((prev) => ({
      ...prev,
      [communityId]: [...(prev[communityId] ?? []), newMsg],
    }));
    showToast("Location shared to chat!");
  };

  const shareMedia = (fileUrl: string, caption: string, fileName: string, fileSize: string) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: CommunityChatMessage = {
      id: `media-${Date.now()}`,
      sender: "Admin (Media)",
      role: "Admin",
      avatar: "/assets/admin/admin-profile-avatar.png",
      time: timeStr,
      type: "media",
      text: caption,
      media: { url: fileUrl, caption, fileName, fileSize },
    };
    setChatStore((prev) => ({
      ...prev,
      [communityId]: [...(prev[communityId] ?? []), newMsg],
    }));
    showToast("Media posted to chat!");
  };

  // Attendance CSV Export
  const exportAttendanceCsv = () => {
    setIsExportingCsv(true);
    setTimeout(() => {
      const marked = attendanceList.filter((a) => a.status === "Marked");
      const notMarked = attendanceList.filter((a) => a.status === "Not Marked");

      let csv = "MAATRAM FOUNDATION - EVENT ATTENDANCE REPORT\n";
      csv += `Event Name,${selectedCommunity.eventName}\n`;
      csv += `Event Date,${selectedCommunity.eventDate}\n`;
      csv += `Generated At,${new Date().toLocaleString()}\n\n`;

      csv += "=== SECTION 1: ATTENDANCE MARKED ===\n";
      csv += "S.No,Student Name,Maatram ID,College,Phone,Attendance Status,Marked Time,Hours Contributed,Event Date\n";
      marked.forEach((item, index) => {
        csv += `${index + 1},"${item.studentName}",${item.maatramId},"${item.college}","${item.phone}",${item.status},${item.markedAt ?? "N/A"},${item.hoursContributed ?? "N/A"},"${item.eventDate}"\n`;
      });

      csv += "\n=== SECTION 2: ATTENDANCE NOT MARKED ===\n";
      csv += "S.No,Student Name,Maatram ID,College,Phone,Attendance Status,Remarks\n";
      notMarked.forEach((item, index) => {
        csv += `${index + 1},"${item.studentName}",${item.maatramId},"${item.college}","${item.phone}",${item.status},"Absent / Not Marked within radius"\n`;
      });

      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `Maatram_Attendance_${selectedCommunity.id}_${Date.now()}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      setIsExportingCsv(false);
      showToast("✅ Attendance Spreadsheet CSV Downloaded Successfully!");
    }, 1000);
  };

  // Proof verification
  const approveProof = (proofId: string) => {
    setProofStore((prev) => {
      const list = prev[eventId] ?? [];
      const updated = list.map((p) => (p.id === proofId ? { ...p, status: "approved" as const } : p));
      return { ...prev, [eventId]: updated };
    });
    showToast("✅ Proof Verified & Approved Successfully!");
  };

  const rejectProof = (proofId: string, reason: string) => {
    setProofStore((prev) => {
      const list = prev[eventId] ?? [];
      const updated = list.map((p) =>
        p.id === proofId
          ? { ...p, status: "rejected" as const, rejectionReason: reason, resubmissionEligible: true }
          : p
      );
      return { ...prev, [eventId]: updated };
    });
    showToast("⚠️ Proof Rejected. Feedback Note Delivered to Student.");
  };

  // Funds
  const proceedFundingRequest = (requestId: string) => {
    setFundsStore((prev) => {
      const list = prev[eventId] ?? [];
      const updated = list.map((f) => (f.id === requestId ? { ...f, status: "approved" as const } : f));
      return { ...prev, [eventId]: updated };
    });
    showToast("✅ Funding Request Approved & Forwarded to Accounts!");
  };

  const rejectFundingRequest = (requestId: string, reason: string) => {
    setFundsStore((prev) => {
      const list = prev[eventId] ?? [];
      const updated = list.map((f) =>
        f.id === requestId ? { ...f, status: "rejected" as const, rejectionReason: reason } : f
      );
      return { ...prev, [eventId]: updated };
    });
    showToast("❌ Funding Request Rejected. Explanation Sent.");
  };

  // Feedback
  const replyFeedback = (feedbackId: string, replyText: string) => {
    if (!replyText.trim()) return;
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    setFeedbackStore((prev) => {
      const list = prev[eventId] ?? [];
      const updated = list.map((fb) => {
        if (fb.id !== feedbackId) return fb;
        return {
          ...fb,
          isReviewed: true,
          adminReplies: [
            ...fb.adminReplies,
            {
              id: `rep-${Date.now()}`,
              sender: "Admin (Operations)",
              role: "Admin",
              text: replyText.trim(),
              time: timeStr,
            },
          ],
        };
      });
      return { ...prev, [eventId]: updated };
    });
    showToast("Reply posted to feedback thread!");
  };

  // Thank Note Eligibility Logic
  // A student is eligible ONLY IF:
  // 1. Attendance marked == "Marked"
  // 2. Proof submitted AND Proof approved == "approved"
  const { eligibleVolunteers, ineligibleVolunteers } = useMemo(() => {
    const eligible: Array<{ volunteer: AttendanceRecord; proof: ProofSubmission }> = [];
    const ineligible: Array<{ volunteer: AttendanceRecord; reason: string }> = [];

    attendanceList.forEach((att) => {
      const proof = proofsList.find((p) => p.maatramId === att.maatramId);

      if (att.status !== "Marked") {
        ineligible.push({ volunteer: att, reason: "Attendance Not Marked" });
        return;
      }

      if (!proof) {
        ineligible.push({ volunteer: att, reason: "Photo Proof Not Submitted" });
        return;
      }

      if (proof.status === "rejected") {
        ineligible.push({ volunteer: att, reason: "Photo Proof Rejected" });
        return;
      }

      if (proof.status === "pending") {
        ineligible.push({ volunteer: att, reason: "Photo Proof Pending Verification" });
        return;
      }

      if (proof.status === "approved") {
        eligible.push({ volunteer: att, proof });
      }
    });

    return { eligibleVolunteers: eligible, ineligibleVolunteers: ineligible };
  }, [attendanceList, proofsList]);

  const sendThankNotes = () => {
    const count = eligibleVolunteers.length;
    setThankNotesSentCount(count);
    showToast(`🎉 Thank You Note dispatched to ${count} eligible volunteers!`);
  };

  // Plus Menu Actions (broadcast to chat)
  const postAttendanceAnnouncement = (config: {
    eventName: string;
    location: string;
    radius: string;
    date: string;
    startTime: string;
    endTime: string;
    instructions: string;
  }) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: CommunityChatMessage = {
      id: `att-ann-${Date.now()}`,
      sender: "Attendance Coordinator",
      role: "Admin",
      avatar: "/assets/brand/maatram-foundation-logo.png",
      time: timeStr,
      type: "announcement",
      pinned: true,
      text: `📢 ATTENDANCE ANNOUNCEMENT: ${config.eventName}\n📍 Location: ${config.location} (Radius: ${config.radius})\n⏰ Time: ${config.date} | ${config.startTime} - ${config.endTime}\n📌 Note: ${config.instructions}`,
    };
    setChatStore((prev) => ({
      ...prev,
      [communityId]: [...(prev[communityId] ?? []), newMsg],
    }));
    showToast("Attendance configuration published to community chat!");
  };

  const postProofInstructionAnnouncement = (config: {
    title: string;
    description: string;
    photosRequired: number;
    geotagRequired: boolean;
    instructions: string;
    deadline: string;
  }) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: CommunityChatMessage = {
      id: `proof-inst-${Date.now()}`,
      sender: "Proof Verification Desk",
      role: "Admin",
      avatar: "/assets/brand/maatram-foundation-logo.png",
      time: timeStr,
      type: "announcement",
      text: `📸 PROOF GUIDELINES: ${config.title}\n${config.description}\n📷 Minimum Photos: ${config.photosRequired} | GPS Geotag: ${config.geotagRequired ? "REQUIRED" : "Optional"}\n⏳ Deadline: ${config.deadline}\n📝 Instructions: ${config.instructions}`,
    };
    setChatStore((prev) => ({
      ...prev,
      [communityId]: [...(prev[communityId] ?? []), newMsg],
    }));
    showToast("Proof instructions published to community chat!");
  };

  const postExtraVolunteersAnnouncement = (config: {
    requirement: string;
    count: number;
    skills: string;
    location: string;
    date: string;
    description: string;
  }) => {
    const now = new Date();
    const timeStr = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    const newMsg: CommunityChatMessage = {
      id: `recruit-${Date.now()}`,
      sender: "Volunteer Recruitment Desk",
      role: "Admin",
      avatar: "/assets/brand/maatram-foundation-logo.png",
      time: timeStr,
      type: "announcement",
      text: `🚨 URGENT RECRUITMENT CALL: Need ${config.count} more volunteers for ${config.requirement}!\n📍 Location: ${config.location} | Date: ${config.date}\n💼 Skills: ${config.skills}\n📝 Details: ${config.description}\n👉 Interested scholars please comment below or register in Action Centre!`,
    };
    setChatStore((prev) => ({
      ...prev,
      [communityId]: [...(prev[communityId] ?? []), newMsg],
    }));
    showToast(`Recruitment announcement for ${config.count} volunteers published!`);
  };

  return (
    <AdminCommunityContext.Provider
      value={{
        communities: mockAdminCommunities,
        selectedCommunity,
        selectCommunity: setCommunityId,
        activeTab,
        setActiveTab,
        activeMgmtView,
        setActiveMgmtView,
        messages,
        sendMessage,
        scheduleMeeting,
        createPoll,
        votePoll,
        shareLocation,
        shareMedia,
        attendanceList,
        exportAttendanceCsv,
        isExportingCsv,
        proofsList,
        approveProof,
        rejectProof,
        fundsList,
        proceedFundingRequest,
        rejectFundingRequest,
        feedbackList,
        replyFeedback,
        eligibleVolunteers,
        ineligibleVolunteers,
        sendThankNotes,
        thankNotesSentCount,
        postAttendanceAnnouncement,
        postProofInstructionAnnouncement,
        postExtraVolunteersAnnouncement,
        toastMessage,
        clearToast: () => setToastMessage(null),
      }}
    >
      {children}
    </AdminCommunityContext.Provider>
  );
}

export function useAdminCommunity() {
  const ctx = useContext(AdminCommunityContext);
  if (!ctx) throw new Error("useAdminCommunity must be used within AdminCommunityProvider");
  return ctx;
}
