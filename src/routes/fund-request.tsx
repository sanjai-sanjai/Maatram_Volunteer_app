import { createFileRoute } from "@tanstack/react-router";
import { FundScreen } from "@/components/fund-screens";
import { seo } from "@/lib/seo";
export const Route = createFileRoute("/fund-request")({
  head: () => seo("Fund Request", "Maatram event expense reimbursement request and verification."),
  component: FundScreen,
});
