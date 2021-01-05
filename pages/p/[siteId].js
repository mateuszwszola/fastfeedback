import { useState } from 'react';
import { useRouter } from 'next/router';
import useSWR from 'swr';
import { Box, FormControl, FormLabel, Input, Button } from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { getAllFeedback, getAllSites } from '@/lib/db-admin';
import { createFeedback } from '@/lib/db';
import fetcher from '@/utils/fetcher';
import Feedback from '@/components/Feedback';

export async function getStaticProps(ctx) {
    const { siteId } = ctx.params;
    const { feedback } = await getAllFeedback(siteId);

    return {
        props: {
            initialFeedback: feedback
        },
        revalidate: 1
    };
}

export async function getStaticPaths() {
    const { sites } = await getAllSites();
    const paths = sites.map((site) => ({
        params: {
            siteId: site.id.toString()
        }
    }));

    return {
        paths,
        fallback: true
    };
}

function FeedbackPage({ initialFeedback }) {
    const { user } = useAuth();
    const router = useRouter();
    const { siteId } = router.query;
    const [text, setText] = useState('');
    const { data, mutate } = useSWR(
        user?.token ? [`/api/feedback/${siteId}`, user.token] : null,
        fetcher,
        { initialData: { feedback: initialFeedback } }
    );

    const allFeedback = data?.feedback;

    const onSubmit = (e) => {
        e.preventDefault();

        const newFeedback = {
            author: user.name,
            authorId: user.uid,
            siteId,
            text,
            createdAt: new Date().toISOString(),
            provider: user.provider,
            status: 'pending'
        };

        createFeedback(newFeedback);

        setText('');

        mutate(
            (data) => ({
                feedback: [...(data?.feedback || []), newFeedback]
            }),
            false
        );
    };

    return (
        <Box
            display="flex"
            flexDirection="column"
            width="full"
            maxWidth="700px"
            margin="0 auto"
        >
            {user && (
                <Box as="form" onSubmit={onSubmit}>
                    <FormControl my={8}>
                        <FormLabel htmlFor="comment">Comment</FormLabel>
                        <Input
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            id="comment"
                            placeholder="Leave a comment"
                        />
                        <Button mt={4} type="submit" fontWeight="medium">
                            Add Comment
                        </Button>
                    </FormControl>
                </Box>
            )}

            {allFeedback?.map((feedback) => (
                <Feedback key={feedback.createdAt} {...feedback} />
            ))}
        </Box>
    );
}

export default FeedbackPage;
