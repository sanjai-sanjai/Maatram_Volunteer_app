import { o as __toESM } from "../_runtime.mjs";
import { T as validateDetails, b as simulateAiDescription, u as eventTypes } from "./admin-mock-D2qySwaK.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as useAdmin } from "./AdminState-BLwyIpVi.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Image, F as Pencil, J as Leaf, Jt as ArrowRight, Pt as CalendarDays, R as Mic, S as Sparkles, Tt as CircleCheck, U as MapPin, _ as Tag, ct as FileText, i as Users, q as LocateFixed, t as X, x as Sprout, yt as CloudUpload } from "../_libs/lucide-react.mjs";
import { c as SectionHead, l as WizardHeader, n as AdminFrame } from "./admin-ui-BN78hV-l.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.opportunities.new.index-ChGeuBRN.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var voiceSample = "we plant palm seeds in school campus with students, water and protect saplings, make area green";
var tagIcon = (t) => t === "Environment" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Leaf, {}) : t === "Sustainability" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sprout, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {});
function EventDetails() {
	const { draft, update } = useAdmin();
	const navigate = useNavigate();
	const [errors, setErrors] = (0, import_react.useState)({});
	const [listening, setListening] = (0, import_react.useState)(false);
	const [generating, setGenerating] = (0, import_react.useState)(false);
	const [locNote, setLocNote] = (0, import_react.useState)("");
	const fileRef = (0, import_react.useRef)(null);
	const timer = (0, import_react.useRef)(void 0);
	(0, import_react.useEffect)(() => () => window.clearTimeout(timer.current), []);
	const generate = (raw) => {
		setGenerating(true);
		timer.current = window.setTimeout(() => {
			update(simulateAiDescription(raw, draft));
			setGenerating(false);
		}, 900);
	};
	const speak = () => {
		if (listening) return;
		setListening(true);
		timer.current = window.setTimeout(() => {
			setListening(false);
			update({ rawDescription: voiceSample });
			generate(voiceSample);
		}, 2200);
	};
	const onFile = (f) => {
		if (!f) return;
		if (!/image\/(jpeg|png)/.test(f.type)) return setErrors((e) => ({
			...e,
			image: "Only JPG or PNG images are allowed."
		}));
		if (f.size > 5242880) return setErrors((e) => ({
			...e,
			image: "Image must be 5 MB or smaller."
		}));
		const r = new FileReader();
		r.onload = () => {
			update({ image: String(r.result) });
			setErrors(({ image: _i, ...rest }) => rest);
		};
		r.readAsDataURL(f);
	};
	const next = () => {
		const e = validateDetails(draft);
		setErrors(e);
		if (Object.keys(e).length) {
			document.querySelector(`[data-field="${Object.keys(e)[0]}"]`)?.scrollIntoView({
				behavior: "smooth",
				block: "center"
			});
			return;
		}
		navigate({ to: "/admin/opportunities/new/guide" });
	};
	const ticks = [
		5,
		10,
		15,
		20,
		25,
		30,
		35,
		40,
		45,
		50
	];
	const pos = (draft.volunteers - 5) / 45 * 100;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AdminFrame, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(WizardHeader, { step: 1 }),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "ad-card ad-form",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SectionHead, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}),
				title: "Event Details",
				sub: "Basic information about the volunteering opportunity."
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ad-form__body",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tag, {}),
						label: "Event Type",
						error: errors.type,
						name: "type",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
							className: "ad-input",
							value: draft.type,
							onChange: (e) => update({ type: e.target.value }),
							children: eventTypes.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: t }, t))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, {}),
						label: "Event Name",
						error: errors.name,
						name: "name",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							className: "ad-input",
							value: draft.name,
							maxLength: 60,
							onChange: (e) => update({ name: e.target.value }),
							placeholder: "e.g. Palm Seeds Plantation"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}),
						label: "Location",
						error: errors.location,
						name: "location",
						hint: locNote,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ad-input-wrap",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								className: "ad-input",
								value: draft.location,
								onChange: (e) => update({ location: e.target.value }),
								placeholder: "City, State"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								"aria-label": "Use current location",
								onClick: () => {
									update({ location: "Chennai, Tamil Nadu" });
									setLocNote("Location set to Chennai, Tamil Nadu (simulated).");
								},
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(LocateFixed, {})
							})]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-field",
						"data-field": "volunteers",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "ad-icon-tile",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "ad-field__main",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ad-field__row",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
									htmlFor: "vol-count",
									children: ["Number of Volunteers Needed ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "*" })]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									id: "vol-count",
									className: "ad-input ad-input--num",
									type: "number",
									min: 5,
									max: 50,
									value: draft.volunteers,
									onChange: (e) => update({ volunteers: Math.max(5, Math.min(50, Number(e.target.value) || 5)) })
								})]
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-slider",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ad-slider__bubble",
								style: { left: `calc(${pos}% + ${10 - pos * .2}px)` },
								children: draft.volunteers
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
								type: "range",
								min: 5,
								max: 50,
								step: 1,
								value: draft.volunteers,
								"aria-label": "Volunteers needed",
								onChange: (e) => update({ volunteers: Number(e.target.value) }),
								style: { ["--pos"]: `${pos}%` }
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "ad-slider__ticks",
								children: ticks.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									type: "button",
									onClick: () => update({ volunteers: t }),
									children: t
								}, t))
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ad-desc",
						"data-field": "description",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ad-desc__head",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ad-icon-tile",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h3", { children: ["Event Description ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "*" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Describe your event in your own words — even in broken English. Our AI will convert it into a clear and structured description." })] }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "ad-ai-badge",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 16 }), " AI Assisted"]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								type: "button",
								className: `ad-voice ${listening ? "listening" : ""}`,
								onClick: speak,
								"aria-label": "Tap to speak",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ad-wave",
										"aria-hidden": true,
										children: Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ad-voice__mic",
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {})
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ad-wave",
										"aria-hidden": true,
										children: Array.from({ length: 8 }, (_, i) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}, i))
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "ad-voice__label",
										children: listening ? "Listening… speak now" : "Tap to speak"
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "ad-or",
								children: "or"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ad-textarea",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 18 }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
										rows: 3,
										maxLength: 500,
										value: draft.rawDescription,
										placeholder: "Type or paste your description here…",
										onChange: (e) => update({ rawDescription: e.target.value })
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ad-textarea__foot",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
											type: "button",
											className: "ad-mini-btn",
											disabled: !draft.rawDescription.trim() || generating,
											onClick: () => generate(draft.rawDescription),
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { size: 14 }), " Generate with AI"]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [draft.rawDescription.length, " / 500"] })]
									})
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "ad-ai-out",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "ad-ai-out__head",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparkles, { className: "ad-sparkle" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "AI Generated Description" }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
												className: "ad-chip ad-chip--green",
												children: generating ? "Generating…" : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, { size: 16 }), " Generated"] })
											})
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: `ad-ai-out__box ${generating ? "loading" : ""}`,
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
											"aria-label": "Generated description (editable)",
											rows: 4,
											maxLength: 500,
											value: draft.description,
											onChange: (e) => update({ description: e.target.value })
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
											className: "ad-tags",
											children: draft.tags.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [tagIcon(t), t] }, t))
										})]
									}),
									errors.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "ad-error",
										children: errors.description
									})
								]
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {}),
						label: "Event Image",
						error: errors.image,
						name: "image",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ad-upload",
							children: [
								draft.image ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ad-upload__preview",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
										src: draft.image,
										alt: "Event preview"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "button",
										"aria-label": "Remove image",
										onClick: () => update({ image: null }),
										children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, { size: 18 })
									})]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "ad-upload__empty",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {}), " No image"]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
									type: "button",
									className: "ad-upload__btn",
									onClick: () => fileRef.current?.click(),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Upload Event Image" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "JPG, PNG (Max 5 MB)" })
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									ref: fileRef,
									type: "file",
									accept: "image/png,image/jpeg",
									hidden: true,
									onChange: (e) => {
										onFile(e.target.files?.[0]);
										e.target.value = "";
									}
								})
							]
						})
					})
				]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "ad-sticky-actions",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				className: "ad-btn ad-btn--primary ad-btn--wide",
				onClick: next,
				children: ["Next: Event Guide ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
			})
		})
	] });
}
function Field({ icon, label, error, hint, name, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ad-field",
		"data-field": name,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "ad-icon-tile",
			children: icon
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			className: "ad-field__main",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
					className: "ad-field__label",
					children: [
						label,
						" ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: "*" })
					]
				}),
				children,
				error ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ad-error",
					children: error
				}) : hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ad-hint",
					children: hint
				}) : null
			]
		})]
	});
}
//#endregion
export { EventDetails as component };
