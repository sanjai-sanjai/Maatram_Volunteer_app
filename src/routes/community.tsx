import { createFileRoute } from '@tanstack/react-router';
import { CommunitiesScreen } from '@/components/community-screens';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/community')({ head: () => seo('My Communities', 'Your Maatram volunteering communities and events.'), component: CommunitiesScreen });
