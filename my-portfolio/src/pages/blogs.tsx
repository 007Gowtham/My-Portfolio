import React from 'react';
import Image from 'next/image';
import { Header } from '@/components/sections/ui';

import p1 from '@/assert/project/p1.png';
import p2 from '@/assert/project/p2.svg';
import p3 from '@/assert/project/p3.svg';
import p4 from '@/assert/project/p4.svg';

const blogsData = [
  {
    id: 1,
    tag: "Product Design",
    title: "NeuroScope™",
    description: "Exceptional craftsmanship transformed our ideas into reality",
    colSpan: "col-span-1 md:col-span-1",
    imageSrc: p1,
  },
  {
    id: 2,
    tag: "Digital Branding",
    title: "NovaWorks®",
    description: "Impeccable design and precision turned our ideas into stunning reality",
    colSpan: "col-span-1 md:col-span-2",
    imageSrc: p2,
  },
  {
    id: 3,
    tag: "UI/UX Design",
    title: "CosmoVision™",
    description: "A perfect blend of creativity and functionality exceeded expectations",
    colSpan: "col-span-1 md:col-span-2",
    imageSrc: p3,
  },
  {
    id: 4,
    tag: "Interface Design",
    title: "LumiSphere®",
    description: "Brilliant design and meticulous execution effortlessly made our ideas shine",
    colSpan: "col-span-1 md:col-span-1",
    imageSrc: p4,
  }
];

export default function Blogs() {
  return (
    <section className="py-12 lg:py-10 relative z-10 w-full flex flex-col items-center">
      <div className="w-full max-w-6xl flex flex-col gap-10 px-5 lg:gap-12 lg:px-8 scale-100 sm:scale-[0.95] md:scale-90 lg:scale-[0.85] origin-top">
        
        {/* Section Heading */}
        <div className="flex flex-col items-center justify-center w-full">
          <Header
            title="Writing"
            heading="Latest Blogs"
            description="Discover how clients have elevated their digital presence through expert designs"
          />
        </div>

        {/* Blogs Grid */}
        <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-3 w-full">
          {blogsData.map((blog) => (
            <div
              key={blog.id}
              className={`group relative flex flex-col rounded-lg overflow-hidden cursor-pointer h-[350px] md:h-[400px] shadow-lg ${blog.colSpan}`}
            >
              {/* Background Image */}
              <div className="absolute inset-0 w-full h-full">
                <Image
                  src={blog.imageSrc}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                />
              </div>
              
              {/* Dark Gradient Overlay at the bottom */}
              <div className="absolute bottom-0 left-0 w-full h-[65%] bg-gradient-to-t from-[#1b2b3a]/90 via-[#1b2b3a]/40 to-transparent flex flex-col justify-end p-6 md:p-8">
                
                {/* Tag Pill */}
                <div className="mb-3 w-fit">
                  <span className="inline-block bg-white/20 backdrop-blur-md border border-white/30 text-white text-[11px] px-3 py-1 rounded-full font-inter font-medium tracking-wide">
                    {blog.tag}
                  </span>
                </div>
                
                {/* Title */}
                <h3 className="text-2xl md:text-[32px] leading-tight font-medium text-white font-satoshi mb-2">
                  {blog.title}
                </h3>
                
                {/* Description */}
                <p className="text-sm md:text-base text-white/90 font-inter leading-relaxed max-w-sm">
                  {blog.description}
                </p>
                
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
