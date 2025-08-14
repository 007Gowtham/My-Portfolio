import React, { useState } from "react";
import CodingPlatformList from "./CodingPlatformList";
import CodingPlatformForm from "./CodingPlatformForm";
import CodingPlatformView from "./CodingPlatformView";
import { CodingPlatform, CodingPlatformViewMode } from "./types";

export default function CodingPlatformsAdmin() {
    const [viewMode, setViewMode] = useState<CodingPlatformViewMode>('list');
    const [currentPlatform, setCurrentPlatform] = useState<CodingPlatform | null>(null);

    const handleCreateNew = () => {
        setCurrentPlatform(null);
        setViewMode('create');
    };

    const handleEdit = (platform: CodingPlatform) => {
        setCurrentPlatform(platform);
        setViewMode('edit');
    };

    const handleView = (platform: CodingPlatform) => {
        setCurrentPlatform(platform);
        setViewMode('view');
    };

    const handleDelete = (platformId: number) => {
        // The delete operation is handled in CodingPlatformList component
        // This function can be used for additional cleanup if needed
        console.log(`Coding platform ${platformId} deleted`);
    };

    const handleSave = (platform: CodingPlatform) => {
        // Handle successful save/update
        console.log('Coding platform saved:', platform);
        setViewMode('list');
        setCurrentPlatform(null);
    };

    const handleCancel = () => {
        setViewMode('list');
        setCurrentPlatform(null);
    };

    const handleBackToList = () => {
        setViewMode('list');
        setCurrentPlatform(null);
    };

    const renderContent = () => {
        switch (viewMode) {
            case 'list':
                return (
                    <CodingPlatformList
                        onEdit={handleEdit}
                        onView={handleView}
                        onDelete={handleDelete}
                        onCreateNew={handleCreateNew}
                    />
                );
            case 'create':
                return (
                    <CodingPlatformForm
                        mode="create"
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                );
            case 'edit':
                return (
                    <CodingPlatformForm
                        platform={currentPlatform}
                        mode="edit"
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                );
            case 'view':
                return (
                    <CodingPlatformView
                        platform={currentPlatform!}
                        onBack={handleBackToList}
                        onEdit={() => handleEdit(currentPlatform!)}
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
