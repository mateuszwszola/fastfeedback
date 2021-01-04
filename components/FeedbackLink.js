import NextLink from 'next/link';
import { Flex, Link } from '@chakra-ui/react';

function FeedbackLink({ siteId }) {
    return (
        <Flex justify="space-between" mb={8} width="full" mt={1}>
            <NextLink href={`/p/${siteId}`} passHref>
                <Link fontWeight="bold" fontSize="sm">
                    Leave a comment →
                </Link>
            </NextLink>
            <NextLink href="/" passHref>
                <Link fontSize="xs" color="blackAlpha.500">
                    Powered by Fast Feedback
                </Link>
            </NextLink>
        </Flex>
    );
}

export default FeedbackLink;
