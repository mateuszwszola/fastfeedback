import useSWR from 'swr';
import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import SiteTable from '@/components/SiteTable';
import { useAuth } from '@/lib/auth';
import fetcher from '@/utils/fetcher';
import SiteTableHeader from '@/components/SiteTableHeader';
import UpgradeEmptyState from '@/components/UpgradeEmptyState';

const Dashboard = () => {
    const { user } = useAuth();
    const { data } = useSWR(user ? ['/api/sites', user.token] : null, fetcher);
    const isPaidAccount = user?.stripeRole !== 'free';
    const sites = data?.sites;

    if (!data) {
        return (
            <DashboardShell>
                <SiteTableHeader />
                <SiteTableSkeleton />
            </DashboardShell>
        );
    }

    if (sites?.length) {
        return (
            <DashboardShell>
                <SiteTableHeader isPaidAccount={isPaidAccount} />
                <SiteTable sites={sites} />
            </DashboardShell>
        );
    }

    return (
        <DashboardShell>
            <SiteTableHeader isPaidAccount={isPaidAccount} />
            {isPaidAccount ? <EmptyState /> : <UpgradeEmptyState />}
        </DashboardShell>
    );
};

export default Dashboard;
