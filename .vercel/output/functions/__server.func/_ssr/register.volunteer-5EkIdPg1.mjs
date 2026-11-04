import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { F as Pencil, It as CalendarCheck, Ot as ChevronDown, Pt as CalendarDays, R as Mic, Rt as Briefcase, U as MapPin, at as GraduationCap, et as IdCard, it as HandHeart, pt as Ellipsis, v as Store, y as Square, yt as CloudUpload } from "../_libs/lucide-react.mjs";
import { h as regDraft, l as locations } from "./mock-DstdW3Hp.mjs";
import { a as RegHeader, i as PrimaryButton, o as Screen } from "./mq-BfQmvpW9.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/register.volunteer-5EkIdPg1.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var statuses = [
	{
		k: "Student",
		i: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GraduationCap, {})
	},
	{
		k: "Employee",
		i: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, {})
	},
	{
		k: "Business",
		i: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Store, {})
	},
	{
		k: "Other",
		i: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ellipsis, {})
	}
];
var avail = [
	{
		k: "Weekdays",
		i: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {})
	},
	{
		k: "Weekends",
		i: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {})
	},
	{
		k: "Both",
		i: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarCheck, {})
	}
];
function VolunteerDetails() {
	const navigate = useNavigate();
	const [status, setStatus] = (0, import_react.useState)("Student");
	const [location, setLocation] = (0, import_react.useState)("");
	const [availability, setAvailability] = (0, import_react.useState)("Weekdays");
	const [file, setFile] = (0, import_react.useState)("");
	const [mode, setMode] = (0, import_react.useState)("type");
	const [text, setText] = (0, import_react.useState)("");
	const [rec, setRec] = (0, import_react.useState)(false);
	const [secs, setSecs] = (0, import_react.useState)(0);
	const [error, setError] = (0, import_react.useState)("");
	const fileRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		if (!rec) return;
		const t = setInterval(() => setSecs((s) => s + 1), 1e3);
		return () => clearInterval(t);
	}, [rec]);
	const submit = () => {
		if (!location) return setError("Please select your location");
		if (!file) return setError("Please upload your ID card");
		if (mode === "type" ? !text.trim() : secs === 0) return setError("Please tell us why you want to volunteer");
		Object.assign(regDraft, {
			status,
			location,
			availability
		});
		navigate({ to: "/register/submitted" });
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Screen, {
		deco: "tr",
		footer: "building",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(RegHeader, {
			step: 2,
			back: "/register/basic"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mq-regcard",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mq-sechead",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Know You Better" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Help us understand you and your volunteering interest." })] })
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mq-frow mq-frow--box",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ib",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Briefcase, { size: 24 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mq-flabel",
						children: ["Working Status ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mq-req",
							children: "*"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mq-chips mq-chips--4",
						children: statuses.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "mq-chip",
							"aria-pressed": status === s.k,
							onClick: () => setStatus(s.k),
							children: [s.i, s.k]
						}, s.k))
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mq-frow mq-frow--box",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ib",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { size: 24 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mq-flabel",
						htmlFor: "loc",
						children: ["Location ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mq-req",
							children: "*"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "mq-inp mq-inp--icon",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, { className: "lead" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
								id: "loc",
								value: location,
								onChange: (e) => setLocation(e.target.value),
								style: { color: location ? void 0 : "#6B707C" },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
									value: "",
									children: "Enter your city / district"
								}), locations.map((l) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", { children: l }, l))]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronDown, {
								className: "trail",
								size: 22,
								style: { pointerEvents: "none" }
							})
						]
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mq-frow mq-frow--box",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ib",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, { size: 24 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "mq-flabel",
						children: ["Availability ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mq-req",
							children: "*"
						})]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mq-chips mq-chips--3",
						children: avail.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							className: "mq-chip",
							"aria-pressed": availability === s.k,
							onClick: () => setAvailability(s.k),
							children: [s.i, s.k]
						}, s.k))
					})] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mq-frow mq-frow--box",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ib",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdCard, { size: 24 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mq-flabel",
							style: { marginBottom: 0 },
							children: ["Personal ID Card ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mq-req",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
							style: { color: "#3A3F4B" },
							children: "Upload a valid ID proof (Aadhaar / PAN / Voter ID / College ID, etc.)"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mq-upload",
							onClick: () => fileRef.current?.click(),
							role: "button",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CloudUpload, {
								size: 40,
								strokeWidth: 1.5
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: { minWidth: 0 },
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: file ? "ID Card Selected" : "Upload ID Card" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
									style: { wordBreak: "break-all" },
									children: file || "PDF / JPG / PNG (Max 10 MB)"
								})]
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							ref: fileRef,
							type: "file",
							accept: ".pdf,.jpg,.jpeg,.png",
							hidden: true,
							onChange: (e) => setFile(e.target.files?.[0]?.name ?? "")
						})
					] })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mq-frow mq-frow--box",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "ib",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandHeart, { size: 24 })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "mq-flabel",
							children: ["Why do you want to volunteer with Maatram? ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "mq-req",
								children: "*"
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mq-seg",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								"aria-pressed": mode === "type",
								onClick: () => setMode("type"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pencil, { size: 20 }), " Type Your Response"]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								"aria-pressed": mode === "voice",
								onClick: () => setMode("voice"),
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { size: 20 }), " Record a Voice Note"]
							})]
						}),
						mode === "type" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { position: "relative" },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
								className: "mq-ta",
								maxLength: 300,
								value: text,
								onChange: (e) => setText(e.target.value),
								placeholder: "Share your interest, motivation, or how you want to contribute..."
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "mq-counter",
								children: [text.length, " / 300"]
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: rec ? "mq-voice rec" : "mq-voice",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								"aria-label": rec ? "Stop recording" : "Start recording",
								onClick: () => setRec((r) => !r),
								children: rec ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Square, {
									size: 20,
									fill: "currentColor"
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { size: 24 })
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: rec ? "Recording..." : secs ? "Voice note recorded" : "Tap to record" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								style: {
									fontSize: 13,
									color: "#3A3F4B"
								},
								children: [
									"0:",
									String(secs).padStart(2, "0"),
									" / 1:00"
								]
							})] })]
						})
					] })]
				}),
				error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mq-err",
					style: {
						textAlign: "center",
						fontSize: 14
					},
					children: error
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					style: { marginTop: 16 },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PrimaryButton, {
						onClick: submit,
						children: "Create Account"
					})
				})
			]
		})]
	});
}
//#endregion
export { VolunteerDetails as component };
