"use client"
TopNavbar
Navbar
import { ConfettiButton } from "@/components/magicui/confetti";
import { Navbar, TopNavbar } from "@/components/sections/navigation";
ConfettiButton

export default function AdminComponent() {

    return (
        <div className="relative w-screen flex justify-center  items-center h-screen overflow-x-hidden bg-[rgb(225,232,236)]">
            <TopNavbar />
            <Navbar />
            <div className="bg-[#F6FBFF]  flex-col  space-y-10 min-w-lg  rounded-xl p-7 shadow-sm">
                <div className=" text-center">
                    <h3 className=" text-xl font-intermedium">Coding Platforms</h3>
                </div>
                <div className=" flex-col  space-y-7  ">
                    <div className="flex-col  space-y-1 justify-center items-center ">
                        <div className="text-lg px-2 font-inter text-gray-700 ">
                            Leetcode
                        </div>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"

                            placeholder="problem solved in leetcode"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg  font-inter border border-gray-200 bg-[#F0F8FF] text-sm sm:text-base text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                        />
                    </div>
                    <div className="flex-col  space-y-1 justify-center items-center ">
                        <div className="text-lg px-2 font-inter text-gray-700 ">
                            Geeks for Geeks
                        </div>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"

                            placeholder="problem solved in GFG"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg  font-inter border border-gray-200 bg-[#F0F8FF] text-sm sm:text-base text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                        />
                    </div>

                    <div className="flex-col space-y-1 justify-center items-center ">
                        <div className="text-lg px-2 font-inter text-gray-700 ">
                            Coding Ninja
                        </div>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"

                            placeholder="problem solved in coding Ninja"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg  font-inter border border-gray-200 bg-[#F0F8FF] text-sm sm:text-base text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                        />
                    </div>
                    <div className="flex-col  space-y-1 justify-center items-center ">
                        <div className="text-lg px-2 font-inter text-gray-700 ">
                            Others
                        </div>
                        <input
                            type="text"
                            id="fullName"
                            name="fullName"

                            placeholder="problem solved in others"
                            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg  font-inter border border-gray-200 bg-[#F0F8FF] text-sm sm:text-base text-gray-800 placeholder-gray-400 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-200 transition-colors"
                        />
                    </div>
                    <div className=' relative'>
                        <ConfettiButton >

                            Update
                        </ConfettiButton>
                    </div>
                </div>
            </div>
        </div>



    );
}
