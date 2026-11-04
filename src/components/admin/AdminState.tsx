import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
  useMemo,
  type ReactNode,
} from "react";
import { adminEvents, defaultDraft, type AdminEvent, type EventDraft } from "@/data/admin-mock";

type Sent = { eventId: string; tier: number; count: number };
type State = {
  draft: EventDraft;
  update: (patch: Partial<EventDraft>) => void;
  resetDraft: () => void;
  events: AdminEvent[];
  published: AdminEvent | null;
  publish: () => AdminEvent;
  sent: Sent[];
  recordSent: (s: Sent) => void;
};
const Ctx = createContext<State | null>(null);
const KEY = "maatram-admin-state";

export function AdminState({ children }: { children: ReactNode }) {
  const [draft, setDraft] = useState<EventDraft>(defaultDraft);
  const [created, setCreated] = useState<AdminEvent[]>([]);
  const [published, setPublished] = useState<AdminEvent | null>(null);
  const [sent, setSent] = useState<Sent[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (raw) {
        const s = JSON.parse(raw);
        if (s.draft) setDraft({ ...defaultDraft, ...s.draft });
        if (s.created) setCreated(s.created);
        if (s.published) setPublished(s.published);
        if (s.sent) setSent(s.sent);
      }
    } catch {
      /* ignore */
    }
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    try {
      sessionStorage.setItem(KEY, JSON.stringify({ draft, created, published, sent }));
    } catch {
      // Large uploaded images may exceed storage; keep everything else.
      try {
        sessionStorage.setItem(
          KEY,
          JSON.stringify({ draft: { ...draft, image: null }, created: [], published: null, sent }),
        );
      } catch {
        /* ignore */
      }
    }
  }, [draft, created, published, sent, loaded]);

  const update = useCallback((p: Partial<EventDraft>) => {
    setDraft((d) => ({ ...d, ...p }));
  }, []);

  const resetDraft = useCallback(() => {
    setDraft(defaultDraft);
  }, []);

  const recordSent = useCallback((s: Sent) => {
    setSent((o) => [...o, s]);
  }, []);

  const publish = useCallback(() => {
    const ev: AdminEvent = {
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
      image: draft.image ?? defaultDraft.image!,
      tags: draft.tags.map((t) => t.toLowerCase()),
    };
    setCreated((c) => [ev, ...c]);
    setPublished(ev);
    return ev;
  }, [draft]);

  const events = useMemo(() => [...created, ...adminEvents], [created]);

  const value = useMemo(
    () => ({
      draft,
      update,
      resetDraft,
      events,
      published,
      publish,
      sent,
      recordSent,
    }),
    [draft, update, resetDraft, events, published, publish, sent, recordSent],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAdmin() {
  const s = useContext(Ctx);
  if (!s) throw new Error("AdminState provider missing");
  return s;
}

export function useAdminEvent(id: string | undefined) {
  const { events } = useAdmin();
  return events.find((e) => e.id === id) ?? events.find((e) => e.id === "palm-seeds")!;
}
