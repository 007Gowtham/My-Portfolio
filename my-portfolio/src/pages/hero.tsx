"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/sections/ui";
import HeroB2 from '@/assert/hero/b2.svg';
import HeroB1 from '@/assert/hero/b1.svg';

// Floating icons — left and right of hero content
const LEFT_ICONS = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", alt: "React", top: "16%", left: "3%", size: 44, speed: 1.2 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg", alt: "Figma", top: "30%", left: "14%", size: 38, speed: 0.8 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", alt: "Docker", top: "45%", left: "5%", size: 42, speed: 1.5 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", alt: "Python", top: "60%", left: "14%", size: 36, speed: 0.6 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg", alt: "Node.js", top: "75%", left: "4%", size: 40, speed: 1.1 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/discordjs/discordjs-original.svg", alt: "Discord", top: "88%", left: "16%", size: 34, speed: 1.6 },
];

const RIGHT_ICONS = [
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg", alt: "GitHub", top: "16%", right: "4%", size: 44, speed: 0.9 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg", alt: "Next.js", top: "30%", right: "16%", size: 38, speed: 1.4 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg", alt: "Google", top: "45%", right: "5%", size: 40, speed: 0.7 },
  { src: "https://upload.wikimedia.org/wikipedia/commons/9/93/Amazon_Web_Services_Logo.svg", alt: "AWS", top: "60%", right: "16%", size: 36, speed: 1.3 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", alt: "MySQL", top: "75%", right: "5%", size: 42, speed: 0.8 },
  { src: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg", alt: "VS Code", top: "88%", right: "16%", size: 36, speed: 1.5 },
];

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

function FloatingIcon({
  src, alt, size, style, delay = 0, speed = 1,
}: {
  src: string; alt: string; size: number; style: React.CSSProperties; delay?: number; speed?: number;
}) {
  const { scrollY } = useScroll();
  // Map scroll value to a Y offset using the icon's unique speed multiplier
  const yOffset = useTransform(scrollY, [0, 1000], [0, -300 * speed]);

  return (
    <motion.div
      className="absolute pointer-events-none hidden lg:flex items-center justify-center rounded-2xl bg-[#F8F9FA]"
      style={{
        width: size + 24,
        height: size + 24,
        boxShadow: "0 2px 10px rgba(0,0,0,0.03), inset 0 0 0 1px rgba(0,0,0,0.06)",
        y: yOffset,
        ...style,
      }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        opacity: { duration: 0.5, delay },
        scale: { duration: 0.5, delay },
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={src} alt={alt} width={size} height={size} className="object-contain" />
    </motion.div>
  );
}

export default function Hero() {
  return (
    <div className="relative w-full flex flex-col bg-transparent items-center justify-center overflow-hidden min-h-screen">

      {/* ── Floating left icons ── */}
      {LEFT_ICONS.map((icon, i) => (
        <FloatingIcon
          key={icon.alt}
          src={icon.src}
          alt={icon.alt}
          size={icon.size}
          speed={icon.speed}
          delay={i * 0.12}
          style={{ top: icon.top, left: icon.left }}
        />
      ))}

      {/* ── Floating right icons ── */}
      {RIGHT_ICONS.map((icon, i) => (
        <FloatingIcon
          key={icon.alt}
          src={icon.src}
          alt={icon.alt}
          size={icon.size}
          speed={icon.speed}
          delay={i * 0.12 + 0.3}
          style={{ top: icon.top, right: (icon as any).right }}
        />
      ))}

      {/* ── Hero Text Block ── */}
      <motion.div
        className="relative z-10 flex flex-col items-center justify-center w-full px-4 pt-36 pb-20 gap-6"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Row 1: Icon + "I'm Gowtham" */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 sm:gap-5">
          <div className="w-[45px] h-[45px] mb-2 box-shadow-custom bg-[rgb(225,232,236)] flex relative rounded-xl sm:min-w-[70px] sm:min-h-[70px] lg:min-h-[80px] lg:min-w-[80px] 2xl:min-w-[90px] 2xl:min-h-[90px]">
            <Image src={HeroB2} alt="Icon" fill className="absolute bg-black rounded-xl" />
          </div>
          <h1
            className="font-intrument font-medium text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(180deg, rgb(14, 28, 41) 34%, rgba(94, 120, 143, 0.5) 124%)' }}
          >
            I&apos;m Gowtham
          </h1>
        </motion.div>

        {/* Row 2: "Software Developer" + Icons */}
        <motion.div variants={itemVariants} className="flex items-center justify-center gap-4 sm:gap-5">
          <h1
            className="font-intrument font-medium text-[clamp(2.5rem,7vw,6rem)] leading-[1.05] bg-clip-text text-transparent"
            style={{ backgroundImage: 'linear-gradient(180deg, rgb(14, 28, 41) 34%, rgba(94, 120, 143, 0.5) 124%)' }}
          >
            Software Developer
          </h1>
          <div className="w-[45px] h-[45px] box-shadow-custom bg-[rgb(225,232,236)] flex relative rounded-xl sm:min-w-[70px] sm:min-h-[70px] lg:min-h-[80px] lg:min-w-[80px] 2xl:min-w-[90px] 2xl:min-h-[90px]">
            <Image src={HeroB1} alt="Icon" fill className="absolute object-contain" />
          </div>
          <div className="w-[45px] h-[45px] box-shadow-custom bg-[rgb(225,232,236)] flex relative rounded-xl sm:min-w-[70px] sm:min-h-[70px] lg:min-h-[80px] lg:min-w-[80px] 2xl:min-w-[90px] 2xl:min-h-[90px]">
            <Image src={HeroB2} alt="Icon" fill className="absolute object-contain" />
          </div>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="text-center text-[#5E788F] font-inter text-base sm:text-lg max-w-md leading-relaxed"
        >
          Creating experiences that feel effortless, immersive, and timeless.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div variants={itemVariants}>
          <Button button1="Contact Me" button2="See Projects" mt="mt-2" />
        </motion.div>
      </motion.div>
    </div>
  );
}
