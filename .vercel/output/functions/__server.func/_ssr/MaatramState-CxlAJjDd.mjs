import { o as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { r as attendanceMock } from "./mock-DstdW3Hp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/MaatramState-CxlAJjDd.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Context = (0, import_react.createContext)(null);
function MaatramState({ children }) {
	const [joined, setJoined] = (0, import_react.useState)([]);
	const [attended, setAttended] = (0, import_react.useState)(false);
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [fundRequest, submitFund] = (0, import_react.useState)(null);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Context.Provider, {
		value: {
			joined,
			register: (id) => setJoined((old) => old.includes(id) ? old : [...old, id]),
			attended,
			markedCount: attendanceMock.markedCount + (attended ? 1 : 0),
			markAttendance: () => setAttended(true),
			messages,
			send: (text, kind) => setMessages((old) => [...old, {
				id: Date.now(),
				text,
				kind
			}]),
			fundRequest,
			submitFund
		},
		children
	});
}
function useMaatramState() {
	const state = (0, import_react.useContext)(Context);
	if (!state) throw new Error("Maatram state provider is missing");
	return state;
}
//#endregion
export { useMaatramState as n, MaatramState as t };
