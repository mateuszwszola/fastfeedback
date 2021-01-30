import { useState } from 'react';
import NextLink from 'next/link';
import {
    useToast,
    Flex,
    Stack,
    Box,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Button
} from '@chakra-ui/react';
import { useAuth } from '@/lib/auth';
import { useForm } from 'react-hook-form';
import { Logo } from '@/styles/icons';

const Login = () => {
    const toast = useToast();
    const [loading, setLoading] = useState(false);
    const { signInWithEmail } = useAuth();
    const { handleSubmit, register, errors } = useForm();

    const onLogin = ({ email, password }) => {
        setLoading(true);
        signInWithEmail(email, password).catch((error) => {
            setLoading(false);
            toast({
                title: 'An error occurred.',
                description: error.message,
                status: 'error',
                duration: 5000,
                isClosable: true
            });
        });
    };

    return (
        <Flex
            align="center"
            justify="center"
            h="100vh"
            backgroundColor="gray.100"
        >
            <Stack
                as="form"
                backgroundColor="white"
                borderRadius={[0, 8]}
                errors={errors}
                maxW="400px"
                onSubmit={handleSubmit(onLogin)}
                px={8}
                py={12}
                shadow={[null, 'md']}
                spacing={4}
                w="100%"
            >
                <Flex justify="center">
                    <NextLink href="/" passHref>
                        <Box as="a" href="/" aria-label="Back to homepage">
                            <Logo
                                color="black"
                                name="logo"
                                boxSize="64px"
                                mb={4}
                            />
                        </Box>
                    </NextLink>
                </Flex>
                <FormControl isInvalid={errors.email?.message}>
                    <FormLabel>Email Address</FormLabel>
                    <Input
                        autoFocus
                        aria-label="Email Address"
                        id="email"
                        name="email"
                        ref={register({
                            required: 'Please enter your email.'
                        })}
                        placeholder="name@site.com"
                    />
                    <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
                </FormControl>
                <FormControl isInvalid={errors.pass && errors.pass.message}>
                    <FormLabel>Password</FormLabel>
                    <Input
                        aria-label="Password"
                        name="pass"
                        id="password"
                        type="password"
                        ref={register({
                            required: 'Please enter a password.'
                        })}
                    />
                    <FormErrorMessage>
                        {errors.pass && errors.pass.message}
                    </FormErrorMessage>
                </FormControl>
                <Button
                    id="login"
                    type="submit"
                    backgroundColor="gray.900"
                    color="white"
                    isLoading={loading}
                    fontWeight="medium"
                    mt={4}
                    h="50px"
                    fontSize="lg"
                    _hover={{ bg: 'gray.700' }}
                    _active={{
                        bg: 'gray.800',
                        transform: 'scale(0.95)'
                    }}
                >
                    Login
                </Button>
            </Stack>
        </Flex>
    );
};

export default Login;
