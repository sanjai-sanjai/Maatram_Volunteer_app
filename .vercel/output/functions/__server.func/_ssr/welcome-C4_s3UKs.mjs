import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { Et as ChevronRight, T as ShieldCheck, at as GraduationCap, i as Users, l as UserPlus } from "../_libs/lucide-react.mjs";
import { n as Hl, o as Screen, r as Logo, s as Strokes, t as A } from "./mq-BfQmvpW9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/welcome-C4_s3UKs.js
var import_jsx_runtime = require_jsx_runtime();
function Welcome() {
	const navigate = useNavigate();
	const roles = [
		{
			key: "student",
			title: "Maatram Student",
			sub: "Login with your Maatram ID (QR Scan)",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {
				className: "mq-role__icon",
				fill: "#FEC802"
			}),
			to: "/login",
			active: true
		},
		{
			key: "alumni",
			title: "Alumni",
			sub: "Login with your Maatram ID (QR Scan)",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, { className: "mq-role__icon" }),
			to: "/login"
		},
		{
			key: "admin",
			title: "Admin",
			sub: "Access to event & volunteer management",
			icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {
				className: "mq-role__icon",
				fill: "#FEC802"
			}),
			to: "/admin"
		}
	];
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		deco: "tr",
		footer: "waves",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				style: { marginTop: 26 },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, {})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					position: "relative",
					marginTop: 20
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mq-title mq-title--lg",
					children: [
						"Welcome to",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Maatram ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hl, { children: "Volunteer Quest" })
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strokes, { style: {
					right: "2%",
					top: 0
				} })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mq-sub",
				children: "A unified platform to discover opportunities, collaborate, and create real impact."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
				className: "mq-welcome__art",
				src: `${A}/illustrations/welcome-volunteers.jpg`,
				alt: "Maatram volunteers walking to school"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mq-divider-title",
				children: "Continue as"
			}),
			roles.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: r.active ? "mq-role mq-role--active" : "mq-role",
				onClick: () => navigate({ to: r.to }),
				children: [
					r.icon,
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: r.title }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: r.sub })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, { size: 24 })
				]
			}, r.key)),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mq-or",
				children: "or"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				className: "mq-other",
				onClick: () => navigate({ to: "/register/basic" }),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserPlus, { size: 26 }), " Other Volunteer"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mq-other-sub",
				children: "Create a new account and join the Maatram community"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { style: { height: 20 } })
		]
	});
}
//#endregion
export { Welcome as component };
