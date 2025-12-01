"use client";
import { useEffect, useRef } from "react";

export default function Noise() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size
        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        resizeCanvas();
        window.addEventListener("resize", resizeCanvas);

        // Noise generation
        const noise: number[][] = [];
        const noiseIntensity = 0.5;

        // Generate noise
        for (let y = 0; y < canvas.height; y += 4) {
            noise[y] = [];
            for (let x = 0; x < canvas.width; x += 4) {
                noise[y][x] = Math.random() * noiseIntensity;
            }
        }

        // Animation loop
        let animationId: number;
        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw noise
            for (let y = 0; y < canvas.height; y += 4) {
                for (let x = 0; x < canvas.width; x += 4) {
                    const alpha = noise[y]?.[x] || 0;
                    if (alpha > 0) {
                        ctx.fillStyle = `rgba(255, 255, 255, ${alpha * 0.1})`;
                        ctx.fillRect(x, y, 4, 4);
                    }
                }
            }

            // Update noise
            for (let y = 0; y < canvas.height; y += 4) {
                for (let x = 0; x < canvas.width; x += 4) {
                    if (noise[y]?.[x] !== undefined) {
                        noise[y][x] = Math.max(0, noise[y][x] - 0.01);
                        if (Math.random() < 0.1) {
                            noise[y][x] = Math.random() * noiseIntensity;
                        }
                    }
                }
            }

            animationId = requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", resizeCanvas);
            cancelAnimationFrame(animationId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="fixed inset-0 w-full h-full pointer-events-none z-0 opacity-30"
            style={{ mixBlendMode: "overlay" }}
        />
    );
}
