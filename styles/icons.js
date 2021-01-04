import { createIcon } from '@chakra-ui/react';

export const Logo = createIcon({
    displayName: 'Logo',
    viewBox: '0 0 46 32',
    path: (
        <path
            d="M19.557.113C11.34.32 9.117 8.757 9.03 12.95c1.643-2.67 4.62-3.08 6.931-3.08 2.825.085 10.27.205 17.458 0C40.61 9.663 44.802 3.28 46 .112c-5.391-.085-18.228-.205-26.443 0zM14.422 14.234C3.332 14.234-.468 24.76.045 31.948c3.594-6.418 7.617-7.53 9.243-7.445h6.675c5.956 0 11.039-6.846 12.836-10.27H14.422z"
            fill="currentColor"
        />
    )
});

export const DeleteIcon = createIcon({
    displayName: 'Delete',
    viewBox: '0 0 256 256',
    path: (
        <>
            <path fill="none" d="M0 0h256v256H0z" />
            <path
                fill="none"
                stroke="#000"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="16"
                d="M215.996 56h-176M104 104v64M152 104v64M199.996 56v152a8 8 0 01-8 8h-128a8 8 0 01-8-8V56M168 56V40a16 16 0 00-16-16h-48a16 16 0 00-16 16v16"
            />
        </>
    )
});
