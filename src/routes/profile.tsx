import { createFileRoute } from "@tanstack/react-router";
import { ProfileScreen } from "@/components/profile-screen";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/profile")({
  head: () => seo("Profile", "Your Maatram student volunteer profile."),
  component: ProfileScreen,
});
