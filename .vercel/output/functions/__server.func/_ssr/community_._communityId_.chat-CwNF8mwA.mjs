import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { $ as Image, At as CheckCheck, C as Smile, D as Send, Et as ChevronRight, H as Megaphone, Jt as ArrowRight, L as Paperclip, M as Plus, Mt as ChartColumn, Nt as Camera, Pt as CalendarDays, R as Mic, T as ShieldCheck, U as MapPin, Yt as ArrowLeft, ct as FileText, i as Users, kt as Check, mt as EllipsisVertical, n as Wallet, r as Video, xt as Clock3 } from "../_libs/lucide-react.mjs";
import { c as isWithinAttendanceRadius, r as attendanceMock } from "./mock-DstdW3Hp.mjs";
import { n as useMaatramState } from "./MaatramState-CxlAJjDd.mjs";
import { a as IconAction, c as Page$1, f as photos, l as Primary, s as Modal, t as Action, u as Progress } from "./additional-shared-BMdf0ZjP.mjs";
import { a as downloadGuide, o as getOpportunity } from "./opportunity-screens-DlR7-bgt.mjs";
import { r as getCommunity } from "./community-screens-ryUXLJPx.mjs";
import { t as Route } from "./community_._communityId_.chat-VbhLuFxi.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community_._communityId_.chat-CwNF8mwA.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ChatScreen({ id }) {
	const c = getCommunity(id);
	const state = useMaatramState();
	const [text, setText] = (0, import_react.useState)("");
	const [sheet, setSheet] = (0, import_react.useState)(false);
	const [panel, setPanel] = (0, import_react.useState)(null);
	const [success, setSuccess] = (0, import_react.useState)(false);
	const [recording, setRecording] = (0, import_react.useState)(false);
	const [menu, setMenu] = (0, import_react.useState)(false);
	const [emoji, setEmoji] = (0, import_react.useState)(false);
	const [notice, setNotice] = (0, import_react.useState)("");
	const [question, setQuestion] = (0, import_react.useState)("");
	const [optionA, setOptionA] = (0, import_react.useState)("");
	const [optionB, setOptionB] = (0, import_react.useState)("");
	const [files, setFiles] = (0, import_react.useState)([]);
	const [accept, setAccept] = (0, import_react.useState)("*/*");
	const picker = (0, import_react.useRef)(null);
	const [votes, setVotes] = (0, import_react.useState)({});
	if (!c) return null;
	function send() {
		if (text.trim()) {
			state.send(text.trim());
			setText("");
		}
	}
	function shareFile(type) {
		setAccept(type);
		setTimeout(() => picker.current?.click(), 0);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Page$1, {
		className: "ma-chat",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
				className: "ma-chat-header",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
						asChild: true,
						className: "ma-icon",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/community",
							"aria-label": "Back to my communities",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/community/$communityId",
						params: { communityId: id },
						"aria-label": "Open community overview",
						style: {
							display: "flex",
							alignItems: "center",
							gap: 7,
							flex: 1,
							minWidth: 0
						},
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/brand/maatram-foundation-logo.png",
							alt: "Maatram",
							style: {
								width: 44,
								height: 44,
								objectFit: "contain",
								borderRadius: "50%",
								background: "var(--mq-yellow)",
								padding: 3,
								flex: "none"
							}
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							style: { minWidth: 0 },
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: c.name }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
								"Maatram Community · ",
								c.members,
								" Members"
							] })]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
						label: "Voice channel",
						onClick: () => setNotice("Voice channel is ready. No live call is connected."),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(WalkieTalkie, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
						label: "Chat options",
						onClick: () => setMenu(!menu),
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EllipsisVertical, {})
					})
				]
			}),
			menu && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-inline-menu",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
					onClick: () => {
						setNotice("Chat notifications muted.");
						setMenu(false);
					},
					children: "Mute notifications"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
					onClick: () => {
						setNotice("You have no unread messages.");
						setMenu(false);
					},
					children: "Mark as read"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				className: "ma-announcement",
				to: "/opportunities/$opportunityId",
				params: { opportunityId: c.eventId },
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Megaphone, {}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Announcement" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Palm Seeds Plantation – Nov 02, 9:00 AM at Chennai." })] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
				]
			}),
			notice && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				role: "status",
				className: "ma-feedback",
				children: notice
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-chat-timeline",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ma-date",
						children: "Today"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Incoming, {
						sender: "Aravind K",
						role: "Coordinator",
						avatar: "coordinator",
						time: "10:24 AM",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
							"Hi team! 👋",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Quick reminder – our Palm Seeds Plantation event is on Nov 02 (Sat),",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"9:00 AM – 12:00 PM at Chennai."
						] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Please confirm your availability. ✅" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outgoing, {
						time: "10:26 AM",
						children: "I’ll be there! 👍"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Incoming, {
						sender: "Kaviya S",
						avatar: "kaviya",
						time: "10:28 AM",
						children: [
							"I’m in! Do we need to bring any",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"specific items? 🤔"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Incoming, {
						sender: "Aravind K",
						role: "Coordinator",
						avatar: "coordinator",
						time: "10:31 AM",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Action, {
							className: "ma-file-message",
							onClick: () => void downloadGuide(getOpportunity("palm-seeds")),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Event_Guide.pdf" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "1.2 MB · Event details, what to bring…" })] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})
							]
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ma-followup",
						children: [
							"Here’s the event guide. Please check",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"the “Preparation Requirements” section. 📄",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "10:31 AM" })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outgoing, {
						time: "10:33 AM",
						children: "Got it! 🙌"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Incoming, {
						sender: "Aravind K",
						role: "Admin",
						avatar: "coordinator",
						time: "9:01 AM",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(AttendanceCard, { onMark: () => {
							state.markAttendance();
							setSuccess(true);
						} })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Incoming, {
						sender: "Kaviya S",
						avatar: "kaviya",
						time: "9:02 AM",
						children: "Marked my attendance! ✅"
					}),
					state.messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outgoing, {
						time: "Now",
						children: m.kind === "poll" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "ma-poll",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: m.text.split("\n")[0] }), m.text.split("\n").slice(1).map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Action, {
								className: votes[m.id] === option ? "is-active" : "",
								onClick: () => setVotes((old) => ({
									...old,
									[m.id]: option
								})),
								children: [option, votes[m.id] === option && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {})]
							}, option))]
						}) : m.kind === "file" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}), m.text] }) : m.text
					}, m.id))
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
				className: "ma-sr",
				ref: picker,
				type: "file",
				multiple: true,
				accept,
				"aria-label": "Choose chat attachments",
				onChange: (e) => {
					const selected = Array.from(e.target.files ?? []).map((f) => f.name);
					setFiles(selected);
					if (!panel && selected.length) {
						state.send(selected.join(", "), "file");
						setSheet(false);
					}
					e.target.value = "";
				}
			}),
			emoji && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ma-emoji",
				children: [
					"👍",
					"🙌",
					"😊",
					"🌱",
					"✅",
					"❤️"
				].map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
					onClick: () => {
						setText((old) => old + e);
						setEmoji(false);
					},
					children: e
				}, e))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "ma-composer",
				onSubmit: (e) => {
					e.preventDefault();
					send();
				},
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
						label: "Emoji",
						onClick: () => setEmoji(!emoji),
						type: "button",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Smile, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
						placeholder: "Message…",
						"aria-label": "Message",
						value: text,
						onChange: (e) => setText(e.target.value)
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
						label: "Attachments",
						onClick: () => setSheet(true),
						type: "button",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Paperclip, {})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
						label: "Camera",
						onClick: () => shareFile("image/*"),
						type: "button",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, {})
					})
				] }), text.trim() ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
					label: "Send message",
					type: "submit",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {})
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
					label: recording ? "Stop recording" : "Record voice note",
					onClick: () => {
						if (recording) state.send("🎤 Voice note · 0:08");
						setRecording(!recording);
						setNotice(recording ? "Voice note sent." : "Recording voice note…");
					},
					type: "button",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, {})
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				open: sheet,
				onClose: () => setSheet(false),
				title: "Attachments",
				sheet: true,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ma-sheet-handle" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "ma-sheet-title",
						children: "Attachments"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "ma-sheet-sub",
						children: "Share, collect and collaborate with your community"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ma-share-grid",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareTile, {
								tone: "poll",
								title: "Create Poll",
								text: "Take opinions and decide together",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, {}),
								onClick: () => {
									setSheet(false);
									setPanel("poll");
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareTile, {
								tone: "proof",
								title: "Submit Proof",
								text: "Upload your event proof with",
								label: "📍 Geo Tag",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}),
								onClick: () => {
									setFiles([]);
									setSheet(false);
									setPanel("proof");
								}
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
								asChild: true,
								className: "ma-share-tile ma-share-tile--fund",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/fund-request",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Wallet, {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Fund Request" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											"Raise a fund for",
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
											"community activities"
										] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "e.g. Travel allowance, Food" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
									]
								})
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShareTile, {
								tone: "media",
								title: "Media",
								text: "Share photos, videos and other files",
								icon: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Image, {}),
								onClick: () => {
									setFiles([]);
									setSheet(false);
									setPanel("media");
								}
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
						className: "ma-quick-title",
						children: "Quick Share"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "ma-quick-share",
						children: [
							[
								Image,
								"Photo",
								"image/*"
							],
							[
								Video,
								"Video",
								"video/*"
							],
							[
								FileText,
								"Document",
								".pdf,.doc,.docx"
							],
							[
								MapPin,
								"Location",
								"location"
							]
						].map(([Icon, label, type], i) => {
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Action, {
								onClick: () => {
									if (type === "location") {
										state.send("📍 Event Location: Chennai · Simulated location");
										setSheet(false);
									} else shareFile(String(type));
								},
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {}), String(label)]
							}, i);
						})
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				open: panel !== null,
				onClose: () => setPanel(null),
				title: panel === "poll" ? "Create Poll" : panel === "proof" ? "Submit Proof" : "Share Media",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: panel === "poll" ? "Create Poll" : panel === "proof" ? "Submit Proof" : "Share Media" }), panel === "poll" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ma-field",
						children: ["Question", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: question,
							onChange: (e) => setQuestion(e.target.value),
							placeholder: "Ask your community…"
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ma-field",
						children: ["Option 1", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: optionA,
							onChange: (e) => setOptionA(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "ma-field",
						children: ["Option 2", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							value: optionB,
							onChange: (e) => setOptionB(e.target.value)
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Primary, {
						disabled: !question.trim() || !optionA.trim() || !optionB.trim(),
						onClick: () => {
							state.send(`${question}\n${optionA}\n${optionB}`, "poll");
							setPanel(null);
							setQuestion("");
							setOptionA("");
							setOptionB("");
						},
						children: ["Create Poll", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChartColumn, {})]
					})
				] }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					panel === "proof" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "ma-notice ma-notice--green",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), "Geo Tag · Chennai · Simulated location"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Action, {
						className: "ma-upload",
						onClick: () => shareFile(panel === "proof" ? "image/*,.pdf" : "image/*,video/*"),
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}),
							"Choose ",
							panel === "proof" ? "Proof" : "Media",
							" Files"
						]
					}),
					files.map((f) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "ma-file-row",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FileText, {}), f]
					}, f)),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Primary, {
						disabled: !files.length,
						onClick: () => {
							state.send(panel === "proof" ? `✅ Event proof submitted · Chennai (simulated geotag) · ${files.join(", ")}` : files.join(", "), panel === "proof" ? "proof" : "file");
							setPanel(null);
						},
						children: ["Share", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Send, {})]
					})
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Modal, {
				open: success,
				onClose: () => setSuccess(false),
				title: "Attendance Marked Successfully",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ma-success-art",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
							src: "/assets/illustrations/success-checkmark.png",
							alt: "Attendance success"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "🌱 ✨" })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
						className: "ma-success-title",
						children: [
							"Attendance",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Marked Successfully!"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "ma-centered",
						children: [
							"You’re checked in for",
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
							"Palm Seeds Plantation. 🎉"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ma-success-meta",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}), "Nov 02, 2026"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}), "9:01 AM"] }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), "Chennai"] })
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "ma-verified",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}), "Location Verified · Simulated"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Primary, {
						onClick: () => setSuccess(false),
						children: ["Great! ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {})]
					})
				]
			})
		]
	});
}
function Incoming({ sender, role, avatar, time, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ma-incoming",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			src: photos[avatar],
			alt: sender
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ma-sender",
			children: [
				sender,
				" ",
				role && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("i", { children: [
					"(",
					role,
					")"
				] })
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "ma-bubble",
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", {
				className: "ma-time",
				children: time
			})]
		})] })]
	});
}
function Outgoing({ children, time }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "ma-outgoing",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: [
			time,
			" ",
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CheckCheck, {})
		] })] })
	});
}
function ShareTile({ tone, title, text, label, icon, onClick }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Action, {
		className: `ma-share-tile ma-share-tile--${tone}`,
		onClick,
		children: [
			icon,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: title }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: text }),
			label && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: label }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronRight, {})
		]
	});
}
function AttendanceCard({ onMark }) {
	const state = useMaatramState();
	const within = isWithinAttendanceRadius(attendanceMock.distanceMeters, attendanceMock.allowedRadiusMeters);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "ma-attendance",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "GPS Attendance" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Palm Seeds Plantation" })] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "ma-active",
					children: "● Live"
				})
			] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-attendance-info",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ma-map",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "ma-map-radius",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "Event Location" })]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"Allowed Radius",
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("br", {}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: "300 meters" })
					] })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}), "Nov 02, 2026"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}), "9:00 AM – 12:00 PM"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), "Chennai"] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}), "42 Volunteers"] })
				] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-within",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: within ? "You are within the event location!" : "Outside the event radius" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Distance: 72 meters (within 300 m) · Simulated" })] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Primary, {
				disabled: state.attended || !within,
				onClick: onMark,
				children: [state.attended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, {}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HandAttendance, {}), state.attended ? "Attendance Marked" : "Mark Attendance"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "ma-attendance-count",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Users, {}), " Attendance Progress"] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [state.markedCount, " / 42 Marked"] })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Progress, {
				value: state.markedCount,
				max: 42
			})
		]
	});
}
function HandAttendance() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ShieldCheck, {});
}
function WalkieTalkie() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 24 24",
		width: "24",
		height: "24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9 2v4" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "6.5",
				y: "6",
				width: "11",
				height: "16",
				rx: "2.5"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "9",
				y: "9",
				width: "6",
				height: "3.5",
				rx: "1"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.5 15.5h5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M9.5 18h5" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", { d: "M19.5 2.5c1.3.8 2.2 2.1 2.5 3.7" })
		]
	});
}
function Page() {
	const { communityId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChatScreen, { id: communityId });
}
//#endregion
export { Page as component };
