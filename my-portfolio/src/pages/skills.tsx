'use client';
import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Header } from '@/components/sections/ui';
import { dummyTestimonials } from '@/lib/dummyData';

// Testimonial interface removed as it's not used directly

// Professional testimonial card component - Process-style design
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
  rating:number;
}) => {
  const handleCardClick = () => {
    window.open(linkedinLink, '_blank', 'noopener,noreferrer');
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      transition={{ type: "spring", stiffness: 400, damping: 25 }}
      onClick={handleCardClick}
      className="bg-[#F6FBFF] shadow-xl border-b rounded-2xl p-5 flex gap-5 flex-col w-full max-w-sm mx-auto cursor-pointer hover:shadow-2xl transition-all duration-300"
    >
      {/* Profile section with avatar and info */}
      <div className="flex items-center gap-4">
        <div className="relative flex-shrink-0">
          <Image
            className="rounded-full w-12 h-12 object-cover ring-2 ring-white shadow-lg"
            alt={`${name}'s avatar`}
            src={img}
            width={48}
            height={48}
          />
          {/* Verified badge */}
          <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full border-2 border-white flex items-center justify-center">
            <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <div className="flex flex-col min-w-0">
          <h3 className="text-lg font-intermedium text-[#0E1C29] truncate">{name}</h3>
          <p className="text-sm text-slate-500 font-medium truncate">{username}</p>
        </div>
      </div>

      {/* Quote section */}
      <div className="flex flex-col gap-4 text-black">
        <div className="text-base font-inter text-[#0E1C29] leading-relaxed">
           “{body}”
        </div>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-dotted border-gray-300"></div>

      {/* Rating/Status section */}
     {/* Rating/Status section */}
<div className="flex justify-start items-center">
  <div className="flex items-center gap-1 rounded-full">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-5 h-5 transition-transform duration-300 ${
          i < rating ? "text-[#0E1C29] scale-110" : "text-gray-400"
        }`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.967a1 1 0 00.95.69h4.175c.969 0 1.372 1.24.588 1.81l-3.383 2.46a1 1 0 00-.364 1.118l1.286 3.967c.3.921-.755 1.688-1.54 1.118l-3.383-2.46a1 1 0 00-1.175 0l-3.383 2.46c-.784.57-1.839-.197-1.54-1.118l1.286-3.967a1 1 0 00-.364-1.118L2.05 9.394c-.784-.57-.38-1.81.588-1.81h4.175a1 1 0 00.95-.69l1.286-3.967z" />
      </svg>
    ))}
  </div>

</div>



    </motion.div>
  );
};

const SkillsShowcase = () => {
  // Use dummy data directly
  const formData = dummyTestimonials;

  // Transform testimonial data to match ReviewCard props
  const reviews = formData.map((testimonial) => {
    // Convert File to URL or use placeholder
    const getImageUrl = () => {
      if (testimonial.image) {
        return testimonial.image;
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
      linkedinLink: testimonial.linkedin_link,
      rating:testimonial.rating
    };
  });

  return (
    <div className="w-screen h-auto py-10 flex flex-col px-4 2xl:px-95 xl:px-40 xl:py-20 justify-center">
      <Header title="Client" heading="Crafting Digital Excellence" description="Building smooth and engaging digital interactions that elevate user satisfaction" />

      {/* Professional Grid Layout - Process Style */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 px-4 sm:px-15 p-2 h-auto w-full rounded-2xl">
        {reviews.map((review, index) => (
          <ReviewCard key={`testimonial-${review.username}-${index}`} {...review} />
        ))}
      </div>
    </div>
  );
};

export default SkillsShowcase;