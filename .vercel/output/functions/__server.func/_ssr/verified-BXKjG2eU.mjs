import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Lt as Building2, Pt as CalendarDays, U as MapPin, Vt as BookOpen, X as Landmark, at as GraduationCap, j as QrCode } from "../_libs/lucide-react.mjs";
import { m as mockStudent } from "./mock-DstdW3Hp.mjs";
import { i as PrimaryButton, n as Hl, o as Screen, r as Logo, t as A } from "./mq-BfQmvpW9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verified-BXKjG2eU.js
var import_jsx_runtime = require_jsx_runtime();
function Verified() {
	const navigate = useNavigate();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		deco: "tl",
		footer: "building",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginTop: 26 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mq-check",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "l",
						src: `${A}/decorations/yellow-emphasis-strokes.png`,
						alt: ""
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: `${A}/illustrations/success-checkmark.png`,
						alt: "Success"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						className: "r",
						src: `${A}/decorations/yellow-emphasis-strokes.png`,
						alt: ""
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mq-title mq-title--lg mq-title--italic",
				children: ["Login ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hl, { children: "Successful!" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mq-sub",
				style: { maxWidth: "30ch" },
				children: "Your Maatram ID has been verified and your profile has been fetched successfully."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mq-profile",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "mq-profile__photo",
					src: `${A}/photos/student-portrait.jpg`,
					alt: mockStudent.name
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					style: { minWidth: 0 },
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: mockStudent.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mq-idpill",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Maatram ID: ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: mockStudent.maatramId })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QrCode, { size: 22 })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mq-pinfo",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: mockStudent.category })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mq-pinfo",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: mockStudent.college })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mq-pinfo",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BookOpen, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								mockStudent.department,
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
								"(",
								mockStudent.academicPeriod,
								")"
							] })]
						})
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mq-triple",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 26 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: mockStudent.year })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 24 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Native Location" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: mockStudent.nativeLocation })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Building2, { size: 24 }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "College Location" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: mockStudent.collegeLocation })
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { margin: "22px 8% 6px" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
					onClick: () => navigate({ to: "/dashboard" }),
					children: "Continue to Dashboard"
				})
			})
		]
	});
}
//#endregion
export { Verified as component };
