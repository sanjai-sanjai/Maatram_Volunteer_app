import { J as notFound, _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as seo } from "./seo-LdVBjSjX.mjs";
import { n as getVolunteer } from "./volunteers-mock-DFczRHcg.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.volunteers._id-C9MwR32-.js
var $$splitComponentImporter = () => import("./admin.volunteers._id-BcKyVowV.mjs");
var Route = createFileRoute("/admin/volunteers/$id")({
	loader: ({ params }) => {
		const v = getVolunteer(params.id);
		if (!v) throw notFound();
		return v;
	},
	head: ({ loaderData }) => loaderData ? seo(`${loaderData.name} – Volunteer Profile`, "Volunteer details and engagement.") : { meta: [{ title: "Unavailable" }, {
		name: "robots",
		content: "noindex"
	}] },
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
