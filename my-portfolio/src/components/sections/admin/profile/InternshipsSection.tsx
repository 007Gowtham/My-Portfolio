// components/InternshipsSection.tsx
import React, { ChangeEvent } from "react";
import { Plus } from "lucide-react";
import InternshipItem from "./InternshipItem";
import { ContactButton } from "@/components/common/buttons";

interface Internship {
    company: string;
    year: string | number;
    role: string;
    about: string;
}

interface InternshipsSectionProps {
    internships: Internship[];
    onChange: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, type: "internships", field: string) => void;
    onAdd: (type: "internships") => void;
    onRemove: (type: "internships", index: number) => void;
}

export default function InternshipsSection({ internships, onChange, onAdd, onRemove }: InternshipsSectionProps) {
    return (
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                    Internships
                </label>
                <ContactButton
                    title="Add Internship"
                    icon={<Plus size={18} />}
                    onClick={() => onAdd("internships")}
                    className="themed-button flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium text-xs sm:text-sm md:text-base"

                />


            </div>

            <div className="space-y-4 sm:space-y-5 md:space-y-6">
                {internships.map((internship, idx) => (
                    <InternshipItem
                        key={idx}
                        internship={internship}
                        index={idx}
                        onChange={onChange}
                        onRemove={onRemove}
                    />
                ))}
            </div>
        </div>
    );
}