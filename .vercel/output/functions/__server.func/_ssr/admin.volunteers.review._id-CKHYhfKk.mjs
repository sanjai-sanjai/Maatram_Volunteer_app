import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as maatram_logo_full_default } from "./admin-profile-avatar-Cks5CCdP.mjs";
import { D as Send, P as Phone, Pt as CalendarDays, T as ShieldCheck, Tt as CircleCheck, U as MapPin, W as Mail, bt as Clock, c as UserRound, et as IdCard, it as HandHeart, t as X, wt as CircleX, zt as BriefcaseBusiness } from "../_libs/lucide-react.mjs";
import { a as InfoSection, b as approveVolunteer, f as Toast, h as VolunteerFrame, i as IdentityDocumentCard, n as BackButton, p as VoiceNotePlayer, r as DetailRow, u as Sparks } from "./volunteers-DcsKbkG3.mjs";
import { t as Route } from "./admin.volunteers.review._id-C1mK7bN0.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.volunteers.review._id-CKHYhfKk.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function Review() {
	const v = Route.useLoaderData();
	const navigate = useNavigate();
	const [modal, setModal] = (0, import_react.useState)(false);
	const [toast, setToast] = (0, import_react.useState)("");
	const [rejected, setRejected] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(VolunteerFrame, {
		nav: false,
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "vl-rhead",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BackButton, { to: "/admin/volunteers" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
						src: maatram_logo_full_default,
						alt: "Maatram Foundation",
						className: "vl-rhead__logo"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", { children: [
						"Volunteer ",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", { children: "Profile Review" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparks, { className: "vl-rhead__sparks" })
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Review the submitted details before approving this volunteer." })
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "vl-card vl-pcard",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
					src: v.photo,
					alt: v.name,
					className: "vl-pcard__img"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "vl-pcard__body",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: v.name }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
							className: "vl-pill vl-pill--pending",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {}),
								" ",
								rejected ? "Rejected" : "Pending Verification"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {}),
								"Reg. ID: ",
								v.id
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}),
								"Submitted on: ",
								v.submitted
							] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), v.location] })
						] })
					]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoSection, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {}),
				title: "Basic Details",
				sub: "Personal information submitted by the volunteer.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "vl-details",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {}),
							label: "Full Name",
							value: v.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mail, {}),
							label: "Email ID",
							value: v.email
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Phone, {}),
							label: "Mobile Number",
							value: v.phone
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailRow, {
							icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}),
							label: "Date of Birth",
							value: v.dob
						})
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoSection, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefcaseBusiness, {}),
				title: "Volunteer Details",
				sub: "Information about their availability and volunteering interest.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "vl-trio",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "vl-tile vl-tile--sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefcaseBusiness, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Working Status" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: v.status })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "vl-tile vl-tile--sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Location" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: v.location })
						] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "vl-tile vl-tile--sm",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Availability" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("em", { children: v.availability })
						] })
					]
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(InfoSection, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdCard, {}),
				title: "Personal ID Card",
				sub: "Identity proof submitted by the volunteer.",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IdentityDocumentCard, {
					type: v.idDoc.type,
					size: v.idDoc.size,
					onView: () => setToast(`Opening ${v.idDoc.type} for ${v.name}`)
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoSection, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandHeart, {}),
				title: "Why do you want to volunteer with Maatram?",
				className: "vl-sec--why",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
					className: "vl-quote",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": true,
						children: "“"
					}), v.motivation]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceNotePlayer, {
					duration: v.voiceNote.duration,
					src: v.voiceNote.src
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(InfoSection, {
				icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
				title: "Verification Decision",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "vl-decision",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
						className: "vl-pill vl-pill--pending",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock, {}),
							" ",
							rejected ? "Rejected" : "Pending Verification"
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Please review the volunteer's profile and identity document before making a decision." })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "vl-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "vl-btn vl-btn--danger",
						onClick: () => {
							setRejected(true);
							setToast(`${v.name}'s registration was rejected`);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleX, {}), " Reject"]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						className: "vl-btn vl-btn--primary",
						onClick: () => {
							approveVolunteer(v.id);
							setRejected(false);
							setModal(true);
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {}), " Approve Volunteer"]
					})]
				})]
			}),
			modal && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VerificationModal, {
				v,
				onClose: () => setModal(false),
				onNotify: () => setToast(`Verification notification sent to ${v.name}`),
				onView: () => navigate({ to: "/admin/volunteers" })
			}),
			toast && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toast, {
				text: toast,
				onDone: () => setToast("")
			})
		]
	});
}
function VerificationModal({ v, onClose, onNotify, onView }) {
	const [sent, setSent] = (0, import_react.useState)(false);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "vl-overlay",
		role: "dialog",
		"aria-modal": "true",
		"aria-labelledby": "vl-modal-title",
		onClick: onClose,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "vl-modal",
			onClick: (e) => e.stopPropagation(),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					className: "vl-round vl-modal__close",
					"aria-label": "Close",
					onClick: onClose,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "vl-modal__photo",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparks, { className: "vl-modal__s1" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparks, { className: "vl-modal__s2" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { className: "vl-modal__dash" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: v.photo,
							alt: v.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "vl-modal__check",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CircleCheck, {})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					id: "vl-modal-title",
					children: ["Volunteer ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("mark", { children: "Verified!" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [v.name, " has been successfully verified and added to the Maatram volunteer community."] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "vl-modal__sum",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(UserRound, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: v.name })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BriefcaseBusiness, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: v.status })] }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: v.location.replace(", ", ",\n") })] })
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "vl-modal__btns",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sparks, { className: "vl-modal__s3" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							className: "vl-btn vl-btn--primary vl-btn--block",
							onClick: () => {
								setSent(true);
								onNotify();
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {}),
								" ",
								sent ? "Notification Sent" : "Send Verification Notification"
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							className: "vl-btn vl-btn--ghost vl-btn--block",
							onClick: onView,
							children: "Back"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "vl-modal__wave",
					"aria-hidden": true
				})
			]
		})
	});
}
//#endregion
export { Review as component };
