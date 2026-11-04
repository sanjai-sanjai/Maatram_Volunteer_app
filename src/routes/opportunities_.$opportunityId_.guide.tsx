import { createFileRoute } from '@tanstack/react-router';
import { GuideScreen } from '@/components/opportunity-screens';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/opportunities_/$opportunityId_/guide')({ head: () => seo('Event Guide', 'Maatram event guide for volunteering and community collaboration.'), component: Page });
function Page() { const { opportunityId } = Route.useParams(); return <GuideScreen id={opportunityId}/>; }
