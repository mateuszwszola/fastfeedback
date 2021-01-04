import React from 'react';
import NextLink from 'next/link';
import { Avatar, Box, Button, Flex, Link } from '@chakra-ui/react';
import { Logo } from '@/styles/icons';
import { useAuth } from '@/lib/auth';

const DashboardShell = ({ children }) => {
    const { user } = useAuth();

    return (
        <Box bgColor="gray.100" h="100vh">
            <Flex
                bgColor="white"
                mb={[8, 16]}
                w="full"
                borderTop="5px solid #0AF5F4"
            >
                <Flex
                    justify="space-between"
                    align="center"
                    w="full"
                    maxW="1250px"
                    h="70px"
                    m="0 auto"
                    py={4}
                    px={8}
                >
                    <Flex alignItems="center">
                        <NextLink href="/" passHref>
                            <Link>
                                <Logo mr={8} />
                            </Link>
                        </NextLink>
                        <NextLink href="/sites" passHref>
                            <Link mr={4}>Sites</Link>
                        </NextLink>
                        <NextLink href="/feedback" passHref>
                            <Link>Feedback</Link>
                        </NextLink>
                    </Flex>
                    <Flex justify="center" align="center">
                        {user && (
                            <NextLink href="/account" passHref>
                                <Button as="a" variant="ghost" mr={2}>
                                    Account
                                </Button>
                            </NextLink>
                        )}
                        <Avatar size="sm" src={user?.photoUrl} />
                    </Flex>
                </Flex>
            </Flex>
            <Flex
                direction="column"
                w="full"
                maxWidth="1250px"
                m="0 auto"
                px={[0, 8]}
            >
                {children}
            </Flex>
        </Box>
    );
};

export default DashboardShell;
