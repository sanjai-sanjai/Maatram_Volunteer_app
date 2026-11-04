import { createContext, useContext, useState, useCallback, useMemo, type ReactNode } from "react";
import { attendanceMock, type FundRequestDraft } from "@/data/mock";

type Message = { id: number; text: string; kind?: "poll" | "proof" | "file" | undefined };
type State = {
  joined: string[];
  register: (id: string) => void;
  attended: boolean;
  markedCount: number;
  markAttendance: () => void;
  messages: Message[];
  send: (text: string, kind?: Message["kind"]) => void;
  fundRequest: FundRequestDraft | null;
  submitFund: (draft: FundRequestDraft) => void;
};

const Context = createContext<State | null>(null);

export function MaatramState({ children }: { children: ReactNode }) {
  const [joined, setJoined] = useState<string[]>([]);
  const [attended, setAttended] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [fundRequest, setFundRequest] = useState<FundRequestDraft | null>(null);

  const register = useCallback((id: string) => {
    setJoined((old) => (old.includes(id) ? old : [...old, id]));
  }, []);

  const markAttendance = useCallback(() => {
    setAttended(true);
  }, []);

  const send = useCallback((text: string, kind?: Message["kind"]) => {
    setMessages((old) => [...old, { id: Date.now(), text, kind }]);
  }, []);

  const submitFund = useCallback((draft: FundRequestDraft) => {
    setFundRequest(draft);
  }, []);

  const markedCount = attendanceMock.markedCount + (attended ? 1 : 0);

  const value = useMemo(
    () => ({
      joined,
      register,
      attended,
      markedCount,
      markAttendance,
      messages,
      send,
      fundRequest,
      submitFund,
    }),
    [
      joined,
      register,
      attended,
      markedCount,
      markAttendance,
      messages,
      send,
      fundRequest,
      submitFund,
    ],
  );

  return <Context.Provider value={value}>{children}</Context.Provider>;
}

export function useMaatramState() {
  const state = useContext(Context);
  if (!state) throw new Error("Maatram state provider is missing");
  return state;
}

