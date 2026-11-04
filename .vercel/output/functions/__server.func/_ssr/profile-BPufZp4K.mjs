import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Et as ChevronRight, F as Pencil, G as LogOut, Ht as Bell, Pt as CalendarDays, T as ShieldCheck, Tt as CircleCheck, U as MapPin, Ut as BellRing, V as Menu, Wt as BellDot, Z as Info, at as GraduationCap, i as Users, jt as ChartNoAxesColumnIncreasing, o as User, p as Trophy, rt as HeartHandshake, t as X, ut as FileBadge, xt as Clock3 } from "../_libs/lucide-react.mjs";
import { d as mockDashboard, f as mockNotifications, m as mockStudent } from "./mock-DstdW3Hp.mjs";
import { c as Page, d as palm_team_default, m as verification_team_default, p as school_default, s as Modal, t as Action } from "./additional-shared-BMdf0ZjP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/profile-BPufZp4K.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var hand_heart_icon_default = "/assets/hand-heart-icon-BVkGBYvx.png";
var calendar_megaphone_default = "/assets/calendar-megaphone-JA1NqaFR.png";
var making_a_real_difference_default = "/assets/making-a-real-difference-DFX3WWlA.png";
var stats = [
	{
		Icon: CalendarDays,
		value: mockDashboard.opportunities,
		label: "Events Participated"
	},
	{
		Icon: Clock3,
		value: mockDashboard.volunteerHours,
		label: "Volunteer Hours"
	},
	{
		Icon: HeartHandshake,
		value: mockDashboard.contributed,
		label: "Volunteering Contributed"
	},
	{
		Icon: ChartNoAxesColumnIncreasing,
		value: mockDashboard.impactPoints,
		label: "Impact Points"
	}
];
var recentActivity = [
	{
		name: "Palm Seeds Plantation",
		date: "Nov 02, 2026",
		hours: "3 hrs",
		photo: palm_team_default
	},
	{
		name: "School Visit – Govt. Middle School",
		date: "Oct 14, 2026",
		hours: "5 hrs",
		photo: school_default
	},
	{
		name: "Physical Verification – Admissions",
		date: "Oct 28, 2026",
		hours: "8 hrs",
		photo: verification_team_default
	}
];
var achievements = [
	{
		name: "10 Hours Club",
		detail: "Completed your first 10 volunteer hours."
	},
	{
		name: "Eco Warrior",
		detail: "Recognized for a greener environment."
	},
	{
		name: "Education Supporter",
		detail: "Supported students and their education."
	}
];
var certificates = [{
	name: "Palm Seeds Plantation",
	detail: "Volunteer participation · Nov 02, Chennai"
}, {
	name: "Physical Verification",
	detail: "Community service · Oct 28, Coimbatore"
}];
var confettiColors = [
	"#FEC802",
	"#FFD000",
	"#20B83A",
	"#FF8A00",
	"#2B4EBC",
	"#E53935"
];
var confettiPieces = Array.from({ length: 30 }, (_, i) => {
	const angle = i / 30 * Math.PI * 2;
	const dist = 95 + i % 5 * 30;
	return {
		id: i,
		tx: Math.cos(angle) * dist,
		ty: Math.sin(angle) * dist - 26,
		rot: i * 47 % 360,
		delay: i % 7 * .035,
		color: confettiColors[i % confettiColors.length],
		w: 6 + i % 3 * 3,
		h: 10 + i % 4 * 3
	};
});
function ProfileScreen() {
	const navigate = useNavigate();
	const [available, setAvailable] = (0, import_react.useState)(true);
	const [celebrate, setCelebrate] = (0, import_react.useState)(false);
	const [tab, setTab] = (0, import_react.useState)("activity");
	const [dialog, setDialog] = (0, import_react.useState)(null);
	const toggleAvailable = () => setAvailable((value) => {
		if (!value) setCelebrate(true);
		return !value;
	});
	const accountRows = [
		{
			Icon: User,
			label: "Personal Information",
			sub: "View and manage your details",
			action: () => setDialog("edit")
		},
		{
			Icon: Bell,
			label: "Notification Preferences",
			sub: "Choose what updates you want to receive",
			action: () => setDialog("notifications")
		},
		{
			Icon: ShieldCheck,
			label: "Privacy & Security",
			sub: "Manage your account and data",
			action: () => setDialog("privacy")
		},
		{
			Icon: Info,
			label: "About Maatram",
			sub: "Know more about our mission and work",
			action: () => setDialog("about")
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		active: "Profile",
		className: "ma-profile",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "ma-profile-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						className: "ma-icon",
						"aria-label": "Open menu",
						onClick: () => setDialog("menu"),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "ma-profile-logo",
						src: "/assets/brand/maatram-foundation-logo.png",
						alt: "Maatram Foundation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Action, {
						className: "ma-icon ma-profile-bell",
						"aria-label": "Notifications",
						onClick: () => setDialog("notifications"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "ma-profile-bell-dot" })]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ma-profile-identity",
				"aria-label": "Volunteer identity",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "ma-profile-avatar",
						src: "/assets/dashboard/student-avatar-clean.jpg",
						alt: `Portrait of ${mockStudent.firstName}`
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ma-profile-identity-main",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [mockStudent.firstName, " R"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "ma-profile-role",
								children: [
									mockStudent.category,
									" · ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: mockStudent.maatramId })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {}), mockStudent.college] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ma-profile-location-row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), mockStudent.collegeLocation] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
									className: "ma-profile-verified",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Verified Volunteer"]
								})]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "ma-profile-edit",
						onClick: () => setDialog("edit"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), "Edit Profile"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ma-profile-availability",
				"aria-label": "Volunteer availability",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ma-profile-availability-top",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "ma-profile-availability-heart",
								src: hand_heart_icon_default,
								alt: ""
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Volunteer Availability" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Let Maatram know when you're ready to contribute." })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "ma-profile-availability-calendar",
								src: calendar_megaphone_default,
								alt: ""
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ma-profile-availability-toggle",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "I'm Available to Volunteer" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							role: "switch",
							"aria-checked": available,
							"aria-label": "Available to volunteer",
							className: available ? "ma-profile-switch ma-profile-switch--on" : "ma-profile-switch",
							onClick: toggleAvailable,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "ma-profile-availability-note",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {}), "When enabled, you'll be considered for relevant volunteering opportunities and receive event notifications."]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "ma-profile-section-title",
				children: "My Volunteer Stats"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "ma-profile-stats",
				"aria-label": "Volunteer statistics",
				children: stats.map(({ Icon, value, label }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: value }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: label })
				] }, label))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "ma-profile-section-title",
				children: "My Impact at Maatram"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				className: "ma-profile-impact-banner",
				src: making_a_real_difference_default,
				alt: "Making a Real Difference! Students supported, awareness created and green initiatives at Maatram"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ma-profile-tabs",
				role: "tablist",
				"aria-label": "Activity sections",
				children: [
					[
						"activity",
						CalendarDays,
						"My Activity"
					],
					[
						"achievements",
						Trophy,
						"Achievements"
					],
					[
						"certificates",
						FileBadge,
						"Certificates"
					]
				].map(([key, Icon, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					role: "tab",
					"aria-selected": tab === key,
					className: tab === key ? "ma-profile-tab ma-profile-tab--active" : "ma-profile-tab",
					onClick: () => setTab(key),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}), label]
				}, key))
			}),
			tab === "activity" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-profile-recent-head",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "ma-profile-section-title",
					children: "Recent Volunteering"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "ma-profile-viewall",
					onClick: () => navigate({ to: "/impact" }),
					children: "View All →"
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "ma-profile-recent",
				"aria-label": "Recent volunteering",
				children: recentActivity.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
					className: "ma-profile-activity-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: item.photo,
							alt: ""
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}),
							item.date,
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "|" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}),
							item.hours
						] })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "ma-profile-completed",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), "Completed"]
						})
					]
				}, item.name))
			})] }),
			tab === "achievements" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "ma-profile-recent",
				"aria-label": "Achievements",
				children: achievements.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ma-profile-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.detail })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
					]
				}, item.name))
			}),
			tab === "certificates" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
				className: "ma-profile-recent",
				"aria-label": "Certificates",
				children: certificates.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ma-profile-row",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileBadge, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: item.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.detail })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
					]
				}, item.name))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "ma-profile-section-title",
				children: "Account & Preferences"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ma-profile-account",
				"aria-label": "Account and preferences",
				children: [accountRows.map(({ Icon, label, sub, action }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "ma-profile-account-row",
					onClick: action,
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: sub })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
					]
				}, label)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					className: "ma-profile-account-row ma-profile-account-row--danger",
					onClick: () => navigate({ to: "/welcome" }),
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(LogOut, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "Logout" }) })]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Modal, {
				open: dialog !== null,
				onClose: () => setDialog(null),
				title: dialog === "menu" ? "Menu" : dialog === "notifications" ? "Notifications" : dialog === "privacy" ? "Privacy & Security" : dialog === "about" ? "About Maatram" : "Edit Profile",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ma-profile-dialog",
					children: [
						dialog === "menu" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Menu" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Quick links" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
								className: "ma-profile-menu",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setDialog(null);
											navigate({ to: "/dashboard" });
										},
										children: "Home"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setDialog(null);
											navigate({ to: "/explore" });
										},
										children: "Explore Opportunities"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setDialog(null);
											navigate({ to: "/community" });
										},
										children: "My Communities"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setDialog(null);
											navigate({ to: "/impact" });
										},
										children: "Impact Arena"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => {
											setDialog(null);
											navigate({ to: "/fund-request" });
										},
										children: "Fund Request"
									})
								]
							})
						] }),
						dialog === "notifications" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Notifications" }), mockNotifications.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "ma-profile-note",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellDot, {}), note]
						}, note))] }),
						dialog === "edit" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Edit Profile" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Profile editing is managed by the Maatram team. Contact your coordinator to update your name, photo or college details." })] }),
						dialog === "privacy" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Privacy & Security" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your name and photo are visible only to event coordinators. On the Impact leaderboard you appear as an anonymous volunteer number." })] }),
						dialog === "about" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "About Maatram" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Maatram Foundation connects student volunteers with schools and communities — guiding students, creating opportunities and building a brighter future." })] })
					]
				})
			}),
			celebrate && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ma-celebrate",
				role: "dialog",
				"aria-modal": "true",
				"aria-label": "Availability enabled",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ma-celebrate-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ma-celebrate-close",
							"aria-label": "Close",
							onClick: () => setCelebrate(false),
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ma-celebrate-badge",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: "/assets/golden-checkmark-badge-pa1iYd44.png",
								alt: ""
							}), confettiPieces.map((p) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ma-celebrate-confetti",
								style: {
									width: p.w,
									height: p.h,
									background: p.color,
									"--tx": `${p.tx}px`,
									"--ty": `${p.ty}px`,
									"--rot": `${p.rot}deg`,
									"--delay": `${p.delay}s`
								}
							}, p.id))]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
							"You're Now Available",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"for Volunteering!"
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ma-celebrate-swoosh",
							"aria-hidden": "true"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Maatram will now notify you about relevant volunteering opportunities, events, and initiatives." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ma-celebrate-features",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BellRing, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Get Event Alerts" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Be Part of Initiatives" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeartHandshake, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Make a Real Impact" })] })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "ma-celebrate-gotit",
							onClick: () => setCelebrate(false),
							children: "Got It!"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "ma-celebrate-prefs",
							onClick: () => {
								setCelebrate(false);
								setDialog("notifications");
							},
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}), "Update Preferences"]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ma-celebrate-wave",
							"aria-hidden": "true"
						})
					]
				})
			})
		]
	});
}
var SplitComponent = ProfileScreen;
//#endregion
export { SplitComponent as component };
