import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { K as Lock, Nt as Camera, P as Phone, W as Mail, c as UserRound, dt as Eye, f as Upload, ft as EyeOff, o as User } from "../_libs/lucide-react.mjs";
import { h as regDraft } from "./mock-DstdW3Hp.mjs";
import { a as RegHeader, i as PrimaryButton, o as Screen, s as Strokes } from "./mq-BfQmvpW9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register.basic-xTkck2EX.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Basic() {
	const navigate = useNavigate();
	const [v, setV] = (0, import_react.useState)({
		name: regDraft.name ?? "",
		mobile: regDraft.mobile ?? "",
		email: regDraft.email ?? "",
		password: "",
		confirm: ""
	});
	const [show, setShow] = (0, import_react.useState)({
		password: false,
		confirm: false
	});
	const [errors, setErrors] = (0, import_react.useState)({});
	const [photo, setPhoto] = (0, import_react.useState)(regDraft.photo || null);
	const fileRef = (0, import_react.useRef)(null);
	const submit = () => {
		const e = {};
		if (!v.name.trim()) e.name = "Please enter your full name";
		if (!/^\d{10}$/.test(v.mobile)) e.mobile = "Enter a valid 10-digit mobile number";
		if (!/^\S+@\S+\.\S+$/.test(v.email)) e.email = "Enter a valid email address";
		if (v.password.length < 6) e.password = "Use at least 6 characters";
		if (v.confirm !== v.password || !v.confirm) e.confirm = "Passwords do not match";
		setErrors(e);
		if (Object.keys(e).length) return;
		Object.assign(regDraft, {
			name: v.name,
			mobile: v.mobile,
			email: v.email,
			photo: photo ?? void 0
		});
		navigate({ to: "/register/volunteer" });
	};
	const field = (k, label, icon, ph, type = "text") => {
		const pw = k === "password" || k === "confirm";
		const visible = pw && show[k];
		return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mq-frow",
			children: [icon, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
					htmlFor: k,
					children: [
						label,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mq-req",
							children: "*"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mq-inp",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						id: k,
						type: pw ? visible ? "text" : "password" : type,
						placeholder: ph,
						value: v[k],
						inputMode: k === "mobile" ? "numeric" : void 0,
						onChange: (e) => setV({
							...v,
							[k]: k === "mobile" ? e.target.value.replace(/\D/g, "").slice(0, 10) : e.target.value
						})
					}), pw && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						className: "trail",
						"aria-label": "Toggle password visibility",
						onClick: () => setShow({
							...show,
							[k]: !visible
						}),
						children: visible ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EyeOff, { size: 22 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Eye, { size: 22 })
					})]
				}),
				errors[k] && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mq-err",
					children: errors[k]
				})
			] })]
		});
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		deco: "tr",
		footer: "building",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegHeader, {
			step: 1,
			back: "/welcome"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mq-regcard",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mq-sechead",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Basic Details" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Let's start with your personal information." })] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mq-photo-up",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mq-avatar-ring",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: photo ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
									src: photo,
									alt: "Profile preview"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {
									size: 110,
									strokeWidth: 1.2
								}) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "cam",
									"aria-label": "Upload photo",
									onClick: () => fileRef.current?.click(),
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { size: 18 })
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Strokes, { style: {
									right: -26,
									top: -6,
									width: 34
								} })
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", {
								style: { fontSize: 17 },
								children: "Upload Profile Photo"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								style: {
									margin: "2px 0 0",
									fontSize: 14,
									color: "var(--mq-navy)"
								},
								children: "Add a clear photo of yourself"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: "mq-choose",
								onClick: () => fileRef.current?.click(),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Upload, { size: 20 }), " Choose Photo"]
							})
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: "image/*",
							hidden: true,
							onChange: (e) => {
								const f = e.target.files?.[0];
								if (f) setPhoto(URL.createObjectURL(f));
							}
						})
					]
				}),
				field("name", "Full Name", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(User, {}), "Enter your full name"),
				field("mobile", "Mobile Number", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {}), "Enter your 10-digit mobile number", "tel"),
				field("email", "Email ID", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {}), "Enter your email address", "email"),
				field("password", "Create Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {}), "Create a strong password"),
				field("confirm", "Confirm Password", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Lock, {}), "Re-enter your password"),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { marginTop: 18 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
						onClick: submit,
						children: "Continue"
					})
				})
			]
		})]
	});
}
//#endregion
export { Basic as component };
