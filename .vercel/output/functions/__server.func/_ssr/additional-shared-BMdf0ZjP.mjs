import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { Jt as ArrowRight, Pt as CalendarDays, U as MapPin, Yt as ArrowLeft, t as X, xt as Clock3 } from "../_libs/lucide-react.mjs";
import { r as Logo } from "./mq-BfQmvpW9.mjs";
import { t as BottomNav } from "./AppNav-De5vg2b9.mjs";
import { a as DialogPortal, i as DialogOverlay, n as DialogClose, o as DialogTitle, r as DialogContent, s as Slot, t as Dialog } from "../_libs/@radix-ui/react-dialog+[...].mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/additional-shared-BMdf0ZjP.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var buttonVariants = cva("inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium cursor-pointer transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 disabled:cursor-not-allowed [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0", {
	variants: {
		variant: {
			default: "bg-primary text-primary-foreground shadow hover:bg-primary/90",
			destructive: "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
			outline: "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
			secondary: "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
			ghost: "hover:bg-accent hover:text-accent-foreground",
			link: "text-primary underline-offset-4 hover:underline"
		},
		size: {
			default: "h-9 px-4 py-2",
			sm: "h-8 rounded-md px-3 text-xs",
			lg: "h-10 rounded-md px-8",
			icon: "h-9 w-9"
		}
	},
	defaultVariants: {
		variant: "default",
		size: "default"
	}
});
var Button = import_react.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(asChild ? Slot : "button", {
		className: cn(buttonVariants({
			variant,
			size,
			className
		})),
		ref,
		...props
	});
});
Button.displayName = "Button";
var planting_clean_default = "/assets/planting-clean--piNa6UD.jpg";
var verification_team_default = "/assets/verification-team-BzEsrBwE.jpg";
var cleanup_default = "/assets/cleanup-BwFM3uWw.jpg";
var palm_team_default = "/assets/palm-team-DKjJRaZN.jpg";
var interview_default = "/assets/interview-WpUEi0ac.jpg";
var school_default = "/assets/school-Aml1roxK.jpg";
var photos = {
	planting: planting_clean_default,
	"verification-team": verification_team_default,
	cleanup: cleanup_default,
	"palm-team": palm_team_default,
	interview: interview_default,
	school: school_default,
	cover: "/assets/community-cover-clean-o__x5ng-.jpg",
	hero: "/assets/planting-hero-clean-D6h7njay.jpg",
	coordinator: "data:image/jpeg;base64,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",
	kaviya: "/assets/kaviya-xhYICEkY.jpg"
};
function Action({ className = "", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
		variant: "ghost",
		...props,
		className: `ma-action ${className}`
	});
}
function Primary({ children, className = "", ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		...props,
		className: `ma-primary ${className}`,
		children
	});
}
function IconAction({ label, children, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
		size: "icon",
		...props,
		"aria-label": label,
		title: label,
		className: "ma-icon",
		children
	});
}
function Header({ back = "/dashboard", tools }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
		className: "ma-header",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Action, {
				asChild: true,
				className: "ma-icon",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: back,
					"aria-label": "Go back",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, {})
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Logo, { small: true }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "ma-header-tools",
				children: tools
			})
		]
	});
}
function Page({ children, active, className = "" }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: `ma-page ${className}`,
		children: [
			children,
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "ma-bottom-wave" }),
			active && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(BottomNav, { active })
		]
	});
}
function Heading({ title, subtitle }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ma-heading",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: title }), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: subtitle })]
	});
}
function Meta({ op }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "ma-meta",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(MapPin, {}), op.location] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CalendarDays, {}), op.date] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Clock3, {}), op.time] })
		]
	});
}
function Progress({ value, max }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("progress", {
		className: "ma-progress",
		value,
		max,
		"aria-label": `${value} of ${max}`
	});
}
function Modal({ open, onClose, title, children, sheet = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Dialog, {
		open,
		onOpenChange: (value) => {
			if (!value) onClose();
		},
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogPortal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogOverlay, { className: "ma-overlay" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(DialogContent, {
			className: `ma-modal ${sheet ? "ma-modal--sheet" : ""}`,
			"aria-describedby": void 0,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogTitle, {
					className: "ma-sr",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogClose, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(IconAction, {
						label: "Close",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(X, {})
					})
				}),
				children
			]
		})] })
	});
}
function Forward({ children, to }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Primary, {
		asChild: true,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to,
			children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
		})
	});
}
//#endregion
export { IconAction as a, Page as c, palm_team_default as d, photos as f, Heading as i, Primary as l, verification_team_default as m, Forward as n, Meta as o, school_default as p, Header as r, Modal as s, Action as t, Progress as u };
