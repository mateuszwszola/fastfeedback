import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Logo } from '@/styles/icons';
import { Flex, Button, Text, Link, Stack } from '@chakra-ui/react';
import NextLink from 'next/link';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineGithub } from 'react-icons/ai';

function Home() {
    const { user, signInWithGithub, signInWithGoogle } = useAuth();

    return (
        <Flex
            as="main"
            direction="column"
            align="center"
            justify="center"
            h="100vh"
            maxW="400px"
            margin="0 auto"
        >
            <Head>
                <title>Fast Feedback</title>
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                if (document.cookie && document.cookie.includes('auth')) {
                  window.location.href = "/dashboard"
                }
              `
                    }}
                />
            </Head>

            <Logo mb={2} boxSize="64px" color="black" />
            <Text mb={4}>
                <Text as="span" fontWeight="bold" display="inline">
                    Fast Feedback
                </Text>
                {' is being built as part of '}
                <Link
                    href="https://react2025.com"
                    isExternal
                    textDecoration="underline"
                >
                    React 2025
                </Link>
                {`. It's the easiest way to add comments or reviews to your static site. It's still a work-in-progress, but you can try it out by logging in.`}
            </Text>
            {user ? (
                <NextLink href="/dashboard" passHref>
                    <Button
                        as="a"
                        href="/dashboard"
                        backgroundColor="white"
                        color="gray.900"
                        variant="outline"
                        fontWeight="medium"
                        mt={4}
                        size="lg"
                        _hover={{ bg: 'gray.100' }}
                        _active={{
                            bg: 'gray.100',
                            transform: 'scale(0.95)'
                        }}
                    >
                        View Dashboard
                    </Button>
                </NextLink>
            ) : (
                <Stack>
                    <Button
                        onClick={(_e) => signInWithGithub()}
                        backgroundColor="gray.900"
                        color="white"
                        fontWeight="medium"
                        leftIcon={<AiOutlineGithub />}
                        mt={4}
                        size="lg"
                        _hover={{ bg: 'gray.700' }}
                        _active={{
                            bg: 'gray.800',
                            transform: 'scale(0.95)'
                        }}
                    >
                        Sign In with GitHub
                    </Button>
                    <Button
                        onClick={(_e) => signInWithGoogle()}
                        backgroundColor="white"
                        color="gray.900"
                        variant="outline"
                        fontWeight="medium"
                        leftIcon={<FcGoogle />}
                        mt={4}
                        size="lg"
                        _hover={{ bg: 'gray.100' }}
                        _active={{
                            bg: 'gray.100',
                            transform: 'scale(0.95)'
                        }}
                    >
                        Sign In with Google
                    </Button>
                </Stack>
            )}
        </Flex>
    );
}

export default Home;
