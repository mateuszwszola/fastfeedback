import { Button, Box, Heading, Text } from '@chakra-ui/react';

const FreePlanEmptyState = () => (
  <Box width="100%" backgroundColor="white" borderRadius="8px" p={8}>
    <Heading size="md">Get feedback on your site instantly.</Heading>
    <Text>Start today, then grow with us 🌱</Text>
    <Button>Upgrade to Starter</Button>
  </Box>
);

export default FreePlanEmptyState;
