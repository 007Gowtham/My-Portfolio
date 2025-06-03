"use client"
import { useState } from "react";

import { useRouter } from "next/navigation";
import { Trust } from "@/components/trust";
 // Make sure this is imported
import Image from "next/image";
import Footer from "./footer";
import Contactbutton from "@/components/sections/contactbutton";
import Navbar from "@/components/sections/navbar";
import TopNavbar from "@/components/sections/topnavbar";
import Noise from "@/components/noise";
import { NumberTicker } from "@/components/magicui/number-ticker";

// TypeScript interfaces
interface Project {
  id: number;
  img: string;
  title: string;
  description: string;
  slug?: string;
}

interface ProjectCardProps {
  project: Project;
  index: number;
  onProjectClick: (projectId: number) => void;
}

// Project Card Component with consistent font weights
const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onProjectClick }) => (
  <div
    key={index}
    className="custom-card bg-transparent backdrop-blur-sm p-3 text-[#0E1C29] border border-white/20 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
    onClick={() => onProjectClick(project.id)}
  >
    <div className="relative shadow-xl rounded-xl sm:rounded-2xl w-full h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-96 z-10">
      <Image
        src={project.img}
        alt={project.title}
        fill
        className="object-cover rounded-xl sm:rounded-2xl"
      />
    </div>
    <div className="p-2 xs:p-3 sm:p-4 z-10 flex relative">
      {/* Fixed font weight to match home page */}
      <h3 className="text-xs xs:text-sm sm:text-base md:text-lg font-inter font-normal w-full text-[#0E1C29]/50">{project.title}</h3>
      <h3 className="flex w-full items-start relative justify-end">
        <Image 
          src="/project/arrow.svg" 
          alt="" 
          width={20} 
          height={20}
          className="xs:w-[22px] xs:h-[22px] sm:w-[25px] sm:h-[25px] md:w-[28px] md:h-[28px] lg:w-[30px] lg:h-[30px] absolute right-0 top-0 hover:translate-x-1 transition-transform duration-200" 
        />
      </h3>
    </div>
  </div>
);

const Project: React.FC = () => {
  const router = useRouter();

  const initialProjects: Project[] = [
    {
      id: 1,
      img: "/project/p1.svg",
      title: "LanderOS",
      description: "LanderOS is a modern Framer template crafted for SaaS startups to showcase features, engage users, and drive growth effortlessly.",
    },
    {
      id: 2,
      img: "/project/p2.svg",
      title: "DataViz Pro",
      description: "DataViz Pro is an advanced data visualization platform designed to transform complex datasets into beautiful, interactive charts and dashboards.",
    },
    {
      id: 3,
      img: "/project/p3.svg",
      title: "EcoTrack",
      description: "EcoTrack is a sustainability tracking application that helps organizations monitor and reduce their environmental impact through comprehensive analytics.",
    },
    {
      id: 4,
      img: "/project/p4.svg",
      title: "Tech Flow",
      description: "TechFlow simplifies workflows and increases team productivity through intelligent automation and seamless integrations.",
    }
  ];

  const additionalProjects: Project[] = [
    {
      id: 5,
      img: "/project/p5.svg",
      title: "BrandBoost",
      description: "BrandBoost enhances your online presence with comprehensive digital marketing solutions and brand management tools.",
    },
    {
      id: 6,
      img: "/project/p6.svg",
      title: "InnovateLab",
      description: "InnovateLab transforms your ideas into reality with cutting-edge development tools and creative design solutions.",
    },
  ];

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showMoreClicked, setShowMoreClicked] = useState<boolean>(false);

  const showMore = (): void => {
    setProjects((prev) => [...prev, ...additionalProjects]);
    setShowMoreClicked(true);
  };

  const handleProjectClick = (projectId: number): void => {
    router.push(`/project/${projectId}`);
  };

  return (
     <div className="relative w-screen overflow-x-hidden bg-[rgb(225,232,236)]">
      {/* Background Grain Effect */}
     
      {/* Top Navbar */}
      <div className="relative z-10">
        <TopNavbar />

       <div className="w-full px-2 xs:px-3 sm:px-4 md:px-6 lg:px-8 xl:px-12 2xl:px-95 flex-col overflow-x-hidden h-auto flex gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 pt-12 xs:pt-14 sm:pt-16 md:pt-18 lg:pt-20 xl:pt-22 2xl:pt-24  items-center relative">
  

      {/* Main Title - Fixed font weight to match home page */}
      <div className="text-2xl font-satoshi  xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[53px] flex flex-col tracking-wide text-center max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl px-2 leading-tight">
        The Design Of Success
      </div>

      {/* Trust Section */}
      <div className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 px-2">
        <Trust />
        {/* Fixed font weight */}
        <div className="text-sm font-inter font-normal xs:text-base sm:text-md xl:text-lg text-gray-800 text-center xs:text-left">
          Trusted by <NumberTicker value={100}/>+ Audiences Worldwide
        </div>
      </div>
          
      {/* Contact Button */}
      <Contactbutton/>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 font-inter md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 2xl:grid-cols-2 mt-3 xs:mt-4 sm:mt-5 md:mt-6 lg:mt-7 xl:mt-8 gap-4 xs:gap-5 sm:gap-6 md:gap-8 lg:gap-10 xl:gap-12 2xl:gap-10 bg-transparent w-full px-2">
        {projects.map((project, index) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={index}
            onProjectClick={handleProjectClick}
          />
        ))}
      </div>

      {/* Load More Button - Fixed font weight */}
      {!showMoreClicked && (
        <button
          id="show"
          onClick={showMore}
          className="bg-black text-white rounded-2xl xs:rounded-3xl sm:rounded-4xl font-inter font-normal px-4 py-2 blur-[0.5px] my-3 xs:my-4 sm:my-5 md:my-6 lg:my-7 xl:my-8 
          shadow-[0px_1.34px_0.53px_-0.625px_rgba(0,0,0,0.09),0px_3.18px_1.27px_-1.25px_rgba(0,0,0,0.09),0px_5.81px_2.32px_-1.875px_rgba(0,0,0,0.08),0px_9.66px_3.86px_-2.5px_rgba(0,0,0,0.08),0px_15.6px_6.24px_-3.125px_rgba(0,0,0,0.07),0px_25.53px_10.21px_-3.75px_rgba(0,0,0,0.06),0px_43.96px_17.58px_-4.375px_rgba(0,0,0,0.04),0px_80px_32px_-5px_rgba(0,0,0,0)] 
          hover:scale-105 transition-transform duration-200 hover:bg-gray-800"
        >
          Load more
        </button>
      )}

      {/* Footer */}
      <div className="relative z-10">
        <Footer />
      </div>
     
    </div>
      </div>
    </div>
    
  );
};

export default Project;