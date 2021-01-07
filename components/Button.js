import { Button } from '@chakra-ui/react';

const BrandButton = ({ children, ...props }) => (
    <Button
        bgColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{ bg: 'gray.700' }}
        _active={{
            bg: 'gray.800',
            transform: 'scale(0.95)'
        }}
        {...props}
    >
        {children}
    </Button>
);

export { BrandButton };
