import React, { useState } from "react";
import ProjectList from "./ProjectList";
import ProjectForm from "./ProjectForm";
import ProjectView from "./ProjectView";
import { Project, ViewMode } from "./types";

export default function ProjectsAdmin() {
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [currentProject, setCurrentProject] = useState<Project | null>(null);

    const handleCreateNew = () => {
        setCurrentProject(null);
        setViewMode('create');
    };

    const handleEdit = (project: Project) => {
        setCurrentProject(project);
        setViewMode('edit');
    };

    const handleView = (project: Project) => {
        setCurrentProject(project);
        setViewMode('view');
    };

    const handleDelete = (projectId: number) => {
        // The delete operation is handled in ProjectList component
        // This function can be used for additional cleanup if needed
        console.log(`Project ${projectId} deleted`);
    };

    const handleSave = (project: Project) => {
        // Handle successful save/update
        console.log('Project saved:', project);
        setViewMode('list');
        setCurrentProject(null);
    };

    const handleCancel = () => {
        setViewMode('list');
        setCurrentProject(null);
    };

    const handleBackToList = () => {
        setViewMode('list');
        setCurrentProject(null);
    };

    const renderContent = () => {
        switch (viewMode) {
            case 'list':
                return (
                    <ProjectList
                        onEdit={handleEdit}
                        onView={handleView}
                        onDelete={handleDelete}
                        onCreateNew={handleCreateNew}
                    />
                );
            case 'create':
                return (
                    <ProjectForm
                        mode="create"
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                );
            case 'edit':
                return (
                    <ProjectForm
                        project={currentProject}
                        mode="edit"
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                );
            case 'view':
                return (
                    <ProjectView
                        project={currentProject!}
                        onBack={handleBackToList}
                        onEdit={() => handleEdit(currentProject!)}
                    />
                );
            default:
                return null;
        }
    };

    return (
        <div className="w-full min-h-screen bg-[rgb(225,232,236)]">
            {renderContent()}
        </div>
    );
}
