import React, { forwardRef, ReactNode } from 'react';

interface ButtonProps {
    /**
     * Classes that will be added to the `<button>` element
     */
    className?: string;
    children: ReactNode;
    /**
     * Method called when button is clicked
     */
    onClick?(): void;
}

/**
 * A naive example of a component that wraps a <button> element.
 *
 * @remarks
 * Implemented using `forwardRef` so that the parent component has access to the `ref` of the
 * `<button>` element itself.
 * @param props - see {@link ButtonProps}
 */
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
    (
        { className, children, onClick }: ButtonProps,
        ref,
    ): JSX.Element | null => (
        <button
            type="button"
            ref={ref}
            className={className}
            tabIndex={0}
            onClick={onClick}
        >
            {children}
        </button>
    ),
);

Button.displayName = 'Button';
