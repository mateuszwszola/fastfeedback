import { useState, useRef } from 'react';
import { mutate } from 'swr';
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
import { useAuth } from '@/lib/auth';
import { DeleteIcon } from '@/styles/icons';

const RemoveButton = ({ feedbackId }) => {
    const [isOpen, setIsOpen] = useState();
    const cancelRef = useRef();
    const auth = useAuth();

    const onClose = () => setIsOpen(false);
    const onDelete = () => {
        deleteFeedback(feedbackId);
        mutate(
            ['/api/feedback', auth.user.token],
            async (data) => {
                return {
                    feedback: data.feedback.filter(
                        (feedback) => feedback.id !== feedbackId
                    )
                };
            },
            false
        );
        onClose();
    };

    return (
        <>
            <IconButton
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
                        <Button variantColor="red" onClick={onDelete} ml={3}>
                            Delete
                        </Button>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
};

export default RemoveButton;
