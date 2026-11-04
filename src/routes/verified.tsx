import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  BookOpen,
  Building2,
  CalendarDays,
  GraduationCap,
  Landmark,
  MapPin,
  QrCode,
} from "lucide-react";
import { A, Hl, Logo, PrimaryButton, Screen } from "@/components/mq";
import { mockStudent as s } from "@/data/mock";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/verified")({
  head: () =>
    seo("Login Successful", "Your Maatram ID has been verified and your profile is ready."),
  component: Verified,
});

function Verified() {
  const navigate = useNavigate();
  return (
    <Screen deco="tl" footer="building">
      <div style={{ marginTop: 26 }}>
        <Logo />
      </div>
      <div className="mq-check">
        <img className="l" src={`${A}/decorations/yellow-emphasis-strokes.png`} alt="" />
        <img src={`${A}/illustrations/success-checkmark.png`} alt="Success" />
        <img className="r" src={`${A}/decorations/yellow-emphasis-strokes.png`} alt="" />
      </div>
      <h1 className="mq-title mq-title--lg mq-title--italic">
        Login <Hl>Successful!</Hl>
      </h1>
      <p className="mq-sub" style={{ maxWidth: "30ch" }}>
        Your Maatram ID has been verified and your profile has been fetched successfully.
      </p>
      <section className="mq-profile">
        <img className="mq-profile__photo" src={`${A}/photos/student-portrait.jpg`} alt={s.name} />
        <div style={{ minWidth: 0 }}>
          <h2>{s.name}</h2>
          <div className="mq-idpill">
            <span>
              Maatram ID: <b>{s.maatramId}</b>
            </span>
            <QrCode size={22} />
          </div>
          <div className="mq-pinfo">
            <GraduationCap />
            <span>{s.category}</span>
          </div>
          <div className="mq-pinfo">
            <Landmark />
            <span>{s.college}</span>
          </div>
          <div className="mq-pinfo">
            <BookOpen />
            <span>
              {s.department}
              <br />({s.academicPeriod})
            </span>
          </div>
        </div>
      </section>
      <section className="mq-triple">
        <div>
          <CalendarDays size={26} />
          <strong>{s.year}</strong>
        </div>
        <div>
          <MapPin size={24} />
          <small>Native Location</small>
          <strong>{s.nativeLocation}</strong>
        </div>
        <div>
          <Building2 size={24} />
          <small>College Location</small>
          <strong>{s.collegeLocation}</strong>
        </div>
      </section>
      <div style={{ margin: "22px 8% 6px" }}>
        <PrimaryButton onClick={() => navigate({ to: "/dashboard" })}>
          Continue to Dashboard
        </PrimaryButton>
      </div>
    </Screen>
  );
}
