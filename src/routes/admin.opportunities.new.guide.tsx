import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarClock,
  ClipboardList,
  Mail,
  Phone,
  Plus,
  Target,
  Trash2,
  UserRound,
  UsersRound,
} from "lucide-react";
import { useState } from "react";
import { AdminFrame, SectionHead, WizardHeader } from "@/components/admin/admin-ui";
import { useAdmin } from "@/components/admin/AdminState";
import { validateGuide, type EventDraft, type FieldErrors } from "@/data/admin-mock";
import { seo } from "@/lib/seo";
import clipboard from "@/assets/admin/clipboard.png";

export const Route = createFileRoute("/admin/opportunities/new/guide")({
  head: () =>
    seo(
      "Create Opportunity – Event Guide",
      "Step 2 of 3: describe purpose, responsibilities, schedule and contact details.",
    ),
  component: EventGuide,
});

function EventGuide() {
  const { draft, update } = useAdmin();
  const navigate = useNavigate();
  const [errors, setErrors] = useState<FieldErrors>({});
  const next = () => {
    const e = validateGuide(draft);
    setErrors(e);
    if (Object.keys(e).length) return;
    navigate({ to: "/admin/opportunities/new/review" });
  };
  const setRow = (i: number, patch: Partial<EventDraft["schedule"][number]>) =>
    update({ schedule: draft.schedule.map((s, j) => (j === i ? { ...s, ...patch } : s)) });

  return (
    <AdminFrame>
      <WizardHeader step={2} onStep={(to) => navigate({ to })} />
      <section className="ad-card ad-form">
        <SectionHead
          icon={<BookOpen />}
          title="Event Guide"
          sub="Provide complete details so volunteers are well prepared."
          art={
            <img src={clipboard} alt="" className="ad-section-head__art" width={816} height={816} />
          }
        />
        <div className="ad-form__body ad-guide">
          <Area
            icon={<Target />}
            label="Purpose of the Event"
            value={draft.purpose}
            onChange={(v) => update({ purpose: v })}
            error={errors.purpose}
          />
          <Area
            icon={<UsersRound />}
            label="Volunteer Responsibilities"
            value={draft.responsibilities}
            onChange={(v) => update({ responsibilities: v })}
            error={errors.responsibilities}
          />
          <Area
            icon={<ClipboardList />}
            label="Preparation Requirements"
            value={draft.preparation}
            onChange={(v) => update({ preparation: v })}
            error={errors.preparation}
          />
          <div className="ad-gfield">
            <span className="ad-icon-circle">
              <CalendarClock />
            </span>
            <div className="ad-gfield__main">
              <span className="ad-field__label">
                Schedule <em>*</em>
              </span>
              <div className="ad-schedule">
                {draft.schedule.map((s, i) => (
                  <div key={i} className="ad-schedule__row">
                    <i className={i === 0 ? "first" : ""} />
                    <input
                      className="ad-schedule__time"
                      aria-label="Time"
                      value={s.time}
                      onChange={(e) => setRow(i, { time: e.target.value })}
                    />
                    <input
                      className="ad-schedule__label"
                      aria-label="Activity"
                      value={s.label}
                      onChange={(e) => setRow(i, { label: e.target.value })}
                    />
                    {draft.schedule.length > 1 && (
                      <button
                        type="button"
                        aria-label="Remove row"
                        onClick={() =>
                          update({ schedule: draft.schedule.filter((_, j) => j !== i) })
                        }
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  type="button"
                  className="ad-mini-btn"
                  onClick={() => update({ schedule: [...draft.schedule, { time: "", label: "" }] })}
                >
                  <Plus size={14} /> Add time slot
                </button>
              </div>
              {errors.schedule && <span className="ad-error">{errors.schedule}</span>}
            </div>
          </div>
          <div className="ad-gfield">
            <span className="ad-icon-circle">
              <Phone />
            </span>
            <div className="ad-gfield__main">
              <span className="ad-field__label">
                Contact Details <em>*</em>
              </span>
              <div className="ad-contact">
                <div className="ad-contact__row">
                  <span>
                    <UserRound size={18} />
                  </span>
                  <input
                    aria-label="Coordinator name"
                    value={draft.contactName}
                    onChange={(e) => update({ contactName: e.target.value })}
                    className="strong"
                  />
                  <input
                    aria-label="Role"
                    value={draft.contactRole}
                    onChange={(e) => update({ contactRole: e.target.value })}
                  />
                </div>
                <div className="ad-contact__split">
                  <div className="ad-contact__row">
                    <span>
                      <Phone size={18} />
                    </span>
                    <input
                      aria-label="Phone"
                      value={draft.phone}
                      onChange={(e) => update({ phone: e.target.value })}
                    />
                  </div>
                  <div className="ad-contact__row">
                    <span>
                      <Mail size={18} />
                    </span>
                    <input
                      aria-label="Email"
                      type="email"
                      value={draft.email}
                      onChange={(e) => update({ email: e.target.value })}
                    />
                  </div>
                </div>
              </div>
              {errors.contact && <span className="ad-error">{errors.contact}</span>}
            </div>
          </div>
        </div>
      </section>
      <div className="ad-sticky-actions ad-sticky-actions--two">
        <button
          type="button"
          className="ad-btn ad-btn--ghost"
          onClick={() => navigate({ to: "/admin/opportunities/new" })}
        >
          <ArrowLeft /> Back: Event Details
        </button>
        <button type="button" className="ad-btn ad-btn--primary" onClick={next}>
          Next: Review &amp; Publish <ArrowRight />
        </button>
      </div>
    </AdminFrame>
  );
}

function Area({
  icon,
  label,
  value,
  onChange,
  error,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string | undefined;
}) {
  return (
    <div className="ad-gfield">
      <span className="ad-icon-circle">{icon}</span>
      <label className="ad-gfield__main">
        <span className="ad-field__label">
          {label} <em>*</em>
        </span>
        <span className="ad-area">
          <textarea
            rows={3}
            maxLength={200}
            value={value}
            onChange={(e) => onChange(e.target.value)}
          />
          <small>{value.length} / 200</small>
        </span>
        {error && <span className="ad-error">{error}</span>}
      </label>
    </div>
  );
}
