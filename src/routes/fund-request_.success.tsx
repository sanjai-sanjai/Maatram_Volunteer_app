import { createFileRoute } from '@tanstack/react-router';
import { FundSuccessScreen } from '@/components/fund-screens';
import { seo } from '@/lib/seo';
export const Route = createFileRoute('/fund-request_/success')({ head: () => seo('Fund Request Submitted', 'Maatram event expense reimbursement request and verification.'), component: FundSuccessScreen });
