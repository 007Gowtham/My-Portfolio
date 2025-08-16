// AdminProfileForm.tsx

import React, { useState, ChangeEvent, useEffect } from "react";
import { Navbar, TopNavbar } from "@/components/sections/navigation";
import { API_CONFIG, ENDPOINTS } from "@/lib/config";
import "@/app/globals.css";
import ProfileImageUpload from "@/components/sections/admin/profile/ProfileImageUpload";
import AboutSection from "@/components/sections/admin/profile/AboutSection";
import SkillsSection from "@/components/sections/admin/profile/SkillsSection";
import InternshipsSection from "@/components/sections/admin/profile/InternshipsSection";
import ThemeStyles from "@/components/sections/admin/profile/ThemeStyles";
import { ThemedButton } from "@/components";
import { ApiService } from "@/api/ApiService";
import { useApiCRUD } from "@/hooks/useFetch";
import { format } from "path";
import { AwardIcon } from "lucide-react";

interface Skill {
    id?: number;
    name: string;
    proficiency: number;
}

interface Internship {
    id?: number;
    company: string;
    year: string | number;
    role: string;
    about: string;
}

interface FormData {
    id?: number;
    about: string;
    imageUrl?: string; // preview only
    image?: string | null; // existing image path from API
    skills: Skill[];
    internships: Internship[];
}
const userService = new ApiService<FormData>(`${API_CONFIG.BASE_URL}${ENDPOINTS.PROFILES}`);

export default function AdminProfileForm() {
    const [formData, setFormData] = useState<FormData>({
        about: "",
        imageUrl: "",
        skills: [{ name: "", proficiency: 0 }],
        internships: [],
    });

    const [imageFile, setImageFile] = useState<File | null>(null);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await userService.getAll();
                setFormData(data[0]);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);



    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setImageFile(file);
            setFormData((prev) => ({
                ...prev,
                imageUrl: URL.createObjectURL(file),
            }));
            console.log("Image changed:", file);
        }
    }

    const handleFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, index: number, type: "skills" | "internships", field: string) => {
        const { value } = e.target;
        const updated = [...formData[type]];
        let processedValue: string | number = value;
        if (type === "skills" && field === "proficiency") {
            processedValue = parseInt(value) || 0;
        }
        else if (type === "internships" && field === "year") {
            processedValue = parseInt(value) || new Date().getFullYear();
        }
        updated[index] = { ...updated[index], [field]: processedValue };
        setFormData((prev) => ({ ...prev, [type]: updated }));
    };
    const addField = (type: "skills" | "internships") => {
        const newField = type === "skills" ? { name: "", proficiency: 0 } : { company: "", year: "", role: "", about: "" };
        setFormData((prev) => ({ ...prev, [type]: [...prev[type], newField] }));
    };
    const removeField = (type: "skills" | "internships", index: number) => {
        setFormData((prev) => ({ ...prev, [type]: prev[type].filter((_, i) => i !== index) }));
    };
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();


        try {
            console.log("Submitting form data:", formData);
            if (imageFile !== null) {
                const formDataToSubmit = new FormData();
                formDataToSubmit.append("image", imageFile);
                const data = await userService.patch(7, formDataToSubmit)
                console.log("Image uploaded successfully");
                setFormData(data);
            }

            const updatedData: Partial<FormData> = {
                about: formData.about,
                skills: formData.skills.map((s) => ({ name: s.name, proficiency: s.proficiency })),
                internships: formData.internships.map((i) => ({ company: i.company, year: i.year, role: i.role, about: i.about })),
            };
            if (formData.id) {
                const data = await userService.patch(7, updatedData);
                console.log("updated successfully ");
                setFormData(data);
            }
        }

        catch (error) {
            console.error("Form submission error:", error);
            // Handle error (show message to user)
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



                    {/* Profile Image */}
                    <ProfileImageUpload
                        image={formData.imageUrl || formData.image || null}
                        onImageChange={handleImageChange}
                        onClick={() => document.getElementById("fileInput")?.click()}
                    />

                    {/* About */}
                    <AboutSection
                        value={formData.about}
                        onChange={(e) => setFormData({ ...formData, about: e.target.value })}
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
                        className="themed-button-primary w-full flex justify-center p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center rounded-lg font-intermedium disabled:opacity-60"

                    />
                </form>
            </div>

            {/* Theme Styles */}
            <ThemeStyles />
        </div>
    );
}
