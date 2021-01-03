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
import AddSiteModal from '@/components/AddSiteModal';

const DashboardShell = ({ children }) => {
  const { user, signOut } = useAuth();

  return (
    <Box bgColor="gray.100" h="100vh">
      <Flex bgColor="white" mb={16} w="full">
        <Flex
          width="100%"
          maxWidth="1250px"
          justifyContent="space-between"
          alignItems="center"
          m="0 auto"
          py={4}
          px={8}
          h="70px"
        >
          <Flex justifyContent="flex-start" alignItems="center">
            <Logo mr={8} />
            <Link mr={4}>Feedback</Link>
            <Link>Sites</Link>
          </Flex>
          <Flex justifyContent="flex-start" alignItems="center">
            {user && (
              <Button
                variant="ghost"
                size="md"
                mr={2}
                onClick={() => signOut()}
              >
                Log Out
              </Button>
            )}
            <Avatar size="sm" src={user?.photoUrl} />
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
          <AddSiteModal>+ Add site</AddSiteModal>
        </Flex>
        {children}
      </Flex>
    </Box>
  );
};

export default DashboardShell;
