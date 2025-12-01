

import React from "react";
import Image, { type StaticImageData } from "next/image";
import { Button, Header } from "@/components/sections/ui";

// service assets moved to src/assert
import ServiceIcon from '@/assert/service/SVG.svg';
import ServiceCover1 from '@/assert/service/cover1.svg';
import ServiceCover2 from '@/assert/service/cover2.svg';
import frontend from '@/assert/service/atom.png';
import backend from '@/assert/service/java.png';
import cloud from '@/assert/service/cloud.png'


interface Service {
  id: number;
  title: string;
  description: string;
  icon: string | StaticImageData;
  image?: string | StaticImageData;
  hasImage: boolean;
  bgColor: string;
}

interface ServiceCardProps {
  service: Service;
  isLarge?: boolean;
  className?: string;
}

export default function Services() {
  const services: Service[] = [
    {
      id: 1,
      title: "UI & UX Design",
      description:
        "Designing clean, user-centered interfaces that enhance usability and elevate brand presence. I focus on visual balance, accessibility, and a seamless flow for every interaction.",
      icon: ServiceIcon,
      image: ServiceCover2,
      hasImage: true,
      bgColor: "bg-white"
    },
    {
      id: 2,
      title: "Frontend Development",
      description:
        "Developing responsive, high-performance web applications using React and modern frameworks. My goal is to deliver fast, elegant, and visually consistent user experiences.",
      icon: frontend,
      hasImage: false,
      bgColor: "bg-black"
    },
    {
      id: 3,
      title: "Backend Development",
      description:
        "Building robust and scalable backend systems using Node.js, Express, and MongoDB. I ensure secure APIs, optimized data handling, and smooth communication between client and server.",
      icon: backend,
      hasImage: false,
      bgColor: "bg-black"
    },
    {
      id: 4,
      title: "Creative Web Experiences",
      description:
        "Combining design and development to create interactive, visually immersive web experiences. Every project blends performance, creativity, and user delight.",
      icon: cloud,
      image: ServiceCover1,
      hasImage: true,
      bgColor: "bg-white"
    }
  ];
  

  const ServiceCard: React.FC<ServiceCardProps> = ({ service, isLarge = false, className = "" }) => (
    <div className={`shadow-lg rounded-2xl bg-[#F6FBFF] ${className} ${isLarge
      ? 'grid grid-cols-1 md:grid-cols-4 gap-5 p-5'
      : 'flex items-center p-5'
      }`}>
      {service.hasImage && isLarge && (
        <div
          className="relative col-span-1 md:col-span-2 rounded-2xl h-48 md:h-auto"
          style={{
            boxShadow: `0px 0.7px 0.7px -0.66px rgba(16, 49, 77, 0.24),
                        0px 1.8px 1.8px -1.33px rgba(16, 49, 77, 0.23),
                        0px 3.6px 3.6px -2px rgba(16, 49, 77, 0.22),
                        0px 6.87px 6.87px -2.66px rgba(16, 49, 77, 0.20),
                        0px 13.65px 13.65px -3.33px rgba(16, 49, 77, 0.16),
                        0px 30px 30px -4px rgba(16, 49, 77, 0.06)`
          }}
        >
          <Image
            src={service.image!}
            alt="Service Image"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      )}

      <div className={`flex gap-5 flex-col ${isLarge ? 'col-span-1 md:col-span-2 flex items-center' : ''
        }`}>
        <div
          className={`${service.bgColor} w-12 h-12 md:w-13 md:h-13 relative rounded-full flex justify-center items-center flex-shrink-0`}
          // style={{
          //   "boxshadow": `0px 0.7px 0.7px -0.66px rgba(16, 49, 77, 0.24),
          //               0px 1.8px 1.8px -1.33px rgba(16, 49, 77, 0.23),
          //               0px 3.6px 3.6px -2px rgba(16, 49, 77, 0.22),
          //               0px 6.87px 6.87px -2.66px rgba(16, 49, 77, 0.20),
          //               0px 13.65px 13.65px -3.33px rgba(16, 49, 77, 0.16),
          //               0px 30px 30px -4px rgba(16, 49, 77, 0.06)`
          // }}
        >
          <Image
            src={service.icon}
            alt="Icon"
            fill
            className="object-cover p-2 rounded-2xl"
          />
        </div>

        <div className="flex flex-col blur-[0.5px] gap-3">
          <h1 className="text-xl md:text-2xl font-intermedium  text-[#0E1C29] font-medium">
            {service.title}
          </h1>
          <p className="text-[#0E1C29]  font-inter text-sm md:text-md font-normal leading-relaxed">
            {service.description}
          </p>
        </div>
      </div>

      {service.hasImage && !isLarge && (
        <div
          className="relative w-20 h-20 md:w-24 md:h-24 rounded-2xl ml-4 flex-shrink-0"
          style={{
            boxShadow: `0px 0.7px 0.7px -0.66px rgba(16, 49, 77, 0.24),
                        0px 1.8px 1.8px -1.33px rgba(16, 49, 77, 0.23),
                        0px 3.6px 3.6px -2px rgba(16, 49, 77, 0.22),
                        0px 6.87px 6.87px -2.66px rgba(16, 49, 77, 0.20),
                        0px 13.65px 13.65px -3.33px rgba(16, 49, 77, 0.16),
                        0px 30px 30px -4px rgba(16, 49, 77, 0.06)`
          }}
        >
          <Image
            src={service.image!}
            alt="Service Image"
            fill
            className="object-cover rounded-2xl"
          />
        </div>
      )}
    </div>
  );


  return (
    <div className="bg-[#d8dfe5] rounded-[40px] md:rounded-[100px] items-center h-auto flex flex-col py-8 md:py-20 px-7 sm:px-25">
      {/* Header */}
      <Header title="Service" heading="Our Services" description="Explore our range of services designed to elevate your digital presence." className="mb-10" />

      {/* Services Grid */}
      <div className="w-full max-w-7xl">
        {/* Mobile: Single Column Stack */}
        <div className="block md:hidden  space-y-6">
          {services.map((service: Service) => (
            <ServiceCard
              key={service.id}
              service={service}
              isLarge={service.hasImage}
            />
          ))}
        </div>

        {/* Tablet: Single Column Layout */}
        <div className="hidden md:block xl:hidden">
          <div className="grid  grid-cols-1 gap-6">
            <ServiceCard service={services[0]} isLarge={true} />
            <ServiceCard service={services[1]} isLarge={false} />
            <ServiceCard service={services[2]} isLarge={false} />
            <ServiceCard service={services[3]} isLarge={true} />
          </div>
        </div>

        {/* Desktop: Your Exact 2x2 Grid Layout */}
        <div className="hidden xl:block">
          <div className="w-full h-[570px] px-4 gap-7 grid grid-rows-2 max-w-6xl mx-auto">
            {/* Row 1 */}
            <div className="row-span-1 grid gap-7 grid-cols-5 w-full">
              {/* Left 3 columns card - UX & UI */}
              <div className="col-span-3 shadow-lg rounded-2xl  grid p-5 grid-cols-4 gap-5 bg-[#F6FBFF]">
                <div
                  className="relative col-span-2 rounded-2xl w-full"
                  style={{
                    boxShadow: `0px 0.7px 0.7px -0.66px rgba(16, 49, 77, 0.24),
                                0px 1.8px 1.8px -1.33px rgba(16, 49, 77, 0.23),
                                0px 3.6px 3.6px -2px rgba(16, 49, 77, 0.22),
                                0px 6.87px 6.87px -2.66px rgba(16, 49, 77, 0.20),
                                0px 13.65px 13.65px -3.33px rgba(16, 49, 77, 0.16),
                                0px 30px 30px -4px rgba(16, 49, 77, 0.06)`
                  }}
                >
                  <Image
                    src={services[0].image!}
                    alt="Service Image"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
                <div className="col-span-2 flex items-center rounded-2xl">
                  <div className="flex gap-5 flex-col">
                    <div
                      className="bg-white relative w-12 h-12 rounded-full flex justify-center items-center"
                      style={{
                        boxShadow: `0px 0.7px 0.7px -0.66px rgba(16, 49, 77, 0.24),
                                    0px 1.8px 1.8px -1.33px rgba(16, 49, 77, 0.23),
                                    0px 3.6px 3.6px -2px rgba(16, 49, 77, 0.22),
                                    0px 6.87px 6.87px -2.66px rgba(16, 49, 77, 0.20),
                                    0px 13.65px 13.65px -3.33px rgba(16, 49, 77, 0.16),
                                    0px 30px 30px -4px rgba(16, 49, 77, 0.06)`
                      }}
                    >
                      <Image
                        src={services[0].icon}
                        alt="Icon"
                        fill
                        className="object-cover p-2 rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col blur-[0.5px] gap-3">
                      <h1 className="text-2xl text-[#0E1C29] font-intermedium  font-medium">{services[0].title}</h1>
                      <p className="text-[#0E1C29] text-md font-inter font-normal">
                        {services[0].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right 2 columns card - Frontend Development */}
              <div className="col-span-2 shadow-lg rounded-2xl  bg-[#F6FBFF] flex items-center">
                <div className="flex gap-5 flex-col p-5">
                  <div
                    className="bg-black w-12 h-12 relative rounded-full flex justify-center items-center"
                    style={{
                      boxShadow: `0px 0.7px 0.7px -0.66px rgba(16, 49, 77, 0.24),
                                  0px 1.8px 1.8px -1.33px rgba(16, 49, 77, 0.23),
                                  0px 3.6px 3.6px -2px rgba(16, 49, 77, 0.22),
                                  0px 6.87px 6.87px -2.66px rgba(16, 49, 77, 0.20),
                                  0px 13.65px 13.65px -3.33px rgba(16, 49, 77, 0.16),
                                  0px 30px 30px -4px rgba(16, 49, 77, 0.06)`
                    }}
                  >
                    <Image
                      src={services[1].icon}
                      alt="Icon"
                      fill
                      className="object-cover p-2 rounded-2xl"
                    />
                  </div>
                  <div className="flex flex-col blur-[0.5px] gap-3">
                    <h1 className="text-2xl text-[#0E1C29] font-intermedium  font-medium">{services[1].title}</h1>
                    <p className="text-[#0E1C29] font-inter text-md">
                      {services[1].description}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Row 2 */}
            <div className="row-span-1 grid gap-7 grid-cols-5 w-full">
              {/* Left 2 columns card - Interactive Web Experiences */}
              <div className="col-span-2 shadow-lg rounded-2xl bg-[#F6FBFF] flex items-center">
                <div className="flex gap-5 flex-col p-5">
                  <div
                    className="bg-black w-12 h-12 relative rounded-full flex justify-center items-center"
                    style={{
                      boxShadow: `0px 0.7px 0.7px -0.66px rgba(16, 49, 77, 0.24),
                                  0px 1.8px 1.8px -1.33px rgba(16, 49, 77, 0.23),
                                  0px 3.6px 3.6px -2px rgba(16, 49, 77, 0.22),
                                  0px 6.87px 6.87px -2.66px rgba(16, 49, 77, 0.20),
                                  0px 13.65px 13.65px -3.33px rgba(16, 49, 77, 0.16),
                                  0px 30px 30px -4px rgba(16, 49, 77, 0.06)`
                    }}
                  >
                    <Image
                      src={services[2].icon}
                      alt="Icon"
                      fill
                      className="object-cover p-2 rounded-2xl"
                    />
                  </div>
                  <div className="flex flex-col blur-[0.5px] gap-3">
                    <h1 className="text-2xl text-[#0E1C29] font-medium font-intermedium ">{services[2].title}</h1>
                    <p className="text-[#0E1C29]  font-inter text-md">
                      {services[2].description}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right 3 columns card - Design & Creativity */}
              <div className="col-span-3 shadow-lg rounded-2xl grid p-5 grid-cols-4 gap-5 bg-[#F6FBFF]">
                <div
                  className="relative col-span-2 rounded-2xl w-full"
                  style={{
                    boxShadow: `0px 0.7px 0.7px -0.66px rgba(16, 49, 77, 0.24),
                                0px 1.8px 1.8px -1.33px rgba(16, 49, 77, 0.23),
                                0px 3.6px 3.6px -2px rgba(16, 49, 77, 0.22),
                                0px 6.87px 6.87px -2.66px rgba(16, 49, 77, 0.20),
                                0px 13.65px 13.65px -3.33px rgba(16, 49, 77, 0.16),
                                0px 30px 30px -4px rgba(16, 49, 77, 0.06)`
                  }}
                >
                  <Image
                    src={services[3].image!}
                    alt="Service Image"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>
                <div className="col-span-2 flex items-center rounded-2xl">
                  <div className="flex gap-5 flex-col">
                    <div
                      className="bg-white w-12 h-12 relative rounded-full flex justify-center items-center"
                      style={{
                        boxShadow: `0px 0.7px 0.7px -0.66px rgba(16, 49, 77, 0.24),
                                    0px 1.8px 1.8px -1.33px rgba(16, 49, 77, 0.23),
                                    0px 3.6px 3.6px -2px rgba(16, 49, 77, 0.22),
                                    0px 6.87px 6.87px -2.66px rgba(16, 49, 77, 0.20),
                                    0px 13.65px 13.65px -3.33px rgba(16, 49, 77, 0.16),
                                    0px 30px 30px -4px rgba(16, 49, 77, 0.06)`
                      }}
                    >
                      <Image
                        src={services[3].icon}
                        alt="Icon"
                        fill
                        className="object-cover p-2 rounded-2xl"
                      />
                    </div>
                    <div className="flex flex-col blur-[0.5px] gap-3">
                      <h1 className="text-2xl font-intermedium  text-[#0E1C29] font-medium">{services[3].title}</h1>
                      <p className="text-[#0E1C29]  font-inter text-md">
                        {services[3].description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button />
    </div>
  );
} 