import React from 'react';
import {
  Box,
  Flex,
  Link,
  Avatar,
  Button,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Heading
} from '@chakra-ui/react';
import { Logo } from '@/styles/icons';
import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
  const { user, signOut } = useAuth();

  return (
    <Box bgColor="gray.100" h="100vh">
      <Flex bgColor="white" mb={16} w="full">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          pt={4}
          pb={4}
          maxWidth="1250px"
          m="0 auto"
          pl={8}
          pr={8}
        >
          <Flex justifyContent="flex-start" alignItems="center">
            <Logo mr={8} />
            <Link mr={4}>Feedback</Link>
            <Link>Sites</Link>
          </Flex>
          <Flex justifyContent="flex-start" alignItems="center">
            <Button variant="ghost" size="md" mr={2} onClick={() => signOut()}>
              Log Out
            </Button>
            <Avatar size="sm" src={user.photoUrl} />
          </Flex>
        </Flex>
      </Flex>
      <Flex maxWidth="1250px" m="0 auto" px={8} flexDirection="column">
        <Breadcrumb>
          <BreadcrumbItem>
            <BreadcrumbLink>Sites</BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>
        <Flex justifyContent="space-between">
          <Heading mb={8}>My Sites</Heading>
          <Button
            variant="solid"
            size="md"
            backgroundColor="gray.900"
            color="white"
            fontWeight="medium"
            _hover={{ bgColor: 'gray.700' }}
            _active={{
              bgColor: 'gray.800',
              transform: 'scale(0.95)'
            }}
          >
            + Add Site
          </Button>
        </Flex>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
