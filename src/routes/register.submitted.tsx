import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, Bell, Check, FileSearch, Send } from "lucide-react";
import { A, Hl, Logo, PrimaryButton, Screen, Strokes } from "@/components/mq";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/register/submitted")({
  head: () => seo("Your Details Have Been Sent", "Your Maatram volunteer registration is under review."),
  component: Submitted,
});

function Submitted() {
  const navigate = useNavigate();
  return (
    <Screen deco="tl" footer="building">
      <div style={{ marginTop: 26 }}>
        <Logo />
      </div>
      <div className="mq-env">
        <img className="main" src={`${A}/illustrations/registration-envelope-success.png`} alt="Details sent" />
        <img className="s" src={`${A}/decorations/yellow-emphasis-strokes.png`} alt="" />
      </div>
      <div style={{ position: "relative", marginTop: 14 }}>
        <h1 className="mq-title mq-title--md mq-title--italic">
          Your Details Have <Hl>Been Sent!</Hl>
        </h1>
        <Strokes style={{ right: 0, top: -48 }} />
      </div>
      <p className="mq-sub" style={{ maxWidth: "38ch" }}>
        Thank you for your interest in joining the Maatram volunteer community. Our Maatram team will review and verify your profile.
      </p>
      <div className="mq-stages">
        <div>
          <span className="c" style={{ background: "#FFEFB3" }}><Send size={30} /><span className="mq-ok"><Check size={13} strokeWidth={3.5} /></span></span>
          Details<br />Sent
        </div>
        <ArrowRight className="a" />
        <div>
          <span className="c" style={{ border: "3px solid var(--mq-yellow)", background: "#fff" }}><FileSearch size={30} /></span>
          Profile<br />Verification
        </div>
        <ArrowRight className="a" />
        <div>
          <span className="c" style={{ border: "3px solid #DCDDE1", background: "#F5F5F6" }}><Bell size={30} /></span>
          Get<br />Notified
        </div>
      </div>
      <div className="mq-notice">
        <Bell size={40} fill="#FEC802" style={{ justifySelf: "center" }} />
        <i />
        <span>You'll be notified once your account is approved.</span>
      </div>
      <div style={{ margin: "22px 12% 6px" }}>
        <PrimaryButton onClick={() => navigate({ to: "/welcome" })}>Back to Login</PrimaryButton>
      </div>
    </Screen>
  );
}
