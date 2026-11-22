import React, { useState, useEffect } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Building2,
  Calendar,
  Camera,
  Check,
  CheckCircle2,
  ChevronRight,
  Clock,
  Download,
  Edit3,
  ExternalLink,
  Eye,
  FileCheck,
  FileText,
  GraduationCap,
  HeartHandshake,
  Home,
  Image as ImageIcon,
  Info,
  ListChecks,
  Mail,
  Map,
  MapPin,
  MessageSquare,
  Mic,
  Navigation,
  Pause,
  Phone,
  PhoneCall,
  Play,
  PlayCircle,
  Printer,
  QrCode,
  Save,
  Scale,
  ShieldCheck,
  Sparkles,
  Square,
  Trophy,
  User,
  Users,
  Video,
  X,
  Zap,
} from "lucide-react";
import { Candidate } from "@/data/assigned-students-mock";
import { LiveDeviceCameraModal } from "@/components/chat-media-capture";

export function GoogleMapsPinIcon({ size = 18 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
      aria-label="Google Maps"
    >
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2Z"
        fill="#EA4335"
      />
      <path
        d="M12 2C8.13 2 5 5.13 5 9C5 11.3 6.07 13.78 7.54 16.03L12 9V2Z"
        fill="#4285F4"
      />
      <path
        d="M12 9L16.46 16.03C17.93 13.78 19 11.3 19 9C19 5.13 15.87 2 12 2V9Z"
        fill="#FBBC04"
      />
      <path
        d="M12 22C12 22 13.2 20.67 14.47 18.8L12 15L9.53 18.8C10.8 20.67 12 22 12 22Z"
        fill="#34A853"
      />
      <circle cx="12" cy="9" r="3.2" fill="#FFFFFF" />
      <circle cx="12" cy="9" r="2.2" fill="#4285F4" />
    </svg>
  );
}

export type StudentTabKey =
  | "overview"
  | "personal"
  | "family"
  | "address"
  | "education"
  | "televerification";

function numberToEnglishWords(num: number): string {
  const ones = ["ZERO", "ONE", "TWO", "THREE", "FOUR", "FIVE", "SIX", "SEVEN", "EIGHT", "NINE"];
  const teens = ["TEN", "ELEVEN", "TWELVE", "THIRTEEN", "FOURTEEN", "FIFTEEN", "SIXTEEN", "SEVENTEEN", "EIGHTEEN", "NINETEEN"];
  const tens = ["", "", "TWENTY", "THIRTY", "FORTY", "FIFTY", "SIXTY", "SEVENTY", "EIGHTY", "NINETY"];
  if (num < 10) return ones[num] ?? String(num);
  if (num >= 10 && num < 20) return teens[num - 10] ?? String(num);
  if (num >= 20 && num < 100) {
    const t = Math.floor(num / 10);
    const o = num % 10;
    const tenWord = tens[t] ?? "";
    return o === 0 ? tenWord : `${tenWord} ${ones[o] ?? ""}`.trim();
  }
  if (num >= 100 && num < 1000) {
    const h = Math.floor(num / 100);
    const r = num % 100;
    const hundredWord = ones[h] ?? "";
    return r === 0 ? `${hundredWord} HUNDRED` : `${hundredWord} HUNDRED AND ${numberToEnglishWords(r)}`;
  }
  return String(num);
}

export interface StudentVerificationDetailProps {
  candidate: Candidate;
  onBack: () => void;
  onUpdateStatus?: (candidateId: string, newStatus: Candidate["status"], notes?: string) => void;
}

export function StudentVerificationDetail({
  candidate,
  onBack,
  onUpdateStatus,
}: StudentVerificationDetailProps) {
  const [activeTab, setActiveTab] = useState<StudentTabKey>("overview");
  const [selectedGradeDetail, setSelectedGradeDetail] = useState<"10th" | "11th" | "12th" | null>(null);
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [fullAppModalOpen, setFullAppModalOpen] = useState(false);
  const [aadhaarModalOpen, setAadhaarModalOpen] = useState(false);
  const [marksheetModal, setMarksheetModal] = useState<{
    open: boolean;
    grade: "10th" | "11th" | "12th";
    title: string;
    board: string;
    roll: string;
    year: string;
    percentage: string;
    schoolName: string;
    schoolAddress?: string;
    totalMarks: number;
    obtainedMarks: number;
    cutoffMark?: string;
    groupName?: string;
    medium?: string;
    subjects: Array<{ name: string; obtained: number; total: number; grade?: string }>;
  } | null>(null);
  const [familyDocModal, setFamilyDocModal] = useState<{
    open: boolean;
    title: string;
    docType: string;
    docNumber: string;
    issuedBy: string;
    issuedDate: string;
    holderName: string;
    details: Array<{ label: string; value: string }>;
  } | null>(null);
  const [cameraModalOpen, setCameraModalOpen] = useState(false);
  const [proofPhoto, setProofPhoto] = useState<string | null>(candidate.proofPhotoUrl || null);
  const [successToast, setSuccessToast] = useState<string | null>(null);

  // Dedicated Physical Verification Form State (Matches media_1795321411192_90d9865b.jpg)
  const [showPhysicalForm, setShowPhysicalForm] = useState(false);
  const [checkedData, setCheckedData] = useState({
    marksheet10: true,
    marksheet11: true,
    marksheet12: true,
    incomeCert: true,
    communityCert: true,
    aadhaarCard: true,
    recommendationLetter: true,
    firstGraduateCert: true,
    tc: true,
  });
  const [propertyType, setPropertyType] = useState<"Own House" | "Rented House">("Own House");
  const [thingsNoticed, setThingsNoticed] = useState({
    furnished: false,
    bikes: false,
    newGoods: false,
    other: true,
  });
  const [otherGoodsText, setOtherGoodsText] = useState("Car, AC");
  const [photos, setPhotos] = useState<Array<string | null>>([
    candidate.proofPhotoUrl || "/assets/photos/house-proof-sample.jpg",
    null,
    null,
    null,
    null,
    null,
  ]);
  const [activePhotoSlot, setActivePhotoSlot] = useState<number | null>(null);
  const [verifiedAddressText, setVerifiedAddressText] = useState(
    candidate.address || "4/12, Kamarajar Street, Triplicane, Chennai - 600005. Landmark: Near Municipal Water Tank."
  );
  const [liveLocationVerified, setLiveLocationVerified] = useState(true);
  const [verificationDate, setVerificationDate] = useState("2026-11-22");
  const [recommendation, setRecommendation] = useState<"Selected" | "Not Selected">("Selected");
  const [formRemarks, setFormRemarks] = useState(
    candidate.verifiedNotes ||
      `Conducted physical verification for ${candidate.name} in ${candidate.location}. Verified original marksheets, authenticated family income, and documented house condition. Highly deserving scholar.`
  );
  const [voiceRecordingState, setVoiceRecordingState] = useState<"idle" | "recording" | "paused" | "stopped">("idle");
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [voiceSaved, setVoiceSaved] = useState(false);

  // Verification Audit Checklist states
  const [checkResidence, setCheckResidence] = useState(true);
  const [checkMarksheets, setCheckMarksheets] = useState(true);
  const [checkIncome, setCheckIncome] = useState(true);
  const [checkHouseCondition, setCheckHouseCondition] = useState(true);
  const [checkAadhaar, setCheckAadhaar] = useState(true);
  const [notes, setNotes] = useState(
    candidate.verifiedNotes ||
    `Conducted physical verification for ${candidate.name} in ${candidate.location}. Verified original marksheets, authenticated family income, and documented house condition. Highly deserving scholar.`
  );

  const isSubmitted = candidate.status === "Submitted";

  // Voice recorder timer effect
  useEffect(() => {
    let timer: any;
    if (voiceRecordingState === "recording") {
      timer = setInterval(() => {
        setRecordingSeconds((prev) => (prev >= 180 ? 180 : prev + 1));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [voiceRecordingState]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const sc = document.querySelector(".ma-chat-scrollable-content");
      if (sc) sc.scrollTop = 0;
      window.scrollTo(0, 0);
    }
  }, [candidate.id, activeTab, selectedGradeDetail, showPhysicalForm]);

  const handleGradeSelect = (grade: "10th" | "11th" | "12th" | null) => {
    setSelectedGradeDetail(grade);
    if (typeof window !== "undefined") {
      const sc = document.querySelector(".ma-chat-scrollable-content");
      if (sc) sc.scrollTop = 0;
      window.scrollTo(0, 0);
    }
  };

  const gradeDataMap: Record<
    "10th" | "11th" | "12th",
    {
      grade: "10th" | "11th" | "12th";
      title: string;
      isGovtSchool: string;
      hallTicketNo: string;
      board: string;
      medium: string;
      schoolType: string;
      schoolName: string;
      schoolAddress: string;
      totalMarks: number;
      obtainedMarks: number;
      passingYear: string;
      percentage: string;
      cutoffMark: string;
      groupName: string;
      headMasterName: string;
      headMasterPhone: string;
      appliedFoundations: string[];
      subjects: Array<{ name: string; obtained: number; total: number }>;
    }
  > = {
    "12th": {
      grade: "12th",
      title: "12th Academic Details",
      isGovtSchool: "Yes",
      hallTicketNo: "432176",
      board: "State Board",
      medium: "Tamil",
      schoolType: "Government",
      schoolName: "Marimamal Govt. Hr. Sec. School",
      schoolAddress: "Pollachi, Coimbatore - 642001",
      totalMarks: 600,
      obtainedMarks: 550,
      passingYear: "2026",
      percentage: "91.67%",
      cutoffMark: "94.00",
      groupName: "Commerce",
      headMasterName: "Geetha",
      headMasterPhone: "+91 97895 63843",
      appliedFoundations: ["Agaram", "Anbu"],
      subjects: [
        { name: "Tamil", obtained: 94, total: 100 },
        { name: "English", obtained: 88, total: 100 },
        { name: "Accountancy", obtained: 95, total: 100 },
        { name: "Commerce", obtained: 93, total: 100 },
        { name: "Economics", obtained: 92, total: 100 },
        { name: "Business Mathematics", obtained: 90, total: 100 },
      ],
    },
    "11th": {
      grade: "11th",
      title: "11th Academic Details",
      isGovtSchool: "Yes",
      hallTicketNo: "789101",
      board: "State Board",
      medium: "Tamil",
      schoolType: "Government",
      schoolName: "Marimamal Govt. Hr. Sec. School",
      schoolAddress: "Pollachi, Coimbatore - 642001",
      totalMarks: 600,
      obtainedMarks: 564,
      passingYear: "2024",
      percentage: "94.00%",
      cutoffMark: "95.50",
      groupName: "Commerce",
      headMasterName: "Geetha",
      headMasterPhone: "+91 97895 63843",
      appliedFoundations: ["Agaram", "Anbu"],
      subjects: [
        { name: "Tamil", obtained: 95, total: 100 },
        { name: "English", obtained: 90, total: 100 },
        { name: "Accountancy", obtained: 96, total: 100 },
        { name: "Commerce", obtained: 94, total: 100 },
        { name: "Economics", obtained: 95, total: 100 },
        { name: "Business Mathematics", obtained: 94, total: 100 },
      ],
    },
    "10th": {
      grade: "10th",
      title: "10th Academic Details",
      isGovtSchool: "Yes",
      hallTicketNo: "123456",
      board: "State Board",
      medium: "Tamil",
      schoolType: "Government",
      schoolName: "Govt Girls High School, Triplicane",
      schoolAddress: "Triplicane, Chennai - 600005",
      totalMarks: 500,
      obtainedMarks: 460,
      passingYear: "2023",
      percentage: "92.00%",
      cutoffMark: "92.00",
      groupName: "General SSLC",
      headMasterName: "Geetha",
      headMasterPhone: "+91 97895 63843",
      appliedFoundations: ["Agaram"],
      subjects: [
        { name: "Tamil", obtained: 95, total: 100 },
        { name: "English", obtained: 91, total: 100 },
        { name: "Mathematics", obtained: 96, total: 100 },
        { name: "Science", obtained: 93, total: 100 },
        { name: "Social Science", obtained: 85, total: 100 },
      ],
    },
  };

  const handleAuditSubmit = () => {
    if (onUpdateStatus) {
      onUpdateStatus(candidate.id, "Submitted", notes);
    }
    setAuditModalOpen(false);
    setSuccessToast(`Physical verification for ${candidate.name} successfully submitted!`);
    setTimeout(() => setSuccessToast(null), 4000);
  };

  const handlePhysicalFormSubmit = () => {
    if (onUpdateStatus) {
      onUpdateStatus(candidate.id, "Submitted", formRemarks);
    }
    setSuccessToast(`Physical Verification for ${candidate.name} submitted successfully!`);
    setShowPhysicalForm(false);
    if (typeof window !== "undefined") {
      const sc = document.querySelector(".ma-chat-scrollable-content");
      if (sc) sc.scrollTop = 0;
      window.scrollTo(0, 0);
    }
    setTimeout(() => setSuccessToast(null), 4000);
  };

  return (
    <div className="ma-sv-page-wrap">
      {/* 1. Success Alert Banner */}
      {successToast && (
        <div className="ma-assigned-alert-success" style={{ margin: "10px 16px 0" }}>
          <CheckCircle2 size={16} />
          <span>{successToast}</span>
          <button type="button" onClick={() => setSuccessToast(null)} aria-label="Dismiss">
            <X size={14} />
          </button>
        </div>
      )}

      {showPhysicalForm ? (
        <div className="ma-pv-form-container">
          {/* Top Banner Card (Matches media_1795321411192_90d9865b.jpg) */}
          <div className="ma-pv-banner-card">
            <div className="ma-pv-banner-left">
              <div className="ma-pv-banner-circle">
                <Home size={22} color="#0F172A" strokeWidth={2.4} />
              </div>
              <div className="ma-pv-banner-text">
                <h2>Physical Verification Form</h2>
                <p>
                  Verify the student's details by visiting the student's house and submit the physical verification report.
                </p>
              </div>
            </div>
            <div className="ma-pv-banner-art-wrap">
              <img
                src="/assets/communities/pv-banner-art.png"
                alt="Physical verification banner"
                className="ma-pv-house-art"
              />
            </div>
          </div>

          {/* Student Profile Card with "Tele Verification Completed" Badge */}
          <div className="ma-pv-student-card">
            <div className="ma-pv-photo-wrap">
              <img
                src={candidate.photoUrl}
                alt={candidate.name}
                className="ma-pv-photo-img"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/assets/photos/student-portrait.jpg";
                }}
              />
            </div>
            <div className="ma-pv-student-meta">
              <h3 className="ma-pv-student-name">{candidate.name}</h3>
              <span className="ma-pv-app-id">App ID : {candidate.applicationNo}</span>
              <div className="ma-pv-loc-row">
                <MapPin size={13} className="ma-pv-icon" />
                <span>{candidate.location}</span>
              </div>
            </div>
            <span className="ma-pv-tele-completed-pill">
              <CheckCircle2 size={13} strokeWidth={2.8} />
              <span>Tele Verification Completed</span>
            </span>
          </div>

          {/* 1. Have you checked all the below data? */}
          <div className="ma-pv-card">
            <div className="ma-pv-card-head">
              <div className="ma-pv-icon-circle">
                <ListChecks size={18} strokeWidth={2.4} />
              </div>
              <h4 className="ma-pv-card-title">1. Have you checked all the below data?</h4>
            </div>

            <div className="ma-pv-checklist-grid">
              <div className="ma-pv-check-col">
                <label className="ma-pv-check-item">
                  <input
                    type="checkbox"
                    checked={checkedData.marksheet10}
                    onChange={(e) => setCheckedData({ ...checkedData, marksheet10: e.target.checked })}
                  />
                  <span>10th Original Marksheet</span>
                </label>
                <label className="ma-pv-check-item">
                  <input
                    type="checkbox"
                    checked={checkedData.marksheet11}
                    onChange={(e) => setCheckedData({ ...checkedData, marksheet11: e.target.checked })}
                  />
                  <span>11th Original Marksheet</span>
                </label>
                <label className="ma-pv-check-item">
                  <input
                    type="checkbox"
                    checked={checkedData.marksheet12}
                    onChange={(e) => setCheckedData({ ...checkedData, marksheet12: e.target.checked })}
                  />
                  <span>12th Original Marksheet</span>
                </label>
                <label className="ma-pv-check-item">
                  <input
                    type="checkbox"
                    checked={checkedData.incomeCert}
                    onChange={(e) => setCheckedData({ ...checkedData, incomeCert: e.target.checked })}
                  />
                  <span>Income Certificate / Salary Slip</span>
                </label>
                <label className="ma-pv-check-item">
                  <input
                    type="checkbox"
                    checked={checkedData.communityCert}
                    onChange={(e) => setCheckedData({ ...checkedData, communityCert: e.target.checked })}
                  />
                  <span>Community Certificate</span>
                </label>
              </div>

              <div className="ma-pv-check-col">
                <label className="ma-pv-check-item">
                  <input
                    type="checkbox"
                    checked={checkedData.aadhaarCard}
                    onChange={(e) => setCheckedData({ ...checkedData, aadhaarCard: e.target.checked })}
                  />
                  <span>Aadhar Card</span>
                </label>
                <label className="ma-pv-check-item">
                  <input
                    type="checkbox"
                    checked={checkedData.recommendationLetter}
                    onChange={(e) => setCheckedData({ ...checkedData, recommendationLetter: e.target.checked })}
                  />
                  <span>School Recommendation Letter</span>
                </label>
                <label className="ma-pv-check-item">
                  <input
                    type="checkbox"
                    checked={checkedData.firstGraduateCert}
                    onChange={(e) => setCheckedData({ ...checkedData, firstGraduateCert: e.target.checked })}
                  />
                  <span>First Graduate Certificate</span>
                </label>
                <label className="ma-pv-check-item">
                  <input
                    type="checkbox"
                    checked={checkedData.tc}
                    onChange={(e) => setCheckedData({ ...checkedData, tc: e.target.checked })}
                  />
                  <span>Transfer Certificate (TC)</span>
                </label>
              </div>
            </div>
          </div>

          {/* 2. Property Type & 3. Things noticed in the house */}
          <div className="ma-pv-row-two-col">
            {/* 2. Property Type */}
            <div className="ma-pv-card" style={{ marginBottom: 0 }}>
              <div className="ma-pv-card-head">
                <div className="ma-pv-icon-circle">
                  <Home size={17} strokeWidth={2.4} />
                </div>
                <h4 className="ma-pv-card-title">
                  2. Property Type <span className="ma-pv-req">*</span>
                </h4>
              </div>

              <div className="ma-pv-radio-group">
                <label className="ma-pv-radio-item">
                  <input
                    type="radio"
                    name="propertyType"
                    value="Own House"
                    checked={propertyType === "Own House"}
                    onChange={() => setPropertyType("Own House")}
                  />
                  <span>Own House</span>
                </label>
                <label className="ma-pv-radio-item">
                  <input
                    type="radio"
                    name="propertyType"
                    value="Rented House"
                    checked={propertyType === "Rented House"}
                    onChange={() => setPropertyType("Rented House")}
                  />
                  <span>Rented House</span>
                </label>
              </div>
            </div>

            {/* 3. Things noticed in the house */}
            <div className="ma-pv-card" style={{ marginBottom: 0 }}>
              <div className="ma-pv-card-head">
                <div className="ma-pv-icon-circle">
                  <ListChecks size={17} strokeWidth={2.4} />
                </div>
                <h4 className="ma-pv-card-title">3. Things noticed in the house</h4>
              </div>

              <div className="ma-pv-things-list">
                <label className="ma-pv-check-item">
                  <input
                    type="checkbox"
                    checked={thingsNoticed.furnished}
                    onChange={(e) => setThingsNoticed({ ...thingsNoticed, furnished: e.target.checked })}
                  />
                  <span>Well furnished house</span>
                </label>
                <label className="ma-pv-check-item">
                  <input
                    type="checkbox"
                    checked={thingsNoticed.bikes}
                    onChange={(e) => setThingsNoticed({ ...thingsNoticed, bikes: e.target.checked })}
                  />
                  <span>Bikes</span>
                </label>
                <label className="ma-pv-check-item">
                  <input
                    type="checkbox"
                    checked={thingsNoticed.newGoods}
                    onChange={(e) => setThingsNoticed({ ...thingsNoticed, newGoods: e.target.checked })}
                  />
                  <span>Newly bought goods (e.g., Washing Machine, TV, Fridge, etc.)</span>
                </label>
                <div className="ma-pv-other-row">
                  <label className="ma-pv-check-item" style={{ flexShrink: 0 }}>
                    <input
                      type="checkbox"
                      checked={thingsNoticed.other}
                      onChange={(e) => setThingsNoticed({ ...thingsNoticed, other: e.target.checked })}
                    />
                    <span>Other</span>
                  </label>
                  <input
                    type="text"
                    className="ma-pv-specify-input"
                    placeholder="Specify (e.g., Car, AC, etc.)"
                    value={otherGoodsText}
                    onChange={(e) => setOtherGoodsText(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* 4. Upload Photos (Minimum 6 photos) */}
          <div className="ma-pv-card">
            <div className="ma-pv-card-head">
              <div className="ma-pv-icon-circle">
                <ImageIcon size={17} strokeWidth={2.4} />
              </div>
              <h4 className="ma-pv-card-title">
                4. Upload Photos (Minimum 6 photos) <span className="ma-pv-req">*</span>
              </h4>
            </div>

            <div className="ma-pv-photo-grid">
              {photos.map((photo, idx) => (
                <div
                  key={idx}
                  className={`ma-pv-photo-slot ${photo ? "has-photo" : ""}`}
                  onClick={() => {
                    setActivePhotoSlot(idx);
                    setCameraModalOpen(true);
                  }}
                  title={photo ? `Photo ${idx + 1} captured - Click to retake` : `Click to take / add Photo ${idx + 1}`}
                >
                  {photo ? (
                    <div className="ma-pv-photo-thumb-wrap">
                      <img src={photo} alt={`Audit photo ${idx + 1}`} className="ma-pv-photo-thumb" />
                      <span className="ma-pv-photo-badge">#{idx + 1}</span>
                    </div>
                  ) : (
                    <div className="ma-pv-photo-empty-content">
                      <Camera size={18} className="ma-pv-add-icon" />
                      <span>Add Photo</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* 5. Address Verified & 6. Verification Date */}
          <div className="ma-pv-row-two-col">
            {/* 5. Address Verified */}
            <div className="ma-pv-card" style={{ marginBottom: 0 }}>
              <div className="ma-pv-card-head">
                <div className="ma-pv-icon-circle">
                  <MapPin size={17} strokeWidth={2.4} />
                </div>
                <h4 className="ma-pv-card-title">
                  5. Address Verified <span className="ma-pv-req">*</span>
                </h4>
              </div>

              <div className="ma-pv-addr-wrap">
                <input
                  type="text"
                  className="ma-pv-text-input"
                  value={verifiedAddressText}
                  onChange={(e) => setVerifiedAddressText(e.target.value)}
                  placeholder="Enter address verification details (e.g., House located, landmarks, etc.)"
                />
                <button
                  type="button"
                  className={`ma-pv-live-loc-btn ${liveLocationVerified ? "is-verified" : ""}`}
                  onClick={() => {
                    setLiveLocationVerified(true);
                    setSuccessToast("Live GPS Location fetched: 13.0598° N, 80.2764° E (Accuracy 3m)");
                    setTimeout(() => setSuccessToast(null), 3500);
                  }}
                >
                  <GoogleMapsPinIcon size={14} />
                  <span>Live Location</span>
                  {liveLocationVerified && <Check size={12} strokeWidth={3} />}
                </button>
              </div>
            </div>

            {/* 6. Verification Date */}
            <div className="ma-pv-card" style={{ marginBottom: 0 }}>
              <div className="ma-pv-card-head">
                <div className="ma-pv-icon-circle">
                  <Calendar size={17} strokeWidth={2.4} />
                </div>
                <h4 className="ma-pv-card-title">
                  6. Verification Date <span className="ma-pv-req">*</span>
                </h4>
              </div>

              <div className="ma-pv-date-wrap">
                <input
                  type="date"
                  className="ma-pv-date-input"
                  value={verificationDate}
                  onChange={(e) => setVerificationDate(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* 7. Volunteer Recommendation */}
          <div className="ma-pv-card">
            <div className="ma-pv-card-head">
              <div className="ma-pv-icon-circle">
                <Award size={17} strokeWidth={2.4} />
              </div>
              <h4 className="ma-pv-card-title">
                7. Volunteer Recommendation <span className="ma-pv-req">*</span>
              </h4>
            </div>

            <div className="ma-pv-radio-group ma-pv-radio-row">
              <label className="ma-pv-radio-item">
                <input
                  type="radio"
                  name="recommendation"
                  value="Selected"
                  checked={recommendation === "Selected"}
                  onChange={() => setRecommendation("Selected")}
                />
                <span>Selected</span>
              </label>
              <label className="ma-pv-radio-item">
                <input
                  type="radio"
                  name="recommendation"
                  value="Not Selected"
                  checked={recommendation === "Not Selected"}
                  onChange={() => setRecommendation("Not Selected")}
                />
                <span>Not Selected</span>
              </label>
            </div>
          </div>

          {/* 8. Remarks */}
          <div className="ma-pv-card">
            <div className="ma-pv-card-head">
              <div className="ma-pv-icon-circle">
                <Edit3 size={17} strokeWidth={2.4} />
              </div>
              <h4 className="ma-pv-card-title">
                8. Remarks <span className="ma-pv-req">*</span>
              </h4>
            </div>

            <textarea
              className="ma-pv-textarea"
              rows={3}
              value={formRemarks}
              onChange={(e) => setFormRemarks(e.target.value)}
              placeholder="Enter your remarks about the verification (e.g., family background, living conditions, etc.)"
            />
          </div>

          {/* 9. Voice Recorder */}
          <div className="ma-pv-card">
            <div className="ma-pv-card-head">
              <div className="ma-pv-icon-circle">
                <Mic size={17} strokeWidth={2.4} />
              </div>
              <h4 className="ma-pv-card-title">9. Voice Recorder</h4>
            </div>

            <div className="ma-pv-recorder-body">
              <div className="ma-pv-waveform-wrap">
                <div className={`ma-pv-waveform ${voiceRecordingState === "recording" ? "is-active" : ""}`}>
                  {[12, 20, 32, 16, 26, 38, 28, 18, 35, 22, 42, 30, 15, 24, 38, 20, 32, 16, 24, 36, 26, 14, 28, 22].map((h, i) => (
                    <span
                      key={i}
                      className="ma-pv-wave-bar"
                      style={{
                        height: voiceRecordingState === "recording" ? `${Math.max(6, (h + (i % 3) * 5))}px` : `${h * 0.4}px`,
                        background: i % 2 === 0 ? "#F59E0B" : "#CBD5E1",
                      }}
                    />
                  ))}
                </div>

                <div className="ma-pv-record-timer">
                  {String(Math.floor(recordingSeconds / 60)).padStart(2, "0")}:
                  {String(recordingSeconds % 60).padStart(2, "0")} / 03:00
                </div>
              </div>

              <div className="ma-pv-recorder-controls">
                <button
                  type="button"
                  className={`ma-pv-rec-btn ${voiceRecordingState === "recording" ? "is-recording" : ""}`}
                  onClick={() => {
                    setVoiceRecordingState("recording");
                    setVoiceSaved(false);
                  }}
                >
                  <Play size={13} fill="currentColor" />
                  <span>Start</span>
                </button>

                <button
                  type="button"
                  className="ma-pv-rec-btn"
                  onClick={() => setVoiceRecordingState("paused")}
                  disabled={voiceRecordingState === "idle"}
                >
                  <Pause size={13} fill="currentColor" />
                  <span>Pause</span>
                </button>

                <button
                  type="button"
                  className="ma-pv-rec-btn ma-pv-rec-stop"
                  onClick={() => setVoiceRecordingState("stopped")}
                  disabled={voiceRecordingState === "idle"}
                >
                  <Square size={12} fill="currentColor" />
                  <span>Stop</span>
                </button>

                <button
                  type="button"
                  className="ma-pv-rec-btn ma-pv-rec-save"
                  onClick={() => {
                    setVoiceSaved(true);
                    setVoiceRecordingState("stopped");
                    setSuccessToast("Voice verification recording saved successfully.");
                    setTimeout(() => setSuccessToast(null), 3500);
                  }}
                >
                  <Save size={13} />
                  <span>{voiceSaved ? "Saved ✓" : "Save"}</span>
                </button>
              </div>
            </div>
          </div>

          <div className="ma-sv-bottom-spacer" aria-hidden="true" />
        </div>
      ) : (
        <>
          {/* 2. Banner Card (Fixed Upper Side - Contextual Header for each Tab) */}
          <div className="ma-sv-banner-card">
        <div className="ma-sv-banner-left">
          <div className="ma-sv-banner-shield">
            {activeTab === "personal" || activeTab === "family" ? (
              <Users size={24} color="#0F172A" strokeWidth={2.4} />
            ) : activeTab === "address" ? (
              <MapPin size={24} color="#0F172A" strokeWidth={2.4} />
            ) : activeTab === "education" ? (
              <GraduationCap size={24} color="#0F172A" strokeWidth={2.4} />
            ) : activeTab === "televerification" ? (
              <PhoneCall size={24} color="#0F172A" strokeWidth={2.4} />
            ) : (
              <ShieldCheck size={26} color="#0F172A" strokeWidth={2.4} />
            )}
          </div>
          <div className="ma-sv-banner-text">
            <h2>
              {activeTab === "personal"
                ? "Personal & Identity Details"
                : activeTab === "family"
                  ? "Family & Socio-Economic Dossier"
                  : activeTab === "address"
                    ? "Residential Address Verification"
                    : activeTab === "education"
                      ? "Academic Record & Qualifications"
                      : activeTab === "televerification"
                        ? "Tele-Verification Records"
                        : "Physical Verification"}
            </h2>
            <p>
              {activeTab === "personal"
                ? "Verify the student's personal identity and Aadhaar credentials."
                : activeTab === "family"
                  ? "Review parents, siblings, living conditions and income proofs."
                  : activeTab === "address"
                    ? "Verify current and permanent residence locations & route."
                    : activeTab === "education"
                      ? "Inspect 10th, 11th & 12th standard marksheets and cutoffs."
                      : activeTab === "televerification"
                        ? "Review preliminary phone interview records & notes."
                        : "Review the student details and continue with verification."}
            </p>
          </div>
        </div>
        <div className="ma-sv-banner-art-wrap">
          <img
            src={
              activeTab === "personal" || activeTab === "family"
                ? "/assets/communities/family-banner-art.png"
                : "/assets/communities/pv-banner-art.png"
            }
            alt="Verification banner illustration"
            className="ma-sv-house-art"
          />
        </div>
      </div>

      {/* 3. Student Profile Card (Fixed Upper Side) */}
      <div className="ma-sv-student-card">
        <div className="ma-sv-photo-wrap">
          <img
            src={candidate.photoUrl}
            alt={candidate.name}
            className="ma-sv-photo-img"
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/assets/photos/student-portrait.jpg";
            }}
          />
        </div>

        <div className="ma-sv-student-info">
          <div className="ma-sv-name-status-row">
            <h3 className="ma-sv-student-name">{candidate.name}</h3>

            {/* Status Badge */}
            {activeTab === "personal" ? (
              <span className="ma-sv-verified-pill">
                <CheckCircle2 size={13} strokeWidth={2.6} />
                <span>Application Verified</span>
              </span>
            ) : candidate.status === "Assigned" ? (
              <span className="ma-sv-status-pill is-assigned">
                <Clock size={12} strokeWidth={2.4} />
                <span>Assigned</span>
              </span>
            ) : candidate.status === "Visit Scheduled" ? (
              <span className="ma-sv-status-pill is-scheduled">
                <Calendar size={12} strokeWidth={2.4} />
                <span>Visit Scheduled</span>
              </span>
            ) : candidate.status === "In Progress" ? (
              <span className="ma-sv-status-pill is-progress">
                <PlayCircle size={12} strokeWidth={2.4} />
                <span>In Progress</span>
              </span>
            ) : candidate.status === "Submitted" ? (
              <span className="ma-sv-status-pill is-submitted">
                <CheckCircle2 size={12} strokeWidth={2.4} />
                <span>Submitted</span>
              </span>
            ) : (
              <span className="ma-sv-status-pill is-revisit">
                <AlertCircle size={12} strokeWidth={2.4} />
                <span>Revisit Required</span>
              </span>
            )}
          </div>

          <span className="ma-sv-app-id">App ID : {candidate.applicationNo}</span>

          <a href={`tel:${candidate.phone.replace(/\s+/g, "")}`} className="ma-sv-contact-row">
            <Phone size={13} className="ma-sv-icon" />
            <span>{candidate.phone}</span>
          </a>

          <button
            type="button"
            onClick={() => setActiveTab("address")}
            className="ma-sv-contact-row"
            style={{ background: "none", border: "none", padding: 0, cursor: "pointer", textAlign: "left" }}
            title="Click to view address"
          >
            <MapPin size={13} className="ma-sv-icon" />
            <span>{candidate.location}</span>
          </button>
        </div>
      </div>

      {/* 4. Verification Stepper (Fixed Upper Side) */}
      <div className="ma-sv-stepper-card">
        <div className="ma-sv-stepper-track">
          {/* Step 1: Application Completed */}
          <div className="ma-sv-step is-completed">
            <div className="ma-sv-step-node">
              <FileText size={14} color="#FFFFFF" strokeWidth={2.4} />
            </div>
            <span className="ma-sv-step-title">Application</span>
            <span className="ma-sv-step-sub">Completed</span>
          </div>

          <div className="ma-sv-step-line is-active" />

          {/* Step 2: Tele Verification Completed */}
          <div className="ma-sv-step is-completed">
            <div className="ma-sv-step-node">
              <Check size={14} color="#FFFFFF" strokeWidth={3} />
            </div>
            <span className="ma-sv-step-title">Tele</span>
            <span className="ma-sv-step-sub">Verification Completed</span>
          </div>

          <div className={`ma-sv-step-line ${isSubmitted ? "is-active" : "is-pending"}`} />

          {/* Step 3: Physical Verification (Active Focus) */}
          <div className={`ma-sv-step ${isSubmitted ? "is-completed" : "is-current"}`}>
            <div className="ma-sv-step-node is-gold-node">
              {isSubmitted ? (
                <Check size={14} color="#FFFFFF" strokeWidth={3} />
              ) : (
                <Home size={15} color="#111827" strokeWidth={2.4} />
              )}
            </div>
            <span className="ma-sv-step-title is-bold">Physical</span>
            <span className="ma-sv-step-sub is-bold">Verification</span>
            <span className={`ma-sv-step-badge ${isSubmitted ? "is-done" : "is-pending"}`}>
              {isSubmitted ? "Verified" : "Pending"}
            </span>
          </div>

          <div className="ma-sv-step-line is-muted" />

          {/* Step 4: Video Call */}
          <div className="ma-sv-step is-muted">
            <div className="ma-sv-step-node is-muted-node">
              <Video size={14} color="#9CA3AF" />
            </div>
            <span className="ma-sv-step-title">Video Call</span>
            <span className="ma-sv-step-sub">Pending</span>
          </div>
        </div>
      </div>

      {/* 5. Segmented Navigation Tabs (Fixed Upper Side) */}
      <div className="ma-sv-nav-tabs" role="tablist">
        <button
          type="button"
          className={`ma-sv-tab-btn ${activeTab === "overview" ? "is-active" : ""}`}
          onClick={() => {
            setActiveTab("overview");
            setSelectedGradeDetail(null);
          }}
        >
          <User size={14} />
          <span>Overview</span>
        </button>

        <button
          type="button"
          className={`ma-sv-tab-btn ${activeTab === "personal" ? "is-active" : ""}`}
          onClick={() => {
            setActiveTab("personal");
            setSelectedGradeDetail(null);
          }}
        >
          <User size={14} />
          <span>Personal</span>
        </button>

        <button
          type="button"
          className={`ma-sv-tab-btn ${activeTab === "family" ? "is-active" : ""}`}
          onClick={() => {
            setActiveTab("family");
            setSelectedGradeDetail(null);
          }}
        >
          <Users size={14} />
          <span>Family</span>
        </button>

        <button
          type="button"
          className={`ma-sv-tab-btn ${activeTab === "address" ? "is-active" : ""}`}
          onClick={() => {
            setActiveTab("address");
            setSelectedGradeDetail(null);
          }}
        >
          <MapPin size={14} />
          <span>Address</span>
        </button>

        <button
          type="button"
          className={`ma-sv-tab-btn ${activeTab === "education" ? "is-active" : ""}`}
          onClick={() => setActiveTab("education")}
        >
          <GraduationCap size={15} />
          <span>Education</span>
        </button>

        <button
          type="button"
          className={`ma-sv-tab-btn ${activeTab === "televerification" ? "is-active" : ""}`}
          onClick={() => {
            setActiveTab("televerification");
            setSelectedGradeDetail(null);
          }}
        >
          <PhoneCall size={14} />
          <span>Televerification Details</span>
        </button>
      </div>

      {/* 6. Tab Body Content */}
      <div className="ma-sv-content-body">
        {/* Tab 1: OVERVIEW */}
        {activeTab === "overview" && (
          <div className="ma-sv-tab-pane">
            {/* Section A: Student Information */}
            <div className="ma-sv-section">
              <div className="ma-sv-sec-head">
                <span className="ma-sv-gold-bar" />
                <h4>Student Information</h4>
              </div>

              <div className="ma-sv-info-grid-card">
                <div className="ma-sv-grid-row">
                  <div className="ma-sv-grid-col">
                    <span className="ma-sv-lbl">Gender</span>
                    <span className="ma-sv-val">{candidate.gender}</span>
                  </div>
                  <div className="ma-sv-grid-col">
                    <span className="ma-sv-lbl">Community</span>
                    <span className="ma-sv-val">BC</span>
                  </div>
                </div>

                <div className="ma-sv-grid-row">
                  <div className="ma-sv-grid-col">
                    <span className="ma-sv-lbl">Date of Birth</span>
                    <span className="ma-sv-val">30-03-2009</span>
                  </div>
                  <div className="ma-sv-grid-col">
                    <span className="ma-sv-lbl">First Graduate</span>
                    <span className="ma-sv-val">{candidate.firstGraduate ? "Yes" : "No"}</span>
                  </div>
                </div>

                <div className="ma-sv-grid-row">
                  <div className="ma-sv-grid-col">
                    <span className="ma-sv-lbl">Applying For</span>
                    <span className="ma-sv-val">Under Graduate</span>
                  </div>
                  <div className="ma-sv-grid-col">
                    <span className="ma-sv-lbl">Referral Channel</span>
                    <span className="ma-sv-val">Teachers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section B: Contact Details */}
            <div className="ma-sv-section">
              <div className="ma-sv-sec-head">
                <span className="ma-sv-gold-bar" />
                <h4>Contact Details</h4>
              </div>

              <div className="ma-sv-contact-card">
                <div className="ma-sv-contact-item">
                  <div className="ma-sv-contact-lbl">
                    <Phone size={13} className="ma-sv-c-icon" />
                    <span>Mobile Number</span>
                  </div>
                  <a href={`tel:${candidate.phone.replace(/\s+/g, "")}`} className="ma-sv-contact-val">
                    {candidate.phone}
                  </a>
                </div>

                <div className="ma-sv-contact-item">
                  <div className="ma-sv-contact-lbl">
                    <MessageSquare size={13} className="ma-sv-c-icon is-green" />
                    <span>WhatsApp Number</span>
                  </div>
                  <a
                    href={`https://wa.me/${candidate.phone.replace(/[^0-9]/g, "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="ma-sv-contact-val"
                  >
                    {candidate.phone}
                  </a>
                </div>

                <div className="ma-sv-contact-item">
                  <div className="ma-sv-contact-lbl">
                    <Mail size={13} className="ma-sv-c-icon is-blue" />
                    <span>Email ID</span>
                  </div>
                  <span className="ma-sv-contact-val">
                    {candidate.name.toLowerCase().replace(/\s+/g, "")}@gmail.com
                  </span>
                </div>
              </div>
            </div>

            {/* Section C: Application Status */}
            <div className="ma-sv-section">
              <div className="ma-sv-sec-head">
                <span className="ma-sv-gold-bar" />
                <h4>Application Status</h4>
              </div>

              <div className="ma-sv-app-status-row">
                <div className="ma-sv-app-approved-box">
                  <div className="ma-sv-approved-icon-circle">
                    <Check size={16} color="#FFFFFF" strokeWidth={3} />
                  </div>
                  <div>
                    <strong className="ma-sv-approved-title">Application Approved</strong>
                    <span className="ma-sv-approved-sub">Last Updated : 24 Jul 2026</span>
                  </div>
                </div>

                <button
                  type="button"
                  className="ma-sv-full-app-btn"
                  onClick={() => setFullAppModalOpen(true)}
                >
                  <FileText size={15} />
                  <span>View Full Application</span>
                  <ArrowRight size={13} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: PERSONAL (Exact Match to User Reference Image 2) */}
        {activeTab === "personal" && (
          <div className="ma-sv-tab-pane">
            {/* Section 1: Personal Details */}
            <div className="ma-sv-section">
              <div className="ma-sv-sec-head">
                <span className="ma-sv-gold-bar" />
                <h4>Personal Details</h4>
              </div>

              <div className="ma-sv-personal-table-card">
                <div className="ma-sv-p-row">
                  <span className="ma-sv-p-lbl">Gender</span>
                  <span className="ma-sv-p-val">{candidate.gender}</span>
                </div>
                <div className="ma-sv-p-row">
                  <span className="ma-sv-p-lbl">Date of Birth</span>
                  <span className="ma-sv-p-val">30-03-2009</span>
                </div>
                <div className="ma-sv-p-row">
                  <span className="ma-sv-p-lbl">Mobile Number</span>
                  <span className="ma-sv-p-val">{candidate.phone}</span>
                </div>
                <div className="ma-sv-p-row">
                  <span className="ma-sv-p-lbl">WhatsApp Number</span>
                  <span className="ma-sv-p-val">{candidate.phone}</span>
                </div>
                <div className="ma-sv-p-row">
                  <span className="ma-sv-p-lbl">Email ID</span>
                  <span className="ma-sv-p-val">
                    {candidate.name.toLowerCase().replace(/\s+/g, "")}@gmail.com
                  </span>
                </div>
                <div className="ma-sv-p-row">
                  <span className="ma-sv-p-lbl">Applying For</span>
                  <span className="ma-sv-p-val">Under Graduate</span>
                </div>
                <div className="ma-sv-p-row">
                  <span className="ma-sv-p-lbl">Community</span>
                  <span className="ma-sv-p-val">BC</span>
                </div>
                <div className="ma-sv-p-row">
                  <span className="ma-sv-p-lbl">First Graduate</span>
                  <span className="ma-sv-p-val">{candidate.firstGraduate ? "Yes" : "No"}</span>
                </div>
                <div className="ma-sv-p-row">
                  <span className="ma-sv-p-lbl">Aadhaar Document</span>
                  <button
                    type="button"
                    className="ma-sv-view-doc-btn"
                    onClick={() => setAadhaarModalOpen(true)}
                  >
                    <ImageIcon size={13} />
                    <span>View Document</span>
                    <ArrowRight size={11} />
                  </button>
                </div>
                <div className="ma-sv-p-row">
                  <span className="ma-sv-p-lbl">Referral Channel</span>
                  <span className="ma-sv-p-val">Teachers</span>
                </div>
                <div className="ma-sv-p-row">
                  <span className="ma-sv-p-lbl">Referrer Name</span>
                  <span className="ma-sv-p-val">Geetha</span>
                </div>
                <div className="ma-sv-p-row">
                  <span className="ma-sv-p-lbl">Referrer Contact</span>
                  <span className="ma-sv-p-val">+91 90011 22334</span>
                </div>
              </div>
            </div>

            {/* Section 2: Family Information */}
            <div className="ma-sv-section">
              <div className="ma-sv-sec-head">
                <span className="ma-sv-gold-bar" />
                <h4>Family Information</h4>
              </div>

              <div className="ma-sv-family-two-col">
                {/* Father's Details */}
                <div className="ma-sv-family-box">
                  <div className="ma-sv-family-box-head">
                    <User size={14} />
                    <span>Father's Details</span>
                  </div>
                  <div className="ma-sv-f-row">
                    <span className="ma-sv-f-lbl">Name</span>
                    <span className="ma-sv-f-val">R. Kumar</span>
                  </div>
                  <div className="ma-sv-f-row">
                    <span className="ma-sv-f-lbl">Occupation</span>
                    <span className="ma-sv-f-val">{candidate.parentOccupation || "Farmer"}</span>
                  </div>
                  <div className="ma-sv-f-row">
                    <span className="ma-sv-f-lbl">Income</span>
                    <span className="ma-sv-f-val">{candidate.annualIncome || "₹96,000 / year"}</span>
                  </div>
                  <div className="ma-sv-f-row">
                    <span className="ma-sv-f-lbl">Phone Number</span>
                    <span className="ma-sv-f-val">{candidate.parentPhone || "+91 97865 43211"}</span>
                  </div>
                </div>

                {/* Mother's Details */}
                <div className="ma-sv-family-box">
                  <div className="ma-sv-family-box-head">
                    <User size={14} />
                    <span>Mother's Details</span>
                  </div>
                  <div className="ma-sv-f-row">
                    <span className="ma-sv-f-lbl">Name</span>
                    <span className="ma-sv-f-val">S. Lakshmi</span>
                  </div>
                  <div className="ma-sv-f-row">
                    <span className="ma-sv-f-lbl">Occupation</span>
                    <span className="ma-sv-f-val">House Wife</span>
                  </div>
                  <div className="ma-sv-f-row">
                    <span className="ma-sv-f-lbl">Income</span>
                    <span className="ma-sv-f-val">₹0</span>
                  </div>
                  <div className="ma-sv-f-row">
                    <span className="ma-sv-f-lbl">Phone Number</span>
                    <span className="ma-sv-f-val">+91 87654 32109</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Sibling Information */}
            <div className="ma-sv-section">
              <div className="ma-sv-sec-head">
                <span className="ma-sv-gold-bar" />
                <h4>Sibling Information</h4>
              </div>

              <div className="ma-sv-sibling-box">
                <CheckCircle2 size={16} color="#15803D" strokeWidth={2.4} />
                <span>No Siblings Information Found</span>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: FAMILY (Comprehensive Family Dossier & Physical Verification) */}
        {activeTab === "family" && (
          <div className="ma-sv-tab-pane">
            {/* Section 1: Parents Information */}
            <div className="ma-sv-section">
              <div className="ma-sv-sec-head">
                <span className="ma-sv-gold-bar" />
                <h4>Parents Information</h4>
              </div>

              <div className="ma-sv-fam-parent-grid">
                {/* Father's Card */}
                <div className="ma-sv-fam-card" style={{ marginBottom: 0 }}>
                  <div className="ma-sv-fam-card-head">
                    <div className="ma-sv-fam-head-left">
                      <div className="ma-sv-fam-head-icon">
                        <User size={18} strokeWidth={2.4} />
                      </div>
                      <h5 className="ma-sv-fam-head-title">Father's Details</h5>
                    </div>
                    <span className="ma-sv-fam-role-badge is-earner">Primary Earner</span>
                  </div>

                  <div className="ma-sv-fam-grid">
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Full Name</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <span className="ma-sv-fam-val">R. Kumar</span>
                    </div>
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Status & Age</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <span className="ma-sv-fam-val">Alive · 48 Years</span>
                    </div>
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Occupation</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <span className="ma-sv-fam-val">Farmer / Daily Wage Labor</span>
                    </div>
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Nature of Work</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <span className="ma-sv-fam-val">Seasonal Agricultural Laborer</span>
                    </div>
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Qualification</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <span className="ma-sv-fam-val">10th Standard (Incomplete)</span>
                    </div>
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Monthly Income</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <span className="ma-sv-fam-val">₹4,000 / month</span>
                    </div>
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Annual Income</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <span className="ma-sv-fam-val" style={{ color: "#D97706" }}>
                        ₹48,000 / year
                      </span>
                    </div>
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Mobile Number</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <a
                        href="tel:+919786543211"
                        className="ma-sv-fam-val"
                        style={{ color: "#2563EB", textDecoration: "none" }}
                      >
                        +91 97865 43211
                      </a>
                    </div>
                    <div className="ma-sv-fam-row" style={{ alignItems: "center", marginTop: 4 }}>
                      <span className="ma-sv-fam-key">Identity Proof</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <button
                        type="button"
                        className="ma-sv-fam-doc-btn"
                        onClick={() =>
                          setFamilyDocModal({
                            open: true,
                            title: "Father's Identity Document",
                            docType: "Aadhaar Card",
                            docNumber: "XXXX-XXXX-8921",
                            issuedBy: "Unique Identification Authority of India (UIDAI)",
                            issuedDate: "12-08-2014",
                            holderName: "R. Kumar",
                            details: [
                              { label: "Father / Guardian", value: "Ramasamy M" },
                              { label: "Date of Birth", value: "14-06-1978 (48 Yrs)" },
                              { label: "Gender", value: "Male" },
                              { label: "Address", value: "Pollachi, Coimbatore, Tamil Nadu - 642001" },
                              { label: "Verification Status", value: "Biometrics & QR Authenticated" },
                            ],
                          })
                        }
                      >
                        <FileText size={12} />
                        <span>View Aadhaar</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Mother's Card */}
                <div className="ma-sv-fam-card" style={{ marginBottom: 0 }}>
                  <div className="ma-sv-fam-card-head">
                    <div className="ma-sv-fam-head-left">
                      <div className="ma-sv-fam-head-icon">
                        <User size={18} strokeWidth={2.4} />
                      </div>
                      <h5 className="ma-sv-fam-head-title">Mother's Details</h5>
                    </div>
                    <span className="ma-sv-fam-role-badge is-homemaker">Homemaker</span>
                  </div>

                  <div className="ma-sv-fam-grid">
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Full Name</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <span className="ma-sv-fam-val">S. Lakshmi</span>
                    </div>
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Status & Age</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <span className="ma-sv-fam-val">Alive · 44 Years</span>
                    </div>
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Occupation</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <span className="ma-sv-fam-val">Homemaker / Housewife</span>
                    </div>
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Nature of Work</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <span className="ma-sv-fam-val">Home Care & Household</span>
                    </div>
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Qualification</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <span className="ma-sv-fam-val">8th Standard</span>
                    </div>
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Monthly Income</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <span className="ma-sv-fam-val">₹0 (Nil)</span>
                    </div>
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Annual Income</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <span className="ma-sv-fam-val" style={{ color: "#64748B" }}>
                        ₹0 (Dependent)
                      </span>
                    </div>
                    <div className="ma-sv-fam-row">
                      <span className="ma-sv-fam-key">Mobile Number</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <a
                        href="tel:+918765432109"
                        className="ma-sv-fam-val"
                        style={{ color: "#2563EB", textDecoration: "none" }}
                      >
                        +91 87654 32109
                      </a>
                    </div>
                    <div className="ma-sv-fam-row" style={{ alignItems: "center", marginTop: 4 }}>
                      <span className="ma-sv-fam-key">Identity Proof</span>
                      <span className="ma-sv-fam-colon">:</span>
                      <button
                        type="button"
                        className="ma-sv-fam-doc-btn"
                        onClick={() =>
                          setFamilyDocModal({
                            open: true,
                            title: "Mother's Identity Document",
                            docType: "Aadhaar Card",
                            docNumber: "XXXX-XXXX-4530",
                            issuedBy: "Unique Identification Authority of India (UIDAI)",
                            issuedDate: "18-03-2015",
                            holderName: "S. Lakshmi",
                            details: [
                              { label: "Spouse Name", value: "R. Kumar" },
                              { label: "Date of Birth", value: "05-11-1982 (44 Yrs)" },
                              { label: "Gender", value: "Female" },
                              { label: "Address", value: "Pollachi, Coimbatore, Tamil Nadu - 642001" },
                              { label: "Verification Status", value: "Biometrics & QR Authenticated" },
                            ],
                          })
                        }
                      >
                        <FileText size={12} />
                        <span>View Aadhaar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Sibling Information */}
            <div className="ma-sv-section">
              <div className="ma-sv-sec-head">
                <span className="ma-sv-gold-bar" />
                <h4>Sibling Information</h4>
              </div>

              <div className="ma-sv-fam-card">
                <div className="ma-sv-fam-card-head">
                  <div className="ma-sv-fam-head-left">
                    <div className="ma-sv-fam-head-icon">
                      <Users size={18} strokeWidth={2.4} />
                    </div>
                    <h5 className="ma-sv-fam-head-title">Sibling Details (1 Dependent)</h5>
                  </div>
                  <span className="ma-sv-fam-role-badge is-sibling">Dependent Sibling</span>
                </div>

                <div className="ma-sv-fam-grid">
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Sibling Name</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">K. Vignesh</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Relationship</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">Younger Brother</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Age & Status</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">15 Years · School Student</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Current Class</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">10th Standard</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Institution</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">Government High School, Triplicane</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Financial Dependency</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">Fully Dependent on Parents</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Educational Expense</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">₹0 (Govt. Free Education & Noon Meal Scheme)</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 3: Household & Socio-Economic Status */}
            <div className="ma-sv-section">
              <div className="ma-sv-sec-head">
                <span className="ma-sv-gold-bar" />
                <h4>Household & Socio-Economic Status</h4>
              </div>

              <div className="ma-sv-fam-card">
                <div className="ma-sv-fam-card-head">
                  <div className="ma-sv-fam-head-left">
                    <div className="ma-sv-fam-head-icon">
                      <Home size={18} strokeWidth={2.4} />
                    </div>
                    <h5 className="ma-sv-fam-head-title">Living Conditions & Economic Profile</h5>
                  </div>
                  <span className="ma-sv-fam-role-badge is-earner">BPL Category</span>
                </div>

                <div className="ma-sv-fam-grid">
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Total Family Members</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">4 Members (2 Adults, 2 Dependent Children)</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Earning Members</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">1 Member (Father Only)</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Total Annual Income</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val" style={{ color: "#D97706" }}>
                      ₹48,000 / year (Verified Below Poverty Line)
                    </span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Smart Ration Card Type</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">PHH (Priority Household - Green/Rice Card)</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Ration Card Number</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">33/PHH/1092847</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">House Ownership</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">Rented House (No Ancestral Land / Property)</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Monthly House Rent</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">₹2,500 / month</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">House Construction</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">Semi-Pucca / Thatched Single Room Dwelling</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Electricity Connection</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">Domestic Single Phase (Free 100 Units Scheme)</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">Drinking Water</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val">Public Tap / Local Municipal Supply</span>
                  </div>
                  <div className="ma-sv-fam-row">
                    <span className="ma-sv-fam-key">First Generation Graduate</span>
                    <span className="ma-sv-fam-colon">:</span>
                    <span className="ma-sv-fam-val" style={{ color: "#15803D" }}>
                      Yes (Priya is the first in family to attend College)
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Section 4: Verified Family Documents */}
            <div className="ma-sv-section">
              <div className="ma-sv-sec-head">
                <span className="ma-sv-gold-bar" />
                <h4>Government Verified Family Documents</h4>
              </div>

              <div className="ma-sv-fam-doc-grid">
                {/* Doc 1: Smart Ration Card */}
                <div className="ma-sv-fam-doc-card">
                  <div className="ma-sv-fam-doc-meta">
                    <FileText size={20} className="ma-sv-fam-doc-icon" strokeWidth={2.2} />
                    <div>
                      <span className="ma-sv-fam-doc-name">Smart Ration Card</span>
                      <span className="ma-sv-fam-doc-sub">PHH Rice Card · 33/PHH/1092847</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ma-sv-fam-view-pill"
                    onClick={() =>
                      setFamilyDocModal({
                        open: true,
                        title: "Tamil Nadu Smart Ration Card",
                        docType: "Digital Family Ration Card (PHH)",
                        docNumber: "33/PHH/1092847",
                        issuedBy: "Civil Supplies & Consumer Protection Dept, Govt. of Tamil Nadu",
                        issuedDate: "14-07-2018",
                        holderName: "R. Kumar (Head of Family)",
                        details: [
                          { label: "Card Category", value: "Priority Household (PHH) - Rice Card" },
                          { label: "Head of Household", value: "R. Kumar (Father)" },
                          { label: "Spouse", value: "S. Lakshmi (Mother)" },
                          { label: "Beneficiary 1", value: "Priya S (Daughter - Candidate)" },
                          { label: "Beneficiary 2", value: "K. Vignesh (Son)" },
                          { label: "FPS Code", value: "Coimbatore South Fair Price Shop #042" },
                          { label: "Entitlement", value: "Free Rice & Essential Subsidies" },
                        ],
                      })
                    }
                  >
                    <Eye size={13} strokeWidth={2.4} />
                    <span>View</span>
                  </button>
                </div>

                {/* Doc 2: Income Certificate */}
                <div className="ma-sv-fam-doc-card">
                  <div className="ma-sv-fam-doc-meta">
                    <Award size={20} className="ma-sv-fam-doc-icon" strokeWidth={2.2} />
                    <div>
                      <span className="ma-sv-fam-doc-name">Income Certificate</span>
                      <span className="ma-sv-fam-doc-sub">Tahsildar Certified · ₹48,000/yr</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ma-sv-fam-view-pill"
                    onClick={() =>
                      setFamilyDocModal({
                        open: true,
                        title: "Official Government Income Certificate",
                        docType: "Revenue Dept. Annual Income Certificate",
                        docNumber: "REV/INC/2026/89410",
                        issuedBy: "Office of the Tahsildar, Pollachi Taluk, Coimbatore",
                        issuedDate: "10-06-2026",
                        holderName: "R. Kumar (Father of Priya S)",
                        details: [
                          { label: "Applicant Name", value: "Priya S" },
                          { label: "Parent Name", value: "R. Kumar" },
                          { label: "Certified Annual Income", value: "₹48,000/- (Rupees Forty Eight Thousand Only)" },
                          { label: "Income Source", value: "Agricultural Daily Wage Labor" },
                          { label: "Economic Status", value: "Verified Below Poverty Line (BPL)" },
                          { label: "Digital Signature", value: "Verified by Zonal Deputy Tahsildar" },
                        ],
                      })
                    }
                  >
                    <Eye size={13} strokeWidth={2.4} />
                    <span>View</span>
                  </button>
                </div>

                {/* Doc 3: First Graduate Certificate */}
                <div className="ma-sv-fam-doc-card">
                  <div className="ma-sv-fam-doc-meta">
                    <GraduationCap size={20} className="ma-sv-fam-doc-icon" strokeWidth={2.2} />
                    <div>
                      <span className="ma-sv-fam-doc-name">First Graduate Certificate</span>
                      <span className="ma-sv-fam-doc-sub">Revenue Dept. Certified · FG/2026</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ma-sv-fam-view-pill"
                    onClick={() =>
                      setFamilyDocModal({
                        open: true,
                        title: "First Generation Graduate Certificate",
                        docType: "Tamil Nadu Government Higher Education Certificate",
                        docNumber: "TN-FG/2026/04321",
                        issuedBy: "Revenue Administration & Disaster Management, Tamil Nadu",
                        issuedDate: "18-06-2026",
                        holderName: "Priya S",
                        details: [
                          { label: "Candidate Name", value: "Priya S" },
                          { label: "Father's Name & Edn", value: "R. Kumar (10th Std - Non Graduate)" },
                          { label: "Mother's Name & Edn", value: "S. Lakshmi (8th Std - Non Graduate)" },
                          { label: "Sibling Name & Edn", value: "K. Vignesh (10th Std - School Student)" },
                          { label: "Eligibility Declaration", value: "First Member of Family to pursue Degree Course" },
                          { label: "Scholarship Scheme", value: "Eligible for Full Tuition Fee Concession" },
                        ],
                      })
                    }
                  >
                    <Eye size={13} strokeWidth={2.4} />
                    <span>View</span>
                  </button>
                </div>

                {/* Doc 4: Parent Aadhaar Card */}
                <div className="ma-sv-fam-doc-card">
                  <div className="ma-sv-fam-doc-meta">
                    <User size={20} className="ma-sv-fam-doc-icon" strokeWidth={2.2} />
                    <div>
                      <span className="ma-sv-fam-doc-name">Parent Aadhaar Proof</span>
                      <span className="ma-sv-fam-doc-sub">R. Kumar (Father) · Verified</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="ma-sv-fam-view-pill"
                    onClick={() =>
                      setFamilyDocModal({
                        open: true,
                        title: "Father's Verified Aadhaar Card",
                        docType: "Unique Identification Card",
                        docNumber: "XXXX-XXXX-8921",
                        issuedBy: "Government of India (UIDAI)",
                        issuedDate: "12-08-2014",
                        holderName: "R. Kumar",
                        details: [
                          { label: "Full Name", value: "R. Kumar" },
                          { label: "Relation to Candidate", value: "Father" },
                          { label: "Date of Birth", value: "14-06-1978" },
                          { label: "Address", value: "Pollachi, Coimbatore - 642001, Tamil Nadu" },
                          { label: "Biometric Authentication", value: "Verified & Matched with Application" },
                        ],
                      })
                    }
                  >
                    <Eye size={13} strokeWidth={2.4} />
                    <span>View</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Section 5: Physical Verification Volunteer Field Observation */}
            <div className="ma-sv-section">
              <div className="ma-sv-sec-head">
                <span className="ma-sv-gold-bar" />
                <h4>Physical Verification Field Notes</h4>
              </div>

              <div className="ma-sv-fam-obs-card">
                <div className="ma-sv-fam-obs-icon">
                  <Info size={16} strokeWidth={2.6} />
                </div>
                <div>
                  <strong className="ma-sv-fam-obs-title">
                    Volunteer On-Site Assessment & Recommendation
                  </strong>
                  <p className="ma-sv-fam-obs-text">
                    Conducted on-site home inspection and personal interview with candidate Priya S and her
                    parents (R. Kumar and S. Lakshmi) at their residence in Pollachi, Coimbatore. The family
                    resides in a single-room rented semi-pucca home under severe economic constraint. The father
                    is an agricultural daily wage worker with erratic seasonal income, and mother is a homemaker.
                    The family owns no agricultural land or two-wheelers. The candidate is remarkably hardworking
                    and academically brilliant (91.67% in 12th), and both parents wholeheartedly support her
                    educational ambition to become an engineer.
                    <br />
                    <strong style={{ color: "#15803D", marginTop: 4, display: "inline-block" }}>
                      ✔ Strongly recommended for 100% Maatram Higher Education Scholarship.
                    </strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: ADDRESS (Exact Match to User Reference Image 1 with Google Maps Icon) */}
        {activeTab === "address" && (
          <div className="ma-sv-tab-pane">
            {/* Card 1: Current Address */}
            <div className="ma-sv-addr-card">
              <div className="ma-sv-addr-head">
                <div className="ma-sv-addr-title-group">
                  <div className="ma-sv-addr-icon-circle">
                    <Home size={18} strokeWidth={2.4} />
                  </div>
                  <h4 className="ma-sv-addr-title">Current Address</h4>
                </div>
                <span className="ma-sv-addr-same-badge">
                  <CheckCircle2 size={12} strokeWidth={2.6} />
                  <span>Same as Permanent</span>
                </span>
              </div>

              <div className="ma-sv-addr-text-wrap">
                <MapPin size={16} className="ma-sv-addr-pin" strokeWidth={2.2} />
                <p className="ma-sv-addr-text">
                  No. 12, South Street,<br />
                  Near Government School,<br />
                  Coimbatore - 641001,<br />
                  Tamil Nadu.
                </p>
              </div>

              <div className="ma-sv-addr-btn-wrap">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    candidate.address || "No. 12, South Street, Near Government School, Coimbatore - 641001, Tamil Nadu"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="ma-sv-addr-btn"
                >
                  <Map size={16} strokeWidth={2.2} />
                  <span>Open in Maps</span>
                  <GoogleMapsPinIcon size={18} />
                  <ChevronRight size={15} strokeWidth={2.5} />
                </a>
              </div>
            </div>

            {/* Card 2: Permanent Address */}
            <div className="ma-sv-addr-card">
              <div className="ma-sv-addr-head">
                <div className="ma-sv-addr-title-group">
                  <div className="ma-sv-addr-icon-circle">
                    <Building2 size={18} strokeWidth={2.4} />
                  </div>
                  <h4 className="ma-sv-addr-title">Permanent Address</h4>
                </div>
              </div>

              <div className="ma-sv-addr-text-wrap">
                <MapPin size={16} className="ma-sv-addr-pin" strokeWidth={2.2} />
                <p className="ma-sv-addr-text">
                  No. 12, South Street,<br />
                  Near Government School,<br />
                  Coimbatore - 641001,<br />
                  Tamil Nadu.
                </p>
              </div>

              <div className="ma-sv-addr-btn-wrap">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                    candidate.address || "No. 12, South Street, Near Government School, Coimbatore - 641001, Tamil Nadu"
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="ma-sv-addr-btn"
                >
                  <Map size={16} strokeWidth={2.2} />
                  <span>Open in Maps</span>
                  <GoogleMapsPinIcon size={18} />
                  <ChevronRight size={15} strokeWidth={2.5} />
                </a>
              </div>
            </div>

            {/* Card 3: Address Comparison */}
            <div className="ma-sv-addr-compare-card">
              <div className="ma-sv-addr-compare-icon">
                <Scale size={20} strokeWidth={2.2} />
              </div>
              <div className="ma-sv-addr-compare-body">
                <strong className="ma-sv-addr-compare-title">Address Comparison</strong>
                <span className="ma-sv-addr-compare-desc">
                  Both current and permanent addresses are the <strong>same</strong>.
                </span>
              </div>
              <CheckCircle2 size={18} className="ma-sv-addr-compare-check" strokeWidth={2.6} />
            </div>

            {/* Card 4: Quick Actions */}
            <a
              href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
                candidate.address || "No. 12, South Street, Near Government School, Coimbatore - 641001, Tamil Nadu"
              )}`}
              target="_blank"
              rel="noreferrer"
              className="ma-sv-addr-quick-card"
            >
              <div className="ma-sv-addr-quick-icon">
                <Zap size={18} strokeWidth={2.4} fill="#F59E0B" color="#F59E0B" />
              </div>
              <div className="ma-sv-addr-quick-body">
                <strong className="ma-sv-addr-quick-title">Quick Actions</strong>
                <span className="ma-sv-addr-quick-desc">View location or get directions</span>
              </div>
              <ChevronRight size={18} color="#6B7280" strokeWidth={2.4} />
            </a>
          </div>
        )}

        {/* Tab 5: EDUCATION (Clicking 10th, 11th, or 12th opens Comprehensive Academic Details Page) */}
        {activeTab === "education" && (
          <div className="ma-sv-tab-pane">
            {selectedGradeDetail !== null ? (
              // Grade Details View (Matches Attached Screenshot media_1795272742437_1b6b1ef7.jpg Exactly)
              (() => {
                const gradeInfo = gradeDataMap[selectedGradeDetail];
                return (
                  <div className="ma-sv-grade-detail-page">
                    {/* Top Navigation Row: Back button and Grade Switcher Pills */}
                    <div className="ma-sv-grade-nav-row">
                      <button
                        type="button"
                        className="ma-sv-grade-back-btn"
                        onClick={() => handleGradeSelect(null)}
                      >
                        <ArrowLeft size={14} />
                        <span>Back to Education List</span>
                      </button>

                      <div className="ma-sv-grade-switcher">
                        {(["10th", "11th", "12th"] as const).map((gr) => (
                          <button
                            key={gr}
                            type="button"
                            className={`ma-sv-grade-switch-btn ${selectedGradeDetail === gr ? "is-active" : ""}`}
                            onClick={() => handleGradeSelect(gr)}
                          >
                            {gr} Grade
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Candidate Profile Header Card (Matches Reference media_1795272742437_1b6b1ef7.jpg) */}
                    <div className="ma-sv-grade-profile-card">
                      <img
                        src={candidate.photoUrl}
                        alt={candidate.name}
                        className="ma-sv-grade-photo"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/assets/photos/student-portrait.jpg";
                        }}
                      />
                      <div className="ma-sv-grade-meta">
                        <h3 className="ma-sv-grade-name">{candidate.name}</h3>
                        <span className="ma-sv-grade-appid">App ID : {candidate.applicationNo}</span>
                        <div className="ma-sv-grade-loc">
                          <MapPin size={12} className="ma-sv-icon" />
                          <span>{candidate.location}</span>
                        </div>
                      </div>
                      <span className="ma-sv-grade-verified-pill">
                        <CheckCircle2 size={13} strokeWidth={2.6} />
                        <span>Application Verified</span>
                      </span>
                    </div>

                    {/* Card 1: Academic Details */}
                    <div className="ma-sv-grade-card">
                      <div className="ma-sv-grade-card-head">
                        <div className="ma-sv-grade-icon-circle">
                          <Award size={18} strokeWidth={2.4} />
                        </div>
                        <h4 className="ma-sv-grade-card-title">{gradeInfo.title}</h4>
                      </div>

                      <div className="ma-sv-grade-grid">
                        <div className="ma-sv-grade-row">
                          <span className="ma-sv-grade-key">Is studied in Govt. School?</span>
                          <span className="ma-sv-grade-colon">:</span>
                          <span className="ma-sv-grade-val">{gradeInfo.isGovtSchool}</span>
                        </div>
                        <div className="ma-sv-grade-row">
                          <span className="ma-sv-grade-key">Hall Ticket Number</span>
                          <span className="ma-sv-grade-colon">:</span>
                          <span className="ma-sv-grade-val">{gradeInfo.hallTicketNo}</span>
                        </div>
                        <div className="ma-sv-grade-row">
                          <span className="ma-sv-grade-key">Board of Instruction</span>
                          <span className="ma-sv-grade-colon">:</span>
                          <span className="ma-sv-grade-val">{gradeInfo.board}</span>
                        </div>
                        <div className="ma-sv-grade-row">
                          <span className="ma-sv-grade-key">Medium of Instruction</span>
                          <span className="ma-sv-grade-colon">:</span>
                          <span className="ma-sv-grade-val">{gradeInfo.medium}</span>
                        </div>
                        <div className="ma-sv-grade-row">
                          <span className="ma-sv-grade-key">School Type</span>
                          <span className="ma-sv-grade-colon">:</span>
                          <span className="ma-sv-grade-val">{gradeInfo.schoolType}</span>
                        </div>
                        <div className="ma-sv-grade-row">
                          <span className="ma-sv-grade-key">School Name</span>
                          <span className="ma-sv-grade-colon">:</span>
                          <span className="ma-sv-grade-val">{gradeInfo.schoolName}</span>
                        </div>
                        <div className="ma-sv-grade-row">
                          <span className="ma-sv-grade-key">School Address</span>
                          <span className="ma-sv-grade-colon">:</span>
                          <span className="ma-sv-grade-val">{gradeInfo.schoolAddress}</span>
                        </div>
                        <div className="ma-sv-grade-row">
                          <span className="ma-sv-grade-key">Total Marks</span>
                          <span className="ma-sv-grade-colon">:</span>
                          <span className="ma-sv-grade-val">{gradeInfo.totalMarks}</span>
                        </div>
                        <div className="ma-sv-grade-row">
                          <span className="ma-sv-grade-key">Obtained Marks</span>
                          <span className="ma-sv-grade-colon">:</span>
                          <span className="ma-sv-grade-val">{gradeInfo.obtainedMarks}</span>
                        </div>
                        <div className="ma-sv-grade-row">
                          <span className="ma-sv-grade-key">Year of Passing</span>
                          <span className="ma-sv-grade-colon">:</span>
                          <span className="ma-sv-grade-val">{gradeInfo.passingYear}</span>
                        </div>
                      </div>
                    </div>

                    {/* Card 2: Head Master Details */}
                    <div className="ma-sv-grade-card">
                      <div className="ma-sv-grade-card-head">
                        <div className="ma-sv-grade-icon-circle">
                          <User size={18} strokeWidth={2.4} />
                        </div>
                        <h4 className="ma-sv-grade-card-title">Head Master Details</h4>
                      </div>

                      <div className="ma-sv-grade-grid">
                        <div className="ma-sv-grade-row">
                          <span className="ma-sv-grade-key">Head Master Name</span>
                          <span className="ma-sv-grade-colon">:</span>
                          <span className="ma-sv-grade-val">{gradeInfo.headMasterName}</span>
                        </div>
                        <div className="ma-sv-grade-row">
                          <span className="ma-sv-grade-key">Head Master Phone Number</span>
                          <span className="ma-sv-grade-colon">:</span>
                          <span className="ma-sv-grade-val">{gradeInfo.headMasterPhone}</span>
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Split Grid for Subject-wise Marks & Cut-off & Group Details */}
                    <div className="ma-sv-grade-split-grid">
                      {/* Left: Subject-wise Marks */}
                      <div className="ma-sv-grade-card" style={{ marginBottom: 0 }}>
                        <div className="ma-sv-grade-card-head">
                          <div className="ma-sv-grade-icon-circle">
                            <BarChart3 size={18} strokeWidth={2.4} />
                          </div>
                          <h4 className="ma-sv-grade-card-title">
                            {gradeInfo.grade} Subject-wise Marks ({gradeInfo.subjects.length} Subjects)
                          </h4>
                        </div>

                        <div className="ma-sv-grade-table-wrap">
                          <table className="ma-sv-grade-sub-table">
                            <thead>
                              <tr>
                                <th>Subject</th>
                                <th>Marks (Obtained / Total)</th>
                              </tr>
                            </thead>
                            <tbody>
                              {gradeInfo.subjects.map((sub, idx) => (
                                <tr key={idx}>
                                  <td>{sub.name}</td>
                                  <td>
                                    {sub.obtained} / {sub.total}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>

                      {/* Right: Cut-off & Group Details */}
                      <div className="ma-sv-grade-card" style={{ marginBottom: 0 }}>
                        <div className="ma-sv-grade-card-head">
                          <div className="ma-sv-grade-icon-circle">
                            <Trophy size={18} strokeWidth={2.4} />
                          </div>
                          <h4 className="ma-sv-grade-card-title">Cut-off & Group Details</h4>
                        </div>

                        <div className="ma-sv-grade-grid">
                          <div className="ma-sv-grade-row">
                            <span className="ma-sv-grade-key">{gradeInfo.grade} Cut-off Mark</span>
                            <span className="ma-sv-grade-colon">:</span>
                            <span className="ma-sv-grade-val">{gradeInfo.cutoffMark}</span>
                          </div>
                          <div className="ma-sv-grade-row">
                            <span className="ma-sv-grade-key">{gradeInfo.grade} Percentage</span>
                            <span className="ma-sv-grade-colon">:</span>
                            <span className="ma-sv-grade-val">{gradeInfo.percentage}</span>
                          </div>
                          <div className="ma-sv-grade-row">
                            <span className="ma-sv-grade-key">HSC Group Name</span>
                            <span className="ma-sv-grade-colon">:</span>
                            <span className="ma-sv-grade-val">{gradeInfo.groupName}</span>
                          </div>
                          <div className="ma-sv-grade-row" style={{ alignItems: "center" }}>
                            <span className="ma-sv-grade-key">Applied Foundations</span>
                            <span className="ma-sv-grade-colon">:</span>
                            <div className="ma-sv-grade-foundations">
                              {gradeInfo.appliedFoundations.includes("Agaram") && (
                                <span className="ma-sv-pill-agaram">Agaram</span>
                              )}
                              {gradeInfo.appliedFoundations.includes("Anbu") && (
                                <span className="ma-sv-pill-anbu">Anbu</span>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Card 4: Marksheet Document */}
                    <div className="ma-sv-grade-doc-card">
                      <div className="ma-sv-edu-doc-info">
                        <FileText size={22} className="ma-sv-edu-doc-icon" strokeWidth={2.2} />
                        <div>
                          <span className="ma-sv-edu-doc-title">{gradeInfo.grade} Marksheet Document</span>
                          <span className="ma-sv-edu-doc-sub">View uploaded document</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        className="ma-sv-edu-view-btn"
                        onClick={() =>
                          setMarksheetModal({
                            open: true,
                            grade: gradeInfo.grade,
                            title: `${gradeInfo.grade} Standard Official Marksheet`,
                            board:
                              gradeInfo.board === "State Board"
                                ? "Tamil Nadu Board of Secondary & Higher Secondary Education"
                                : gradeInfo.board,
                            roll: gradeInfo.hallTicketNo,
                            year: gradeInfo.passingYear,
                            percentage: gradeInfo.percentage,
                            schoolName: gradeInfo.schoolName,
                            schoolAddress: gradeInfo.schoolAddress,
                            totalMarks: gradeInfo.totalMarks,
                            obtainedMarks: gradeInfo.obtainedMarks,
                            cutoffMark: gradeInfo.cutoffMark,
                            groupName: gradeInfo.groupName,
                            medium: gradeInfo.medium,
                            subjects: gradeInfo.subjects,
                          })
                        }
                      >
                        <Eye size={14} strokeWidth={2.4} />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                );
              })()
            ) : (
              // Overview of all 3 grades (10th, 11th, 12th) - Clickable to open full page
              <>
                {/* Card 1: 10th Details */}
                <div
                  className="ma-sv-edu-card ma-sv-edu-card-clickable"
                  onClick={() => handleGradeSelect("10th")}
                  title="Click to view 10th detailed academic record"
                >
                  <div className="ma-sv-edu-head">
                    <div className="ma-sv-edu-icon-circle">
                      <Award size={20} strokeWidth={2.4} />
                    </div>
                    <h4 className="ma-sv-edu-title">10th Details</h4>
                    <span className="ma-sv-edu-open-indicator">
                      <span>View Details</span>
                      <ChevronRight size={14} />
                    </span>
                  </div>

                  <div className="ma-sv-edu-grid">
                    <div className="ma-sv-edu-row">
                      <span className="ma-sv-edu-key">Board / State</span>
                      <span className="ma-sv-edu-colon">:</span>
                      <span className="ma-sv-edu-val">State Board</span>
                      <span className="ma-sv-edu-verified">
                        <CheckCircle2 size={12} strokeWidth={2.6} />
                        <span>Verified</span>
                      </span>
                    </div>

                    <div className="ma-sv-edu-row">
                      <span className="ma-sv-edu-key">Roll Number</span>
                      <span className="ma-sv-edu-colon">:</span>
                      <span className="ma-sv-edu-val">123456</span>
                    </div>

                    <div className="ma-sv-edu-row">
                      <span className="ma-sv-edu-key">Year of Passing</span>
                      <span className="ma-sv-edu-colon">:</span>
                      <span className="ma-sv-edu-val">2023</span>
                    </div>

                    <div className="ma-sv-edu-row">
                      <span className="ma-sv-edu-key">Percentage</span>
                      <span className="ma-sv-edu-colon">:</span>
                      <span className="ma-sv-edu-val">92%</span>
                    </div>
                  </div>

                  <div
                    className="ma-sv-edu-doc-row"
                    onClick={(e) => {
                      // Prevent parent card click if user clicks specific actions
                      e.stopPropagation();
                    }}
                  >
                    <div className="ma-sv-edu-doc-info">
                      <FileText size={22} className="ma-sv-edu-doc-icon" strokeWidth={2.2} />
                      <div>
                        <span className="ma-sv-edu-doc-title">Marksheet Document</span>
                        <span className="ma-sv-edu-doc-sub">View uploaded document</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <button
                        type="button"
                        className="ma-sv-edu-view-btn"
                        onClick={() => {
                          const g10 = gradeDataMap["10th"];
                          setMarksheetModal({
                            open: true,
                            grade: "10th",
                            title: "10th Standard Official Marksheet",
                            board: "Tamil Nadu Board of Secondary Education",
                            roll: g10.hallTicketNo,
                            year: g10.passingYear,
                            percentage: g10.percentage,
                            schoolName: g10.schoolName,
                            schoolAddress: g10.schoolAddress,
                            totalMarks: g10.totalMarks,
                            obtainedMarks: g10.obtainedMarks,
                            cutoffMark: g10.cutoffMark,
                            groupName: g10.groupName,
                            medium: g10.medium,
                            subjects: g10.subjects,
                          });
                        }}
                      >
                        <Eye size={14} strokeWidth={2.4} />
                        <span>View</span>
                      </button>

                      <button
                        type="button"
                        className="ma-sv-edu-view-btn"
                        style={{ background: "#FEF08A", borderColor: "#F59E0B" }}
                        onClick={() => handleGradeSelect("10th")}
                      >
                        <span>Full Details</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 2: 11th Details */}
                <div
                  className="ma-sv-edu-card ma-sv-edu-card-clickable"
                  onClick={() => handleGradeSelect("11th")}
                  title="Click to view 11th detailed academic record"
                >
                  <div className="ma-sv-edu-head">
                    <div className="ma-sv-edu-icon-circle">
                      <Award size={20} strokeWidth={2.4} />
                    </div>
                    <h4 className="ma-sv-edu-title">11th Details</h4>
                    <span className="ma-sv-edu-open-indicator">
                      <span>View Details</span>
                      <ChevronRight size={14} />
                    </span>
                  </div>

                  <div className="ma-sv-edu-grid">
                    <div className="ma-sv-edu-row">
                      <span className="ma-sv-edu-key">Board / State</span>
                      <span className="ma-sv-edu-colon">:</span>
                      <span className="ma-sv-edu-val">State Board</span>
                      <span className="ma-sv-edu-verified">
                        <CheckCircle2 size={12} strokeWidth={2.6} />
                        <span>Verified</span>
                      </span>
                    </div>

                    <div className="ma-sv-edu-row">
                      <span className="ma-sv-edu-key">Roll Number</span>
                      <span className="ma-sv-edu-colon">:</span>
                      <span className="ma-sv-edu-val">789101</span>
                    </div>

                    <div className="ma-sv-edu-row">
                      <span className="ma-sv-edu-key">Year of Passing</span>
                      <span className="ma-sv-edu-colon">:</span>
                      <span className="ma-sv-edu-val">2024</span>
                    </div>

                    <div className="ma-sv-edu-row">
                      <span className="ma-sv-edu-key">Percentage</span>
                      <span className="ma-sv-edu-colon">:</span>
                      <span className="ma-sv-edu-val">94%</span>
                    </div>
                  </div>

                  <div
                    className="ma-sv-edu-doc-row"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className="ma-sv-edu-doc-info">
                      <FileText size={22} className="ma-sv-edu-doc-icon" strokeWidth={2.2} />
                      <div>
                        <span className="ma-sv-edu-doc-title">Marksheet Document</span>
                        <span className="ma-sv-edu-doc-sub">View uploaded document</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <button
                        type="button"
                        className="ma-sv-edu-view-btn"
                        onClick={() => {
                          const g11 = gradeDataMap["11th"];
                          setMarksheetModal({
                            open: true,
                            grade: "11th",
                            title: "11th Standard Official Marksheet",
                            board: "Tamil Nadu Board of Higher Secondary Education",
                            roll: g11.hallTicketNo,
                            year: g11.passingYear,
                            percentage: g11.percentage,
                            schoolName: g11.schoolName,
                            schoolAddress: g11.schoolAddress,
                            totalMarks: g11.totalMarks,
                            obtainedMarks: g11.obtainedMarks,
                            cutoffMark: g11.cutoffMark,
                            groupName: g11.groupName,
                            medium: g11.medium,
                            subjects: g11.subjects,
                          });
                        }}
                      >
                        <Eye size={14} strokeWidth={2.4} />
                        <span>View</span>
                      </button>

                      <button
                        type="button"
                        className="ma-sv-edu-view-btn"
                        style={{ background: "#FEF08A", borderColor: "#F59E0B" }}
                        onClick={() => handleGradeSelect("11th")}
                      >
                        <span>Full Details</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 3: 12th Details */}
                <div
                  className="ma-sv-edu-card ma-sv-edu-card-clickable"
                  onClick={() => handleGradeSelect("12th")}
                  title="Click to view 12th detailed academic record"
                >
                  <div className="ma-sv-edu-head">
                    <div className="ma-sv-edu-icon-circle">
                      <Award size={20} strokeWidth={2.4} />
                    </div>
                    <h4 className="ma-sv-edu-title">12th Details</h4>
                    <span className="ma-sv-edu-open-indicator">
                      <span>View Details</span>
                      <ChevronRight size={14} />
                    </span>
                  </div>

                  <div className="ma-sv-edu-grid">
                    <div className="ma-sv-edu-row">
                      <span className="ma-sv-edu-key">Board / State</span>
                      <span className="ma-sv-edu-colon">:</span>
                      <span className="ma-sv-edu-val">State Board</span>
                      <span className="ma-sv-edu-verified">
                        <CheckCircle2 size={12} strokeWidth={2.6} />
                        <span>Verified</span>
                      </span>
                    </div>

                    <div className="ma-sv-edu-row">
                      <span className="ma-sv-edu-key">Roll Number</span>
                      <span className="ma-sv-edu-colon">:</span>
                      <span className="ma-sv-edu-val">432176</span>
                    </div>

                    <div className="ma-sv-edu-row">
                      <span className="ma-sv-edu-key">Year of Passing</span>
                      <span className="ma-sv-edu-colon">:</span>
                      <span className="ma-sv-edu-val">2026</span>
                    </div>

                    <div className="ma-sv-edu-row">
                      <span className="ma-sv-edu-key">Percentage</span>
                      <span className="ma-sv-edu-colon">:</span>
                      <span className="ma-sv-edu-val">91.67%</span>
                    </div>
                  </div>

                  <div
                    className="ma-sv-edu-doc-row"
                    onClick={(e) => {
                      e.stopPropagation();
                    }}
                  >
                    <div className="ma-sv-edu-doc-info">
                      <FileText size={22} className="ma-sv-edu-doc-icon" strokeWidth={2.2} />
                      <div>
                        <span className="ma-sv-edu-doc-title">Marksheet Document</span>
                        <span className="ma-sv-edu-doc-sub">View uploaded document</span>
                      </div>
                    </div>

                    <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                      <button
                        type="button"
                        className="ma-sv-edu-view-btn"
                        onClick={() => {
                          const g12 = gradeDataMap["12th"];
                          setMarksheetModal({
                            open: true,
                            grade: "12th",
                            title: "12th Standard Official Marksheet",
                            board: "Tamil Nadu Board of Higher Secondary Education",
                            roll: g12.hallTicketNo,
                            year: g12.passingYear,
                            percentage: g12.percentage,
                            schoolName: g12.schoolName,
                            schoolAddress: g12.schoolAddress,
                            totalMarks: g12.totalMarks,
                            obtainedMarks: g12.obtainedMarks,
                            cutoffMark: g12.cutoffMark,
                            groupName: g12.groupName,
                            medium: g12.medium,
                            subjects: g12.subjects,
                          });
                        }}
                      >
                        <Eye size={14} strokeWidth={2.4} />
                        <span>View</span>
                      </button>

                      <button
                        type="button"
                        className="ma-sv-edu-view-btn"
                        style={{ background: "#FEF08A", borderColor: "#F59E0B" }}
                        onClick={() => handleGradeSelect("12th")}
                      >
                        <span>Full Details</span>
                        <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Card 4: Information Note */}
                <div className="ma-sv-edu-info-note">
                  <div className="ma-sv-edu-note-icon">
                    <Info size={16} strokeWidth={2.6} />
                  </div>
                  <div>
                    <span className="ma-sv-edu-note-title">Information Note</span>
                    <p className="ma-sv-edu-note-text">
                      Please cross-check the academic details with the original documents.
                    </p>
                  </div>
                </div>
              </>
            )}
          </div>
        )}

        {/* Tab 6: TELEVERIFICATION DETAILS */}
        {activeTab === "televerification" && (
          <div className="ma-sv-tab-pane">
            <div className="ma-sv-section">
              <div className="ma-sv-sec-head">
                <span className="ma-sv-gold-bar" />
                <h4>Tele-Verification Assessment</h4>
              </div>

              <div className="ma-sv-info-grid-card">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    paddingBottom: 10,
                    borderBottom: "1px solid #F3F4F6",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: "#DCFCE7",
                        display: "grid",
                        placeItems: "center",
                        color: "#15803D",
                      }}
                    >
                      <PhoneCall size={18} />
                    </div>
                    <div>
                      <strong style={{ display: "block", fontSize: 13.5, color: "#111827" }}>
                        Call Assessment Cleared
                      </strong>
                      <span style={{ fontSize: 11, color: "#6B7280" }}>
                        Conducted on 20 Jul 2026 · 11:30 AM
                      </span>
                    </div>
                  </div>
                  <span className="ma-sv-verified-pill">
                    <CheckCircle2 size={12} strokeWidth={2.4} />
                    <span>Verified</span>
                  </span>
                </div>

                <div className="ma-sv-grid-row">
                  <div className="ma-sv-grid-col">
                    <span className="ma-sv-lbl">Tele-Caller Officer</span>
                    <span className="ma-sv-val">Kavitha M (Maatram HQ)</span>
                  </div>
                  <div className="ma-sv-grid-col">
                    <span className="ma-sv-lbl">Call Duration</span>
                    <span className="ma-sv-val">12m 45s (Recorded)</span>
                  </div>
                </div>

                <div className="ma-sv-grid-row">
                  <div className="ma-sv-grid-col">
                    <span className="ma-sv-lbl">Parental Consent</span>
                    <span className="ma-sv-val">Mother & Father Confirmed</span>
                  </div>
                  <div className="ma-sv-grid-col">
                    <span className="ma-sv-lbl">Marks Authentication</span>
                    <span className="ma-sv-val">Matches 12th Board Score</span>
                  </div>
                </div>

                <div style={{ background: "#F8FAFC", borderRadius: 12, padding: 12, border: "1px solid #E2E8F0" }}>
                  <span className="ma-sv-lbl" style={{ display: "block", marginBottom: 4 }}>
                    Tele-Desk Official Remarks:
                  </span>
                  <p style={{ margin: 0, fontSize: 12.5, color: "#334155", lineHeight: 1.45, fontStyle: "italic" }}>
                    "Candidate is extremely disciplined, polite, and motivated. Highly genuine case of financial hardship. Recommended with highest priority for the on-site physical residence audit."
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Generous bottom spacer so all tab contents can be scrolled completely clear of the fixed bottom footer */}
        <div className="ma-sv-bottom-spacer" aria-hidden="true" />
      </div>
    </>
  )}

  {/* 7. Fixed Bottom Action Buttons Bar (← Back & Proceed to Physical Verification →) */}
  <div className="ma-sv-bottom-bar">
    {showPhysicalForm ? (
      <>
        <button
          type="button"
          className="ma-sv-btn-back"
          onClick={() => {
            setShowPhysicalForm(false);
            if (typeof window !== "undefined") {
              const sc = document.querySelector(".ma-chat-scrollable-content");
              if (sc) sc.scrollTop = 0;
              window.scrollTo(0, 0);
            }
          }}
        >
          <ArrowLeft size={16} />
          <span>Previous (Tele Verification)</span>
        </button>

        <button
          type="button"
          className="ma-sv-btn-proceed"
          onClick={handlePhysicalFormSubmit}
        >
          <span>Review & Submit</span>
          <ArrowRight size={16} />
        </button>
      </>
    ) : (
      <>
        <button type="button" className="ma-sv-btn-back" onClick={onBack}>
          <ArrowLeft size={16} />
          <span>Back</span>
        </button>

        <button
          type="button"
          className="ma-sv-btn-proceed"
          onClick={() => {
            setShowPhysicalForm(true);
            if (typeof window !== "undefined") {
              const sc = document.querySelector(".ma-chat-scrollable-content");
              if (sc) sc.scrollTop = 0;
              window.scrollTo(0, 0);
            }
          }}
        >
          <span>Proceed to Physical Verification</span>
          <ArrowRight size={16} />
        </button>
      </>
    )}
  </div>

      {/* =======================================================================
          8. MODAL: AADHAAR CARD DOCUMENT PREVIEW
          ======================================================================= */}
      {aadhaarModalOpen && (
        <div className="ma-assigned-modal-backdrop" onClick={() => setAadhaarModalOpen(false)}>
          <div
            className="ma-assigned-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="aadhaar-modal-title"
          >
            <div className="ma-assigned-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 34,
                    height: 34,
                    borderRadius: 10,
                    background: "#EFF6FF",
                    display: "grid",
                    placeItems: "center",
                    color: "#1D4ED8",
                  }}
                >
                  <ImageIcon size={18} />
                </div>
                <div>
                  <h3 id="aadhaar-modal-title" style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>
                    Aadhaar Card Document
                  </h3>
                  <small style={{ color: "#6B7280" }}>{candidate.name} · Verified Government ID</small>
                </div>
              </div>
              <button
                type="button"
                className="ma-modal-close-btn"
                onClick={() => setAadhaarModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="ma-assigned-modal-body" style={{ textAlign: "center", padding: "16px" }}>
              <div
                style={{
                  background: "#F1F5F9",
                  borderRadius: 16,
                  padding: "16px",
                  border: "1.5px dashed #CBD5E1",
                  display: "inline-block",
                  maxWidth: "100%",
                }}
              >
                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 12,
                    padding: "16px",
                    boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
                    maxWidth: 360,
                    margin: "0 auto",
                    textAlign: "left",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      borderBottom: "2px solid #DC2626",
                      paddingBottom: 8,
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: 13, color: "#1E293B", display: "block" }}>
                        Government of India
                      </strong>
                      <span style={{ fontSize: 10, color: "#64748B" }}>
                        Unique Identification Authority
                      </span>
                    </div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#DC2626" }}>आधार</span>
                  </div>

                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <img
                      src={candidate.photoUrl}
                      alt={candidate.name}
                      style={{
                        width: 64,
                        height: 78,
                        objectFit: "cover",
                        borderRadius: 8,
                        border: "1px solid #CBD5E1",
                      }}
                    />
                    <div style={{ fontSize: 12, display: "flex", flexDirection: "column", gap: 3 }}>
                      <strong style={{ fontSize: 14, color: "#0F172A" }}>{candidate.name}</strong>
                      <span style={{ color: "#475569" }}>DOB: 30/03/2009</span>
                      <span style={{ color: "#475569" }}>Gender: {candidate.gender}</span>
                    </div>
                  </div>

                  <div
                    style={{
                      textAlign: "center",
                      marginTop: 14,
                      borderTop: "1px solid #E2E8F0",
                      paddingTop: 8,
                    }}
                  >
                    <span
                      style={{
                        fontSize: 15,
                        fontWeight: 800,
                        letterSpacing: 2,
                        color: "#0F172A",
                        fontFamily: "monospace",
                      }}
                    >
                      XXXX XXXX 8921
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ma-assigned-modal-foot">
              <button
                type="button"
                className="ma-modal-btn-cancel"
                onClick={() => setAadhaarModalOpen(false)}
                style={{ width: "100%" }}
              >
                Close Document Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          9. MODAL: PHYSICAL VERIFICATION AUDIT & GEOTAG PHOTO CHECKLIST
          ======================================================================= */}
      {auditModalOpen && (
        <div className="ma-assigned-modal-backdrop" onClick={() => setAuditModalOpen(false)}>
          <div
            className="ma-assigned-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="audit-modal-title"
          >
            <div className="ma-assigned-modal-head">
              <div>
                <h3 id="audit-modal-title">Physical Verification Audit</h3>
                <small>Candidate: {candidate.name} ({candidate.applicationNo})</small>
              </div>
              <button
                type="button"
                className="ma-modal-close-btn"
                onClick={() => setAuditModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="ma-assigned-modal-body">
              <p className="ma-audit-lead">
                Ensure all on-site inspection checkpoints are authenticated with original documentation before submitting.
              </p>

              <div className="ma-audit-checklist">
                <label className="ma-audit-check-item">
                  <input
                    type="checkbox"
                    checked={checkResidence}
                    onChange={(e) => setCheckResidence(e.target.checked)}
                  />
                  <div>
                    <strong>Candidate Residence Physically Visited</strong>
                    <span>Inspected family home at {candidate.location}.</span>
                  </div>
                </label>

                <label className="ma-audit-check-item">
                  <input
                    type="checkbox"
                    checked={checkMarksheets}
                    onChange={(e) => setCheckMarksheets(e.target.checked)}
                  />
                  <div>
                    <strong>Original 10th & 12th Marksheets Inspected</strong>
                    <span>Verified board score of {candidate.twelfthScore} ({candidate.percentage}).</span>
                  </div>
                </label>

                <label className="ma-audit-check-item">
                  <input
                    type="checkbox"
                    checked={checkIncome}
                    onChange={(e) => setCheckIncome(e.target.checked)}
                  />
                  <div>
                    <strong>Income & Ration Card Authenticated</strong>
                    <span>Tahshildar income certificate: {candidate.annualIncome}.</span>
                  </div>
                </label>

                <label className="ma-audit-check-item">
                  <input
                    type="checkbox"
                    checked={checkAadhaar}
                    onChange={(e) => setCheckAadhaar(e.target.checked)}
                  />
                  <div>
                    <strong>Candidate & Parent Aadhaar Validated</strong>
                    <span>Government identity verified against original cards.</span>
                  </div>
                </label>

                <label className="ma-audit-check-item">
                  <input
                    type="checkbox"
                    checked={checkHouseCondition}
                    onChange={(e) => setCheckHouseCondition(e.target.checked)}
                  />
                  <div>
                    <strong>Living Condition & Financial Need Verified</strong>
                    <span>Single room / mud tile house with authentic financial distress.</span>
                  </div>
                </label>
              </div>

              {/* Geo-tag Photo Section */}
              <div className="ma-audit-photo-section">
                <div className="ma-audit-photo-head">
                  <Camera size={16} />
                  <strong>On-Site Residence Photo (GPS Watermarked)</strong>
                </div>

                {proofPhoto ? (
                  <div className="ma-audit-photo-preview-wrap">
                    <img src={proofPhoto} alt="Audit verification proof" className="ma-audit-photo-preview" />
                    <button
                      type="button"
                      className="ma-audit-retake-btn"
                      onClick={() => setCameraModalOpen(true)}
                    >
                      <Camera size={14} />
                      <span>Retake Photo</span>
                    </button>
                  </div>
                ) : (
                  <div className="ma-audit-photo-empty">
                    <p>Open the real device camera to capture the live GPS-watermarked geotag photo.</p>
                    <button
                      type="button"
                      className="ma-audit-open-cam-btn"
                      onClick={() => setCameraModalOpen(true)}
                    >
                      <Camera size={16} />
                      <span>Open Geo-Tag Camera</span>
                    </button>
                  </div>
                )}
              </div>

              {/* Volunteer Observations */}
              <div className="ma-audit-notes-wrap">
                <label htmlFor="audit-notes">Volunteer Assessment & Notes</label>
                <textarea
                  id="audit-notes"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Enter details about family hardship, academic drive, house condition..."
                  rows={3}
                />
              </div>
            </div>

            <div className="ma-assigned-modal-foot">
              <button
                type="button"
                className="ma-modal-btn-cancel"
                onClick={() => setAuditModalOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="ma-modal-btn-submit"
                onClick={handleAuditSubmit}
              >
                <CheckCircle2 size={16} />
                <span>Submit Physical Verification</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          10. MODAL: FULL APPLICATION DOSSIER
          ======================================================================= */}
      {fullAppModalOpen && (
        <div className="ma-assigned-modal-backdrop" onClick={() => setFullAppModalOpen(false)}>
          <div
            className="ma-assigned-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="app-modal-title"
          >
            <div className="ma-assigned-modal-head">
              <div>
                <h3 id="app-modal-title">Student Full Application Dossier</h3>
                <small>{candidate.name} · {candidate.applicationNo}</small>
              </div>
              <button
                type="button"
                className="ma-modal-close-btn"
                onClick={() => setFullAppModalOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="ma-assigned-modal-body">
              <div className="ma-verify-report-grid">
                <div className="ma-report-col">
                  <span className="ma-r-lbl">12th Score</span>
                  <span className="ma-r-val">
                    {candidate.twelfthScore} ({candidate.percentage})
                  </span>
                </div>
                <div className="ma-report-col">
                  <span className="ma-r-lbl">First Graduate</span>
                  <span className="ma-r-val">{candidate.firstGraduate ? "Yes" : "No"}</span>
                </div>
                <div className="ma-report-col">
                  <span className="ma-r-lbl">Annual Family Income</span>
                  <span className="ma-r-val">{candidate.annualIncome}</span>
                </div>
                <div className="ma-report-col">
                  <span className="ma-r-lbl">Ration Card Type</span>
                  <span className="ma-r-val">{candidate.rationCardType}</span>
                </div>
              </div>

              <div className="ma-verify-section">
                <h4>Aspirations & Goals</h4>
                <p className="ma-report-p">
                  Candidate aims to pursue <strong>{candidate.desiredCourse}</strong>. Highly motivated first-generation learner with exemplary discipline and school recommendation.
                </p>
              </div>

              <div className="ma-verify-section">
                <h4>Parent Details</h4>
                <p className="ma-report-p">
                  Parent: <strong>{candidate.parentName}</strong> ({candidate.parentOccupation}).
                  Contact: {candidate.parentPhone}.
                </p>
              </div>
            </div>

            <div className="ma-assigned-modal-foot">
              <button
                type="button"
                className="ma-modal-btn-cancel"
                onClick={() => setFullAppModalOpen(false)}
              >
                Close Application
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          11. MARKSHEET DOCUMENT PREVIEW MODAL
          ======================================================================= */}
      {marksheetModal?.open && (
        <div className="ma-assigned-modal-backdrop" onClick={() => setMarksheetModal(null)}>
          <div
            className="ma-assigned-modal ma-marksheet-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="marksheet-modal-title"
          >
            <div className="ma-assigned-modal-head">
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 36,
                    height: 36,
                    borderRadius: 10,
                    background: "#FEF08A",
                    display: "grid",
                    placeItems: "center",
                    color: "#854D0E",
                  }}
                >
                  <Award size={20} strokeWidth={2.4} />
                </div>
                <div>
                  <h3 id="marksheet-modal-title" style={{ margin: 0, fontSize: 15, fontWeight: 800 }}>
                    {marksheetModal.title}
                  </h3>
                  <small style={{ color: "#64748B" }}>
                    {candidate.name} · Roll No: <strong>{marksheetModal.roll}</strong> · Passing Year: {marksheetModal.year}
                  </small>
                </div>
              </div>
              <button
                type="button"
                className="ma-modal-close-btn"
                onClick={() => setMarksheetModal(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="ma-assigned-modal-body" style={{ padding: "14px 16px", background: "#F1F5F9" }}>
              {/* Document Certificate Frame */}
              <div className="ma-marksheet-paper">
                {/* Certificate Inner Double Border */}
                <div className="ma-marksheet-inner-border">
                  {/* Watermark Emblem */}
                  <div className="ma-marksheet-watermark" aria-hidden="true">
                    TN DGE
                  </div>

                  {/* Header Bar with Tamil Nadu State Seal & Titles */}
                  <div className="ma-marksheet-top-banner">
                    <div className="ma-marksheet-crest">
                      {/* Government of Tamil Nadu Insignia / Gopuram Emblem */}
                      <svg viewBox="0 0 100 100" width="46" height="46" aria-label="Government of Tamil Nadu Seal">
                        <circle cx="50" cy="50" r="47" fill="#FEFDF5" stroke="#1E3A8A" strokeWidth="3" />
                        <circle cx="50" cy="50" r="42" fill="none" stroke="#CA8A04" strokeWidth="1.5" strokeDasharray="3 2" />
                        {/* Gopuram / Temple Tower Silhouette */}
                        <path
                          d="M50 14 L55 22 L53 22 L57 32 L54 32 L60 48 L40 48 L46 32 L43 32 L47 22 L45 22 Z"
                          fill="#1E3A8A"
                        />
                        <rect x="42" y="48" width="16" height="24" fill="#1E3A8A" />
                        <rect x="47" y="56" width="6" height="16" fill="#FEFDF5" />
                        {/* Ashoka Chakra Base Arch */}
                        <path d="M30 76 Q50 68 70 76" stroke="#CA8A04" strokeWidth="3" fill="none" />
                        <circle cx="50" cy="74" r="5" fill="#1E3A8A" />
                        {/* Decorative Tamil text circle imitation */}
                        <path d="M22 50 A28 28 0 0 1 78 50" stroke="#1E3A8A" strokeWidth="1" fill="none" />
                      </svg>
                    </div>

                    <div className="ma-marksheet-header-titles">
                      <span className="ma-marksheet-tn-title-tamil">தமிழ்நாடு அரசு · அரசுத் தேர்வுகள் இயக்ககம்</span>
                      <h4 className="ma-marksheet-tn-title-en">GOVERNMENT OF TAMIL NADU</h4>
                      <p className="ma-marksheet-tn-dept">DEPARTMENT OF GOVERNMENT EXAMINATIONS, CHENNAI - 600 006</p>
                      <div className="ma-marksheet-cert-heading">
                        {marksheetModal.grade === "10th" && (
                          <>
                            <span className="ma-marksheet-cert-tamil">இடைநிலைக் கல்வி இறுதி வகுப்புச் சான்றிதழ்</span>
                            <strong className="ma-marksheet-cert-name">
                              SECONDARY SCHOOL LEAVING CERTIFICATE (SSLC) - X STANDARD
                            </strong>
                          </>
                        )}
                        {marksheetModal.grade === "11th" && (
                          <>
                            <span className="ma-marksheet-cert-tamil">மேல்நிலைப் முதலாம் ஆண்டுத் தேர்வு</span>
                            <strong className="ma-marksheet-cert-name">
                              HIGHER SECONDARY FIRST YEAR (+1) EXAMINATION - XI STANDARD
                            </strong>
                          </>
                        )}
                        {marksheetModal.grade === "12th" && (
                          <>
                            <span className="ma-marksheet-cert-tamil">மேல்நிலைப் பள்ளி இரண்டாம் ஆண்டுத் தேர்வு</span>
                            <strong className="ma-marksheet-cert-name">
                              HIGHER SECONDARY SECOND YEAR (+2 HSC) EXAMINATION - XII STANDARD
                            </strong>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Serial & Session Strip */}
                  <div className="ma-marksheet-meta-strip">
                    <div>
                      <span>CERTIFICATE NO:</span>{" "}
                      <strong>
                        TN/{marksheetModal.grade === "10th" ? "SSLC" : marksheetModal.grade === "11th" ? "HSC1" : "HSC2"}/
                        {marksheetModal.year}/{marksheetModal.roll}
                      </strong>
                    </div>
                    <div>
                      <span>SESSION:</span> <strong>MARCH {marksheetModal.year}</strong>
                    </div>
                  </div>

                  {/* Candidate Bio & School Box */}
                  <div className="ma-marksheet-candidate-box">
                    <div className="ma-marksheet-photo-wrap">
                      <img
                        src={candidate.photoUrl}
                        alt={candidate.name}
                        className="ma-marksheet-candidate-photo"
                      />
                      <span className="ma-marksheet-photo-seal">VERIFIED</span>
                    </div>

                    <div className="ma-marksheet-candidate-fields">
                      <div className="ma-marksheet-field-row">
                        <div className="ma-marksheet-f-item">
                          <span className="ma-marksheet-f-label">Candidate Name:</span>
                          <strong className="ma-marksheet-f-val" style={{ fontSize: 13.5, color: "#0F172A" }}>
                            {candidate.name.toUpperCase()}
                          </strong>
                        </div>
                        <div className="ma-marksheet-f-item">
                          <span className="ma-marksheet-f-label">Roll / Reg No:</span>
                          <strong className="ma-marksheet-f-val" style={{ fontFamily: "monospace", letterSpacing: 0.8 }}>
                            {marksheetModal.roll}
                          </strong>
                        </div>
                      </div>

                      <div className="ma-marksheet-field-row">
                        <div className="ma-marksheet-f-item">
                          <span className="ma-marksheet-f-label">Date of Birth:</span>
                          <strong className="ma-marksheet-f-val">30-03-2009</strong>
                        </div>
                        <div className="ma-marksheet-f-item">
                          <span className="ma-marksheet-f-label">Medium of Instruction:</span>
                          <strong className="ma-marksheet-f-val">{marksheetModal.medium || "Tamil"}</strong>
                        </div>
                      </div>

                      <div className="ma-marksheet-field-row">
                        <div className="ma-marksheet-f-item" style={{ gridColumn: "span 2" }}>
                          <span className="ma-marksheet-f-label">School:</span>
                          <strong className="ma-marksheet-f-val">{marksheetModal.schoolName}</strong>
                        </div>
                      </div>

                      <div className="ma-marksheet-field-row">
                        <div className="ma-marksheet-f-item" style={{ gridColumn: "span 2" }}>
                          <span className="ma-marksheet-f-label">Stream / Course:</span>
                          <strong className="ma-marksheet-f-val">
                            {marksheetModal.groupName ||
                              (marksheetModal.grade === "10th" ? "General SSLC Academic Stream" : "Commerce Stream")}
                          </strong>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Mark Sheet Table */}
                  <div className="ma-marksheet-table-wrap">
                    <table className="ma-marksheet-table">
                      <thead>
                        <tr>
                          <th style={{ width: "38%" }}>Subject</th>
                          <th style={{ width: "14%", textAlign: "center" }}>Max Marks</th>
                          <th style={{ width: "16%", textAlign: "center" }}>Marks Obtained</th>
                          <th style={{ width: "22%" }}>In Words</th>
                          <th style={{ width: "10%", textAlign: "center" }}>Result</th>
                        </tr>
                      </thead>
                      <tbody>
                        {marksheetModal.subjects.map((sub, idx) => (
                          <tr key={idx}>
                            <td className="ma-marksheet-sub-name">
                              <span className="ma-marksheet-sub-code">{`00${idx + 1}`}</span>
                              <span>{sub.name.toUpperCase()}</span>
                            </td>
                            <td style={{ textAlign: "center", fontWeight: 600 }}>{sub.total}</td>
                            <td style={{ textAlign: "center", fontWeight: 800, color: "#0F172A" }}>
                              {String(sub.obtained).padStart(3, "0")}
                            </td>
                            <td className="ma-marksheet-in-words">{numberToEnglishWords(sub.obtained)}</td>
                            <td style={{ textAlign: "center" }}>
                              <span className="ma-marksheet-pass-tag">PASS</span>
                            </td>
                          </tr>
                        ))}

                        {/* Grand Total Row */}
                        <tr className="ma-marksheet-total-tr">
                          <td style={{ fontWeight: 800 }}>GRAND TOTAL</td>
                          <td style={{ textAlign: "center", fontWeight: 800 }}>{marksheetModal.totalMarks}</td>
                          <td style={{ textAlign: "center", fontWeight: 900, color: "#1E3A8A", fontSize: 13 }}>
                            {marksheetModal.obtainedMarks}
                          </td>
                          <td className="ma-marksheet-in-words" style={{ fontWeight: 800 }}>
                            {numberToEnglishWords(marksheetModal.obtainedMarks)}
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <span className="ma-marksheet-pass-tag ma-pass-grand">PASS</span>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  {/* Aggregate & Cutoff Result Strip */}
                  <div className="ma-marksheet-result-banner">
                    <div className="ma-marksheet-r-pill">
                      <span>Percentage:</span>
                      <strong>{marksheetModal.percentage}</strong>
                    </div>
                    {marksheetModal.cutoffMark && (
                      <div className="ma-marksheet-r-pill ma-cutoff-pill">
                        <span>Cut-off Score:</span>
                        <strong>{marksheetModal.cutoffMark} / 100</strong>
                      </div>
                    )}
                    <div className="ma-marksheet-r-pill ma-status-pill">
                      <CheckCircle2 size={13} strokeWidth={2.8} />
                      <span>FIRST CLASS WITH DISTINCTION</span>
                    </div>
                  </div>

                  {/* Security Features & Signatures Footer */}
                  <div className="ma-marksheet-sec-footer">
                    {/* QR Code Verification Box */}
                    <div className="ma-marksheet-qr-box">
                      <div className="ma-marksheet-qr-graphic">
                        <QrCode size={42} strokeWidth={1.8} color="#1E3A8A" />
                      </div>
                      <div className="ma-marksheet-qr-info">
                        <strong>DGE DIGITAL VERIFIED</strong>
                        <span>Scan or visit dge.tn.gov.in/verify</span>
                      </div>
                    </div>

                    {/* Official Circular Seal */}
                    <div className="ma-marksheet-seal-wrap">
                      <div className="ma-marksheet-seal-circle">
                        <div className="ma-marksheet-seal-text">GOVT. OF TAMIL NADU</div>
                        <div className="ma-marksheet-seal-core">★ VERIFIED ★</div>
                        <div className="ma-marksheet-seal-sub">DGE EXAMINATIONS</div>
                      </div>
                    </div>

                    {/* Facsimile Signature */}
                    <div className="ma-marksheet-sign-box">
                      <div className="ma-marksheet-signature-line">
                        <span className="ma-marksheet-cursive-sign">K. Mahendran</span>
                      </div>
                      <span className="ma-marksheet-sign-desig">Member Secretary</span>
                      <span className="ma-marksheet-sign-sub">Board of Secondary & Higher Secondary Exams</span>
                    </div>
                  </div>

                  {/* Barcode & Security Watermark Text */}
                  <div className="ma-marksheet-barcode-strip">
                    <div className="ma-marksheet-barcode-lines" aria-hidden="true">
                      ||| | |||| | || |||| | ||| ||||| || |||| | ||| |||| | || ||||
                    </div>
                    <span className="ma-marksheet-barcode-hash">
                      TN-SECURE-DOC-{marksheetModal.grade}-{marksheetModal.roll}-{marksheetModal.year} · ORIGINAL CERTIFICATE AUTHENTICATED
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="ma-assigned-modal-foot" style={{ justifyContent: "space-between", flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: 8 }}>
                <button
                  type="button"
                  className="ma-modal-btn-primary"
                  onClick={() => {
                    setSuccessToast(`${marksheetModal.grade} official marksheet downloaded successfully.`);
                  }}
                  style={{
                    background: "#0F172A",
                    color: "#FFFFFF",
                    padding: "8px 14px",
                    borderRadius: 10,
                    fontWeight: 700,
                    fontSize: 12,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 6,
                    border: "none",
                    cursor: "pointer",
                  }}
                >
                  <Download size={14} />
                  <span>Download PDF</span>
                </button>

                <button
                  type="button"
                  className="ma-modal-btn-secondary"
                  onClick={() => {
                    if (typeof window !== "undefined") window.print();
                  }}
                  style={{
                    background: "#F8FAFC",
                    border: "1px solid #CBD5E1",
                    color: "#334155",
                    padding: "8px 12px",
                    borderRadius: 10,
                    fontWeight: 600,
                    fontSize: 12,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 5,
                    cursor: "pointer",
                  }}
                >
                  <Printer size={14} />
                  <span>Print</span>
                </button>
              </div>

              <button
                type="button"
                className="ma-modal-btn-cancel"
                onClick={() => setMarksheetModal(null)}
              >
                Close Marksheet
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          12. FAMILY DOCUMENT PREVIEW MODAL
          ======================================================================= */}
      {familyDocModal?.open && (
        <div className="ma-assigned-modal-backdrop" onClick={() => setFamilyDocModal(null)}>
          <div
            className="ma-assigned-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="fam-doc-modal-title"
          >
            <div className="ma-assigned-modal-head">
              <div>
                <h3 id="fam-doc-modal-title">{familyDocModal.title}</h3>
                <small>
                  {familyDocModal.docType} · Doc No: {familyDocModal.docNumber}
                </small>
              </div>
              <button
                type="button"
                className="ma-modal-close-btn"
                onClick={() => setFamilyDocModal(null)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>

            <div className="ma-assigned-modal-body">
              <div
                style={{
                  background: "#F8FAFC",
                  border: "1.5px solid #CBD5E1",
                  borderRadius: 16,
                  padding: 16,
                }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    borderBottom: "1.5px solid #E2E8F0",
                    paddingBottom: 10,
                    marginBottom: 12,
                  }}
                >
                  <div>
                    <span style={{ fontSize: 13, fontWeight: 800, color: "#0F172A", display: "block" }}>
                      {familyDocModal.issuedBy}
                    </span>
                    <span style={{ fontSize: 11, color: "#64748B" }}>
                      Issued: {familyDocModal.issuedDate} · Primary Holder: {familyDocModal.holderName}
                    </span>
                  </div>
                  <span className="ma-sv-edu-verified">
                    <CheckCircle2 size={12} strokeWidth={2.6} />
                    <span>Govt. Verified</span>
                  </span>
                </div>

                <div
                  style={{
                    background: "#FFFFFF",
                    borderRadius: 12,
                    border: "1px solid #E2E8F0",
                    padding: "8px 12px",
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                  }}
                >
                  {familyDocModal.details.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        padding: "5px 0",
                        fontSize: 12,
                        borderBottom:
                          idx < familyDocModal.details.length - 1 ? "1px dashed #E2E8F0" : "none",
                      }}
                    >
                      <span style={{ color: "#64748B" }}>{item.label}:</span>
                      <strong style={{ color: "#0F172A", textAlign: "right" }}>{item.value}</strong>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="ma-assigned-modal-foot">
              <button
                type="button"
                className="ma-modal-btn-cancel"
                onClick={() => setFamilyDocModal(null)}
              >
                Close Document
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =======================================================================
          13. LIVE DEVICE CAMERA MODAL
          ======================================================================= */}
      <LiveDeviceCameraModal
        open={cameraModalOpen}
        onClose={() => {
          setCameraModalOpen(false);
          setActivePhotoSlot(null);
        }}
        title="Capture Residence Verification Photo"
        withGeotag={true}
        eventDetails={{
          communityName: "Physical Verification Team",
          eventName: "Candidate Home Verification",
          address: candidate.address,
          lat: 11.0168,
          lng: 76.9558,
        }}
        onCapture={(dataUrl) => {
          setProofPhoto(dataUrl);
          if (activePhotoSlot !== null) {
            setPhotos((prev) => {
              const next = [...prev];
              next[activePhotoSlot] = dataUrl;
              return next;
            });
            setActivePhotoSlot(null);
          }
          setCameraModalOpen(false);
        }}
      />
    </div>
  );
}
