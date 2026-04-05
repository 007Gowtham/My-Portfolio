// src/app/page.tsx (or src/pages/index.tsx if using older structure)
"use client";
import React from "react";
import Image from "next/image";

// Import SVG background assets
import Group1Svg from "@/assert/Group 1.svg";

// Import components
import Services from "@/pages/services";
import About from "@/pages/about";
import ComparisonSection from "@/pages/coding";
import Process from "@/pages/process";
import Questions from "@/pages/questions";
import Testimonials from "@/pages/testimonials";
import Footer from "@/pages/footer";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import Hero from "@/pages/hero";
import "@/app/globals.css"; // Ensure global styles are applied
import { Navbar, TopNavbar } from "@/components/sections/navigation";



export default function Home() {
  return (
    <div className="relative w-screen overflow-x-hidden">

      {/* 1. Background Layer - SVG Overlay */}
      <div className="fixed inset-0 -z-10 h-full w-full pointer-events-none">
        {/* Base color */}


        {/* SVG Background rendered as component */}
        <div className="absolute inset-0 w-full h-full">
          <Image src={Group1Svg} alt="Background" fill className="object-cover scale-145" />
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
          <Testimonials />
          <Footer />
        </div>

        {/* Bottom Navbar */}
        <Navbar />
      </div>
    </div>
  );
}