import { useRef } from 'react';
import PropTypes from 'prop-types';
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
import { DeleteIcon } from '@/styles/icons';

const DeleteButton = ({
    isOpen,
    onOpen,
    onClose,
    onDelete,
    resourceName,
    ...props
}) => {
    const cancelRef = useRef();

    return (
        <>
            <IconButton
                aria-label={`Delete ${resourceName}`}
                icon={<DeleteIcon />}
                variant="ghost"
                onClick={onOpen}
                {...props}
            />
            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay />
                <AlertDialogContent>
                    <AlertDialogHeader fontSize="lg" fontWeight="bold">
                        Delete {resourceName}
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

DeleteButton.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onOpen: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    resourceName: PropTypes.string.isRequired
};

export default DeleteButton;
