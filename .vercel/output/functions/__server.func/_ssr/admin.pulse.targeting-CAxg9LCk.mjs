import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as seo } from "./seo-LdVBjSjX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.pulse.targeting-CAxg9LCk.js
var $$splitComponentImporter = () => import("./admin.pulse.targeting-C5P3ZlP3.mjs");
var Route = createFileRoute("/admin/pulse/targeting")({
	validateSearch: (s) => ({ event: typeof s["event"] === "string" ? s["event"] : "palm-seeds" }),
	head: () => seo("Smart Volunteering Announcement", "Reach the right volunteers faster with tiered audience targeting."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
