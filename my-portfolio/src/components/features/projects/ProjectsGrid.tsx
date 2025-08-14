import React from "react";
import ProjectCard from "./ProjectCard";

interface Project {
    id: number;
    name: string;
    description: string;
    cover_image: string | null;
    github_link: string;
    live_link: string;
    tools: Array<{ name: string }>;
    values: Array<{ name: string }>;
}

interface ProjectsGridProps {
    projects: Project[];
}

export default function ProjectsGrid({ projects }: ProjectsGridProps) {
    if (projects.length === 0) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No projects found</p>
                <p className="text-gray-400 mt-2">Check back later for new projects</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {projects.map((project) => (
                <ProjectCard key={project.id} project={project} />
            ))}
        </div>
    );
}
