import { createFileRoute } from "@tanstack/react-router";
import { AdminCommunityProvider } from "@/components/admin/community/AdminCommunityState";
import { AdminCommunityDashboard } from "@/components/admin/community/AdminCommunityDashboard";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/community/$communityId")({
  head: () =>
    seo(
      "Admin – Community Operations",
      "Manage community chats, meetings, polls, on-site attendance, photo proof verification, and thank notes."
    ),
  component: AdminCommunityDetailPage,
});

function AdminCommunityDetailPage() {
  const { communityId } = Route.useParams();

  return (
    <AdminCommunityProvider initialCommunityId={communityId}>
      <AdminCommunityDashboard />
    </AdminCommunityProvider>
  );
}
