import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Pencil, Pt as CalendarDays, Tt as CircleCheck, U as MapPin, Vt as BookOpen, Yt as ArrowLeft, a as UsersRound, bt as Clock, i as Users, jt as ChartNoAxesColumnIncreasing, tt as House } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin-ui-BN78hV-l.js
var import_jsx_runtime = require_jsx_runtime();
function AdminFrame({ children, nav, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ad-shell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: `ad-page ${nav ? "ad-page--nav" : ""} ${className}`,
			children: [children, nav && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBottomNav, { active: nav })]
		})
	});
}
function AdminBack({ to }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "ad-round-btn",
		"aria-label": "Go back",
		onClick: () => to ? router.navigate({ to }) : router.history.back(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 24 })
	});
}
function PageHeader({ title, sub, back, icon, right }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "ad-header",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBack, { to: back }),
			icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ad-header__icon",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-header__text",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: title }), sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: sub })]
			}),
			right
		]
	});
}
var navItems = [
	{
		label: "Home",
		to: "/admin",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {})
	},
	{
		label: "Events",
		to: "/admin/manage/$section",
		params: { section: "events" },
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {})
	},
	{
		label: "Communities",
		to: "/admin/manage/$section",
		params: { section: "communities" },
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {})
	},
	{
		label: "Volunteers",
		to: "/admin/volunteers",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {})
	},
	{
		label: "Reports",
		to: "/admin/reports",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumnIncreasing, {})
	}
];
function AdminBottomNav({ active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "ad-bottom-nav",
		"aria-label": "Admin navigation",
		children: navItems.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			..."params" in i ? {
				to: i.to,
				params: i.params
			} : { to: i.to },
			activeOptions: { exact: true },
			className: "ad-bottom-nav__item",
			"aria-current": active === i.label ? "page" : void 0,
			children: [i.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i.label })]
		}, i.label))
	});
}
var steps = [
	{
		label: "Event Details",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}),
		to: "/admin/opportunities/new"
	},
	{
		label: "Event Guide",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}),
		to: "/admin/opportunities/new/guide"
	},
	{
		label: "Review & Publish",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}),
		to: "/admin/opportunities/new/review"
	}
];
function WizardHeader({ step, onStep }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "ad-header",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBack, { to: step === 1 ? "/admin" : steps[step - 2].to }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-header__text",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Create Opportunity" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Add a new volunteering event" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-step-count",
				"aria-label": `Step ${step} of 3`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [step, " / 3"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ad-step-count__track",
					children: [
						1,
						2,
						3
					].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: n < step ? "done" : n === step ? "active" : "" }, n))
				})]
			})
		]
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ad-steps",
		children: steps.map((s, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: `ad-steps__item ${i + 1 === step ? "active" : ""}`,
			disabled: i + 1 > step,
			onClick: () => onStep?.(s.to),
			children: [s.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: s.label })]
		}, s.label))
	})] });
}
function SectionHead({ icon, title, sub, art, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ad-section-head",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ad-icon-tile ad-icon-tile--lg",
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }), sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: sub })] }),
			art,
			children
		]
	});
}
function Chip({ children, tone = "yellow" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: `ad-chip ad-chip--${tone}`,
		children
	});
}
function categoryTone(c) {
	return c === "Community Service" ? "purple" : c === "Environment" ? "mint" : c === "Event Support" ? "purple" : "yellow";
}
function EventSummaryCard({ ev, onEdit, badge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "ad-card ad-summary",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: ev.image,
			alt: ev.name,
			className: "ad-summary__img"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ad-summary__body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ad-summary__top",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: categoryTone(ev.category),
							children: ev.category
						}),
						onEdit && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EditBtn, { onClick: onEdit }),
						badge
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: ev.name }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
					className: "ad-meta-list",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), ev.fullLocation] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}), ev.date] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {}), ev.time] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
							ev.needed,
							" Volunteers Needed"
						] })
					]
				})
			]
		})]
	});
}
function EditBtn({ onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: "ad-edit-btn",
		onClick,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 18 }), " Edit"]
	});
}
function Progress({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ad-progress",
		role: "progressbar",
		"aria-valuenow": value,
		"aria-valuemin": 0,
		"aria-valuemax": 100,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${Math.min(100, value)}%` } })
	});
}
//#endregion
export { EventSummaryCard as a, SectionHead as c, EditBtn as i, WizardHeader as l, AdminFrame as n, PageHeader as o, Chip as r, Progress as s, AdminBack as t, categoryTone as u };
