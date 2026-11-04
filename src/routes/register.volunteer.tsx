import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  Briefcase,
  CalendarCheck,
  CalendarDays,
  ChevronDown,
  CloudUpload,
  GraduationCap,
  HandHeart,
  IdCard,
  MapPin,
  Mic,
  MoreHorizontal,
  Pencil,
  Square,
  Store,
} from "lucide-react";
import { PrimaryButton, RegHeader, Screen } from "@/components/mq";
import { locations, regDraft } from "@/data/mock";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/register/volunteer")({
  head: () =>
    seo(
      "Volunteer Registration – Volunteer Details",
      "Tell Maatram about your work, availability and motivation.",
    ),
  component: VolunteerDetails,
});

const statuses = [
  { k: "Student", i: <GraduationCap /> },
  { k: "Employee", i: <Briefcase /> },
  { k: "Business", i: <Store /> },
  { k: "Other", i: <MoreHorizontal /> },
];
const avail = [
  { k: "Weekdays", i: <CalendarDays /> },
  { k: "Weekends", i: <CalendarDays /> },
  { k: "Both", i: <CalendarCheck /> },
];

function VolunteerDetails() {
  const navigate = useNavigate();
  const [status, setStatus] = useState("Student");
  const [location, setLocation] = useState("");
  const [availability, setAvailability] = useState("Weekdays");
  const [file, setFile] = useState<string>("");
  const [mode, setMode] = useState<"type" | "voice">("type");
  const [text, setText] = useState("");
  const [rec, setRec] = useState(false);
  const [secs, setSecs] = useState(0);
  const [error, setError] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!rec) return;
    const t = setInterval(() => setSecs((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [rec]);

  const submit = () => {
    if (!location) return setError("Please select your location");
    if (!file) return setError("Please upload your ID card");
    if (mode === "type" ? !text.trim() : secs === 0)
      return setError("Please tell us why you want to volunteer");
    Object.assign(regDraft, { status, location, availability });
    navigate({ to: "/register/submitted" });
  };

  return (
    <Screen deco="tr" footer="building">
      <RegHeader step={2} back="/register/basic" />
      <section className="mq-regcard">
        <div className="mq-sechead">
          <div>
            <h2>Know You Better</h2>
            <p>Help us understand you and your volunteering interest.</p>
          </div>
        </div>

        <div className="mq-frow mq-frow--box">
          <span className="ib">
            <Briefcase size={24} />
          </span>
          <div>
            <span className="mq-flabel">
              Working Status <span className="mq-req">*</span>
            </span>
            <div className="mq-chips mq-chips--4">
              {statuses.map((s) => (
                <button
                  key={s.k}
                  className="mq-chip"
                  aria-pressed={status === s.k}
                  onClick={() => setStatus(s.k)}
                >
                  {s.i}
                  {s.k}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mq-frow mq-frow--box">
          <span className="ib">
            <MapPin size={24} />
          </span>
          <div>
            <label className="mq-flabel" htmlFor="loc">
              Location <span className="mq-req">*</span>
            </label>
            <div className="mq-inp mq-inp--icon">
              <MapPin className="lead" />
              <select
                id="loc"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                style={{ color: location ? undefined : "#6B707C" }}
              >
                <option value="">Enter your city / district</option>
                {locations.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
              <ChevronDown className="trail" size={22} style={{ pointerEvents: "none" }} />
            </div>
          </div>
        </div>

        <div className="mq-frow mq-frow--box">
          <span className="ib">
            <CalendarDays size={24} />
          </span>
          <div>
            <span className="mq-flabel">
              Availability <span className="mq-req">*</span>
            </span>
            <div className="mq-chips mq-chips--3">
              {avail.map((s) => (
                <button
                  key={s.k}
                  className="mq-chip"
                  aria-pressed={availability === s.k}
                  onClick={() => setAvailability(s.k)}
                >
                  {s.i}
                  {s.k}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="mq-frow mq-frow--box">
          <span className="ib">
            <IdCard size={24} />
          </span>
          <div>
            <span className="mq-flabel" style={{ marginBottom: 0 }}>
              Personal ID Card <span className="mq-req">*</span>
            </span>
            <small style={{ color: "#3A3F4B" }}>
              Upload a valid ID proof (Aadhaar / PAN / Voter ID / College ID, etc.)
            </small>
            <div className="mq-upload" onClick={() => fileRef.current?.click()} role="button">
              <CloudUpload size={40} strokeWidth={1.5} />
              <div style={{ minWidth: 0 }}>
                <strong>{file ? "ID Card Selected" : "Upload ID Card"}</strong>
                <small style={{ wordBreak: "break-all" }}>
                  {file || "PDF / JPG / PNG (Max 10 MB)"}
                </small>
              </div>
            </div>
            <input
              ref={fileRef}
              type="file"
              accept=".pdf,.jpg,.jpeg,.png"
              hidden
              onChange={(e) => setFile(e.target.files?.[0]?.name ?? "")}
            />
          </div>
        </div>

        <div className="mq-frow mq-frow--box">
          <span className="ib">
            <HandHeart size={24} />
          </span>
          <div>
            <span className="mq-flabel">
              Why do you want to volunteer with Maatram? <span className="mq-req">*</span>
            </span>
            <div className="mq-seg">
              <button aria-pressed={mode === "type"} onClick={() => setMode("type")}>
                <Pencil size={20} /> Type Your Response
              </button>
              <button aria-pressed={mode === "voice"} onClick={() => setMode("voice")}>
                <Mic size={20} /> Record a Voice Note
              </button>
            </div>
            {mode === "type" ? (
              <div style={{ position: "relative" }}>
                <textarea
                  className="mq-ta"
                  maxLength={300}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Share your interest, motivation, or how you want to contribute..."
                />
                <span className="mq-counter">{text.length} / 300</span>
              </div>
            ) : (
              <div className={rec ? "mq-voice rec" : "mq-voice"}>
                <button
                  aria-label={rec ? "Stop recording" : "Start recording"}
                  onClick={() => setRec((r) => !r)}
                >
                  {rec ? <Square size={20} fill="currentColor" /> : <Mic size={24} />}
                </button>
                <div>
                  <strong>
                    {rec ? "Recording..." : secs ? "Voice note recorded" : "Tap to record"}
                  </strong>
                  <div style={{ fontSize: 13, color: "#3A3F4B" }}>
                    0:{String(secs).padStart(2, "0")} / 1:00
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {error && (
          <p className="mq-err" style={{ textAlign: "center", fontSize: 14 }}>
            {error}
          </p>
        )}
        <div style={{ marginTop: 16 }}>
          <PrimaryButton onClick={submit}>Create Account</PrimaryButton>
        </div>
      </section>
    </Screen>
  );
}
