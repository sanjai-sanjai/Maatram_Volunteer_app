import { o as __toESM } from "../_runtime.mjs";
import { _ as pendingActions, d as fillPercent, n as adminStats } from "./admin-mock-D2qySwaK.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAdmin } from "./AdminState-BLwyIpVi.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as maatram_logo_full_default, t as admin_profile_avatar_default } from "./admin-profile-avatar-Cks5CCdP.mjs";
import { $ as Image, A as Radio, Et as ChevronRight, G as LogOut, Ht as Bell, Jt as ArrowRight, M as Plus, Pt as CalendarDays, Q as IndianRupee, T as ShieldCheck, U as MapPin, V as Menu, a as UsersRound, d as UserCheck, gt as Crown, jt as ChartNoAxesColumnIncreasing, l as UserPlus, nt as Hourglass, qt as ArrowUp, t as X } from "../_libs/lucide-react.mjs";
import { n as AdminFrame, r as Chip, s as Progress } from "./admin-ui-BN78hV-l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.index-D-dGE0HC.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var analytics_3d_icon_default = "/assets/analytics-3d-icon-CBCzZc3i.png";
var pendingIcons = {
	image: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {}),
	rupee: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IndianRupee, {}),
	attendance: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserCheck, {}),
	profile: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, {})
};
function AdminDashboard() {
	const { events, published, sent } = useAdmin();
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [bell, setBell] = (0, import_react.useState)(false);
	const ongoing = events.find((e) => e.id === "palm-seeds");
	const pct = fillPercent(ongoing.registered, ongoing.needed);
	const notes = [
		...published ? [`“${published.name}” is live for volunteers`] : [],
		...sent.map((s) => `Announcement sent to ${s.count.toLocaleString("en-IN")} volunteers`),
		"8 new proofs uploaded for Palm Seeds Plantation",
		"3 fund requests are waiting for approval",
		"Book Donation Drive opens registrations on Nov 10"
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminFrame, {
		nav: "Home",
		className: "ad-page--wide",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "ad-dash-head",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ad-round-btn",
						"aria-label": "Open menu",
						onClick: () => setMenu(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "ad-dash-head__logo",
						src: maatram_logo_full_default,
						alt: "Maatram Foundation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-dash-head__text",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Maatram Foundation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Admin Dashboard" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "ad-round-btn ad-bell",
						"aria-label": "Notifications",
						"aria-expanded": bell,
						onClick: () => setBell((b) => !b),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "ad-avatar",
						"aria-label": "Admin profile menu",
						onClick: () => setMenu(true),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: admin_profile_avatar_default,
							alt: ""
						})
					}),
					bell && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-popover ad-popover--notes",
						role: "dialog",
						"aria-label": "Notifications",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ad-popover__head",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Notifications" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Close",
								onClick: () => setBell(false),
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
							})]
						}), notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 16 }), n] }, n))]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ad-welcome",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ad-welcome__waves",
						"aria-hidden": true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
							viewBox: "0 0 600 120",
							preserveAspectRatio: "none",
							focusable: "false",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "var(--ad-gold-soft)",
								d: "M0 120 L0 116 C110 114 200 102 300 78 C400 54 480 64 600 30 L600 120 Z"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								fill: "var(--ad-gold-deep)",
								d: "M0 120 L0 120 C130 118 230 112 330 96 C430 80 520 88 600 62 L600 120 Z"
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-welcome__text",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ad-welcome__row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ad-welcome__badge",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, {})
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: ["Welcome back, Admin! ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									"aria-hidden": true,
									children: "👋"
								})] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Here’s the overview of today’s volunteering operations." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ad-welcome__rule",
								"aria-hidden": true
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "ad-welcome__art",
						src: analytics_3d_icon_default,
						alt: "",
						"aria-hidden": true
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ad-kpis",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/manage/$section",
						params: { section: "events" },
						className: "ad-kpi",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ad-icon-tile",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: adminStats.activeEvents }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Active Events" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								tone: "green",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { size: 14 }),
									" +",
									adminStats.newEventsWeek,
									" this week"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/volunteers",
						className: "ad-kpi",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ad-icon-tile",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: adminStats.registered }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Registered Volunteers" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								tone: "green",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowUp, { size: 14 }),
									" +",
									adminStats.newVolunteersWeek,
									" this week"
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/volunteers",
						className: "ad-kpi",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ad-icon-tile ad-icon-tile--green",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: adminStats.verified }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Verified Volunteers" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								tone: "blue",
								children: [Math.round(adminStats.verified / adminStats.registered * 100), "% of total"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/manage/$section",
						params: { section: "pending" },
						className: "ad-kpi",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ad-icon-tile",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hourglass, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: adminStats.pending }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Pending Actions" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
								tone: "yellow",
								children: "Needs Attention"
							})
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ad-card ad-block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "ad-block__title",
					children: "Quick Actions"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ad-quick",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/opportunities/new",
							className: "ad-quick__item active",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Create Opportunity" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/pulse",
							className: "ad-quick__item",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Radio, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Pulse" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "(Send Notification)" })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/manage/$section",
							params: { section: "communities" },
							className: "ad-quick__item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Manage Communities" })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/admin/reports",
							className: "ad-quick__item",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumnIncreasing, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "View Reports" })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ad-card ad-block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ad-block__row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "ad-block__title",
						children: "Ongoing Events"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/manage/$section",
						params: { section: "events" },
						className: "ad-link",
						children: ["View All ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					to: "/admin/manage/$section",
					params: { section: "events" },
					className: "ad-ongoing",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: ongoing.image,
							alt: ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ad-ongoing__body",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ad-ongoing__top",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: ongoing.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
										tone: "green",
										children: "In Progress"
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "ad-inline-meta",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}),
										"Chennai ",
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}),
										ongoing.date
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "ad-inline-meta",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {}),
										ongoing.registered,
										" / ",
										ongoing.needed,
										" Volunteers"
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ad-progress-row",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, { value: pct }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [pct, "% Filled"] })]
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "ad-chev" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ad-card ad-block",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ad-block__row",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "ad-block__title",
						children: ["Pending Actions ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ad-count-badge",
							children: adminStats.pending
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/manage/$section",
						params: { section: "pending" },
						className: "ad-link",
						children: ["View All ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "ad-pending",
					children: pendingActions.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/admin/manage/$section",
						params: { section: "pending" },
						hash: p.id,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ad-icon-circle",
								children: pendingIcons[p.icon]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ad-pending__text",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: p.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: p.sub })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ad-pill-count",
								children: p.count
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
						]
					}) }, p.id))
				})]
			}),
			menu && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ad-drawer",
				role: "dialog",
				"aria-label": "Admin menu",
				onClick: () => setMenu(false),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
					className: "ad-drawer__panel",
					onClick: (e) => e.stopPropagation(),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ad-drawer__head",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: "/assets/admin-profile-avatar-BKtxWTLm.png",
									alt: ""
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Admin" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Maatram Foundation" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									className: "ad-round-btn",
									"aria-label": "Close menu",
									onClick: () => setMenu(false),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin",
							onClick: () => setMenu(false),
							children: "Dashboard"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/opportunities/new",
							children: "Create Opportunity"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/pulse",
							children: "Pulse – Event Broadcasting"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/manage/$section",
							params: { section: "events" },
							children: "Events"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/manage/$section",
							params: { section: "communities" },
							children: "Communities"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/volunteers",
							children: "Volunteers"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/admin/reports",
							children: "Reports"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/welcome",
							className: "ad-drawer__exit",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 18 }), " Switch role"]
						})
					]
				})
			})
		]
	});
}
//#endregion
export { AdminDashboard as component };
