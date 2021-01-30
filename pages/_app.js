import { NextSeo } from 'next-seo';
import { ChakraProvider } from '@chakra-ui/react';
import { AuthProvider } from '@/lib/auth';
import theme from '@/styles/theme';
import seoConfig from '../next-seo-config';

function MyApp({ Component, pageProps }) {
    return (
        <ChakraProvider theme={theme}>
            <AuthProvider>
                <NextSeo {...seoConfig} />
                <Component {...pageProps} />
            </AuthProvider>
        </ChakraProvider>
    );
}

export default MyApp;
