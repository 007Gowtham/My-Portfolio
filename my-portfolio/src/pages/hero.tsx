"use client";
import { useRouter } from "next/navigation";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/sections/ui";
import HeroB2 from '@/assert/hero/b2.svg';
import HeroB1 from '@/assert/hero/b1.svg';

import { Marquee } from "@/components/magicui/marquee";
import ezmark1 from '../assert/project/ezmark/emark cover.png';
import multiplyerCover from '../assert/project/multiplyer/cover.png';
import docsyncCover from '../assert/project/collab/cover.png';
import writez1 from '../assert/project/writez/writez1.png';
import ArrowIcon from '../assert/project/arrow.svg';
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
  { id: 1, title: "EzMark", image: ezmark1 },
  { id: 4, title: "ClashCode", image: multiplyerCover },
  { id: 5, title: "DocSync", image: docsyncCover },
  { id: 2, title: "Writezy", image: writez1 },
];

export default function Hero() {
  const router = useRouter();

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
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-4 flex-wrap text-center">
          <div className="w-12 h-[50px] xs:w-[60px] xs:h-[62px] sm:w-[70px] sm:h-[72px] md:w-[86px] md:h-[90px] shadow-lg flex relative rounded-md overflow-hidden shrink-0">
            {/* Replace with actual profile image path if available */}
            <Image src="/about/profile.svg" alt="Profile" fill className="absolute object-cover" />
          </div>
          <h1 className="font-intrument font-medium text-5xl xs:text-6xl sm:text-[70px] md:text-[80px] lg:text-[90px] leading-[1.2] text-[#0E1C29]">
            I&apos;m Gowtham
          </h1>
        </motion.div>

        {/* Row 2: "Software Developer" + Icons */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-2 xs:gap-3 sm:gap-4 flex-wrap mt-2 sm:mt-0 text-center">
          <h1 className="font-intrument font-medium text-5xl xs:text-6xl sm:text-[70px] md:text-[80px] lg:text-[90px] leading-[1.2] text-[#0E1C29]">
            Software Developer
          </h1>
          <div className="w-12 h-[50px] xs:w-[60px] xs:h-[62px] sm:w-[70px] sm:h-[72px] md:w-[86px] md:h-[90px] shadow-lg flex relative rounded-md overflow-hidden shrink-0">
            <Image src={HeroB1} alt="Icon" fill className="absolute object-cover" />
          </div>
          <div className="w-12 h-[50px] xs:w-[60px] xs:h-[62px] sm:w-[70px] sm:h-[72px] md:w-[86px] md:h-[90px] shadow-lg flex relative rounded-md overflow-hidden shrink-0">
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
        <motion.div variants={itemVariants} className="mt-2 origin-top text-center">
          <Button button1="Contact Me" button2="See Projects" mt="2" />
        </motion.div>
      </motion.div>

      <motion.div
        className="relative z-10 w-full overflow-hidden"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
        style={{
          maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)',
          WebkitMaskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)'
        }}
      >
        <Marquee pauseOnHover className="[--duration:20s]">
          {HERO_PROJECTS.map((project, i) => (
            <div
              key={i}
              onClick={() => router.push(`/project/${project.id}`)}
              className="group relative flex flex-col custom-card p-4 rounded-md mx-2 cursor-pointer z-0 overflow-hidden w-[280px] xs:w-[320px] sm:w-[360px] md:w-[425px] h-[260px] xs:h-[290px] sm:h-[320px] md:h-[350px]"
            >
              <div
                className="relative overflow-hidden shrink-0 rounded-lg w-full h-[190px] xs:h-[220px] sm:h-[250px] md:h-[280px]"
              >
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className={`object-cover rounded-lg transition-transform duration-700 group-hover:scale-[1.02]`}
                />
              </div>
              <div className="flex justify-between items-center mt-4 px-2 flex-grow">
                <span className="text-[14px] font-inter text-[#2C3E50] font-medium">{project.title}</span>
                <Image src={ArrowIcon} alt="View" width={24} height={24} className="hover:translate-x-1 hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
          ))}
        </Marquee>
      </motion.div>
    </div>
  );
}
