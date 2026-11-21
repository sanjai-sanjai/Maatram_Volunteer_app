import { createFileRoute } from "@tanstack/react-router";
import { AdminCommunityProvider } from "@/components/admin/community/AdminCommunityState";
import { AdminCommunityList } from "@/components/admin/community/AdminCommunityList";
import { seo } from "@/lib/seo";

export const Route = createFileRoute("/admin/communities/")({
  head: () =>
    seo(
      "Admin – Communities Hub",
      "Manage all Maatram student communities, events, chat announcements, and operations."
    ),
  component: AdminCommunitiesIndexPage,
});

function AdminCommunitiesIndexPage() {
  return (
    <AdminCommunityProvider>
      <AdminCommunityList />
    </AdminCommunityProvider>
  );
}
