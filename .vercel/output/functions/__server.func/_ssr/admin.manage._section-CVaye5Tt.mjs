import { o as __toESM } from "../_runtime.mjs";
import { _ as pendingActions, d as fillPercent } from "./admin-mock-D2qySwaK.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAdmin } from "./AdminState-BLwyIpVi.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as MessageCircle, O as Search, T as ShieldCheck, a as UsersRound, kt as Check } from "../_libs/lucide-react.mjs";
import { n as AdminFrame, o as PageHeader, r as Chip, s as Progress, u as categoryTone } from "./admin-ui-BN78hV-l.mjs";
import { t as additionalCommunities } from "./mock-DstdW3Hp.mjs";
import { n as sections, t as Route } from "./admin.manage._section-Bm0ZzbfH.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.manage._section-CVaye5Tt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var volunteers = [
	{
		name: "R. Sanjai",
		id: "MT4507",
		city: "Coimbatore",
		hours: 36,
		verified: true
	},
	{
		name: "Kaviya M",
		id: "MT4112",
		city: "Chennai",
		hours: 52,
		verified: true
	},
	{
		name: "Arun Kumar",
		id: "MT3981",
		city: "Madurai",
		hours: 18,
		verified: false
	},
	{
		name: "Divya S",
		id: "MT4620",
		city: "Erode",
		hours: 24,
		verified: true
	},
	{
		name: "Prakash V",
		id: "MT4733",
		city: "Salem",
		hours: 8,
		verified: false
	}
];
function Manage() {
	const { section } = Route.useParams();
	const s = sections[section];
	const { events, sent } = useAdmin();
	const [done, setDone] = (0, import_react.useState)([]);
	const [verified, setVerified] = (0, import_react.useState)([]);
	const [q, setQ] = (0, import_react.useState)("");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminFrame, {
		nav: s.nav,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				back: "/admin",
				title: s.title,
				sub: s.sub
			}),
			section === "events" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ad-event-list",
				children: events.map((e) => {
					const p = fillPercent(e.registered, e.needed);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "ad-card ad-row-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: e.image,
							alt: ""
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ad-event__chips",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									tone: categoryTone(e.category),
									children: e.category
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									tone: e.status === "Completed" ? "gray" : e.status === "Upcoming" ? "blue" : "green",
									children: e.status
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: e.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "ad-inline-meta",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {}),
									e.registered,
									" / ",
									e.needed,
									" registered · ",
									e.needed - e.registered,
									" slots open"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ad-progress-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: p }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [p, "%"] })]
							}),
							e.status !== "Completed" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/admin/pulse/targeting",
								search: { event: e.id },
								className: "ad-link",
								children: "Fill remaining slots →"
							})
						] })]
					}, e.id);
				})
			}),
			section === "communities" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-event-list",
				children: [events.filter((e) => e.status === "Live").map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "ad-card ad-row-card ad-row-card--plain",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ad-icon-circle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [
							e.name,
							" – ",
							e.fullLocation.split(",")[0]
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ad-hint",
							children: [
								"New community · ",
								e.registered,
								" members"
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
							tone: "green",
							children: "New"
						})
					]
				}, e.id)), additionalCommunities.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "ad-card ad-row-card ad-row-card--plain",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ad-icon-circle",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ad-hint",
							children: [
								c.category,
								" · ",
								c.members,
								" members · ",
								c.active
							]
						})] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/community/$communityId/chat",
							params: { communityId: c.id },
							className: "ad-round-btn",
							"aria-label": `Open ${c.name} chat`,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {})
						})
					]
				}, c.id))]
			}),
			section === "volunteers" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ad-search",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					className: "ad-search__box",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						value: q,
						onChange: (e) => setQ(e.target.value),
						placeholder: "Search volunteers by name, ID or city",
						"aria-label": "Search volunteers"
					})]
				})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ad-event-list",
				children: volunteers.filter((v) => [
					v.name,
					v.id,
					v.city
				].some((x) => x.toLowerCase().includes(q.toLowerCase()))).map((v) => {
					const ok = v.verified || verified.includes(v.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "ad-card ad-row-card ad-row-card--plain",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ad-icon-circle",
								children: v.name[0]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: v.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "ad-hint",
								children: [
									v.id,
									" · ",
									v.city,
									" · ",
									v.hours,
									" hrs"
								]
							})] }),
							ok ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								tone: "green",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 14 }), " Verified"]
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ad-btn ad-btn--primary ad-btn--sm",
								onClick: () => setVerified((o) => [...o, v.id]),
								children: "Verify"
							})
						]
					}, v.id);
				})
			})] }),
			section === "pending" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "ad-pending ad-card ad-block",
				children: pendingActions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", {
					id: p.id,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-pending__static",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ad-pending__text",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: p.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: p.sub })]
						}), done.includes(p.id) ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
							tone: "green",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 14 }), " Reviewed"]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ad-pill-count",
							children: p.count
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ad-btn ad-btn--primary ad-btn--sm",
							onClick: () => setDone((o) => [...o, p.id]),
							children: "Mark reviewed"
						})] })]
					})
				}, p.id))
			})
		]
	});
}
//#endregion
export { Manage as component };
