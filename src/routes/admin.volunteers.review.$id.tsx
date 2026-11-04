import { createFileRoute, notFound, useNavigate } from "@tanstack/react-router";
import {
  BriefcaseBusiness,
  CalendarDays,
  CircleCheck,
  CircleX,
  Clock,
  HandHeart,
  IdCard,
  Mail,
  MapPin,
  Phone,
  Send,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useState } from "react";
import logo from "@/assets/admin/maatram-logo-full.png";
import {
  BackButton,
  DetailRow,
  IdentityDocumentCard,
  InfoSection,
  Sparks,
  Toast,
  VoiceNotePlayer,
  VolunteerFrame,
  approveVolunteer,
} from "@/components/admin/volunteers";
import { getVolunteer, type Volunteer } from "@/data/volunteers-mock";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/volunteers/review/$id")({
  loader: ({ params }) => {
    const v = getVolunteer(params.id);
    if (!v) throw notFound();
    return v;
  },
  head: ({ loaderData }) =>
    loaderData
      ? seo(`Review ${loaderData.name}`, "Review submitted volunteer details before approving.")
      : { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] },
  component: Review,
});

function Review() {
  const v = Route.useLoaderData();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [toast, setToast] = useState("");
  const [rejected, setRejected] = useState(false);

  return (
    <VolunteerFrame nav={false}>
      <header className="vl-rhead">
        <BackButton to="/admin/volunteers" />
        <img src={logo} alt="Maatram Foundation" className="vl-rhead__logo" />
        <h1>
          Volunteer <mark>Profile Review</mark>
          <Sparks className="vl-rhead__sparks" />
        </h1>
        <p>Review the submitted details before approving this volunteer.</p>
      </header>

      <section className="vl-card vl-pcard">
        <img src={v.photo} alt={v.name} className="vl-pcard__img" />
        <div className="vl-pcard__body">
          <h2>{v.name}</h2>
          <span className="vl-pill vl-pill--pending">
            <Clock /> {rejected ? "Rejected" : "Pending Verification"}
          </span>
          <ul>
            <li>
              <UserRound />
              Reg. ID: {v.id}
            </li>
            <li>
              <CalendarDays />
              Submitted on: {v.submitted}
            </li>
            <li>
              <MapPin />
              {v.location}
            </li>
          </ul>
        </div>
      </section>

      <InfoSection
        icon={<UserRound />}
        title="Basic Details"
        sub="Personal information submitted by the volunteer."
      >
        <div className="vl-details">
          <DetailRow icon={<UserRound />} label="Full Name" value={v.name} />
          <DetailRow icon={<Mail />} label="Email ID" value={v.email} />
          <DetailRow icon={<Phone />} label="Mobile Number" value={v.phone} />
          <DetailRow icon={<CalendarDays />} label="Date of Birth" value={v.dob} />
        </div>
      </InfoSection>

      <InfoSection
        icon={<BriefcaseBusiness />}
        title="Volunteer Details"
        sub="Information about their availability and volunteering interest."
      >
        <div className="vl-trio">
          <div>
            <span className="vl-tile vl-tile--sm">
              <BriefcaseBusiness />
            </span>
            <b>Working Status</b>
            <em>{v.status}</em>
          </div>
          <div>
            <span className="vl-tile vl-tile--sm">
              <MapPin />
            </span>
            <b>Location</b>
            <em>{v.location}</em>
          </div>
          <div>
            <span className="vl-tile vl-tile--sm">
              <CalendarDays />
            </span>
            <b>Availability</b>
            <em>{v.availability}</em>
          </div>
        </div>
      </InfoSection>

      <InfoSection
        icon={<IdCard />}
        title="Personal ID Card"
        sub="Identity proof submitted by the volunteer."
      >
        <IdentityDocumentCard
          type={v.idDoc.type}
          size={v.idDoc.size}
          onView={() => setToast(`Opening ${v.idDoc.type} for ${v.name}`)}
        />
      </InfoSection>

      <InfoSection
        icon={<HandHeart />}
        title="Why do you want to volunteer with Maatram?"
        className="vl-sec--why"
      >
        <blockquote className="vl-quote">
          <span aria-hidden>“</span>
          {v.motivation}
        </blockquote>
        <VoiceNotePlayer duration={v.voiceNote.duration} src={v.voiceNote.src} />
      </InfoSection>

      <InfoSection icon={<ShieldCheck />} title="Verification Decision">
        <div className="vl-decision">
          <span className="vl-pill vl-pill--pending">
            <Clock /> {rejected ? "Rejected" : "Pending Verification"}
          </span>
          <p>
            Please review the volunteer's profile and identity document before making a decision.
          </p>
        </div>
        <div className="vl-actions">
          <button
            type="button"
            className="vl-btn vl-btn--danger"
            onClick={() => {
              setRejected(true);
              setToast(`${v.name}'s registration was rejected`);
            }}
          >
            <CircleX /> Reject
          </button>
          <button
            type="button"
            className="vl-btn vl-btn--primary"
            onClick={() => {
              approveVolunteer(v.id);
              setRejected(false);
              setModal(true);
            }}
          >
            <CircleCheck /> Approve Volunteer
          </button>
        </div>
      </InfoSection>

      {modal && (
        <VerificationModal
          v={v}
          onClose={() => setModal(false)}
          onNotify={() => setToast(`Verification notification sent to ${v.name}`)}
          onView={() => navigate({ to: "/admin/volunteers" })}
        />
      )}
      {toast && <Toast text={toast} onDone={() => setToast("")} />}
    </VolunteerFrame>
  );
}

function VerificationModal({
  v,
  onClose,
  onNotify,
  onView,
}: {
  v: Volunteer;
  onClose: () => void;
  onNotify: () => void;
  onView: () => void;
}) {
  const [sent, setSent] = useState(false);
  return (
    <div
      className="vl-overlay"
      role="dialog"
      aria-modal="true"
      aria-labelledby="vl-modal-title"
      onClick={onClose}
    >
      <div className="vl-modal" onClick={(e) => e.stopPropagation()}>
        <button
          type="button"
          className="vl-round vl-modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          <X />
        </button>
        <div className="vl-modal__photo">
          <Sparks className="vl-modal__s1" />
          <Sparks className="vl-modal__s2" />
          <i className="vl-modal__dash" />
          <img src={v.photo} alt={v.name} />
          <span className="vl-modal__check">
            <CircleCheck />
          </span>
        </div>
        <h2 id="vl-modal-title">
          Volunteer <mark>Verified!</mark>
        </h2>
        <p>{v.name} has been successfully verified and added to the Maatram volunteer community.</p>
        <div className="vl-modal__sum">
          <div>
            <span>
              <UserRound />
            </span>
            <b>{v.name}</b>
          </div>
          <div>
            <span>
              <BriefcaseBusiness />
            </span>
            <b>{v.status}</b>
          </div>
          <div>
            <span>
              <MapPin />
            </span>
            <small>{v.location.replace(", ", ",\n")}</small>
          </div>
        </div>
        <div className="vl-modal__btns">
          <Sparks className="vl-modal__s3" />
          <button
            type="button"
            className="vl-btn vl-btn--primary vl-btn--block"
            onClick={() => {
              setSent(true);
              onNotify();
            }}
          >
            <Send /> {sent ? "Notification Sent" : "Send Verification Notification"}
          </button>
          <button type="button" className="vl-btn vl-btn--ghost vl-btn--block" onClick={onView}>
            Back
          </button>
        </div>
        <div className="vl-modal__wave" aria-hidden />
      </div>
    </div>
  );
}
