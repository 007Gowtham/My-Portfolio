import React from "react";
import { ArrowLeft, Code, TrendingUp, BarChart3 } from "lucide-react";
import { CodingPlatform } from "./types";
import ThemeStyles from "../profile/ThemeStyles";

interface CodingPlatformViewProps {
    platform: CodingPlatform;
    onBack: () => void;
    onEdit: () => void;
}

export default function CodingPlatformView({ platform, onBack, onEdit }: CodingPlatformViewProps) {
    const totalProblems = platform.leetcode + platform.geeksforgeeks + platform.codingninjas + platform.others;

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
                            Back to Coding Platforms
                        </button>
                        <button
                            onClick={onEdit}
                            className="contact-button px-4 py-2 bg-[linear-gradient(127deg,#0e1c29_-68%,rgb(50,61,104)_100%)] text-white rounded-lg font-intermedium"
                        >
                            Edit Stats
                        </button>
                    </div>

                    {/* Title */}
                    <div className="text-center space-y-4">
                        <h1 className="text-2xl sm:text-3xl md:text-4xl font-intermedium text-gray-800">
                            Coding Platform Statistics
                        </h1>
                        <p className="text-gray-600">Your problem-solving journey across different platforms</p>
                    </div>

                    {/* Total Summary Card */}
                    <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 rounded-xl text-white text-center">
                        <div className="flex items-center justify-center gap-3 mb-3">
                            <TrendingUp size={32} />
                            <h2 className="text-2xl font-intermedium">Total Problems Solved</h2>
                        </div>
                        <div className="text-4xl font-intermedium">{totalProblems}</div>
                    </div>

                    {/* Platform Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* LeetCode */}
                        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                                    <Code className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-intermedium text-gray-800">LeetCode</h3>
                                    <p className="text-gray-600 text-sm">Algorithm challenges</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-intermedium text-blue-600">{platform.leetcode}</div>
                                <div className="text-gray-500 text-sm">problems solved</div>
                            </div>
                        </div>

                        {/* GeeksforGeeks */}
                        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                                    <Code className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-intermedium text-gray-800">GeeksforGeeks</h3>
                                    <p className="text-gray-600 text-sm">Data structures & algorithms</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-intermedium text-green-600">{platform.geeksforgeeks}</div>
                                <div className="text-gray-500 text-sm">problems solved</div>
                            </div>
                        </div>

                        {/* Coding Ninjas */}
                        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                                    <Code className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-intermedium text-gray-800">Coding Ninjas</h3>
                                    <p className="text-gray-600 text-sm">Practice problems</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-intermedium text-orange-600">{platform.codingninjas}</div>
                                <div className="text-gray-500 text-sm">problems solved</div>
                            </div>
                        </div>

                        {/* Others */}
                        <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                                    <Code className="text-white" size={24} />
                                </div>
                                <div>
                                    <h3 className="text-lg font-intermedium text-gray-800">Other Platforms</h3>
                                    <p className="text-gray-600 text-sm">Additional practice</p>
                                </div>
                            </div>
                            <div className="text-center">
                                <div className="text-3xl font-intermedium text-purple-600">{platform.others}</div>
                                <div className="text-gray-500 text-sm">problems solved</div>
                            </div>
                        </div>
                    </div>

                    {/* Progress Visualization */}
                    <div className="bg-white rounded-lg p-6 border border-gray-200 shadow-sm">
                        <h3 className="text-lg font-intermedium text-gray-800 mb-4 flex items-center gap-2">
                            <BarChart3 size={20} />
                            Problem Distribution
                        </h3>
                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">LeetCode</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-blue-500 h-2 rounded-full" 
                                            style={{ width: `${(platform.leetcode / totalProblems) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600 w-12 text-right">{platform.leetcode}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">GeeksforGeeks</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-green-500 h-2 rounded-full" 
                                            style={{ width: `${(platform.geeksforgeeks / totalProblems) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600 w-12 text-right">{platform.geeksforgeeks}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Coding Ninjas</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-orange-500 h-2 rounded-full" 
                                            style={{ width: `${(platform.codingninjas / totalProblems) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600 w-12 text-right">{platform.codingninjas}</span>
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-600">Others</span>
                                <div className="flex items-center gap-2">
                                    <div className="w-32 bg-gray-200 rounded-full h-2">
                                        <div 
                                            className="bg-purple-500 h-2 rounded-full" 
                                            style={{ width: `${(platform.others / totalProblems) * 100}%` }}
                                        ></div>
                                    </div>
                                    <span className="text-sm text-gray-600 w-12 text-right">{platform.others}</span>
                                </div>
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
