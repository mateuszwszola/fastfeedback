import { Box, Heading, Text, Divider, Flex } from '@chakra-ui/react';
import { format, parseISO } from 'date-fns';

const Feedback = ({ author, text, createdAt }) => (
    <Box borderRadius={4} w="full" maxW="700px">
        <Flex align="center">
            <Heading
                size="sm"
                as="h3"
                mb={0}
                color="gray.900"
                fontWeight="medium"
            >
                {author}
            </Heading>
        </Flex>
        <Text color="gray.500" mb={4} fontSize="xs">
            {format(parseISO(createdAt), 'PPpp')}
        </Text>
        <Text color="gray.800">{text}</Text>

        <Divider borderColor="gray.200" backgroundColor="gray.200" my={8} />
    </Box>
);

export default Feedback;
