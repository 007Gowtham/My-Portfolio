// components/SkillItem.tsx
import React, { ChangeEvent } from "react";
import { Trash2 } from "lucide-react";
import { ThemedButton } from "@/components/common/buttons";
ThemedButton
interface Skill {
    name: string;
    proficiency: number;
}

interface SkillItemProps {
    skill: Skill;
    index: number;
    onChange: (e: ChangeEvent<HTMLInputElement>, index: number, type: "skills", field: string) => void;
    onRemove: (type: "skills", index: number) => void;
}

export default function SkillItem({ skill, index, onChange, onRemove }: SkillItemProps) {
    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
            <input
                type="text"
                placeholder="Skill Name"
                value={skill.name}
                onChange={(e) => onChange(e, index, "skills", "name")}
                className="flex-1 p-3 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
            />
            <div className="flex gap-2">
                <input
                    type="number"
                    min="0"
                    max="100"
                    placeholder="0"
                    value={skill.proficiency}
                    onChange={(e) => onChange(e, index, "skills", "proficiency")}
                    className="w-16 px-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                />
                <ThemedButton
                    title=""
                    type="button"
                    variant="danger"
                    icon={<Trash2 size={16} />}
                    onClick={() => onRemove("skills", index)}
                    className="themed-button-danger p-2 sm:p-2.5 md:p-3 lg:px-5 lg:py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-intermedium"
                />
            </div>
        </div>
    );
}