import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as maatram_logo_full_default, t as admin_profile_avatar_default } from "./admin-profile-avatar-Cks5CCdP.mjs";
import { Dt as ChevronLeft, Et as ChevronRight, Ht as Bell, I as Pause, N as Play, O as Search, Pt as CalendarDays, T as ShieldCheck, Tt as CircleCheck, U as MapPin, V as Menu, Yt as ArrowLeft, a as UsersRound, at as GraduationCap, bt as Clock, c as UserRound, dt as Eye, gt as Crown, i as Users, jt as ChartNoAxesColumnIncreasing, ot as Funnel, s as UserX, tt as House, zt as BriefcaseBusiness } from "../_libs/lucide-react.mjs";
import { t as formatDuration } from "./volunteers-mock-DFczRHcg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/volunteers-DcsKbkG3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var approved = [];
var subs = /* @__PURE__ */ new Set();
var approveVolunteer = (id) => {
	if (!approved.includes(id)) {
		approved = [...approved, id];
		subs.forEach((f) => f());
	}
};
function useApproved() {
	return (0, import_react.useSyncExternalStore)((f) => {
		subs.add(f);
		return () => {
			subs.delete(f);
		};
	}, () => approved, () => approved);
}
function VolunteerFrame({ children, nav = true, export: exp = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ad-shell vl-shell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: `vl-page ${nav ? "vl-page--nav" : ""} ${exp ? "vl-page--export" : ""}`,
			children: [children, nav && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNavigation, { active: "Volunteers" })]
		})
	});
}
function VolunteerHeader({ crumb }) {
	const [bell, setBell] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "vl-head",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin",
				className: "vl-round",
				"aria-label": "Menu",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				className: "vl-head__logo",
				src: maatram_logo_full_default,
				alt: "Maatram Foundation"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vl-head__text",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Maatram Foundation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Volunteers", crumb && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					" ",
					"/ ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: crumb })
				] })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "vl-round vl-bell",
				"aria-label": "Notifications",
				onClick: () => setBell((b) => !b),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "vl-avatar",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: admin_profile_avatar_default,
					alt: "Admin"
				})
			}),
			bell && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vl-pop vl-pop--bell",
				role: "dialog",
				"aria-label": "Notifications",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, { size: 16 }), " 18 volunteer profiles await verification"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { size: 16 }), " 42 new volunteers joined this week"] })]
			})
		]
	});
}
function HeroArt() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		className: "vl-hero__art",
		viewBox: "0 0 170 130",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				fill: "#FFC900",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "38",
						cy: "66",
						r: "15"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 128c0-24 13-38 30-38s30 14 30 38z" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "132",
						cy: "66",
						r: "15"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M102 128c0-24 13-38 30-38s30 14 30 38z" })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				fill: "#FFC900",
				stroke: "#fff",
				strokeWidth: "4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: "85",
					cy: "50",
					r: "22"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M42 130c0-32 19-52 43-52s43 20 43 52z" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
				stroke: "#FFC900",
				strokeWidth: "5",
				strokeLinecap: "round",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M128 8l-4 18" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M156 16l-16 14" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M164 40l-20 2" })
				]
			})
		]
	});
}
function VolunteerHero() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "vl-hero",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "vl-hero__wave",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vl-hero__text",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Volunteers" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Manage, verify and organize your volunteer community." })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeroArt, {})
		]
	});
}
function VolunteerCategoryCard({ icon, label, active, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		type: "button",
		className: `vl-cat ${active ? "is-active" : ""}`,
		"aria-pressed": active,
		onClick,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "vl-cat__icon",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "vl-cat__label",
			children: label
		})]
	});
}
function VolunteerCategories({ tab, onTab, pending }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vl-cats",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerCategoryCard, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Verification",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"(",
					pending,
					")"
				] }),
				active: tab === "verification",
				onClick: () => onTab("verification")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerCategoryCard, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {}),
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"All",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Volunteers",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"(4,500)"
				] }),
				active: tab === "all",
				onClick: () => onTab("all")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerCategoryCard, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "vl-dot" }),
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Active",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"(286)"
				] }),
				active: tab === "active",
				onClick: () => onTab("active")
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerCategoryCard, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "vl-crown" }),
				label: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					"Tier",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Management"
				] }),
				active: tab === "tiers",
				onClick: () => onTab("tiers")
			})
		]
	});
}
function ListHead({ title, count, sub, badge }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vl-listhead",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "vl-listhead__bar",
			"aria-hidden": true
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
			title,
			count && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [" ", count] }),
			badge !== void 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", {
				className: "vl-count",
				children: badge
			})
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: sub })] })]
	});
}
function SearchBar({ value, onChange, placeholder, filter, onFilter }) {
	const [open, setOpen] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vl-search",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
				className: "vl-search__box",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					value,
					onChange: (e) => onChange(e.target.value),
					placeholder,
					"aria-label": "Search volunteers"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: `vl-round vl-filter ${filter !== "All" ? "is-on" : ""}`,
				"aria-label": "Filter",
				"aria-expanded": open,
				onClick: () => setOpen((o) => !o),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Funnel, {})
			}),
			open && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vl-pop vl-pop--filter",
				role: "menu",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Working status" }), [
					"All",
					"Student",
					"Employee"
				].map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: filter === f ? "is-on" : "",
					onClick: () => {
						onFilter(f);
						setOpen(false);
					},
					children: f
				}, f))]
			})
		]
	});
}
function StatusBadge({ kind }) {
	const [icon, text] = {
		pending: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {}, "i"), "Pending"],
		volunteered: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}, "i"), "Volunteered"],
		non: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, {}, "i"), "Non-Volunteered"],
		verified: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}, "i"), "Verified"],
		completed: [null, "Completed"],
		upcoming: [null, "Upcoming"]
	}[kind];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: `vl-badge vl-badge--${kind}`,
		children: [icon, text]
	});
}
var WorkIcon = ({ s }) => s === "Student" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefcaseBusiness, {});
function VolunteerListItem({ v, mode }) {
	const inner = /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			className: "vl-item__img",
			src: v.avatar,
			alt: ""
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "vl-item__body",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: v.name }),
				mode === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WorkIcon, { s: v.status }), v.status] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {}),
					v.status,
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "vl-sep",
						children: "•"
					}),
					"ID: ",
					v.id
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), v.location] })
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "vl-item__side",
			children: mode === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { kind: "pending" }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { kind: v.volunteered ? "volunteered" : "non" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "vl-item__acts",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}),
					v.activities,
					" Activities"
				]
			})] })
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { className: "vl-item__chev" })
	] });
	return mode === "pending" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/admin/volunteers/review/$id",
		params: { id: v.id },
		className: "vl-item",
		children: inner
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/admin/volunteers/$id",
		params: { id: v.id },
		className: "vl-item",
		children: inner
	});
}
function Pagination({ total }) {
	const [p, setP] = (0, import_react.useState)(1);
	const last = Math.ceil(total / 10);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vl-pager",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
			"Showing ",
			(p - 1) * 10 + 1,
			" – ",
			p * 10,
			" of ",
			total.toLocaleString("en-IN"),
			" volunteers"
		] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Previous page",
				onClick: () => setP((x) => Math.max(1, x - 1)),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, {})
			}),
			[
				1,
				2,
				3
			].map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: p === n ? "is-on" : "",
				onClick: () => setP(n),
				children: n
			}, n)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { children: "•••" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: p === last ? "is-on" : "",
				onClick: () => setP(last),
				children: last
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				"aria-label": "Next page",
				onClick: () => setP((x) => Math.min(last, x + 1)),
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
			})
		] })]
	});
}
function SheetsIcon() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 32",
		width: "26",
		height: "34",
		"aria-hidden": true,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M2 0h14l8 8v22a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2z",
				fill: "#0F9D58"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 0l8 8h-6a2 2 0 0 1-2-2z",
				fill: "#87CEAC"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M5 14h14v11H5z",
				fill: "#fff"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M6.5 15.5h4.5v3H6.5zM13 15.5h4.5v3H13zM6.5 20.5h4.5v3H6.5zM13 20.5h4.5v3H13z",
				fill: "#0F9D58"
			})
		]
	});
}
function BackButton({ to }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		type: "button",
		className: "vl-round vl-round--sq",
		"aria-label": "Go back",
		onClick: () => to ? router.navigate({ to }) : router.history.back(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})
	});
}
function Sparks({ className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
		className: `vl-sparks ${className}`,
		viewBox: "0 0 40 30",
		"aria-hidden": true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", {
			stroke: "#FFC900",
			strokeWidth: "3.5",
			strokeLinecap: "round",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M8 4l-3 10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M24 4l-10 10" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M32 18l-14 2" })
			]
		})
	});
}
function InfoSection({ icon, title, sub, children, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: `vl-card vl-sec ${className}`,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "vl-sec__head",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "vl-tile",
				children: icon
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }), sub && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: sub })] })]
		}), children]
	});
}
function DetailRow({ icon, label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vl-detail",
		children: [
			icon,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "vl-detail__label",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "vl-detail__colon",
				children: ":"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: value })
		]
	});
}
function AadhaarVisual() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vl-aadhaar",
		"aria-label": "Aadhaar card preview",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "vl-aadhaar__top",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vl-aadhaar__logo",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
					viewBox: "0 0 40 22",
					"aria-hidden": true,
					children: [Array.from({ length: 9 }).map((_, i) => {
						const a = Math.PI - i * Math.PI / 8;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
							x1: 20 + Math.cos(a) * 7,
							y1: 20 - Math.sin(a) * 7,
							x2: 20 + Math.cos(a) * 17,
							y2: 20 - Math.sin(a) * 17,
							stroke: i % 2 ? "#E8312F" : "#F6A51C",
							strokeWidth: "2.6",
							strokeLinecap: "round"
						}, i);
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "20",
						cy: "20",
						r: "5",
						fill: "#E8312F"
					})]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "AADHAAR" })]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vl-aadhaar__flag",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "vl-aadhaar__bottom",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "vl-aadhaar__photo",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vl-aadhaar__lines",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
				]
			})]
		})]
	});
}
function IdentityDocumentCard({ type, size, onView }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vl-idcard",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vl-idcard__info",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { className: "vl-green" }), type] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"ID Proof ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "•" }),
						" Uploaded (",
						size,
						")"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "vl-btn vl-btn--ghost vl-btn--sm",
						onClick: onView,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, {}), " View Document"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "vl-idcard__div",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AadhaarVisual, {})
		]
	});
}
var WAVE = [
	6,
	10,
	14,
	8,
	18,
	12,
	22,
	9,
	15,
	24,
	11,
	7,
	16,
	20,
	10,
	26,
	13,
	18,
	9,
	22,
	14,
	8,
	19,
	25,
	12,
	7,
	16,
	10,
	21,
	13,
	8,
	17,
	11,
	23,
	9,
	14,
	6,
	10,
	5,
	4
];
function VoiceNotePlayer({ duration, src, label = "Volunteer Voice Note" }) {
	const [playing, setPlaying] = (0, import_react.useState)(false);
	const [t, setT] = (0, import_react.useState)(0);
	const audio = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!playing || src) return;
		const id = setInterval(() => setT((x) => {
			if (x + .25 >= duration) {
				setPlaying(false);
				return 0;
			}
			return x + .25;
		}), 250);
		return () => clearInterval(id);
	}, [
		playing,
		src,
		duration
	]);
	const toggle = () => {
		if (src && audio.current) if (playing) audio.current.pause();
		else audio.current.play();
		setPlaying((p) => !p);
	};
	const pct = t / duration;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vl-voice",
		children: [
			src && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("audio", {
				ref: audio,
				src,
				onTimeUpdate: (e) => setT(e.currentTarget.currentTime),
				onEnded: () => {
					setPlaying(false);
					setT(0);
				}
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				type: "button",
				className: "vl-voice__play",
				"aria-label": playing ? "Pause voice note" : "Play voice note",
				onClick: toggle,
				children: playing ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pause, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Play, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "vl-voice__body",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: label }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "vl-voice__wave",
					"aria-hidden": true,
					children: WAVE.map((h, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {
						style: { height: h },
						className: i / WAVE.length <= pct || !playing && t === 0 && i < 26 ? "on" : ""
					}, i))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "vl-voice__time",
				children: playing || t > 0 ? formatDuration(t) : formatDuration(duration)
			})
		]
	});
}
function ActivityItem({ a }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vl-activity",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				src: a.image,
				alt: ""
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: a.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}), a.date] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), a.location] })] })] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { kind: a.status === "Completed" ? "completed" : "upcoming" })
		]
	});
}
function Toast({ text, onDone }) {
	(0, import_react.useEffect)(() => {
		const id = setTimeout(onDone, 2600);
		return () => clearTimeout(id);
	}, [onDone]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "vl-toast",
		role: "status",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), text]
	});
}
function BottomNavigation({ active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "vl-nav",
		"aria-label": "Admin navigation",
		children: [
			{
				label: "Home",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {}),
				el: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin",
					className: "vl-nav__item",
					children: c
				})
			},
			{
				label: "Events",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}),
				el: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/manage/$section",
					params: { section: "events" },
					className: "vl-nav__item",
					children: c
				})
			},
			{
				label: "Communities",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {}),
				el: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/manage/$section",
					params: { section: "communities" },
					className: "vl-nav__item",
					children: c
				})
			},
			{
				label: "Volunteers",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
				el: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/volunteers",
					className: "vl-nav__item",
					children: c
				})
			},
			{
				label: "Reports",
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumnIncreasing, {}),
				el: (c) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/admin/reports",
					className: "vl-nav__item",
					children: c
				})
			}
		].map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: active === i.label ? "is-active" : "",
			"aria-current": active === i.label ? "page" : void 0,
			children: i.el(/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [i.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i.label })] }))
		}, i.label))
	});
}
//#endregion
export { VolunteerHero as _, InfoSection as a, approveVolunteer as b, SearchBar as c, StatusBadge as d, Toast as f, VolunteerHeader as g, VolunteerFrame as h, IdentityDocumentCard as i, SheetsIcon as l, VolunteerCategories as m, BackButton as n, ListHead as o, VoiceNotePlayer as p, DetailRow as r, Pagination as s, ActivityItem as t, Sparks as u, VolunteerListItem as v, useApproved as x, WorkIcon as y };
