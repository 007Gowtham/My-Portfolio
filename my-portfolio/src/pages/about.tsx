import Image from "next/image";
import {  Instagram, Github,Linkedin } from 'lucide-react';
import Contactbutton from "@/components/sections/contactbutton";
import { ShinyButton } from "@/components/magicui/shiny-button";
import GlowPulser from "@/components/sections/gloweffect";
import { useEffect,useState } from "react";
import axios from "axios";

export default function About() {

    interface ProfileData {
        name: string;
        description: string;
        aboutme: string;
        image: string;
        techskills: string[];
        exp: {
            role: string;
            companyname: string;
            year: string;
        }[];
        dsaSkills: {
            platform: string;
            problemSolved: number;
        }[];
    }
    const [profileData, setProfileData] = useState<ProfileData>({
        name: "Gowtham S D",
        description: "UI/UX Interaction Designer Based in Berlin.",
        aboutme: "Hi, I'm Gowtham — a frontend-focused web developer and CSE student at Sri Krishna College of Technology, Coimbatore. I build responsive, user-friendly web interfaces using React, Next.js, and Tailwind CSS. I'm passionate about turning ideas into clean, interactive designs and constantly learning to grow as a developer. Creative. Consistent. Curious.",
        image: "/about/profile.svg",
        techskills: [
            "Html", "Css", "JavaScript", "React", "Next.js", "Tailwind CSS",
            "Figma", "Python", "Django", "Node.js", "Express.js", "MongoDB",
            "Github", "MySQL", "C++", "Java"
        ],
        exp: [
            {
                role: "Product Designer",
                companyname: "Nexus Creative",
                year: "2023"
            },
            {
                role: "Freelance",
                companyname: "BrightLeaf Co",
                year: "2021"
            },
            {
                role: "Graphic Designer", 
                companyname: "SummitWorks",
                year: "2024"
            }
        ],
        dsaSkills: []
    });


    useEffect(() => {
        const fetchProfileData = () => {
             axios.get(`${process.env.NEXT_PUBLIC_API_URL}/profile`)
             .then((response) => {
                 setProfileData(response.data)
                 console.log(response.data)
             })
             .catch((error) => {
                 console.log(error)
             })
        }
        fetchProfileData()
    },[])
    return (
        <div   id="profile" className="w-full min-h-auto flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-9 xl:px-20  py-8 sm:py-12 md:py-16 lg:py-20">
            {/* Mobile Layout */}
            <div className="w-full max-w-7xl block md:hidden">
                {/* Profile Card - Mobile */}
                <div className="bg-[#F6FBFF] shadow-2xl w-full max-w-sm mx-auto p-4 rounded-2xl mb-6">
                    <div className="relative w-full h-48 bg-black rounded-2xl mb-4 overflow-hidden">
                        <Image 
                            src={profileData.image} 
                            alt="Profile Image" 
                            fill 
                            className="object-cover rounded-xl"
                            priority
                        />
                    </div>
                    
                    <div className="text-[#0E1C29] flex flex-col gap-3 text-center items-center">
                        <div className="flex flex-col gap-2">
                            <div className=" flex w-full items-center justify-center gap-3" >
                                    <GlowPulser/>
                                <div className="text-center text-md font-inter">Available for Work</div>
                                </div>
                            <div className="text-2xl font-intermedium font-medium">{profileData.name}</div>
                            <p className="text-xs px-2 font-inter">{profileData.description}</p>
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
                        
                         <div className=" w-full">
                            <Contactbutton/>
                            </div>  
                    </div>
                </div>

                {/* Content - Mobile */}
                <div className=" p-4 rounded-2xl shadow-lg">
                    <div className="text-[#0E1C29]  font-inter text-sm leading-relaxed mb-6">
                        {profileData.aboutme}
                    </div>

                    <div className="border-t-2 my-6 border-[#0E1C29]/20 border-dashed"></div>

                    {/* Skills - Mobile */}
                    <div className="flex flex-wrap gap-2 mb-6">
                        {profileData.techskills.map((skill, index) => (
                            <div key={index} className="bg-[#D8DFE5] px-3 py-1.5 rounded-sm">
                                <div className="text-[#0E1C29]/80  text-xs">
                                    {skill}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div className="border-t-2 my-6 border-[#0E1C29]/20 border-dashed"></div>

                    {/* Work Experience - Mobile */}
                    <div className="space-y-3">
                        {profileData.exp.map((exp, index) => (
                            <div key={index} className="flex flex-col gap-1 font-inter py-2 border-b border-[#0E1C29]/10 last:border-b-0">
                                <div className="flex justify-between items-center">
                                    <span className="text-[#0E1C29]/80 text-sm font-medium">{exp.role}</span>
                                    <span className="text-[#0E1C29]/60 text-xs">{exp.year}</span>
                                </div>
                                <span className="text-[#0E1C29]/60 text-xs">{exp.companyname}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tablet Layout */}
            <div className="w-full max-w-3xl hidden md:block lg:hidden">
                <div className="grid grid-cols-5 gap-6 h-auto">
                    {/* Left Card - Tablet */}
                    <div className="bg-[#F6FBFF] shadow-2xl col-span-2 p-4 rounded-2xl h-fit">
                        <div className="relative w-full h-56 bg-black rounded-2xl mb-4 overflow-hidden">
                            <Image 
                                src={profileData.image} 
                                alt="Profile Image" 
                                fill 
                                className="object-cover rounded-xl"
                                priority
                            />
                        </div>
                        
                        <div className="text-[#0E1C29] flex flex-col gap-3 text-center items-center">
                            <div className="flex flex-col gap-2">
                                 <div className=" flex w-full items-center justify-center gap-3" >
                                    <GlowPulser/>
                                <div className="text-center text-md font-inter">Available for Work</div>
                                </div>
                                <div className="text-2xl font-medium font-intermedium ">{profileData?.name||"Gowtham S D"}</div>
                                <p className="text-sm  font-inter">{profileData?.description||"UI/UX Interaction Designer Based in Berlin."}</p>
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
                            
                          <div className=" w-full">
                            <Contactbutton/>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Tablet */}
                    <div className="col-span-3 p-4 rounded-2xl">
                        <div className="text-[#0E1C29]  font-inter text-sm leading-relaxed mb-6">
                            {profileData?.aboutme||`Hi, I'm Gowtham — a frontend-focused web developer and CSE student at Sri Krishna College of Technology, Coimbatore.
                            I build responsive, user-friendly web interfaces using React, Next.js, and Tailwind CSS. I'm passionate about turning ideas into clean, interactive designs and constantly learning to grow as a developer.
                            Creative. Consistent. Curious.`}
                        </div>

                        <div className="border-t-2 my-6 border-[#0E1C29]/20 border-dashed"></div>

                        {/* Skills - Tablet */}
                        <div className="flex flex-wrap gap-3 mb-8">
                            {profileData?.techskills?.map((skill, index) => (
                                <div key={index} className="bg-[#D8DFE5] px-3 py-2 rounded-sm">
                                    <div className="text-[#0E1C29]/80  text-sm">
                                        {skill}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t-2 my-6 border-[#0E1C29]/20 border-dashed"></div>

                        {/* Work Experience - Tablet */}
                        <div className="space-y-4">
                            {profileData.exp.map((exp, index) => (
                                <div key={index} className="flex justify-between font-inter items-center py-2">
                                    <span className="text-[#0E1C29]/80 text-sm font-medium flex-1">{exp.role}</span>
                                    <span className="text-[#0E1C29]/60 text-sm flex-1 text-center">{exp.companyname}</span>
                                    <span className="text-[#0E1C29]/60 text-sm flex-1 text-right">{exp.year}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Desktop Layout */}
            <div className="w-full max-w-6xl hidden lg:block">
                <div className="w-full h-[600px] grid grid-cols-4 gap-5">
                    {/* Left Card - Desktop */}
                    <div className="bg-[#F6FBFF] shadow-2xl col-span-1 gap-1 grid grid-rows-6 p-2 rounded-2xl">
                        <div className="relative row-span-3 bg-black rounded-2xl">
                            <Image src="/about/profile.svg" alt="Profile Image" fill className="object-cover rounded-xl" />
                        </div>
                        <div className="row-span-3 text-[#0E1C29] flex flex-col gap-5 text-center items-center">
                            <div className="flex flex-col gap-3 pt-4 px-2">
                                <div className=" flex w-full items-center justify-center gap-3" >
                                    <GlowPulser/>
                                <div className="text-center text-md font-inter">Available for Work</div>
                                </div>
                                <div className="text-3xl  font-intermedium ">{profileData?.name||"Gowtham S D"}</div>
                                <p className="text-sm  font-inter">{profileData?.description||"UI/UX Interaction Designer Based in Berlin."}</p>
                            </div>
                            <div>
                                <div className="flex gap-7">
                                    
                                    <ShinyButton  >
                                    <a href="https://www.linkedin.com/in/gowtham-s-d-563a7132a/" className="bg-[#D8DFE5] w-[45px] grid place-items-center rounded-full h-[45px]">
                                        <Linkedin className="text-lg text-[#0E1C29]/30" />
                                    </a>
                                    </ShinyButton>


                                    <ShinyButton >
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
                            <div className=" w-full ">
                            <Contactbutton/>
                            </div>
                        </div>
                    </div>

                    {/* Right Content - Desktop */}
                    <div className="col-span-3 ml-5 mt-5 rounded-2xl">
                        <div className="text-[#0E1C29] font-inter  text-md">
                          
                           {profileData?.aboutme||` Hi, I'm Gowtham — a frontend-focused web developer and CSE student at Sri Krishna College of Technology, Coimbatore.
                           
                            I build responsive, user-friendly web interfaces using React, Next.js, and Tailwind CSS. I'm passionate about turning ideas into clean, interactive designs and constantly learning to grow as a developer.
                            Creative. Consistent. Curious.`}
                        </div>

                        <div className="border-t-2 my-7 border-[#0E1C29]/20 border-dashed"></div>

                        {/* Skills - Desktop */}
                        <div className="flex my-10 flex-wrap gap-5">
                            {profileData?.techskills?.map((skill, index) => (
                                <div key={index} className="flex bg-[#D8DFE5] px-1 py-2 rounded-sm gap-2 items-center">

                                    <div className="text-[#0E1C29]/80 font-inter  px-2 text-center w-full text-md">
                                                                       
                                        {skill}
                                       
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t-2 my-7 border-[#0E1C29]/20 border-dashed"></div>
                        
                        {/* Work Experience - Desktop */}
                        <div className="space-y-3 lg:space-y-4 xl:space-y-5">
                            {profileData?.exp?.map((exp, index) => (
                                <div key={index} className="flex bg-[#D8DFE5] px-3  font-inter rounded-lg justify-between items-center py-2 lg:py-2.5 xl:py-3">
                                    <span className="text-[#0E1C29]/80  text-sm lg:text-md xl:text-lg">{exp.role}</span>
                                    <span className="text-[#0E1C29]/60  text-sm lg:text-md xl:text-lg">{exp.companyname}</span>
                                    <span className="text-[#0E1C29]/60  text-sm lg:text-md xl:text-lg">{exp.year}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}