import { createFileRoute } from "@tanstack/react-router";
import { OpportunitiesScreen } from "@/components/opportunity-screens";
import { seo } from "@/lib/seo";
export const Route = createFileRoute("/explore")({
  head: () => seo("Explore Opportunities", "Find Maatram opportunities by category and location."),
  component: OpportunitiesScreen,
});
