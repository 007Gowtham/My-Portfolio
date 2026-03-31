"use client";

import Image from "next/image";

import { Button } from "@/components/sections/ui";

// hero background images moved to src/assert
import HeroB3 from '@/assert/hero/b3.svg';
import HeroB2 from '@/assert/hero/b2.svg';
import HeroB1 from '@/assert/hero/b1.svg';
import HeroImage from '@/assert/hero/image.png';

export default function Hero() {

  return (
    <div className="relative w-full  h-auto flex flex-col bg-transparent items-center justify-center gap-5 overflow-hidden">
      <Image
        src={HeroImage}
        alt="Lighting Texture"
        fill
        className="object-cover absolute inset-0 z-[-2]"
        priority
      />
      <Image
        src={HeroB3}
        alt="Background"
        fill
        className="object-cover absolute inset-0 z-[-1]"
        priority
      />

      <div className="flex flex-col my-20 lg:my-28 items-center justify-center w-full h-full gap-5">
        <div className="flex flex-col  gap-3">
          <div className="flex items-center justify-center gap-5">
            <div className=" w-[45px]   h-[45px]  mb-4  box-shadow-custom bg-[rgb(225,232,236)]  sm:min-w-[70px]  flex relative  rounded-xl sm:min-h-[70px] lg:min-h-[80px] lg:min-w-[80px] 2xl:min-w-[90px] 2xl:min-h-[90px]">

              <Image
                src={HeroB2}
                alt="Arrow Icon"
                fill
                className=" absolute bg-black rounded-xl "
              />

            </div>
            <h1
              className="text-4xl sm:text-7xl lg:text-8xl bg-clip-text text-transparent font-intrument font-medium pb-2 lg:pb-4"
              style={{ backgroundImage: 'linear-gradient(180deg, rgb(14, 28, 41) 34%, rgba(94, 120, 143, 0.5) 124%)' }}
            >
              I&apos;m Gowtham
            </h1>
          </div>

          <div className="flex items-center justify-center gap-5">
            <h1
              className="text-4xl sm:text-7xl lg:text-8xl bg-clip-text text-transparent font-intrument font-medium pb-2 lg:pb-4"
              style={{ backgroundImage: 'linear-gradient(180deg, rgb(14, 28, 41) 34%, rgba(94, 120, 143, 0.5) 124%)' }}
            >
              Software Developer
            </h1>
            <div className=" w-[45px]   h-[45px]    box-shadow-custom bg-[rgb(225,232,236)]  sm:min-w-[70px]  flex relative  rounded-xl sm:min-h-[70px] lg:min-h-[80px] lg:min-w-[80px] 2xl:min-w-[90px] 2xl:min-h-[90px]">

              <Image
                src={HeroB1}
                alt="Arrow Icon"
                fill
                className="absolute object-contain"
              />

            </div>
            <div className=" w-[45px]   h-[45px]    box-shadow-custom bg-[rgb(225,232,236)]  sm:min-w-[70px]  flex relative  rounded-xl sm:min-h-[70px] lg:min-h-[80px] lg:min-w-[80px] 2xl:min-w-[90px] 2xl:min-h-[90px]">

              <Image
                src={HeroB2}
                alt="Arrow Icon"
                fill
                className="absolute object-contain"
              />

            </div>
          </div>
        </div>

        <div className="text-xs sm:text-md lg:text-lg text-[#0E1C29] font-inter text-center">
          <div>I specialize in creating thoughtful and impactful products,</div>
          <Button />
        </div>


      </div>
    </div>
  );
}
