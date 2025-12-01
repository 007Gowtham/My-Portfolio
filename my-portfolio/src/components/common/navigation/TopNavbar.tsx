"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function TopNavbar() {
    const pathname = usePathname();

    const isActive = (path: string) => {
        return pathname === path;
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">G</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">Portfolio</span>
                    </Link>

                    {/* Navigation Links */}
                    <nav className="hidden md:flex space-x-8">
                        <Link
                            href="/"
                            className={`text-sm font-medium transition-colors ${isActive("/")
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            Home
                        </Link>
                        <Link
                            href="/about"
                            className={`text-sm font-medium transition-colors ${isActive("/about")
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            About
                        </Link>
                        <Link
                            href="/project"
                            className={`text-sm font-medium transition-colors ${isActive("/project")
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            Projects
                        </Link>
                        <Link
                            href="/contact"
                            className={`text-sm font-medium transition-colors ${isActive("/contact")
                                    ? "text-blue-600 border-b-2 border-blue-600"
                                    : "text-gray-500 hover:text-gray-900"
                                }`}
                        >
                            Contact
                        </Link>
                    </nav>

                    {/* Admin Link */}
                    <div className="flex items-center space-x-4">
                        <Link
                            href="/admin"
                            className="text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                        >
                            Admin
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
