import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Image, st as Flashlight } from "../_libs/lucide-react.mjs";
import { c as TopNav, n as Hl, o as Screen, s as Strokes, t as A } from "./mq-BfQmvpW9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/login-C8PsWvpo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Scanner() {
	const navigate = useNavigate();
	const [flash, setFlash] = (0, import_react.useState)(false);
	const [scanning, setScanning] = (0, import_react.useState)(false);
	const fileRef = (0, import_react.useRef)(null);
	const scan = () => {
		if (scanning) return;
		setScanning(true);
		setTimeout(() => navigate({ to: "/verification" }), 1400);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		deco: "tr",
		footer: "waves",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopNav, { back: "/welcome" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				style: {
					position: "relative",
					marginTop: 18
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "mq-title mq-title--lg",
					children: ["Scan Your ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Hl, { children: "Maatram ID" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strokes, { style: {
					right: "2%",
					top: -36
				} })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mq-sub",
				children: "Scan the QR code on your Maatram ID card to login and fetch your details instantly."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mq-scanner",
				onClick: scan,
				role: "button",
				"aria-label": "Tap to scan the Maatram ID",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: `${A}/photos/maatram-id-qr-card-reference.jpg`,
						alt: "Maatram ID card held up to the camera"
					}),
					flash && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mq-scanner__flash" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mq-scanner__line" }),
					scanning && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mq-scanner__status",
						children: "QR detected · MT4507"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mq-scan-actions",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "mq-scan-action",
						"aria-pressed": flash,
						onClick: () => setFlash((f) => !f),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Flashlight, { size: 26 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Flash" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: "mq-scan-action",
						onClick: () => fileRef.current?.click(),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, { size: 26 }) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Scan from Gallery" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						ref: fileRef,
						type: "file",
						accept: "image/*",
						hidden: true,
						onChange: (e) => e.target.files?.length && scan()
					})
				]
			})
		]
	});
}
//#endregion
export { Scanner as component };
