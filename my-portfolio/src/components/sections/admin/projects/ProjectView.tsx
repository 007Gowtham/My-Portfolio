import React from "react";
import { ArrowLeft, ExternalLink, Eye, EyeOff, Calendar, Github, Globe } from "lucide-react";

import { Project } from "./types";
import ThemeStyles from "../profile/ThemeStyles";

interface ProjectViewProps {
    project: Project;
    onBack: () => void;
    onEdit: () => void;
}

export default function ProjectView({ project, onBack, onEdit }: ProjectViewProps) {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    return (
        <div className="w-full min-h-screen bg-[rgb(225,232,236)] flex flex-col overflow-x-hidden">
            <div className="flex-1 flex justify-center items-start py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl bg-[#F6FBFF] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-xl shadow-sm space-y-6 sm:space-y-8 md:space-y-10">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-6">
                        <button
                            onClick={onBack}
                            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors"
                        >
                            <ArrowLeft size={20} />
                            Back to Projects
                        </button>
                        <button
                            onClick={onEdit}
                            className="themed-button px-4 py-2 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium"
                        >
                            Edit Project
                        </button>
                    </div>

                    {/* Project Title and Status */}
                    <div className="text-center space-y-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-intermedium text-gray-800">
                            {project.name}
                        </h1>
                        <div className="flex justify-center items-center gap-2">
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${project.site_view
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-gray-100 text-gray-800'
                                }`}>
                                {project.site_view ? <Eye size={16} className="inline mr-1" /> : <EyeOff size={16} className="inline mr-1" />}
                                {project.site_view ? 'Visible on Website' : 'Hidden from Website'}
                            </span>
                        </div>
                    </div>

                    {/* Cover Image */}
                    {project.cover_image && (
                        <div className="w-full h-64 sm:h-80 md:h-96 rounded-lg overflow-hidden bg-gray-200">
                            <img
                                src={project.cover_image}
                                alt={project.name}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    )}

                    {/* Project Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <h3 className="text-lg font-intermedium text-gray-700">Short Description</h3>
                                <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    {project.description}
                                </p>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-intermedium text-gray-700">Timeline</h3>
                                <div className="flex items-center gap-2 text-gray-600 bg-gray-50 p-3 rounded-lg">
                                    <Calendar size={16} />
                                    {project.timeline}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <h3 className="text-lg font-intermedium text-gray-700">Links</h3>
                                <div className="space-y-2">
                                    {project.github_link && (
                                        <a
                                            href={project.github_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-blue-600 hover:text-blue-800 bg-blue-50 p-3 rounded-lg hover:bg-blue-100 transition-colors"
                                        >
                                            <Github size={16} />
                                            View on GitHub
                                        </a>
                                    )}
                                    {project.live_link && (
                                        <a
                                            href={project.live_link}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-green-600 hover:text-green-800 bg-green-50 p-3 rounded-lg hover:bg-green-100 transition-colors"
                                        >
                                            <Globe size={16} />
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Additional Images */}
                        <div className="space-y-4">
                            {project.image1 && (
                                <div className="space-y-2">
                                    <h3 className="text-lg font-intermedium text-gray-700">Project Image 1</h3>
                                    <div className="w-full h-32 sm:h-40 rounded-lg overflow-hidden bg-gray-200">
                                        <img
                                            src={project.image1}
                                            alt="Project Image 1"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                            {project.image2 && (
                                <div className="space-y-2">
                                    <h3 className="text-lg font-intermedium text-gray-700">Project Image 2</h3>
                                    <div className="w-full h-32 sm:h-40 rounded-lg overflow-hidden bg-gray-200">
                                        <img
                                            src={project.image2}
                                            alt="Project Image 2"
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Detailed Description */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-intermedium text-gray-700">Detailed Description</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600 leading-relaxed">
                                {project.main_description}
                            </p>
                        </div>
                    </div>

                    {/* Conclusion */}
                    <div className="space-y-4">
                        <h3 className="text-xl font-intermedium text-gray-700">Conclusion & Learnings</h3>
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-600 leading-relaxed">
                                {project.conclusion}
                            </p>
                        </div>
                    </div>

                    {/* Services, Tools, and Values */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Services */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-intermedium text-gray-700">Services Provided</h3>
                            <div className="space-y-2">
                                {project.services.map((service) => (
                                    <div key={service.id} className="bg-blue-50 text-blue-700 px-3 py-2 rounded-lg text-sm">
                                        {service.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Tools */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-intermedium text-gray-700">Tools & Technologies</h3>
                            <div className="space-y-2">
                                {project.tools.map((tool) => (
                                    <div key={tool.id} className="bg-green-50 text-green-700 px-3 py-2 rounded-lg text-sm">
                                        {tool.name}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Values */}
                        <div className="space-y-3">
                            <h3 className="text-lg font-intermedium text-gray-700">Core Values</h3>
                            <div className="space-y-2">
                                {project.values.map((value) => (
                                    <div key={value.id} className="bg-purple-50 text-purple-700 px-3 py-2 rounded-lg text-sm">
                                        {value.name}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Metadata */}
                    <div className="border-t pt-6 space-y-2 text-sm text-gray-500">
                        <div className="flex justify-between">
                            <span>Created:</span>
                            <span>{formatDate(project.created_at)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Last Updated:</span>
                            <span>{formatDate(project.updated_at)}</span>
                        </div>
                    </div>
                </div>
            </div>
            <ThemeStyles />
        </div>
    );
}
