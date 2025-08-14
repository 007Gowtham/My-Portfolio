// AdminProfileForm.tsx

import React, { useState, ChangeEvent } from "react";
import type { GetStaticProps } from "next";
import { Navbar, TopNavbar } from "@/components/sections/navigation";
import { API_CONFIG, ENDPOINTS } from "@/lib/config";

import "@/app/globals.css";
import ProfileImageUpload from "@/components/sections/admin/profile/ProfileImageUpload";
import AboutSection from "@/components/sections/admin/profile/AboutSection";
import SkillsSection from "@/components/sections/admin/profile/SkillsSection";
import InternshipsSection from "@/components/sections/admin/profile/InternshipsSection";
import ThemeStyles from "@/components/sections/admin/profile/ThemeStyles";
import { ThemedButton } from "@/components";
// Types
interface Skill {
    name: string;
    proficiency: number;
}

interface Internship {
    company: string;
    year: string | number;
    role: string;
    about: string;
}

interface FormData {
    about: string;
    skills: Skill[];
    internships: Internship[];
}

type PageProps = {
    initialProfile: any | null;
};

export default function AdminProfileForm({ initialProfile }: PageProps) {
    const [image, setImage] = useState<string | null>(initialProfile?.image ?? null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [profileId, setProfileId] = useState<number | null>(initialProfile?.id ?? null);
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [formData, setFormData] = useState<FormData>({
        about: initialProfile?.about ?? "",
        skills: (initialProfile?.skills ?? []).map((s: any) => ({
            name: s?.name ?? "",
            proficiency: Number(s?.proficiency ?? 0),
        })),
        internships: (initialProfile?.internships ?? []).map((i: any) => ({
            company: i?.company ?? "",
            year: i?.year ?? new Date().getFullYear(),
            role: i?.role ?? "",
            about: i?.about ?? "",
        })),
    });

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const previewUrl = URL.createObjectURL(file);
            setImage(previewUrl);
            setImageFile(file);
        }
    };

    const handleAboutChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFieldChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index: number,
        type: "skills" | "internships",
        field: string
    ) => {
        const { value } = e.target;
        const updated = [...formData[type]];

        // Handle numeric conversion for proficiency and year
        let processedValue: string | number = value;
        if (type === "skills" && field === "proficiency") {
            processedValue = parseInt(value) || 0;
        } else if (type === "internships" && field === "year") {
            processedValue = parseInt(value) || new Date().getFullYear();
        }

        updated[index] = { ...updated[index], [field]: processedValue };
        setFormData((prev) => ({ ...prev, [type]: updated }));
    };

    const addField = (type: "skills" | "internships") => {
        setFormData((prev) => ({
            ...prev,
            [type]:
                type === "skills"
                    ? [...prev.skills, { name: "", proficiency: 0 }]
                    : [...prev.internships, { company: "", year: new Date().getFullYear(), role: "", about: "" }],
        }));
    };

    const removeField = (type: "skills" | "internships", index: number) => {
        setFormData((prev) => ({
            ...prev,
            [type]: prev[type].filter((_, i) => i !== index),
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const normalizedSkills = formData.skills.map((skill) => ({
            name: skill.name,
            proficiency: Number(skill.proficiency),
        }));

        const normalizedInternships = formData.internships.map((internship) => ({
            about: internship.about,
            company: internship.company,
            year: Number(internship.year) || new Date().getFullYear(),
            role: internship.role,
        }));

        try {
            setIsSubmitting(true);
            const base = `${API_CONFIG.BASE_URL}${ENDPOINTS.PROFILES}`;
            const targetUrl = profileId ? `${base}${profileId}/` : `${base}`;

            if (imageFile) {
                const multipart = new FormData();
                multipart.append("about", formData.about);
                multipart.append("skills", JSON.stringify(normalizedSkills));
                multipart.append("internships", JSON.stringify(normalizedInternships));
                multipart.append("image", imageFile);

                await fetch(targetUrl, {
                    method: profileId ? "PUT" : "POST",
                    body: multipart,
                });
            } else {
                const jsonBody = {
                    about: formData.about,
                    skills: normalizedSkills,
                    internships: normalizedInternships,
                };

                await fetch(targetUrl, {
                    method: profileId ? "PUT" : "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(jsonBody),
                });
            }

            alert("Profile saved successfully");
            // No client refetch; page is SSG. Optionally update local state here.
        } catch (submitError) {
            const message = submitError instanceof Error ? submitError.message : "Failed to save profile";
            alert(message);
        } finally {
            setIsSubmitting(false);
        }
    };


    return (
        <div className="w-full min-h-screen bg-[rgb(225,232,236)] flex flex-col overflow-x-hidden">
            <Navbar />
            <TopNavbar />

            <div className="flex-1 flex justify-center items-start py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
                <form
                    onSubmit={handleSubmit}
                    className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl bg-[#F6FBFF] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-xl shadow-sm space-y-6 sm:space-y-8 md:space-y-10"
                >
                    {isSubmitting && (
                        <div className="w-full p-3 rounded-md bg-blue-50 text-blue-700 text-sm">Saving profile...</div>
                    )}
                    {/* Profile Image */}
                    <ProfileImageUpload
                        image={image}
                        onImageChange={handleImageChange}
                    />

                    {/* About */}
                    <AboutSection
                        value={formData.about}
                        onChange={handleAboutChange}
                    />

                    {/* Skills */}
                    <SkillsSection
                        skills={formData.skills}
                        onChange={handleFieldChange}
                        onAdd={addField}
                        onRemove={removeField}
                    />

                    {/* Internships */}
                    <InternshipsSection
                        internships={formData.internships}
                        onChange={handleFieldChange}
                        onAdd={addField}
                        onRemove={removeField}
                    />

                    {/* Save Button */}
                    <ThemedButton
                        title="Save Profile"
                        type="submit"
                        variant="primary"
                        className="themed-button-primary w-full  flex justify-center  p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center rounded-lg font-intermedium disabled:opacity-60"
                        disabled={isSubmitting}
                    />
                </form>
            </div>

            {/* Theme Styles */}
            <ThemeStyles />
        </div>
    );
}

export const getStaticProps: GetStaticProps<PageProps> = async () => {
    try {
        const res = await fetch(`${API_CONFIG.BASE_URL}${ENDPOINTS.PROFILES}`);
        const data = await res.json();
        const initialProfile = Array.isArray(data) ? (data[0] ?? null) : data ?? null;
        return {
            props: { initialProfile },
            revalidate: undefined, // no ISR; build-time only
        } as const;
    } catch {
        return {
            props: { initialProfile: null },
            revalidate: undefined,
        } as const;
    }
};