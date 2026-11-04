import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as UsersRound, gt as Crown, p as Trophy, s as UserX } from "../_libs/lucide-react.mjs";
import { a as volunteers, i as volunteerCounts, r as matchesSearch } from "./volunteers-mock-DFczRHcg.mjs";
import { _ as VolunteerHero, c as SearchBar, f as Toast, g as VolunteerHeader, h as VolunteerFrame, l as SheetsIcon, m as VolunteerCategories, o as ListHead, s as Pagination, v as VolunteerListItem, x as useApproved } from "./volunteers-DcsKbkG3.mjs";
import { t as Route } from "./admin.volunteers.index-CCfjAZNJ.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.volunteers.index-Dl3O5468.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var first = [
	"Karthik",
	"Nandhini",
	"Aravind",
	"Keerthana",
	"Vignesh",
	"Sanjai",
	"Divya",
	"Prakash",
	"Kavya",
	"Saravanan",
	"Meena",
	"Surya",
	"Lakshmi",
	"Arun",
	"Priya",
	"Bharath",
	"Gayathri",
	"Dinesh",
	"Janani",
	"Harish",
	"Abinaya",
	"Manikandan",
	"Swetha",
	"Ramesh",
	"Pavithra",
	"Gokul",
	"Deepika",
	"Sathish",
	"Revathi",
	"Vijay",
	"Anitha",
	"Murugan",
	"Sowmya",
	"Balaji",
	"Ishwarya",
	"Naveen",
	"Yamini",
	"Senthil",
	"Kowsalya",
	"Ajith"
];
var last = [
	"R",
	"S",
	"K",
	"M",
	"P",
	"V",
	"A",
	"N",
	"T",
	"G",
	"B",
	"J",
	"L",
	"C",
	"D"
];
var cities = [
	"Chennai",
	"Coimbatore",
	"Madurai",
	"Tiruchirappalli",
	"Salem",
	"Tirunelveli",
	"Erode",
	"Vellore",
	"Thoothukudi",
	"Thanjavur",
	"Dindigul",
	"Kanchipuram",
	"Karur",
	"Nagercoil",
	"Cuddalore"
];
var colleges = [
	"Anna University",
	"PSG College of Technology",
	"Loyola College",
	"Madras Christian College",
	"Thiagarajar College of Engineering",
	"SSN College of Engineering",
	"Presidency College",
	"Stella Maris College",
	"Bharathiar University",
	"NIT Tiruchirappalli",
	"Coimbatore Institute of Technology",
	"Madurai Kamaraj University",
	"Sri Krishna College",
	"VIT Vellore",
	"Kumaraguru College"
];
var activities = [
	"Tutoring",
	"Blood Donation Drive",
	"Tree Plantation",
	"Mentoring Juniors",
	"Career Guidance Session",
	"Beach Clean-up",
	"Food Distribution",
	"Digital Literacy Class",
	"Fundraising Event",
	"Health Camp Support",
	"Library Setup",
	"Awareness Campaign"
];
var roles = [
	"Student",
	"Student",
	"Student",
	"Student",
	"Alumni Volunteer",
	"Admin",
	"Coordinator",
	"Mentor"
];
var STATUS = [
	"Recognized",
	"Not Recognized",
	"Verify Pending"
];
var seed = 42;
var rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
var pick = (a) => a[Math.floor(rnd() * a.length)];
function rows(count, kind, start) {
	return Array.from({ length: count }, (_, i) => {
		const n = rnd() < .5 ? 1 : rnd() < .7 ? 2 : 3;
		const acts = kind === "non" ? "—" : Array.from(new Set(Array.from({ length: kind === "top" ? n + 2 : n }, () => pick(activities)))).join(", ");
		const hours = kind === "non" ? 0 : kind === "top" ? 120 + Math.floor(rnd() * 280) : 4 + Math.floor(rnd() * 110);
		const status = kind === "top" ? rnd() < .85 ? STATUS[0] : STATUS[2] : kind === "non" ? rnd() < .6 ? STATUS[1] : STATUS[2] : pick(STATUS);
		return [
			`${pick(first)} ${pick(last)}`,
			pick(roles),
			`MQ-2026-${String(start + i).padStart(5, "0")}`,
			pick(cities),
			pick(colleges),
			acts,
			hours,
			status
		];
	});
}
async function exportVolunteersSheet() {
	const ExcelJS = (await import("../_libs/exceljs+[...].mjs").then((n) => /* @__PURE__ */ __toESM(n.t()))).default;
	seed = 42;
	const wb = new ExcelJS.Workbook();
	const header = [
		"Name",
		"Role",
		"Maatram ID",
		"Location",
		"College Name",
		"Activities Done",
		"Hours Contributed",
		"Status"
	];
	const tabs = [
		[
			"Volunteered",
			3240,
			"vol"
		],
		[
			"Non-Volunteered",
			980,
			"non"
		],
		[
			"Top Volunteers",
			120,
			"top"
		]
	];
	let id = 1;
	for (const [name, count, kind] of tabs) {
		const ws = wb.addWorksheet(name, { views: [{
			state: "frozen",
			ySplit: 1
		}] });
		ws.columns = [
			28,
			18,
			18,
			18,
			34,
			48,
			18,
			18
		].map((width) => ({ width }));
		ws.addRow(header);
		const h = ws.getRow(1);
		h.font = {
			bold: true,
			color: { argb: "FFFFFFFF" }
		};
		h.fill = {
			type: "pattern",
			pattern: "solid",
			fgColor: { argb: "FF1F3A93" }
		};
		let data = rows(count, kind, id);
		if (kind === "top") data = data.sort((a, b) => b[6] - a[6]);
		id += count;
		ws.addRows(data);
		const last = count + 1;
		for (let r = 2; r <= last; r++) ws.getCell(`H${r}`).dataValidation = {
			type: "list",
			allowBlank: false,
			formulae: [`"${STATUS.join(",")}"`]
		};
		ws.addConditionalFormatting({
			ref: `H2:H${last}`,
			rules: [
				[
					"Recognized",
					"FFB7E1CD",
					"FF0B6B3A"
				],
				[
					"Not Recognized",
					"FFF4C7C3",
					"FFA50E0E"
				],
				[
					"Verify Pending",
					"FFE0E0E0",
					"FF555555"
				]
			].map(([t, bg, fg], i) => ({
				type: "expression",
				formulae: [`$H2="${t}"`],
				priority: i + 1,
				style: {
					fill: {
						type: "pattern",
						pattern: "solid",
						bgColor: { argb: bg }
					},
					font: {
						color: { argb: fg },
						bold: true
					}
				}
			}))
		});
		ws.autoFilter = {
			from: "A1",
			to: `H1`
		};
	}
	const buf = await wb.xlsx.writeBuffer();
	const url = URL.createObjectURL(new Blob([buf], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }));
	const a = document.createElement("a");
	a.href = url;
	a.download = "Maatram_Volunteers_Data.xlsx";
	a.click();
	setTimeout(() => URL.revokeObjectURL(url), 2e3);
}
function VolunteersPage() {
	const { tab = "verification" } = Route.useSearch();
	const navigate = useNavigate({ from: "/admin/volunteers/" });
	const approved = useApproved();
	const [q, setQ] = (0, import_react.useState)("");
	const [filter, setFilter] = (0, import_react.useState)("All");
	const [seg, setSeg] = (0, import_react.useState)("volunteered");
	const [toast, setToast] = (0, import_react.useState)("");
	const base = volunteers.filter((v) => matchesSearch(v, q) && (filter === "All" || v.status === filter));
	const pending = base.filter((v) => v.pending && !approved.includes(v.id));
	const pendingCount = volunteerCounts.verification - approved.length;
	const dir = base.filter((v) => seg === "non" ? !v.volunteered : seg === "top" ? v.top : true);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VolunteerFrame, {
		export: tab === "all" || tab === "active",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerHeader, { crumb: tab === "all" ? "All Volunteers" : tab === "active" ? "Active" : tab === "tiers" ? "Tier Management" : void 0 }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerHero, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerCategories, {
				tab,
				pending: pendingCount,
				onTab: (t) => {
					setQ("");
					navigate({ search: t === "verification" ? {} : { tab: t } });
				}
			}),
			tab === "verification" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "vl-card vl-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListHead, {
						title: "Volunteer Verification",
						sub: "Review and verify volunteer profiles.",
						badge: pendingCount
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {
						value: q,
						onChange: setQ,
						placeholder: "Search by name, email or location...",
						filter,
						onFilter: setFilter
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "vl-list",
						children: [pending.map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerListItem, {
							v,
							mode: "pending"
						}, v.id)), pending.length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "vl-empty",
							children: "No pending volunteers match your search."
						})]
					})
				]
			}),
			(tab === "all" || tab === "active") && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "vl-card vl-panel",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListHead, {
						title: tab === "all" ? "All Volunteers" : "Active Volunteers",
						count: tab === "all" ? "(4,500)" : "(286)",
						sub: tab === "all" ? "Complete list of students and other volunteers." : "Volunteers engaged in the last 30 days."
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SearchBar, {
						value: q,
						onChange: setQ,
						placeholder: "Search by name, email, ID or location...",
						filter,
						onFilter: setFilter
					}),
					tab === "all" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "vl-segs",
						role: "tablist",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								role: "tab",
								"aria-selected": seg === "volunteered",
								className: seg === "volunteered" ? "is-on" : "",
								onClick: () => setSeg("volunteered"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UsersRound, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Volunteered",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"(3,240)"
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								role: "tab",
								"aria-selected": seg === "non",
								className: seg === "non" ? "is-on" : "",
								onClick: () => setSeg("non"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserX, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Non-Volunteered",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"(980)"
								] })]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								role: "tab",
								"aria-selected": seg === "top",
								className: seg === "top" ? "is-on" : "",
								onClick: () => setSeg("top"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
									"Top Volunteered",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
									"(120)"
								] })]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "vl-list",
						children: [(tab === "active" ? base.filter((v) => v.volunteered) : dir).map((v) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VolunteerListItem, {
							v,
							mode: "directory"
						}, v.id)), (tab === "active" ? base.filter((v) => v.volunteered) : dir).length === 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "vl-empty",
							children: "No volunteers match your search."
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pagination, { total: tab === "all" ? seg === "volunteered" ? volunteerCounts.all : seg === "non" ? volunteerCounts.nonVolunteered : volunteerCounts.top : volunteerCounts.active })
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "vl-export",
				onClick: () => {
					setToast("Preparing sheet download…");
					exportVolunteersSheet().then(() => setToast("Volunteer sheet downloaded"));
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SheetsIcon, {}), "Export G-Sheet Data"]
			})] }),
			tab === "tiers" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "vl-card vl-panel",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ListHead, {
					title: "Tier Management",
					sub: "Recognise volunteers by their level of engagement."
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "vl-tiers",
					children: [
						[
							"Tier 1",
							"40+ service hours",
							120
						],
						[
							"Tier 2",
							"15–40 service hours",
							860
						],
						[
							"Tier 3",
							"Under 15 service hours",
							2260
						]
					].map(([t, d, n]) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "vl-tier",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "vl-tile",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Crown, { className: "vl-crown" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("strong", { children: [t, " Volunteers"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: d })] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: Number(n).toLocaleString("en-IN") })
						]
					}, t))
				})]
			}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, {
				text: toast,
				onDone: () => setToast("")
			})
		]
	});
}
//#endregion
export { VolunteersPage as component };
