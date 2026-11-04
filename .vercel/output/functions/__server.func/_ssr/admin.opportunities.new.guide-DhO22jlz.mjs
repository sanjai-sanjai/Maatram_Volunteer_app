import { o as __toESM } from "../_runtime.mjs";
import { E as validateGuide } from "./admin-mock-D2qySwaK.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAdmin } from "./AdminState-BLwyIpVi.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ft as CalendarClock, Jt as ArrowRight, M as Plus, P as Phone, St as ClipboardList, Vt as BookOpen, W as Mail, Yt as ArrowLeft, a as UsersRound, c as UserRound, g as Target, h as Trash2 } from "../_libs/lucide-react.mjs";
import { c as SectionHead, l as WizardHeader, n as AdminFrame } from "./admin-ui-BN78hV-l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.opportunities.new.guide-DhO22jlz.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var clipboard_default = "/assets/clipboard-Bw9ZWTmf.png";
function EventGuide() {
	const { draft, update } = useAdmin();
	const navigate = useNavigate();
	const [errors, setErrors] = (0, import_react.useState)({});
	const next = () => {
		const e = validateGuide(draft);
		setErrors(e);
		if (Object.keys(e).length) return;
		navigate({ to: "/admin/opportunities/new/review" });
	};
	const setRow = (i, patch) => update({ schedule: draft.schedule.map((s, j) => j === i ? {
		...s,
		...patch
	} : s) });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WizardHeader, {
			step: 2,
			onStep: (to) => navigate({ to })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "ad-card ad-form",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}),
				title: "Event Guide",
				sub: "Provide complete details so volunteers are well prepared.",
				art: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: clipboard_default,
					alt: "",
					className: "ad-section-head__art",
					width: 816,
					height: 816
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-form__body ad-guide",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {}),
						label: "Purpose of the Event",
						value: draft.purpose,
						onChange: (v) => update({ purpose: v }),
						error: errors.purpose
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {}),
						label: "Volunteer Responsibilities",
						value: draft.responsibilities,
						onChange: (v) => update({ responsibilities: v }),
						error: errors.responsibilities
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Area, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {}),
						label: "Preparation Requirements",
						value: draft.preparation,
						onChange: (v) => update({ preparation: v }),
						error: errors.preparation
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-gfield",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ad-icon-circle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarClock, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ad-gfield__main",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ad-field__label",
									children: ["Schedule ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "*" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ad-schedule",
									children: [draft.schedule.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ad-schedule__row",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: i === 0 ? "first" : "" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "ad-schedule__time",
												"aria-label": "Time",
												value: s.time,
												onChange: (e) => setRow(i, { time: e.target.value })
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												className: "ad-schedule__label",
												"aria-label": "Activity",
												value: s.label,
												onChange: (e) => setRow(i, { label: e.target.value })
											}),
											draft.schedule.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												"aria-label": "Remove row",
												onClick: () => update({ schedule: draft.schedule.filter((_, j) => j !== i) }),
												children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trash2, { size: 16 })
											})
										]
									}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "ad-mini-btn",
										onClick: () => update({ schedule: [...draft.schedule, {
											time: "",
											label: ""
										}] }),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, { size: 14 }), " Add time slot"]
									})]
								}),
								errors.schedule && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ad-error",
									children: errors.schedule
								})
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-gfield",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ad-icon-circle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ad-gfield__main",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ad-field__label",
									children: ["Contact Details ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "*" })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ad-contact",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ad-contact__row",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, { size: 18 }) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												"aria-label": "Coordinator name",
												value: draft.contactName,
												onChange: (e) => update({ contactName: e.target.value }),
												className: "strong"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												"aria-label": "Role",
												value: draft.contactRole,
												onChange: (e) => update({ contactRole: e.target.value })
											})
										]
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ad-contact__split",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "ad-contact__row",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, { size: 18 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												"aria-label": "Phone",
												value: draft.phone,
												onChange: (e) => update({ phone: e.target.value })
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "ad-contact__row",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, { size: 18 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												"aria-label": "Email",
												type: "email",
												value: draft.email,
												onChange: (e) => update({ email: e.target.value })
											})]
										})]
									})]
								}),
								errors.contact && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ad-error",
									children: errors.contact
								})
							]
						})]
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ad-sticky-actions ad-sticky-actions--two",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "ad-btn ad-btn--ghost",
				onClick: () => navigate({ to: "/admin/opportunities/new" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {}), " Back: Event Details"]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "ad-btn ad-btn--primary",
				onClick: next,
				children: ["Next: Review & Publish ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
			})]
		})
	] });
}
function Area({ icon, label, value, onChange, error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ad-gfield",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ad-icon-circle",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "ad-gfield__main",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ad-field__label",
					children: [
						label,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "*" })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ad-area",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
						rows: 3,
						maxLength: 200,
						value,
						onChange: (e) => onChange(e.target.value)
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [value.length, " / 200"] })]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ad-error",
					children: error
				})
			]
		})]
	});
}
//#endregion
export { EventGuide as component };
