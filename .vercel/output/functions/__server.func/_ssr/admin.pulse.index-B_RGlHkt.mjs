import { o as __toESM } from "../_runtime.mjs";
import { d as fillPercent, u as eventTypes } from "./admin-mock-D2qySwaK.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAdmin } from "./AdminState-BLwyIpVi.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { A as Radio, H as Megaphone, O as Search, Pt as CalendarDays, U as MapPin, a as UsersRound, mt as EllipsisVertical, w as SlidersHorizontal } from "../_libs/lucide-react.mjs";
import { n as AdminFrame, o as PageHeader, r as Chip, s as Progress, u as categoryTone } from "./admin-ui-BN78hV-l.mjs";
import { t as megaphone_success_default } from "./megaphone-success-CaIQQqNe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.pulse.index-B_RGlHkt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var tabs = [
	"All Events",
	"Ongoing",
	"Upcoming",
	"Completed"
];
var statusTone = {
	Ongoing: "green",
	Upcoming: "blue",
	Completed: "gray",
	Live: "green"
};
function Pulse() {
	const { events } = useAdmin();
	const navigate = useNavigate();
	const [tab, setTab] = (0, import_react.useState)("All Events");
	const [q, setQ] = (0, import_react.useState)("");
	const [filterOpen, setFilterOpen] = (0, import_react.useState)(false);
	const [cats, setCats] = (0, import_react.useState)([]);
	const [menu, setMenu] = (0, import_react.useState)(null);
	const counts = {
		"All Events": 12 + events.filter((e) => e.status === "Live").length,
		Ongoing: 5 + events.filter((e) => e.status === "Live").length,
		Upcoming: 4,
		Completed: 3
	};
	const list = (0, import_react.useMemo)(() => events.filter((e) => {
		const st = e.status === "Live" ? "Ongoing" : e.status;
		if (tab !== "All Events" && st !== tab) return false;
		if (cats.length && !cats.includes(e.category)) return false;
		const s = q.trim().toLowerCase();
		return !s || [
			e.name,
			e.location,
			e.category,
			...e.tags
		].some((v) => v.toLowerCase().includes(s));
	}), [
		events,
		tab,
		q,
		cats
	]);
	const go = (id) => navigate({
		to: "/admin/pulse/targeting",
		search: { event: id }
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminFrame, {
		nav: "Events",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				back: "/admin",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {}),
				title: "Pulse – Event Broadcasting",
				sub: "Select an event and start sending announcements to the right volunteers."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ad-banner",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ad-icon-circle ad-icon-circle--solid",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Smart Event Broadcasting" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Choose an event below to send targeted announcements and invite volunteers to join." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: megaphone_success_default,
						alt: "",
						className: "ad-banner__art",
						width: 1024,
						height: 1024
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ad-tabs",
				role: "tablist",
				children: tabs.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					role: "tab",
					"aria-selected": tab === t,
					className: tab === t ? "active" : "",
					onClick: () => setTab(t),
					children: [
						t,
						" (",
						counts[t],
						")"
					]
				}, t))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-search",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ad-search__box",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: q,
							onChange: (e) => setQ(e.target.value),
							placeholder: "Search events by name, location or tag...",
							"aria-label": "Search events"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: `ad-search__filter ${cats.length ? "on" : ""}`,
						"aria-label": "Filter events",
						"aria-expanded": filterOpen,
						onClick: () => setFilterOpen((o) => !o),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {}), cats.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: cats.length })]
					}),
					filterOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-popover ad-popover--filter",
						role: "dialog",
						"aria-label": "Filter by category",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ad-popover__head",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Category" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "ad-link",
									onClick: () => setCats([]),
									children: "Clear"
								})]
							}),
							eventTypes.map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ad-check",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "checkbox",
									checked: cats.includes(c),
									onChange: () => setCats((o) => o.includes(c) ? o.filter((x) => x !== c) : [...o, c])
								}), c]
							}, c)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ad-btn ad-btn--primary ad-btn--sm",
								onClick: () => setFilterOpen(false),
								children: "Apply"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-event-list",
				children: [list.map((e) => {
					const pct = fillPercent(e.registered, e.needed);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "ad-card ad-event",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: e.image,
								alt: ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ad-event__body",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ad-event__chips",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											tone: categoryTone(e.category),
											children: e.category
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
											tone: statusTone[e.status],
											children: e.status
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: e.name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "ad-inline-meta",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}), e.date]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "ad-inline-meta",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), e.location]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "ad-inline-meta",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: e.registered }),
											"\xA0/ ",
											e.needed,
											" Volunteers"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ad-progress-row",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: pct }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [pct, "% Filled"] })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ad-event__side",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										className: "ad-kebab",
										"aria-label": `More options for ${e.name}`,
										onClick: () => setMenu(menu === e.id ? null : e.id),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, {})
									}),
									menu === e.id && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ad-popover ad-popover--menu",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => go(e.id),
												children: "Start broadcasting"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => navigate({
													to: "/admin/manage/$section",
													params: { section: "events" }
												}),
												children: "Track registrations"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												type: "button",
												onClick: () => setMenu(null),
												children: "Close"
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
										type: "button",
										className: "ad-btn ad-btn--primary ad-btn--sm",
										disabled: e.status === "Completed",
										onClick: () => go(e.id),
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, { size: 18 }), " Start Broadcasting"]
									})
								]
							})
						]
					}, e.id);
				}), !list.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ad-empty",
					children: "No events match your search or filters."
				})]
			})
		]
	});
}
//#endregion
export { Pulse as component };
