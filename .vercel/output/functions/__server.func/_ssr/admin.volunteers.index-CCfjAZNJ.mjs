import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as seo } from "./seo-LdVBjSjX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/admin.volunteers.index-CCfjAZNJ.js
var $$splitComponentImporter = () => import("./admin.volunteers.index-Dl3O5468.mjs");
var tabs = [
	"verification",
	"all",
	"active",
	"tiers"
];
var Route = createFileRoute("/admin/volunteers/")({
	validateSearch: (s) => tabs.includes(s["tab"]) ? { tab: s["tab"] } : {},
	head: () => seo("Admin – Volunteers", "Manage, verify and organize the Maatram volunteer community."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
