import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAdmin, r as useAdminEvent } from "./AdminState-BLwyIpVi.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { E as Share2, H as Megaphone, a as UsersRound, dt as Eye, jt as ChartNoAxesColumnIncreasing, t as X } from "../_libs/lucide-react.mjs";
import { a as EventSummaryCard, n as AdminFrame, o as PageHeader } from "./admin-ui-BN78hV-l.mjs";
import { t as megaphone_success_default } from "./megaphone-success-CaIQQqNe.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.opportunities.published-CKeYlpuy.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Published() {
	const { published, draft, resetDraft } = useAdmin();
	const fallback = useAdminEvent("palm-seeds");
	const ev = published ?? fallback;
	const navigate = useNavigate();
	const [preview, setPreview] = (0, import_react.useState)(false);
	const [note, setNote] = (0, import_react.useState)("");
	const share = async () => {
		const text = `Join "${ev.name}" on ${ev.date} at ${ev.fullLocation} with Maatram Foundation!`;
		try {
			if (navigator.share) await navigator.share({
				title: ev.name,
				text
			});
			else {
				await navigator.clipboard.writeText(text);
				setNote("Event details copied to clipboard.");
			}
		} catch {
			setNote("Sharing was cancelled.");
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminFrame, {
		className: "ad-page--success",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				back: "/admin",
				title: "Opportunity Published",
				sub: "Your volunteering event is now live!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-hero-art",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ad-hills",
					"aria-hidden": true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: megaphone_success_default,
					alt: "Published",
					width: 1024,
					height: 1024
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "ad-big-title",
				children: "Opportunity Published!"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ad-big-sub",
				children: "The event has been successfully created and is now live for volunteers to join."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EventSummaryCard, {
				ev,
				badge: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ad-chip ad-chip--live",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), "Live"]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-shortcuts",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setPreview(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {}) }), "View Event"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: share,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {}) }), "Share"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/manage/$section",
						params: { section: "communities" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {}) }), "View Community"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/manage/$section",
						params: { section: "events" },
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumnIncreasing, {}) }), "Track Registrations"]
					})
				]
			}),
			note && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "ad-hint ad-center",
				role: "status",
				children: note
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-green-note",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"Volunteers can now discover ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "and" }),
					" register for this opportunity."
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "ad-btn ad-btn--primary ad-btn--wide",
				onClick: () => {
					resetDraft();
					navigate({
						to: "/admin/pulse/targeting",
						search: { event: ev.id }
					});
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, {}), " Send Announcement"]
			}),
			preview && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ad-modal",
				role: "dialog",
				"aria-label": "Event preview",
				onClick: () => setPreview(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ad-modal__panel",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ad-modal__head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Volunteer view" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								className: "ad-round-btn",
								"aria-label": "Close",
								onClick: () => setPreview(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: ev.image,
							alt: "",
							className: "ad-preview-img"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: ev.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ad-navy",
							children: [
								ev.fullLocation,
								" · ",
								ev.date,
								" · ",
								ev.time
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: published ? draft.description : "Join fellow volunteers to plant palm seeds and restore green cover." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ad-hint",
							children: [
								ev.registered,
								" of ",
								ev.needed,
								" volunteers registered"
							]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { Published as component };
