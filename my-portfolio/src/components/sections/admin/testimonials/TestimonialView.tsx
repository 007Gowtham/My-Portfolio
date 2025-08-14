import React from "react";
import { ArrowLeft, Linkedin, Calendar } from "lucide-react";
import { Testimonial } from "./types";
import ThemeStyles from "../profile/ThemeStyles";

interface TestimonialViewProps {
    testimonial: Testimonial;
    onBack: () => void;
    onEdit: () => void;
}

export default function TestimonialView({ testimonial, onBack, onEdit }: TestimonialViewProps) {
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
                            Back to Testimonials
                        </button>
                        <button
                            onClick={onEdit}
                            className="contact-button px-4 py-2 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium"
                        >
                            Edit Testimonial
                        </button>
                    </div>

                    {/* Testimonial Title */}
                    <div className="text-center space-y-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-intermedium text-gray-800">
                            {testimonial.name}
                        </h1>
                    </div>

                    {/* Profile Image */}
                    {testimonial.image && (
                        <div className="w-full flex justify-center">
                            <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-lg">
                                <img
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>
                    )}

                    {/* Testimonial Content */}
                    <div className="space-y-6">
                        {/* Description */}
                        <div className="space-y-4">
                            <h3 className="text-xl font-intermedium text-gray-700">Client Testimonial</h3>
                            <div className="bg-gray-50 p-6 rounded-lg border-l-4 border-blue-500">
                                <p className="text-gray-600 leading-relaxed text-lg italic">
                                    "{testimonial.description}"
                                </p>
                            </div>
                        </div>

                        {/* LinkedIn Profile */}
                        {testimonial.linkedin_link && (
                            <div className="space-y-4">
                                <h3 className="text-xl font-intermedium text-gray-700">LinkedIn Profile</h3>
                                <a
                                    href={testimonial.linkedin_link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="contact-button flex items-center justify-center gap-3 px-6 py-3 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium text-lg w-full sm:w-auto"
                                >
                                    <Linkedin size={24} />
                                    View LinkedIn Profile
                                </a>
                            </div>
                        )}

                        {/* Metadata */}
                        <div className="border-t pt-6 space-y-2 text-sm text-gray-500">
                            <div className="flex justify-between">
                                <span>Created:</span>
                                <span>{testimonial.created_at ? formatDate(testimonial.created_at) : 'N/A'}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Last Updated:</span>
                                <span>{testimonial.updated_at ? formatDate(testimonial.updated_at) : 'N/A'}</span>
                            </div>
                        </div>
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
