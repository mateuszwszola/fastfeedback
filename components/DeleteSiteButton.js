import PropTypes from 'prop-types';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { deleteSite } from '@/lib/db';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';
import DeleteButton from '@/components/DeleteButton';

const DeleteSiteButton = ({ siteId, ...props }) => {
    const { user } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const onDelete = () => {
        deleteSite(siteId).catch(() => {
            toast({
                title: 'An error occurred.',
                description: 'Unable to delete a site.',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        });

        mutate(
            ['/api/sites', user.token],
            (data) => ({
                sites: data?.sites.filter((site) => site.id !== siteId) || []
            }),
            false
        );

        onClose();
    };

    return (
        <DeleteButton
            resourceName={'site'}
            isOpen={isOpen}
            onDelete={onDelete}
            onOpen={onOpen}
            onClose={onClose}
            {...props}
        />
    );
};

DeleteSiteButton.propTypes = {
    siteId: PropTypes.string.isRequired
};

export default DeleteSiteButton;
