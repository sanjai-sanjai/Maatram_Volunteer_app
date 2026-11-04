import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as seo } from "./seo-LdVBjSjX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.pulse.success-DKe9nSwG.js
var $$splitComponentImporter = () => import("./admin.pulse.success-CM42XDaB.mjs");
var Route = createFileRoute("/admin/pulse/success")({
	validateSearch: (s) => ({
		event: typeof s["event"] === "string" ? s["event"] : "palm-seeds",
		tier: [
			1,
			2,
			3
		].includes(Number(s["tier"])) ? Number(s["tier"]) : 1
	}),
	head: () => seo("Announcement Sent", "Your volunteering announcement has been delivered to the selected volunteers."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
