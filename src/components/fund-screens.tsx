import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarDays,
  Check,
  CircleCheck,
  Coins,
  FileText,
  Home,
  Info,
  Landmark,
  Paperclip,
  Plus,
  Search,
  Send,
  ShieldCheck,
  Tag,
  Wallet,
  X,
} from "lucide-react";
import { validateFundRequest, type FundRequestDraft } from "@/data/mock";
import { useMaatramState } from "@/components/MaatramState";
import { Action, Forward, Header, Page, Primary } from "@/components/additional-shared";
const initial: FundRequestDraft = {
  title: "Travel Allowance",
  description: "Travelled to the event location (Chennai) for Palm Seeds Plantation.",
  amount: "250",
  category: "Travel",
  payment: "UPI",
  reference: "sanjai-1806@okaxis",
  bankAccount: "",
  ifsc: "",
  files: ["Bus_Ticket.jpg"],
};
export function FundScreen() {
  const [draft, setDraft] = useState<FundRequestDraft>(initial);
  const [errors, setErrors] = useState<string[]>([]);
  const navigate = useNavigate();
  const state = useMaatramState();
  function field<K extends keyof FundRequestDraft>(key: K, value: FundRequestDraft[K]) {
    setDraft((old) => ({ ...old, [key]: value }));
  }
  return (
    <Page className="ma-fund">
      <Header back="/community/palm-plantation/chat" />
      <div className="ma-fund-title">
        <h1>Fund Request</h1>
        <p>Palm Seeds Plantation</p>
        <Wallet />
      </div>
      <p className="ma-notice">
        <Info />
        Raise a reimbursement request for event-related expenses (e.g., travel allowance, food,
        materials, etc.).
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const found = validateFundRequest(draft);
          setErrors(found);
          if (!found.length) {
            state.submitFund(draft);
            navigate({ to: "/fund-request/success" });
          }
        }}
      >
        <label className="ma-field">
          <span>
            <Tag />
            Expense Title <em>*</em>
          </span>
          <select value={draft.title} onChange={(e) => field("title", e.target.value)}>
            <option value="">Select expense title</option>
            <option>Travel Allowance</option>
            <option>Food Allowance</option>
            <option>Event Materials</option>
            <option>Other Expense</option>
          </select>
        </label>
        <label className="ma-field">
          <span>
            <FileText />
            Description <em>*</em>
          </span>
          <textarea
            maxLength={200}
            value={draft.description}
            onChange={(e) => field("description", e.target.value)}
          />
          <small className="ma-counter">{draft.description.length} / 200</small>
        </label>
        <div className="ma-fund-columns">
          <label className="ma-field">
            <span>
              <Coins />
              Amount Requested <em>*</em>
            </span>
            <div className="ma-amount">
              ₹
              <input
                type="number"
                min="1"
                aria-label="Amount Requested"
                value={draft.amount}
                onChange={(e) => field("amount", e.target.value)}
              />
            </div>
          </label>
          <label className="ma-field">
            <span>
              <Landmark />
              Expense Category <em>*</em>
            </span>
            <select value={draft.category} onChange={(e) => field("category", e.target.value)}>
              <option value="">Select category</option>
              <option>Travel</option>
              <option>Food</option>
              <option>Materials</option>
              <option>Other</option>
            </select>
          </label>
        </div>
        <div className="ma-field">
          <span>
            <Paperclip />
            Upload Bill / Proof <em>*</em>
          </span>
          <div className="ma-proof-files">
            {draft.files.map((name) => (
              <div className="ma-proof-file" key={name}>
                <FileText />
                <span>
                  <b>{name}</b>
                  <small>236 KB</small>
                </span>
                <Action
                  aria-label={`Remove ${name}`}
                  size="icon"
                  onClick={() =>
                    field(
                      "files",
                      draft.files.filter((f) => f !== name),
                    )
                  }
                >
                  <X />
                </Action>
              </div>
            ))}
            <label className="ma-add-file">
              <Plus />
              <span>
                Add more<small>(Max 5)</small>
              </span>
              <input
                className="ma-sr"
                type="file"
                multiple
                accept="image/*,.pdf"
                aria-label="Add bill or proof"
                disabled={draft.files.length >= 5}
                onChange={(e) =>
                  field(
                    "files",
                    [...draft.files, ...Array.from(e.target.files ?? []).map((f) => f.name)].slice(
                      0,
                      5,
                    ),
                  )
                }
              />
            </label>
          </div>
        </div>
        <fieldset className="ma-payment">
          <legend>
            <Wallet />
            Payment Information <em>*</em>
          </legend>
          <label>
            <input
              type="radio"
              name="payment"
              checked={draft.payment === "UPI"}
              onChange={() => field("payment", "UPI")}
            />
            UPI (GPay / PhonePe / Paytm)
          </label>
          {draft.payment === "UPI" && (
            <input
              aria-label="UPI ID"
              value={draft.reference}
              onChange={(e) => field("reference", e.target.value)}
              placeholder="Your UPI ID"
            />
          )}
          <label>
            <input
              type="radio"
              name="payment"
              checked={draft.payment === "Bank Account"}
              onChange={() => field("payment", "Bank Account")}
            />
            Bank Account
          </label>
          {draft.payment === "Bank Account" && (
            <>
              <input
                aria-label="Bank Account Number"
                placeholder="Account number"
                value={draft.bankAccount}
                onChange={(e) => field("bankAccount", e.target.value.replace(/\D/g, ""))}
              />
              <input
                aria-label="IFSC Code"
                placeholder="IFSC code"
                value={draft.ifsc}
                onChange={(e) => field("ifsc", e.target.value.toUpperCase())}
              />
            </>
          )}
        </fieldset>
        {errors.length > 0 && (
          <div role="alert" className="ma-errors">
            {errors.map((e) => (
              <p key={e}>{e}</p>
            ))}
          </div>
        )}
        <Primary type="submit">
          <Send />
          Submit Request
        </Primary>
        <p className="ma-verification-note">
          <ShieldCheck />
          Your request will be verified by the Maatram team.
          <br />
          Once approved, the amount will be credited to your account.
        </p>
      </form>
    </Page>
  );
}
export function FundSuccessScreen() {
  const state = useMaatramState();
  const draft = state.fundRequest ?? initial;
  return (
    <Page className="ma-fund-success">
      <Header back="/fund-request" />
      <div className="ma-fund-title">
        <h1>Fund Request</h1>
        <p>Palm Seeds Plantation</p>
      </div>
      <div className="ma-fund-art">
        <div>
          <FileText />
          <strong>₹</strong>
        </div>
        <img src="/assets/illustrations/success-checkmark.png" alt="Request submitted" />
      </div>
      <h1>Fund Request Submitted!</h1>
      <p className="ma-centered">
        Your request has been sent to the
        <br />
        Maatram team for verification.
      </p>
      <div className="ma-request-summary">
        {[
          [Tag, "Expense Title", draft.title],
          [Coins, "Amount Requested", `₹ ${draft.amount}`],
          [CalendarDays, "Event", "Palm Seeds Plantation"],
          [
            FileText,
            "Bills Attached",
            `${draft.files.length} ${draft.files.length === 1 ? "File" : "Files"}`,
          ],
        ].map(([Icon, label, value], i) => {
          const I = Icon as typeof Tag;
          return (
            <div key={i}>
              <I />
              <span>
                <small>{String(label)}</small>
                <b>{String(value)}</b>
              </span>
            </div>
          );
        })}
      </div>
      <section className="ma-request-status">
        <h2>Request Status</h2>
        <div>
          <span className="is-active">
            <Send />
            <b>Submitted</b>
            <small>Nov 02, 10:35 AM</small>
          </span>
          <span>
            <Search />
            <b>
              Under
              <br />
              Verification
            </b>
          </span>
          <span>
            <Check />
            <b>
              Amount
              <br />
              Credited
            </b>
          </span>
        </div>
      </section>
      <p className="ma-notice ma-notice--info">
        <Info />
        The Maatram team will review your request and verify the bills. Once approved, the amount
        will be credited to your account.
      </p>
      <Forward to="/community/palm-plantation/chat">
        <Home />
        Back to Community
      </Forward>
    </Page>
  );
}
