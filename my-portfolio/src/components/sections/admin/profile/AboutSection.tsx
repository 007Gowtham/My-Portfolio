// components/AboutSection.tsx
import React, { ChangeEvent } from "react";

interface AboutSectionProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

export default function AboutSection({ value, onChange }: AboutSectionProps) {
    return (
        <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                About
            </label>
            <textarea
                name="about"
                value={value}
                onChange={onChange}
                rows={3}
                placeholder="Write something about yourself..."
                className="w-full md:rows-4 lg:rows-5 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors resize-none"
            />
        </div>
    );
}