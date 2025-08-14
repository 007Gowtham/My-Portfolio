import React, { useState, ChangeEvent, useEffect } from "react";
import { Upload, Plus, Trash2, Eye, EyeOff, ExternalLink, Save, X } from "lucide-react";
import { API_CONFIG, ENDPOINTS } from "@/lib/config";

import { Project } from "./types";
import ThemeStyles from "../profile/ThemeStyles";
import { ThemedButton } from "@/components/common/buttons";

interface ProjectFormProps {
    project?: Project | null;
    onSave: (project: Project) => void;
    onCancel: () => void;
    mode: 'create' | 'edit';
}

export default function ProjectForm({ project, onSave, onCancel, mode }: ProjectFormProps) {
    const [formData, setFormData] = useState<Project>({
        name: "",
        description: "",
        site_view: true,
        github_link: "",
        live_link: "",
        timeline: "",
        main_description: "",
        conclusion: "",
        cover_image: null,
        image1: null,
        image2: null,
        services: [{ name: "" }],
        tools: [{ name: "" }],
        values: [{ name: "" }]
    });

    const [coverImageFile, setCoverImageFile] = useState<string | null>(null);
    const [image1File, setImage1File] = useState<string | null>(null);
    const [image2File, setImage2File] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (project && mode === 'edit') {
            setFormData(project);
            setCoverImageFile(project.cover_image);
            setImage1File(project.image1);
            setImage2File(project.image2);
        }
    }, [project, mode]);

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>, imageType: 'cover_image' | 'image1' | 'image2') => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const previewUrl = URL.createObjectURL(file);

            if (imageType === 'cover_image') {
                setCoverImageFile(previewUrl);
            } else if (imageType === 'image1') {
                setImage1File(previewUrl);
            } else if (imageType === 'image2') {
                setImage2File(previewUrl);
            }

            setFormData(prev => ({ ...prev, [imageType]: previewUrl }));
        }
    };

    const handleChange = (
        e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        index?: number,
        type?: "services" | "tools" | "values",
        field?: string
    ) => {
        const { name, value, type: inputType } = e.target;

        if (type && field !== undefined && index !== undefined) {
            const updated = [...formData[type]];
            updated[index] = { ...updated[index], [field]: value };
            setFormData((prev) => ({ ...prev, [type]: updated }));
        } else if (inputType === 'checkbox') {
            const target = e.target as HTMLInputElement;
            setFormData((prev) => ({ ...prev, [name]: target.checked }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const addField = (type: "services" | "tools" | "values") => {
        setFormData((prev) => ({
            ...prev,
            [type]: [...prev[type], { name: "" }]
        }));
    };

    const removeField = (type: "services" | "tools" | "values", index: number) => {
        if (formData[type].length > 1) {
            setFormData((prev) => ({
                ...prev,
                [type]: prev[type].filter((_, i) => i !== index),
            }));
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const submitData = {
                ...formData,
                cover_image: coverImageFile,
                image1: image1File,
                image2: image2File
            };

            const url = mode === 'edit'
                ? `${API_CONFIG.BASE_URL}${ENDPOINTS.PROJECTS}${project?.id}/`
                : `${API_CONFIG.BASE_URL}${ENDPOINTS.PROJECTS}`;

            const method = mode === 'edit' ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(submitData),
            });

            if (response.ok) {
                const savedProject = await response.json();
                onSave(savedProject);
            } else {
                console.error('Failed to save project');
            }
        } catch (error) {
            console.error('Error saving project:', error);
        } finally {
            setLoading(false);
        }
    };

    const ImageUploadSection = ({
        title,
        imageType,
        currentImage,
        inputId
    }: {
        title: string;
        imageType: 'cover_image' | 'image1' | 'image2';
        currentImage: string | null;
        inputId: string;
    }) => (
        <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm sm:text-base md:text-lg font-intermedium text-gray-700">
                {title}
            </label>
            <div className="flex flex-col items-center space-y-3">
                {currentImage && (
                    <div className="w-full max-w-xs h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden bg-gray-200 border">
                        <img
                            src={currentImage}
                            alt={title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    id={inputId}
                    className="hidden"
                    onChange={(e) => handleImageChange(e, imageType)}
                />
                <ThemedButton
                    type="button"
                    onClick={() => document.getElementById(inputId)?.click()}
                    variant="primary"
                    title={`Upload ${title}`}
                    icon={<Upload size={16} />}
                    className="p-2 sm:p-2.5 md:p-3 lg:px-5 lg:py-2  text-white rounded-lg font-intermedium disabled:opacity-50 disabled:cursor-not-allowed"
                />
            </div>
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-[rgb(225,232,236)] flex flex-col overflow-x-hidden">
            <div className="flex-1 flex justify-center items-start py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl bg-[#F6FBFF] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-xl shadow-sm space-y-6 sm:space-y-8 md:space-y-10">
                    <div className="text-center mb-6">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-intermedium text-gray-800">
                            {mode === 'edit' ? 'Edit Project' : 'Add New Project'}
                        </h1>
                    </div>

                    {/* Project Name */}
                    <div className="space-y-2 sm:space-y-3">
                        <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                            Project Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter project name..."
                            className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                        />
                    </div>

                    {/* Description */}
                    <div className="space-y-2 sm:space-y-3">
                        <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                            Short Description
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={3}
                            placeholder="Brief description of the project..."
                            className="w-full md:rows-4 lg:rows-5 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors resize-none"
                        />
                    </div>

                    {/* Site View Toggle */}
                    <div className="flex items-center space-x-3">
                        <input
                            type="checkbox"
                            name="site_view"
                            checked={formData.site_view}
                            onChange={handleChange}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 focus:ring-2"
                        />
                        <label className="flex items-center gap-2 text-sm sm:text-base md:text-lg font-intermedium text-gray-700">
                            {formData.site_view ? <Eye size={20} /> : <EyeOff size={20} />}
                            Show on website
                        </label>
                    </div>

                    {/* Links Section */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                        <div className="space-y-2 sm:space-y-3">
                            <label className="block text-sm sm:text-base md:text-lg font-intermedium text-gray-700">
                                GitHub Link
                            </label>
                            <div className="relative">
                                <input
                                    type="url"
                                    name="github_link"
                                    value={formData.github_link}
                                    onChange={handleChange}
                                    placeholder="https://github.com/username/project"
                                    className="w-full pl-10 pr-3 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                                />
                                <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            <label className="block text-sm sm:text-base md:text-lg font-intermedium text-gray-700">
                                Live Link
                            </label>
                            <div className="relative">
                                <input
                                    type="url"
                                    name="live_link"
                                    value={formData.live_link}
                                    onChange={handleChange}
                                    placeholder="https://yourproject.com"
                                    className="w-full pl-10 pr-3 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                                />
                                <ExternalLink className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Timeline */}
                    <div className="space-y-2 sm:space-y-3">
                        <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                            Timeline
                        </label>
                        <input
                            type="text"
                            name="timeline"
                            value={formData.timeline}
                            onChange={handleChange}
                            placeholder="e.g., 3 months (Jan 2024 - Mar 2024)"
                            className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                        />
                    </div>

                    {/* Main Description */}
                    <div className="space-y-2 sm:space-y-3">
                        <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                            Detailed Description
                        </label>
                        <textarea
                            name="main_description"
                            value={formData.main_description}
                            onChange={handleChange}
                            rows={6}
                            placeholder="Detailed description of the project, technologies used, challenges faced..."
                            className="w-full md:rows-7 lg:rows-8 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors resize-none"
                        />
                    </div>

                    {/* Conclusion */}
                    <div className="space-y-2 sm:space-y-3">
                        <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                            Conclusion & Learnings
                        </label>
                        <textarea
                            name="conclusion"
                            value={formData.conclusion}
                            onChange={handleChange}
                            rows={4}
                            placeholder="Project outcomes, key learnings, and achievements..."
                            className="w-full md:rows-5 lg:rows-6 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors resize-none"
                        />
                    </div>

                    {/* Images Section */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
                        <ImageUploadSection
                            title="Cover Image"
                            imageType="cover_image"
                            currentImage={coverImageFile}
                            inputId="coverImageInput"
                        />
                        <ImageUploadSection
                            title="Project Image 1"
                            imageType="image1"
                            currentImage={image1File}
                            inputId="image1Input"
                        />
                        <ImageUploadSection
                            title="Project Image 2"
                            imageType="image2"
                            currentImage={image2File}
                            inputId="image2Input"
                        />
                    </div>

                    {/* Services */}
                    <div className="space-y-3 sm:space-y-4 md:space-y-5">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                            <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                                Services Provided
                            </label>
                            <ThemedButton
                                type="button"
                                onClick={() => addField("services")}
                                variant="primary"
                                title="Add Service"
                                icon={<Plus size={14} className="sm:w-4 sm:h-4md:w-5 md:h-5" />}
                                className="themed-button-primary flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3  text-white rounded-lg font-intermedium text-xs sm:text-sm md:text-base"
                            />

                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            {formData.services.map((service, idx) => (
                                <div key={idx} className="flex gap-2 sm:gap-3">
                                    <input
                                        type="text"
                                        placeholder="Service name"
                                        value={service.name}
                                        onChange={(e) => handleChange(e, idx, "services", "name")}
                                        className="flex-1 p-3 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                                    />
                                    <ThemedButton
                                        type="button"
                                        onClick={() => removeField("values", idx)}
                                        disabled={formData.values.length === 1}
                                        variant="danger"
                                        icon={<Trash2 size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />}
                                        className="p-2 sm:p-2.5 md:p-3 lg:px-5 lg:py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-intermedium disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Tools */}
                    <div className="space-y-3 sm:space-y-4 md:space-y-5">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                            <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                                Tools & Technologies
                            </label>
                            <ThemedButton
                                type="button"
                                onClick={() => addField("tools")}
                                variant="primary"
                                title="Add Tool"
                                icon={<Plus size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />}
                                className="themed-button-primary flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3  text-white rounded-lg font-intermedium text-xs sm:text-sm md:text-base"
                            />
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            {formData.tools.map((tool, idx) => (
                                <div key={idx} className="flex gap-2 sm:gap-3">
                                    <input
                                        type="text"
                                        placeholder="Tool/Technology name"
                                        value={tool.name}
                                        onChange={(e) => handleChange(e, idx, "tools", "name")}
                                        className="flex-1 p-3 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                                    />
                                    <ThemedButton
                                        type="button"
                                        onClick={() => removeField("values", idx)}
                                        disabled={formData.values.length === 1}
                                        variant="danger"
                                        icon={<Trash2 size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />}
                                        className="p-2 sm:p-2.5 md:p-3 lg:px-5 lg:py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-intermedium disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Values */}
                    <div className="space-y-3 sm:space-y-4 md:space-y-5">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-0">
                            <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                                Core Values & Principles
                            </label>
                            <ThemedButton
                                type="button"
                                onClick={() => addField("values")}
                                variant="primary"
                                title="Add Value"
                                icon={<Plus size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />}
                                className="themed-button-primary flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3  text-white rounded-lg font-intermedium text-xs sm:text-sm md:text-base"
                            />
                        </div>

                        <div className="space-y-2 sm:space-y-3">
                            {formData.values.map((value, idx) => (
                                <div key={idx} className="flex gap-2 sm:gap-3">
                                    <input
                                        type="text"
                                        placeholder="Core value or principle"
                                        value={value.name}
                                        onChange={(e) => handleChange(e, idx, "values", "name")}
                                        className="flex-1 p-3 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                                    />
                                    <ThemedButton
                                        type="button"
                                        onClick={() => removeField("values", idx)}
                                        disabled={formData.values.length === 1}
                                        variant="danger"
                                        icon={<Trash2 size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />}
                                        className="p-2 sm:p-2.5 md:p-3 lg:px-5 lg:py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-intermedium disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-center pt-4 sm:pt-6 md:pt-8">
                        <ThemedButton
                            title={mode === 'edit' ? 'Update Project' : 'Create Project'}
                            type="button"
                            onClick={handleSubmit}
                            variant="primary"
                            className="themed-button-primary  flex justify-center bg-gradient-to
                            -r from-blue-500 to-blue-600 text-white text-center rounded-lg font-intermedium"
                            disabled={loading}
                            icon={loading ? <Save className="animate-spin" size={16} /> : <Save size={16} />}
                        />


                    </div>
                </div>
            </div>
            <ThemeStyles />
        </div>
    );
}
