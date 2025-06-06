"use client";
import Link from "next/link";
import { FaFacebookF, FaInstagram, FaXTwitter } from "react-icons/fa6";
import '../../app/globals.css';
import GlowPulser from "./gloweffect";

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
            <GlowPulser/>

            <span className="text-[#0E1C29] inter-font font-normal">Available for work</span>
          </div>
          <div className="md:hidden flex items-center">
            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
          </div>

          {/* Divider */}
          <div className="hidden md:block w-px h-4 bg-[#0E1C29]" />

          {/* Social Icons */}
          <div className="flex gap-2 sm:gap-3 text-sm sm:text-base">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-1">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-1">
              <FaInstagram />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors p-1">
              <FaXTwitter />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
