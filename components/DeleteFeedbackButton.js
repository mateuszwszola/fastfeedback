import { useState, useRef } from 'react';
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    IconButton,
    Button
} from '@chakra-ui/react';
import { deleteFeedback } from '@/lib/db';
import { DeleteIcon } from '@/styles/icons';
import { mutate } from 'swr';
import { useAuth } from '@/lib/auth';

const DeleteFeedbackButton = ({ feedbackId, ...props }) => {
    const { user } = useAuth();
    const [isOpen, setIsOpen] = useState();
    const cancelRef = useRef();
    const onClose = () => setIsOpen(false);
    const onDelete = () => {
        deleteFeedback(feedbackId);
        mutate(
            ['/api/feedback', user.token],
            (data) => ({
                feedback: data.feedback?.filter(
                    (feedback) => feedback.id !== feedbackId
                )
            }),
            false
        );
        onClose();
    };

    return (
        <>
            <IconButton
                {...props}
                aria-label="Delete feedback"
                icon={<DeleteIcon />}
                variant="ghost"
                onClick={() => setIsOpen(true)}
            />
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete Feedback
                    </AlertDialogHeader>
                    <AlertDialogBody>
                        Are you sure? You can't undo this action afterwards.
                    </AlertDialogBody>
                    <AlertDialogFooter>
                        <Button ref={cancelRef} onClick={onClose}>
                            Cancel
                        </Button>
                        <Button
                            fontWeight="bold"
                            colorScheme="red"
                            onClick={onDelete}
                            ml={3}
                        >
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default DeleteFeedbackButton;
