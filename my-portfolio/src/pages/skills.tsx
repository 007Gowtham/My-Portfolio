'use client';
import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Header } from '@/components/sections/ui';
import { dummyTestimonials } from '@/lib/dummyData';
import { cn } from "@/lib/utils";
import { ComponentPropsWithoutRef } from "react";

// ==================== MARQUEE COMPONENT ====================
interface MarqueeProps extends ComponentPropsWithoutRef<"div"> {
  className?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  children: React.ReactNode;
  vertical?: boolean;
  repeat?: number;
}

function Marquee({
  className,
  reverse = false,
  pauseOnHover = false,
  children,
  vertical = false,
  repeat = 4,
  ...props
}: MarqueeProps) {
  return (
    <div
      {...props}
      className={cn(
        "group flex overflow-hidden p-2 [--duration:40s] [--gap:1rem] [gap:var(--gap)]",
        {
          "flex-row": !vertical,
          "flex-col": vertical,
        },
        className,
      )}
    >
      {Array(repeat)
        .fill(0)
        .map((_, i) => (
          <div
            key={i}
            className={cn("flex shrink-0 justify-around [gap:var(--gap)]", {
              "animate-marquee flex-row": !vertical,
              "animate-marquee-vertical flex-col": vertical,
              "group-hover:[animation-play-state:paused]": pauseOnHover,
              "[animation-direction:reverse]": reverse,
            })}
          >
            {children}
          </div>
        ))}
    </div>
  );
}

// ==================== REVIEW CARD COMPONENT (Document 2 Style) ====================
const ReviewCard = ({
  img,
  name,
  username,
  body,
  linkedinLink,
  rating,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
  linkedinLink: string;
  rating: number;
}) => {
  const handleCardClick = () => {
    window.open(linkedinLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.figure
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      onClick={handleCardClick}
      className="relative w-64 sm:w-72 md:w-80 lg:w-80 xl:w-90 2xl:w-[380px] m-2 sm:m-3 md:m-4 p-6 sm:p-8 md:p-10 bg-[#F0F8FF] cursor-pointer overflow-hidden rounded-xl border shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="flex flex-row text-[#0E1C29] items-center gap-3">
        <Image
          className="rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10 object-cover"
          alt={`${name}'s avatar`}
          src={img}
          width={40}
          height={40}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm sm:text-base font-medium">{name}</figcaption>
          <p className="text-xs sm:text-sm text-slate-600">{username}</p>
        </div>
      </div>
      
      <blockquote className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed text-[#0E1C29]">
        <q>{body}</q>
      </blockquote>

      {/* Rating stars */}
      <div className="flex items-center gap-1 mt-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <svg
            key={i}
            className={`w-4 h-4 transition-transform duration-300 ${
              i < rating ? "text-[#0E1C29]" : "text-gray-300"
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.372 1.24.588 1.81l-3.383 2.46a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.383-2.46a1 1 0 00-1.175 0l-3.383 2.46c-.784.57-1.839-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.784-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
          </svg>
        ))}
      </div>
    </motion.figure>
  );
};

// ==================== MAIN COMPONENT ====================
const SkillsShowcase = () => {
  const formData = dummyTestimonials;

  // Transform testimonial data
  const reviews = formData.map((testimonial) => {
    const getImageUrl = () => {
      if (testimonial.image) {
        return testimonial.image;
      }
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=0E1C29&color=fff&size=128`;
    };

    const getUsername = () => {
      try {
        const url = new URL(testimonial.linkedin_link);
        const pathSegments = url.pathname.split('/');
        const inIndex = pathSegments.indexOf('in');
        if (inIndex !== -1 && pathSegments[inIndex + 1]) {
          return `@${pathSegments[inIndex + 1]}`;
        }
        return testimonial.linkedin_link;
      } catch {
        return testimonial.linkedin_link;
      }
    };

    return {
      img: getImageUrl(),
      name: testimonial.name,
      username: getUsername(),
      body: testimonial.description,
      linkedinLink: testimonial.linkedin_link,
      rating: testimonial.rating
    };
  });

  // Split reviews into columns
  const splitIntoColumns = <T,>(arr: T[], numColumns: number) => {
    const columns = Array.from({ length: numColumns }, () => [] as T[]);
    arr.forEach((item, index) => {
      columns[index % numColumns].push(item);
    });
    return columns;
  };

  const columns1 = splitIntoColumns(reviews, 1);
  const columns2 = splitIntoColumns(reviews, 2);
  const columns3 = splitIntoColumns(reviews, 3);

  return (
    <div className='w-full h-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 md:py-20 flex flex-col gap-8 sm:gap-10'>
      
      <Header 
        title='Client' 
        heading='Crafting Digital Excellence' 
        description='Building smooth and engaging digital interactions that elevate user satisfaction'
      />
      
      {/* Marquee Section with Top/Bottom Masking */}
      <div
        className="relative flex h-[400px] sm:h-[500px] md:h-[600px] lg:h-[650px] xl:h-[700px] w-full flex-row items-center justify-center overflow-hidden"
        style={{
          maskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to bottom, transparent 0%, black 15%, black 85%, transparent 100%), linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          maskComposite: "intersect",
          WebkitMaskComposite: "source-in",
        }}
      >
        {/* Mobile: Single column */}
        <div className="flex sm:hidden w-full justify-center">
          <Marquee pauseOnHover vertical className="[--duration:25s]">
            <div className="flex font-inter flex-col gap-4">
              {columns1[0].map((review, index) => (
                <ReviewCard key={`mobile-${index}`} {...review} />
              ))}
            </div>
          </Marquee>
        </div>

        {/* Tablet: Two columns */}
        <div className="hidden sm:flex xl:hidden font-inter w-full justify-center gap-4">
          <Marquee pauseOnHover vertical className="[--duration:30s]">
            <div className="flex font-inter flex-col gap-5">
              {columns2[0].map((review, index) => (
                <ReviewCard key={`tablet-1-${index}`} {...review} />
              ))}
            </div>
          </Marquee>

          <Marquee reverse pauseOnHover vertical className="[--duration:35s]">
            <div className="flex font-inter flex-col gap-5">
              {columns2[1].map((review, index) => (
                <ReviewCard key={`tablet-2-${index}`} {...review} />
              ))}
            </div>
          </Marquee>
        </div>

        {/* Desktop: Three columns */}
        <div className="hidden xl:flex w-full justify-center">
          <Marquee pauseOnHover vertical className="[--duration:35s]">
            <div className="flex font-inter flex-col gap-6">
              {columns3[0].map((review, index) => (
                <ReviewCard key={`desktop-1-${index}`} {...review} />
              ))}
            </div>
          </Marquee>

          <Marquee reverse pauseOnHover vertical className="[--duration:40s]">
            <div className="flex font-inter flex-col gap-6">
              {columns3[1].map((review, index) => (
                <ReviewCard key={`desktop-2-${index}`} {...review} />
              ))}
            </div>
          </Marquee>

          <Marquee pauseOnHover vertical className="[--duration:38s]">
            <div className="flex font-inter flex-col gap-6">
              {columns3[2].map((review, index) => (
                <ReviewCard key={`desktop-3-${index}`} {...review} />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default SkillsShowcase;