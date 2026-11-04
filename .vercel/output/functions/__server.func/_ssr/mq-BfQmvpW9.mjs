import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { x as useRouter } from "../_libs/@tanstack/react-router+[...].mjs";
import { Jt as ArrowRight, Yt as ArrowLeft } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mq-BfQmvpW9.js
var import_jsx_runtime = require_jsx_runtime();
var A = "/assets";
function Logo({ small }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		className: small ? "mq-logo mq-logo--sm" : "mq-logo",
		src: `${A}/brand/maatram-foundation-logo.png`,
		alt: "Maatram Foundation",
		width: 371,
		height: 164
	});
}
function Screen({ children, deco = "tr", footer = "building" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mq-shell",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "mq-screen",
			children: [
				(deco === "tr" || deco === "both") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "mq-deco mq-deco--tr",
					src: `/assets/decorations/corner-wave-top-right.png`,
					alt: ""
				}),
				(deco === "tl" || deco === "both") && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "mq-deco mq-deco--tl-flip",
					src: `/assets/decorations/corner-wave-top-right.png`,
					alt: ""
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mq-screen__body",
					children
				}),
				footer === "building" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "mq-footer-art",
					src: `/assets/composites/foundation-building-footer.png`,
					alt: ""
				}),
				footer === "landscape" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					className: "mq-footer-art",
					src: `/assets/decorations/foundation-footer-landscape-composite.png`,
					alt: ""
				}),
				footer === "waves" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mq-waves",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: `/assets/decorations/bottom-wave-left.png`,
						alt: ""
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: `/assets/decorations/bottom-wave-right.png`,
						alt: ""
					})]
				})
			]
		})
	});
}
function BackButton({ to }) {
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
		className: "mq-back",
		"aria-label": "Go back",
		onClick: () => to ? router.navigate({ to }) : router.history.back(),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { size: 24 })
	});
}
function TopNav({ back }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "mq-topnav",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackButton, { to: back }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { small: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
		]
	});
}
function Hl({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "mq-hl",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children })
	});
}
function Strokes({ style, alt }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
		className: "mq-strokes",
		style,
		src: `${A}/decorations/${alt ? "yellow-emphasis-strokes-alt" : "yellow-emphasis-strokes"}.png`,
		alt: ""
	});
}
function PrimaryButton({ children, ...rest }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
		className: "mq-btn",
		...rest,
		children: [
			children,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {
				size: 26,
				strokeWidth: 2.4
			})
		]
	});
}
function Stepper({ step }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "mq-stepper2",
		children: [
			"Basic Details",
			"Volunteer Details",
			"Verification"
		].map((l, i) => {
			const n = i + 1;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: n < step ? "done" : n === step ? "active" : "",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "n",
					children: n < step ? "✓" : n
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: l })]
			}, l);
		})
	});
}
function RegHeader({ step, back }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopNav, { back }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			style: {
				position: "relative",
				marginTop: 12
			},
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mq-title mq-title--md mq-title--italic",
				style: { whiteSpace: "nowrap" },
				children: [
					"Other ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hl, { children: "Volunteer" }),
					" Registration"
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strokes, { style: {
				right: "4%",
				top: -34
			} })]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "mq-sub",
			style: {
				marginTop: 4,
				maxWidth: "none"
			},
			children: "Create your account and join the Maatram community."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stepper, { step })
	] });
}
//#endregion
export { RegHeader as a, TopNav as c, PrimaryButton as i, Hl as n, Screen as o, Logo as r, Strokes as s, A as t };
