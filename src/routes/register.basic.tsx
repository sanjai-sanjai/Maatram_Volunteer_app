import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { Camera, Eye, EyeOff, Lock, Mail, Phone, Upload, User, UserRound } from "lucide-react";
import { PrimaryButton, RegHeader, Screen, Strokes } from "@/components/mq";
import { regDraft } from "@/data/mock";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/register/basic")({
  head: () =>
    seo(
      "Volunteer Registration – Basic Details",
      "Create your Maatram volunteer account: basic details.",
    ),
  component: Basic,
});

type F = "name" | "mobile" | "email" | "password" | "confirm";

function Basic() {
  const navigate = useNavigate();
  const [v, setV] = useState<Record<F, string>>({
    name: regDraft.name ?? "",
    mobile: regDraft.mobile ?? "",
    email: regDraft.email ?? "",
    password: "",
    confirm: "",
  });
  const [show, setShow] = useState({ password: false, confirm: false });
  const [errors, setErrors] = useState<Partial<Record<F, string>>>({});
  const [photo, setPhoto] = useState<string | null>(regDraft.photo || null);
  const fileRef = useRef<HTMLInputElement>(null);

  const submit = () => {
    const e: Partial<Record<F, string>> = {};
    if (!v.name.trim()) e.name = "Please enter your full name";
    if (!/^\d{10}$/.test(v.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
    if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email address";
    if (v.password.length < 6) e.password = "Use at least 6 characters";
    if (v.confirm !== v.password || !v.confirm) e.confirm = "Passwords do not match";
    setErrors(e);
    if (Object.keys(e).length) return;
    Object.assign(regDraft, {
      name: v.name,
      mobile: v.mobile,
      email: v.email,
      photo: photo ?? undefined,
    });
    navigate({ to: "/register/volunteer" });
  };

  const field = (k: F, label: string, icon: React.ReactNode, ph: string, type = "text") => {
    const pw = k === "password" || k === "confirm";
    const visible = pw && show[k as "password" | "confirm"];
    return (
      <div className="mq-frow">
        {icon}
        <div>
          <label htmlFor={k}>
            {label} <span className="mq-req">*</span>
          </label>
          <div className="mq-inp">
            <input
              id={k}
              type={pw ? (visible ? "text" : "password") : type}
              placeholder={ph}
              value={v[k]}
              inputMode={k === "mobile" ? "numeric" : undefined}

              onChange={(e) =>
                setV({
                  ...v,
                  [k]:
                    k === "mobile"
                      ? e.target.value.replace(/\D/g, "").slice(0, 10)
                      : e.target.value,
                })
              }
            />
            {pw && (
              <button
                type="button"
                className="trail"
                aria-label="Toggle password visibility"
                onClick={() => setShow({ ...show, [k]: !visible })}
              >
                {visible ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            )}
          </div>
          {errors[k] && <p className="mq-err">{errors[k]}</p>}
        </div>
      </div>
    );
  };

  return (
    <Screen deco="tr" footer="building">
      <RegHeader step={1} back="/welcome" />
      <section className="mq-regcard">
        <div className="mq-sechead">
          <div>
            <h2>Basic Details</h2>
            <p>Let's start with your personal information.</p>
          </div>
        </div>
        <div className="mq-photo-up">
          <div className="mq-avatar-ring">
            <div>
              {photo ? (
                <img src={photo} alt="Profile preview" />
              ) : (
                <UserRound size={110} strokeWidth={1.2} />
              )}
            </div>
            <button
              className="cam"
              aria-label="Upload photo"
              onClick={() => fileRef.current?.click()}
            >
              <Camera size={18} />
            </button>
            <Strokes style={{ right: -26, top: -6, width: 34 }} />
          </div>
          <div>
            <strong style={{ fontSize: 17 }}>Upload Profile Photo</strong>
            <p style={{ margin: "2px 0 0", fontSize: 14, color: "var(--mq-navy)" }}>
              Add a clear photo of yourself
            </p>
            <button className="mq-choose" onClick={() => fileRef.current?.click()}>
              <Upload size={20} /> Choose Photo
            </button>
          </div>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) setPhoto(URL.createObjectURL(f));
            }}
          />
        </div>
        {field("name", "Full Name", <User />, "Enter your full name")}
        {field("mobile", "Mobile Number", <Phone />, "Enter your 10-digit mobile number", "tel")}
        {field("email", "Email ID", <Mail />, "Enter your email address", "email")}
        {field("password", "Create Password", <Lock />, "Create a strong password")}
        {field("confirm", "Confirm Password", <Lock />, "Re-enter your password")}
        <div style={{ marginTop: 18 }}>
          <PrimaryButton onClick={submit}>Continue</PrimaryButton>
        </div>
      </section>
    </Screen>
  );
}
