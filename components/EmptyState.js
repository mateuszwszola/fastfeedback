import { Flex, Heading, Text, Box } from '@chakra-ui/react';
import AddSiteModal from '@/components/AddSiteModal';

const EmptyState = () => (
    <Box
        bgColor="white"
        mx={0}
        borderRadius={8}
        boxShadow="0px 4px 10px rgba(0,0,0,0.05)"
    >
        <Box
            bgColor="gray.50"
            borderTopRadius={8}
            borderBottom="1px solid"
            borderBottomColor="gray.200"
            height="40px"
        />
        <Flex
            width="100%"
            borderRadius={8}
            p={16}
            justify="center"
            align="center"
            direction="column"
        >
            <Heading size="lg" mb={2}>
                You haven’t added any sites.
            </Heading>
            <Text mb={4}>Welcome 👋🏼 Let’s get started.</Text>
            <AddSiteModal>Add Your First Site</AddSiteModal>
        </Flex>
    </Box>
);

export default EmptyState;
