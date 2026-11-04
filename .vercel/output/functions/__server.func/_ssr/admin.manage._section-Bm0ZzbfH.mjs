import { G as redirect, J as notFound, _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as seo } from "./seo-LdVBjSjX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.manage._section-Bm0ZzbfH.js
var sections = {
	events: {
		title: "Events & Registrations",
		sub: "Track registrations for every opportunity.",
		nav: "Events"
	},
	communities: {
		title: "Manage Communities",
		sub: "Event communities and their activity.",
		nav: "Communities"
	},
	volunteers: {
		title: "Volunteers",
		sub: "Registered and verified Maatram volunteers.",
		nav: "Volunteers"
	},
	reports: {
		title: "Reports",
		sub: "Impact and participation at a glance.",
		nav: "Reports"
	},
	pending: {
		title: "Pending Actions",
		sub: "Items waiting for your review.",
		nav: "Home"
	}
};
var $$splitComponentImporter = () => import("./admin.manage._section-CVaye5Tt.mjs");
var Route = createFileRoute("/admin/manage/$section")({
	beforeLoad: ({ params }) => {
		if (params.section === "reports") throw redirect({ to: "/admin/reports" });
		if (params.section === "volunteers") throw redirect({ to: "/admin/volunteers" });
	},
	loader: ({ params }) => {
		if (!(params.section in sections)) throw notFound();
	},
	head: ({ params }) => {
		const s = sections[params.section];
		return s ? seo(`Admin – ${s.title}`, s.sub) : { meta: [{ title: "Unavailable" }, {
			name: "robots",
			content: "noindex"
		}] };
	},
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { sections as n, Route as t };
