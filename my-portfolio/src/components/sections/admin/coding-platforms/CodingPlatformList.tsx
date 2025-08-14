import React, { useState, useEffect } from "react";
import { Edit, Trash2, Eye, Plus, Code, TrendingUp } from "lucide-react";
import { API_CONFIG, ENDPOINTS } from "@/lib/config";
import { CodingPlatform } from "./types";
import ThemeStyles from "../profile/ThemeStyles";

interface CodingPlatformListProps {
    onEdit: (platform: CodingPlatform) => void;
    onView: (platform: CodingPlatform) => void;
    onDelete: (platformId: number) => void;
    onCreateNew: () => void;
}

export default function CodingPlatformList({ onEdit, onView, onDelete, onCreateNew }: CodingPlatformListProps) {
    const [platforms, setPlatforms] = useState<CodingPlatform[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchPlatforms();
    }, []);

    const fetchPlatforms = async () => {
        try {
            setLoading(true);
            const response = await fetch(`${API_CONFIG.BASE_URL}${ENDPOINTS.CODING_PLATFORMS}`);
            if (response.ok) {
                const data = await response.json();
                setPlatforms(data);
            } else {
                console.error('Failed to fetch coding platforms');
            }
        } catch (error) {
            console.error('Error fetching coding platforms:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (platformId: number) => {
        if (window.confirm('Are you sure you want to delete this coding platform record?')) {
            try {
                const response = await fetch(`${API_CONFIG.BASE_URL}${ENDPOINTS.CODING_PLATFORMS}${platformId}/`, {
                    method: 'DELETE',
                });
                if (response.ok) {
                    onDelete(platformId);
                    setPlatforms(prev => prev.filter(p => p.id !== platformId));
                } else {
                    console.error('Failed to delete coding platform');
                }
            } catch (error) {
                console.error('Error deleting coding platform:', error);
            }
        }
    };

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
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-intermedium text-gray-800">Coding Platforms Management</h1>
                        <p className="text-gray-600 mt-2">Manage your coding platform statistics</p>
                    </div>

                    {/* Add New Platform Button */}
                    <div className="flex justify-center">
                        <button
                            onClick={onCreateNew}
                            className="contact-button flex items-center justify-center gap-2 px-6 py-3 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium text-sm sm:text-base md:text-lg"
                        >
                            <Plus size={20} />
                            Add New Platform Stats
                        </button>
                    </div>

                    {/* Coding Platforms Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {platforms.map((platform) => (
                            <div key={platform.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
                                {/* Platform Header */}
                                <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
                                    <div className="flex items-center gap-3">
                                        <Code size={24} />
                                        <h3 className="font-intermedium text-lg">Platform Stats</h3>
                                    </div>
                                </div>

                                {/* Platform Stats */}
                                <div className="p-4 space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-medium">LeetCode:</span>
                                        <span className="text-lg font-intermedium text-blue-600">{platform.leetcode}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-medium">GeeksforGeeks:</span>
                                        <span className="text-lg font-intermedium text-green-600">{platform.geeksforgeeks}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-medium">Coding Ninjas:</span>
                                        <span className="text-lg font-intermedium text-orange-600">{platform.codingninjas}</span>
                                    </div>
                                    <div className="flex justify-between items-center">
                                        <span className="text-gray-600 font-medium">Others:</span>
                                        <span className="text-lg font-intermedium text-purple-600">{platform.others}</span>
                                    </div>

                                    {/* Total Problems */}
                                    <div className="border-t pt-3 mt-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-gray-800 font-intermedium">Total Problems:</span>
                                            <span className="text-xl font-intermedium text-gray-800">
                                                {platform.leetcode + platform.geeksforgeeks + platform.codingninjas + platform.others}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Action Buttons */}
                                    <div className="flex gap-2 pt-3">
                                        <button
                                            onClick={() => onView(platform)}
                                            className="contact-button flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium text-sm"
                                        >
                                            <Eye size={16} />
                                            View
                                        </button>
                                        <button
                                            onClick={() => onEdit(platform)}
                                            className="contact-button flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium text-sm"
                                        >
                                            <Edit size={16} />
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => platform.id && handleDelete(platform.id)}
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

                    {platforms.length === 0 && (
                        <div className="text-center py-12">
                            <p className="text-gray-500 text-lg">No coding platform stats found</p>
                            <p className="text-gray-400 mt-2">Add your first platform statistics to get started</p>
                        </div>
                    )}
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
