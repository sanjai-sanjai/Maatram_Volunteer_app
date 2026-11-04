import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Bt as Bookmark, E as Share2, J as Leaf, Jt as ArrowRight, O as Search, Ot as ChevronDown, P as Phone, Pt as CalendarDays, St as ClipboardList, U as MapPin, Vt as BookOpen, W as Mail, Y as Laptop, Z as Info, at as GraduationCap, c as UserRound, g as Target, ht as Download, i as Users, it as HandHeart, kt as Check, w as SlidersHorizontal, wt as CircleX, xt as Clock3 } from "../_libs/lucide-react.mjs";
import { a as eventGuide, g as registrationAcknowledgements, i as canConfirmRegistration, n as additionalOpportunities } from "./mock-DstdW3Hp.mjs";
import { n as useMaatramState } from "./MaatramState-CxlAJjDd.mjs";
import { r as Logo } from "./mq-BfQmvpW9.mjs";
import { a as IconAction, c as Page, f as photos, i as Heading, l as Primary, o as Meta, r as Header, s as Modal, t as Action, u as Progress } from "./additional-shared-BMdf0ZjP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/opportunity-screens-DlR7-bgt.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var guideIcons = [
	Target,
	Users,
	ClipboardList,
	CalendarDays,
	Phone
];
function getOpportunity(id) {
	return additionalOpportunities.find((op) => op.id === id) ?? additionalOpportunities[0];
}
function RegistrationModal({ op, open, onClose }) {
	const [checks, setChecks] = (0, import_react.useState)([
		false,
		false,
		false,
		false
	]);
	const state = useMaatramState();
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
		open,
		onClose,
		title: "Registration Confirmation",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { small: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				title: "Registration Confirmation",
				subtitle: "Review the details before officially joining"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-confirm-summary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: photos[op.photo],
					alt: op.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: op.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Category, { text: op.category }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { op }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
						" ",
						op.joined,
						" / ",
						op.capacity,
						" Volunteers Joined"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
						value: op.joined,
						max: op.capacity
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				title: "Confirm Your Registration",
				subtitle: "By joining, you agree to the following."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ma-checklist",
				children: registrationAcknowledgements.map((text, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					type: "checkbox",
					checked: checks[i],
					onChange: (e) => setChecks((old) => old.map((v, n) => n === i ? e.target.checked : v))
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text })] }, text))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "ma-notice",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {}), " Once you confirm, you will be added to the event community for all updates and coordination."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Primary, {
				disabled: !canConfirmRegistration(checks),
				onClick: () => {
					state.register(op.id);
					onClose();
					navigate({
						to: "/community/$communityId",
						params: { communityId: op.id === "palm-seeds" ? "palm-plantation" : "physical-verification" }
					});
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandHeart, {}),
					" ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Yes, Register Me", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Join the opportunity" })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Action, {
				className: "ma-cancel",
				onClick: onClose,
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {}), " Cancel"]
			})
		]
	});
}
function Category({ text }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: "ma-category",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, {}), text]
	});
}
function OpportunityCard({ op }) {
	const { joined } = useMaatramState();
	const navigate = useNavigate();
	const onContribute = () => navigate({
		to: "/opportunities/$opportunityId",
		params: { opportunityId: op.id }
	});
	const registered = joined.includes(op.id);
	const count = op.joined + (registered ? 1 : 0);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "ma-op-card",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/opportunities/$opportunityId",
			params: { opportunityId: op.id },
			className: "ma-op-photo",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: photos[op.photo],
				alt: op.name
			}), op.trending && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ma-trending",
				children: "🔥 Trending"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ma-op-body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/opportunities/$opportunityId",
					params: { opportunityId: op.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: op.name })
				}),
				!op.trending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ma-slots-mini",
					children: [op.capacity - count, " Slots Left"]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { op }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "ma-joined",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
							count,
							" / ",
							op.capacity
						] }),
						" ",
						"Volunteers Joined"
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
					value: count,
					max: op.capacity
				}),
				op.trending && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ma-slots",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [op.capacity - count, " Slots Remaining!"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Click to contribute your volunteering." })] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Primary, {
					onClick: onContribute,
					children: [
						registered ? "Joined" : "Contribute",
						" ",
						registered ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
					]
				})
			]
		})]
	});
}
function OpportunitiesScreen() {
	const [query, setQuery] = (0, import_react.useState)("");
	const [category, setCategory] = (0, import_react.useState)("All");
	const [search, setSearch] = (0, import_react.useState)(false);
	const [filter, setFilter] = (0, import_react.useState)(false);
	const [city, setCity] = (0, import_react.useState)("All locations");
	const categories = [
		"All",
		"School Visits",
		"Admissions Support",
		"Physical Verification",
		"Mock Interviews",
		"Admission Panel Interviews"
	];
	const shown = additionalOpportunities.filter((op) => (category === "All" || op.category === category) && (city === "All locations" || op.location === city) && `${op.name} ${op.location}`.toLowerCase().includes(query.toLowerCase()));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		active: "Explore",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { tools: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
				label: "Search opportunities",
				onClick: () => setSearch(!search),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
				label: "Filter opportunities",
				onClick: () => setFilter(!filter),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SlidersHorizontal, {})
			})] }) }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				title: "Upcoming Opportunities",
				subtitle: "Browse all active opportunities"
			}),
			search && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ma-search",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					autoFocus: true,
					placeholder: "Search opportunities…",
					value: query,
					onChange: (e) => setQuery(e.target.value)
				})]
			}),
			filter && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "ma-field",
				children: ["Location", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
					value: city,
					onChange: (e) => setCity(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "All locations" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Chennai" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Coimbatore" })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ma-filters",
				children: categories.map((c, i) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Action, {
						className: category === c ? "is-active" : "",
						onClick: () => setCategory(c),
						children: [i > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(i === 1 ? GraduationCap : i === 3 ? ClipboardList : i === 4 ? Laptop : Users, {}), c]
					}, c);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-op-list",
				children: [shown.map((op) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OpportunityCard, { op }, op.id)), !shown.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "ma-empty",
					children: "No opportunities match your search."
				})]
			})
		]
	});
}
function DetailsScreen({ id }) {
	const op = getOpportunity(id);
	const [modal, setModal] = (0, import_react.useState)(false);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [feedback, setFeedback] = (0, import_react.useState)("");
	const [notOpen, setNotOpen] = (0, import_react.useState)(false);
	const { joined } = useMaatramState();
	const navigate = useNavigate();
	if (!op) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "ma-details",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				back: "/opportunities",
				tools: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
					label: saved ? "Remove bookmark" : "Bookmark opportunity",
					onClick: () => setSaved(!saved),
					children: saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
					label: "Share opportunity",
					onClick: () => {
						setFeedback("Opportunity link copied.");
						if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {})
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				title: "Opportunity Details",
				subtitle: "View complete details and contribute to this opportunity"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-detail-hero",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: photos[op.id === "palm-seeds" ? "hero" : op.photo],
					alt: op.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Category, { text: op.category })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				title: op.name,
				subtitle: op.description
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ma-metrics",
				children: [
					[
						MapPin,
						op.location,
						""
					],
					[
						CalendarDays,
						op.date,
						""
					],
					[
						Clock3,
						op.time.split(" – ")[0],
						op.time.split(" – ")[1]
					],
					[
						Users,
						`${op.joined + (joined.includes(op.id) ? 1 : 0)} / ${op.capacity}`,
						"Volunteers Joined"
					]
				].map(([Icon, value, sub], i) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: String(value) }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: String(sub) })
					] }, i);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ma-about",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, { title: "About the Event" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: photos["palm-team"],
						alt: "Palm sapling"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "A tree plantation drive aimed at planting palm seeds across designated areas to restore green cover, combat climate change and create a cleaner, healthier environment for our future generations. This initiative encourages student participation in hands-on environmental action, fostering a sense of responsibility towards nature and a sustainable tomorrow." }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Action, {
						onClick: () => setFeedback("Every seed planted contributes to biodiversity and a greener community."),
						children: ["Read More ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				title: "Event Guide",
				subtitle: "Complete details to help you participate effectively."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ma-accordion",
				children: eventGuide.map((g, i) => {
					const Icon = guideIcons[i];
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
						Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: g.title }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: g.text.split("\n")[0] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {})
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: g.text })] }, g.title);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-slot-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [op.capacity - op.joined - (joined.includes(op.id) ? 1 : 0), " Slots Remaining!"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Be a part of this green mission." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
						op.joined + (joined.includes(op.id) ? 1 : 0),
						" / ",
						op.capacity
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Slots Filled" })] })
				]
			}),
			feedback && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				className: "ma-feedback",
				children: feedback
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-detail-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Primary, {
						onClick: () => setModal(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandHeart, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [joined.includes(op.id) ? "Joined" : "Interested", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "(Contribute)" })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Action, {
						onClick: () => setNotOpen(true),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {}), "Not Interested"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/opportunities/$opportunityId/guide",
							params: { opportunityId: op.id },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}), "Read Guide"]
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegistrationModal, {
				op,
				open: modal,
				onClose: () => setModal(false)
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: notOpen,
				onClose: () => setNotOpen(false),
				title: "Not interested confirmation",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ma-alert",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ma-alert-icon",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Are you sure?" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"You are about to mark ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: op.name }),
							" as not interested. You can still come back and contribute later."
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ma-alert-actions",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
								className: "ma-cancel",
								onClick: () => setNotOpen(false),
								children: "No, Go Back"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primary, {
								onClick: () => {
									setNotOpen(false);
									navigate({ to: "/opportunities" });
								},
								children: "Yes, I'm Sure"
							})]
						})
					]
				})
			})
		]
	});
}
async function downloadGuide(op) {
	const { buildGuidePdf } = await import("./guide-pdf-Wh2Kap8Z.mjs");
	const blob = await buildGuidePdf(op);
	const url = URL.createObjectURL(blob);
	const a = document.createElement("a");
	a.href = url;
	a.download = `Maatram-${op.name.replace(/\s+/g, "-")}-Guide.pdf`;
	document.body.appendChild(a);
	a.click();
	a.remove();
	setTimeout(() => URL.revokeObjectURL(url), 3e4);
}
function GuideScreen({ id }) {
	const op = getOpportunity(id);
	const [saved, setSaved] = (0, import_react.useState)(false);
	const [feedback, setFeedback] = (0, import_react.useState)("");
	if (!op) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "ma-guide",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, {
				back: `/opportunities/${op.id}`,
				tools: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
					label: "Share guide",
					onClick: () => {
						setFeedback("Guide link copied.");
						if (navigator.clipboard) navigator.clipboard.writeText(window.location.href);
					},
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Share2, {})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
					label: "Bookmark guide",
					onClick: () => setSaved(!saved),
					children: saved ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bookmark, {})
				})] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Heading, {
				title: "Event Guide",
				subtitle: "All the details you need to participate effectively"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-guide-summary",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: photos[op.photo],
					alt: op.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: op.name }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meta, { op }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Category, { text: "Event Guide" })
				] })]
			}),
			eventGuide.map((g, i) => {
				const Icon = guideIcons[i];
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "ma-guide-section",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ma-guide-icon",
						children: Icon && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: g.title }), g.title === "Responsibilities" || g.title === "Preparation Requirements" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: g.text.split("\n").map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: t }, t)) }) : g.title === "Schedule" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
						className: "ma-timeline",
						children: g.text.split("\n").map((t) => {
							const [time, label] = t.split(" — ");
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: time }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["– ", label] })] }, t);
						})
					}) : g.title === "Contact Details" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ma-contact",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Mr. Aravind K" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Event Coordinator" })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "tel:+919876543210",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {}), "+91 98765 43210"]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
							href: "mailto:aravind@maatram.org",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {}), "aravind@maatram.org"]
						})] })]
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: g.text })] })]
				}, g.title);
			}),
			feedback && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				className: "ma-feedback",
				children: feedback
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Primary, {
				onClick: () => void downloadGuide(op),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, {}), "Download Guide"]
			})
		]
	});
}
//#endregion
export { downloadGuide as a, OpportunitiesScreen as i, DetailsScreen as n, getOpportunity as o, GuideScreen as r, Category as t };
