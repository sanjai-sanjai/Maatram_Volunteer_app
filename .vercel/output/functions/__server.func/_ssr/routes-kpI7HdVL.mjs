import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Ct as ClipboardCheck, i as Users, p as Trophy } from "../_libs/lucide-react.mjs";
import { o as Screen, r as Logo, s as Strokes, t as A } from "./mq-BfQmvpW9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-kpI7HdVL.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Splash() {
	const navigate = useNavigate();
	(0, import_react.useEffect)(() => {
		const t = setTimeout(() => navigate({ to: "/welcome" }), 3200);
		return () => clearTimeout(t);
	}, [navigate]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		deco: "tr",
		footer: "landscape",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginTop: 34 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mq-splash__title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Maatram" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
						className: "mq-splash__pill",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Volunteer Quest" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strokes, { style: {
						right: "4%",
						top: 12
					} })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mq-tagline",
				children: "Volunteer. Empower. Transform."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				className: "mq-swoosh",
				src: `${A}/decorations/yellow-underline-swoosh.png`,
				alt: ""
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				className: "mq-splash__hero",
				src: `${A}/composites/volunteer-hero-scene.png`,
				alt: "Maatram volunteer with students"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mq-features",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mq-feature",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, {}),
							"Find",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Opportunities"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mq-feature",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}),
							"Collaborate",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"& Volunteer"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mq-feature",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Trophy, {}),
							"Earn",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Recognition"
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mq-splash__from",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
					"From Volunteer Identification to",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Volunteer Recognition"
				] })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mq-eco",
				children: "One Connected Ecosystem"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mq-loader",
				role: "status",
				"aria-label": "Loading"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mq-loading-text",
				children: "Loading your volunteering space..."
			})
		]
	});
}
//#endregion
export { Splash as component };
