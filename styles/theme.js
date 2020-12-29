import { extendTheme } from '@chakra-ui/react';

const theme = extendTheme({
  styles: {
    global: {
      html: {
        minWidth: '360px',
        scrollBehavior: 'smooth'
      },
      '#__next': {
        display: 'flex',
        flexDirection: 'column',
        minHeight: '100vh'
      }
    }
  }
});

export default theme;
