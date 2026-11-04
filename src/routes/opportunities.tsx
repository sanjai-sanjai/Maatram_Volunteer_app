import { createFileRoute } from '@tanstack/react-router';
import { OpportunitiesScreen } from '@/components/opportunity-screens';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/opportunities')({ head: () => seo('Upcoming Opportunities', 'Browse all active Maatram volunteering opportunities.'), component: OpportunitiesScreen });
