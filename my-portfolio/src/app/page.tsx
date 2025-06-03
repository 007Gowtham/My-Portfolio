// src/app/page.tsx (or src/pages/index.tsx if using older structure)
"use client";
import React from "react";

import Hero from "@/pages/hero";
import Services from "@/pages/services";
import About from "@/pages/about";
import ComparisonSection from "@/pages/coding";
import Process from "@/pages/process";
import Questions from "@/pages/questions";
import SkillsShowcase from "@/pages/skills";
import Footer from "@/pages/footer";
SmoothCursor
import Navbar from "@/components/sections/navbar";
import TopNavbar from "@/components/sections/topnavbar";
import Noise from "@/components/noise";
import { SmoothCursor } from "@/components/ui/smooth-cursor";


export default function Home() {
  return (
    <div className="relative w-screen overflow-x-hidden bg-[rgb(225,232,236)]">
      {/* Background Grain Effect */}
      
            <SmoothCursor/>
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