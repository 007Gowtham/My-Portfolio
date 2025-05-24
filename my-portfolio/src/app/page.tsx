"use client"
import React from "react";
import Hero from "@/pages/hero";
import Services from "@/pages/services";
import About from "@/pages/about";
import ComparisonSection from "@/pages/coding";
import Process from "@/pages/process";
import Questions from "@/pages/questions";
import SkillsShowcase from "@/pages/skills";
import Footer from "@/pages/footer";
import Navbar from "@/components/sections/navbar";
import TopNavbar from "@/components/sections/topnavbar";

export default function Home() {
  return (
    <div className="relative w-screen overflow-x-hidden bg-[#F0F8FF]/90">
      {/* Background Grain Effect */}
      <img
        src="/home/image.svg"
        alt="grain texture"
        className="absolute inset-0 w-full h-full object-cover opacity-8 pointer-events-none z-0"
      />
      <TopNavbar />

      {/* Actual Content */}
      <div className="relative z-10 ">
        <Hero />
        <Services />
        <About />
        <ComparisonSection />
        <Process />
        <Questions />
        <SkillsShowcase />

        <Footer />
        
      </div>

      {/* Fixed Bottom Navbar */}
      
      <Navbar />
      
    </div>
  );
}
