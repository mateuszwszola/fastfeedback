// import { useAuth } from '@/lib/auth';
import EmptyState from '@/components/EmptyState';
import DashboardShell from '@/components/DashboardShell';
import SiteTableSkeleton from '@/components/SiteTableSkeleton';
import useSWR from 'swr';
import SiteTable from '@/components/SiteTable';

const Dashboard = () => {
  // const auth = useAuth();
  const { data } = useSWR('/api/sites');

  console.log({ data });

  if (!data) {
    return (
      <DashboardShell>
        <SiteTableSkeleton />
      </DashboardShell>
    );
  }

  return (
    <DashboardShell>
      {!data.sites?.length ? <EmptyState /> : <SiteTable sites={data.sites} />}
    </DashboardShell>
  );
};

export default Dashboard;
