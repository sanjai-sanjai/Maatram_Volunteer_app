import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  Camera,
  CheckCheck,
  ChevronRight,
  Download,
  Eye,
  FileText,
  Hourglass,
  Image,
  LayoutGrid,
  Linkedin,
  MapPin,
  Megaphone,
  MessageSquare,
  Mic,
  MoreVertical,
  Paperclip,
  Send,
  Smile,
  Sparkles,
  Trophy,
  Users,
  Video,
  Wallet,
  Check,
  CalendarDays,
  Clock3,
  Compass,
  Crosshair,
  Navigation,
  Radio,
  ShieldCheck,
  Plus,
  X,
  XCircle,
} from "lucide-react";
import { GeotagProofModal, FeedbackModal, ReportIssueModal } from "@/components/geotag-proof-flow";
import { LiveDeviceCameraModal, useRealtimeVoiceRecorder, PlayableVoiceMessage } from "@/components/chat-media-capture";
import { attendanceMock, isWithinAttendanceRadius } from "@/data/mock";
import { getCommunity } from "@/components/community-screens";
import { downloadGuide, getOpportunity } from "@/components/opportunity-screens";
import { AssignedStudentsView } from "@/components/assigned-students-view";
import {
  Action,
  Forward,
  IconAction,
  Modal,
  Page,
  photos,
  Primary,
  Progress,
} from "@/components/additional-shared";
import { useMaatramState } from "@/components/MaatramState";
export function ChatScreen({ id }: { id: string }) {
  const c = getCommunity(id);
  const state = useMaatramState();

  const isPhysicalVerification =
    id === "physical-verification" ||
    id === "bgv" ||
    id?.toLowerCase().includes("physical") ||
    id?.toLowerCase().includes("verification") ||
    c?.id === "physical-verification" ||
    c?.id === "bgv" ||
    c?.category === "Physical Verification" ||
    c?.category === "BGV" ||
    c?.name?.toLowerCase().includes("physical verification") ||
    c?.name?.toLowerCase().includes("bgv");

  const [activeTab, setActiveTab] = useState<"chats" | "assigned" | "action">(() => {
    if (typeof window !== "undefined") {
      const p = new URLSearchParams(window.location.search).get("tab");
      if (p === "action") return "action";
      if (p === "assigned") return "assigned";
    }
    return "chats";
  });
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [showActionCentreGuide, setShowActionCentreGuide] = useState(true);
  const [showFabGuide, setShowFabGuide] = useState(false);
  const [reportedIssues, setReportedIssues] = useState<
    Array<{ id: string; category: string; description: string; priority: string; time: string }>
  >([]);
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const voiceRecorder = useRealtimeVoiceRecorder();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") === "action") {
        setActiveTab("action");
        setShowActionCentreGuide(false);
        setTimeout(() => setShowFabGuide(true), 350);
      } else if (params.get("tab") === "assigned" && isPhysicalVerification) {
        setActiveTab("assigned");
        setShowActionCentreGuide(false);
      } else {
        setShowActionCentreGuide(true);
      }
    }
  }, [isPhysicalVerification]);

  function switchTab(tab: "chats" | "assigned" | "action") {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tab === "action") {
        url.searchParams.set("tab", "action");
      } else if (tab === "assigned") {
        url.searchParams.set("tab", "assigned");
      } else {
        url.searchParams.delete("tab");
      }
      window.history.replaceState({}, "", url.toString());

      if (tab === "action") {
        setShowActionCentreGuide(false);
        setTimeout(() => setShowFabGuide(true), 350);
      } else {
        setShowFabGuide(false);
      }
    }
  }


  const [text, setText] = useState("");
  const [proofModalOpen, setProofModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [panel, setPanel] = useState<null | "poll" | "proof" | "media">(null);
  const [success, setSuccess] = useState(false);
  const [attendanceModalOpen, setAttendanceModalOpen] = useState(false);
  const [recording, setRecording] = useState(false);
  const [menu, setMenu] = useState(false);
  const [emoji, setEmoji] = useState(false);
  const [notice, setNotice] = useState("");
  const [question, setQuestion] = useState("");
  const [optionA, setOptionA] = useState("");
  const [optionB, setOptionB] = useState("");
  const [files, setFiles] = useState<string[]>([]);
  const [accept, setAccept] = useState("*/*");
  const picker = useRef<HTMLInputElement>(null);
  const [votes, setVotes] = useState<Record<number, string>>({});

  // Reset attendance when entering or leaving the group so reopening is always 100% fresh for judges demonstration
  useEffect(() => {
    state.resetAttendance();
    return () => {
      state.resetAttendance();
    };
  }, []);
  if (!c) return null;
  function send() {
    if (text.trim()) {
      state.send(text.trim());
      setText("");
    }
  }
  function shareFile(type: string) {
    setAccept(type);
    setTimeout(() => picker.current?.click(), 0);
  }
  return (
    <Page className="ma-chat ma-chat-fixed-container">
      {/* 1. FIXED TOP DOCK (Community Header, Tabs Switcher, and Pinned Attendance Banner) */}
      <div className="ma-chat-pinned-top">
        <header className="ma-chat-header">
          <Action asChild className="ma-icon">
            <Link
              to="/community"
              aria-label="Back to my communities"
              onClick={() => state.resetAttendance()}
            >
              <ArrowLeft />
            </Link>
          </Action>
          <Link
            to="/community/$communityId"
            params={{ communityId: id }}
            aria-label="Open community overview"
            onClick={() => state.resetAttendance()}
            style={{ display: "flex", alignItems: "center", gap: 7, flex: 1, minWidth: 0 }}
          >
            <img
              src="/assets/brand/maatram-foundation-logo.png"
              alt="Maatram"
              style={{
                width: 44,
                height: 44,
                objectFit: "contain",
                borderRadius: "50%",
                background: "var(--mq-yellow)",
                padding: 3,
                flex: "none",
              }}
            />
            <div style={{ minWidth: 0 }}>
              <h1>{c.name}</h1>
              <p>Together for a Better Tomorrow</p>
            </div>
          </Link>
          <button
            type="button"
            className="ma-chat-walkie-btn"
            onClick={() => setNotice("Voice channel is ready. No live call is connected.")}
            aria-label="Voice channel"
          >
            <WalkieTalkie />
          </button>
          <IconAction label="Chat options" onClick={() => setMenu(!menu)}>
            <MoreVertical />
          </IconAction>
        </header>

        {menu && (
          <div className="ma-inline-menu">
            <Action
              onClick={() => {
                setShowActionCentreGuide(true);
                setMenu(false);
              }}
            >
              Show Community Tour
            </Action>
            <Action
              onClick={() => {
                state.resetAttendance();
                setNotice("Attendance reset to fresh demo state!");
                setMenu(false);
              }}
            >
              Reset Attendance (Demo)
            </Action>
            <Action
              onClick={() => {
                setNotice("Chat notifications muted.");
                setMenu(false);
              }}
            >
              Mute notifications
            </Action>
            <Action
              onClick={() => {
                setNotice("You have no unread messages.");
                setMenu(false);
              }}
            >
              Mark as read
            </Action>
          </div>
        )}

        <div
          className={`ma-chat-tabs-card ${isPhysicalVerification ? "has-three-tabs" : ""}`}
          role="tablist"
          aria-label="Community navigation"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "chats"}
            className={`ma-chat-tab ${activeTab === "chats" ? "is-active" : ""}`}
            onClick={() => switchTab("chats")}
          >
            <MessageSquare size={16} strokeWidth={2.4} />
            <span>Chats</span>
          </button>

          {isPhysicalVerification && (
            <button
              type="button"
              role="tab"
              id="ma-tab-assigned-students"
              aria-selected={activeTab === "assigned"}
              className={`ma-chat-tab ${activeTab === "assigned" ? "is-active" : ""}`}
              onClick={() => switchTab("assigned")}
            >
              <Users size={16} strokeWidth={2.2} />
              <span>Assigned Students</span>
            </button>
          )}

          <button
            type="button"
            role="tab"
            id="ma-tab-action-centre"
            aria-selected={activeTab === "action"}
            className={`ma-chat-tab ${activeTab === "action" ? "is-active" : ""} ${showActionCentreGuide ? "is-tour-spotlight" : ""}`}
            onClick={() => switchTab("action")}
          >
            <LayoutGrid size={16} strokeWidth={2.2} />
            <span>Action Centre</span>
            <span className="ma-action-badge">{3 + reportedIssues.length}</span>
          </button>
        </div>

        {notice && (
          <p role="status" className="ma-feedback">
            {notice}
          </p>
        )}

        {/* Pinned Attendance Banner: Fixed with Header when on Chats view */}
        {activeTab === "chats" && (
          <div
            className="ma-attendance-banner"
            role="button"
            tabIndex={0}
            onClick={() => {
              setAttendanceModalOpen(true);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                setAttendanceModalOpen(true);
              }
            }}
          >
            <div className="ma-attendance-banner-icon">
              <Megaphone size={20} strokeWidth={2.2} />
            </div>
            <div className="ma-attendance-banner-content">
              <h3 className="ma-attendance-banner-title">
                {state.attended ? "Attendance Confirmed ✓" : "Mark Your Attendance!"}
              </h3>
              <p className="ma-attendance-banner-desc">
                {state.attended
                  ? "You have successfully marked GPS attendance for this event."
                  : `Attendance for ${c.name.replace(/ Team$/, "")} Event is now open.`}
              </p>
              <span className="ma-attendance-banner-link">
                {state.attended ? "View verified GPS coordinates" : "Click to confirm your attendance."}
              </span>
            </div>
            <ChevronRight size={18} strokeWidth={2.2} className="ma-attendance-banner-arrow" />
          </div>
        )}
      </div>

      {/* 2. SCROLLABLE CONTENT BODY */}
      <div
        className={`ma-chat-scrollable-content ${activeTab === "assigned" ? "is-assigned-tab" : ""}`}
      >
        {activeTab === "action" ? (
          <ActionCentreView
            onMarkAttendance={() => {
              setAttendanceModalOpen(true);
            }}
            onUploadProof={() => setProofModalOpen(true)}
            onReport={() => setReportModalOpen(true)}
            onFeedback={() => setFeedbackModalOpen(true)}
            reportedIssues={reportedIssues}
            isFabGuideActive={showFabGuide}
          />
        ) : activeTab === "assigned" && isPhysicalVerification ? (
          <AssignedStudentsView community={c} />
        ) : (
          <>
            <div className="ma-chat-timeline">
              <div className="ma-date">Today</div>
              {isPhysicalVerification ? (
                <>
                  <Incoming sender="Aravind K" role="Coordinator" avatar="coordinator" time="9:45 AM">
                    <p>
                      Good morning Physical Verification Team! 👋
                      <br />
                      Welcome to the Coimbatore District Candidate Background Verification drive.
                      <br />
                      Please open the <b>Assigned Students</b> tab to review your assigned candidates and contact details. 📋
                    </p>
                  </Incoming>
                  <Incoming sender="Sujith Kumar" role="Admin" avatar="coordinator" time="9:50 AM">
                    <p>
                      Volunteers, please verify the candidate&apos;s 10th and 12th original marksheets, check the family income certificate, and capture a geotagged photo of the residence. Your ground check ensures scholarships reach the truly deserving students! 🎓✨
                    </p>
                  </Incoming>
                  <Outgoing time="9:58 AM">Understood! Heading to Pollachi Rural for the first candidate visit now. 👍</Outgoing>
                  <Incoming sender="Aravind K" role="Coordinator" avatar="coordinator" time="10:02 AM">
                    <p>
                      Excellent Sanjai! You can submit the verification checklist and geotag proof directly inside each candidate card in the <b>Assigned Students</b> tab. 🚀
                    </p>
                  </Incoming>
                  <Incoming sender="Aravind K" role="Admin" avatar="coordinator" time="10:05 AM">
                    <div id="chat-attendance-section">
                      <AttendanceCard
                        onMark={() => {
                          setAttendanceModalOpen(true);
                        }}
                      />
                    </div>
                  </Incoming>
                </>
              ) : (
                <>
                  <Incoming sender="Aravind K" role="Coordinator" avatar="coordinator" time="10:24 AM">
                    <p>
                      Hi team! 👋
                      <br />
                      Quick reminder – our Palm Seeds Plantation event is on Nov 02 (Sat),
                      <br />
                      9:00 AM – 12:00 PM at Chennai.
                    </p>
                    <p>Please confirm your availability. ✅</p>
                  </Incoming>
                  <Outgoing time="10:26 AM">I’ll be there! 👍</Outgoing>
                  <Incoming sender="Kaviya S" avatar="kaviya" time="10:28 AM">
                    I’m in! Do we need to bring any
                    <br />
                    specific items? 🤔
                  </Incoming>
                  <Incoming sender="Aravind K" role="Coordinator" avatar="coordinator" time="10:31 AM">
                    <Action
                      className="ma-file-message"
                      onClick={() => void downloadGuide(getOpportunity("palm-seeds"))}
                    >
                      <FileText />
                      <span>
                        <b>Event_Guide.pdf</b>
                        <small>1.2 MB · Event details, what to bring…</small>
                      </span>
                      <ArrowRight />
                    </Action>
                  </Incoming>
                  <div className="ma-followup">
                    Here’s the event guide. Please check
                    <br />
                    the “Preparation Requirements” section. 📄<small>10:31 AM</small>
                  </div>
                  <Outgoing time="10:33 AM">Got it! 🙌</Outgoing>
                  <Incoming sender="Aravind K" role="Admin" avatar="coordinator" time="9:01 AM">
                    <div id="chat-attendance-section">
                      <AttendanceCard
                        onMark={() => {
                          setAttendanceModalOpen(true);
                        }}
                      />
                    </div>
                  </Incoming>
                  <Incoming sender="Kaviya S" avatar="kaviya" time="9:02 AM">
                    Marked my attendance! ✅
                  </Incoming>
                </>
              )}
              {state.messages.map((m) => (
                <Outgoing time="Now" key={m.id}>
                  {m.kind === "voice" ? (
                    <PlayableVoiceMessage audioUrl={m.audioUrl} duration={m.audioDuration || "0:06"} />
                  ) : m.kind === "image" || m.photoUrl ? (
                    <div style={{ maxWidth: 240, overflow: "hidden", borderRadius: 12 }}>
                      <img
                        src={m.photoUrl}
                        alt="Photo"
                        style={{ width: "100%", maxHeight: 200, objectFit: "cover", display: "block", borderRadius: 12 }}
                      />
                      {m.text && <p style={{ margin: "6px 0 0", fontSize: 13 }}>{m.text}</p>}
                    </div>
                  ) : m.kind === "poll" ? (
                    <div className="ma-poll">
                      <b>{m.text.split("\n")[0]}</b>
                      {m.text
                        .split("\n")
                        .slice(1)
                        .map((option) => (
                          <Action
                            key={option}
                            className={votes[m.id] === option ? "is-active" : ""}
                            onClick={() => setVotes((old) => ({ ...old, [m.id]: option }))}
                          >
                            {option}
                            {votes[m.id] === option && <Check />}
                          </Action>
                        ))}
                    </div>
                  ) : m.kind === "file" ? (
                    <>
                      <FileText />
                      {m.text}
                    </>
                  ) : (
                    m.text
                  )}
                </Outgoing>
              ))}
            </div>
            <input
              className="ma-sr"
              ref={picker}
              type="file"
              multiple
              accept={accept}
              aria-label="Choose chat attachments"
              onChange={(e) => {
                const selected = Array.from(e.target.files ?? []).map((f) => f.name);
                setFiles(selected);
                if (!panel && selected.length) {
                  state.send(selected.join(", "), "file");
                  setSheet(false);
                }
                e.target.value = "";
              }}
            />
            {emoji && (
              <div className="ma-emoji">
                {["👍", "🙌", "😊", "🌱", "✅", "❤️"].map((e) => (
                  <Action
                    key={e}
                    onClick={() => {
                      setText((old) => old + e);
                      setEmoji(false);
                    }}
                  >
                    {e}
                  </Action>
                ))}
              </div>
            )}
          </>
        )}
      </div>

    {/* 3. FIXED BOTTOM COMPOSER (Only during Chats view) */}
    {activeTab === "chats" && (
      <form
        className="ma-composer"
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
      >
        <button
          type="button"
          className="ma-composer-circle-btn"
          aria-label="Attachments"
          onClick={() => setSheet(true)}
        >
          <Paperclip size={20} />
        </button>

        {voiceRecorder.isRecording ? (
          <div
            style={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#FEE2E2",
              border: "1.5px solid #F87171",
              borderRadius: 24,
              padding: "6px 14px",
              gap: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: "50%",
                  background: "#DC2626",
                  boxShadow: "0 0 8px #DC2626",
                }}
              />
              <span style={{ fontSize: 13, fontWeight: 800, color: "#991B1B" }}>
                Recording… {Math.floor(voiceRecorder.seconds / 60)}:{(voiceRecorder.seconds % 60).toString().padStart(2, "0")}
              </span>
            </div>

            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <button
                type="button"
                onClick={() => {
                  voiceRecorder.cancelRecording();
                  setNotice("Voice recording cancelled");
                }}
                style={{
                  background: "#FFFFFF",
                  border: "1px solid #FCA5A5",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  display: "grid",
                  placeItems: "center",
                  color: "#DC2626",
                  cursor: "pointer",
                }}
                aria-label="Cancel recording"
              >
                <X size={16} />
              </button>

              <button
                type="button"
                onClick={async () => {
                  const res = await voiceRecorder.stopRecording();
                  state.send(
                    `🎤 Voice note (${res.durationStr})`,
                    "voice",
                    { audioUrl: res.audioUrl, audioDuration: res.durationStr }
                  );
                  setNotice(`Voice note sent (${res.durationStr})`);
                }}
                style={{
                  background: "#16A34A",
                  border: "none",
                  borderRadius: "50%",
                  width: 34,
                  height: 34,
                  display: "grid",
                  placeItems: "center",
                  color: "#FFFFFF",
                  cursor: "pointer",
                  boxShadow: "0 2px 6px rgba(22, 163, 74, 0.4)",
                }}
                aria-label="Send voice recording"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        ) : (
          <>
            <div className="ma-composer-capsule">
              <input
                placeholder="Type a message..."
                aria-label="Type a message"
                value={text}
                onChange={(e) => setText(e.target.value)}
              />
              <div className="ma-composer-divider" />
              <button
                type="button"
                className="ma-composer-camera-btn"
                aria-label="Camera"
                onClick={() => setCameraModalOpen(true)}
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
                onClick={() => voiceRecorder.startRecording()}
              >
                <Mic size={22} />
              </button>
            )}
          </>
        )}
      </form>
    )}
      <Modal
        open={sheet}
        onClose={() => {
          setSheet(false);
          setActiveTab("chats");
        }}
        title="Attachments"
        sheet
      >
        <div className="ma-sheet-handle" />
        <h2 className="ma-sheet-title">Attachments</h2>
        <p className="ma-sheet-sub">Share, collect and collaborate with your community</p>
        <div className="ma-share-grid">
          {/* 1. Media */}
          <ShareTile
            tone="media"
            title="Media"
            text="Share photos, videos and other files"
            icon={<Image />}
            onClick={() => {
              setFiles([]);
              setSheet(false);
              setPanel("media");
            }}
          />

          {/* 2. Submit Proof (Navigates to Upload Event Proof) */}
          <ShareTile
            tone="proof"
            title="Submit Proof"
            text="Upload your event proof with"
            label="📍 Geo Tag"
            icon={<MapPin />}
            onClick={() => {
              setFiles([]);
              setSheet(false);
              setProofModalOpen(true);
            }}
          />

          {/* 3. Fund Request */}
          <Action asChild className="ma-share-tile ma-share-tile--fund">
            <Link to="/fund-request" onClick={() => setSheet(false)}>
              <Wallet />
              <b>Fund Request</b>
              <span>
                Raise a fund for
                <br />
                community activities
              </span>
              <small>e.g. Travel allowance, Food</small>
              <ChevronRight />
            </Link>
          </Action>

          {/* 4. Location Share */}
          <ShareTile
            tone="poll"
            title="Location Share"
            text="Broadcast event or landmark coordinates"
            icon={<MapPin />}
            onClick={() => {
              state.send("📍 Event Location: Chembarambakkam Lake Bund · 13.0067° N, 80.0033° E");
              setSheet(false);
              setNotice("Event location shared to community chat");
            }}
          />
        </div>
        <h3 className="ma-quick-title">Quick Share</h3>
        <div className="ma-quick-share">
          {[
            [Image, "Photo", "image/*"],
            [Video, "Video", "video/*"],
            [FileText, "Document", ".pdf,.doc,.docx"],
            [MapPin, "Location", "location"],
          ].map(([Icon, label, type], i) => {
            const I = Icon as typeof Image;
            return (
              <Action
                key={i}
                onClick={() => {
                  if (type === "location") {
                    state.send("📍 Event Location: Chennai · Simulated location");
                    setSheet(false);
                  } else shareFile(String(type));
                }}
              >
                <I />
                {String(label)}
              </Action>
            );
          })}
        </div>
      </Modal>
      <Modal
        open={panel !== null}
        onClose={() => setPanel(null)}
        title={
          panel === "poll" ? "Create Poll" : panel === "proof" ? "Submit Proof" : "Share Media"
        }
      >
        <h2>
          {panel === "poll" ? "Create Poll" : panel === "proof" ? "Submit Proof" : "Share Media"}
        </h2>
        {panel === "poll" ? (
          <>
            <label className="ma-field">
              Question
              <input
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Ask your community…"
              />
            </label>
            <label className="ma-field">
              Option 1<input value={optionA} onChange={(e) => setOptionA(e.target.value)} />
            </label>
            <label className="ma-field">
              Option 2<input value={optionB} onChange={(e) => setOptionB(e.target.value)} />
            </label>
            <Primary
              disabled={!question.trim() || !optionA.trim() || !optionB.trim()}
              onClick={() => {
                state.send(`${question}\n${optionA}\n${optionB}`, "poll");
                setPanel(null);
                setQuestion("");
                setOptionA("");
                setOptionB("");
              }}
            >
              Create Poll
              <BarChart3 />
            </Primary>
          </>
        ) : (
          <>
            {panel === "proof" && (
              <p className="ma-notice ma-notice--green">
                <MapPin />
                Geo Tag · Chennai · Simulated location
              </p>
            )}
            <Action
              className="ma-upload"
              onClick={() => shareFile(panel === "proof" ? "image/*,.pdf" : "image/*,video/*")}
            >
              <Plus />
              Choose {panel === "proof" ? "Proof" : "Media"} Files
            </Action>
            {files.map((f) => (
              <p className="ma-file-row" key={f}>
                <FileText />
                {f}
              </p>
            ))}
            <Primary
              disabled={!files.length}
              onClick={() => {
                state.send(
                  panel === "proof"
                    ? `✅ Event proof submitted · Chennai (simulated geotag) · ${files.join(", ")}`
                    : files.join(", "),
                  panel === "proof" ? "proof" : "file",
                );
                setPanel(null);
              }}
            >
              Share
              <Send />
            </Primary>
          </>
        )}
      </Modal>
      <GPSAttendanceRadiusModal
        open={attendanceModalOpen}
        onClose={() => setAttendanceModalOpen(false)}
        onConfirmed={() => {
          state.markAttendance();
        }}
        eventName={c.name.replace(/ Team$/, "")}
        initialAttended={state.attended}
        onSwitchToActionCentre={() => setActiveTab("action")}
      />
      <GeotagProofModal
        open={proofModalOpen}
        onClose={() => setProofModalOpen(false)}
        onSubmitSuccess={(count) => {
          setNotice(`✅ ${count} geotagged photo proof(s) submitted successfully. Under review!`);
        }}
      />
      <LiveDeviceCameraModal
        open={cameraModalOpen}
        onClose={() => setCameraModalOpen(false)}
        title="Community Live Camera"
        withGeotag
        eventDetails={{
          communityName: c?.name || "Sangamam Community",
          eventName: "Palm Seeds Plantation Drive",
          address: "Chembarambakkam Lake Bund, Chennai, Tamil Nadu",
          lat: 13.0067,
          lng: 80.0033,
        }}
        onCapture={(dataUrl, cap) => {
          state.send(cap || "📷 Live camera capture", "image", { photoUrl: dataUrl });
          setNotice("Photo captured and sent to community chat");
        }}
      />
      <FeedbackModal
        open={feedbackModalOpen}
        onClose={() => setFeedbackModalOpen(false)}
        onSubmit={() => {
          setNotice("Thank you! Your feedback has been sent to the coordinators.");
        }}
      />
      <ReportIssueModal
        open={reportModalOpen}
        onClose={() => setReportModalOpen(false)}
        onSubmit={(rep) => {
          setReportedIssues((prev) => [
            {
              id: rep.id,
              category: rep.category,
              description: rep.description,
              priority: rep.priority,
              time: "Just now",
            },
            ...prev,
          ]);
          setNotice(`✅ Issue report ${rep.id} submitted to coordinator.`);
        }}
      />
      <ActionCentreTourModal
        open={showActionCentreGuide}
        onExplore={() => {
          setShowActionCentreGuide(false);
          switchTab("action");
        }}
        onClose={() => {
          setShowActionCentreGuide(false);
        }}
      />
      <FabTourModal
        open={showFabGuide && activeTab === "action"}
        onTryNow={() => {
          setShowFabGuide(false);
          const fab = document.getElementById("ma-action-fab-button");
          if (fab) fab.click();
        }}
        onClose={() => {
          setShowFabGuide(false);
        }}
      />
    </Page>
  );
}
function Incoming({
  sender,
  role,
  avatar,
  time,
  children,
}: {
  sender: string;
  role?: string;
  avatar: string;
  time: string;
  children: React.ReactNode;
}) {
  return (
    <div className="ma-incoming">
      <img src={photos[avatar]} alt={sender} />
      <div>
        <div className="ma-sender">
          {sender} {role && <i>({role})</i>}
        </div>
        <div className="ma-bubble">
          {children}
          <small className="ma-time">{time}</small>
        </div>
      </div>
    </div>
  );
}
function Outgoing({ children, time }: { children: React.ReactNode; time: string }) {
  return (
    <div className="ma-outgoing">
      <div>
        {children}
        <small>
          {time} <CheckCheck />
        </small>
      </div>
    </div>
  );
}
function ShareTile({
  tone,
  title,
  text,
  label,
  icon,
  onClick,
}: {
  tone: string;
  title: string;
  text: string;
  label?: string;
  icon: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <Action className={`ma-share-tile ma-share-tile--${tone}`} onClick={onClick}>
      {icon}
      <b>{title}</b>
      <span>{text}</span>
      {label && <small>{label}</small>}
      <ChevronRight />
    </Action>
  );
}

function GPSAttendanceRadiusModal({
  open,
  onClose,
  onConfirmed,
  eventName = "Palm Seeds Plantation",
  initialAttended = false,
  onSwitchToActionCentre,
}: {
  open: boolean;
  onClose: () => void;
  onConfirmed: () => void;
  eventName?: string;
  initialAttended?: boolean;
  onSwitchToActionCentre?: () => void;
}) {
  const [step, setStep] = useState<"precision" | "scanning" | "confirmed">("precision");
  const [precisionMode, setPrecisionMode] = useState<"high" | "standard">("high");
  const [scanPhase, setScanPhase] = useState(0);
  const [distanceDisplay, setDistanceDisplay] = useState(300);
  const [statusMessage, setStatusMessage] = useState("Calibrating High-Precision GPS...");

  // Reset or initialize when opened
  useEffect(() => {
    if (open) {
      if (initialAttended) {
        setStep("confirmed");
      } else {
        setStep("precision");
        setPrecisionMode("high");
        setScanPhase(0);
        setDistanceDisplay(300);
        setStatusMessage("Calibrating High-Precision GPS...");
      }
    }
  }, [open, initialAttended]);

  // Handle Scanning Animation
  useEffect(() => {
    if (step !== "scanning") return;

    const t1 = setTimeout(() => {
      setScanPhase(1);
      setStatusMessage("Locking onto Satellites (14 NavIC/GPS signals)...");
      setDistanceDisplay(235);
    }, 700);

    const t2 = setTimeout(() => {
      setScanPhase(2);
      setStatusMessage("Acquiring High-Precision Coordinates (Accuracy: ±2.1m)...");
      setDistanceDisplay(158);
    }, 1500);

    const t3 = setTimeout(() => {
      setScanPhase(3);
      setStatusMessage("Measuring Geofence Radius to Event Ground Zero...");
      setDistanceDisplay(98);
    }, 2300);

    const t4 = setTimeout(() => {
      setScanPhase(4);
      setStatusMessage("Geofence Verified! You are 72m inside the 300m Zone.");
      setDistanceDisplay(72);
    }, 3100);

    const t5 = setTimeout(() => {
      setStep("confirmed");
      onConfirmed();
    }, 3900);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      clearTimeout(t5);
    };
  }, [step, onConfirmed]);

  if (!open) return null;

  return (
    <div className="ma-assigned-modal-backdrop" onClick={onClose}>
      <div
        className="ma-assigned-modal ma-gps-radius-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="gps-radius-title"
      >
        {/* Step 1: Ask Location Perfection */}
        {step === "precision" && (
          <>
            <div className="ma-assigned-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 38,
                    height: 38,
                    borderRadius: 10,
                    background: "#FEF3C7",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#D97706",
                    flexShrink: 0,
                  }}
                >
                  <Navigation size={20} strokeWidth={2.4} />
                </div>
                <div>
                  <h3 id="gps-radius-title" style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#0F172A" }}>
                    Location Precision &amp; Perfection
                  </h3>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#64748B" }}>
                    High-Accuracy GPS Geofence Check
                  </p>
                </div>
              </div>
              <button
                type="button"
                className="ma-assigned-modal-close"
                onClick={onClose}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="ma-assigned-modal-body" style={{ maxHeight: "78vh", overflowY: "auto", padding: "16px" }}>
              {/* Event Location Target Card */}
              <div className="ma-gps-target-card">
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 10.5, fontWeight: 700, color: "#D97706", textTransform: "uppercase", letterSpacing: "0.5px" }}>
                    Target Geofence Zone
                  </span>
                  <span className="ma-status-pill ma-status-pill--green" style={{ fontSize: 10, padding: "2px 8px" }}>
                    ● Active Event
                  </span>
                </div>
                <h4 style={{ margin: "0 0 4px", fontSize: 14, fontWeight: 800, color: "#0F172A" }}>
                  {eventName}
                </h4>
                <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11.5, color: "#475569" }}>
                  <MapPin size={13} style={{ color: "#D97706", flexShrink: 0 }} />
                  <span>Chembarambakkam Lake Bund, Chennai</span>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                  <div className="ma-gps-chip">
                    <span>Allowed Radius:</span>
                    <strong>300 meters</strong>
                  </div>
                  <div className="ma-gps-chip">
                    <span>Perimeter:</span>
                    <strong>Strict Geofence</strong>
                  </div>
                </div>
              </div>

              {/* Location Precision Options */}
              <div style={{ marginTop: 14 }}>
                <h4 style={{ margin: "0 0 8px", fontSize: 12.5, fontWeight: 700, color: "#1E293B" }}>
                  Select Location Accuracy Level:
                </h4>

                <div
                  className={`ma-precision-option ${precisionMode === "high" ? "is-selected" : ""}`}
                  onClick={() => setPrecisionMode("high")}
                  role="button"
                  tabIndex={0}
                >
                  <div className="ma-precision-radio">
                    <span className="ma-precision-radio-dot" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 6 }}>
                      <strong style={{ fontSize: 12.5, color: "#0F172A" }}>High-Precision Ground GPS</strong>
                      <span className="ma-status-pill ma-status-pill--amber" style={{ fontSize: 9.5, padding: "2px 6px" }}>
                        Recommended
                      </span>
                    </div>
                    <p style={{ margin: "3px 0 0", fontSize: 11, color: "#64748B", lineHeight: 1.35 }}>
                      Combines Multi-Band GPS, GLONASS &amp; Wi-Fi for sub-3 meter accuracy. Required for real-time radius matching.
                    </p>
                  </div>
                </div>

                <div
                  className={`ma-precision-option ${precisionMode === "standard" ? "is-selected" : ""}`}
                  onClick={() => setPrecisionMode("standard")}
                  role="button"
                  tabIndex={0}
                  style={{ marginTop: 8 }}
                >
                  <div className="ma-precision-radio">
                    <span className="ma-precision-radio-dot" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <strong style={{ fontSize: 12.5, color: "#0F172A" }}>Standard Cellular Location</strong>
                    <p style={{ margin: "3px 0 0", fontSize: 11, color: "#64748B", lineHeight: 1.35 }}>
                      Cell tower triangulation only (~50m - 100m accuracy). May require re-scanning if outside radius.
                    </p>
                  </div>
                </div>
              </div>

              {/* Sensor Perfection Checklist */}
              <div className="ma-gps-checklist">
                <div className="ma-gps-check-item">
                  <Check size={13} strokeWidth={3} className="ma-gps-check-icon" />
                  <span>Hardware GPS Sensor Active</span>
                </div>
                <div className="ma-gps-check-item">
                  <Check size={13} strokeWidth={3} className="ma-gps-check-icon" />
                  <span>Digital Compass &amp; Gyroscope Calibrated</span>
                </div>
                <div className="ma-gps-check-item">
                  <Check size={13} strokeWidth={3} className="ma-gps-check-icon" />
                  <span>Event Radius Threshold Configured (300m)</span>
                </div>
              </div>
            </div>

            <div className="ma-assigned-modal-foot" style={{ padding: "12px 16px", borderTop: "1px solid #E2E8F0", background: "#FFFFFF", display: "flex", gap: 10 }}>
              <button
                type="button"
                className="ma-modal-btn-cancel"
                onClick={onClose}
                style={{
                  padding: "9px 16px",
                  borderRadius: 10,
                  border: "1px solid #CBD5E1",
                  background: "#F8FAFC",
                  color: "#334155",
                  fontSize: 12,
                  fontWeight: 600,
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="ma-modal-btn-submit"
                style={{
                  flex: 1,
                  background: "#FEC802",
                  color: "#0F172A",
                  fontWeight: 800,
                  border: "none",
                  padding: "9px 16px",
                  borderRadius: 10,
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  cursor: "pointer",
                  fontSize: 13,
                  boxShadow: "0 2px 8px rgba(254, 200, 2, 0.4)",
                }}
                onClick={() => setStep("scanning")}
              >
                <Radio size={16} strokeWidth={2.4} />
                <span>Fetch &amp; Scan Location Radius</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </>
        )}

        {/* Step 2: Super Attractive Loading Fetching Animation of Radius */}
        {step === "scanning" && (
          <div style={{ padding: "20px 16px 24px", textAlign: "center" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 16 }}>
              <div style={{ textAlign: "left" }}>
                <span className="ma-status-pill ma-status-pill--blue" style={{ fontSize: 10, padding: "2px 8px" }}>
                  <Radio size={12} className="ma-spin-pulse" />
                  Live Satellite Scan
                </span>
                <h3 style={{ margin: "4px 0 0", fontSize: 16, fontWeight: 800, color: "#0F172A" }}>
                  Measuring Geofence Radius
                </h3>
              </div>
              <div className="ma-gps-accuracy-badge">
                <span style={{ fontSize: 9.5, color: "#64748B" }}>Precision</span>
                <strong style={{ fontSize: 12, color: "#0284C7" }}>±2.1 m</strong>
              </div>
            </div>

            {/* RADAR SCREEN CONTAINER */}
            <div className="ma-radar-container">
              {/* Radar Crosshairs */}
              <div className="ma-radar-crosshair-h" />
              <div className="ma-radar-crosshair-v" />

              {/* Concentric Range Rings */}
              <div className="ma-radar-ring ma-radar-ring--300m">
                <span className="ma-radar-ring-label">300m Perimeter</span>
              </div>
              <div className="ma-radar-ring ma-radar-ring--150m" />
              <div className="ma-radar-ring ma-radar-ring--75m" />

              {/* Rotating Radar Sweep Beam */}
              <div className="ma-radar-sweep-beam" />

              {/* Pulsing Sonar Ripples */}
              <div className="ma-radar-ripple-pulse ring-1" />
              <div className="ma-radar-ripple-pulse ring-2" />
              <div className="ma-radar-ripple-pulse ring-3" />

              {/* Center Event Beacon */}
              <div className="ma-radar-center-beacon">
                <div className="ma-beacon-dot" />
                <span className="ma-beacon-label">Event Center</span>
              </div>

              {/* Volunteer Blip Ping (Appears after phase 1) */}
              {scanPhase >= 1 && (
                <div className="ma-radar-volunteer-blip" style={{ transform: `scale(${scanPhase >= 3 ? 1 : 0.8})` }}>
                  <div className="ma-blip-dot" />
                  <div className="ma-blip-wave" />
                  <div className="ma-blip-tag">
                    <span>You · 72m</span>
                  </div>
                </div>
              )}
            </div>

            {/* LIVE TELEMETRY DISPLAY */}
            <div className="ma-radar-telemetry-hud">
              <div className="ma-distance-readout">
                <span className="ma-dist-num">{distanceDisplay}</span>
                <span className="ma-dist-unit">meters</span>
              </div>
              <p className="ma-dist-label">Current Distance to Event Location</p>

              {/* Geofence Progress Meter */}
              <div className="ma-radius-bar-track">
                <div
                  className="ma-radius-bar-fill"
                  style={{ width: `${Math.max(15, ((300 - distanceDisplay) / 300) * 100)}%` }}
                />
                <span className="ma-radius-bar-marker">300m Limit</span>
              </div>

              {/* Status Message Terminal */}
              <div className="ma-scan-status-terminal">
                <span className="ma-radar-blinking-dot" />
                <span style={{ fontSize: 11.5, fontWeight: 600, color: "#38BDF8" }}>
                  {statusMessage}
                </span>
              </div>

              {/* Satellite Metrics Grid */}
              <div className="ma-scan-metrics-grid">
                <div>
                  <small>Satellites</small>
                  <strong>14 Locked</strong>
                </div>
                <div>
                  <small>Allowed Radius</small>
                  <strong>300 m</strong>
                </div>
                <div>
                  <small>Current Radius</small>
                  <strong style={{ color: scanPhase >= 3 ? "#10B981" : "#F59E0B" }}>
                    {distanceDisplay} m {scanPhase >= 3 ? "(PASS)" : ""}
                  </strong>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Confirmed Attendance Mark */}
        {step === "confirmed" && (
          <div style={{ padding: "20px 16px 20px", textAlign: "center" }}>
            <div className="ma-success-art" style={{ margin: "0 auto 12px" }}>
              <img
                src="/assets/illustrations/success-checkmark.png"
                alt="Attendance confirmed"
                style={{ width: 84, height: 84, display: "block", margin: "0 auto" }}
              />
              <span style={{ fontSize: 22 }}>🎉 🛡️</span>
            </div>

            <h2 style={{ fontSize: 20, fontWeight: 800, color: "#0F172A", margin: "4px 0" }}>
              Attendance Marked Successfully!
            </h2>
            <p style={{ fontSize: 12, color: "#475569", margin: "0 0 16px", lineHeight: 1.45 }}>
              You have been verified within the event perimeter for <strong>{eventName}</strong>.
            </p>

            {/* Verification Dossier Card */}
            <div className="ma-confirmed-dossier-card">
              <div className="ma-confirmed-status-bar">
                <div style={{ display: "inline-flex", alignItems: "center", gap: 6 }}>
                  <ShieldCheck size={16} style={{ color: "#059669" }} />
                  <strong style={{ fontSize: 12, color: "#065F46" }}>GPS Geofence Verified &amp; Confirmed</strong>
                </div>
                <span className="ma-status-pill ma-status-pill--green" style={{ fontSize: 10 }}>
                  ● Confirmed
                </span>
              </div>

              <div className="ma-confirmed-grid">
                <div className="ma-confirmed-item">
                  <span className="ma-confirmed-lbl">Volunteer</span>
                  <span className="ma-confirmed-val">Sanjai R (MT4507)</span>
                </div>
                <div className="ma-confirmed-item">
                  <span className="ma-confirmed-lbl">Verified Distance</span>
                  <span className="ma-confirmed-val" style={{ color: "#059669" }}>
                    72 meters (Within 300m)
                  </span>
                </div>
                <div className="ma-confirmed-item">
                  <span className="ma-confirmed-lbl">GPS Precision</span>
                  <span className="ma-confirmed-val">High (±2.1m Accuracy)</span>
                </div>
                <div className="ma-confirmed-item">
                  <span className="ma-confirmed-lbl">Check-In Time</span>
                  <span className="ma-confirmed-val">Today · 9:15 AM</span>
                </div>
              </div>

              <div className="ma-confirmed-hours-badge">
                <Clock3 size={14} style={{ color: "#D97706" }} />
                <span>3 Volunteering Contribution Hours Recorded in Roster</span>
              </div>
            </div>

            <button
              type="button"
              className="ma-modal-btn-submit"
              style={{
                width: "100%",
                background: "#FEC802",
                color: "#0F172A",
                fontWeight: 800,
                border: "none",
                padding: "12px 18px",
                borderRadius: 12,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                cursor: "pointer",
                fontSize: 14,
                marginTop: 18,
                boxShadow: "0 3px 10px rgba(254, 200, 2, 0.4)",
              }}
              onClick={() => {
                onClose();
                if (onSwitchToActionCentre) {
                  onSwitchToActionCentre();
                }
              }}
            >
              <Check size={18} strokeWidth={2.8} />
              <span>Great! View in Action Centre</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
function AttendanceCard({ onMark }: { onMark: () => void }) {
  const state = useMaatramState();
  const within = isWithinAttendanceRadius(
    attendanceMock.distanceMeters,
    attendanceMock.allowedRadiusMeters,
  );
  return (
    <section className="ma-attendance">
      <header>
        <ShieldCheck />
        <div>
          <h2>GPS Attendance</h2>
          <small>Palm Seeds Plantation</small>
        </div>
        <span className="ma-active">● Live</span>
      </header>
      <div className="ma-attendance-info">
        <div className="ma-map">
          <div className="ma-map-radius">
            <MapPin />
            <b>Event Location</b>
          </div>
          <span>
            Allowed Radius
            <br />
            <b>300 meters</b>
          </span>
        </div>
        <div>
          <p>
            <CalendarDays />
            Nov 02, 2026
          </p>
          <p>
            <Clock3 />
            9:00 AM – 12:00 PM
          </p>
          <p>
            <MapPin />
            Chennai
          </p>
          <p>
            <Users />
            42 Volunteers
          </p>
        </div>
      </div>
      <div className="ma-within">
        <MapPin />
        <span>
          <b>{within ? "You are within the event location!" : "Outside the event radius"}</b>
          <small>Distance: 72 meters (within 300 m) · Simulated</small>
        </span>
      </div>
      <Primary disabled={state.attended || !within} onClick={onMark}>
        {state.attended ? <Check /> : <HandAttendance />}
        {state.attended ? "Attendance Marked" : "Mark Attendance"}
      </Primary>
      <div className="ma-attendance-count">
        <span>
          <Users /> Attendance Progress
        </span>
        <span>{state.markedCount} / 42 Marked</span>
      </div>
      <Progress value={state.markedCount} max={42} />
    </section>
  );
}
function HandAttendance() {
  return <ShieldCheck />;
}
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

function RejectedProofModal({
  open,
  onClose,
  onResubmit,
}: {
  open: boolean;
  onClose: () => void;
  onResubmit: () => void;
}) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="ma-assigned-modal-backdrop" onClick={onClose}>
      <div
        className="ma-assigned-modal ma-rejected-proof-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="rejected-proof-title"
      >
        {/* Modal Header */}
        <div className="ma-assigned-modal-head">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "#FEF2F2",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#DC2626",
                flexShrink: 0,
              }}
            >
              <Camera size={18} strokeWidth={2.4} />
            </div>
            <div>
              <h3 id="rejected-proof-title" style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#0F172A" }}>
                Proof Submission Review
              </h3>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "#64748B" }}>
                Palm Seeds Plantation · Ref #PRF-8924
              </p>
            </div>
          </div>
          <button
            type="button"
            className="ma-assigned-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="ma-assigned-modal-body" style={{ maxHeight: "78vh", overflowY: "auto", padding: "14px" }}>
          {/* Status Banner */}
          <div className="ma-proof-status-banner">
            <div className="ma-proof-status-pill">
              <XCircle size={15} strokeWidth={2.6} />
              <span>Rejected by Admin Operations</span>
            </div>
            <span className="ma-proof-status-time">Today · 11:30 AM</span>
          </div>

          {/* Reason for Rejection Box */}
          <div className="ma-proof-reason-card">
            <div className="ma-proof-reason-header">
              <AlertTriangle size={17} className="ma-proof-alert-icon" />
              <h4>Reason for Rejection:</h4>
            </div>
            <p className="ma-proof-reason-text">
              "Photograph is blurred and does not clearly show active plantation work or volunteer badge. GPS coordinates were also slightly outside the permitted lake bund planting perimeter. Please retake clear, well-lit photos with face and saplings clearly visible."
            </p>
            <div className="ma-proof-flags-list">
              <div className="ma-proof-flag-item">
                <span className="ma-proof-flag-bullet">✕</span>
                <span>Photograph is blurred & low resolution</span>
              </div>
              <div className="ma-proof-flag-item">
                <span className="ma-proof-flag-bullet">✕</span>
                <span>Volunteer face / Maatram badge not recognizable</span>
              </div>
              <div className="ma-proof-flag-item">
                <span className="ma-proof-flag-bullet">✕</span>
                <span>GPS coordinates (+42m) outside lake bund boundary</span>
              </div>
            </div>
            <div className="ma-proof-admin-reviewer">
              <span>Reviewed by: <strong>Karthikeyan M (Operations Lead)</strong></span>
            </div>
          </div>

          {/* Attached Proof Images */}
          <div className="ma-proof-section">
            <div className="ma-proof-section-head">
              <Image size={15} />
              <h4>Attached Proof Images (2 Photos)</h4>
            </div>

            <div className="ma-proof-photos-grid">
              <div
                className="ma-proof-photo-card"
                onClick={() => setSelectedPhoto("/assets/additional/planting-clean.jpg")}
                role="button"
                tabIndex={0}
              >
                <div className="ma-proof-img-wrap">
                  <img
                    src="/assets/additional/planting-clean.jpg"
                    alt="Proof 1 - Palm seed plantation"
                    className="ma-proof-thumb"
                  />
                  <span className="ma-proof-flag-badge">Flagged: Blurry</span>
                  <div className="ma-proof-geotag-overlay">
                    <MapPin size={9} />
                    <span>13.0827° N, 80.2707° E</span>
                  </div>
                </div>
                <div className="ma-proof-photo-meta">
                  <strong>Photo 1: Sapling Bed 04</strong>
                  <small>Taken Today, 09:42 AM · 2.4 MB</small>
                </div>
              </div>

              <div
                className="ma-proof-photo-card"
                onClick={() => setSelectedPhoto("/assets/additional/palm-team.jpg")}
                role="button"
                tabIndex={0}
              >
                <div className="ma-proof-img-wrap">
                  <img
                    src="/assets/additional/palm-team.jpg"
                    alt="Proof 2 - Lake bund plantation"
                    className="ma-proof-thumb"
                  />
                  <span className="ma-proof-flag-badge">Flagged: Out of bounds</span>
                  <div className="ma-proof-geotag-overlay">
                    <MapPin size={9} />
                    <span>13.0831° N, 80.2714° E</span>
                  </div>
                </div>
                <div className="ma-proof-photo-meta">
                  <strong>Photo 2: Lake Bund Work Area</strong>
                  <small>Taken Today, 09:44 AM · 3.1 MB</small>
                </div>
              </div>
            </div>
          </div>

          {/* Verification Timeline */}
          <div className="ma-proof-section" style={{ marginTop: 14 }}>
            <div className="ma-proof-section-head">
              <Clock3 size={15} />
              <h4>Verification Timeline</h4>
            </div>

            <div className="ma-proof-timeline">
              {/* Step 1 */}
              <div className="ma-timeline-step is-complete">
                <div className="ma-timeline-marker">
                  <Check size={11} strokeWidth={3} />
                </div>
                <div className="ma-timeline-content">
                  <div className="ma-timeline-row">
                    <strong>Proof Uploaded & Submitted</strong>
                    <span className="ma-timeline-time">09:45 AM</span>
                  </div>
                  <p>2 geotagged photos uploaded with GPS telemetry by Sanjai R.</p>
                </div>
              </div>

              {/* Step 2 */}
              <div className="ma-timeline-step is-complete">
                <div className="ma-timeline-marker">
                  <Check size={11} strokeWidth={3} />
                </div>
                <div className="ma-timeline-content">
                  <div className="ma-timeline-row">
                    <strong>Admin Verification Underway</strong>
                    <span className="ma-timeline-time">10:15 AM</span>
                  </div>
                  <p>Assigned to Admin Operations team for perimeter & quality inspection.</p>
                </div>
              </div>

              {/* Step 3 */}
              <div className="ma-timeline-step is-rejected">
                <div className="ma-timeline-marker ma-timeline-marker--red">
                  <X size={11} strokeWidth={3.5} />
                </div>
                <div className="ma-timeline-content">
                  <div className="ma-timeline-row">
                    <strong style={{ color: "#DC2626" }}>Rejected by Admin</strong>
                    <span className="ma-timeline-time">11:30 AM</span>
                  </div>
                  <p>
                    Verification declined by Admin Operations. Reason logged with resubmission request.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Expanded Photo Preview Modal (if clicked) */}
          {selectedPhoto && (
            <div
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.85)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: 16,
                zIndex: 1000,
              }}
              onClick={() => setSelectedPhoto(null)}
            >
              <img
                src={selectedPhoto}
                alt="Enlarged proof"
                style={{
                  maxWidth: "92vw",
                  maxHeight: "75vh",
                  borderRadius: 12,
                  boxShadow: "0 8px 30px rgba(0,0,0,0.5)",
                }}
              />
              <button
                type="button"
                style={{
                  marginTop: 12,
                  padding: "6px 16px",
                  borderRadius: 20,
                  background: "#FFFFFF",
                  border: "none",
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: "pointer",
                }}
                onClick={() => setSelectedPhoto(null)}
              >
                Close Full Photo
              </button>
            </div>
          )}
        </div>

        {/* Modal Footer Actions */}
        <div className="ma-assigned-modal-foot" style={{ display: "flex", justifyContent: "space-between", gap: 10 }}>
          <button
            type="button"
            className="ma-modal-btn-cancel"
            onClick={onClose}
          >
            Close
          </button>
          <button
            type="button"
            className="ma-modal-btn-submit"
            style={{
              background: "#FEC802",
              color: "#0F172A",
              fontWeight: 700,
              border: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
            onClick={onResubmit}
          >
            <Camera size={15} />
            <span>Resubmit Proof</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function FundingRequestReviewModal({
  open,
  onClose,
  onNewRequest,
}: {
  open: boolean;
  onClose: () => void;
  onNewRequest: () => void;
}) {
  const [selectedPhoto, setSelectedPhoto] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="ma-assigned-modal-backdrop" onClick={onClose}>
      <div
        className="ma-assigned-modal ma-funding-review-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="funding-review-title"
      >
        {/* Modal Header */}
        <div className="ma-assigned-modal-head">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 36,
                height: 36,
                borderRadius: 10,
                background: "#EFF6FF",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#2563EB",
                flexShrink: 0,
              }}
            >
              <Wallet size={18} strokeWidth={2.4} />
            </div>
            <div>
              <h3 id="funding-review-title" style={{ margin: 0, fontSize: 15, fontWeight: 800, color: "#0F172A" }}>
                Funding Request Details
              </h3>
              <p style={{ margin: "2px 0 0", fontSize: 11, color: "#64748B" }}>
                Palm Seeds Plantation · Ref #FND-2026-0842
              </p>
            </div>
          </div>
          <button
            type="button"
            className="ma-assigned-modal-close"
            onClick={onClose}
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="ma-assigned-modal-body" style={{ maxHeight: "78vh", overflowY: "auto", padding: "14px" }}>
          {/* Status Banner */}
          <div className="ma-fund-status-banner">
            <div className="ma-fund-status-pill">
              <Hourglass size={15} />
              <span>Under Review by Admin Operations</span>
            </div>
            <span className="ma-fund-status-time">1d ago</span>
          </div>

          {/* Request Overview Card */}
          <div className="ma-fund-summary-card">
            <div className="ma-fund-summary-top">
              <div>
                <span className="ma-fund-label">Requested Reimbursement</span>
                <div className="ma-fund-amount">₹ 250</div>
              </div>
              <span className="ma-fund-category-tag">Travel Allowance</span>
            </div>

            <div className="ma-fund-desc-box">
              <strong>Expense Purpose:</strong> Travelled to the event location (Chennai) for Palm Seeds Plantation.
            </div>

            <div className="ma-fund-meta-grid">
              <div className="ma-fund-meta-item">
                <span className="ma-fund-meta-lbl">Expense Category</span>
                <span className="ma-fund-meta-val">Travel</span>
              </div>
              <div className="ma-fund-meta-item">
                <span className="ma-fund-meta-lbl">Payment Mode</span>
                <span className="ma-fund-meta-val">UPI (GPay / PhonePe)</span>
              </div>
              <div className="ma-fund-meta-item">
                <span className="ma-fund-meta-lbl">UPI ID</span>
                <span className="ma-fund-meta-val">sanjai-1806@okaxis</span>
              </div>
              <div className="ma-fund-meta-item">
                <span className="ma-fund-meta-lbl">Claimant Volunteer</span>
                <span className="ma-fund-meta-val">Sanjai R (MT4507)</span>
              </div>
            </div>
          </div>

          {/* Attached Bill / Receipt Proof */}
          <div className="ma-proof-section">
            <div className="ma-proof-section-head">
              <FileText size={15} />
              <h4>Attached Bill / Proof (1 Document)</h4>
            </div>

            <div
              className="ma-fund-bill-card"
              onClick={() => setSelectedPhoto("/assets/additional/bus-ticket-receipt.png")}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") setSelectedPhoto("/assets/additional/bus-ticket-receipt.png");
              }}
            >
              <div className="ma-fund-bill-preview-wrap">
                <img
                  src="/assets/additional/bus-ticket-receipt.png"
                  alt="Attached Bus Travel Ticket Bill"
                  className="ma-fund-bill-img"
                />
                <div className="ma-fund-bill-overlay">
                  <Eye size={13} />
                  <span>Tap to view bill</span>
                </div>
              </div>
              <div className="ma-fund-bill-meta">
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <div
                    style={{
                      width: 28,
                      height: 28,
                      borderRadius: 6,
                      background: "#F1F5F9",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#475569",
                    }}
                  >
                    <FileText size={16} />
                  </div>
                  <div>
                    <strong style={{ fontSize: 12, color: "#0F172A", display: "block" }}>Bus_Ticket.jpg</strong>
                    <small style={{ fontSize: 10, color: "#64748B" }}>TNSTC Express · Kuzhithurai Depot · Rs. 61 · 44 KB</small>
                  </div>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#2563EB" }}>Verified Proof</span>
              </div>
            </div>
          </div>

          {/* Verification Timeline */}
          <div className="ma-proof-section" style={{ marginTop: 14 }}>
            <div className="ma-proof-section-head">
              <Clock3 size={15} />
              <h4>Request Status & Timeline</h4>
            </div>

            <div className="ma-proof-timeline">
              {/* Step 1: Submitted */}
              <div className="ma-timeline-step is-complete">
                <div className="ma-timeline-marker">
                  <Check size={11} strokeWidth={3} />
                </div>
                <div className="ma-timeline-content">
                  <div className="ma-timeline-row">
                    <strong>Reimbursement Request Submitted</strong>
                    <span className="ma-timeline-time">Yesterday · 10:30 AM</span>
                  </div>
                  <p>Claim for ₹250 submitted with travel bill (Bus_Ticket.jpg) and UPI ID.</p>
                </div>
              </div>

              {/* Step 2: Under Review */}
              <div className="ma-timeline-step is-active-review">
                <div className="ma-timeline-marker ma-timeline-marker--blue">
                  <Hourglass size={11} strokeWidth={2.5} />
                </div>
                <div className="ma-timeline-content">
                  <div className="ma-timeline-row">
                    <strong style={{ color: "#1D4ED8" }}>Under Review by Finance Desk</strong>
                    <span className="ma-timeline-time" style={{ color: "#2563EB", fontWeight: 700 }}>In Progress</span>
                  </div>
                  <p>Accounts team is verifying the travel receipt and attendance log. Expected turnaround: 24h.</p>
                </div>
              </div>

              {/* Step 3: Disbursement */}
              <div className="ma-timeline-step is-pending">
                <div className="ma-timeline-marker ma-timeline-marker--gray">
                  <span style={{ fontSize: 10, fontWeight: 700 }}>3</span>
                </div>
                <div className="ma-timeline-content">
                  <div className="ma-timeline-row">
                    <strong style={{ color: "#64748B" }}>Disbursement & Credit</strong>
                    <span className="ma-timeline-time">Upcoming</span>
                  </div>
                  <p>Upon approval, ₹250 will be credited directly to <strong>sanjai-1806@okaxis</strong> via UPI.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer Actions */}
        <div
          className="ma-assigned-modal-foot"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 14px",
            borderTop: "1px solid #E2E8F0",
            background: "#FFFFFF",
          }}
        >
          <button
            type="button"
            className="ma-modal-btn-cancel"
            onClick={onClose}
            style={{
              padding: "8px 14px",
              borderRadius: 8,
              border: "1px solid #CBD5E1",
              background: "#F8FAFC",
              color: "#334155",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <button
            type="button"
            className="ma-modal-btn-submit"
            style={{
              background: "#FEC802",
              color: "#0F172A",
              fontWeight: 700,
              border: "none",
              padding: "8px 14px",
              borderRadius: 8,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              cursor: "pointer",
              fontSize: 12,
            }}
            onClick={onNewRequest}
          >
            <Plus size={15} strokeWidth={2.4} />
            <span>New Fund Request</span>
          </button>
        </div>

        {/* Full Image Zoom Lightbox */}
        {selectedPhoto && (
          <div
            className="ma-assigned-modal-backdrop"
            style={{ zIndex: 1200, background: "rgba(0,0,0,0.88)" }}
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              style={{
                maxWidth: 440,
                width: "92%",
                background: "#0F172A",
                borderRadius: 16,
                padding: 14,
                position: "relative",
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  background: "rgba(255,255,255,0.25)",
                  border: "none",
                  color: "#FFF",
                  borderRadius: "50%",
                  width: 32,
                  height: 32,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  zIndex: 10,
                }}
              >
                <X size={18} />
              </button>
              <img
                src={selectedPhoto}
                alt="Enlarged Bus Ticket"
                style={{
                  width: "100%",
                  maxHeight: "75vh",
                  objectFit: "contain",
                  borderRadius: 8,
                  display: "block",
                  background: "#1E293B",
                }}
              />
              <div
                style={{
                  textAlign: "center",
                  marginTop: 10,
                  color: "#CBD5E1",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              >
                Official Bus Ticket & Receipt · ₹250 (MTC Chennai)
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ThankNoteCertificateModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [downloadNotice, setDownloadNotice] = useState(false);

  if (!open) return null;

  const handleLinkedInShare = () => {
    const certUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}/assets/impact/maatram-thank-you-certificate.png`
        : "https://maatramfoundation.org/certificates/sample";
    const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(certUrl)}`;
    window.open(linkedInUrl, "_blank", "noopener,noreferrer");
  };

  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = "/assets/impact/maatram-thank-you-certificate.png";
    link.download = "Maatram_Volunteer_Certificate_Sanjai_R.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3500);
  };

  return (
    <div className="ma-assigned-modal-backdrop" onClick={onClose}>
      <div
        className="ma-assigned-modal ma-thank-note-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="thank-note-modal-title"
      >
        {/* Modal Header */}
        <div className="ma-assigned-modal-head">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: 10,
                background: "#FEF3C7",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#D97706",
                flexShrink: 0,
              }}
            >
              <Award size={22} strokeWidth={2.4} />
            </div>
            <div>
              <h3 id="thank-note-modal-title" style={{ fontSize: 16, fontWeight: 800, margin: 0, color: "#0F172A" }}>
                Thank You Note &amp; Certificate
              </h3>
              <p style={{ fontSize: 11, color: "#64748B", margin: "2px 0 0" }}>
                Palm Seeds Plantation · Ref #CERT-2026-0914
              </p>
            </div>
          </div>
          <button
            type="button"
            className="ma-assigned-modal-close"
            onClick={onClose}
            aria-label="Close dialog"
            style={{
              background: "#F1F5F9",
              border: "none",
              borderRadius: "50%",
              width: 32,
              height: 32,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "#64748B",
            }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Modal Body */}
        <div className="ma-assigned-modal-body" style={{ maxHeight: "78vh", overflowY: "auto", padding: "14px 16px" }}>
          {/* Status Delivery Banner */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#ECFDF5",
              border: "1.5px solid #A7F3D0",
              borderRadius: 12,
              padding: "9px 12px",
              marginBottom: 14,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div
                style={{
                  width: 22,
                  height: 22,
                  borderRadius: "50%",
                  background: "#10B981",
                  color: "#FFFFFF",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}
              >
                <Check size={13} strokeWidth={3} />
              </div>
              <div>
                <span style={{ fontSize: 12, fontWeight: 800, color: "#065F46", display: "block" }}>
                  Official Certificate Received &amp; Verified
                </span>
                <small style={{ fontSize: 10, color: "#047857" }}>
                  Dispatched by Aravind K (Admin Operations)
                </small>
              </div>
            </div>
            <span
              style={{
                fontSize: 10,
                fontWeight: 700,
                color: "#065F46",
                background: "#D1FAE5",
                padding: "3px 8px",
                borderRadius: 9999,
              }}
            >
              Received
            </span>
          </div>

          {/* Official Certificate Graphic Preview */}
          <div className="ma-cert-card-wrap">
            <div className="ma-cert-img-frame">
              <img
                src="/assets/impact/maatram-thank-you-certificate.png"
                alt="Official Maatram Appreciation Certificate"
                className="ma-cert-display-img"
              />
            </div>
            <div className="ma-cert-meta-strip">
              <div>
                <strong style={{ fontSize: 12, color: "#0F172A", display: "block" }}>
                  Certificate of Appreciation
                </strong>
                <small style={{ fontSize: 10.5, color: "#475569" }}>
                  Recipient: <strong style={{ color: "#0F172A" }}>Sanjai R</strong> (MT4507) · Palm Seeds Plantation
                </small>
              </div>
              <span className="ma-cert-badge-pill">
                <Sparkles size={11} />
                Verified Credential
              </span>
            </div>
          </div>

          {/* Personalized Thank You Note from Admin */}
          <div className="ma-thank-note-box">
            <div className="ma-thank-note-head">
              <Sparkles size={14} className="ma-thank-note-sparkle" />
              <h4>Personalized Note from Leadership</h4>
            </div>
            <p className="ma-thank-note-quote">
              &ldquo;Dear Sanjai R, On behalf of the entire Maatram Foundation team, we express our heartfelt gratitude
              for your dedicated volunteering at <strong>Palm Seeds Plantation</strong>. Your proactive service, teamwork,
              and positive energy made a real impact on our green environmental drive. You truly embody the spirit of
              giving back!&rdquo;
            </p>
            <div className="ma-thank-note-signatures">
              <div className="ma-thank-sign-item">
                <strong>Sujith Kumar</strong>
                <span>Founder &amp; Managing Trustee</span>
              </div>
              <div className="ma-thank-sign-divider" />
              <div className="ma-thank-sign-item">
                <strong>Aravind K</strong>
                <span>Lead Operations &amp; Coordinator</span>
              </div>
            </div>
          </div>

          {/* Download Notification Toast */}
          {downloadNotice && (
            <div className="ma-cert-toast-notice">
              <Check size={14} strokeWidth={3} />
              <span>Certificate downloaded successfully! (Maatram_Volunteer_Certificate_Sanjai_R.png)</span>
            </div>
          )}

          {/* Action Buttons Below Certificate: LinkedIn Share & Download */}
          <div className="ma-cert-actions-grid">
            {/* Share to LinkedIn */}
            <button
              type="button"
              className="ma-cert-btn-linkedin"
              onClick={handleLinkedInShare}
            >
              <Linkedin size={18} />
              <span>Share to LinkedIn</span>
            </button>

            {/* Download Certificate */}
            <button
              type="button"
              className="ma-cert-btn-download"
              onClick={handleDownload}
            >
              <Download size={18} />
              <span>Download Certificate</span>
            </button>
          </div>
        </div>

        {/* Modal Footer */}
        <div
          className="ma-assigned-modal-foot"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "10px 16px",
            borderTop: "1px solid #E2E8F0",
            background: "#FFFFFF",
          }}
        >
          <button
            type="button"
            className="ma-modal-btn-cancel"
            onClick={onClose}
            style={{
              padding: "8px 16px",
              borderRadius: 8,
              border: "1px solid #CBD5E1",
              background: "#F8FAFC",
              color: "#334155",
              fontSize: 12,
              fontWeight: 600,
              cursor: "pointer",
            }}
          >
            Close
          </button>
          <span style={{ fontSize: 11, color: "#64748B", fontWeight: 500 }}>
            Stored in your Impact Profile &amp; Portfolio
          </span>
        </div>
      </div>
    </div>
  );
}

function ActionCentreView({
  onMarkAttendance,
  onUploadProof,
  onReport,
  onFeedback,
  reportedIssues = [],
  isFabGuideActive = false,
}: {
  onMarkAttendance: () => void;
  onUploadProof: () => void;
  onReport: () => void;
  onFeedback: () => void;
  reportedIssues?: Array<{ id: string; category: string; description: string; priority: string; time: string }>;
  isFabGuideActive?: boolean;
}) {
  const [fabOpen, setFabOpen] = useState(false);
  const [rejectedProofModalOpen, setRejectedProofModalOpen] = useState(false);
  const [fundingModalOpen, setFundingModalOpen] = useState(false);
  const [thankNoteModalOpen, setThankNoteModalOpen] = useState(false);

  return (
    <div className="ma-action-centre-view">
      {/* Blurred background backdrop overlay when FAB dropdown is open */}
      {fabOpen && (
        <div
          className="ma-action-backdrop"
          onClick={() => setFabOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* 1. Hero Card - Luxury Gold-Bordered Pill Banner */}
      <section className="ma-action-hero" aria-label="Volunteer Hours Summary">
        <HoursCounter />
      </section>

      {/* 2. Action Centre Header Row */}
      <div className="ma-action-title-row">
        <h2>Action Centre</h2>
        <span className="ma-action-new-badge">
          {4 + reportedIssues.length} new <span className="ma-action-red-dot" />
        </span>
      </div>

      {/* 3. Action Cards List */}
      <div className="ma-action-cards-list">
        {/* Submitted Incident Reports (if any) */}
        {reportedIssues.map((rep) => (
          <div key={rep.id} className="ma-action-card ma-action-card--report">
            <div className="ma-action-card-icon ma-action-card-icon--amber">
              <AlertTriangle size={20} strokeWidth={2.2} />
            </div>
            <div className="ma-action-card-body">
              <h3 className="ma-action-card-title ma-action-card-title--amber">
                Report: {rep.category}
              </h3>
              <p className="ma-action-card-desc">{rep.description}</p>
              <div className="ma-action-card-subtime">
                <Clock3 size={12} />
                <span>{rep.time} · {rep.id}</span>
              </div>
            </div>
            <div className="ma-action-card-aside">
              <span className="ma-status-pill ma-status-pill--amber">
                <Hourglass size={12} />
                Under Review
              </span>
            </div>
          </div>
        ))}

        {/* Card 1: Mark Your Attendance! */}
        <div
          className="ma-action-card ma-action-card--attendance-open"
          onClick={onMarkAttendance}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onMarkAttendance();
          }}
        >
          <div className="ma-action-card-icon ma-action-card-icon--amber">
            <Megaphone size={20} strokeWidth={2.2} />
          </div>
          <div className="ma-action-card-body">
            <h3 className="ma-action-card-title ma-action-card-title--amber">Mark Your Attendance!</h3>
            <p className="ma-action-card-desc">Attendance for Sangamam Event is now open.</p>
            <span className="ma-action-card-link">Click to confirm your attendance.</span>
          </div>
          <ChevronRight size={18} className="ma-action-card-arrow" />
        </div>

        {/* Card 2: Attendance Marked */}
        <div className="ma-action-card">
          <div className="ma-action-card-icon ma-action-card-icon--green-circle">
            <Check size={18} strokeWidth={3} />
          </div>
          <div className="ma-action-card-body">
            <h3 className="ma-action-card-title">Attendance Marked</h3>
            <p className="ma-action-card-desc">
              You have successfully marked your attendance for this event.
            </p>
          </div>
          <div className="ma-action-card-aside">
            <span className="ma-status-pill ma-status-pill--green">
              <Check size={12} strokeWidth={3} />
              Confirmed
            </span>
            <span className="ma-action-card-time">Today, 9:15 AM</span>
          </div>
        </div>

        {/* Card 3: Funding Request (Under Review Details Modal) */}
        <div
          className="ma-action-card ma-action-card--clickable"
          onClick={() => setFundingModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setFundingModalOpen(true);
          }}
          style={{ cursor: "pointer" }}
        >
          <div className="ma-action-card-icon ma-action-card-icon--blue">
            <Wallet size={20} strokeWidth={2.2} />
          </div>
          <div className="ma-action-card-body">
            <h3 className="ma-action-card-title">Funding Request</h3>
            <p className="ma-action-card-desc">Your request is being reviewed by the admin.</p>
            <div className="ma-action-card-subtime">
              <Clock3 size={12} />
              <span>1d ago</span>
            </div>
          </div>
          <div className="ma-action-card-aside">
            <span className="ma-status-pill ma-status-pill--blue">
              <Hourglass size={12} />
              Under Review
            </span>
          </div>
        </div>

        {/* Card 4: Proof Submission (Rejected by Admin) */}
        <div
          className="ma-action-card ma-action-card--clickable"
          onClick={() => setRejectedProofModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setRejectedProofModalOpen(true);
          }}
        >
          <div className="ma-action-card-icon ma-action-card-icon--red">
            <Camera size={20} strokeWidth={2.2} />
          </div>
          <div className="ma-action-card-body">
            <h3 className="ma-action-card-title">Proof Submission</h3>
            <p className="ma-action-card-desc">
              Your submitted proof for Palm Seeds Plantation was rejected.
            </p>
            <div className="ma-action-card-subtime">
              <Clock3 size={12} />
              <span>Today, 11:30 AM · PRF-8924</span>
            </div>
          </div>
          <div className="ma-action-card-aside">
            <span className="ma-status-pill ma-status-pill--red">
              <XCircle size={12} strokeWidth={2.6} />
              Rejected
            </span>
          </div>
        </div>

        {/* Card 5: Thank You Note (Received) */}
        <div
          className="ma-action-card ma-action-card--clickable"
          onClick={() => setThankNoteModalOpen(true)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") setThankNoteModalOpen(true);
          }}
        >
          <div className="ma-action-card-icon ma-action-card-icon--gold-star">
            <Award size={20} strokeWidth={2.2} />
          </div>
          <div className="ma-action-card-body">
            <h3 className="ma-action-card-title">Thank You Note</h3>
            <p className="ma-action-card-desc">
              Official appreciation certificate &amp; thank note received from Admin.
            </p>
            <div className="ma-action-card-subtime">
              <Clock3 size={12} />
              <span>Today, 12:45 PM · CERT-2026-0914</span>
            </div>
          </div>
          <div className="ma-action-card-aside">
            <span className="ma-status-pill ma-status-pill--green">
              <Check size={12} strokeWidth={3} />
              Received
            </span>
          </div>
        </div>

        {/* Card 6: Contribution Hours */}
        <div className="ma-action-card">
          <div className="ma-action-card-icon ma-action-card-icon--purple">
            <Trophy size={20} strokeWidth={2.2} />
          </div>
          <div className="ma-action-card-body">
            <h3 className="ma-action-card-title">Contribution Hours</h3>
            <p className="ma-action-card-desc">Your volunteering hours have been updated.</p>
            <div className="ma-action-card-subtime">
              <Clock3 size={12} />
              <span>2d ago</span>
            </div>
          </div>
          <div className="ma-action-card-aside">
            <span className="ma-status-pill ma-status-pill--gray">
              <Check size={12} strokeWidth={3} />
              Updated
            </span>
          </div>
        </div>
      </div>

      {/* 4. Footer Motivational Text + FAB with Popup */}
      <div className="ma-action-footer">
        <div className="ma-action-motivate">
          <p>
            Stay active, keep contributing
            <br />
            to make an impact!
          </p>
          <svg width="120" height="12" viewBox="0 0 120 12" fill="none" aria-hidden="true">
            <path
              d="M2 9C40 3 80 4 118 7"
              stroke="#FEC802"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <div className="ma-action-fab-wrap">
          {fabOpen && (
            <div className="ma-action-popup-menu" role="menu">
              <button
                type="button"
                className="ma-action-popup-item"
                onClick={() => {
                  setFabOpen(false);
                  onUploadProof();
                }}
              >
                <div className="ma-action-popup-icon">
                  <Camera size={20} strokeWidth={2.2} />
                </div>
                <div className="ma-action-popup-text">
                  <b>Upload Proof</b>
                  <small>Submit geotag photos with GPS watermark</small>
                </div>
              </button>

              <Link
                to="/fund-request"
                className="ma-action-popup-item"
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => setFabOpen(false)}
              >
                <div className="ma-action-popup-icon">
                  <Wallet size={20} strokeWidth={2.2} />
                </div>
                <div className="ma-action-popup-text">
                  <b>Request Funding</b>
                  <small>Ask for financial reimbursement</small>
                </div>
              </Link>

              <button
                type="button"
                className="ma-action-popup-item"
                onClick={() => {
                  setFabOpen(false);
                  onReport();
                }}
              >
                <div className="ma-action-popup-icon">
                  <AlertTriangle size={20} strokeWidth={2.2} />
                </div>
                <div className="ma-action-popup-text">
                  <b>Submit a Report</b>
                  <small>Report an issue to coordinator</small>
                </div>
              </button>

              <button
                type="button"
                className="ma-action-popup-item"
                onClick={() => {
                  setFabOpen(false);
                  onFeedback();
                }}
              >
                <div className="ma-action-popup-icon">
                  <Sparkles size={20} strokeWidth={2.2} />
                </div>
                <div className="ma-action-popup-text">
                  <b>Submit Feedback</b>
                  <small>Share your volunteer drive experience</small>
                </div>
              </button>
            </div>
          )}

          <button
            type="button"
            id="ma-action-fab-button"
            className={`ma-action-fab ${fabOpen ? "is-open" : ""} ${isFabGuideActive ? "is-tour-spotlight" : ""}`}
            onClick={() => setFabOpen(!fabOpen)}
            aria-label="Toggle action shortcuts"
          >
            <Plus size={28} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <RejectedProofModal
        open={rejectedProofModalOpen}
        onClose={() => setRejectedProofModalOpen(false)}
        onResubmit={() => {
          setRejectedProofModalOpen(false);
          onUploadProof();
        }}
      />

      <FundingRequestReviewModal
        open={fundingModalOpen}
        onClose={() => setFundingModalOpen(false)}
        onNewRequest={() => {
          setFundingModalOpen(false);
          window.location.href = "/fund-request";
        }}
      />

      <ThankNoteCertificateModal
        open={thankNoteModalOpen}
        onClose={() => setThankNoteModalOpen(false)}
      />
    </div>
  );
}


function HoursCounter() {
  const [displayHours, setDisplayHours] = useState(0);
  const [displayMinutes, setDisplayMinutes] = useState(0);
  const [displaySeconds, setDisplaySeconds] = useState(0);

  useEffect(() => {
    const targetHours = 12;
    const targetMinutes = 30;
    const initialSeconds = 45;
    const duration = 1200;
    const startTime = performance.now();

    let animId: number;

    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);

      setDisplayHours(Math.floor(ease * targetHours));
      setDisplayMinutes(Math.floor(ease * targetMinutes));
      setDisplaySeconds(Math.floor(ease * initialSeconds));

      if (progress < 1) {
        animId = requestAnimationFrame(animate);
      } else {
        setDisplayHours(targetHours);
        setDisplayMinutes(targetMinutes);
        setDisplaySeconds(initialSeconds);
      }
    };

    animId = requestAnimationFrame(animate);

    let totalSeconds = targetHours * 3600 + targetMinutes * 60 + initialSeconds;
    const interval = setInterval(() => {
      totalSeconds += 1;
      const h = Math.floor(totalSeconds / 3600);
      const m = Math.floor((totalSeconds % 3600) / 60);
      const s = totalSeconds % 60;
      setDisplayHours(h);
      setDisplayMinutes(m);
      setDisplaySeconds(s);
    }, 1000);

    return () => {
      cancelAnimationFrame(animId);
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="ma-hero-counter">
      <div className="ma-hero-timer">
        <span className="ma-hero-num">{displayHours}</span>
        <span className="ma-hero-unit">h </span>
        <span className="ma-hero-num">{displayMinutes}</span>
        <span className="ma-hero-unit">m </span>
        <span className="ma-hero-num">{String(displaySeconds).padStart(2, "0")}</span>
        <span className="ma-hero-unit">s</span>
      </div>
      <div className="ma-hero-label">Hours Contributed</div>
      <div className="ma-hero-event-pill">
        <CalendarDays size={11} />
        <span>For this event Till now</span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Target Element Bounding Box Tracker for Pixel-Perfect Spotlight Tour
// -----------------------------------------------------------------------
function useTargetRect(targetId: string, open: boolean) {
  const [rect, setRect] = useState<{ left: number; top: number; width: number; height: number } | null>(null);

  useEffect(() => {
    if (!open) {
      setRect(null);
      return;
    }
    function update() {
      const el = document.getElementById(targetId);
      if (el) {
        const r = el.getBoundingClientRect();
        setRect({
          left: r.left,
          top: r.top,
          width: r.width,
          height: r.height,
        });
      }
    }
    update();
    const raf = requestAnimationFrame(update);
    const timer = setTimeout(update, 120);

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(timer);
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [targetId, open]);

  return rect;
}

// -----------------------------------------------------------------------
// Tour Coachmark: Action Centre Purpose Guide
// -----------------------------------------------------------------------
function ActionCentreTourModal({
  open,
  onExplore,
  onClose,
}: {
  open: boolean;
  onExplore: () => void;
  onClose: () => void;
}) {
  const rect = useTargetRect("ma-tab-action-centre", open);

  if (!open || !rect) return null;

  const arrowLeft = rect.left + rect.width / 2 - 11;
  const cardTop = rect.top + rect.height + 15;

  return (
    <div className="ma-tour-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      {/* SVG Cutout Mask: Dims whole screen EXCEPT the real Action Centre tab */}
      <svg
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <defs>
          <mask id="ma-tour-mask-tab">
            <rect width="100%" height="100%" fill="white" />
            <rect
              x={rect.left - 2}
              y={rect.top - 2}
              width={rect.width + 4}
              height={rect.height + 4}
              rx={14}
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(10, 14, 22, 0.78)"
          mask="url(#ma-tour-mask-tab)"
        />
      </svg>

      {/* Spotlight Ring directly over Real Tab (No Clone, Exact 1:1 Natural Size) */}
      <div
        className="ma-tour-real-spotlight-ring"
        style={{
          position: "fixed",
          left: rect.left - 2,
          top: rect.top - 2,
          width: rect.width + 4,
          height: rect.height + 4,
          borderRadius: 14,
          border: "2px solid #FEC802",
          boxShadow: "0 0 0 3px rgba(254, 200, 2, 0.35), 0 0 18px rgba(254, 200, 2, 0.85)",
          pointerEvents: "auto",
          cursor: "pointer",
          zIndex: 2,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onExplore();
        }}
        title="Click to explore Action Centre"
      />

      {/* Up Arrow aligned directly to the center of the real tab */}
      <div
        className="ma-tour-arrow-up"
        style={{
          position: "fixed",
          left: arrowLeft,
          top: rect.top + rect.height + 4,
          zIndex: 4,
        }}
      />

      {/* Card Content placed directly under the real tab */}
      <div
        className="ma-tour-card-wrap"
        style={{
          position: "fixed",
          left: 16,
          right: 16,
          top: cardTop,
          maxWidth: 410,
          margin: "0 auto",
          zIndex: 3,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ma-tour-card">
          <div className="ma-tour-tag">
            <Sparkles size={13} />
            <span>DISCOVER ACTION CENTRE</span>
          </div>
          <h3 className="ma-tour-title">All Your Volunteering Tasks in One Place 🚀</h3>
          <p className="ma-tour-desc">
            The <strong>Action Centre</strong> is your unified workspace for the drive. Monitor your live contributed hours, mark GPS attendance, request event funds, and submit geotagged photo proofs with map watermarks.
          </p>

          <div className="ma-tour-perks">
            <div className="ma-tour-perk-item">
              <span className="ma-tour-perk-icon">⏱️</span>
              <div>
                <b>Live Hours Counter</b>
                <small>Auto-calculates contributed hours &amp; seconds</small>
              </div>
            </div>
            <div className="ma-tour-perk-item">
              <span className="ma-tour-perk-icon">📍</span>
              <div>
                <b>GPS Event Attendance</b>
                <small>One-tap verified check-in within radius</small>
              </div>
            </div>
            <div className="ma-tour-perk-item">
              <span className="ma-tour-perk-icon">📸</span>
              <div>
                <b>Geotagged Photo Proofs</b>
                <small>Live camera with location &amp; timestamp seal</small>
              </div>
            </div>
          </div>

          <div className="ma-tour-actions">
            <button
              type="button"
              className="ma-tour-btn-primary"
              onClick={onExplore}
            >
              <span>Explore Action Centre</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              className="ma-tour-btn-ghost"
              onClick={onClose}
            >
              Got it, Stay in Chat
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------
// Tour Coachmark: Quick Actions (+) Button Guide
// -----------------------------------------------------------------------
function FabTourModal({
  open,
  onTryNow,
  onClose,
}: {
  open: boolean;
  onTryNow: () => void;
  onClose: () => void;
}) {
  const rect = useTargetRect("ma-action-fab-button", open);

  if (!open || !rect) return null;

  const arrowLeft = rect.left + rect.width / 2 - 11;
  const arrowTop = rect.top - 12;
  const cardBottom = window.innerHeight - rect.top + 14;

  return (
    <div
      className="ma-tour-overlay ma-tour-overlay--fab"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      {/* SVG Cutout Mask: Dims whole screen EXCEPT the real Plus (+) button */}
      <svg
        style={{
          position: "fixed",
          inset: 0,
          width: "100vw",
          height: "100vh",
          pointerEvents: "none",
          zIndex: 1,
        }}
      >
        <defs>
          <mask id="ma-tour-mask-fab">
            <rect width="100%" height="100%" fill="white" />
            <circle
              cx={rect.left + rect.width / 2}
              cy={rect.top + rect.height / 2}
              r={rect.width / 2 + 2}
              fill="black"
            />
          </mask>
        </defs>
        <rect
          width="100%"
          height="100%"
          fill="rgba(10, 14, 22, 0.78)"
          mask="url(#ma-tour-mask-fab)"
        />
      </svg>

      {/* Spotlight Ring directly over Real FAB (No Clone, Exact 1:1 Natural Size) */}
      <div
        className="ma-tour-real-spotlight-ring--fab"
        style={{
          position: "fixed",
          left: rect.left - 2,
          top: rect.top - 2,
          width: rect.width + 4,
          height: rect.height + 4,
          borderRadius: "50%",
          border: "2.5px solid #FEC802",
          boxShadow: "0 0 0 3px rgba(254, 200, 2, 0.35), 0 0 22px rgba(254, 200, 2, 0.95)",
          pointerEvents: "auto",
          cursor: "pointer",
          zIndex: 2,
        }}
        onClick={(e) => {
          e.stopPropagation();
          onTryNow();
        }}
        title="Click to open quick actions"
      />

      {/* Down Arrow pointing directly to top of real FAB */}
      <div
        className="ma-tour-arrow-down"
        style={{
          position: "fixed",
          left: arrowLeft,
          top: arrowTop,
          zIndex: 4,
        }}
      />

      {/* Card pointing down to real Plus (+) button */}
      <div
        className="ma-tour-card-wrap--fab"
        style={{
          position: "fixed",
          left: 16,
          right: 14,
          bottom: cardBottom,
          maxWidth: 360,
          marginLeft: "auto",
          zIndex: 3,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="ma-tour-card ma-tour-card--fab">
          <div className="ma-tour-tag ma-tour-tag--amber">
            <Plus size={13} strokeWidth={3} />
            <span>QUICK ACTIONS HUB</span>
          </div>
          <h3 className="ma-tour-title">Tap (+) to Submit Proofs &amp; Requests ⚡</h3>
          <p className="ma-tour-desc">
            Need to upload event proof, request funds, report an issue to your coordinator, or share feedback? Tap this <strong>Plus (+) button</strong> anytime to open quick shortcuts!
          </p>

          <div className="ma-tour-fab-options-preview">
            <span>📷 Geotag Proof</span>
            <span>💰 Fund Request</span>
            <span>⚠️ Report Issue</span>
            <span>✨ Feedback</span>
          </div>

          <div className="ma-tour-actions">
            <button
              type="button"
              className="ma-tour-btn-primary"
              onClick={onTryNow}
            >
              <span>Open Menu Now</span>
              <ArrowRight size={16} />
            </button>
            <button
              type="button"
              className="ma-tour-btn-ghost"
              onClick={onClose}
            >
              Got It, Thanks!
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
