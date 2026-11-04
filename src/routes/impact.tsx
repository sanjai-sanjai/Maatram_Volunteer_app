import { createFileRoute } from "@tanstack/react-router";
import { ImpactScreen } from "@/components/impact-screen";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/impact")({
  head: () =>
    seo(
      "Impact leaderboard",
      "Celebrate Maatram volunteer contributions, explore the impact leaderboard and discover your achievements.",
    ),
  component: ImpactScreen,
});
