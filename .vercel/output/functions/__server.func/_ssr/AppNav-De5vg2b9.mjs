import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { _t as Compass, c as UserRound, i as Users, jt as ChartNoAxesColumnIncreasing, tt as House } from "../_libs/lucide-react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AppNav-De5vg2b9.js
var import_jsx_runtime = require_jsx_runtime();
var items = [
	{
		to: "/dashboard",
		label: "Home",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {})
	},
	{
		to: "/explore",
		label: "Explore",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Compass, {})
	},
	{
		to: "/community",
		label: "Community",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {})
	},
	{
		to: "/impact",
		label: "Impact",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartNoAxesColumnIncreasing, {})
	},
	{
		to: "/profile",
		label: "Profile",
		icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {})
	}
];
function BottomNav({ active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "mq-dashboard__bottom-nav",
		"aria-label": "Main navigation",
		children: items.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: i.to,
			className: "mq-dashboard__nav-item",
			"aria-current": active === i.label ? "page" : void 0,
			children: [i.icon, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: i.label })]
		}, i.to))
	});
}
//#endregion
export { BottomNav as t };
