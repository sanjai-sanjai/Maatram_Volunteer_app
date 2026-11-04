import { _ as createFileRoute, g as lazyRouteComponent } from "../_libs/@tanstack/react-router+[...].mjs";
import { t as seo } from "./seo-LdVBjSjX.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community_._communityId_.chat-VbhLuFxi.js
var $$splitComponentImporter = () => import("./community_._communityId_.chat-CwNF8mwA.mjs");
var Route = createFileRoute("/community_/$communityId_/chat")({
	head: () => seo("Community Chat", "Maatram community chat for volunteering and community collaboration."),
	component: lazyRouteComponent($$splitComponentImporter, "component")
});
//#endregion
export { Route as t };
