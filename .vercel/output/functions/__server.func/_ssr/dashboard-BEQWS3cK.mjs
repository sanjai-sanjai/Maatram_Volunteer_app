import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ct as ClipboardCheck, G as LogOut, Ht as Bell, Jt as ArrowRight, Kt as Award, Pt as CalendarDays, U as MapPin, V as Menu, at as GraduationCap, i as Users, it as HandHeart, p as Trophy, t as X, xt as Clock3 } from "../_libs/lucide-react.mjs";
import { d as mockDashboard, f as mockNotifications, m as mockStudent, p as mockOpportunities, u as mockActive } from "./mock-DstdW3Hp.mjs";
import { n as useMaatramState } from "./MaatramState-CxlAJjDd.mjs";
import { t as BottomNav } from "./AppNav-De5vg2b9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/dashboard-BEQWS3cK.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var A = "/assets/dashboard/";
function Dashboard() {
	const navigate = useNavigate();
	const maatramState = useMaatramState();
	const [panel, setPanel] = (0, import_react.useState)(null);
	const op = mockOpportunities[0];
	if (!op) return null;
	const pct = Math.round(op.joined / op.capacity * 100);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "mq-dashboard",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "mq-dashboard__topbar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "mq-dashboard__round-action",
						"aria-label": "Open menu",
						onClick: () => setPanel("menu"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, { size: 27 })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "mq-dashboard__brand",
						src: "/assets/brand/maatram-foundation-logo.png",
						alt: "Maatram Foundation",
						width: 440,
						height: 180
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						className: "mq-dashboard__round-action mq-dashboard__notification",
						"aria-label": "Notifications",
						onClick: () => setPanel("notif"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 27 })
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mq-dashboard__welcome",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "mq-dashboard__avatar",
					src: `${A}student-avatar.jpg`,
					alt: "Student profile",
					width: 124,
					height: 124
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
						className: "mq-dashboard__greeting",
						children: [
							"Good morning, ",
							mockStudent.firstName,
							"! 👋"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mq-dashboard__identity",
						children: [
							mockStudent.category,
							" · ",
							mockStudent.maatramId
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "mq-dashboard__college",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {
								size: 17,
								style: {
									display: "inline",
									verticalAlign: "middle"
								}
							}),
							" ",
							mockStudent.college
						]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				className: "mq-dashboard__hero",
				src: `${A}impact-hero.jpg`,
				alt: "Make an Impact with Maatram! Volunteer · Lead · Create Change",
				width: 755,
				height: 271
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mq-dashboard__stats",
				"aria-label": "Volunteer statistics",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
							className: "mq-dashboard__stat-icon",
							fill: "#FEC802"
						}),
						value: mockDashboard.opportunities,
						label: "Opportunities"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {
							className: "mq-dashboard__stat-icon",
							fill: "#FEC802"
						}),
						value: mockDashboard.volunteerHours,
						label: "Volunteer Hours"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandHeart, {
							className: "mq-dashboard__stat-icon",
							fill: "#FEC802"
						}),
						value: mockDashboard.contributed,
						label: "Volunteering Contributed"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Award, {
							className: "mq-dashboard__stat-icon",
							fill: "#FEC802"
						}),
						value: mockDashboard.impactPoints,
						label: "Impact Points"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mq-dashboard__section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mq-dashboard__section-head",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mq-dashboard__section-title",
						children: "Upcoming Opportunities"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						className: "mq-dashboard__view-all",
						to: "/opportunities",
						children: [
							"View All ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mq-dashboard__new",
								children: [mockDashboard.newOpportunities, " New"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 20 })
						]
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "mq-dashboard__opportunity",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "mq-dashboard__opportunity-image",
						src: op.image,
						alt: "Volunteers planting seedlings",
						width: 265,
						height: 327
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mq-dashboard__opportunity-content",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
								className: "mq-dashboard__opportunity-title",
								children: op.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mq-dashboard__meta",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mq-dashboard__meta-item",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 17 }),
											" ",
											op.location
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mq-dashboard__meta-item",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 16 }),
											" ",
											op.date
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "mq-dashboard__meta-item",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, { size: 16 }),
											" ",
											op.time
										]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mq-dashboard__joined",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 20 }),
									" ",
									op.joined,
									" / ",
									op.capacity,
									" Volunteers Joined"
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "mq-dashboard__progress",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { width: `${pct}%` } })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mq-dashboard__slots",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 30 }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [op.capacity - op.joined, " Slots Remaining!"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Click to contribute your volunteering." })] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "mq-dashboard__contribute",
								onClick: () => navigate({
									to: "/opportunities/$opportunityId",
									params: { opportunityId: op.id }
								}),
								children: ["Contribute ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 21 })]
							})
						]
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mq-dashboard__section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mq-dashboard__section-head mq-dashboard__section-head--green",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mq-dashboard__section-title",
						children: "Your Active Volunteering"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "mq-dashboard__active-card",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { className: "mq-dashboard__active-icon" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "mq-dashboard__active-title",
						children: mockActive.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mq-dashboard__active-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mq-dashboard__active-meta",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {
									size: 16,
									style: {
										display: "inline",
										verticalAlign: "middle"
									}
								}),
								" ",
								mockActive.date
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {
									size: 16,
									style: {
										display: "inline",
										verticalAlign: "middle"
									}
								}),
								" ",
								mockActive.location
							] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mq-dashboard__active-footer",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "mq-dashboard__community-status",
									children: ["● ", mockActive.status]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { style: { flex: 1 } }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									className: "mq-dashboard__outline-action",
									onClick: () => navigate({ to: "/community" }),
									children: ["Open Community ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 16 })]
								})
							]
						})]
					})] })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mq-dashboard__section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mq-dashboard__section-head",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mq-dashboard__section-title",
						children: "Your Progress"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mq-dashboard__progress-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mq-dashboard__goal-ring",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "mq-dashboard__goal-ring-inner",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [mockDashboard.progress, "%"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Volunteer Goal" })]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mq-dashboard__goal-detail",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									style: { fontSize: 16 },
									children: "🎯"
								}), " Your Goal"] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									"Complete ",
									mockDashboard.goalHours,
									" Volunteer Hours"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [
									mockDashboard.completedHours,
									" / ",
									mockDashboard.goalHours,
									" Hours"
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
									className: "mq-dashboard__goal-bar",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
								})
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/impact",
							className: "mq-dashboard__leaderboard",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, {
									size: 30,
									color: "#b97f00",
									fill: "#FEC802",
									style: { flex: "none" }
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [mockDashboard.hoursToTop3, " more"] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"hours to enter the ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Top 3!" })
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { size: 17 })
							]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mq-dashboard__nav-wave" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, { active: "Home" }),
			panel && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mq-overlay",
				onClick: () => setPanel(null),
				children: [
					panel === "menu" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
						className: "mq-drawer",
						onClick: (e) => e.stopPropagation(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/brand/maatram-foundation-logo.png",
							alt: "Maatram Foundation",
							style: { width: 150 }
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { marginTop: 18 },
							children: [[
								["My Profile", "/profile"],
								["Opportunities", "/opportunities"],
								["Community", "/community"],
								["My Impact", "/impact"]
							].map(([l, to]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to,
								className: "mq-list-item",
								children: l
							}, to)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/welcome",
								className: "mq-list-item",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, { size: 18 }), " Log out"]
							})]
						})]
					}),
					panel === "notif" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mq-sheet",
						onClick: (e) => e.stopPropagation(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHead, {
							title: "Notifications",
							onClose: () => setPanel(null)
						}), mockNotifications.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mq-list-item",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
									size: 18,
									color: "#d99a00"
								}),
								" ",
								n
							]
						}, n))]
					}),
					(panel === "contribute" || panel === "joined") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mq-sheet",
						onClick: (e) => e.stopPropagation(),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetHead, {
								title: op.name,
								onClose: () => setPanel(null)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: op.image,
								alt: "",
								style: {
									width: "100%",
									height: 160,
									objectFit: "cover",
									borderRadius: 18
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: { color: "var(--mq-navy)" },
								children: op.description
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: op.location }),
								" · ",
								op.date,
								" · ",
								op.time
							] }),
							panel === "joined" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mq-dashboard__community-status",
								style: {
									display: "block",
									textAlign: "center",
									padding: 12
								},
								children: "✓ You're registered! See you there."
							}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: "mq-btn",
								onClick: () => {
									maatramState.register(op.id);
									setPanel("joined");
								},
								children: "Confirm Contribution"
							})
						]
					})
				]
			})
		]
	});
}
function SheetHead({ title, onClose }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		style: {
			display: "flex",
			justifyContent: "space-between",
			alignItems: "center",
			marginBottom: 12
		},
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			style: {
				margin: 0,
				fontSize: 20,
				fontWeight: 800
			},
			children: title
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			className: "mq-back",
			"aria-label": "Close",
			onClick: onClose,
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 20 })
		})]
	});
}
function Stat({ icon, value, label }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mq-dashboard__stat",
		children: [
			icon,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
				className: "mq-dashboard__stat-value",
				children: value
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "mq-dashboard__stat-label",
				children: label
			})
		]
	});
}
//#endregion
export { Dashboard as component };
