import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as CommunityScreen } from "./community-screens-ryUXLJPx.mjs";
import { t as Route } from "./community_._communityId-BICxM_Lj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/community_._communityId-BavG19AJ.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { communityId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CommunityScreen, { id: communityId });
}
//#endregion
export { Page as component };
