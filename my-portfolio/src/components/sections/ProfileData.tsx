"use client"
import { useFetch } from '@/hooks/useFetch';
import { API_CONFIG, ENDPOINTS } from '@/lib/config';
import { Instagram, Github, Linkedin } from 'lucide-react';
import Contactbutton from "./contactbutton";
import { ShinyButton } from "@/components/magicui/shiny-button";
import GlowPulser from "./gloweffect";
import Image from "next/image";

interface Profile {
  id: number;
  name: string;
  email: string;
  bio: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
  website: string;
  skills: string[];
}

export default function ProfileData() {
  const { data: profiles, loading, error, refetch } = useFetch<Profile[]>(`${API_CONFIG.BASE_URL}${ENDPOINTS.PROFILES}`);
  
  if (loading) {
    return (
      <div className="w-full min-h-auto flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-9 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#0E1C29] mx-auto mb-4"></div>
          <p className="text-[#0E1C29] font-inter">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-auto flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-9 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="text-center">
          <p className="text-red-600 font-inter mb-4">Error loading profile: {error}</p>
          <button 
            onClick={refetch}
            className="bg-[#0E1C29] text-white px-4 py-2 rounded-lg font-inter hover:bg-[#0E1C29]/80 transition-colors"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!profiles || profiles.length === 0) {
    return (
      <div className="w-full min-h-auto flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-9 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="text-center">
          <p className="text-[#0E1C29] font-inter">No profile data available</p>
        </div>
      </div>
    );
  }

  const profile = profiles[0]; // Get the first profile

  return (
    <div id="profile" className="w-full min-h-auto flex justify-center items-center px-4 sm:px-6 md:px-8 lg:px-9 xl:px-20 py-8 sm:py-12 md:py-16 lg:py-20">
      {/* Mobile Layout */}
      <div className="w-full max-w-7xl block md:hidden">
        {/* Profile Card - Mobile */}
        <div className="bg-[#F6FBFF] shadow-2xl w-full max-w-sm mx-auto p-4 rounded-2xl mb-6">
          <div className="relative w-full h-48 bg-black rounded-2xl mb-4">
            <Image src="/about/profile.svg" alt="Profile Image" fill className="object-cover rounded-xl" />
          </div>
          
          <div className="text-[#0E1C29] flex flex-col gap-3 text-center items-center">
            <div className="flex flex-col gap-2">
              <div className="flex w-full items-center justify-center gap-3">
                <GlowPulser/>
                <div className="text-center text-md font-inter">Available for Work</div>
              </div>
              <div className="text-2xl font-intermedium font-medium">{profile.name}</div>
              <p className="text-xs px-2 font-inter">{profile.bio}</p>
            </div>
            
            <div className="flex gap-4 my-2">
              <ShinyButton>
                <a href={profile.linkedin} className="bg-[#D8DFE5] w-10 h-10 grid place-items-center rounded-full">
                  <Linkedin className="w-4 h-4 text-[#0E1C29]/30" />
                </a>
              </ShinyButton>
              <ShinyButton>
                <a href="https://Instagram.com/" className="bg-[#D8DFE5] w-10 h-10 grid place-items-center rounded-full">
                  <Instagram className="w-4 h-4 text-[#0E1C29]/30" />
                </a>
              </ShinyButton>
              <ShinyButton>
                <a href={profile.github} className="bg-[#D8DFE5] w-10 h-10 grid place-items-center rounded-full">
                  <Github className="w-4 h-4 text-[#0E1C29]/30" />
                </a>
              </ShinyButton>
            </div>
            
            <div className="w-full">
              <Contactbutton/>
            </div>  
          </div>
        </div>

        {/* Content - Mobile */}
        <div className="p-4 rounded-2xl shadow-lg">
          <div className="text-[#0E1C29] font-inter text-sm leading-relaxed mb-6">
            {profile.bio}
          </div>

          <div className="border-t-2 my-6 border-[#0E1C29]/20 border-dashed"></div>

          {/* Skills - Mobile */}
          <div className="flex flex-wrap gap-2 mb-6">
            {profile.skills.map((skill, index) => (
              <div key={index} className="bg-[#D8DFE5] px-3 py-1.5 rounded-sm">
                <div className="text-[#0E1C29]/80 text-xs">
                  {skill}
                </div>
              </div>
            ))}
          </div>

          {/* Contact Info - Mobile */}
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#0E1C29] rounded-full"></div>
              <span className="text-[#0E1C29] font-inter text-sm">{profile.email}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#0E1C29] rounded-full"></div>
              <span className="text-[#0E1C29] font-inter text-sm">{profile.phone}</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-[#0E1C29] rounded-full"></div>
              <span className="text-[#0E1C29] font-inter text-sm">{profile.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="w-full max-w-7xl hidden md:flex gap-8 lg:gap-12">
        {/* Profile Card - Desktop */}
        <div className="bg-[#F6FBFF] shadow-2xl w-80 p-6 rounded-2xl flex-shrink-0">
          <div className="relative w-full h-64 bg-black rounded-2xl mb-6">
            <Image src="/about/profile.svg" alt="Profile Image" fill className="object-cover rounded-xl" />
          </div>
          
          <div className="text-[#0E1C29] flex flex-col gap-4 text-center items-center">
            <div className="flex flex-col gap-3">
              <div className="flex w-full items-center justify-center gap-3">
                <GlowPulser/>
                <div className="text-center text-lg font-inter">Available for Work</div>
              </div>
              <div className="text-3xl font-intermedium font-medium">{profile.name}</div>
              <p className="text-sm px-4 font-inter">{profile.bio}</p>
            </div>
            
            <div className="flex gap-4 my-4">
              <ShinyButton>
                <a href={profile.linkedin} className="bg-[#D8DFE5] w-12 h-12 grid place-items-center rounded-full">
                  <Linkedin className="w-5 h-5 text-[#0E1C29]/30" />
                </a>
              </ShinyButton>
              <ShinyButton>
                <a href="https://Instagram.com/" className="bg-[#D8DFE5] w-12 h-12 grid place-items-center rounded-full">
                  <Instagram className="w-5 h-5 text-[#0E1C29]/30" />
                </a>
              </ShinyButton>
              <ShinyButton>
                <a href={profile.github} className="bg-[#D8DFE5] w-12 h-12 grid place-items-center rounded-full">
                  <Github className="w-5 h-5 text-[#0E1C29]/30" />
                </a>
              </ShinyButton>
            </div>
            
            <div className="w-full">
              <Contactbutton/>
            </div>  
          </div>
        </div>

        {/* Content - Desktop */}
        <div className="flex-1 p-6 rounded-2xl shadow-lg bg-[#F6FBFF]">
          <div className="text-[#0E1C29] font-inter text-base leading-relaxed mb-8">
            {profile.bio}
          </div>

          <div className="border-t-2 my-8 border-[#0E1C29]/20 border-dashed"></div>

          {/* Skills - Desktop */}
          <div className="mb-8">
            <h3 className="text-xl font-intermedium font-medium text-[#0E1C29] mb-4">Skills</h3>
            <div className="flex flex-wrap gap-3">
              {profile.skills.map((skill, index) => (
                <div key={index} className="bg-[#D8DFE5] px-4 py-2 rounded-lg">
                  <div className="text-[#0E1C29]/80 text-sm font-inter">
                    {skill}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Info - Desktop */}
          <div className="space-y-4">
            <h3 className="text-xl font-intermedium font-medium text-[#0E1C29] mb-4">Contact Information</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-[#0E1C29] rounded-full"></div>
                <span className="text-[#0E1C29] font-inter text-base">{profile.email}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-[#0E1C29] rounded-full"></div>
                <span className="text-[#0E1C29] font-inter text-base">{profile.phone}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="w-3 h-3 bg-[#0E1C29] rounded-full"></div>
                <span className="text-[#0E1C29] font-inter text-base">{profile.location}</span>
              </div>
              {profile.website && (
                <div className="flex items-center gap-4">
                  <div className="w-3 h-3 bg-[#0E1C29] rounded-full"></div>
                  <a href={profile.website} className="text-[#0E1C29] font-inter text-base hover:underline">
                    {profile.website}
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
