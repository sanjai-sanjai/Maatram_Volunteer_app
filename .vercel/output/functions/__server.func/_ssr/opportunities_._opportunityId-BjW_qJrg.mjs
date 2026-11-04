import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as DetailsScreen } from "./opportunity-screens-DlR7-bgt.mjs";
import { t as Route } from "./opportunities_._opportunityId-D8dhJ_bx.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/opportunities_._opportunityId-BjW_qJrg.js
var import_jsx_runtime = require_jsx_runtime();
function Page() {
	const { opportunityId } = Route.useParams();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DetailsScreen, { id: opportunityId });
}
//#endregion
export { Page as component };
