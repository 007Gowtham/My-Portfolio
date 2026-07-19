"use client";
import Link from "next/link";
import { FaGithub, FaLinkedin, FaMedium } from "react-icons/fa6";
import '@/app/favicon.ico'
import GlowPulser from "../ui/gloweffect";
import LikeButton from "@/components/ui/like-button";

export default function TopNavbar() {
  return (
    <div className="fixed top-0 w-full z-50">
      <div
        className="flex justify-between w-full px-4 sm:px-8 lg:px-70 py-5 backdrop-blur-md border-b border-white/10"
        style={{
          background: "rgba(255, 255, 255, 0.05)",
        }}
      >
        {/* Left: Name */}
        <Link href="/" prefetch>
          <span className="text-[20px] sm:text-[24px] lg:text-[26px] font-dancing font-medium text-[#0E1C29] tracking-wide leading-tight cursor-pointer">
            <span className="hidden sm:inline">Gowtham S D</span>
            <span className="sm:hidden">Gowtham</span>
          </span>
        </Link>

        {/* Right: Availability & Socials */}
        <div className="flex items-center gap-2 sm:gap-4 text-[#0E1C29] text-xs sm:text-sm">
          {/* Availability */}
          <div className="hidden md:flex items-center gap-3">
            <GlowPulser />

            <span className="text-[#0E1C29] font-inter font-normal">Available for work</span>
          </div>
          <div className="md:hidden flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-[#0E1C29]" />
          
          <LikeButton />

          {/* Social Icons */}
          <div className="flex gap-2 sm:gap-3 text-sm sm:text-base">
            <a href="https://github.com/007Gowtham" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-1">
              <FaGithub />
            </a>
            <a href="https://linkedin.com/in/gowtham-sd" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-1">
              <FaLinkedin />
            </a>
            <a href="https://medium.com/@gowthams200521" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-1">
              <FaMedium />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
