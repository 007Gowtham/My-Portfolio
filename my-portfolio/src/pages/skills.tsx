'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Marquee } from '@/components/magicui/marquee';
import Header from '@/components/sections/header';

// Individual review card component
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

// Main component
const SkillsShowcase = () => {
  const reviews = [
    {
      name: "Jack",
      username: "@jack",
      body: "I've never seen anything like this before. It's amazing. I love it.",
      img: "https://avatar.vercel.sh/jack",
    },
    {
      name: "Jill",
      username: "@jill",
      body: "I don't know what to say. I'm speechless. This is amazing.",
      img: "https://avatar.vercel.sh/jill",
    },
    {
      name: "John",
      username: "@john",
      body: "I'm at a loss for words. This is amazing. I love it.",
      img: "https://avatar.vercel.sh/john",
    },
    {
      name: "Jane",
      username: "@jane",
      body: "This completely transformed our workflow. The attention to detail is incredible.",
      img: "https://avatar.vercel.sh/jane",
    },
    {
      name: "Alex",
      username: "@alex",
      body: "Outstanding technical expertise combined with creative problem-solving.",
      img: "https://avatar.vercel.sh/alex",
    },
    {
      name: "Sarah",
      username: "@sarah",
      body: "The innovation and quality here sets a new standard in the industry.",
      img: "https://avatar.vercel.sh/sarah",
    },
    {
      name: "Mike",
      username: "@mike",
      body: "Seamless integration and flawless execution. This is next-level work.",
      img: "https://avatar.vercel.sh/mike",
    },
    {
      name: "Emma",
      username: "@emma",
      body: "The performance improvements exceeded all our expectations by far.",
      img: "https://avatar.vercel.sh/emma",
    },
    {
      name: "David",
      username: "@david",
      body: "Clean, efficient, and brilliantly architected. A masterpiece of engineering.",
      img: "https://avatar.vercel.sh/david",
    },
    {
      name: "Lisa",
      username: "@lisa",
      body: "The user experience is phenomenal. Every interaction feels perfectly crafted.",
      img: "https://avatar.vercel.sh/lisa",
    },
    {
      name: "Tom",
      username: "@tom",
      body: "Scalable, maintainable, and elegant. This is how modern software should be built.",
      img: "https://avatar.vercel.sh/tom",
    },
    {
      name: "Anna",
      username: "@anna",
      body: "The technical depth and creative vision here is truly impressive.",
      img: "https://avatar.vercel.sh/anna",
    },
  ];

  return (
    <div className='w-full h-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-10 sm:py-16 md:py-20 flex flex-col gap-8 sm:gap-10'>
      
            <Header title='Client' heading='Crafting Digital Excellence' description='            Building smooth and engaging digital interactions that elevate user satisfaction'/>
      
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
        {/* Mobile: Single column */}
        <div className="flex sm:hidden w-full justify-center">
          <Marquee pauseOnHover vertical className="[--duration:20s]">
            <div className="flex font-inter flex-col gap-4">
              {reviews.slice(0, 8).map((review) => (
                <ReviewCard key={`mobile-${review.username}`} {...review} />
              ))}
            </div>
          </Marquee>
        </div>

        {/* Tablet: Two columns */}
        <div className="hidden sm:flex md:hidden font-inter w-full justify-center gap-4">
          <Marquee pauseOnHover vertical className="[--duration:25s]">
            <div className="flex font-inter flex-col gap-5">
              {reviews.slice(0, 6).map((review) => (
                <ReviewCard key={`tablet-1-${review.username}`} {...review} />
              ))}
            </div>
          </Marquee>

          <Marquee reverse pauseOnHover vertical className="[--duration:28s]">
            <div className="flex  font-inter flex-col gap-5">
              {reviews.slice(4, 10).map((review) => (
                <ReviewCard key={`tablet-2-${review.username}`} {...review} />
              ))}
            </div>
          </Marquee>
        </div>

        {/* Desktop: Three columns */}
        <div className="hidden md:flex w-full justify-center">
          <Marquee pauseOnHover vertical className="[--duration:25s]">
            <div className="flex font-inter flex-col gap-6">
              {reviews.slice(0, 6).map((review) => (
                <ReviewCard key={`desktop-1-${review.username}`} {...review} />
              ))}
            </div>
          </Marquee>

          <Marquee reverse pauseOnHover vertical className="[--duration:30s]">
            <div className="flex font-inter flex-col gap-6">
              {reviews.slice(3, 9).map((review) => (
                <ReviewCard key={`desktop-2-${review.username}`} {...review} />
              ))}
            </div>
          </Marquee>

          <Marquee pauseOnHover vertical className="[--duration:28s]">
            <div className="xl:flex  hidden font-inter flex-col gap-6">
              {reviews.slice(6).map((review) => (
                <ReviewCard key={`desktop-3-${review.username}`} {...review} />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};

export default SkillsShowcase;