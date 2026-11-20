import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowLeft,
  ArrowRight,
  BarChart3,
  Camera,
  CheckCheck,
  ChevronRight,
  FileText,
  Hourglass,
  Image,
  LayoutGrid,
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
  ShieldCheck,
  Plus,
} from "lucide-react";
import { GeotagProofModal, FeedbackModal, ReportIssueModal } from "@/components/geotag-proof-flow";
import { attendanceMock, isWithinAttendanceRadius } from "@/data/mock";
import { getCommunity } from "@/components/community-screens";
import { downloadGuide, getOpportunity } from "@/components/opportunity-screens";
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
  const [activeTab, setActiveTab] = useState<"chats" | "action">("chats");
  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [showActionCentreGuide, setShowActionCentreGuide] = useState(false);
  const [showFabGuide, setShowFabGuide] = useState(false);
  const [reportedIssues, setReportedIssues] = useState<
    Array<{ id: string; category: string; description: string; priority: string; time: string }>
  >([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("tab") === "action") {
        setActiveTab("action");
      } else {
        // Show first-time action centre tour guide if not seen
        if (!sessionStorage.getItem("maatram_action_centre_guide_seen")) {
          setTimeout(() => setShowActionCentreGuide(true), 400);
        }
      }
    }
  }, []);

  function switchTab(tab: "chats" | "action") {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      const url = new URL(window.location.href);
      if (tab === "action") {
        url.searchParams.set("tab", "action");
      } else {
        url.searchParams.delete("tab");
      }
      window.history.replaceState({}, "", url.toString());

      // If switching to action centre for first time, show FAB guide
      if (tab === "action" && !sessionStorage.getItem("maatram_fab_guide_seen")) {
        setTimeout(() => setShowFabGuide(true), 350);
      }
    }
  }

  // Swipe handling for switching tabs
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  function handleTouchStart(e: React.TouchEvent) {
    const t = e.touches[0];
    if (!t) return;
    touchStartX.current = t.clientX;
    touchStartY.current = t.clientY;
  }

  function handleTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const t = e.changedTouches[0];
    if (!t) return;
    const deltaX = t.clientX - touchStartX.current;
    const deltaY = t.clientY - touchStartY.current;

    // Horizontal swipe threshold: at least 45px, predominantly horizontal
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
      if (deltaX < 0 && activeTab === "chats") {
        // Swipe right-to-left -> switch to Action Centre
        switchTab("action");
      } else if (deltaX > 0 && activeTab === "action") {
        // Swipe left-to-right -> switch to Chats
        switchTab("chats");
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
  }

  const [text, setText] = useState("");
  const [proofModalOpen, setProofModalOpen] = useState(false);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [sheet, setSheet] = useState(false);
  const [panel, setPanel] = useState<null | "poll" | "proof" | "media">(null);
  const [success, setSuccess] = useState(false);
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
            <Link to="/community" aria-label="Back to my communities">
              <ArrowLeft />
            </Link>
          </Action>
          <Link
            to="/community/$communityId"
            params={{ communityId: id }}
            aria-label="Open community overview"
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

        <div className="ma-chat-tabs-card" role="tablist" aria-label="Community navigation">
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
          <button
            type="button"
            role="tab"
            id="ma-tab-action-centre"
            aria-selected={activeTab === "action"}
            className={`ma-chat-tab ${activeTab === "action" ? "is-active" : ""}`}
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
              const el = document.getElementById("chat-attendance-section");
              if (el) {
                el.scrollIntoView({ behavior: "smooth", block: "center" });
              } else {
                state.markAttendance();
                setSuccess(true);
              }
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                const el = document.getElementById("chat-attendance-section");
                if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
              }
            }}
          >
            <div className="ma-attendance-banner-icon">
              <Megaphone size={20} strokeWidth={2.2} />
            </div>
            <div className="ma-attendance-banner-content">
              <h3 className="ma-attendance-banner-title">Mark Your Attendance!</h3>
              <p className="ma-attendance-banner-desc">Attendance for Sangamam Event is now open.</p>
              <span className="ma-attendance-banner-link">Click to confirm your attendance.</span>
            </div>
            <ChevronRight size={18} strokeWidth={2.2} className="ma-attendance-banner-arrow" />
          </div>
        )}
      </div>

      {/* 2. SCROLLABLE & SWIPEABLE CONTENT BODY */}
      <div
        className="ma-chat-scrollable-content"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {activeTab === "action" ? (
          <ActionCentreView
            onMarkAttendance={() => {
              state.markAttendance();
              setSuccess(true);
            }}
            onUploadProof={() => setProofModalOpen(true)}
            onReport={() => setReportModalOpen(true)}
            onFeedback={() => setFeedbackModalOpen(true)}
            reportedIssues={reportedIssues}
          />
        ) : (
          <>
            <div className="ma-chat-timeline">
              <div className="ma-date">Today</div>
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
                      state.markAttendance();
                      setSuccess(true);
                    }}
                  />
                </div>
              </Incoming>
              <Incoming sender="Kaviya S" avatar="kaviya" time="9:02 AM">
                Marked my attendance! ✅
              </Incoming>
              {state.messages.map((m) => (
                <Outgoing time="Now" key={m.id}>
                  {m.kind === "poll" ? (
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
            onClick={() => shareFile("image/*")}
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
            aria-label={recording ? "Stop recording" : "Record voice note"}
            onClick={() => {
              if (recording) state.send("🎤 Voice note · 0:08");
              setRecording(!recording);
              setNotice(recording ? "Voice note sent." : "Recording voice note…");
            }}
          >
            <Mic size={22} />
          </button>
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
          <ShareTile
            tone="poll"
            title="Create Poll"
            text="Take opinions and decide together"
            icon={<BarChart3 />}
            onClick={() => {
              setSheet(false);
              setPanel("poll");
            }}
          />
          <ShareTile
            tone="proof"
            title="Submit Proof"
            text="Upload your event proof with"
            label="📍 Geo Tag"
            icon={<MapPin />}
            onClick={() => {
              setFiles([]);
              setSheet(false);
              setPanel("proof");
            }}
          />
          <Action asChild className="ma-share-tile ma-share-tile--fund">
            <Link to="/fund-request">
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
      <Modal
        open={success}
        onClose={() => setSuccess(false)}
        title="Attendance Marked Successfully"
      >
        <div className="ma-success-art">
          <img src="/assets/illustrations/success-checkmark.png" alt="Attendance success" />
          <span>🌱 ✨</span>
        </div>
        <h2 className="ma-success-title">
          Attendance
          <br />
          Marked Successfully!
        </h2>
        <p className="ma-centered">
          You’re checked in for
          <br />
          Palm Seeds Plantation. 🎉
        </p>
        <div className="ma-success-meta">
          <span>
            <CalendarDays />
            Nov 02, 2026
          </span>
          <span>
            <Clock3 />
            9:01 AM
          </span>
          <span>
            <MapPin />
            Chennai
          </span>
        </div>
        <p className="ma-verified">
          <ShieldCheck />
          Location Verified · Simulated
        </p>
        <Primary onClick={() => setSuccess(false)}>
          Great! <Check />
        </Primary>
      </Modal>
      <GeotagProofModal
        open={proofModalOpen}
        onClose={() => setProofModalOpen(false)}
        onSubmitSuccess={(count) => {
          setNotice(`✅ ${count} geotagged photo proof(s) submitted successfully. Under review!`);
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
          sessionStorage.setItem("maatram_action_centre_guide_seen", "true");
          setShowActionCentreGuide(false);
          switchTab("action");
        }}
        onClose={() => {
          sessionStorage.setItem("maatram_action_centre_guide_seen", "true");
          setShowActionCentreGuide(false);
        }}
      />
      <FabTourModal
        open={showFabGuide && activeTab === "action"}
        onTryNow={() => {
          sessionStorage.setItem("maatram_fab_guide_seen", "true");
          setShowFabGuide(false);
          const fab = document.getElementById("ma-action-fab-button");
          if (fab) fab.click();
        }}
        onClose={() => {
          sessionStorage.setItem("maatram_fab_guide_seen", "true");
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

function ActionCentreView({
  onMarkAttendance,
  onUploadProof,
  onReport,
  onFeedback,
  reportedIssues = [],
}: {
  onMarkAttendance: () => void;
  onUploadProof: () => void;
  onReport: () => void;
  onFeedback: () => void;
  reportedIssues?: Array<{ id: string; category: string; description: string; priority: string; time: string }>;
}) {
  const [fabOpen, setFabOpen] = useState(false);

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

      {/* 1. Hero Card */}
      <section className="ma-action-hero" aria-label="Volunteer Hours Summary">
        <svg
          className="ma-hero-waves"
          viewBox="0 0 400 120"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d="M0,95 Q100,55 200,90 T400,85 L400,120 L0,120 Z"
            fill="rgba(254, 200, 2, 0.12)"
          />
          <path
            d="M0,105 Q120,70 240,110 T400,98 L400,120 L0,120 Z"
            fill="rgba(254, 200, 2, 0.22)"
          />
        </svg>

        <TimerDial />
        <HoursCounter />
        <div className="ma-hero-trophy-wrap">
          <img
            src="/assets/impact/hours-trophy-laurel.png"
            alt="Achievement Trophy"
            className="ma-hero-trophy-img"
          />
        </div>
      </section>

      {/* 2. Action Centre Header Row */}
      <div className="ma-action-title-row">
        <h2>Action Centre</h2>
        <span className="ma-action-new-badge">
          {3 + reportedIssues.length} new <span className="ma-action-red-dot" />
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

        {/* Card 3: Funding Request */}
        <Link
          to="/fund-request"
          className="ma-action-card"
          style={{ textDecoration: "none", color: "inherit" }}
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
        </Link>

        {/* Card 4: Contribution Hours */}
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
            className={`ma-action-fab ${fabOpen ? "is-open" : ""}`}
            onClick={() => setFabOpen(!fabOpen)}
            aria-label="Toggle action shortcuts"
          >
            <Plus size={28} strokeWidth={2.5} />
          </button>
        </div>
      </div>
    </div>
  );
}

function TimerDial() {
  return (
    <div className="ma-hero-dial">
      <img
        src="/assets/impact/hours-timer-dial.png"
        alt="Volunteer Hours Gauge"
        className="ma-hero-dial-img"
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
  if (!open) return null;
  return (
    <div className="ma-tour-overlay" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="ma-tour-card-wrap" onClick={(e) => e.stopPropagation()}>
        {/* Spotlighted Tab Target at Top */}
        <div className="ma-tour-spotlight-tab">
          <div className="ma-chat-tab is-active ma-tour-tab-highlight">
            <LayoutGrid size={16} strokeWidth={2.2} />
            <span>Action Centre</span>
            <span className="ma-action-badge">3</span>
          </div>
        </div>

        {/* Pointer Arrow pointing to Action Centre */}
        <div className="ma-tour-arrow-up" />

        {/* Card Content */}
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
  if (!open) return null;
  return (
    <div className="ma-tour-overlay ma-tour-overlay--fab" role="dialog" aria-modal="true" onClick={onClose}>
      <div className="ma-tour-card-wrap--fab" onClick={(e) => e.stopPropagation()}>
        {/* Card pointing down to the Plus button */}
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

        {/* Down Arrow pointing to the FAB */}
        <div className="ma-tour-arrow-down" />

        {/* Spotlighted FAB button clone */}
        <div className="ma-tour-spotlight-fab">
          <div className="ma-action-fab is-open ma-tour-fab-highlight">
            <Plus size={28} strokeWidth={2.5} />
          </div>
        </div>
      </div>
    </div>
  );
}
