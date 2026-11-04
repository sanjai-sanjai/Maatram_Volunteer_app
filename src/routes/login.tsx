import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Flashlight, Image as ImageIcon } from "lucide-react";
import { A, Hl, Screen, Strokes, TopNav } from "@/components/mq";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/login")({
  head: () => seo("Scan Your Maatram ID", "Scan the QR code on your Maatram ID card to log in."),
  component: Scanner,
});

function Scanner() {
  const navigate = useNavigate();
  const [flash, setFlash] = useState(false);
  const [scanning, setScanning] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const scan = () => {
    if (scanning) return;
    setScanning(true);
    setTimeout(() => navigate({ to: "/verification" }), 1400);
  };

  return (
    <Screen deco="tr" footer="waves">
      <TopNav back="/welcome" />
      <div style={{ position: "relative", marginTop: 18 }}>
        <h1 className="mq-title mq-title--lg">
          Scan Your <Hl>Maatram ID</Hl>
        </h1>
        <Strokes style={{ right: "2%", top: -36 }} />
      </div>
      <p className="mq-sub">Scan the QR code on your Maatram ID card to login and fetch your details instantly.</p>
      <div className="mq-scanner" onClick={scan} role="button" aria-label="Tap to scan the Maatram ID">
        <img src={`${A}/photos/maatram-id-qr-card-reference.jpg`} alt="Maatram ID card held up to the camera" />
        {flash && <div className="mq-scanner__flash" />}
        <div className="mq-scanner__line" />
        {scanning && <div className="mq-scanner__status">QR detected · MT4507</div>}
      </div>
      <div className="mq-scan-actions">
        <button className="mq-scan-action" aria-pressed={flash} onClick={() => setFlash((f) => !f)}>
          <span><Flashlight size={26} /></span>
          <span>Flash</span>
        </button>
        <button className="mq-scan-action" onClick={() => fileRef.current?.click()}>
          <span><ImageIcon size={26} /></span>
          <span>Scan from Gallery</span>
        </button>
        <input ref={fileRef} type="file" accept="image/*" hidden onChange={(e) => e.target.files?.length && scan()} />
      </div>
    </Screen>
  );
}
