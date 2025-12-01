import React from "react";

interface ProcessButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    className?: string;
    disabled?: boolean;
}

export default function ProcessButton({
    children,
    onClick,
    className = "",
    disabled = false
}: ProcessButtonProps) {
    return (
        <button
            onClick={onClick}
            disabled={disabled}
            className={`process-button ${className}`}
        >
            {children}
        </button>
    );
}
