"use client";
import Button from "@/components/sections/button";
import { ShinyButton } from "@/components/magicui/shiny-button";
import { Marquee } from "@/components/magicui/marquee";
import Image from "next/image";
import { VSCodeWindow } from "@/components/sections/vsCode/VSCodeWindow";
import {
  Check, BarChart3, Play, FileText, Search, Layout, List,
  TreeDeciduous,
  Share2,
  Repeat,
  Code2,
  Layers,
  BrainCircuit,
  BookOpenCheck,
  ContactRound
} from 'lucide-react';

export default function Hero() {
  const bottomServices = [
    { Icon: List, label: "Arrays & Strings" },
    { Icon: TreeDeciduous, label: "Trees" },
    { Icon: Share2, label: "Graphs" },
    { Icon: Repeat, label: "Recursion & Backtracking" },
    { Icon: Layers, label: "Dynamic Programming" },
    { Icon: Code2, label: "Bit Manipulation" },
    { Icon: Search, label: "Searching & Sorting" },
    { Icon: BarChart3, label: "Greedy & Sliding window" },
    { Icon: BrainCircuit, label: "Prefix sum & Hashing" },
    { Icon: BookOpenCheck, label: "Stacks & Queues" }
  ];




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
            <div className=" w-[45px]   h-[45px]    box-shadow-custom bg-[rgb(225,232,236)]  sm:min-w-[70px]  flex relative  rounded-xl sm:min-h-[70px] lg:min-h-[80px] lg:min-w-[80px] 2xl:min-w-[90px] 2xl:min-h-[90px]">

              <Image
                src="/hero/b2.svg"
                alt="Arrow Icon"
                width={1800}
                height={1800}
                className=" absolute  object-contain"
              />

            </div>
            <h1 className="text-4xl sm:text-7xl lg:text-8xl bg-gradient-to-b from-[#0E1C29] via-[#0E1C29]/80 to-[#5E788F]/70 bg-clip-text text-transparent font-intrument font-medium">
              I'm Gowtham
            </h1>
          </div>

          <div className="flex items-center justify-center gap-5">
            <h1 className="text-4xl sm:text-7xl lg:text-8xl bg-gradient-to-b from-[#0E1C29] via-[#0E1C29]/80 to-[#5E788F]/70 bg-clip-text text-transparent font-intrument font-medium">
              Remote Developer
            </h1>
            <div className=" w-[45px]   h-[45px]    box-shadow-custom bg-[rgb(225,232,236)]  sm:min-w-[70px]  flex relative  rounded-xl sm:min-h-[70px] lg:min-h-[80px] lg:min-w-[80px] 2xl:min-w-[90px] 2xl:min-h-[90px]">

              <Image
                src="/hero/b2.svg"
                alt="Arrow Icon"
                width={1800}
                height={1800}
                className=" absolute  object-contain"
              />

            </div>
            <div className=" w-[45px]   h-[45px]    box-shadow-custom bg-[rgb(225,232,236)]  sm:min-w-[70px]  flex relative  rounded-xl sm:min-h-[70px] lg:min-h-[80px] lg:min-w-[80px] 2xl:min-w-[90px] 2xl:min-h-[90px]">

              <Image
                src="/hero/b2.svg"
                alt="Arrow Icon"
                width={1000}
                height={1000}
                className=" absolute  object-contain"
              />

            </div>
          </div>
        </div>

        <div className="text-xs sm:text-md lg:text-lg text-[#0E1C29] font-inter text-center">
          <div>I specialize in creating thoughtful and impactful products,</div>
          <div>collaborating with startups and leading brands</div>
          <Button />
        </div>
        {/* //code editor */}

        <div
          className="relative flex h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] xl:h-[700px] w-full flex-row items-center justify-center overflow-hidden"
          style={{
            maskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
            maskComposite: "intersect",
            WebkitMaskComposite: "intersect",
          }}
        >
          <div className=" w-full h-full px-3 sm:px-5 md:px-7 lg:px-12 xl:px-[10%] 2xl:px-[16%]  ">
            <div className=" relative flex  justify-center items-center p-4 custom-card px-auto">
              <VSCodeWindow />
            </div>
          </div>
        </div>
        {/* 
        <div className="mt-4 sm:mt-6 md:mt-8 overflow-hidden">
     
          <div className="flex overflow-hidden  [mask-image:_linear-gradient(to_right,transparent_0,_black_10%,_black_90%,transparent_100%)]">
            <div className="flex animate-scroll-rightToleft gap-5">
              {bottomServices.concat(bottomServices).map((tech, index) => (
                <div
                  key={index}
                  className="tech-card flex   px-3 sm:px-4 md:px-6 py-2 sm:py-3 gap-2 sm:gap-3 rounded-2xl sm:rounded-3xl md:rounded-4xl"
                  style={{ width: "max-content" }}
                >
                  <div className=' grid place-items-center'>
                    <tech.Icon size={40} className="text-[#0E1C29] " />
                  </div>
                  <div className="text-3xl grid place-items-center  font-normal  font-intermedium  text-[#0E1C29] tracking-wide text-glow">{tech.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div> */}


      </div>
    </div>
  );
  // ...existing code...
}