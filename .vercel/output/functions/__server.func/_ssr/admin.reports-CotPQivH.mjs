import { o as __toESM } from "../_runtime.mjs";
import { S as topContributors, c as contributionSeries, s as contributionMax, x as topAlumni, y as reportMetrics } from "./admin-mock-D2qySwaK.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as maatram_logo_full_default, t as admin_profile_avatar_default } from "./admin-profile-avatar-Cks5CCdP.mjs";
import { Ht as Bell, Ot as ChevronDown, Pt as CalendarDays, S as Sparkles, a as UsersRound, at as GraduationCap, bt as Clock, ht as Download, m as TrendingUp, t as X } from "../_libs/lucide-react.mjs";
import { n as AdminFrame, r as Chip, t as AdminBack } from "./admin-ui-BN78hV-l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.reports-CotPQivH.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var rep_icon_volunteers_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3ccircle%20cx='32'%20cy='18'%20r='8'%20fill='none'%20stroke='%2310152F'%20stroke-width='4'/%3e%3ccircle%20cx='14'%20cy='25'%20r='6'%20fill='none'%20stroke='%2310152F'%20stroke-width='4'/%3e%3ccircle%20cx='50'%20cy='25'%20r='6'%20fill='none'%20stroke='%2310152F'%20stroke-width='4'/%3e%3cpath%20d='M18%2054c1-13%208-20%2014-20s13%207%2014%2020M3%2054c1-9%205-14%2011-14M50%2040c6%200%2010%205%2011%2014'%20fill='none'%20stroke='%2310152F'%20stroke-width='4'/%3e%3c/svg%3e";
var rep_icon_calendar_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3crect%20x='9'%20y='13'%20width='46'%20height='42'%20rx='6'%20fill='none'%20stroke='%2310152F'%20stroke-width='4'/%3e%3cpath%20d='M9%2025h46M20%207v12M44%207v12'%20stroke='%2310152F'%20stroke-width='4'/%3e%3c/svg%3e";
var rep_icon_report_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cpath%20d='M10%2054V32h10v22M27%2054V18h10v36M44%2054V8h10v46'%20fill='none'%20stroke='%2310152F'%20stroke-width='5'/%3e%3c/svg%3e";
var rep_icon_rupee_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cpath%20d='M16%2012h32M16%2023h32M22%2012c12%200%2019%204%2019%2011s-7%2011-19%2011h-6l28%2020'%20fill='none'%20stroke='%2310152F'%20stroke-width='5'/%3e%3c/svg%3e";
var rep_icon_trophy_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%2064%2064'%3e%3cpath%20d='M20%208h24v15c0%2010-5%2016-12%2016s-12-6-12-16V8Z'%20fill='none'%20stroke='%2310152F'%20stroke-width='4'/%3e%3cpath%20d='M20%2013H8c0%2011%205%2017%2014%2017M44%2013h12c0%2011-5%2017-14%2017M32%2039v10M22%2055h20'%20fill='none'%20stroke='%2310152F'%20stroke-width='4'/%3e%3c/svg%3e";
var rep_yellow_wave_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20800%20180'%3e%3cpath%20d='M0%2090C130%200%20250%20180%20400%2090S650%200%20800%2075V180H0Z'%20fill='%23FFC800'/%3e%3c/svg%3e";
var rep_soft_glow_default = "data:image/svg+xml,%3csvg%20xmlns='http://www.w3.org/2000/svg'%20viewBox='0%200%20500%20500'%3e%3cdefs%3e%3cradialGradient%20id='g'%3e%3cstop%20stop-color='%23FFD84D'%20stop-opacity='.45'/%3e%3cstop%20offset='1'%20stop-color='%23FFD84D'%20stop-opacity='0'/%3e%3c/radialGradient%3e%3c/defs%3e%3ccircle%20cx='250'%20cy='250'%20r='250'%20fill='url(%23g)'/%3e%3c/svg%3e";
var metricIcons = {
	volunteers: rep_icon_volunteers_default,
	calendar: rep_icon_calendar_default,
	report: rep_icon_report_default,
	rupee: rep_icon_rupee_default
};
var ranges = [
	"This Month",
	"Last 3 Months",
	"This Year"
];
var notes = [
	"8 new proofs uploaded for Palm Seeds Plantation",
	"Volunteer hours up 18% compared to last month",
	"3 fund requests are waiting for approval"
];
function RepHead({ icon, title, link }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ad-rep-shead",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ad-rep-shead__bar",
				"aria-hidden": true
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "ad-rep-shead__tile",
				"aria-hidden": true,
				children: icon
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: title }),
			link && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/admin/manage/$section",
				params: { section: "volunteers" },
				className: "ad-link",
				children: "View All"
			})
		]
	});
}
function ContributionChart() {
	const W = 560, H = 266, L = 44, R = 524, T = 40, B = 232;
	const step = 480 / (contributionSeries.length - 1);
	const pts = contributionSeries.map((d, i) => ({
		...d,
		x: L + i * step,
		y: T + 192 * (1 - d.value / contributionMax)
	}));
	const line = pts.map((p, i) => `${i ? "L" : "M"}${p.x.toFixed(1)} ${p.y.toFixed(1)}`).join(" ");
	const area = `${line} L${R} ${B} L${L} ${B} Z`;
	const last = pts.length - 1;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: `0 0 ${W} ${H}`,
		role: "img",
		"aria-label": "Volunteer contribution trend from July to November, rising from 680 to 1,250",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("defs", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("linearGradient", {
				id: "rep-area",
				x1: "0",
				y1: "0",
				x2: "0",
				y2: "1",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "0",
					stopColor: "#FFC900",
					stopOpacity: "0.32"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("stop", {
					offset: "1",
					stopColor: "#FFC900",
					stopOpacity: "0"
				})]
			}) }),
			[
				0,
				250,
				500,
				750,
				1e3,
				1250
			].map((v) => {
				const y = T + 192 * (1 - v / contributionMax);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("line", {
					x1: L,
					x2: R,
					y1: y,
					y2: y,
					stroke: "#EEF0F4",
					strokeWidth: "1"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: 36,
					y: y + 4,
					textAnchor: "end",
					fontSize: "11",
					fill: "#8A93A6",
					children: v.toLocaleString("en-IN")
				})] }, v);
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: area,
				fill: "url(#rep-area)"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: line,
				fill: "none",
				stroke: "#FFC900",
				strokeWidth: "3.5",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			pts.map((p, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("g", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
					cx: p.x,
					cy: p.y,
					r: "5.5",
					fill: "#fff",
					stroke: "#FFC900",
					strokeWidth: "3"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
					x: p.x - 27,
					y: p.y - 36,
					width: "54",
					height: "24",
					rx: "12",
					fill: i === last ? "#FFC900" : "#fff",
					stroke: i === last ? "none" : "#F0E6C8"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: p.x,
					y: p.y - 19,
					textAnchor: "middle",
					fontSize: "12",
					fontWeight: i === last ? 700 : 600,
					fill: "#10152F",
					children: p.value.toLocaleString("en-IN")
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("text", {
					x: p.x,
					y: 256,
					textAnchor: "middle",
					fontSize: "12",
					fill: i === last ? "#10152F" : "#8A93A6",
					fontWeight: i === last ? 700 : 500,
					children: p.label
				})
			] }, p.label))
		]
	});
}
function ReportsDashboard() {
	const [range, setRange] = (0, import_react.useState)("This Month");
	const [rangeOpen, setRangeOpen] = (0, import_react.useState)(false);
	const [bell, setBell] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		import("./report-pdf-CPILiYJe.mjs");
	}, []);
	const exportReport = async () => {
		const { buildReportPdf } = await import("./report-pdf-CPILiYJe.mjs");
		const blob = await buildReportPdf(range);
		const url = URL.createObjectURL(blob);
		const a = document.createElement("a");
		a.href = url;
		a.download = `Maatram-Report-Analytics-${range.toLowerCase().replace(/\s+/g, "-")}.pdf`;
		a.click();
		setTimeout(() => URL.revokeObjectURL(url), 3e4);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminFrame, {
		nav: "Reports",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "ad-dash-head",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(AdminBack, { to: "/admin" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "ad-dash-head__logo",
						src: maatram_logo_full_default,
						alt: "Maatram Foundation"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-dash-head__text",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Maatram Foundation" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Reports & Analytics" })]
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
						"aria-label": "Admin profile",
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
				className: "ad-rep-hero",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "ad-rep-hero__glow",
						src: rep_soft_glow_default,
						alt: "",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "ad-rep-hero__wave",
						src: rep_yellow_wave_default,
						alt: "",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-rep-hero__text",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ad-rep-hero__badge",
							"aria-hidden": true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								src: rep_icon_report_default,
								alt: ""
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Reports & Analytics" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Track volunteering performance, alumni impact and community contributions in real time." })] })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-rep-hero__actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ad-rep-range",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: "ad-rep-range__btn",
								"aria-expanded": rangeOpen,
								onClick: () => setRangeOpen((o) => !o),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 16 }),
									" ",
									range,
									" ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, { size: 14 })
								]
							}), rangeOpen && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ad-rep-range__menu",
								role: "menu",
								"aria-label": "Report period",
								children: ranges.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									role: "menuitem",
									className: r === range ? "active" : "",
									onClick: () => {
										setRange(r);
										setRangeOpen(false);
									},
									children: r
								}, r))
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "ad-rep-export",
							onClick: exportReport,
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Download, { size: 16 }), " Export Report"]
						})]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ad-rep-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepHead, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 18 }),
					title: "Impact Overview"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ad-rep-metrics",
					children: reportMetrics.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
						className: "ad-rep-metric",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ad-rep-metric__icon",
								"aria-hidden": true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: metricIcons[m.icon],
									alt: ""
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: m.value }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ad-rep-metric__label",
								children: m.label
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Chip, {
								tone: "green",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 12 }),
									" ",
									m.delta
								]
							})
						]
					}, m.label))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ad-rep-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepHead, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TrendingUp, { size: 18 }),
					title: "Volunteers Contribution"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ad-card ad-rep-chart",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ContributionChart, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ad-rep-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepHead, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: rep_icon_trophy_default,
						alt: ""
					}),
					title: "Top Contributed Volunteers",
					link: true
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ad-card ad-rep-vols",
					children: topContributors.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-rep-vrow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `ad-rep-medal ad-rep-medal--${v.rank}`,
								"aria-label": `Rank ${v.rank}`,
								children: v.rank
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "ad-rep-ava",
								src: v.avatar,
								alt: v.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ad-rep-vrow__who",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: v.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { size: 13 }),
									" ",
									v.meta
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ad-rep-vrow__hours",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
									className: "ic",
									"aria-hidden": true,
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 16 })
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [v.hours, " hrs"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Contributed" })] })]
							})
						]
					}, v.rank))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ad-rep-section",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RepHead, {
					icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { size: 18 }),
					title: "Top Performing Alumni"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "ad-card ad-rep-alumni",
					children: topAlumni.map((a) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-rep-arow",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: `ad-rep-rank ad-rep-rank--${a.rank}`,
								"aria-label": `Rank ${a.rank}`,
								children: a.rank
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
								className: "ad-rep-ava",
								src: a.avatar,
								alt: a.name
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ad-rep-arow__body",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: a.name }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, { size: 13 }),
										" ",
										a.meta
									] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ad-rep-arow__stats",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, { size: 13 }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: a.eventsLed }),
											" Events Led"
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, { size: 13 }),
											" ",
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [a.hours, " hrs"] }),
											" Total Contribution"
										] })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "ad-rep-alumni-badge",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: rep_icon_trophy_default,
										alt: "",
										"aria-hidden": true
									}),
									" ",
									a.badge
								]
							})
						]
					}, a.rank))
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ad-rep-insight",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "ad-rep-insight__glow",
						src: rep_soft_glow_default,
						alt: "",
						"aria-hidden": true
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-rep-insight__head",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ad-rep-insight__spark",
							"aria-hidden": true,
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 18 })
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "This Month’s Insight" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
						"Volunteer participation ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "increased by 18%" }),
						" compared to last month. A total of ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "42 events" }),
						" were completed, engaging ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "4,500 volunteers" }),
						".",
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "₹5,600" }),
						" was funded to support volunteer contributions."
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
						className: "ad-rep-insight__art",
						viewBox: "0 0 96 74",
						"aria-hidden": true,
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M6 60 C22 58 44 48 62 30",
								fill: "none",
								stroke: "#F5B900",
								strokeWidth: "4",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
								d: "M62 30 l-2 -10 M62 30 l-10 1",
								fill: "none",
								stroke: "#F5B900",
								strokeWidth: "4",
								strokeLinecap: "round"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "6",
								y: "48",
								width: "14",
								height: "24",
								rx: "4",
								fill: "#FFC900"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "26",
								y: "38",
								width: "14",
								height: "34",
								rx: "4",
								fill: "#FFC900"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "46",
								y: "26",
								width: "14",
								height: "46",
								rx: "4",
								fill: "#FFC900"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
								x: "66",
								y: "12",
								width: "14",
								height: "60",
								rx: "4",
								fill: "#F5B900"
							})
						]
					})
				]
			})
		]
	});
}
//#endregion
export { ReportsDashboard as component };
