import PropTypes from 'prop-types';
import { mutate } from 'swr';
import { Box, Code, Switch } from '@chakra-ui/react';

import { useAuth } from '@/lib/auth';
import { updateFeedback } from '@/lib/db';
import { Td } from '@/components/Table';
import DeleteFeedbackButton from '@/components/DeleteFeedbackButton';

const FeedbackRow = ({ id, status, author, text, route }) => {
    const { user } = useAuth();
    const isChecked = status === 'active';

    const toggleFeedbackStatus = async () => {
        await updateFeedback(id, { status: isChecked ? 'pending' : 'active' });
        mutate(['/api/feedback', user.token]);
    };

    return (
        <Box as="tr">
            <Td fontWeight="medium">{author}</Td>
            <Td>{text}</Td>
            <Td>
                <Code>{route || '/'}</Code>
            </Td>
            <Td>
                <Switch
                    onChange={toggleFeedbackStatus}
                    colorScheme="green"
                    isChecked={status === 'active'}
                />
            </Td>
            <Td>
                <DeleteFeedbackButton feedbackId={id} />
            </Td>
        </Box>
    );
};

FeedbackRow.propTypes = {
    id: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    route: PropTypes.string
};

export default FeedbackRow;
