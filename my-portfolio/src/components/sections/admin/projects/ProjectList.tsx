import React, { useState, useEffect } from "react";
import { Edit, Trash2, Eye, Plus, Search } from "lucide-react";
import { API_CONFIG, ENDPOINTS } from "@/lib/config";
import { Project } from "./types";
import ThemeStyles from "../profile/ThemeStyles";
import { ThemedButton } from "@/components/common/buttons";
import { ApiService } from "@/api/ApiService";
import { useApiCRUD } from "@/hooks/useFetch";
ApiService
useApiCRUD
API_CONFIG


interface ProjectListProps {
    onEdit: (project: Project) => void;
    onView: (project: Project) => void;
    onDelete: (projectId: number) => void;
    onCreateNew: () => void;
}

const useService = new ApiService(`${API_CONFIG.BASE_URL}${ENDPOINTS.PROJECTS}`);


export default function ProjectList({ onEdit, onView, onDelete, onCreateNew }: ProjectListProps) {
    const [projects, setProjects] = useState<Project[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [filterSiteView, setFilterSiteView] = useState<boolean | null>(null);
    const { items: project, error, loading, fetchAll } = useApiCRUD(useService);

    useEffect(() => {
        fetchAll();
        console.log("Projects fetched:", project);
    }, []);

    useEffect(() => {
        if (project) {
            setProjects(project as Project[]);
        }
    }, [project]);

    const handleDelete = async (projectId: number) => {
        if (window.confirm('Are you sure you want to delete this project?')) {
            try {
                await useService.delete(projectId);
                // Refresh the project list after deletion
            } catch (error) {
                console.error('Error deleting project:', error);
            }
        }
    };

    const filteredProjects = projects.filter(project => {
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.description.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesFilter = filterSiteView === null || project.site_view === filterSiteView;
        return matchesSearch && matchesFilter;
    });

    if (loading) {
        return (
            <div className="w-full min-h-screen bg-[rgb(225,232,236)] flex flex-col overflow-x-hidden">
                <div className="flex-1 flex justify-center items-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                </div>
            </div>
        );
    }

    return (
        <div className="w-full min-h-screen bg-[rgb(225,232,236)] flex flex-col overflow-x-hidden">
            <div className="flex-1 flex justify-center items-start py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl bg-[#F6FBFF] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-xl shadow-sm space-y-6 sm:space-y-8 md:space-y-10">
                    {/* Header */}
                    <div className="text-center mb-6">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-intermedium text-gray-800">Projects Management</h1>
                        <p className="text-gray-600 mt-2">Manage your portfolio projects</p>
                    </div>

                    {/* Add New Project Button */}
                    <div className="flex justify-center">
                        <ThemedButton
                            title="Create New Project"
                            type="button"
                            variant="primary"
                            icon={<Plus size={16} />}
                            onClick={onCreateNew}
                            className="themed-button-primary px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg font-intermedium"
                        />
                    </div>

                    {/* Filters */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search projects..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
                            />
                        </div>
                        <select
                            value={filterSiteView === null ? "all" : filterSiteView.toString()}
                            onChange={(e) => setFilterSiteView(e.target.value === "all" ? null : e.target.value === "true")}
                            className="px-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
                        >
                            <option value="all">All Projects</option>
                            <option value="true">Visible on Site</option>
                            <option value="false">Hidden from Site</option>
                        </select>
                    </div>

                    {/* Projects Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredProjects.map((project) => (
                            <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                {/* Project Image */}
                                <div className="h-48 bg-gray-100 relative">
                                    {project.cover_image ? (
                                        <img
                                            src={project.cover_image}
                                            alt={project.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <span>No Image</span>
                                        </div>
                                    )}
                                    <div className="absolute top-2 right-2">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${project.site_view
                                            ? 'bg-green-100 text-green-800'
                                            : 'bg-gray-100 text-gray-800'
                                            }`}>
                                            {project.site_view ? 'Visible' : 'Hidden'}
                                        </span>
                                    </div>
                                </div>

                                {/* Project Info */}
                                <div className="p-4">
                                    <h3 className="font-intermedium text-lg text-gray-800 mb-2 line-clamp-2">
                                        {project.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                                        {project.description}
                                    </p>
                                    <p className="text-gray-500 text-xs mb-4">
                                        {project.timeline}
                                    </p>

                                    {/* Skills/Tools Section */}
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
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onView(project)}
                                            className="themed-button flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium text-sm"
                                        >
                                            <Eye size={16} />
                                            View
                                        </button>
                                        <button
                                            onClick={() => onEdit(project)}
                                            className="themed-button flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium text-sm"
                                        >
                                            <Edit size={16} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => project.id && handleDelete(project.id)}
                                            className="themed-button-danger flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-intermedium text-sm"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredProjects.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No projects found</p>
                            <p className="text-gray-400 mt-2">Create your first project to get started</p>
                        </div>
                    )}
                </div>
            </div>
            <ThemeStyles />
            <style jsx>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}
