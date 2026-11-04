import { createFileRoute } from "@tanstack/react-router";
import { ChatScreen } from "@/components/chat-screen";
import { seo } from "@/lib/seo";
export const Route = createFileRoute("/community_/$communityId_/chat")({
  head: () =>
    seo("Community Chat", "Maatram community chat for volunteering and community collaboration."),
  component: Page,
});
function Page() {
  const { communityId } = Route.useParams();
  return <ChatScreen id={communityId} />;
}
