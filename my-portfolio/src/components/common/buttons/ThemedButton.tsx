import React from "react";

interface ContactButtonProps {
    title?: React.ReactNode;
    icon?: React.ReactNode;
    onClick?: () => void;
    className?: string;
    type?: "button" | "submit" | "reset";
    disabled?: boolean;
    iconPosition?: "left" | "right";
    variant?: "primary" | "danger";
}

export default function ContactButton({
    title,
    icon,
    onClick,
    className = "",
    type = "button",
    disabled = false,
    iconPosition = "left",
    variant = "primary"
}: ContactButtonProps) {
    const buttonClass =
        variant === "danger"
            ? "contact-button contact-button-danger"
            : "contact-button contact-button-primary";

    return (
        <>
            <button
                type={type}
                onClick={onClick}
                disabled={disabled}
                className={`${buttonClass} ${className}`}
            >
                {icon && iconPosition === "left" && (
                    <span className="icon">{icon}</span>
                )}
                {title && <span className="text">{title}</span>}
                {icon && iconPosition === "right" && (
                    <span className="icon">{icon}</span>
                )}
            </button>

            <style jsx>{`
                .contact-button {
                    display: inline-flex;
                    align-items: center;
                    gap: 0.5rem;
                    padding: 0.6rem 1.2rem;
                    border: none;
                    cursor: pointer;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 500;
                    transition: all 0.3s ease-out;
                    backdrop-filter: blur(6px);
                    color: white;
                    box-shadow: inset 0 1px 2px 0 #b8c1e6,
                        0 0.71px 0.71px -0.58px rgba(46, 64, 128, 0.35),
                        0 1.81px 1.81px -1.17px rgba(46, 64, 128, 0.34),
                        0 3.62px 3.62px -1.75px rgba(46, 64, 128, 0.33),
                        0 6.87px 6.87px -2.33px rgba(46, 64, 128, 0.3),
                        0 13.65px 13.65px -2.92px rgba(46, 64, 128, 0.26),
                        0 30px 30px -3.5px rgba(46, 64, 128, 0.15);
                }

                /* Variants */
                .contact-button-primary {
    background: linear-gradient(
        127deg,
        #0e1c29 -68%,
        rgb(50, 61, 104) 100%
    );
}


                .contact-button-danger {
                    background-color: #fff;
                }

                /* Hover effects */
                .contact-button:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: inset 0 1px 2px 0 #b8c1e6,
                        0 2px 2px -0.58px rgba(46, 64, 128, 0.4),
                        0 4px 4px -1.17px rgba(46, 64, 128, 0.39),
                        0 8px 8px -1.75px rgba(46, 64, 128, 0.38),
                        0 15px 15px -2.33px rgba(46, 64, 128, 0.35),
                        0 25px 25px -2.92px rgba(46, 64, 128, 0.31),
                        0 45px 45px -3.5px rgba(46, 64, 128, 0.25),
                        0 70px 70px -4px rgba(46, 64, 128, 0.2);
                }

                /* Click effect */
                .contact-button:active {
                    transform: translateY(-1px) scale(1.01);
                    transition: all 0.1s ease-out;
                }

                /* Icon alignment */
                .icon {
                    display: flex;
                    align-items: center;
                }
            `}</style>
        </>
    );
}
