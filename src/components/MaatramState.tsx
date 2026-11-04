import { createContext, useContext, useState, type ReactNode } from 'react';
import { attendanceMock, type FundRequestDraft } from '@/data/mock';
type Message = { id: number; text: string; kind?: 'poll' | 'proof' | 'file' | undefined };
type State = { joined: string[]; register: (id: string) => void; attended: boolean; markedCount: number; markAttendance: () => void; messages: Message[]; send: (text: string, kind?: Message['kind']) => void; fundRequest: FundRequestDraft | null; submitFund: (draft: FundRequestDraft) => void };
const Context = createContext<State | null>(null);
export function MaatramState({ children }: { children: ReactNode }) {
 const [joined, setJoined] = useState<string[]>([]);
 const [attended, setAttended] = useState(false);
 const [messages, setMessages] = useState<Message[]>([]);
 const [fundRequest, submitFund] = useState<FundRequestDraft | null>(null);
 return <Context.Provider value={{ joined, register: id => setJoined(old => old.includes(id) ? old : [...old,id]), attended, markedCount: attendanceMock.markedCount + (attended ? 1 : 0), markAttendance: () => setAttended(true), messages, send: (text,kind) => setMessages(old => [...old,{ id: Date.now(), text, kind }]), fundRequest, submitFund }}>{children}</Context.Provider>;
}
export function useMaatramState() { const state = useContext(Context); if (!state) throw new Error('Maatram state provider is missing'); return state; }
