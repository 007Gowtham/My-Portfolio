// components/SkillsSection.tsx
import React, { ChangeEvent } from "react";
import { Plus } from "lucide-react";
import SkillItem from "./SkillItem";
import { ThemedButton } from "@/components/common/buttons";
ThemedButton
interface Skill {
    name: string;
    proficiency: number;
}

interface SkillsSectionProps {
    skills: Skill[];
    onChange: (e: ChangeEvent<HTMLInputElement>, index: number, type: "skills", field: string) => void;
    onAdd: (type: "skills") => void;
    onRemove: (type: "skills", index: number) => void;
}

export default function SkillsSection({ skills, onChange, onAdd, onRemove }: SkillsSectionProps) {
    return (
        <div className="space-y-3 sm:space-y-4 md:space-y-5">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                    Skills
                </label>
                <ThemedButton
                    title="Add Skill"
                    type="button"
                    variant="primary"
                    icon={<Plus size={16} />}
                    onClick={() => onAdd("skills")}
                    className="themed-button-danger p-2 sm:p-2.5 md:p-3 lg:px-5 lg:py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-intermedium"
                />
            </div>

            <div className="space-y-2 sm:space-y-3">
                {skills.map((skill, idx) => (
                    <SkillItem
                        key={idx}
                        skill={skill}
                        index={idx}
                        onChange={onChange}
                        onRemove={onRemove}
                    />
                ))}
            </div>
        </div>
    );
}