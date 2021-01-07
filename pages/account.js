import { useState } from 'react';
import { useAuth } from '@/lib/auth';
import { goToBillingPortal } from '@/lib/db';
import { useToast, Button, Box } from '@chakra-ui/react';
import DashboardShell from '@/components/DashboardShell';
import { BrandButton } from '@/components/Button';

const Account = () => {
    const { signOut } = useAuth();
    const [isBillingLoading, setBillingLoading] = useState(false);
    const toast = useToast();

    const onManageBillingBtnClick = (_e) => {
        setBillingLoading(true);
        goToBillingPortal().catch((error) => {
            toast({
                title: 'An error occurred.',
                description:
                    error.message || 'Unable to redirect to a customer portal.',
                status: 'error',
                duration: 9000,
                isClosable: true
            });
        });
    };

    return (
        <DashboardShell>
            <Box>
                <BrandButton
                    onClick={onManageBillingBtnClick}
                    isLoading={isBillingLoading}
                >
                    View Billing Portal
                </BrandButton>

                <Button ml={4} onClick={() => signOut()}>
                    Log Out
                </Button>
            </Box>
        </DashboardShell>
    );
};

export default Account;
