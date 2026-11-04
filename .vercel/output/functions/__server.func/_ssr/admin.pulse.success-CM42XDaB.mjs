import { o as __toESM } from "../_runtime.mjs";
import { A as volunteer_portrait_04_default, D as volunteer_portrait_01_default, O as volunteer_portrait_02_default, k as volunteer_portrait_03_default, v as recipientsFor } from "./admin-mock-D2qySwaK.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAdmin, r as useAdminEvent } from "./AdminState-BLwyIpVi.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Send, Ht as Bell, Pt as CalendarDays, St as ClipboardList, Tt as CircleCheck, U as MapPin, a as UsersRound, kt as Check } from "../_libs/lucide-react.mjs";
import { n as AdminFrame, r as Chip, s as Progress, t as AdminBack, u as categoryTone } from "./admin-ui-BN78hV-l.mjs";
import { t as Route } from "./admin.pulse.success-DKe9nSwG.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.pulse.success-CM42XDaB.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Sent() {
	const { event, tier } = Route.useSearch();
	const ev = useAdminEvent(event);
	const { recordSent } = useAdmin();
	const count = recipientsFor(tier);
	const [pct, setPct] = (0, import_react.useState)(0);
	const done = pct >= 100;
	const recorded = (0, import_react.useRef)(false);
	(0, import_react.useEffect)(() => {
		const id = window.setInterval(() => setPct((p) => Math.min(100, p + 4)), 70);
		return () => window.clearInterval(id);
	}, []);
	(0, import_react.useEffect)(() => {
		if (done && !recorded.current) {
			recorded.current = true;
			recordSent({
				eventId: ev.id,
				tier,
				count
			});
		}
	}, [done]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminFrame, {
		className: "ad-page--success",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
				className: "ad-header",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBack, { to: "/admin/pulse" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-sending",
				children: [[
					volunteer_portrait_01_default,
					volunteer_portrait_02_default,
					volunteer_portrait_03_default,
					volunteer_portrait_04_default
				].map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: `ad-sending__p ad-sending__p--${i + 1} ${done ? "ok" : ""}`,
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: p,
						alt: ""
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { size: 12 }) })]
				}, i)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ad-phone",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ad-phone__notch" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { className: `ad-phone__plane ${done ? "" : "flying"}` }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: done ? "Announcement Sent" : "Sending Announcement..." })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-send-progress",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: pct }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
					"Sending to ",
					count.toLocaleString("en-IN"),
					" volunteers..."
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [pct, "%"] })] })]
			}),
			done ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ad-success-badge",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "ad-big-title",
					children: ["Announcement Sent Successfully! ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						children: "🎉"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "ad-big-sub",
					children: [
						"Your volunteering opportunity has been shared with",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: count.toLocaleString("en-IN") }),
						" selected volunteers (Tier ",
						tier,
						")."
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "ad-card ad-sent-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: ev.image,
							alt: ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								tone: categoryTone(ev.category),
								children: ev.category
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: ev.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "ad-inline-meta",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}), ev.date]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "ad-inline-meta",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), ev.fullLocation]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ad-chip ad-chip--green ad-sent-card__chip",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 14 }), " Announcement Sent"]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "ad-next",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "What’s Next?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {}) }), "Volunteers will receive a notification."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {}) }), "They can view the event and register."] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {}) }), "Track registrations and fill remaining slots."] })
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ad-sticky-actions ad-sticky-actions--two",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/manage/$section",
						params: { section: "communities" },
						className: "ad-btn ad-btn--ghost",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {}), " View Community"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/manage/$section",
						params: { section: "events" },
						className: "ad-btn ad-btn--primary",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {}), " Track Registrations"]
					})]
				})
			] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "ad-big-sub",
				role: "status",
				children: [
					"Delivering your announcement to Tier ",
					tier,
					" volunteers…"
				]
			})
		]
	});
}
//#endregion
export { Sent as component };
