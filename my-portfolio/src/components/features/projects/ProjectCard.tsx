import React from "react";
import Link from "next/link";
import { ExternalLink, Github, Eye } from "lucide-react";

interface ProjectCardProps {
    project: {
        id: number;
        name: string;
        description: string;
        cover_image: string | null;
        github_link: string;
        live_link: string;
        tools: Array<{ name: string }>;
        values: Array<{ name: string }>;
    };
}

export default function ProjectCard({ project }: ProjectCardProps) {
    return (
        <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
            {/* Project Image */}
            <div className="relative h-48 bg-gray-200 overflow-hidden">
                {project.cover_image ? (
                    <img
                        src={project.cover_image}
                        alt={project.name}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-100 to-purple-100">
                        <span className="text-gray-500 text-lg font-medium">No Image</span>
                    </div>
                )}
                <div className="absolute inset-0 bg-black/20 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <Link
                        href={`/project/${project.id}`}
                        className="bg-white/90 text-gray-800 px-4 py-2 rounded-lg font-medium hover:bg-white transition-colors flex items-center gap-2"
                    >
                        <Eye size={16} />
                        View Details
                    </Link>
                </div>
            </div>

            {/* Project Content */}
            <div className="p-6">
                <h3 className="text-xl font-intermedium font-semibold text-gray-800 mb-3">
                    {project.name}
                </h3>

                <p className="text-gray-600 mb-4 line-clamp-3">
                    {project.description}
                </p>

                {/* Tools and Values */}
                <div className="mb-4">
                    <div className="flex flex-wrap gap-1 mb-2">
                        <span className="text-xs font-medium text-gray-500">Tools:</span>
                        {project.tools.slice(0, 3).map((tool, idx) => (
                            <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                                {tool.name}
                            </span>
                        ))}
                        {project.tools.length > 3 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{project.tools.length - 3} more
                            </span>
                        )}
                    </div>
                    <div className="flex flex-wrap gap-1">
                        <span className="text-xs font-medium text-gray-500">Values:</span>
                        {project.values.slice(0, 2).map((value, idx) => (
                            <span key={idx} className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                                {value.name}
                            </span>
                        ))}
                        {project.values.length > 2 && (
                            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                                +{project.values.length - 2} more
                            </span>
                        )}
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                    <Link
                        href={project.github_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition-colors"
                    >
                        <Github size={16} />
                        GitHub
                    </Link>
                    <Link
                        href={project.live_link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    >
                        <ExternalLink size={16} />
                        Live Demo
                    </Link>
                </div>
            </div>
        </div>
    );
}
