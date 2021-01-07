import Head from 'next/head';
import NextLink from 'next/link';
import { Flex, Button, Text, Link, Stack, Box } from '@chakra-ui/react';
import { FcGoogle } from 'react-icons/fc';
import { AiOutlineGithub } from 'react-icons/ai';

import { Logo } from '@/styles/icons';
import { useAuth } from '@/lib/auth';
import { getAllFeedback } from '@/lib/db-admin';
import { BrandButton } from '@/components/Button';
import FeedbackLink from '@/components/FeedbackLink';
import Feedback from '@/components/Feedback';

const SITE_ID = 'cuRJwomYlX9K1s1T7S6E\n';

export async function getStaticProps(context) {
    const { feedback } = await getAllFeedback(SITE_ID);

    return {
        props: {
            allFeedback: feedback
        },
        revalidate: 1
    };
}

function Home({ allFeedback }) {
    const { user, signInWithGithub, signInWithGoogle } = useAuth();

    return (
        <>
            <Box bg="gray.100" py={16}>
                <Flex as="main" direction="column" maxW="700px" margin="0 auto">
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

                    <Logo mb={2} boxSize="48px" color="black" />
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
                                maxW="200px"
                                _hover={{ bg: 'gray.700' }}
                                _active={{
                                    bg: 'gray.800',
                                    transform: 'scale(0.95)'
                                }}
                            >
                                View Dashboard
                            </Button>
                        </NextLink>
                    ) : (
                        <Stack>
                            <BrandButton
                                onClick={(_e) => signInWithGithub()}
                                leftIcon={<AiOutlineGithub />}
                                mt={4}
                                size="lg"
                            >
                                Sign In with GitHub
                            </BrandButton>

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
            </Box>
            <Flex
                direction="column"
                w="full"
                maxWidth="700px"
                margin="0 auto"
                mt={8}
            >
                <FeedbackLink siteId={SITE_ID} />
                {allFeedback.map((feedback) => (
                    <Feedback key={feedback.id} {...feedback} />
                ))}
            </Flex>
        </>
    );
}

export default Home;
