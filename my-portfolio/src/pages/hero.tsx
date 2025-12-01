"use client";

import Image from "next/image";

import { VSCodeWindow } from "@/components/sections/vsCode/VSCodeWindow";

import { Button} from "@/components/sections/ui";
// hero background images moved to src/assert
import HeroB3 from '@/assert/hero/b3.svg';
import HeroB2 from '@/assert/hero/b2.svg';
import HeroB1 from '@/assert/hero/b1.svg';


export default function Hero() {


  return (
    <div className="relative w-full h-auto flex flex-col bg-transparent items-center justify-center gap-5 overflow-hidden">
      <Image
        src={HeroB3}
        alt="Background"
        fill
        className="object- absolute inset-0 z-[-1]"
        priority
      />

      <div className="flex flex-col my-20 lg:my-28 items-center justify-center w-full h-full gap-5">
        <div className="flex flex-col gap-7">
          <div className="flex items-center justify-center gap-5">
            <div className=" w-[45px]   h-[45px]    box-shadow-custom bg-[rgb(225,232,236)]  sm:min-w-[70px]  flex relative  rounded-xl sm:min-h-[70px] lg:min-h-[80px] lg:min-w-[80px] 2xl:min-w-[90px] 2xl:min-h-[90px]">

              <Image
                src={HeroB2}
                alt="Arrow Icon"
                fill
                className=" absolute bg-black rounded-xl "
              />

            </div>
            <h1 className="text-4xl sm:text-7xl lg:text-8xl bg-gradient-to-b from-[#0E1C29] via-[#0E1C29]/80 to-[#5E788F]/70 bg-clip-text text-transparent font-intrument font-medium">
              I m Gowtham
            </h1>
          </div>

          <div className="flex items-center justify-center gap-5">
            <h1 className="text-4xl sm:text-7xl lg:text-8xl bg-gradient-to-b from-[#0E1C29] via-[#0E1C29]/80 to-[#5E788F]/70 bg-clip-text text-transparent font-intrument font-medium">
              Software Developer
            </h1>
            <div className=" w-[45px]   h-[45px]    box-shadow-custom bg-[rgb(225,232,236)]  sm:min-w-[70px]  flex relative  rounded-xl sm:min-h-[70px] lg:min-h-[80px] lg:min-w-[80px] 2xl:min-w-[90px] 2xl:min-h-[90px]">

              <Image
                src={HeroB1}
                alt="Arrow Icon"
                width={1800}
                height={1800}
                className=" absolute  object-contain"
              />

            </div>
            <div className=" w-[45px]   h-[45px]    box-shadow-custom bg-[rgb(225,232,236)]  sm:min-w-[70px]  flex relative  rounded-xl sm:min-h-[70px] lg:min-h-[80px] lg:min-w-[80px] 2xl:min-w-[90px] 2xl:min-h-[90px]">

              <Image
                src={HeroB2}
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
       


      </div>
    </div>
  );
}
