import React, { ReactNode } from 'react';

import { Button } from '.';

interface ClickCountButtonProps {
    children: ReactNode;
    /**
     * A method to set the state of the counter.
     */
    setCount: SetState<number>;
    // This SetState type ^ is declared in globalTypes/woodshed/state.d.ts and is available
    // throughout the monorepo
}

/**
 * A naive example of a wrapper component that uses a type declared in the globalTypes folder.
 * @param props - {@link ClickCountButtonProps}
 * @returns JSX
 */
export const ClickCountButton = ({
    children,
    setCount,
}: ClickCountButtonProps): JSX.Element => {
    return (
        <Button
            onClick={() => {
                setCount((prev: number): number => prev + 1);
            }}
        >
            {children}
        </Button>
    );
};
