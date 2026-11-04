import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as GuideScreen } from "./opportunity-screens-DlR7-bgt.mjs";
import { t as Route } from "./opportunities_._opportunityId_.guide-fcKMGLDk.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/opportunities_._opportunityId_.guide-CM9k3FZw.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { opportunityId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GuideScreen, { id: opportunityId });
}
//#endregion
export { Page as component };
