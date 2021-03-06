import PropTypes from 'prop-types';
import { useDisclosure, useToast } from '@chakra-ui/react';
import { deleteFeedback } from '@/lib/db';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';
import DeleteButton from '@/components/DeleteButton';

const DeleteFeedbackButton = ({ feedbackId, ...props }) => {
    const { user } = useAuth();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const onDelete = () => {
        deleteFeedback(feedbackId).catch(() => {
            toast({
                title: 'An error occurred.',
                description: 'Unable to delete a comment.',
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        });

        mutate(
            ['/api/feedback', user.token],
            (data) => ({
                feedback:
                    data?.feedback.filter(
                        (feedback) => feedback.id !== feedbackId
                    ) || []
            }),
            false
        );

        onClose();
    };

    return (
        <DeleteButton
            resourceName={'feedback'}
            isOpen={isOpen}
            onDelete={onDelete}
            onOpen={onOpen}
            onClose={onClose}
            {...props}
        />
    );
};

DeleteFeedbackButton.propTypes = {
    feedbackId: PropTypes.string.isRequired
};

export default DeleteFeedbackButton;
