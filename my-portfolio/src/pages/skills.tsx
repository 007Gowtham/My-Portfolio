'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Marquee } from '@/components/magicui/marquee';
import { Header } from '@/components/sections/ui';
import { ApiService } from '@/api/ApiService';
import { API_CONFIG, ENDPOINTS } from '@/lib/config';

interface Testimonial {
  id?: number;
  name: string;
  linkedin_link: string;
  description: string;
  image: File | null;
  created_at?: string;
  updated_at?: string;
}

const useService = new ApiService<Testimonial>(`${API_CONFIG.BASE_URL}${ENDPOINTS.TESTIMONIALS}`);

// Individual review card component - keeping exact same UI
const ReviewCard = ({
  img,
  name,
  username,
  body,
}: {
  img: string;
  name: string;
  username: string;
  body: string;
}) => {
  return (
    <motion.figure
      whileHover={{ scale: 1.03 }}
      transition={{ type: "spring", stiffness: 300 }}
      className="relative w-64 sm:w-72 md:w-80 lg:w-80 xl:w-80 m-2 sm:m-3 md:m-4 p-6 sm:p-8 md:p-10 bg-[#F0F8FF] cursor-pointer blur-[0.5px] overflow-hidden rounded-xl border shadow-lg"
    >
      <div className="flex flex-row text-[#0E1C29] items-center gap-3">
        <img
          className="rounded-full w-8 h-8 sm:w-10 sm:h-10 md:w-10 md:h-10"
          alt={`${name}'s avatar`}
          src={img}
        />
        <div className="flex flex-col">
          <figcaption className="text-sm sm:text-base font-medium">{name}</figcaption>
          <p className="text-xs sm:text-sm">{username}</p>
        </div>
      </div>
      <blockquote className="mt-3 sm:mt-4 text-xs sm:text-sm leading-relaxed">"{body}"</blockquote>
    </motion.figure>
  );
};

const SkillsShowcase = () => {
  const [formData, setFormData] = useState<Testimonial[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await useService.getAll();
        // Ensure data is an array
        const testimonialsArray = Array.isArray(data) ? data : [data].filter(Boolean);
        setFormData(testimonialsArray);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Transform testimonial data to match ReviewCard props
  const reviews = formData.map((testimonial) => {
    // Convert File to URL or use placeholder
    const getImageUrl = () => {
      if (testimonial.image instanceof File) {
        return URL.createObjectURL(testimonial.image);
      }
      return `https://ui-avatars.com/api/?name=${encodeURIComponent(testimonial.name)}&background=0E1C29&color=fff&size=128`;
    };

    // Extract username from LinkedIn URL
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
    };
  });

  return (
    <div className='w-full h-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 md:py-20 flex flex-col gap-8 sm:gap-10'>

      <Header title='Client' heading='Crafting Digital Excellence' description='            Building smooth and engaging digital interactions that elevate user satisfaction' />

      {/* Marquee Section with Top/Bottom Masking */}
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

        <div className="flex sm:hidden w-full justify-center">
          <Marquee pauseOnHover vertical className="[--duration:20s]">
            <div className="flex font-inter flex-col gap-4">
              {reviews.slice(0, 8).map((review, index) => (
                <ReviewCard key={`mobile-${review.username}-${index}`} {...review} />
              ))}
            </div>
          </Marquee>
        </div>

        <div className="hidden sm:flex md:hidden font-inter w-full justify-center gap-4">
          <Marquee pauseOnHover vertical className="[--duration:25s]">
            <div className="flex font-inter flex-col gap-5">
              {reviews.slice(0, 6).map((review, index) => (
                <ReviewCard key={`tablet-1-${review.username}-${index}`} {...review} />
              ))}
            </div>
          </Marquee>

          <Marquee reverse pauseOnHover vertical className="[--duration:28s]">
            <div className="flex  font-inter flex-col gap-5">
              {reviews.slice(4, 10).map((review, index) => (
                <ReviewCard key={`tablet-2-${review.username}-${index}`} {...review} />
              ))}
            </div>
          </Marquee>
        </div>

        {/* Desktop: Three columns */}
        <div className="hidden md:flex w-full justify-center">
          <Marquee pauseOnHover vertical className="[--duration:25s]">
            <div className="flex font-inter flex-col gap-6">
              {reviews.map((review, index) => (
                <ReviewCard key={`desktop-1-${review.username}-${index}`} {...review} />
              ))}
            </div>
          </Marquee>

          <Marquee reverse pauseOnHover vertical className="[--duration:30s]">
            <div className="flex font-inter flex-col gap-6">
              {reviews.slice(3, 9).map((review, index) => (
                <ReviewCard key={`desktop-2-${review.username}-${index}`} {...review} />
              ))}
            </div>
          </Marquee>

          <Marquee pauseOnHover vertical className="[--duration:28s]">
            <div className="xl:flex  hidden font-inter flex-col gap-6">
              {reviews.slice(6).map((review, index) => (
                <ReviewCard key={`desktop-3-${review.username}-${index}`} {...review} />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default SkillsShowcase;