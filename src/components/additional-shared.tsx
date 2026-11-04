import type { ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowLeft, ArrowRight, CalendarDays, Clock3, MapPin, X } from "lucide-react";
import { Button, type ButtonProps } from "@/components/ui/button";
import { Logo } from "@/components/mq";
import { BottomNav } from "@/components/AppNav";
import planting from "@/assets/additional/planting-clean.jpg";
import verification from "@/assets/additional/verification-team.jpg";
import cleanup from "@/assets/additional/cleanup.jpg";
import palm from "@/assets/additional/palm-team.jpg";
import interview from "@/assets/additional/interview.jpg";
import school from "@/assets/additional/school.jpg";
import cover from "@/assets/additional/community-cover-clean.jpg";
import hero from "@/assets/additional/planting-hero-clean.jpg";
import coordinator from "@/assets/additional/coordinator.jpg";
import kaviya from "@/assets/additional/kaviya.jpg";
export const photos: Record<string, string> = {
  planting,
  "verification-team": verification,
  cleanup,
  "palm-team": palm,
  interview,
  school,
  cover,
  hero,
  coordinator,
  kaviya,
};
export function Action({ className = "", ...props }: ButtonProps) {
  return <Button variant="ghost" {...props} className={`ma-action ${className}`} />;
}
export function Primary({ children, className = "", ...props }: ButtonProps) {
  return (
    <Action {...props} className={`ma-primary ${className}`}>
      {children}
    </Action>
  );
}
export function IconAction({ label, children, ...props }: ButtonProps & { label: string }) {
  return (
    <Action size="icon" {...props} aria-label={label} title={label} className="ma-icon">
      {children}
    </Action>
  );
}
export function Header({ back = "/dashboard", tools }: { back?: string; tools?: ReactNode }) {
  return (
    <header className="ma-header">
      <Action asChild className="ma-icon">
        <Link to={back} aria-label="Go back">
          <ArrowLeft />
        </Link>
      </Action>
      <Logo small />
      <div className="ma-header-tools">{tools}</div>
    </header>
  );
}
export function Page({
  children,
  active,
  className = "",
}: {
  children: ReactNode;
  active?: string;
  className?: string;
}) {
  return (
    <main className={`ma-page ${className}`}>
      {children}
      <div className="ma-bottom-wave" />
      {active && <BottomNav active={active} />}
    </main>
  );
}
export function Heading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="ma-heading">
      <h1>{title}</h1>
      {subtitle && <p>{subtitle}</p>}
    </div>
  );
}
export function Meta({ op }: { op: { location: string; date: string; time: string } }) {
  return (
    <div className="ma-meta">
      <span>
        <MapPin />
        {op.location}
      </span>
      <span>
        <CalendarDays />
        {op.date}
      </span>
      <span>
        <Clock3 />
        {op.time}
      </span>
    </div>
  );
}
export function Progress({ value, max }: { value: number; max: number }) {
  return (
    <progress className="ma-progress" value={value} max={max} aria-label={`${value} of ${max}`} />
  );
}
export function Modal({
  open,
  onClose,
  title,
  children,
  sheet = false,
}: {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  sheet?: boolean;
}) {
  return (
    <Dialog.Root
      open={open}
      onOpenChange={(value) => {
        if (!value) onClose();
      }}
    >
      <Dialog.Portal>
        <Dialog.Overlay className="ma-overlay" />
        <Dialog.Content
          className={`ma-modal ${sheet ? "ma-modal--sheet" : ""}`}
          aria-describedby={undefined}
        >
          <Dialog.Title className="ma-sr">{title}</Dialog.Title>
          <Dialog.Close asChild>
            <IconAction label="Close">
              <X />
            </IconAction>
          </Dialog.Close>
          {children}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
export function Forward({ children, to }: { children: ReactNode; to: string }) {
  return (
    <Primary asChild>
      <Link to={to}>
        {children}
        <ArrowRight />
      </Link>
    </Primary>
  );
}
