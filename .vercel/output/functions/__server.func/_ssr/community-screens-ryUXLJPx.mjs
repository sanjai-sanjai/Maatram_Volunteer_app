import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { B as MessageCircle, Et as ChevronRight, Ht as Bell, Jt as ArrowRight, O as Search, Pt as CalendarDays, St as ClipboardList, U as MapPin, Vt as BookOpen, Yt as ArrowLeft, Z as Info, g as Target, ht as Download, i as Users, mt as EllipsisVertical, x as Sprout } from "../_libs/lucide-react.mjs";
import { a as eventGuide, t as additionalCommunities } from "./mock-DstdW3Hp.mjs";
import { n as useMaatramState } from "./MaatramState-CxlAJjDd.mjs";
import { a as IconAction, c as Page, f as photos, i as Heading, n as Forward, r as Header, t as Action } from "./additional-shared-BMdf0ZjP.mjs";
import { a as downloadGuide, o as getOpportunity, t as Category } from "./opportunity-screens-DlR7-bgt.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community-screens-ryUXLJPx.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function getCommunity(id) {
	return additionalCommunities.find((c) => c.id === id) ?? additionalCommunities[0];
}
function CommunitiesScreen() {
	const [query, setQuery] = (0, import_react.useState)("");
	const state = useMaatramState();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		active: "Community",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				title: "My Communities",
				subtitle: "All communities you’ve joined as a volunteer"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ma-student",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/assets/dashboard/student-avatar.jpg",
					alt: "Sanjai R"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Sanjai R" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Maatram Student · 3rd Year, Mechatronics" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ma-student-stats",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: 4 + state.joined.length }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Communities",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Joined"
								] })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "7" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Events",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Contributed"
								] })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "16 hrs" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Total",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"Service"
								] })
							] })
						]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ma-search",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					placeholder: "Search your communities…",
					value: query,
					onChange: (e) => setQuery(e.target.value)
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ma-community-list",
				children: additionalCommunities.filter((c) => c.name.toLowerCase().includes(query.toLowerCase())).map((c) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					className: "ma-community-card",
					to: "/community/$communityId/chat",
					params: { communityId: c.id },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photos[c.photo],
							alt: c.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: c.name }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Category, { text: c.category }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
								c.members,
								" Members",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: c.active === "Active Today" ? "ma-active" : "ma-muted",
									children: ["● ", c.active]
								})
							] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ma-community-arrow",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
						})
					]
				}, c.id))
			})
		]
	});
}
function CommunityScreen({ id }) {
	const c = getCommunity(id);
	const [tab, setTab] = (0, import_react.useState)("Overview");
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [notice, setNotice] = (0, import_react.useState)("");
	const { joined } = useMaatramState();
	if (!c) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "ma-community-detail",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-community-cover",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photos[c.id === "palm-plantation" ? "cover" : c.photo],
						alt: c.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						asChild: true,
						className: "ma-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/community/$communityId/chat",
							params: { communityId: c.id },
							"aria-label": "Back to chat",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
						label: "Community options",
						onClick: () => setMenu(!menu),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, {})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ma-community-identity",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: "/assets/brand/maatram-foundation-logo.png",
						alt: "Maatram Foundation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: c.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Category, { text: c.category }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: " · Maatram Community" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
						c.members + (joined.includes(c.eventId) ? 1 : 0),
						" Members",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ma-active",
							children: "● Active Today"
						})
					] })
				]
			}),
			menu && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-inline-menu",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
					onClick: () => {
						setNotice("Community notifications muted.");
						setMenu(false);
					},
					children: "Mute notifications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
					onClick: () => {
						setNotice("Community link copied.");
						setMenu(false);
						if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
					},
					children: "Share community"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
				className: "ma-tabs",
				"aria-label": "Community views",
				children: [
					"Overview",
					"Events",
					"Members",
					"Info"
				].map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
					className: t === tab ? "is-active" : "",
					onClick: () => setTab(t),
					children: t
				}, t))
			}),
			(tab === "Overview" || tab === "Events") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					className: "ma-community-event",
					to: "/opportunities/$opportunityId",
					params: { opportunityId: c.eventId },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "NOV" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "02" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SAT" })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: c.id === "palm-plantation" ? "Palm Seeds Plantation" : c.name.replace(" Team", "") }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), "Chennai"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}), "9:00 AM – 12:00 PM"] })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, {})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "ma-info-section",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Target, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Event Overview" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A plantation drive to increase green cover by planting native palm seeds, with student volunteers, awareness activities, and care planning." })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: photos["planting"],
							alt: "Plantation volunteers"
						})
					]
				}),
				tab === "Events" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Forward, {
					to: `/opportunities/${c.eventId}`,
					children: "View Event Details"
				})
			] }),
			tab === "Overview" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ma-community-columns",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "ma-info-section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Event Guide" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Step-by-step plan, roles,",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"requirements & Do’s/Don’ts."
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Action, {
								onClick: () => void downloadGuide(getOpportunity("palm-seeds")),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Download Guide"]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/opportunities/$opportunityId/guide",
									params: { opportunityId: c.eventId },
									children: ["Read Guide", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})]
								})
							})
						] })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "ma-info-section",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardList, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "What to Bring" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Water bottle (Reusable)" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Cap / Hat" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Comfortable shoes" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: "Gloves (If available)" })
						] })] })]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutCommunity, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdditionalInfo, { members: c.members })
			] }),
			tab === "Members" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ma-members",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
					title: "Community Members",
					subtitle: `${c.members} volunteers working together`
				}), [
					[
						"Aravind K",
						"Coordinator",
						"coordinator"
					],
					[
						"Kaviya S",
						"Volunteer",
						"kaviya"
					],
					[
						"Sanjai R",
						"Student",
						""
					]
				].map(([name, role, photo]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photo ? photos[photo] : "/assets/dashboard/student-avatar.jpg",
						alt: name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: role })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ma-active",
						children: "● Active"
					})
				] }, name))]
			}),
			tab === "Info" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AboutCommunity, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdditionalInfo, { members: c.members }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "ma-guide-section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Community Coordinator" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: eventGuide[4]?.text })] })]
				})
			] }),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				className: "ma-feedback",
				children: notice
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Forward, {
				to: `/community/${c.id}/chat`,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MessageCircle, {}), "Open Community Chat"]
			})
		]
	});
}
function AboutCommunity() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "ma-info-section",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "About This Community" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A Maatram initiative focused on increasing green cover through palm plantation drives, awareness, and long-term care." })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, {})
		]
	});
}
function AdditionalInfo({ members }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "ma-additional-info",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {}), "Additional Information"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: [
			[
				MapPin,
				"Venue",
				"Chennai"
			],
			[
				Users,
				"Volunteers",
				`${members} Members`
			],
			[
				Sprout,
				"Impact Goal",
				"100+ Palm Seeds"
			],
			[
				Bell,
				"Updates",
				"Event circulars, photos & reports"
			]
		].map(([Icon, title, text], i) => {
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: String(title) }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: String(text) })
			] }, i);
		}) })]
	});
}
//#endregion
export { CommunityScreen as n, getCommunity as r, CommunitiesScreen as t };
