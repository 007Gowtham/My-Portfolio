"use client";
import Button from "@/components/sections/button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";

export default function Hero() {

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
  

  const ProjectCard: React.FC<ProjectCardProps> = ({ project, index, onProjectClick }) => (
    <div
      key={index}
      className="custom-card bg-transparent backdrop-blur-sm p-3 text-[#0E1C29] w-[250px] h-[210px]  sm:w-[350px] sm:h-[320px] lg:w-[400px] lg:h-[360px] xl:w-[450px] xl:h-[400px] 2xl:w-[470px] 2xl:h-[390px] border border-white/20 cursor-pointer hover:scale-[1.02] transition-transform duration-200"
      onClick={() => onProjectClick(project.id)}
    >
      <div className="relative shadow-xl rounded-xl sm:rounded-2xl w-full h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 2xl:h-80 z-10">
        <Image
          src={project.img}
          alt={project.title}
          fill
          className="object-cover rounded-xl sm:rounded-2xl"
        />
      </div>
      <div className="p-2 xs:p-3 sm:p-4 z-10 flex relative">
        {/* Fixed font weight to match home page */}
        <h3 className="text-xs xs:text-sm sm:text-base md:text-md  font-inter font-normal w-full text-[#0E1C29]/80">{project.title}</h3>
        <h3 className="flex w-full items-start relative justify-end">
          <Image 
            src="/project/arrow.svg" 
            alt="" 
            width={20} 
            height={20}
            className="xs:w-[22px] xs:h-[22px] sm:w-[25px] sm:h-[25px] md:w-[28px] md:h-[28px] lg:w-[25px] lg:h-[25px] absolute right-0 top-0 hover:translate-x-1 transition-transform duration-200" 
          />
        </h3>
      </div>
    </div>)

 const IconButton = () => (
       <div className=" w-[45px] h-[45px] sm:min-w-[70px]  sm:min-h-[70px] lg:min-h-[80px] lg:min-w-[80px] 2xl:min-w-[90px] 2xl:min-h-[90px] bg-amber-500 rounded-xl">1</div>
 )

  return (
<div className="relative w-full h-auto flex flex-col items-center justify-center gap-5 overflow-hidden">
  <Image
    src="/hero/b3.svg"
    alt="Background"
    fill
    className="object-cover absolute inset-0 z-[-1]"
    priority
  />



  
  <div className="flex flex-col my-20 lg:my-28 items-center justify-center w-full h-full gap-5">
    <div className="flex flex-col gap-7">
      <div className="flex items-center justify-center gap-5">
        <IconButton />
        <h1 className="text-4xl sm:text-7xl lg:text-8xl bg-gradient-to-b from-[#0E1C29] via-[#0E1C29]/80 to-[#5E788F]/70 bg-clip-text text-transparent font-intrument font-medium">
          I'm Gowtham
        </h1>
      </div>

      <div className="flex items-center justify-center gap-5">
        <h1 className="text-4xl sm:text-7xl lg:text-8xl bg-gradient-to-b from-[#0E1C29] via-[#0E1C29]/80 to-[#5E788F]/70 bg-clip-text text-transparent font-intrument font-medium">
          Remote Developer
        </h1>
        <IconButton />
        <IconButton />
      </div>
    </div>

    <div className="text-xs sm:text-md lg:text-lg text-[#0E1C29] font-inter text-center">
      <div>I specialize in creating thoughtful and impactful products,</div>
      <div>collaborating with startups and leading brands</div>
      <Button />
    </div>

    <div className="w-full mt-5">
      <Marquee className="font-inter text-[#0E1C29]/60 text-lg py-2">
        {initialProjects.map((project, index) => (
          <ProjectCard
            key={index}
            project={project}
            index={index}
            onProjectClick={(id) => console.log(`Project ${id} clicked`)}
          />
        ))}
      </Marquee>
    </div>
  </div>
</div>

  );
}