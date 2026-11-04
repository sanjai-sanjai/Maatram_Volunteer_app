import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowRight, CalendarDays, CircleCheck, CloudUpload, FileText, ImageIcon, Leaf, LocateFixed, MapPin, Mic, Pencil, Sparkles, Sprout, Tag, Users, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { AdminFrame, SectionHead, WizardHeader } from "@/components/admin/admin-ui";
import { useAdmin } from "@/components/admin/AdminState";
import { eventTypes, simulateAiDescription, validateDetails, type FieldErrors } from "@/data/admin-mock";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/opportunities/new/")({
  head: () => seo("Create Opportunity – Event Details", "Step 1 of 3: add the basic details of a new Maatram volunteering event."),
  component: EventDetails,
});

const voiceSample = "we plant palm seeds in school campus with students, water and protect saplings, make area green";
const tagIcon = (t: string) => (t === "Environment" ? <Leaf /> : t === "Sustainability" ? <Sprout /> : <Users />);

function EventDetails() {
  const { draft, update } = useAdmin();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FieldErrors>({});
  const [listening, setListening] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [locNote, setLocNote] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);
  const timer = useRef<number | undefined>(undefined);
  useEffect(() => () => window.clearTimeout(timer.current), []);

  const generate = (raw: string) => {
    setGenerating(true);
    timer.current = window.setTimeout(() => {
      update(simulateAiDescription(raw, draft));
      setGenerating(false);
    }, 900);
  };
  const speak = () => {
    if (listening) return;
    setListening(true);
    timer.current = window.setTimeout(() => {
      setListening(false);
      update({ rawDescription: voiceSample });
      generate(voiceSample);
    }, 2200);
  };
  const onFile = (f: File | undefined) => {
    if (!f) return;
    if (!/image\/(jpeg|png)/.test(f.type)) return setErrors((e) => ({ ...e, image: "Only JPG or PNG images are allowed." }));
    if (f.size > 5 * 1024 * 1024) return setErrors((e) => ({ ...e, image: "Image must be 5 MB or smaller." }));
    const r = new FileReader();
    r.onload = () => { update({ image: String(r.result) }); setErrors(({ image: _i, ...rest }) => rest); };
    r.readAsDataURL(f);
  };
  const next = () => {
    const e = validateDetails(draft);
    setErrors(e);
    if (Object.keys(e).length) { document.querySelector(`[data-field="${Object.keys(e)[0]}"]`)?.scrollIntoView({ behavior: "smooth", block: "center" }); return; }
    navigate({ to: "/admin/opportunities/new/guide" });
  };
  const ticks = [5, 10, 15, 20, 25, 30, 35, 40, 45, 50];
  const pos = ((draft.volunteers - 5) / 45) * 100;

  return (
    <AdminFrame>
      <WizardHeader step={1} />
      <section className="ad-card ad-form">
        <SectionHead icon={<CalendarDays />} title="Event Details" sub="Basic information about the volunteering opportunity." />
        <div className="ad-form__body">
          <Field icon={<Tag />} label="Event Type" error={errors.type} name="type">
            <select className="ad-input" value={draft.type} onChange={(e) => update({ type: e.target.value })}>
              {eventTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </Field>
          <Field icon={<Pencil />} label="Event Name" error={errors.name} name="name">
            <input className="ad-input" value={draft.name} maxLength={60} onChange={(e) => update({ name: e.target.value })} placeholder="e.g. Palm Seeds Plantation" />
          </Field>
          <Field icon={<MapPin />} label="Location" error={errors.location} name="location" hint={locNote}>
            <div className="ad-input-wrap">
              <input className="ad-input" value={draft.location} onChange={(e) => update({ location: e.target.value })} placeholder="City, State" />
              <button type="button" aria-label="Use current location" onClick={() => { update({ location: "Chennai, Tamil Nadu" }); setLocNote("Location set to Chennai, Tamil Nadu (simulated)."); }}><LocateFixed /></button>
            </div>
          </Field>
          <div className="ad-field" data-field="volunteers">
            <span className="ad-icon-tile"><Users /></span>
            <div className="ad-field__main">
              <div className="ad-field__row">
                <label htmlFor="vol-count">Number of Volunteers Needed <em>*</em></label>
                <input id="vol-count" className="ad-input ad-input--num" type="number" min={5} max={50} value={draft.volunteers}
                  onChange={(e) => update({ volunteers: Math.max(5, Math.min(50, Number(e.target.value) || 5)) })} />
              </div>
            </div>
          </div>
          <div className="ad-slider">
            <span className="ad-slider__bubble" style={{ left: `calc(${pos}% + ${10 - pos * 0.2}px)` }}>{draft.volunteers}</span>
            <input type="range" min={5} max={50} step={1} value={draft.volunteers} aria-label="Volunteers needed" onChange={(e) => update({ volunteers: Number(e.target.value) })} style={{ ["--pos" as string]: `${pos}%` }} />
            <div className="ad-slider__ticks">{ticks.map((t) => <button type="button" key={t} onClick={() => update({ volunteers: t })}>{t}</button>)}</div>
          </div>

          <div className="ad-desc" data-field="description">
            <div className="ad-desc__head">
              <span className="ad-icon-tile"><FileText /></span>
              <div><h3>Event Description <em>*</em></h3><p>Describe your event in your own words — even in broken English. Our AI will convert it into a clear and structured description.</p></div>
              <span className="ad-ai-badge"><Sparkles size={16} /> AI Assisted</span>
            </div>
            <button type="button" className={`ad-voice ${listening ? "listening" : ""}`} onClick={speak} aria-label="Tap to speak">
              <span className="ad-wave" aria-hidden>{Array.from({ length: 8 }, (_, i) => <i key={i} />)}</span>
              <span className="ad-voice__mic"><Mic /></span>
              <span className="ad-wave" aria-hidden>{Array.from({ length: 8 }, (_, i) => <i key={i} />)}</span>
              <span className="ad-voice__label">{listening ? "Listening… speak now" : "Tap to speak"}</span>
            </button>
            <span className="ad-or">or</span>
            <div className="ad-textarea">
              <Pencil size={18} />
              <textarea rows={3} maxLength={500} value={draft.rawDescription} placeholder="Type or paste your description here…" onChange={(e) => update({ rawDescription: e.target.value })} />
              <div className="ad-textarea__foot">
                <button type="button" className="ad-mini-btn" disabled={!draft.rawDescription.trim() || generating} onClick={() => generate(draft.rawDescription)}><Sparkles size={14} /> Generate with AI</button>
                <span>{draft.rawDescription.length} / 500</span>
              </div>
            </div>
            <div className="ad-ai-out">
              <div className="ad-ai-out__head"><Sparkles className="ad-sparkle" /><h3>AI Generated Description</h3>
                <span className="ad-chip ad-chip--green">{generating ? "Generating…" : <><CircleCheck size={16} /> Generated</>}</span></div>
              <div className={`ad-ai-out__box ${generating ? "loading" : ""}`}>
                <textarea aria-label="Generated description (editable)" rows={4} maxLength={500} value={draft.description} onChange={(e) => update({ description: e.target.value })} />
                <div className="ad-tags">{draft.tags.map((t) => <span key={t}>{tagIcon(t)}{t}</span>)}</div>
              </div>
              {errors.description && <p className="ad-error">{errors.description}</p>}
            </div>
          </div>

          <Field icon={<ImageIcon />} label="Event Image" error={errors.image} name="image">
            <div className="ad-upload">
              {draft.image ? (
                <div className="ad-upload__preview"><img src={draft.image} alt="Event preview" /><button type="button" aria-label="Remove image" onClick={() => update({ image: null })}><X size={18} /></button></div>
              ) : <div className="ad-upload__empty"><ImageIcon /> No image</div>}
              <button type="button" className="ad-upload__btn" onClick={() => fileRef.current?.click()}><CloudUpload /><strong>Upload Event Image</strong><small>JPG, PNG (Max 5 MB)</small></button>
              <input ref={fileRef} type="file" accept="image/png,image/jpeg" hidden onChange={(e) => { onFile(e.target.files?.[0]); e.target.value = ""; }} />
            </div>
          </Field>
        </div>
      </section>
      <div className="ad-sticky-actions"><button type="button" className="ad-btn ad-btn--primary ad-btn--wide" onClick={next}>Next: Event Guide <ArrowRight /></button></div>
    </AdminFrame>
  );
}

function Field({ icon, label, error, hint, name, children }: { icon: React.ReactNode; label: string; error?: string | undefined; hint?: string | undefined; name: string; children: React.ReactNode }) {
  return (
    <div className="ad-field" data-field={name}>
      <span className="ad-icon-tile">{icon}</span>
      <label className="ad-field__main">
        <span className="ad-field__label">{label} <em>*</em></span>
        {children}
        {error ? <span className="ad-error">{error}</span> : hint ? <span className="ad-hint">{hint}</span> : null}
      </label>
    </div>
  );
}
