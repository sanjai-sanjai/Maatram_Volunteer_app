import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { kt as Check } from "../_libs/lucide-react.mjs";
import { m as mockStudent } from "./mock-DstdW3Hp.mjs";
import { n as Hl, o as Screen, r as Logo, t as A } from "./mq-BfQmvpW9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/verification-DoCHeDJL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var steps = [
	{
		t: "QR Code Scanned",
		s: `ID Detected: ${mockStudent.maatramId}`
	},
	{
		t: "Fetching Your Details",
		s: "Retrieving from Maatram database..."
	},
	{
		t: "Verifying Profile",
		s: "Matching your student record..."
	},
	{
		t: "Preparing Your Dashboard",
		s: "Almost there..."
	}
];
function Verifying() {
	const navigate = useNavigate();
	const [active, setActive] = (0, import_react.useState)(2);
	(0, import_react.useEffect)(() => {
		if (active > steps.length) {
			const t = setTimeout(() => navigate({ to: "/verified" }), 500);
			return () => clearTimeout(t);
		}
		const t = setTimeout(() => setActive((a) => a + 1), 1300);
		return () => clearTimeout(t);
	}, [active, navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		deco: "tl",
		footer: "building",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginTop: 26 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mq-verify__ring",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("svg", {
					className: "mq-spinring",
					viewBox: "0 0 100 100",
					"aria-hidden": true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("circle", {
						cx: "50",
						cy: "50",
						r: "47",
						fill: "none",
						stroke: "#FEC802",
						strokeWidth: "1.6",
						strokeDasharray: "40 18 8 30",
						strokeLinecap: "round"
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: `${A}/illustrations/verification-id-badge.png`,
					alt: "Maatram ID being verified"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
				className: "mq-title mq-title--md",
				style: { marginTop: 18 },
				children: [
					"Verifying Your ",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hl, { children: "Maatram" }),
					" ID..."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mq-sub",
				children: "Scanning and fetching your profile details from the Maatram database"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mq-timeline",
				children: steps.map((st, i) => {
					const n = i + 1;
					const state = n < active ? "done" : n === active ? "active" : "idle";
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: `mq-dot ${state === "done" ? "mq-dot--done" : state === "active" ? "mq-dot--active" : ""}`,
							children: state === "done" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {
								size: 16,
								strokeWidth: 3.5
							})
						}),
						state === "idle" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mq-idle",
							children: st.t
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: st.t }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: st.s })] }),
						state === "active" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mq-dots",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
							]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {})
					] }, st.t);
				})
			})
		]
	});
}
//#endregion
export { Verifying as component };
