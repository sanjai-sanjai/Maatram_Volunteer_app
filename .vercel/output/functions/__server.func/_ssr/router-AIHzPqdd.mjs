import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as createFileRoute, d as Scripts, f as HeadContent, g as lazyRouteComponent, h as Outlet, m as createRouter, v as createRootRouteWithContext, x as useRouter, y as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as seo } from "./seo-LdVBjSjX.mjs";
import { t as Route$25 } from "./admin.manage._section-Bm0ZzbfH.mjs";
import { t as Route$26 } from "./admin.pulse.success-DKe9nSwG.mjs";
import { t as Route$27 } from "./admin.pulse.targeting-CAxg9LCk.mjs";
import { t as Route$28 } from "./admin.volunteers._id-C9MwR32-.mjs";
import { t as Route$29 } from "./admin.volunteers.index-CCfjAZNJ.mjs";
import { t as Route$30 } from "./admin.volunteers.review._id-C1mK7bN0.mjs";
import { t as MaatramState } from "./MaatramState-CxlAJjDd.mjs";
import { t as Route$31 } from "./community_._communityId-BICxM_Lj.mjs";
import { t as Route$32 } from "./community_._communityId_.chat-VbhLuFxi.mjs";
import { t as Route$33 } from "./opportunities_._opportunityId-D8dhJ_bx.mjs";
import { t as Route$34 } from "./opportunities_._opportunityId_.guide-fcKMGLDk.mjs";
import { t as QueryClientProvider } from "../_libs/tanstack__react-query.mjs";
import { t as QueryClient } from "../_libs/tanstack__query-core.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/router-AIHzPqdd.js
var import_jsx_runtime = require_jsx_runtime();
var styles_default = "/assets/styles-WAFu4DHL.css";
function NotFoundComponent() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-7xl font-bold text-foreground",
					children: "404"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
					className: "mt-4 text-xl font-semibold text-foreground",
					children: "Page not found"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "The page you're looking for doesn't exist or has been moved."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-6",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/",
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Go home"
					})
				})
			]
		})
	});
}
function ErrorComponent({ error, reset }) {
	console.error(error);
	const router = useRouter();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: "flex min-h-screen items-center justify-center bg-background px-4",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "max-w-md text-center",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "text-xl font-semibold tracking-tight text-foreground",
					children: "This page didn't load"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm text-muted-foreground",
					children: "Something went wrong on our end. You can try refreshing or head back home."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 flex flex-wrap justify-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						onClick: () => {
							router.invalidate();
							reset();
						},
						className: "inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90",
						children: "Try again"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
						href: "/",
						className: "inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent",
						children: "Go home"
					})]
				})
			]
		})
	});
}
var Route$24 = createRootRouteWithContext()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{
				name: "theme-color",
				content: "#FEC802"
			},
			{
				property: "og:type",
				content: "website"
			},
			{
				name: "twitter:card",
				content: "summary_large_image"
			}
		],
		links: [
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "preconnect",
				href: "https://fonts.googleapis.com"
			},
			{
				rel: "preconnect",
				href: "https://fonts.gstatic.com",
				crossOrigin: "anonymous"
			},
			{
				rel: "stylesheet",
				href: "https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,400;0,500;0,600;0,700;0,800;1,500;1,700;1,800&display=swap"
			},
			{
				rel: "icon",
				href: "/favicon.png",
				type: "image/png"
			}
		]
	}),
	shellComponent: RootShell,
	component: RootComponent,
	notFoundComponent: NotFoundComponent,
	errorComponent: ErrorComponent
});
function RootShell({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "en",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [children, /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})] })]
	});
}
function RootComponent() {
	const { queryClient } = Route$24.useRouteContext();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(QueryClientProvider, {
		client: queryClient,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(MaatramState, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) })
	});
}
var $$splitComponentImporter$23 = () => import("./routes-kpI7HdVL.mjs");
var Route$23 = createFileRoute("/")({
	head: () => seo("Welcome", "Volunteer. Empower. Transform. — the Maatram Foundation volunteer platform."),
	component: lazyRouteComponent($$splitComponentImporter$23, "component")
});
var $$splitComponentImporter$22 = () => import("./admin-CNdRnXdP.mjs");
var Route$22 = createFileRoute("/admin")({ component: lazyRouteComponent($$splitComponentImporter$22, "component") });
var $$splitComponentImporter$21 = () => import("./community-CTW8WXUC.mjs");
var Route$21 = createFileRoute("/community")({
	head: () => seo("My Communities", "Your Maatram volunteering communities and events."),
	component: lazyRouteComponent($$splitComponentImporter$21, "component")
});
var $$splitComponentImporter$20 = () => import("./dashboard-BEQWS3cK.mjs");
var Route$20 = createFileRoute("/dashboard")({
	head: () => seo("Student Home", "Your Maatram volunteering dashboard: opportunities, hours and progress."),
	component: lazyRouteComponent($$splitComponentImporter$20, "component")
});
var $$splitComponentImporter$19 = () => import("./explore-D35cDKfS.mjs");
var Route$19 = createFileRoute("/explore")({
	head: () => seo("Explore Opportunities", "Find Maatram opportunities by category and location."),
	component: lazyRouteComponent($$splitComponentImporter$19, "component")
});
var $$splitComponentImporter$18 = () => import("./fund-request-QsD7sc3b.mjs");
var Route$18 = createFileRoute("/fund-request")({
	head: () => seo("Fund Request", "Maatram event expense reimbursement request and verification."),
	component: lazyRouteComponent($$splitComponentImporter$18, "component")
});
var $$splitComponentImporter$17 = () => import("./impact-BXSXnb7M.mjs");
var Route$17 = createFileRoute("/impact")({
	head: () => seo("Impact leaderboard", "Celebrate Maatram volunteer contributions, explore the impact leaderboard and discover your achievements."),
	component: lazyRouteComponent($$splitComponentImporter$17, "component")
});
var $$splitComponentImporter$16 = () => import("./login-C8PsWvpo.mjs");
var Route$16 = createFileRoute("/login")({
	head: () => seo("Scan Your Maatram ID", "Scan the QR code on your Maatram ID card to log in."),
	component: lazyRouteComponent($$splitComponentImporter$16, "component")
});
var $$splitComponentImporter$15 = () => import("./opportunities-eVaB7Tvq.mjs");
var Route$15 = createFileRoute("/opportunities")({
	head: () => seo("Upcoming Opportunities", "Browse all active Maatram volunteering opportunities."),
	component: lazyRouteComponent($$splitComponentImporter$15, "component")
});
var $$splitComponentImporter$14 = () => import("./profile-BPufZp4K.mjs");
var Route$14 = createFileRoute("/profile")({
	head: () => seo("Profile", "Your Maatram student volunteer profile."),
	component: lazyRouteComponent($$splitComponentImporter$14, "component")
});
var $$splitComponentImporter$13 = () => import("./verification-DoCHeDJL.mjs");
var Route$13 = createFileRoute("/verification")({
	head: () => seo("Verifying Your Maatram ID", "Fetching and verifying your Maatram profile."),
	component: lazyRouteComponent($$splitComponentImporter$13, "component")
});
var $$splitComponentImporter$12 = () => import("./verified-BXKjG2eU.mjs");
var Route$12 = createFileRoute("/verified")({
	head: () => seo("Login Successful", "Your Maatram ID has been verified and your profile is ready."),
	component: lazyRouteComponent($$splitComponentImporter$12, "component")
});
var $$splitComponentImporter$11 = () => import("./welcome-C4_s3UKs.mjs");
var Route$11 = createFileRoute("/welcome")({
	head: () => seo("Continue as", "Choose how you want to join Maatram Volunteer Quest: student, alumni, admin or other volunteer."),
	component: lazyRouteComponent($$splitComponentImporter$11, "component")
});
var $$splitComponentImporter$10 = () => import("./admin.index-D-dGE0HC.mjs");
var Route$10 = createFileRoute("/admin/")({
	head: () => seo("Admin Dashboard", "Overview of today's Maatram volunteering operations, events and pending actions."),
	component: lazyRouteComponent($$splitComponentImporter$10, "component")
});
var $$splitComponentImporter$9 = () => import("./admin.reports-CotPQivH.mjs");
var Route$9 = createFileRoute("/admin/reports")({
	head: () => seo("Admin – Reports & Analytics", "Track volunteering performance, alumni impact and community contributions."),
	component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
var $$splitComponentImporter$8 = () => import("./fund-request_.success-DyTjIX4-.mjs");
var Route$8 = createFileRoute("/fund-request_/success")({
	head: () => seo("Fund Request Submitted", "Maatram event expense reimbursement request and verification."),
	component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
var $$splitComponentImporter$7 = () => import("./register.basic-xTkck2EX.mjs");
var Route$7 = createFileRoute("/register/basic")({
	head: () => seo("Volunteer Registration – Basic Details", "Create your Maatram volunteer account: basic details."),
	component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
var $$splitComponentImporter$6 = () => import("./register.submitted-B4fmwscY.mjs");
var Route$6 = createFileRoute("/register/submitted")({
	head: () => seo("Your Details Have Been Sent", "Your Maatram volunteer registration is under review."),
	component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
var $$splitComponentImporter$5 = () => import("./register.volunteer-5EkIdPg1.mjs");
var Route$5 = createFileRoute("/register/volunteer")({
	head: () => seo("Volunteer Registration – Volunteer Details", "Tell Maatram about your work, availability and motivation."),
	component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
var $$splitComponentImporter$4 = () => import("./admin.opportunities.published-CKeYlpuy.mjs");
var Route$4 = createFileRoute("/admin/opportunities/published")({
	head: () => seo("Opportunity Published", "Your volunteering event is now live for Maatram volunteers."),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./admin.pulse.index-B_RGlHkt.mjs");
var Route$3 = createFileRoute("/admin/pulse/")({
	head: () => seo("Pulse – Event Broadcasting", "Select an event and send announcements to the right volunteers."),
	component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
var $$splitComponentImporter$2 = () => import("./admin.opportunities.new.index-ChGeuBRN.mjs");
var Route$2 = createFileRoute("/admin/opportunities/new/")({
	head: () => seo("Create Opportunity – Event Details", "Step 1 of 3: add the basic details of a new Maatram volunteering event."),
	component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
var $$splitComponentImporter$1 = () => import("./admin.opportunities.new.guide-DhO22jlz.mjs");
var Route$1 = createFileRoute("/admin/opportunities/new/guide")({
	head: () => seo("Create Opportunity – Event Guide", "Step 2 of 3: describe purpose, responsibilities, schedule and contact details."),
	component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
var $$splitComponentImporter = () => import("./admin.opportunities.new.review-5mPZZEa5.mjs");
var Route = createFileRoute("/admin/opportunities/new/review")({
	head: () => seo("Create Opportunity – Review & Publish", "Step 3 of 3: review every detail and publish the opportunity."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
var IndexRoute = Route$23.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$24
});
var AdminRoute = Route$22.update({
	id: "/admin",
	path: "/admin",
	getParentRoute: () => Route$24
});
var CommunityRoute = Route$21.update({
	id: "/community",
	path: "/community",
	getParentRoute: () => Route$24
});
var DashboardRoute = Route$20.update({
	id: "/dashboard",
	path: "/dashboard",
	getParentRoute: () => Route$24
});
var ExploreRoute = Route$19.update({
	id: "/explore",
	path: "/explore",
	getParentRoute: () => Route$24
});
var FundRequestRoute = Route$18.update({
	id: "/fund-request",
	path: "/fund-request",
	getParentRoute: () => Route$24
});
var ImpactRoute = Route$17.update({
	id: "/impact",
	path: "/impact",
	getParentRoute: () => Route$24
});
var LoginRoute = Route$16.update({
	id: "/login",
	path: "/login",
	getParentRoute: () => Route$24
});
var OpportunitiesRoute = Route$15.update({
	id: "/opportunities",
	path: "/opportunities",
	getParentRoute: () => Route$24
});
var ProfileRoute = Route$14.update({
	id: "/profile",
	path: "/profile",
	getParentRoute: () => Route$24
});
var VerificationRoute = Route$13.update({
	id: "/verification",
	path: "/verification",
	getParentRoute: () => Route$24
});
var VerifiedRoute = Route$12.update({
	id: "/verified",
	path: "/verified",
	getParentRoute: () => Route$24
});
var WelcomeRoute = Route$11.update({
	id: "/welcome",
	path: "/welcome",
	getParentRoute: () => Route$24
});
var AdminIndexRoute = Route$10.update({
	id: "/",
	path: "/",
	getParentRoute: () => AdminRoute
});
var AdminReportsRoute = Route$9.update({
	id: "/reports",
	path: "/reports",
	getParentRoute: () => AdminRoute
});
var CommunityCommunityIdRoute = Route$31.update({
	id: "/community_/$communityId",
	path: "/community/$communityId",
	getParentRoute: () => Route$24
});
var FundRequestSuccessRoute = Route$8.update({
	id: "/fund-request_/success",
	path: "/fund-request/success",
	getParentRoute: () => Route$24
});
var OpportunitiesOpportunityIdRoute = Route$33.update({
	id: "/opportunities_/$opportunityId",
	path: "/opportunities/$opportunityId",
	getParentRoute: () => Route$24
});
var RegisterBasicRoute = Route$7.update({
	id: "/register/basic",
	path: "/register/basic",
	getParentRoute: () => Route$24
});
var RegisterSubmittedRoute = Route$6.update({
	id: "/register/submitted",
	path: "/register/submitted",
	getParentRoute: () => Route$24
});
var RegisterVolunteerRoute = Route$5.update({
	id: "/register/volunteer",
	path: "/register/volunteer",
	getParentRoute: () => Route$24
});
var AdminManageSectionRoute = Route$25.update({
	id: "/manage/$section",
	path: "/manage/$section",
	getParentRoute: () => AdminRoute
});
var AdminOpportunitiesPublishedRoute = Route$4.update({
	id: "/opportunities/published",
	path: "/opportunities/published",
	getParentRoute: () => AdminRoute
});
var AdminPulseIndexRoute = Route$3.update({
	id: "/pulse/",
	path: "/pulse/",
	getParentRoute: () => AdminRoute
});
var AdminPulseSuccessRoute = Route$26.update({
	id: "/pulse/success",
	path: "/pulse/success",
	getParentRoute: () => AdminRoute
});
var AdminPulseTargetingRoute = Route$27.update({
	id: "/pulse/targeting",
	path: "/pulse/targeting",
	getParentRoute: () => AdminRoute
});
var AdminVolunteersIndexRoute = Route$29.update({
	id: "/volunteers/",
	path: "/volunteers/",
	getParentRoute: () => AdminRoute
});
var AdminVolunteersIdRoute = Route$28.update({
	id: "/volunteers/$id",
	path: "/volunteers/$id",
	getParentRoute: () => AdminRoute
});
var CommunityCommunityIdChatRoute = Route$32.update({
	id: "/community_/$communityId_/chat",
	path: "/community/$communityId/chat",
	getParentRoute: () => Route$24
});
var OpportunitiesOpportunityIdGuideRoute = Route$34.update({
	id: "/opportunities_/$opportunityId_/guide",
	path: "/opportunities/$opportunityId/guide",
	getParentRoute: () => Route$24
});
var AdminOpportunitiesNewIndexRoute = Route$2.update({
	id: "/opportunities/new/",
	path: "/opportunities/new/",
	getParentRoute: () => AdminRoute
});
var AdminRouteChildren = {
	AdminReportsRoute,
	AdminIndexRoute,
	AdminManageSectionRoute,
	AdminOpportunitiesPublishedRoute,
	AdminPulseSuccessRoute,
	AdminPulseTargetingRoute,
	AdminVolunteersIdRoute,
	AdminPulseIndexRoute,
	AdminVolunteersIndexRoute,
	AdminOpportunitiesNewGuideRoute: Route$1.update({
		id: "/opportunities/new/guide",
		path: "/opportunities/new/guide",
		getParentRoute: () => AdminRoute
	}),
	AdminOpportunitiesNewReviewRoute: Route.update({
		id: "/opportunities/new/review",
		path: "/opportunities/new/review",
		getParentRoute: () => AdminRoute
	}),
	AdminVolunteersReviewIdRoute: Route$30.update({
		id: "/volunteers/review/$id",
		path: "/volunteers/review/$id",
		getParentRoute: () => AdminRoute
	}),
	AdminOpportunitiesNewIndexRoute
};
var rootRouteChildren = {
	IndexRoute,
	AdminRoute: AdminRoute._addFileChildren(AdminRouteChildren),
	CommunityRoute,
	DashboardRoute,
	ExploreRoute,
	FundRequestRoute,
	ImpactRoute,
	LoginRoute,
	OpportunitiesRoute,
	ProfileRoute,
	VerificationRoute,
	VerifiedRoute,
	WelcomeRoute,
	CommunityCommunityIdRoute,
	FundRequestSuccessRoute,
	OpportunitiesOpportunityIdRoute,
	RegisterBasicRoute,
	RegisterSubmittedRoute,
	RegisterVolunteerRoute,
	CommunityCommunityIdChatRoute,
	OpportunitiesOpportunityIdGuideRoute
};
var routeTree = Route$24._addFileChildren(rootRouteChildren)._addFileTypes();
var getRouter = () => {
	const queryClient = new QueryClient();
	return createRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreloadStaleTime: 0
	});
};
//#endregion
export { getRouter };
