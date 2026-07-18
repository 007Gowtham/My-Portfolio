"use client";

import { useRef, useState } from "react";
import { motion } from "framer-motion";

const CircleAnimation = () => {
  const CIRCLE_RADIUS = 20;

  return (
    <svg
      className="pointer-events-none absolute -top-3 -left-3"
      style={{
        width: CIRCLE_RADIUS * 2,
        height: CIRCLE_RADIUS * 2,
      }}
    >
      <motion.circle
        cx={CIRCLE_RADIUS}
        cy={CIRCLE_RADIUS}
        r={CIRCLE_RADIUS - 2}
        fill="none"
        initial={{
          scale: 0,
          stroke: "#E5214A",
          strokeWidth: CIRCLE_RADIUS * 2,
        }}
        animate={{
          scale: 1,
          stroke: "#CC8EF5",
          strokeWidth: 0,
        }}
        transition={{
          duration: 0.4,
          ease: [0.33, 1, 0.68, 1], // cubic-out
        }}
      />
    </svg>
  );
};

// Burst animation with particles
const BurstAnimation = () => {
  // Colors for particles with from/to transitions
  const colorPairs = [
    { from: "#9EC9F5", to: "#9ED8C6" },
    { from: "#91D3F7", to: "#9AE4CF" },
    { from: "#DC93CF", to: "#E3D36B" },
    { from: "#CF8EEF", to: "#CBEB98" },
    { from: "#87E9C6", to: "#1FCC93" },
    { from: "#A7ECD0", to: "#9AE4CF" },
    { from: "#87E9C6", to: "#A635D9" },
    { from: "#D58EB3", to: "#E0B6F5" },
    { from: "#F48BA2", to: "#CF8EEF" },
    { from: "#91D3F7", to: "#A635D9" },
    { from: "#CF8EEF", to: "#CBEB98" },
    { from: "#87E9C6", to: "#A635D9" },
    { from: "#9EC9F5", to: "#9ED8C6" },
    { from: "#91D3F7", to: "#9AE4CF" },
  ];

  return (
    <div className="pointer-events-none absolute -top-3 -left-3 grid size-10 place-items-center">
      {colorPairs.map((colors, index) => (
        <Particle
          key={index}
          fromColor={colors.from}
          toColor={colors.to}
          index={index}
          totalParticles={colorPairs.length}
        />
      ))}
    </div>
  );
};

const BURST_RADIUS = 32;
const START_RADIUS = 4;
const PATH_SCALE_FACTOR = 0.8;

// Particle component for burst animation
const Particle = ({
  fromColor,
  toColor,
  index,
  totalParticles,
}: {
  fromColor: string;
  toColor: string;
  index: number;
  totalParticles: number;
}) => {
  // Calculate angle based on index with 45 degree offset
  const angle = (index / totalParticles) * 360 + 45;
  const radians = (angle * Math.PI) / 180;

  // Add randomness to the burst distance (±15%)
  const randomFactor = 0.85 + Math.random() * 0.3;
  const burstDistance = BURST_RADIUS * randomFactor;

  // Randomize duration between 500-700ms
  const duration = 500 + Math.random() * 200;

  // Calculate the degree shift (13 degrees in radians)
  const degreeShift = (13 * Math.PI) / 180;

  return (
    <motion.div
      className="pointer-events-none absolute size-1.5 rounded-full"
      style={{ backgroundColor: fromColor, opacity: 0 }}
      initial={{
        opacity: 0,
        scale: 1,
        x: Math.cos(radians) * START_RADIUS * PATH_SCALE_FACTOR,
        y: Math.sin(radians) * START_RADIUS * PATH_SCALE_FACTOR,
        backgroundColor: fromColor,
      }}
      animate={{
        opacity: [0, 1, 1, 0],
        x: Math.cos(radians + degreeShift) * burstDistance * PATH_SCALE_FACTOR,
        y: Math.sin(radians + degreeShift) * burstDistance * PATH_SCALE_FACTOR,
        scale: 0,
        backgroundColor: toColor,
      }}
      transition={{
        opacity: {
          times: [0, 0.01, 0.99, 1],
          duration: duration / 1000,
          delay: 0.4,
        },
        x: {
          duration: duration / 1000,
          ease: [0.23, 1, 0.32, 1], // quint.out for movement
          delay: 0.3,
        },
        y: {
          duration: duration / 1000,
          ease: [0.23, 1, 0.32, 1], // quint.out for movement
          delay: 0.3,
        },
        scale: {
          duration: duration / 1000,
          ease: [0.55, 0.085, 0.68, 0.53], // quad.in for scaling
          delay: 0.3,
        },
        backgroundColor: {
          duration: duration / 1000,
          delay: 0.3,
        },
      }}
    />
  );
};

export const LikeButton = () => {
  const [likeCount, setLikeCount] = useState(124); // Baseline count
  const [isLiked, setIsLiked] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);
  const iconButtonRef = useRef<null | HTMLButtonElement>(null);

  useEffect(() => {
    const storedLiked = localStorage.getItem('portfolio_liked') === 'true';
    const storedCount = localStorage.getItem('portfolio_like_count');
    
    if (storedLiked) {
      setIsLiked(true);
    }
    if (storedCount) {
      setLikeCount(parseInt(storedCount, 10));
    }
  }, []);

  const toggleLike = () => {
    if (isLiked) {
      // User cannot revert their like
      return;
    }
    
    const newCount = likeCount + 1;
    setLikeCount(newCount);
    setIsLiked(true);
    setIsAnimating(true);
    
    localStorage.setItem('portfolio_liked', 'true');
    localStorage.setItem('portfolio_like_count', newCount.toString());
  };

  return (
    <button
      ref={iconButtonRef}
      type="button"
      className={`relative flex h-8 cursor-pointer items-center gap-1.5 px-2 transition ${isLiked ? 'cursor-default' : ''}`}
      onClick={toggleLike}
      disabled={isLiked}
    >
      <div className="relative flex items-center justify-center w-4 h-4">
        {isAnimating && <CircleAnimation />}
        {isAnimating && <BurstAnimation />}
        {isAnimating ? (
          <motion.svg
            key="animating-heart"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 10,
              delay: 0.3,
            }}
            onAnimationComplete={() => setIsAnimating(false)}
            className="absolute inset-0"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke="#ef4444"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="#ef4444"
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </motion.svg>
        ) : (
          <svg
            className="absolute inset-0"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            stroke={isLiked ? "#ef4444" : "#0E1C29"}
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill={isLiked ? "#ef4444" : "none"}
          >
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
          </svg>
        )}
      </div>
      <span className="min-w-[0.75rem] text-sm font-medium text-[#0E1C29]">
        <motion.span 
          key={likeCount} 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="inline-block"
        >
          {likeCount}
        </motion.span>
        <span className="sr-only"> likes, click to {isLiked ? "unlike" : "like"}</span>
      </span>
    </button>
  );
};

export default LikeButton;
