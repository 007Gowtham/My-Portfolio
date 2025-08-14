import React, { useState } from "react";
import TestimonialList from "./TestimonialList";
import TestimonialForm from "./TestimonialForm";
import TestimonialView from "./TestimonialView";
import { Testimonial, TestimonialViewMode } from "./types";

export default function TestimonialsAdmin() {
    const [viewMode, setViewMode] = useState<TestimonialViewMode>('list');
    const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);

    const handleCreateNew = () => {
        setCurrentTestimonial(null);
        setViewMode('create');
    };

    const handleEdit = (testimonial: Testimonial) => {
        setCurrentTestimonial(testimonial);
        setViewMode('edit');
    };

    const handleView = (testimonial: Testimonial) => {
        setCurrentTestimonial(testimonial);
        setViewMode('view');
    };

    const handleDelete = (testimonialId: number) => {
        // The delete operation is handled in TestimonialList component
        // This function can be used for additional cleanup if needed
        console.log(`Testimonial ${testimonialId} deleted`);
    };

    const handleSave = (testimonial: Testimonial) => {
        // Handle successful save/update
        console.log('Testimonial saved:', testimonial);
        setViewMode('list');
        setCurrentTestimonial(null);
    };

    const handleCancel = () => {
        setViewMode('list');
        setCurrentTestimonial(null);
    };

    const handleBackToList = () => {
        setViewMode('list');
        setCurrentTestimonial(null);
    };

    const renderContent = () => {
        switch (viewMode) {
            case 'list':
                return (
                    <TestimonialList
                        onEdit={handleEdit}
                        onView={handleView}
                        onDelete={handleDelete}
                        onCreateNew={handleCreateNew}
                    />
                );
            case 'create':
                return (
                    <TestimonialForm
                        mode="create"
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                );
            case 'edit':
                return (
                    <TestimonialForm
                        testimonial={currentTestimonial}
                        mode="edit"
                        onSave={handleSave}
                        onCancel={handleCancel}
                    />
                );
            case 'view':
                return (
                    <TestimonialView
                        testimonial={currentTestimonial!}
                        onBack={handleBackToList}
                        onEdit={() => handleEdit(currentTestimonial!)}
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
