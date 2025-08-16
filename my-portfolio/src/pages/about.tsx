"use client";
import Image from "next/image";
import { Instagram, Github, Linkedin } from 'lucide-react';
import { ContactButton, GlowEffect } from "@/components/sections/ui";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { ApiService } from "@/api/ApiService";
import { API_CONFIG, ENDPOINTS } from "@/lib/config";
import { useApiCRUD } from "@/hooks/useFetch";
import { useState, useEffect } from "react";

const userService = new ApiService<FormData>(`${API_CONFIG.BASE_URL}${ENDPOINTS.PROFILES}`);

export default function About() {
    const { items, loading, error, fetchAll } = useApiCRUD(userService);
    const [skills, setSkills] = useState<string[]>([]);
    const [internships, setInternships] = useState<{ company: string; year: string; role: string; about: string }[]>([]);
    const [about, setAbout] = useState<string>("");
    const [ImageFile, setImage] = useState<any>(null);
    const [isClient, setIsClient] = useState(false);
    const [dataLoaded, setDataLoaded] = useState(false);

    // Handle client-side mounting
    useEffect(() => {
        setIsClient(true);
        fetchAll();
    }, []);

    // Handle API data
    useEffect(() => {
        if (items.length > 0) {
            const user: any = items[0];
            setSkills(user.skills?.map((skill: { name: string }) => skill.name) || []);
            setAbout(user.about || "");
            setInternships(user.internships?.map((i: { company: string; year: string; role: string; about: string }) => ({
                company: i.company,
                year: i.year,
                role: i.role,
                about: i.about
            })) || []);
            setImage(user.image || null);
            setDataLoaded(true);
            console.log("User data fetched successfully:", user);
        }
    }, [items]);

    const workExperience = internships.map((exp) => ({
        company: exp.company,
        year: exp.year,
        role: exp.role,
        about: exp.about
    }));

    // Show loading skeleton until client-side hydration is complete
    if (!isClient) {
        return (
            <div id="profile" className="w-full min-h-auto flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-9 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20">
                <div className="w-full max-w-7xl">
                    <div className="bg-[#F6FBFF] shadow-2xl w-full max-w-sm mx-auto p-4 rounded-2xl mb-6 animate-pulse">
                        <div className="w-full h-48 bg-gray-300 rounded-2xl mb-4"></div>
                        <div className="space-y-3">
                            <div className="h-4 bg-gray-300 rounded w-3/4 mx-auto"></div>
                            <div className="h-6 bg-gray-300 rounded w-1/2 mx-auto"></div>
                            <div className="h-3 bg-gray-300 rounded w-2/3 mx-auto"></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div id="profile" className="w-full min-h-auto flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-9 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20">
            {/* Mobile Layout */}
            <div className="w-full max-w-7xl block md:hidden">
                {/* Profile Card - Mobile */}
                <div className="bg-[#F6FBFF] shadow-2xl w-full max-w-sm mx-auto p-4 rounded-2xl mb-6">
                    <div className="relative box-shadow-custom w-full h-48 bg-black rounded-2xl mb-4">
                        <Image
                            src={typeof ImageFile === "string" ? ImageFile : ImageFile instanceof File ? URL.createObjectURL(ImageFile) : "/about/profile.svg"}
                            alt="Profile Image"
                            fill
                            className="object-cover rounded-xl"
                            priority
                        />
                    </div>

                    <div className="text-[#0E1C29] flex flex-col gap-3 text-center items-center">
                        <div className="flex flex-col gap-2">
                            <div className="flex w-full items-center justify-center gap-3">
                                <GlowEffect />
                                <div className="text-center text-md font-inter">Available for Work</div>
                            </div>
                            <div className="text-2xl font-intermedium font-medium">Gowtham S D</div>
                            <p className="text-xs px-2 font-inter">UI/UX Interaction Designer Based in Berlin.</p>
                        </div>

                        <div className="flex gap-4 my-2">
                            <ShinyButton>
                                <a href="https://www.linkedin.com/in/gowtham-s-d-563a7132a/" className="bg-[#D8DFE5] w-10 h-10 grid place-items-center rounded-full">
                                    <Linkedin className="w-4 h-4 text-[#0E1C29]/30" />
                                </a>
                            </ShinyButton>
                            <ShinyButton>
                                <a href="https://Instagram.com/" className="bg-[#D8DFE5] w-10 h-10 grid place-items-center rounded-full">
                                    <Instagram className="w-4 h-4 text-[#0E1C29]/30" />
                                </a>
                            </ShinyButton>
                            <ShinyButton>
                                <a href="https://github.com/007Gowtham/GowthamSD" className="bg-[#D8DFE5] w-10 h-10 grid place-items-center rounded-full">
                                    <Github className="w-4 h-4 text-[#0E1C29]/30" />
                                </a>
                            </ShinyButton>
                        </div>

                        <div className="w-full">
                            <ContactButton />
                        </div>
                    </div>
                </div>

                {/* Content - Mobile */}
                <div className="p-4 rounded-2xl shadow-lg">
                    {loading ? (
                        <div className="space-y-4 animate-pulse">
                            <div className="h-4 bg-gray-300 rounded w-full"></div>
                            <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                            <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                        </div>
                    ) : (
                        <div suppressHydrationWarning className="text-[#0E1C29] font-inter text-sm leading-relaxed mb-6">
                            {about}
                        </div>
                    )}

                    <div className="border-t-2 my-6 border-[#0E1C29]/20 border-dashed"></div>

                    {/* Skills - Mobile */}
                    {loading ? (
                        <div className="flex flex-wrap gap-2 mb-6">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="bg-gray-300 h-8 w-16 rounded animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        <div suppressHydrationWarning className="flex flex-wrap gap-2 mb-6">
                            {skills.map((skill, index) => (
                                <div key={index} className="bg-[#D8DFE5] px-3 py-1.5 rounded-sm">
                                    <div className="text-[#0E1C29]/80 text-xs">
                                        {skill}
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="border-t-2 my-6 border-[#0E1C29]/20 border-dashed"></div>

                    {/* Work Experience - Mobile */}
                    {loading ? (
                        <div className="space-y-3">
                            {[...Array(3)].map((_, index) => (
                                <div key={index} className="animate-pulse">
                                    <div className="flex justify-between items-center">
                                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                                        <div className="h-3 bg-gray-300 rounded w-16"></div>
                                    </div>
                                    <div className="h-3 bg-gray-300 rounded w-1/4 mt-1"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div suppressHydrationWarning className="space-y-3">
                            {workExperience.map((exp, index) => (
                                <div key={index} className="flex flex-col gap-1 font-inter py-2 border-b border-[#0E1C29]/10 last:border-b-0">
                                    <div className="flex justify-between items-center">
                                        <span className="text-[#0E1C29]/80 text-sm font-medium">{exp.role}</span>
                                        <span className="text-[#0E1C29]/60 text-xs">{exp.year}</span>
                                    </div>
                                    <span className="text-[#0E1C29]/60 text-xs">{exp.company}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            {/* Tablet Layout */}
            <div className="w-full max-w-3xl hidden md:block lg:hidden">
                <div className="grid grid-cols-5 gap-6 h-auto">
                    {/* Left Card - Tablet */}
                    <div className="bg-[#F6FBFF] shadow-2xl col-span-2 p-4 rounded-2xl h-fit">
                        <div className="relative box-shadow-custom w-full h-56 bg-black rounded-2xl mb-4">
                            <Image
                                src={typeof ImageFile === "string" ? ImageFile : ImageFile instanceof File ? URL.createObjectURL(ImageFile) : "/about/profile.svg"}
                                alt="Profile Image"
                                fill
                                className="object-cover rounded-xl"
                                priority

                            />
                        </div>

                        <div className="text-[#0E1C29] flex flex-col gap-3 text-center items-center">
                            <div className="flex flex-col gap-2">
                                <div className="flex w-full items-center justify-center gap-3">
                                    <GlowEffect />
                                    <div className="text-center text-md font-inter">Available for Work</div>
                                </div>
                                <div className="text-2xl font-medium font-intermedium">Gowtham S D</div>
                                <p className="text-sm font-inter">UI/UX Interaction Designer Based in Berlin.</p>
                            </div>

                            <div className="flex gap-5 my-2">
                                <ShinyButton>
                                    <a href="https://www.linkedin.com/in/gowtham-s-d-563a7132a/" className="bg-[#D8DFE5] w-12 h-12 grid place-items-center rounded-full">
                                        <Linkedin className="w-5 h-5 text-[#0E1C29]/30" />
                                    </a>
                                </ShinyButton>
                                <ShinyButton>
                                    <a href="https://Instagram.com/" className="bg-[#D8DFE5] w-12 h-12 grid place-items-center rounded-full">
                                        <Instagram className="w-5 h-5 text-[#0E1C29]/30" />
                                    </a>
                                </ShinyButton>
                                <ShinyButton>
                                    <a href="https://github.com/007Gowtham/GowthamSD" className="bg-[#D8DFE5] w-12 h-12 grid place-items-center rounded-full">
                                        <Github className="w-5 h-5 text-[#0E1C29]/30" />
                                    </a>
                                </ShinyButton>
                            </div>

                            <div className="w-full">
                                <ContactButton />
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Tablet */}
                    <div className="col-span-3 p-4 rounded-2xl">
                        {loading ? (
                            <div className="space-y-4 animate-pulse">
                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                            </div>
                        ) : (
                            <div suppressHydrationWarning className="text-[#0E1C29] font-inter text-sm leading-relaxed mb-6">
                                {about}
                            </div>
                        )}

                        <div className="border-t-2 my-6 border-[#0E1C29]/20 border-dashed"></div>

                        {/* Skills - Tablet */}
                        {loading ? (
                            <div className="flex flex-wrap gap-3 mb-8">
                                {[...Array(8)].map((_, index) => (
                                    <div key={index} className="bg-gray-300 h-10 w-20 rounded animate-pulse"></div>
                                ))}
                            </div>
                        ) : (
                            <div suppressHydrationWarning className="flex flex-wrap gap-3 mb-8">
                                {skills.map((skill, index) => (
                                    <div key={index} className="bg-[#D8DFE5] px-3 py-2 rounded-sm">
                                        <div className="text-[#0E1C29]/80 text-sm">
                                            {skill}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="border-t-2 my-6 border-[#0E1C29]/20 border-dashed"></div>

                        {/* Work Experience - Tablet */}
                        {loading ? (
                            <div className="space-y-4">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="flex justify-between items-center py-2 animate-pulse">
                                        <div className="h-4 bg-gray-300 rounded w-1/3"></div>
                                        <div className="h-4 bg-gray-300 rounded w-1/4"></div>
                                        <div className="h-4 bg-gray-300 rounded w-16"></div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div suppressHydrationWarning className="space-y-4">
                                {workExperience.map((exp, index) => (
                                    <div key={index} className="flex justify-between font-inter items-center py-2">
                                        <span className="text-[#0E1C29]/80 text-sm font-medium flex-1">{exp.role}</span>
                                        <span className="text-[#0E1C29]/60 text-sm flex-1 text-center">{exp.company}</span>
                                        <span className="text-[#0E1C29]/60 text-sm flex-1 text-right">{exp.year}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="w-full max-w-6xl hidden lg:block">
                <div className="w-full h-[600px] grid grid-cols-4 gap-5">
                    {/* Left Card - Desktop */}
                    <div className="bg-[#F6FBFF] shadow-2xl col-span-1 gap-1 grid grid-rows-6 p-2 rounded-2xl">
                        <div className="relative box-shadow-custom row-span-3 bg-black rounded-2xl">
                            <Image
                                src={typeof ImageFile === "string" ? ImageFile : ImageFile instanceof File ? URL.createObjectURL(ImageFile) : "/about/profile.svg"}
                                alt="Profile Image"
                                fill
                                className="object-cover rounded-xl"
                                priority

                            />
                        </div>
                        <div className="row-span-3 text-[#0E1C29] flex flex-col gap-5 text-center items-center">
                            <div className="flex flex-col gap-3 pt-4 px-2">
                                <div className="flex w-full items-center justify-center gap-3">
                                    <GlowEffect />
                                    <div className="text-center text-md font-inter">Available for Work</div>
                                </div>
                                <div className="text-2xl font-medium font-intermedium">Gowtham S D</div>
                                <p className="text-sm font-inter">UI/UX Interaction Designer Based in Berlin.</p>
                            </div>
                            <div>
                                <div className="flex gap-7">
                                    <ShinyButton>
                                        <a href="https://www.linkedin.com/in/gowtham-s-d-563a7132a/" className="bg-[#D8DFE5] w-[45px] grid place-items-center rounded-full h-[45px]">
                                            <Linkedin className="text-lg text-[#0E1C29]/30" />
                                        </a>
                                    </ShinyButton>
                                    <ShinyButton>
                                        <a href="https://Instagram.com/" className="bg-[#D8DFE5] w-[45px] grid place-items-center rounded-full h-[45px]">
                                            <Instagram className="text-lg text-[#0E1C29]/30" />
                                        </a>
                                    </ShinyButton>
                                    <ShinyButton>
                                        <a href="https://github.com/007Gowtham/GowthamSD" className="bg-[#D8DFE5] w-[45px] grid place-items-center rounded-full h-[45px]">
                                            <Github className="text-lg text-[#0E1C29]/30" />
                                        </a>
                                    </ShinyButton>
                                </div>
                            </div>
                            <div className="w-full">
                                <ContactButton />
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Desktop */}
                    <div className="col-span-3 ml-5 mt-5 rounded-2xl">
                        {loading ? (
                            <div className="space-y-4 animate-pulse">
                                <div className="h-4 bg-gray-300 rounded w-full"></div>
                                <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                                <div className="h-4 bg-gray-300 rounded w-1/2"></div>
                            </div>
                        ) : (
                            <div suppressHydrationWarning className="text-[#0E1C29] font-inter text-md">
                                {about}
                            </div>
                        )}

                        <div className="border-t-2 my-7 border-[#0E1C29]/20 border-dashed"></div>

                        {/* Skills - Desktop */}
                        {loading ? (
                            <div className="flex my-10 flex-wrap gap-5">
                                {[...Array(10)].map((_, index) => (
                                    <div key={index} className="bg-gray-300 h-12 w-24 rounded animate-pulse"></div>
                                ))}
                            </div>
                        ) : (
                            <div suppressHydrationWarning className="flex my-10 flex-wrap gap-5">
                                {skills.map((skill, index) => (
                                    <div key={index} className="flex bg-[#D8DFE5] px-1 py-2 rounded-sm gap-2 items-center">
                                        <div className="text-[#0E1C29]/80 font-inter px-2 text-center w-full text-md">
                                            {skill}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="border-t-2 my-7 border-[#0E1C29]/20 border-dashed"></div>

                        {/* Work Experience - Desktop */}
                        {loading ? (
                            <div className="space-y-3 lg:space-y-4 xl:space-y-5">
                                {[...Array(3)].map((_, index) => (
                                    <div key={index} className="flex bg-gray-300 h-12 rounded-lg animate-pulse"></div>
                                ))}
                            </div>
                        ) : (
                            <div suppressHydrationWarning className="space-y-3 lg:space-y-4 xl:space-y-5">
                                {workExperience.map((exp, index) => (
                                    <div key={index} className="flex bg-[#D8DFE5] px-3 font-inter rounded-lg justify-between items-center py-2 lg:py-2.5 xl:py-3">
                                        <span className="text-[#0E1C29]/80 text-sm lg:text-md xl:text-lg">{exp.role}</span>
                                        <span className="text-[#0E1C29]/60 text-sm lg:text-md xl:text-lg">{exp.company}</span>
                                        <span className="text-[#0E1C29]/60 text-sm lg:text-md xl:text-lg">{exp.year}</span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}