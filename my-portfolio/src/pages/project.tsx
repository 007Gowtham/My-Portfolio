"use client"
import { useState } from "react";

import { useRouter } from "next/navigation";
import { Trust } from "@/components/trust";
// Make sure this is imported
import Image, { StaticImageData } from "next/image";
import Footer from "./footer";
import { TopNavbar, Navbar } from "@/components/sections/navigation";
import Group1Svg from "@/assert/Group 1.svg";
import { motion } from "framer-motion";

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

import { NumberTicker } from "@/components/magicui/number-ticker";
import { ContactButton } from "@/components/sections/ui";

// project images moved from public to src/assert
import ArrowIcon from '@/assert/project/arrow.svg';
import ezmark1 from '../assert/project/ezmark/ezmark1.png'
import writez1 from '../assert/project/writez/writez1.png'
import nector1 from '../assert/project/nector/p1.png'

// TypeScript interfaces
interface Project {
  id: number;
  img: StaticImageData;
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
  <motion.div
    variants={cardVariants}
    initial="hidden"
    whileInView="show"
    viewport={{ once: true, margin: "-50px" }}
    key={index}
    className="custom-card bg-transparent backdrop-blur-sm p-3 text-[#0E1C29] border border-white/20 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
    onClick={() => onProjectClick(project.id)}
  >
    <div className="relative shadow-lg rounded-xl sm:rounded-2xl w-full h-[350px] sm:h-[350px] md:h-[200px] lg:h-[250px] xl:h-[300px] 2xl:h-[400px] z-10">
      <Image
        src={project.img}
        alt={project.title}
        fill
        className="object-cover rounded-sm"
      />
    </div>
    <div className="p-2 xs:p-3 sm:p-4 z-10 flex relative">
      {/* Fixed font weight to match home page */}
      <h3 className="text-xs xs:text-sm sm:text-base md:text-lg font-inter font-normal w-full text-[#0E1C29]/50">{project.title}</h3>
      <h3 className="flex w-full items-start relative justify-end">
        <Image
          src={ArrowIcon}
          alt=""
          width={20}
          height={20}
          className="xs:w-[22px] xs:h-[22px] sm:w-[25px] sm:h-[25px] md:w-[28px] md:h-[28px] lg:w-[30px] lg:h-[30px] absolute right-0 top-0 hover:translate-x-1 transition-transform duration-200"
        />
      </h3>
    </div>
  </motion.div>
);

const Project: React.FC = () => {
  const router = useRouter();

  const initialProjects: Project[] = [
    {
      id: 1,
      img: ezmark1,
      title: "EzMark",
      description:
        "EzMark is a React Native attendance system using OTP and AWS Rekognition-based face authentication for secure and real-time validation.",
    },

    {
      id: 2,
      img: writez1,
      title: "Writezy",
      description:
        "Writezy is an AI-powered writing assistant that helps users generate, refine, and edit content seamlessly using modern AI models.",
    },

    {
      id: 3,
      img: nector1,
      title: "Nector",
      description:
        "Nector is a React-based online grocery store offering smooth navigation, product browsing, and efficient cart management using JSON-Server.",
    },
  ];


  const additionalProjects: Project[] = [

  ];

  const [projects, setProjects] = useState<Project[]>(initialProjects);
  const [showMoreClicked, setShowMoreClicked] = useState<boolean>(true);

  const showMore = (): void => {
    setProjects((prev) => [...prev, ...additionalProjects]);
    setShowMoreClicked(true);
  };

  const handleProjectClick = (projectId: number): void => {
    router.push(`/project/${projectId}`);
  };

  return (
    <div className="relative z-1 w-screen overflow-x-hidden">
      {/* Background Layer - SVG Overlay */}
      <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none">
        <div className="absolute inset-0 w-full h-full">
          <Image src={Group1Svg} alt="Background" fill className="object-cover scale-145" />
        </div>
      </div>

      {/* Top Navbar */}
      <div className="relative top-10 md:top-0 w-full z-10">
        <TopNavbar />

        <div className="w-full px-5 sm:px-10 lg:px-20 2xl:px-50 flex-col overflow-x-hidden h-auto flex gap-3 xs:gap-4 sm:gap-5 md:gap-6 lg:gap-7 xl:gap-8 pt-12 xs:pt-14 sm:pt-16 md:pt-18 lg:pt-20 xl:pt-22 2xl:pt-24  items-center relative">


          {/* Main Title - Fixed font weight to match home page */}
          <motion.div variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="text-2xl font-satoshi  xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl 2xl:text-[53px] flex flex-col tracking-wide text-center max-w-xs xs:max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl px-2 leading-tight">
            The Design Of Success
          </motion.div>

          {/* Trust Section */}
          <motion.div variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} className="flex items-center justify-center gap-1 xs:gap-2 sm:gap-3 md:gap-4 px-2">
            <Trust />
            {/* Fixed font weight */}
            <div className="text-sm font-inter font-normal xs:text-base sm:text-md xl:text-lg text-gray-800 text-center xs:text-left">
              Trusted by <NumberTicker value={100} />+ Audiences Worldwide
            </div>
          </motion.div>

          {/* Contact Button */}
          <motion.div variants={cardVariants} initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }}>
            <ContactButton />
          </motion.div>

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

          <Navbar />
        </div>
      </div>
    </div>

  );
};

export default Project;