import { useRouter } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight } from "lucide-react";
import type { ReactNode, ButtonHTMLAttributes } from "react";

export const A = "/assets";

export function Logo({ small }: { small?: boolean }) {
  return (
    <img
      className={small ? "mq-logo mq-logo--sm" : "mq-logo"}
      src={`${A}/brand/maatram-foundation-logo.png`}
      alt="Maatram Foundation"
      width={371}
      height={164}
    />
  );
}

type Deco = "tr" | "tl" | "both";
export function Screen({
  children,
  deco = "tr",
  footer = "building",
}: {
  children: ReactNode;
  deco?: Deco;
  footer?: "building" | "waves" | "landscape" | "none";
}) {
  return (
    <div className="mq-shell">
      <main className="mq-screen">
        {(deco === "tr" || deco === "both") && (
          <img
            className="mq-deco mq-deco--tr"
            src={`${A}/decorations/corner-wave-top-right.png`}
            alt=""
          />
        )}
        {(deco === "tl" || deco === "both") && (
          <img
            className="mq-deco mq-deco--tl-flip"
            src={`${A}/decorations/corner-wave-top-right.png`}
            alt=""
          />
        )}
        <div className="mq-screen__body">{children}</div>
        {footer === "building" && (
          <img
            className="mq-footer-art"
            src={`${A}/composites/foundation-building-footer.png`}
            alt=""
          />
        )}
        {footer === "landscape" && (
          <img
            className="mq-footer-art"
            src={`${A}/decorations/foundation-footer-landscape-composite.png`}
            alt=""
          />
        )}
        {footer === "waves" && (
          <div className="mq-waves">
            <img src={`${A}/decorations/bottom-wave-left.png`} alt="" />
            <img src={`${A}/decorations/bottom-wave-right.png`} alt="" />
          </div>
        )}
      </main>
    </div>
  );
}

export function BackButton({ to }: { to?: string | undefined }) {
  const router = useRouter();
  return (
    <button
      className="mq-back"
      aria-label="Go back"
      onClick={() => (to ? router.navigate({ to }) : router.history.back())}
    >
      <ArrowLeft size={24} />
    </button>
  );
}

export function TopNav({ back }: { back?: string }) {
  return (
    <div className="mq-topnav">
      <BackButton to={back} />
      <Logo small />
      <span />
    </div>
  );
}

export function Hl({ children }: { children: ReactNode }) {
  return (
    <span className="mq-hl">
      <span>{children}</span>
    </span>
  );
}

export function Strokes({ style, alt }: { style?: React.CSSProperties; alt?: boolean }) {
  return (
    <img
      className="mq-strokes"
      style={style}
      src={`${A}/decorations/${alt ? "yellow-emphasis-strokes-alt" : "yellow-emphasis-strokes"}.png`}
      alt=""
    />
  );
}

export function PrimaryButton({ children, ...rest }: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className="mq-btn" {...rest}>
      {children} <ArrowRight size={26} strokeWidth={2.4} />
    </button>
  );
}

export function Stepper({ step }: { step: 1 | 2 | 3 }) {
  const labels = ["Basic Details", "Volunteer Details", "Verification"];
  return (
    <div className="mq-stepper2">
      {labels.map((l, i) => {
        const n = i + 1;
        const cls = n < step ? "done" : n === step ? "active" : "";
        return (
          <div key={l} className={cls}>
            <span className="n">{n < step ? "✓" : n}</span>
            <span>{l}</span>
          </div>
        );
      })}
    </div>
  );
}

export function RegHeader({ step, back }: { step: 1 | 2 | 3; back: string }) {
  return (
    <>
      <TopNav back={back} />
      <div style={{ position: "relative", marginTop: 12 }}>
        <h1 className="mq-title mq-title--md mq-title--italic" style={{ whiteSpace: "nowrap" }}>
          Other <Hl>Volunteer</Hl> Registration
        </h1>
        <Strokes style={{ right: "4%", top: -34 }} />
      </div>
      <p className="mq-sub" style={{ marginTop: 4, maxWidth: "none" }}>
        Create your account and join the Maatram community.
      </p>
      <Stepper step={step} />
    </>
  );
}
