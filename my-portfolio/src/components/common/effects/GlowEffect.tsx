import React from "react";

interface GlowEffectProps {
    children: React.ReactNode;
    className?: string;
}

export default function GlowEffect({ children, className = "" }: GlowEffectProps) {
    return (
        <div className={`glow-effect ${className}`}>
            {children}
            <style jsx>{`
        .glow-effect {
          position: relative;
        }
        
        .glow-effect::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: radial-gradient(circle at center, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          border-radius: inherit;
          z-index: -1;
          opacity: 0;
          transition: opacity 0.3s ease;
        }
        
        .glow-effect:hover::before {
          opacity: 1;
        }
      `}</style>
        </div>
    );
}
