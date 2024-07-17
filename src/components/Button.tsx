"use client";

interface ButtonProps {
    children: React.ReactNode;
    onClick?: () => void;
    type?: "submit" | "button";
    variant?: "green" | "red" | "blue";
    disabled?: boolean;
}

const Button = ({
    children,
    onClick,
    type = "button",
    variant = "blue",
    disabled = false,
}: ButtonProps) => {
    let buttonClass = `bg-${variant}-500 hover:bg-${variant}-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out`;
    if (variant === "green")
        buttonClass = `bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out`;
    if (variant === "red")
        buttonClass = `bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-300 ease-in-out`;
    if (disabled) buttonClass += " opacity-50 cursor-not-allowed";
    return (
        <button
            type={type}
            className={buttonClass}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default Button;