import { o as __toESM } from "../_runtime.mjs";
import { i as audienceTiers, p as matchingInsights, v as recipientsFor, w as totalMatches } from "./admin-mock-D2qySwaK.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as useAdminEvent } from "./AdminState-BLwyIpVi.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Send, H as Megaphone, It as CalendarCheck, S as Sparkles, Tt as CircleCheck, U as MapPin, Z as Info, a as UsersRound, g as Target, kt as Check, u as UserRoundCheck } from "../_libs/lucide-react.mjs";
import { a as EventSummaryCard, n as AdminFrame, o as PageHeader } from "./admin-ui-BN78hV-l.mjs";
import { t as Route } from "./admin.pulse.targeting-CAxg9LCk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.pulse.targeting-C5P3ZlP3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var target_default = "/assets/target-CaVT6dZ5.png";
var fmt = (n) => n.toLocaleString("en-IN");
function Targeting() {
	const { event } = Route.useSearch();
	const ev = useAdminEvent(event);
	const navigate = useNavigate();
	const [tier, setTier] = (0, import_react.useState)(1);
	const count = recipientsFor(tier);
	const insights = [
		{
			label: "Location Match",
			sub: "Volunteers in or near Chennai",
			v: matchingInsights.location,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {})
		},
		{
			label: "Similar Event Experience",
			sub: "Attended similar events",
			v: matchingInsights.experience,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {})
		},
		{
			label: "Availability Match",
			sub: "Available on Nov 02, 2026",
			v: matchingInsights.availability,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, {})
		},
		{
			label: "Overall Relevance",
			sub: "High chance of interest",
			v: matchingInsights.relevance,
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {}),
			green: true
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			back: "/admin/pulse",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, {}),
			title: "Smart Volunteering Announcement",
			sub: "Reach the right volunteers, faster and smarter."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "ad-banner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ad-icon-circle ad-icon-circle--solid",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "AI-Powered Volunteer Targeting" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Volunteers are grouped by location, past participation and availability." })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: target_default,
					alt: "",
					className: "ad-banner__art",
					width: 816,
					height: 816
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventSummaryCard, { ev }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "ad-card ad-block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-block__row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "ad-block__title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "ad-sparkle" }), " Matching Insights"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {
					size: 18,
					className: "ad-muted"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ad-insights",
				children: insights.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: `ad-insight ${i.green ? "green" : ""}`,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ad-icon-circle",
							children: i.icon
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: i.label }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: i.sub }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [i.v, "%"] })
					]
				}, i.label))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "ad-card ad-block",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-block__row",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "ad-block__title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRoundCheck, {}), " Select Audience Tier"]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ad-chip ad-chip--yellow",
					children: ["Total Matches: ", fmt(totalMatches())]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ad-tiers",
				role: "radiogroup",
				"aria-label": "Audience tier",
				children: audienceTiers.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "radio",
					"aria-checked": tier === t.tier,
					className: `ad-tier ${tier === t.tier ? "on" : ""}`,
					onClick: () => setTier(t.tier),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ad-tier__radio",
							children: tier === t.tier && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 16 })
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ad-tier__text",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: ["Tier ", t.tier] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: t.label })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ad-tier__count",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: fmt(t.count) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Volunteers" })]
						})
					]
				}, t.tier))
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ad-confirm",
			role: "status",
			"aria-live": "polite",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ad-icon-circle ad-icon-circle--solid",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
				"You are about to send an announcement to",
				" ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
					fmt(count),
					" volunteers (Tier ",
					tier,
					")"
				] }),
				" ",
				"for ",
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: ev.name }),
				"."
			] })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
			type: "button",
			className: "ad-btn ad-btn--primary ad-btn--wide",
			onClick: () => navigate({
				to: "/admin/pulse/success",
				search: {
					event: ev.id,
					tier
				}
			}),
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}), " Send Announcement"]
		})
	] });
}
//#endregion
export { Targeting as component };
