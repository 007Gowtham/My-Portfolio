import React from "react";
import { User, Code, Palette, Zap, Award, Clock, Users } from "lucide-react";

export default function AboutSection() {
    return (
        <section className="py-16 sm:py-20 lg:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-intermedium font-bold text-gray-900 mb-6">
                        About Me
                    </h2>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto">
                        A passionate developer with a love for creating innovative solutions and
                        turning complex problems into simple, beautiful designs.
                    </p>
                </div>

                {/* Main Content Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-16">
                    {/* Left Column - Image and Personal Info */}
                    <div className="space-y-8">
                        {/* Profile Image */}
                        <div className="relative">
                            <div className="w-64 h-64 mx-auto lg:mx-0 bg-gradient-to-br from-blue-400 to-purple-600 rounded-full p-1">
                                <div className="w-full h-full bg-gray-200 rounded-full flex items-center justify-center">
                                    <User className="w-24 h-24 text-gray-400" />
                                </div>
                            </div>
                            <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-green-500 rounded-full flex items-center justify-center">
                                <span className="text-white font-bold text-sm">5+</span>
                            </div>
                        </div>

                        {/* Personal Details */}
                        <div className="space-y-4">
                            <h3 className="text-2xl font-intermedium font-semibold text-gray-800">
                                Gowtham
                            </h3>
                            <p className="text-gray-600">
                                Full-Stack Developer based in India, passionate about creating
                                meaningful digital experiences.
                            </p>
                            <div className="flex items-center gap-2 text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span>Available for new opportunities</span>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Skills and Experience */}
                    <div className="space-y-8">
                        {/* Skills Overview */}
                        <div>
                            <h3 className="text-xl font-intermedium font-semibold text-gray-800 mb-4">
                                Technical Skills
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                                    <span className="text-gray-700">React.js</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                                    <span className="text-gray-700">Node.js</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                                    <span className="text-gray-700">TypeScript</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                                    <span className="text-gray-700">Python</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                                    <span className="text-gray-700">MongoDB</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                                    <span className="text-gray-700">PostgreSQL</span>
                                </div>
                            </div>
                        </div>

                        {/* Experience Highlights */}
                        <div>
                            <h3 className="text-xl font-intermedium font-semibold text-gray-800 mb-4">
                                Experience Highlights
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-start gap-3">
                                    <Award className="w-5 h-5 text-yellow-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-800">5+ Years Experience</p>
                                        <p className="text-sm text-gray-600">Full-stack development</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Code className="w-5 h-5 text-blue-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-800">50+ Projects</p>
                                        <p className="text-sm text-gray-600">Successfully delivered</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-3">
                                    <Users className="w-5 h-5 text-green-500 mt-0.5" />
                                    <div>
                                        <p className="font-medium text-gray-800">20+ Clients</p>
                                        <p className="text-sm text-gray-600">Satisfied customers</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Additional Sections */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Development */}
                    <div className="text-center p-6 bg-gray-50 rounded-xl">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Code className="w-8 h-8 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-intermedium font-semibold text-gray-800 mb-2">
                            Development
                        </h3>
                        <p className="text-gray-600">
                            Building scalable web applications with modern technologies and best practices.
                        </p>
                    </div>

                    {/* Design */}
                    <div className="text-center p-6 bg-gray-50 rounded-xl">
                        <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Palette className="w-8 h-8 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-intermedium font-semibold text-gray-800 mb-2">
                            Design
                        </h3>
                        <p className="text-gray-600">
                            Creating intuitive and beautiful user interfaces that enhance user experience.
                        </p>
                    </div>

                    {/* Performance */}
                    <div className="text-center p-6 bg-gray-50 rounded-xl">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Zap className="w-8 h-8 text-green-600" />
                        </div>
                        <h3 className="text-lg font-intermedium font-semibold text-gray-800 mb-2">
                            Performance
                        </h3>
                        <p className="text-gray-600">
                            Optimizing applications for speed, efficiency, and excellent user experience.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}
