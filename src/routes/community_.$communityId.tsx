import { createFileRoute } from '@tanstack/react-router';
import { CommunityScreen } from '@/components/community-screens';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/community_/$communityId')({ head: () => seo('Community Overview', 'Maatram community overview for volunteering and community collaboration.'), component: Page });
function Page() { const { communityId } = Route.useParams(); return <CommunityScreen id={communityId}/>; }
