import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Logo } from '@/styles/icons';
import { Flex, Button, Text, Link } from '@chakra-ui/react';
import NextLink from 'next/link';

function Home() {
    const { user, signInWithGithub } = useAuth();

    return (
        <Flex
            as="main"
            direction="column"
            align="center"
            justify="center"
            h="100vh"
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

            <Logo boxSize="64px" color="black" />
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
                    <Button as="a">View dashboard</Button>
                </NextLink>
            ) : (
                <Button mt={4} size="sm" onClick={(_e) => signInWithGithub()}>
                    Sign In
                </Button>
            )}
        </Flex>
    );
}

export default Home;
