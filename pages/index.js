import Head from 'next/head';
import { useAuth } from '@/lib/auth';
import { Logo } from '@/styles/icons';
import { Flex, Button } from '@chakra-ui/react';
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
      </Head>

      <Logo boxSize="64px" color="black" />
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
