import React, { useState, useEffect } from "react";
import { Save, Code, TrendingUp } from "lucide-react";
import { API_CONFIG, ENDPOINTS } from "@/lib/config";
import { CodingPlatform } from "./types";
import ThemeStyles from "../profile/ThemeStyles";

interface CodingPlatformFormProps {
    platform?: CodingPlatform | null;
    onSave: (platform: CodingPlatform) => void;
    onCancel: () => void;
    mode: 'create' | 'edit';
}

export default function CodingPlatformForm({ platform, onSave, onCancel, mode }: CodingPlatformFormProps) {
    const [formData, setFormData] = useState<CodingPlatform>({
        leetcode: 0,
        geeksforgeeks: 0,
        codingninjas: 0,
        others: 0
    });

    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (platform && mode === 'edit') {
            setFormData(platform);
        }
    }, [platform, mode]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const url = mode === 'edit'
                ? `${API_CONFIG.BASE_URL}${ENDPOINTS.CODING_PLATFORMS}${platform?.id}/`
                : `${API_CONFIG.BASE_URL}${ENDPOINTS.CODING_PLATFORMS}`;

            const method = mode === 'edit' ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const savedPlatform = await response.json();
                onSave(savedPlatform);
            } else {
                console.error('Failed to save coding platform');
            }
        } catch (error) {
            console.error('Error saving coding platform:', error);
        } finally {
            setLoading(false);
        }
    };

    const totalProblems = formData.leetcode + formData.geeksforgeeks + formData.codingninjas + formData.others;

    return (
        <div className="w-full min-h-screen bg-[rgb(225,232,236)] flex flex-col overflow-x-hidden">
            <div className="flex-1 flex justify-center items-start py-4 sm:py-8 md:py-12 lg:py-16 xl:py-20 px-3 sm:px-4 md:px-6 lg:px-8">
                <div className="w-full max-w-sm sm:max-w-md md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl bg-[#F6FBFF] p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 rounded-xl shadow-sm space-y-6 sm:space-y-8 md:space-y-10">
                    <div className="text-center mb-6">
                        <h1 className="text-xl sm:text-2xl md:text-3xl font-intermedium text-gray-800">
                            {mode === 'edit' ? 'Edit Coding Platform Stats' : 'Add New Coding Platform Stats'}
                        </h1>
                    </div>

                    {/* Platform Stats Form */}
                    <div className="space-y-6">
                        {/* LeetCode */}
                        <div className="space-y-2 sm:space-y-3">
                            <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                                LeetCode Problems Solved
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="leetcode"
                                    value={formData.leetcode}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="0"
                                    className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Code className="text-blue-500" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* GeeksforGeeks */}
                        <div className="space-y-2 sm:space-y-3">
                            <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                                GeeksforGeeks Problems Solved
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="geeksforgeeks"
                                    value={formData.geeksforgeeks}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="0"
                                    className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Code className="text-green-500" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Coding Ninjas */}
                        <div className="space-y-2 sm:space-y-3">
                            <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                                Coding Ninjas Problems Solved
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="codingninjas"
                                    value={formData.codingninjas}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="0"
                                    className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Code className="text-orange-500" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Others */}
                        <div className="space-y-2 sm:space-y-3">
                            <label className="block text-sm sm:text-base md:text-lg lg:text-xl font-intermedium text-gray-700">
                                Other Platform Problems Solved
                            </label>
                            <div className="relative">
                                <input
                                    type="number"
                                    name="others"
                                    value={formData.others}
                                    onChange={handleChange}
                                    min="0"
                                    placeholder="0"
                                    className="w-full px-3 sm:px-4 md:px-5 py-2 sm:py-2.5 md:py-3 lg:py-4 rounded-lg font-inter border border-gray-200 bg-[#F0F8FF] text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                                />
                                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                                    <Code className="text-purple-500" size={20} />
                                </div>
                            </div>
                        </div>

                        {/* Total Summary */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-4 rounded-lg border border-blue-200">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <TrendingUp className="text-blue-600" size={20} />
                                    <span className="text-lg font-intermedium text-gray-700">Total Problems:</span>
                                </div>
                                <span className="text-2xl font-intermedium text-blue-600">{totalProblems}</span>
                            </div>
                        </div>
                    </div>

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
                            {mode === 'edit' ? 'Update Stats' : 'Save Stats'}
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
