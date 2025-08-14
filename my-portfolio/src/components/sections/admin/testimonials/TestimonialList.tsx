import React, { useState, useEffect } from "react";
import { Edit, Trash2, Eye, Plus, Search, Linkedin } from "lucide-react";
import { API_CONFIG, ENDPOINTS } from "@/lib/config";
import { Testimonial } from "./types";
import ThemeStyles from "../profile/ThemeStyles";

interface TestimonialListProps {
    onEdit: (testimonial: Testimonial) => void;
    onView: (testimonial: Testimonial) => void;
    onDelete: (testimonialId: number) => void;
    onCreateNew: () => void;
}

export default function TestimonialList({ onEdit, onView, onDelete, onCreateNew }: TestimonialListProps) {
    const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        fetchTestimonials();
    }, []);

    const fetchTestimonials = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_CONFIG.BASE_URL}${ENDPOINTS.TESTIMONIALS}`);
            if (response.ok) {
                const data = await response.json();
                setTestimonials(data);
            } else {
                console.error('Failed to fetch testimonials');
            }
        } catch (error) {
            console.error('Error fetching testimonials:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (testimonialId: number) => {
        if (window.confirm('Are you sure you want to delete this testimonial?')) {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${ENDPOINTS.TESTIMONIALS}${testimonialId}/`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    onDelete(testimonialId);
                    setTestimonials(prev => prev.filter(t => t.id !== testimonialId));
                } else {
                    console.error('Failed to delete testimonial');
                }
            } catch (error) {
                console.error('Error deleting testimonial:', error);
            }
        }
    };

    const filteredTestimonials = testimonials.filter(testimonial => {
        const matchesSearch = testimonial.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            testimonial.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesSearch;
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
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-intermedium text-gray-800">Testimonials Management</h1>
                        <p className="text-gray-600 mt-2">Manage your client testimonials</p>
                    </div>

                    {/* Add New Testimonial Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={onCreateNew}
                            className="contact-button flex items-center justify-center gap-2 px-6 py-3 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium text-sm sm:text-base md:text-lg"
                        >
                            <Plus size={20} />
                            Add New Testimonial
                        </button>
                    </div>

                    {/* Search */}
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="relative flex-1">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                            <input
                                type="text"
                                placeholder="Search testimonials..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200"
                            />
                        </div>
                    </div>

                    {/* Testimonials Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredTestimonials.map((testimonial) => (
                            <div key={testimonial.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                {/* Testimonial Image */}
                                <div className="h-48 bg-gray-100 relative">
                                    {testimonial.image ? (
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className="w-full h-full object-cover"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-400">
                                            <span>No Image</span>
                                        </div>
                                    )}
                                </div>

                                {/* Testimonial Info */}
                                <div className="p-4">
                                    <h3 className="font-intermedium text-lg text-gray-800 mb-2 line-clamp-2">
                                        {testimonial.name}
                                    </h3>
                                    <p className="text-gray-600 text-sm mb-3 line-clamp-3">
                                        {testimonial.description}
                                    </p>

                                    {/* LinkedIn Link */}
                                    {testimonial.linkedin_link && (
                                        <div className="mb-4">
                                            <a
                                                href={testimonial.linkedin_link}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 text-blue-600 hover:text-blue-800 text-sm"
                                            >
                                                <Linkedin size={16} />
                                                View Profile
                                            </a>
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onView(testimonial)}
                                            className="contact-button flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium text-sm"
                                        >
                                            <Eye size={16} />
                                            View
                                        </button>
                                        <button
                                            onClick={() => onEdit(testimonial)}
                                            className="contact-button flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium text-sm"
                                        >
                                            <Edit size={16} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => testimonial.id && handleDelete(testimonial.id)}
                                            className="contact-button flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg font-intermedium text-sm"
                                        >
                                            <Trash2 size={16} />
                                            Delete
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {filteredTestimonials.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No testimonials found</p>
                            <p className="text-gray-400 mt-2">Create your first testimonial to get started</p>
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
                .line-clamp-3 {
                    display: -webkit-box;
                    -webkit-line-clamp: 3;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
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
