"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/sections/ui";
import HeroB2 from '@/assert/hero/b2.svg';
import HeroB1 from '@/assert/hero/b1.svg';

import { Marquee } from "@/components/magicui/marquee";
import { ArrowUpRight } from "lucide-react";
import p1 from '@/assert/project/p1.png';
import p2 from '@/assert/project/p2.svg';
import p3 from '@/assert/project/p3.svg';
import p4 from '@/assert/project/p4.svg';
import projectImage from '@/assert/hero/image.png';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

const HERO_PROJECTS = [
  { title: "Alter", image: p1 },
  { title: "Portfoy", image: p2 },
  { title: "CourseSite", image: p3 },
  { title: "LanderOS", image: p4 },
];

export default function Hero() {
  return (
    <div className="relative w-full flex flex-col bg-transparent items-center justify-center overflow-hidden min-h-screen pt-32 pb-20 gap-7">

      {/* ── Background Image (Top to half of cards) ── */}
      <div
        className="absolute top-0 left-0 w-full z-0 pointer-events-none"
        style={{
          bottom: '255px',
          maskImage: 'linear-gradient(to bottom, black calc(100% - 150px), transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black calc(100% - 150px), transparent 100%)'
        }}
      >
        <Image src={projectImage} alt="Hero Background" fill className="object-cover" />
      </div>

      {/* ── Hero Text Block ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full px-4 gap-2"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Row 1: Avatar + "I'm Gowtham" */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 sm:gap-4">
          <div style={{ width: 86, height: 89.39 }} className="shadow-lg flex relative rounded-md overflow-hidden shrink-0">
            {/* Replace with actual profile image path if available */}
            <Image src="/about/profile.svg" alt="Profile" fill className="absolute object-cover" />
          </div>
          <h1 className="font-intrument font-medium text-[90px] leading-[1.2] text-[#0E1C29]">
            I&apos;m Gowtham
          </h1>
        </motion.div>

        {/* Row 2: "Software Developer" + Icons */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-3 sm:gap-4">
          <h1 className="font-intrument font-medium text-[90px] leading-[1.2] text-[#0E1C29]">
            Software Developer
          </h1>
          <div style={{ width: 86, height: 89.39 }} className="shadow-lg flex relative rounded-md overflow-hidden shrink-0">
            <Image src={HeroB1} alt="Icon" fill className="absolute object-cover" />
          </div>
          <div style={{ width: 86, height: 89.39 }} className="shadow-lg flex relative rounded-md overflow-hidden shrink-0">
            <Image src={HeroB2} alt="Icon" fill className="absolute object-cover" />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-center px-5 text-[#4A5568] font-inter text-base sm:text-sm max-w-lg leading-relaxed mt-2 font-medium"
        >
          I specialize in creating thoughtful and impactful products, collaborating with startups and leading brands.  .
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants} className="mt-2 origin-top">
          <Button button1="Get Template" button2="See Projects" mt="2" />
        </motion.div>
      </motion.div>

      {/* ── Project Marquee ── */}
      <motion.div
        className="relative z-10 w-full "
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
      >
        <Marquee pauseOnHover className="[--duration:40s]">
          {HERO_PROJECTS.map((project, i) => (
            <div
              key={i}
              style={{ width: 425, height: 350 }}
              className="group relative flex flex-col custom-card p-4 rounded-md mx-2 cursor-pointer z-0 overflow-hidden"
            >
              <div
                style={{ width: 390, height: 280 }}
                className="relative overflow-hidden shrink-0 rounded-lg"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover rounded-lg transition-transform duration-700 group-hover:scale-[1.02]"
                />
              </div>
              <div className="flex justify-between items-center mt-4 px-2 flex-grow">
                <span className="text-[14px] font-inter text-[#2C3E50] font-medium">{project.title}</span>
                <ArrowUpRight className="w-4 h-4 text-gray-400" />
              </div>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
}
