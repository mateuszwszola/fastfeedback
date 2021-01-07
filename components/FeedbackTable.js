import { Table, Th, Tr } from './Table';
import FeedbackRow from '@/components/FeedbackRow';

const FeedbackTable = ({ allFeedback }) => {
    return (
        <Table>
            <thead>
                <Tr>
                    <Th>Name</Th>
                    <Th>Feedback</Th>
                    <Th>Route</Th>
                    <Th>Visible</Th>
                    <Th>{''}</Th>
                </Tr>
            </thead>
            <tbody>
                {allFeedback.map((feedback) => (
                    <FeedbackRow
                        key={feedback.id}
                        id={feedback.id}
                        author={feedback.author}
                        status={feedback.status}
                        text={feedback.text}
                    />
                ))}
            </tbody>
        </Table>
    );
};

export default FeedbackTable;
