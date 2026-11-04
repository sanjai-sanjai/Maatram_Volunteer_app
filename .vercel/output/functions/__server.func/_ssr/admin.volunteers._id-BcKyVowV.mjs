import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as Send, F as Pencil, Gt as BadgeCheck, Jt as ArrowRight, Pt as CalendarDays, Tt as CircleCheck, U as MapPin, Z as Info, a as UsersRound, at as GraduationCap, bt as Clock, c as UserRound, ct as FileText, dt as Eye, gt as Crown, mt as EllipsisVertical, x as Sprout } from "../_libs/lucide-react.mjs";
import { t as Route } from "./admin.volunteers._id-C9MwR32-.mjs";
import { d as StatusBadge, f as Toast, h as VolunteerFrame, n as BackButton, t as ActivityItem, x as useApproved, y as WorkIcon } from "./volunteers-DcsKbkG3.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.volunteers._id-BcKyVowV.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var TABS = [
	"Overview",
	"Activity History",
	"Availability",
	"Documents"
];
function Profile() {
	const v = Route.useLoaderData();
	const approved = useApproved();
	const verified = !v.pending || approved.includes(v.id);
	const [tab, setTab] = (0, import_react.useState)("Overview");
	const [toast, setToast] = (0, import_react.useState)("");
	const [tier, setTier] = (0, import_react.useState)(v.tier);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VolunteerFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "vl-phead",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackButton, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Volunteer Profile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Volunteer details and engagement" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "vl-more",
					"aria-label": "More options",
					onClick: () => setToast("More options coming soon"),
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, {})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "vl-card vl-summary",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: v.photo,
					alt: v.name,
					className: "vl-summary__img"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "vl-summary__body",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "vl-idtag",
							children: ["ID: ", v.id]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
							v.name,
							" ",
							verified ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { kind: "verified" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { kind: "pending" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "vl-tierpill",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, {}),
								" ",
								tier
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {}), v.status] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [v.status === "Student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkIcon, { s: v.status }), v.org] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), v.location] })
						] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "vl-stats",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, { className: "vl-green" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: v.activities }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Volunteering Activities" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { className: "vl-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: v.events }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Events Attended" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { className: "vl-gold" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [v.hours, " hrs"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Total Service Time" })
						] })
					]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "vl-pbtns",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "vl-btn vl-btn--primary",
					onClick: () => setToast(`Announcement sent to ${v.name}`),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}), " Send Announcement"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "vl-btn vl-btn--ghost",
					onClick: () => {
						const n = tier.startsWith("Tier 1") ? "Tier 2 Volunteer" : "Tier 1 Volunteer";
						setTier(n);
						setToast(`Changed to ${n}`);
					},
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BadgeCheck, {}), " Change Tier"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					className: "vl-btn vl-btn--ghost",
					onClick: () => setToast("Editing is not available in this preview"),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), " Edit Details"]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "vl-tabs",
			role: "tablist",
			children: TABS.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				role: "tab",
				"aria-selected": tab === t,
				className: tab === t ? "is-on" : "",
				onClick: () => setTab(t),
				children: t
			}, t))
		}),
		tab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "vl-card vl-sec",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vl-sec__head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "vl-tile",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "About" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "vl-ink",
					children: v.about
				})] })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vl-facts",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "vl-tile vl-tile--sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Joined On" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: v.joined })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "vl-tile vl-tile--sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Volunteer Type" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: v.status === "Student" ? "Student Volunteer" : "Other Volunteer" })] })] })]
			})]
		}),
		tab === "Activity History" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "vl-card vl-sec",
			children: v.recent.length ? v.recent.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityItem, { a }, a.name)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "vl-empty",
				children: "No activities yet."
			})
		}),
		tab === "Availability" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "vl-card vl-sec",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vl-facts",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "vl-tile vl-tile--sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Preferred days" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: v.availability })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "vl-tile vl-tile--sm",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Preferred area" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: v.location })] })] })]
			})
		}),
		tab === "Documents" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
			className: "vl-card vl-sec",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vl-doc",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "vl-tile vl-tile--sm",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: v.idDoc.type }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["ID Proof • ", v.idDoc.size] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "vl-green" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "vl-btn vl-btn--ghost vl-btn--sm",
						onClick: () => setToast(`Opening ${v.idDoc.type}`),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {}), " View"]
					})
				]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "vl-card vl-sec",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vl-sec__head vl-sec__head--row",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "vl-tile",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Recent Volunteer Activities" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "vl-viewall",
						onClick: () => setTab("Activity History"),
						children: ["View All ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
					})
				]
			}), v.recent.length ? v.recent.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ActivityItem, { a }, a.name)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "vl-empty",
				children: "No activities yet."
			})]
		}),
		toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, {
			text: toast,
			onDone: () => setToast("")
		})
	] });
}
//#endregion
export { Profile as component };
