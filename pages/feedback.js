import fetcher from '@/utils/fetcher';
import useSWR from 'swr';
import DashboardShell from '@/components/DashboardShell';
import FeedbackTableHeader from '@/components/FeedbackTableHeader';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import FeedbackTable from '@/components/FeedbackTable';
import EmptyState from '@/components/EmptyState';
import { useAuth } from '@/lib/auth';

const FeedbackPage = () => {
    const { user } = useAuth();
    const { data } = useSWR(
        user ? ['/api/feedback', user.token] : null,
        fetcher
    );

    if (!data) {
        return (
            <DashboardShell>
                <FeedbackTableHeader />
                <SiteTableSkeleton />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <FeedbackTableHeader />
            {data.feedback?.length ? (
                <FeedbackTable allFeedback={data.feedback} />
            ) : (
                <EmptyState />
            )}
        </DashboardShell>
    );
};

export default FeedbackPage;
