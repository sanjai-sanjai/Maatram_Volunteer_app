import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Check } from "lucide-react";
import { A, Hl, Logo, Screen } from "@/components/mq";
import { mockStudent } from "@/data/mock";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/verification")({
  head: () => seo("Verifying Your Maatram ID", "Fetching and verifying your Maatram profile."),
  component: Verifying,
});

const steps = [
  { t: "QR Code Scanned", s: `ID Detected: ${mockStudent.maatramId}` },
  { t: "Fetching Your Details", s: "Retrieving from Maatram database..." },
  { t: "Verifying Profile", s: "Matching your student record..." },
  { t: "Preparing Your Dashboard", s: "Almost there..." },
];

function Verifying() {
  const navigate = useNavigate();
  const [active, setActive] = useState(2);
  useEffect(() => {
    if (active > steps.length) {
      const t = setTimeout(() => navigate({ to: "/verified" }), 500);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setActive((a) => a + 1), 1300);
    return () => clearTimeout(t);
  }, [active, navigate]);

  return (
    <Screen deco="tl" footer="building">
      <div style={{ marginTop: 26 }}>
        <Logo />
      </div>
      <div className="mq-verify__ring">
        <svg className="mq-spinring" viewBox="0 0 100 100" aria-hidden>
          <circle
            cx="50"
            cy="50"
            r="47"
            fill="none"
            stroke="#FEC802"
            strokeWidth="1.6"
            strokeDasharray="40 18 8 30"
            strokeLinecap="round"
          />
        </svg>
        <img src={`${A}/illustrations/verification-id-badge.png`} alt="Maatram ID being verified" />
      </div>
      <h1 className="mq-title mq-title--md" style={{ marginTop: 18 }}>
        Verifying Your <Hl>Maatram</Hl> ID...
      </h1>
      <p className="mq-sub">Scanning and fetching your profile details from the Maatram database</p>
      <ol className="mq-timeline">
        {steps.map((st, i) => {
          const n = i + 1;
          const state = n < active ? "done" : n === active ? "active" : "idle";
          return (
            <li key={st.t}>
              <span
                className={`mq-dot ${state === "done" ? "mq-dot--done" : state === "active" ? "mq-dot--active" : ""}`}
              >
                {state === "done" && <Check size={16} strokeWidth={3.5} />}
              </span>
              {state === "idle" ? (
                <span className="mq-idle">{st.t}</span>
              ) : (
                <div>
                  <strong>{st.t}</strong>
                  <small>{st.s}</small>
                </div>
              )}
              {state === "active" ? (
                <span className="mq-dots">
                  <i />
                  <i />
                  <i />
                </span>
              ) : (
                <span />
              )}
            </li>
          );
        })}
      </ol>
    </Screen>
  );
}
