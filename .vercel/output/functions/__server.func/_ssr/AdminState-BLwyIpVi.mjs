import { o as __toESM } from "../_runtime.mjs";
import { l as defaultDraft, t as adminEvents } from "./admin-mock-D2qySwaK.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/AdminState-BLwyIpVi.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var Ctx = (0, import_react.createContext)(null);
var KEY = "maatram-admin-state";
function AdminState({ children }) {
	const [draft, setDraft] = (0, import_react.useState)(defaultDraft);
	const [created, setCreated] = (0, import_react.useState)([]);
	const [published, setPublished] = (0, import_react.useState)(null);
	const [sent, setSent] = (0, import_react.useState)([]);
	const [loaded, setLoaded] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		try {
			const raw = sessionStorage.getItem(KEY);
			if (raw) {
				const s = JSON.parse(raw);
				if (s.draft) setDraft({
					...defaultDraft,
					...s.draft
				});
				if (s.created) setCreated(s.created);
				if (s.published) setPublished(s.published);
				if (s.sent) setSent(s.sent);
			}
		} catch {}
		setLoaded(true);
	}, []);
	(0, import_react.useEffect)(() => {
		if (!loaded) return;
		try {
			sessionStorage.setItem(KEY, JSON.stringify({
				draft,
				created,
				published,
				sent
			}));
		} catch {
			try {
				sessionStorage.setItem(KEY, JSON.stringify({
					draft: {
						...draft,
						image: null
					},
					created: [],
					published: null,
					sent
				}));
			} catch {}
		}
	}, [
		draft,
		created,
		published,
		sent,
		loaded
	]);
	const publish = () => {
		const ev = {
			id: `${draft.name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}-${Date.now().toString(36)}`,
			name: draft.name,
			category: draft.type,
			status: "Live",
			date: draft.date,
			location: draft.location.replace("Tamil Nadu", "TN"),
			fullLocation: draft.location,
			time: draft.time,
			registered: 0,
			needed: draft.volunteers,
			image: draft.image ?? defaultDraft.image,
			tags: draft.tags.map((t) => t.toLowerCase())
		};
		setCreated((c) => [ev, ...c]);
		setPublished(ev);
		return ev;
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Ctx.Provider, {
		value: {
			draft,
			update: (p) => setDraft((d) => ({
				...d,
				...p
			})),
			resetDraft: () => setDraft(defaultDraft),
			events: [...created, ...adminEvents],
			published,
			publish,
			sent,
			recordSent: (s) => setSent((o) => [...o, s])
		},
		children
	});
}
function useAdmin() {
	const s = (0, import_react.useContext)(Ctx);
	if (!s) throw new Error("AdminState provider missing");
	return s;
}
function useAdminEvent(id) {
	const { events } = useAdmin();
	return events.find((e) => e.id === id) ?? events.find((e) => e.id === "palm-seeds");
}
//#endregion
export { useAdmin as n, useAdminEvent as r, AdminState as t };
