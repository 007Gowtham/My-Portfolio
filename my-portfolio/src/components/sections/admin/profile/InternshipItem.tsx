// components/InternshipItem.tsx
import React, { ChangeEvent } from "react";
import { Trash2 } from "lucide-react";
import { ThemedButton } from "@/components/common/buttons";

interface Internship {
    company: string;
    year: string | number;
    role: string;
    about: string;
}

interface InternshipItemProps {
    internship: Internship;
    index: number;
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, type: "internships", field: string) => void;
    onRemove: (type: "internships", index: number) => void;
}

export default function InternshipItem({ internship, index, onChange, onRemove }: InternshipItemProps) {
    return (
        <div className="p-3 sm:p-4 md:p-5 lg:p-6 rounded-lg border border-gray-100 shadow-lg space-y-3 sm:space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {/* Company */}
                <div className="space-y-1 sm:space-y-2">
                    <label className="block text-xs sm:text-sm md:text-base font-intermedium text-gray-700">
                        Company Name
                    </label>
                    <input
                        type="text"
                        placeholder="Company"
                        value={internship.company}
                        onChange={(e) => onChange(e, index, "internships", "company")}
                        className="w-full p-2.5 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                    />
                </div>

                {/* Year */}
                <div className="space-y-1 sm:space-y-2">
                    <label className="block text-xs sm:text-sm md:text-base font-intermedium text-gray-700">
                        Year
                    </label>
                    <input
                        type="number"
                        min="1900"
                        max="2099"
                        placeholder="2024"
                        value={internship.year}
                        onChange={(e) => onChange(e, index, "internships", "year")}
                        className="w-full p-2.5 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                    />
                </div>
            </div>

            {/* Role */}
            <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm md:text-base font-intermedium text-gray-700">
                    Role
                </label>
                <input
                    type="text"
                    placeholder="Software Developer"
                    value={internship.role}
                    onChange={(e) => onChange(e, index, "internships", "role")}
                    className="w-full p-2.5 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                />
            </div>

            {/* Description */}
            <div className="space-y-1 sm:space-y-2">
                <label className="block text-xs sm:text-sm md:text-base font-intermedium text-gray-700">
                    Description
                </label>
                <textarea
                    placeholder="Describe your internship experience..."
                    value={internship.about}
                    onChange={(e) => onChange(e, index, "internships", "about")}
                    rows={2}
                    className="md:rows-3 lg:rows-4 w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors resize-none"
                />
            </div>

            {/* Remove Button */}
            <div className="flex justify-end">
                <ThemedButton
                    title="Remove Internship"
                    type="button"
                    variant="danger"
                    onClick={() => onRemove("internships", index)}
                    className="themed-button-danger p-2 sm:p-2.5 md:p-3 lg:px-5 lg:py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-intermedium"
                />
            </div>
        </div>
    );
}