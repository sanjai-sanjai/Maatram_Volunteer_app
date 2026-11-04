import { o as __toESM } from "../_runtime.mjs";
import { E as validateGuide, T as validateDetails } from "./admin-mock-D2qySwaK.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAdmin } from "./AdminState-BLwyIpVi.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Pencil, H as Megaphone, P as Phone, Pt as CalendarDays, St as ClipboardList, Vt as BookOpen, a as UsersRound, b as SquareCheckBig, ct as FileText, g as Target, t as X } from "../_libs/lucide-react.mjs";
import { a as EventSummaryCard, c as SectionHead, i as EditBtn, l as WizardHeader, n as AdminFrame } from "./admin-ui-BN78hV-l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.opportunities.new.review-5mPZZEa5.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var firstLine = (t) => t.split("\n").map((l) => l.replace(/^•\s*/, "").replace(/\.$/, "")).join(", ");
function Review() {
	const { draft, update, publish } = useAdmin();
	const navigate = useNavigate();
	const [editing, setEditing] = (0, import_react.useState)(null);
	const [community, setCommunity] = (0, import_react.useState)("A dedicated group for communication, updates, attendance, proofs and coordination of this event.");
	const [problem, setProblem] = (0, import_react.useState)("");
	const city = draft.location.split(",")[0];
	const sched = draft.schedule[0] ? `${draft.schedule[0].time.replace(/^0/, "")} – ${draft.schedule[draft.schedule.length - 1].time.replace(/^0/, "")}` : draft.time;
	const doPublish = () => {
		const missing = {
			...validateDetails(draft),
			...validateGuide(draft)
		};
		if (Object.keys(missing).length) {
			setProblem(Object.values(missing)[0] ?? "");
			return;
		}
		publish();
		navigate({ to: "/admin/opportunities/published" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WizardHeader, {
			step: 3,
			onStep: (to) => navigate({ to })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "ad-review-head",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SquareCheckBig, {}),
				title: "Review & Publish",
				sub: "Please review all the details before publishing the opportunity."
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventSummaryCard, {
			ev: {
				name: draft.name,
				category: draft.type,
				fullLocation: draft.location,
				date: draft.date,
				time: draft.time,
				needed: draft.volunteers,
				image: draft.image ?? ""
			},
			onEdit: () => setEditing("summary")
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "ad-card ad-rsec",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-rsec__head",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ad-icon-circle",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Event Description" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditBtn, { onClick: () => navigate({
						to: "/admin/opportunities/new",
						hash: "description"
					}) })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: draft.description })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "ad-card ad-rsec",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-rsec__head",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ad-icon-circle",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Event Guide" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditBtn, { onClick: () => navigate({ to: "/admin/opportunities/new/guide" }) })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-guide-grid",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Purpose" }), draft.purpose] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Responsibilities" }), firstLine(draft.responsibilities)] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Preparation Requirements" }), firstLine(draft.preparation)] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Schedule" }),
						sched,
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"(",
						draft.schedule.slice(0, 3).map((s) => s.label.split(" ")[0]).join(", "),
						")"
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "wide",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Contact Details" }),
							draft.contactName,
							" (",
							draft.contactRole,
							") \xA0|\xA0 ",
							draft.phone,
							" \xA0|\xA0",
							" ",
							draft.email
						] })]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "ad-card ad-rsec",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ad-rsec__head",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ad-icon-circle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Community" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditBtn, { onClick: () => setEditing("community") })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [
					draft.name,
					" – ",
					city
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ad-navy",
					children: community
				})
			]
		}),
		problem && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "ad-error ad-error--box",
			role: "alert",
			children: problem
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ad-sticky-actions ad-sticky-actions--two",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "ad-btn ad-btn--ghost",
				onClick: () => navigate({ to: "/admin/opportunities/new" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), " Edit Details"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "ad-btn ad-btn--primary",
				onClick: doPublish,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, {}), " Publish Opportunity"]
			})]
		}),
		editing && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "ad-modal",
			role: "dialog",
			"aria-label": "Edit",
			onClick: () => setEditing(null),
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-modal__panel",
				onClick: (e) => e.stopPropagation(),
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-modal__head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: editing === "summary" ? "Edit Event Summary" : "Edit Community" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ad-round-btn",
							"aria-label": "Close",
							onClick: () => setEditing(null),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						})]
					}),
					editing === "summary" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-modal__form",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Event Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ad-input",
								value: draft.name,
								onChange: (e) => update({ name: e.target.value })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Location", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ad-input",
								value: draft.location,
								onChange: (e) => update({ location: e.target.value })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Date", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ad-input",
								value: draft.date,
								onChange: (e) => update({ date: e.target.value })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Time", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ad-input",
								value: draft.time,
								onChange: (e) => update({ time: e.target.value })
							})] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Volunteers Needed", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ad-input",
								type: "number",
								min: 5,
								max: 50,
								value: draft.volunteers,
								onChange: (e) => update({ volunteers: Math.max(5, Math.min(50, Number(e.target.value) || 5)) })
							})] })
						]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ad-modal__form",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Community description", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							className: "ad-input",
							rows: 4,
							value: community,
							onChange: (e) => setCommunity(e.target.value)
						})] })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ad-btn ad-btn--primary ad-btn--wide",
						onClick: () => setEditing(null),
						children: "Save changes"
					})
				]
			})
		})
	] });
}
//#endregion
export { Review as component };
