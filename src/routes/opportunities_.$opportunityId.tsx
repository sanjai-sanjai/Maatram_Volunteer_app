import { createFileRoute } from "@tanstack/react-router";
import { DetailsScreen } from "@/components/opportunity-screens";
import { seo } from "@/lib/seo";
export const Route = createFileRoute("/opportunities_/$opportunityId")({
  head: () =>
    seo(
      "Opportunity Details",
      "Maatram opportunity details for volunteering and community collaboration.",
    ),
  component: Page,
});
function Page() {
  const { opportunityId } = Route.useParams();
  return <DetailsScreen id={opportunityId} />;
}
