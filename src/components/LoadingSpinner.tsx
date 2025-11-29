import React from 'react';

type SpinnerSize = 'sm' | 'md' | 'lg';

interface LoadingSpinnerProps {
    /** Size of the spinner - sm (16px), md (20px), lg (24px) */
    size?: SpinnerSize;
    /** Border color class - defaults to border-mainTheme-color */
    borderColor?: string;
    /** Accessible label for screen readers */
    ariaLabel?: string;
}

const sizeClasses: Record<SpinnerSize, string> = {
    sm: 'h-4 w-4 sm:h-5 sm:w-5',
    md: 'h-5 w-5 sm:h-6 sm:w-6',
    lg: 'h-6 w-6',
};

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
    size = 'md',
    borderColor = 'border-mainTheme-color',
    ariaLabel = 'Loading',
}) => {
    return (
        <div
            className={`${sizeClasses[size]} animate-spin rounded-full border-2 ${borderColor} border-t-transparent`}
            role="status"
            aria-label={ariaLabel}
        />
    );
};
