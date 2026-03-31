// src/app/page.tsx (or src/pages/index.tsx if using older structure)
"use client";
import React from "react";

// Import SVG background assets
import BgSvg from "@/assert/bg.svg";
import Image1Svg from "@/assert/image1.svg";
import ImageSvg from "@/assert/Image.svg";

// Import components
import Services from "@/pages/services";
import About from "@/pages/about";
import ComparisonSection from "@/pages/coding";
import Process from "@/pages/process";
import Questions from "@/pages/questions";
import SkillsShowcase from "@/pages/skills";
import Footer from "@/pages/footer";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import Hero from "@/pages/hero";
import "@/app/globals.css"; // Ensure global styles are applied
import { Navbar, TopNavbar } from "@/components/sections/navigation";



export default function Home() {
  return (
    <div className="relative w-screen overflow-x-hidden bg-[rgb(225,232,236)]">
      
       {/* 1. Background Layer - SVG Overlay */}
      <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none">
        {/* Base color */}
        <div 
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundColor: "rgb(225,232,236)",
          }}
        />
        
        {/* SVG Backgrounds rendered as components */}
        <div className="absolute inset-0 w-full h-full opacity-90">
          <BgSvg className="w-full h-full object-cover" />
        </div>
        
        <div className="absolute inset-0 w-full h-full opacity-70" style={{ right: 0, bottom: 0, width: '30%', height: 'auto' }}>
          <Image1Svg className="w-full h-full object-cover" />
        </div>
        
        <div className="absolute inset-0 w-full h-full opacity-70" style={{ left: 0, bottom: 0, width: '30%', height: 'auto' }}>
          <ImageSvg className="w-full h-full object-cover" />
        </div>
      </div>
      
      <SmoothCursor />
      {/* BlobCursor - Fixed positioning */}


      {/* Content Container */}
      <div className="relative z-10">
        <TopNavbar />

        {/* Main Content */}
        <div className="relative">
          <Hero />
          <Services />
          <About />
          <ComparisonSection />
          <Process />
          <Questions />
          <SkillsShowcase />
          <Footer />
        </div>

        {/* Bottom Navbar */}
        <Navbar />
      </div>
    </div>
  );
}