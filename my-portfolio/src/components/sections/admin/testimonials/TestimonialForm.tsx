import React, { useState, ChangeEvent, useEffect } from "react";
import { Upload, Save, Linkedin } from "lucide-react";
import { API_CONFIG, ENDPOINTS } from "@/lib/config";
import { Testimonial } from "./types";
import ThemeStyles from "../profile/ThemeStyles";
import { ApiService } from "@/api/ApiService";
import { useApiCRUD } from "@/hooks/useFetch";

interface TestimonialFormProps {
    testimonial?: Testimonial | null;
    onSave: (testimonial: Testimonial) => void;
    onCancel: () => void;
    mode: 'create' | 'edit';
}

const userService = new ApiService<Testimonial>(`${API_CONFIG.BASE_URL}${ENDPOINTS.TESTIMONIALS}`);

export default function TestimonialForm({ testimonial, onSave, onCancel, mode }: TestimonialFormProps) {
    const [formData, setFormData] = useState<Testimonial>({
        name: "",
        linkedin_link: "",
        description: "",
        image: null
    });
    const { items, loading, error, fetchAll, createItem, updateItem, patchItem, deleteItem } = useApiCRUD(userService);

    const [imageFile, setImageFile] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);

    useEffect(() => {
        if (testimonial && mode === 'edit') {
            setFormData(testimonial);
            // Clear previous image states when switching testimonials
            setImageFile(null);

            if (testimonial.image instanceof File) {
                const previewUrl = URL.createObjectURL(testimonial.image);
                setImagePreview(previewUrl);
                setImageFile(testimonial.image);
                console.log("Image is a File object, setting preview URL");
            } else if (typeof testimonial.image === 'string' && testimonial.image) {
                setImagePreview(testimonial.image);
            } else {
                setImagePreview(null);
            }
        } else {
            // Reset form for create mode
            setFormData({
                name: "",
                linkedin_link: "",
                description: "",
                image: null
            });
            setImageFile(null);
            setImagePreview(null);
        }
    }, [testimonial, mode]); // Removed imageFile from dependencies

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const previewUrl = URL.createObjectURL(file);

            // Update all image-related states immediately
            setImageFile(file);
            setImagePreview(previewUrl); // This was missing!
            setFormData(prev => ({ ...prev, image: file }));

            console.log("Image changed, preview URL:", previewUrl);
        }
        // Remove fetchAll() from here - it's unnecessary and can cause issues
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        try {
            if (mode === 'create') {
                // Option 1: Try FormData approach first
                try {
                    const formDataToSend = new FormData();
                    formDataToSend.append('name', formData.name);
                    formDataToSend.append('linkedin_link', formData.linkedin_link);
                    formDataToSend.append('description', formData.description);

                    if (imageFile) {
                        formDataToSend.append('image', imageFile);
                    }

                    console.log('Creating testimonial with FormData...');
                    await userService.create(formDataToSend);

                } catch (formDataError) {
                    console.log('FormData approach failed, trying two-step approach...', formDataError);

                    // Option 2: Two-step approach - Create testimonial first, then upload image
                    const testimonialData: Omit<Testimonial, "id"> = {
                        name: formData.name,
                        linkedin_link: formData.linkedin_link,
                        description: formData.description,
                        image: null // Create without image first
                    };

                    // Create testimonial without image
                    const createdTestimonial = await createItem(testimonialData);

                    // Upload image if exists and we got the created testimonial ID
                    if (imageFile && createdTestimonial) {
                        const imageFormData = new FormData();
                        imageFormData.append('image', imageFile);

                        // You'll need to get the ID from the response
                        // This depends on how your createItem returns data
                        const testimonialId = createdTestimonial || items[items.length - 1]?.id;

                        if (testimonialId) {
                            console.log(`Uploading image for testimonial ID: ${testimonialId}`);
                            await userService.patch(testimonialId, imageFormData);
                        }
                    }
                }

            } else if (mode === 'edit') {
                // For EDIT mode: Update text fields first, then image separately
                const testimonialData: Partial<Testimonial> = {
                    name: formData.name,
                    linkedin_link: formData.linkedin_link,
                    description: formData.description,
                };

                // Update text fields
                await updateItem(testimonial?.id || 0, testimonialData);

                // Update image separately if changed
                if (imageFile && testimonial?.id) {
                    const imageFormData = new FormData();
                    imageFormData.append('image', imageFile);

                    console.log(`Updating testimonial image with ID: ${testimonial.id}`);
                    await userService.patch(testimonial.id, imageFormData);
                }
            }

            // Refresh the list after successful save
            await fetchAll();
            onSave(formData);

        } catch (error) {
            console.error('Error saving testimonial:', error);
            alert('Failed to save testimonial. Please try again.');
            return;
        }
    };

    // Clean up object URLs to prevent memory leaks
    useEffect(() => {
        return () => {
            if (imagePreview && imagePreview.startsWith('blob:')) {
                URL.revokeObjectURL(imagePreview);
            }
        };
    }, [imagePreview]);

    const ImageUploadSection = () => (
        <div className="space-y-2 sm:space-y-3">
            <label className="block text-sm sm:text-base md:text-lg font-intermedium text-gray-700">
                Profile Image
            </label>
            <div className="flex flex-col items-center space-y-3">
                {/* Show preview if we have an image (either new upload or existing) */}
                {(imagePreview || (formData.image && typeof formData.image === 'string')) && (
                    <div className="w-full max-w-xs h-32 sm:h-40 md:h-48 rounded-lg overflow-hidden bg-gray-200 border">
                        <img
                            src={imagePreview || (typeof formData.image === 'string' ? formData.image : "/about/profile.svg")}
                            alt="Profile Preview"
                            className="w-full h-full object-cover"
                            onError={() => {
                                console.log("Image failed to load, using fallback");
                                setImagePreview("/about/profile.svg");
                            }}
                        />
                    </div>
                )}
                <input
                    type="file"
                    accept="image/*"
                    id="profileImageInput"
                    className="hidden"
                    onChange={handleImageChange}
                />
                <label
                    htmlFor="profileImageInput"
                    className="contact-button flex items-center justify-center gap-2 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg cursor-pointer font-intermedium text-xs sm:text-sm md:text-base"
                >
                    <Upload size={14} className="sm:w-4 sm:h-4 md:w-5 md:h-5" />
                    {imageFile || formData.image ? 'Change Image' : 'Upload Image'}
                </label>
            </div>
        </div>
    );

    return (
        <div className="w-full min-h-screen bg-[rgb(225,232,236)] flex flex-col overflow-x-hidden">
            <div className="flex-1 flex justify-center items-start py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl bg-[#F6FBFF] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-xl shadow-sm space-y-6 sm:space-y-8 md:space-y-10">
                    <div className="text-center mb-6">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-intermedium text-gray-800">
                            {mode === 'edit' ? 'Edit Testimonial' : 'Add New Testimonial'}
                        </h1>
                    </div>

                    {/* Name */}
                    <div className="space-y-2 sm:space-y-3">
                        <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                            Client Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Enter client name..."
                            className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                        />
                    </div>

                    {/* LinkedIn Link */}
                    <div className="space-y-2 sm:space-y-3">
                        <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                            LinkedIn Profile
                        </label>
                        <div className="relative">
                            <input
                                type="url"
                                name="linkedin_link"
                                value={formData.linkedin_link}
                                onChange={handleChange}
                                placeholder="https://linkedin.com/in/username"
                                className="w-full pl-10 pr-3 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                            />
                            <Linkedin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2 sm:space-y-3">
                        <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                            Testimonial
                        </label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows={6}
                            placeholder="What did the client say about your work?"
                            className="w-full md:rows-7 lg:rows-8 px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors resize-none"
                        />
                    </div>

                    {/* Image Upload */}
                    <ImageUploadSection />

                    {/* Save Button */}
                    <div className="flex justify-center pt-4 sm:pt-6 md:pt-8">
                        <button
                            type="button"
                            onClick={handleSubmit}
                            disabled={loading}
                            className="contact-button w-full sm:w-auto px-6 py-3 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium text-sm sm:text-base md:text-lg flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                            ) : (
                                <Save size={20} />
                            )}
                            {mode === 'edit' ? 'Update Testimonial' : 'Save Testimonial'}
                        </button>
                    </div>
                </div>
            </div>
            <ThemeStyles />
            <style jsx>{`
                .contact-button {
                    transition: all 0.3s ease-out;
                    box-shadow: inset 0 1px 2px 0 #b8c1e6,
                                0 0.71px 0.71px -0.58px rgba(46,64,128,0.35),
                                0 1.81px 1.81px -1.17px rgba(46,64,128,0.34),
                                0 3.62px 3.62px -1.75px rgba(46,64,128,0.33),
                                0 6.87px 6.87px -2.33px rgba(46,64,128,0.3),
                                0 13.65px 13.65px -2.92px rgba(46,64,128,0.26),
                                0 30px 30px -3.5px rgba(46,64,128,0.15);
                }
                
                .contact-button:hover {
                    transform: translateY(-3px) scale(1.02);
                    box-shadow: inset 0 1px 2px 0 #b8c1e6,
                                0 2px 2px -0.58px rgba(46,64,128,0.4),
                                0 4px 4px -1.17px rgba(46,64,128,0.39),
                                0 8px 8px -1.75px rgba(46,64,128,0.38),
                                0 15px 15px -2.33px rgba(46,64,128,0.35),
                                0 25px 25px -2.92px rgba(46,64,128,0.31),
                                0 45px 45px -3.5px rgba(46,64,128,0.25),
                                0 70px 70px -4px rgba(46,64,128,0.2);
                }
                
                .contact-button:active {
                    transform: translateY(-1px) scale(1.01);
                    transition: all 0.1s ease-out;
                }
            `}</style>
        </div>
    );
}