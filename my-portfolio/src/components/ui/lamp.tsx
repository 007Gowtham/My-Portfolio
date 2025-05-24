'use client';
import React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export const LampContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div
      className={cn(
        'relative flex h-177 flex-col items-center justify-center overflow-hidden bg-[#0A0A0A] w-full rounded-md z-0',
        className
      )}
    >
      <div className="relative flex w-full flex-1 scale-125 items-center justify-center isolate z-0">
        {/* Left white glow */}
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute right-1/2 h-56 w-[30rem] bg-gradient-conic from-white via-transparent to-transparent [--conic-position:from_70deg_at_center_top]"
        />

        {/* Right white glow */}
        <motion.div
          initial={{ opacity: 0.5, width: '15rem' }}
          whileInView={{ opacity: 1, width: '30rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute left-1/2 h-56 w-[30rem] bg-gradient-conic from-transparent via-transparent to-white [--conic-position:from_290deg_at_center_top]"
        />

        {/* Top glow reflection */}
        <div className="absolute top-[6rem] w-[20rem] h-[12rem] bg-white blur-3xl opacity-30 rounded-full" />

        {/* Main light circle blur */}
        <motion.div
          initial={{ width: '8rem' }}
          whileInView={{ width: '16rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute z-30 h-36 w-64 -translate-y-[6rem] rounded-full bg-white blur-2xl"
        />

        {/* Lamp strip line */}
        <motion.div
          initial={{ width: '15rem' }}
          whileInView={{ width: '25rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut',
          }}
          className="absolute z-50 h-1 w-[30rem] -translate-y-[7rem] bg-white"
        />

        {/* Top block hiding lamp source */}
        <div className="absolute z-40 h-44 w-full -translate-y-[12.5rem] bg-[#0A0A0A]" />
      </div>

      {/* Content */}
      <div className="relative z-50  px-5">
        {children}
      </div>
    </div>
  );
};
