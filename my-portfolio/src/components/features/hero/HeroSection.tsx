import React from "react";
import Link from "next/link";
import { ArrowRight, Code, Palette, Zap } from "lucide-react";

export default function HeroSection() {
    return (
        <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute top-40 left-40 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
            </div>

            {/* Main Content */}
            <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                {/* Main Heading */}
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-intermedium font-bold text-gray-900 mb-6 leading-tight">
                    Hi, I'm{" "}
                    <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                        Gowtham
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-inter text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
                    A passionate{" "}
                    <span className="font-semibold text-blue-600">Full-Stack Developer</span>{" "}
                    crafting digital experiences that make a difference
                </p>

                {/* Description */}
                <p className="text-lg sm:text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                    I specialize in building modern web applications with cutting-edge technologies,
                    creating seamless user experiences, and turning ideas into reality.
                </p>

                {/* CTA Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center mb-16">
                    <Link
                        href="/project"
                        className="group bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-full font-intermedium text-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300 flex items-center gap-2"
                    >
                        View My Work
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>

                    <Link
                        href="/contact"
                        className="group border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-intermedium text-lg hover:border-blue-600 hover:text-blue-600 transition-all duration-300 flex items-center gap-2"
                    >
                        Get In Touch
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>

                {/* Skills Preview */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                            <Code className="w-6 h-6 text-blue-600" />
                        </div>
                        <h3 className="text-lg font-intermedium text-gray-800 mb-2">Development</h3>
                        <p className="text-gray-600 text-sm">Full-stack web development with modern technologies</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                            <Palette className="w-6 h-6 text-purple-600" />
                        </div>
                        <h3 className="text-lg font-intermedium text-gray-800 mb-2">Design</h3>
                        <p className="text-gray-600 text-sm">Creating beautiful and intuitive user interfaces</p>
                    </div>

                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow">
                        <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center mb-4 mx-auto">
                            <Zap className="w-6 h-6 text-pink-600" />
                        </div>
                        <h3 className="text-lg font-intermedium text-gray-800 mb-2">Performance</h3>
                        <p className="text-gray-600 text-sm">Optimizing for speed and user experience</p>
                    </div>
                </div>
            </div>

            {/* Scroll Indicator */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
                <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
                    <div className="w-1 h-3 bg-gray-400 rounded-full mt-2 animate-pulse"></div>
                </div>
            </div>

            <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
        </section>
    );
}
