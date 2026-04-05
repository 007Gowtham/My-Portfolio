import React from 'react';
import Image from 'next/image';
import { Quote } from 'lucide-react';
import { Header } from '@/components/sections/ui';

const testimonialsData = [
  {
    id: 1,
    quote:
      "From onboarding to ongoing support, Acme Inc. has impressed us every step of the way. The tools are robust, yet easy to use.",
    name: "Paula Rodriguez",
    role: "Head of Operations",
    imageSrc: "https://free.shadcraft.com/assets/avatars/person-7.webp",
  },
  {
    id: 2,
    quote:
      "I love how seamlessly everything integrates. Our workflows are smoother and our clients have noticed the difference.",
    name: "Marcus Lee",
    role: "Client Success Manager",
    imageSrc: "https://free.shadcraft.com/assets/avatars/person-2.webp",
  },
  {
    id: 3,
    quote:
      "The constant updates and improvements show Acme Inc. truly cares about its users. Highly recommended for any growing company.",
    name: "Vivian Chen",
    role: "CTO",
    imageSrc: "https://free.shadcraft.com/assets/avatars/person-5.webp",
  },
  {
    id: 4,
    quote:
      "Acme Inc. made our project launches less stressful and more organized. The dashboard is a delight to work with each day.",
    name: "Sean O'Malley",
    role: "Project Coordinator",
    imageSrc: "https://free.shadcraft.com/assets/avatars/person-4.webp",
  },
  {
    id: 5,
    quote:
      "The feedback from our own customers has been overwhelmingly positive ever since we switched to Acme's platform.",
    name: "Linda Kim",
    role: "Customer Experience Lead",
    imageSrc: "https://free.shadcraft.com/assets/avatars/person-3.webp",
  },
  {
    id: 6,
    quote:
      "Powerful features, beautiful UI, and a support team that listens. I can't recommend Acme Inc. highly enough.",
    name: "Hanna Lee",
    role: "VP of Marketing",
    imageSrc: "https://free.shadcraft.com/assets/avatars/person-6.webp",
  },
];

export default function Testimonials() {
  return (
    <section className="py-12 lg:py-20 relative z-10 w-full">
      <div className="mx-auto flex max-w-7xl flex-col gap-12 px-5 lg:gap-16 lg:px-8">
        {/* Section Heading */}
        <Header
          title="Reviews"
          heading="What People Say"
          description="A collection of thoughts and feedback from my friends, peers, and teammates."
        />

        {/* Testimonials Grid */}
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {testimonialsData.map((testimonial) => (
            <div
              key={testimonial.id}
              className="group flex flex-col gap-4 sm:gap-5 rounded-xl border bg-[#F6FBFF] shadow-md hover:shadow-xl transition-all duration-300 p-5 sm:p-6"
            >
              <Quote className="size-5 rotate-180 text-[#0E1C29]/20 transition-colors group-hover:text-[#0E1C29]" />
              <blockquote className="text-sm leading-relaxed text-[#0E1C29] font-inter">
                {testimonial.quote}
              </blockquote>
              <Quote className="size-5 self-end text-[#0E1C29]/20 transition-colors group-hover:text-[#0E1C29]" />
              <diImage
                  src={testimonial.imageSrc}
                  alt={testimonial.name}
                  width={36}
                  height={36eSrc}
                  alt={testimonial.name}
                  className="h-9 w-9 sm:h-10 sm:w-10 rounded-full object-cover shadow-sm transition-all duration-300 group-hover:scale-110"
                />
                <div className="flex flex-col">
                  <h3 className="text-sm font-medium text-[#0E1C29] font-satoshi">
                    {testimonial.name}
                  </h3>
                  <p className="text-xs text-slate-600 font-inter">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
