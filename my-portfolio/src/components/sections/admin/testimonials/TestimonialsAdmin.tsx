import React, { use, useState, useEffect } from "react";
import TestimonialList from "./TestimonialList";
import TestimonialForm from "./TestimonialForm";
import TestimonialView from "./TestimonialView";
import { Testimonial, TestimonialViewMode } from "./types";
import { ApiService } from "@/api/ApiService";
import { ApiError } from "next/dist/server/api-utils";
import { API_CONFIG, ENDPOINTS } from "@/lib/config";
import { useApiCRUD } from "@/hooks/useFetch";
useApiCRUD

const userService = new ApiService<Testimonial>(`${API_CONFIG.BASE_URL}${ENDPOINTS.TESTIMONIALS}`)
export default function TestimonialsAdmin() {
    const { items, loading, error, fetchAll, createItem, updateItem, patchItem, deleteItem } = useApiCRUD(userService);
    const [viewMode, setViewMode] = useState<TestimonialViewMode>('list');
    const [currentTestimonial, setCurrentTestimonial] = useState<Testimonial | null>(null);


    useEffect(() => {
        fetchAll();
        console.log("Testimonials fetched:", items);

    }, []);

    useEffect(() => {
        if (items.length > 0) {
            setCurrentTestimonial(items[0]); // Set the first testimonial as current if available
        }
    }, [items]);

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
