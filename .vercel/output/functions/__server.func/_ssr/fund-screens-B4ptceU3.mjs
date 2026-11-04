import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { D as Send, L as Paperclip, M as Plus, O as Search, Pt as CalendarDays, T as ShieldCheck, X as Landmark, Z as Info, _ as Tag, ct as FileText, kt as Check, n as Wallet, t as X, tt as House, vt as Coins } from "../_libs/lucide-react.mjs";
import { _ as validateFundRequest } from "./mock-DstdW3Hp.mjs";
import { n as useMaatramState } from "./MaatramState-CxlAJjDd.mjs";
import { c as Page, l as Primary, n as Forward, r as Header, t as Action } from "./additional-shared-BMdf0ZjP.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/fund-screens-B4ptceU3.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var initial = {
	title: "Travel Allowance",
	description: "Travelled to the event location (Chennai) for Palm Seeds Plantation.",
	amount: "250",
	category: "Travel",
	payment: "UPI",
	reference: "sanjai-1806@okaxis",
	bankAccount: "",
	ifsc: "",
	files: ["Bus_Ticket.jpg"]
};
function FundScreen() {
	const [draft, setDraft] = (0, import_react.useState)(initial);
	const [errors, setErrors] = (0, import_react.useState)([]);
	const navigate = useNavigate();
	const state = useMaatramState();
	function field(key, value) {
		setDraft((old) => ({
			...old,
			[key]: value
		}));
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "ma-fund",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { back: "/community/palm-plantation/chat" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-fund-title",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Fund Request" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Palm Seeds Plantation" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "ma-notice",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {}), "Raise a reimbursement request for event-related expenses (e.g., travel allowance, food, materials, etc.)."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				onSubmit: (e) => {
					e.preventDefault();
					const found = validateFundRequest(draft);
					setErrors(found);
					if (!found.length) {
						state.submitFund(draft);
						navigate({ to: "/fund-request/success" });
					}
				},
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ma-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {}),
							"Expense Title ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "*" })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
							value: draft.title,
							onChange: (e) => field("title", e.target.value),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Select expense title"
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Travel Allowance" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Food Allowance" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Event Materials" }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other Expense" })
							]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ma-field",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}),
								"Description ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "*" })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								maxLength: 200,
								value: draft.description,
								onChange: (e) => field("description", e.target.value)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", {
								className: "ma-counter",
								children: [draft.description.length, " / 200"]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ma-fund-columns",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ma-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Coins, {}),
								"Amount Requested ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "*" })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ma-amount",
								children: ["₹", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									type: "number",
									min: "1",
									"aria-label": "Amount Requested",
									value: draft.amount,
									onChange: (e) => field("amount", e.target.value)
								})]
							})]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
							className: "ma-field",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Landmark, {}),
								"Expense Category ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "*" })
							] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								value: draft.category,
								onChange: (e) => field("category", e.target.value),
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
										value: "",
										children: "Select category"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Travel" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Food" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Materials" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: "Other" })
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ma-field",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, {}),
							"Upload Bill / Proof ",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "*" })
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ma-proof-files",
							children: [draft.files.map((name) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ma-proof-file",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: name }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "236 KB" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
										"aria-label": `Remove ${name}`,
										size: "icon",
										onClick: () => field("files", draft.files.filter((f) => f !== name)),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
									})
								]
							}, name)), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
								className: "ma-add-file",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: ["Add more", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "(Max 5)" })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										className: "ma-sr",
										type: "file",
										multiple: true,
										accept: "image/*,.pdf",
										"aria-label": "Add bill or proof",
										disabled: draft.files.length >= 5,
										onChange: (e) => field("files", [...draft.files, ...Array.from(e.target.files ?? []).map((f) => f.name)].slice(0, 5))
									})
								]
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
						className: "ma-payment",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("legend", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {}),
								"Payment Information ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "*" })
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "payment",
								checked: draft.payment === "UPI",
								onChange: () => field("payment", "UPI")
							}), "UPI (GPay / PhonePe / Paytm)"] }),
							draft.payment === "UPI" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "UPI ID",
								value: draft.reference,
								onChange: (e) => field("reference", e.target.value),
								placeholder: "Your UPI ID"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "radio",
								name: "payment",
								checked: draft.payment === "Bank Account",
								onChange: () => field("payment", "Bank Account")
							}), "Bank Account"] }),
							draft.payment === "Bank Account" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "Bank Account Number",
								placeholder: "Account number",
								value: draft.bankAccount,
								onChange: (e) => field("bankAccount", e.target.value.replace(/\D/g, ""))
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								"aria-label": "IFSC Code",
								placeholder: "IFSC code",
								value: draft.ifsc,
								onChange: (e) => field("ifsc", e.target.value.toUpperCase())
							})] })
						]
					}),
					errors.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						role: "alert",
						className: "ma-errors",
						children: errors.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: e }, e))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Primary, {
						type: "submit",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}), "Submit Request"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "ma-verification-note",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
							"Your request will be verified by the Maatram team.",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Once approved, the amount will be credited to your account."
						]
					})
				]
			})
		]
	});
}
function FundSuccessScreen() {
	const draft = useMaatramState().fundRequest ?? initial;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page, {
		className: "ma-fund-success",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Header, { back: "/fund-request" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-fund-title",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Fund Request" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Palm Seeds Plantation" })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-fund-art",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "₹" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: "/assets/illustrations/success-checkmark.png",
					alt: "Request submitted"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Fund Request Submitted!" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "ma-centered",
				children: [
					"Your request has been sent to the",
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
					"Maatram team for verification."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ma-request-summary",
				children: [
					[
						Tag,
						"Expense Title",
						draft.title
					],
					[
						Coins,
						"Amount Requested",
						`₹ ${draft.amount}`
					],
					[
						CalendarDays,
						"Event",
						"Palm Seeds Plantation"
					],
					[
						FileText,
						"Bills Attached",
						`${draft.files.length} ${draft.files.length === 1 ? "File" : "Files"}`
					]
				].map(([Icon, label, value], i) => {
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: String(label) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: String(value) })] })] }, i);
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "ma-request-status",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Request Status" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "is-active",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Submitted" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Nov 02, 10:35 AM" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Search, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
						"Under",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Verification"
					] })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [
						"Amount",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						"Credited"
					] })] })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "ma-notice ma-notice--info",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Info, {}), "The Maatram team will review your request and verify the bills. Once approved, the amount will be credited to your account."]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Forward, {
				to: "/community/palm-plantation/chat",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(House, {}), "Back to Community"]
			})
		]
	});
}
//#endregion
export { FundSuccessScreen as n, FundScreen as t };
