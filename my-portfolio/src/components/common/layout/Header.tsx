import React from "react";

interface HeaderProps {
    title: string;
    heading: string;
    description: string;
}

export default function Header({ title, heading, description }: HeaderProps) {
    return (
        <div className="text-center py-8 sm:py-12 md:py-16 lg:py-20 xl:py-20">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-intermedium font-bold text-gray-800 mb-6 leading-tight">
                    {title}
                </h1>
                <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-intermedium font-semibold text-gray-700 mb-4 leading-tight">
                    {heading}
                </h2>
                <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-inter text-gray-600 leading-relaxed max-w-3xl mx-auto">
                    {description}
                </p>
            </div>
        </div>
    );
}
