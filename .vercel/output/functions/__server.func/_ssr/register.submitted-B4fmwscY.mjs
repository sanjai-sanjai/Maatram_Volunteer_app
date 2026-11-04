import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Send, Ht as Bell, Jt as ArrowRight, kt as Check, lt as FileSearch } from "../_libs/lucide-react.mjs";
import { i as PrimaryButton, n as Hl, o as Screen, r as Logo, s as Strokes, t as A } from "./mq-BfQmvpW9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register.submitted-B4fmwscY.js
var import_jsx_runtime = require_jsx_runtime();
function Submitted() {
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
				className: "mq-env",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "main",
					src: `${A}/illustrations/registration-envelope-success.png`,
					alt: "Details sent"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "s",
					src: `${A}/decorations/yellow-emphasis-strokes.png`,
					alt: ""
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					position: "relative",
					marginTop: 14
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mq-title mq-title--md mq-title--italic",
					children: ["Your Details Have ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hl, { children: "Been Sent!" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strokes, { style: {
					right: 0,
					top: -48
				} })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mq-sub",
				style: { maxWidth: "38ch" },
				children: "Thank you for your interest in joining the Maatram volunteer community. Our Maatram team will review and verify your profile."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mq-stages",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "c",
							style: { background: "#FFEFB3" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, { size: 30 }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mq-ok",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
									size: 13,
									strokeWidth: 3.5
								})
							})]
						}),
						"Details",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Sent"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "a" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "c",
							style: {
								border: "3px solid var(--mq-yellow)",
								background: "#fff"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileSearch, { size: 30 })
						}),
						"Profile",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Verification"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "a" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "c",
							style: {
								border: "3px solid #DCDDE1",
								background: "#F5F5F6"
							},
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { size: 30 })
						}),
						"Get",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Notified"
					] })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mq-notice",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, {
						size: 40,
						fill: "#FEC802",
						style: { justifySelf: "center" }
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "You'll be notified once your account is approved." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { margin: "22px 12% 6px" },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
					onClick: () => navigate({ to: "/welcome" }),
					children: "Back to Login"
				})
			})
		]
	});
}
//#endregion
export { Submitted as component };
