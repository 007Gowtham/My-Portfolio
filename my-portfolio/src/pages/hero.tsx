"use client";

import { ShinyButton } from "@/components/magicui/shiny-button";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Hero() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <style jsx global>{`
        @keyframes float-left {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(5px, -10px) rotate(1deg); }
          50% { transform: translate(-3px, -15px) rotate(-1deg); }
          75% { transform: translate(8px, -8px) rotate(0.5deg); }
        }
        
        @keyframes float-right {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          20% { transform: translate(-8px, -12px) rotate(-1deg); }
          40% { transform: translate(6px, -18px) rotate(1deg); }
          60% { transform: translate(-4px, -10px) rotate(-0.5deg); }
          80% { transform: translate(10px, -14px) rotate(0.8deg); }
        }
        
        .cloud-float-left {
          animation: float-left 6s ease-in-out infinite;
        }
        
        .cloud-float-right {
          animation: float-right 8s ease-in-out infinite;
        }
      `}</style>
      
      <div className="relative grid grid-cols-1 place-items-center w-full overflow-hidden">
        {/* Main Title with subtle parallax */}
        <div 
          className="absolute w-full z-0 top-20 transition-transform duration-75 ease-out"
          style={{
            transform: `translateY(${scrollY * 0.1}px)`,
          }}
        >
        
          <h1 className="text-[#0E1C29] text-7xl sm:text-[150px] lg:text-[200px] xl:text-[300px] 2xl:text-[400px] text-center w-full font-bold leading-none font-intermedium tracking-tight drop-shadow-lg">
            Gowtham
          </h1>
        </div>

        {/* Left Cloud with parallax and floating animation */}
        <div 
          className="absolute top-20 left-[15%] sm:top-20 sm:left-[20%] 2xl:top-15 z-25 transition-transform duration-75 ease-out cloud-float-left"
          style={{
            transform: `translateY(${scrollY * 0.2}px) translateX(${scrollY * 0.05}px)`,
          }}
        >
          <div className="relative max-w-[80px] sm:max-w-[150px] lg:max-w-[200px] xl:max-w-[250px] 2xl:max-w-[350px]">
            <Image
              src='/hero/cloud.svg'
              alt=""
              width={1000}
              height={50}
              className="object-cover"
            />
          </div>
        </div>

        {/* Right Cloud with different parallax speed and floating animation */}
        <div 
          className="absolute top-30 right-[15%] sm:top-40   sm:right-[5%] lg:top-50 xl:top-70 2xl:top-80 transition-transform duration-75 ease-out cloud-float-right"
          style={{
            transform: `translateY(${scrollY * 0.15}px) translateX(${scrollY * -0.03}px)`,
          }}
        >
          <div className="relative max-w-[100px] sm:max-w-[270px] lg:max-w-[350px] xl:max-w-[450px] 2xl:max-w-[650px]">
            <Image
              src='/hero/cloud4.svg'
              alt=""
              width={1000}
              height={50}
              className="object-cover"
            />
          </div>
        </div>

        {/* Main Hero Image with primary parallax effect */}
        <div
          className="transition-transform duration-75  ease-out"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
          }}
        >
          <Image
            src='/hero/hero.png'
            alt=""
            width={1000}
            height={500}
            className="object-cover max-w-xs sm:max-w-xl lg:max-w-3xl 2xl:max-w-[80rem] 2xl:mt-20 mt-15 "
          />
        </div>

        {/* Bottom Left Text with parallax and responsive design */}
        <div 
          className={`absolute left-[2%] sm:left-[5%] bottom-10 sm:bottom-20 lg:bottom-20 xl:bottom-20 2xl:bottom-20 z-40 
                     text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-5xl 
                     font-inter max-w-xs sm:max-w-md md:max-w-lg lg:max-w-2xl xl:max-w-2xl 2xl:max-w-2xl
                     leading-tight sm:leading-tight md:leading-tight lg:leading-tight
                     transition-transform text-[#0E1C29] duration-75 ease-out hidden xl:block`}
          style={{
            transform: `translateY(${scrollY * -0.1}px)`,
          }}
        >
          Carter is solving problems through strategic design and compelling visuals
        </div>

        {/* Bottom Right Content with parallax and responsive design */}
        <div 
          className={`absolute right-[2%] sm:right-[5%] md:right-[8%] lg:right-[10%] xl:right-[5%] 2xl:right-[10%] 
                     gap-3 sm:gap-4 md:gap-5 lg:gap-5 xl:gap-5 2xl:gap-5 
                     xl:flex flex-col 
                     bottom-32 sm:bottom-40 md:bottom-40 lg:bottom-40 xl:bottom-40 2xl:bottom-40 
                     z-40 
                     text-sm sm:text-base md:text-lg lg:text-lg xl:text-lg 2xl:text-lg 
                     font-inter 
                     max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-lg 2xl:max-w-lg
                     transition-transform duration-75 ease-out hidden `}
          style={{
            transform: `translateY(${scrollY * -0.05}px)`,
          }}
        >
          <div className="leading-relaxed ">
            As a digital product designer with a strong focus on visual design and Framer websites, he collaborates closely with teams to craft seamless, user-centered experiences. A reliable partner in bringing ideas to life
          </div>
          <button className="bg-black text-white rounded-2xl w-full max-w-[120px] sm:max-w-[140px] md:max-w-[150px] lg:max-w-[150px] font-inter font-normal px-3 py-2 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm sm:text-base blur-[0.5px] shadow-[0px_1.34px_0.53px_-0.625px_rgba(0,0,0,0.09),0px_3.18px_1.27px_-1.25px_rgba(0,0,0,0.09),0px_5.81px_2.32px_-1.875px_rgba(0,0,0,0.08),0px_9.66px_3.86px_-2.5px_rgba(0,0,0,0.08),0px_15.6px_6.24px_-3.125px_rgba(0,0,0,0.07),0px_25.53px_10.21px_-3.75px_rgba(0,0,0,0.06),0px_43.96px_17.58px_-4.375px_rgba(0,0,0,0.04),0px_80px_32px_-5px_rgba(0,0,0,0)]">
            Contact Now
          </button>
        </div>
        <div 
          className={` absolute flex flex-col justify-center gap-1  items-center px-10  bottom-5 xl:hidden`}
          style={{
            transform: `translateY(${scrollY * -0.05}px)`,
          }}
        >
           <div className="leading-relaxed  text-[#0E1C29] max-w-md text-xs md:text-xl sm:text-lg font-intermedium">
            As a digital product designer with a strong focus on visual design and Framer websites, he collaborates closely with teams to craft seamless, user-centered experiences. A reliable partner in bringing ideas to life
          </div>
          <button className="bg-black text-white rounded-2xl w-full max-w-[120px] sm:max-w-[140px] md:max-w-[150px] lg:max-w-[150px] font-inter font-normal px-3 py-2 sm:px-4 sm:py-3 md:px-4 md:py-3 text-sm sm:text-base blur-[0.5px] shadow-[0px_1.34px_0.53px_-0.625px_rgba(0,0,0,0.09),0px_3.18px_1.27px_-1.25px_rgba(0,0,0,0.09),0px_5.81px_2.32px_-1.875px_rgba(0,0,0,0.08),0px_9.66px_3.86px_-2.5px_rgba(0,0,0,0.08),0px_15.6px_6.24px_-3.125px_rgba(0,0,0,0.07),0px_25.53px_10.21px_-3.75px_rgba(0,0,0,0.06),0px_43.96px_17.58px_-4.375px_rgba(0,0,0,0.04),0px_80px_32px_-5px_rgba(0,0,0,0)]">
            Contact Now
          </button>
        </div>
      </div>
    </>
  );
}