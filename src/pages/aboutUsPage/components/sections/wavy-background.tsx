'use client';

import React, { useEffect, useRef, useState } from "react";
import { createNoise3D } from "simplex-noise";

// Simple cn function to replace the missing utility
const cn = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ');
};

export interface WavyBackgroundProps {
  children?: React.ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  [key: string]: any;
}

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill = "white",
  blur = 3,
  speed = "fast",
  waveOpacity = 0.5,
  ...props
}: WavyBackgroundProps) => {
  const [isSafari, setIsSafari] = useState(false);
  const [isClient, setIsClient] = useState(false);
  
  const noise = createNoise3D();
  let w: number,
    h: number,
    nt: number,
    i: number,
    x: number,
    ctx: any,
    canvas: any;
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const getSpeed = () => {
    switch (speed) {
      case "slow":
        return 0.001;
      case "fast":
        return 0.002;
      default:
        return 0.001;
    }
  };
  
  const init = () => {
    if (!isClient) return;
    canvas = canvasRef.current;
    if (!canvas) return;
    ctx = canvas.getContext("2d");
    if (!ctx) return;
    
    const dpr = window.devicePixelRatio || 1;
    w = ctx.canvas.width = Math.floor(canvas.offsetWidth * dpr);
    h = ctx.canvas.height = Math.floor(canvas.offsetHeight * dpr);
    canvas.style.width = `${canvas.offsetWidth}px`;
    canvas.style.height = `${canvas.offsetHeight}px`;
    ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
    ctx.scale(dpr, dpr);
    ctx.filter = `blur(${blur}px)`;
    nt = 0;
    window.onresize = function () {
      if (!canvas || !ctx) return;
      const dpr = window.devicePixelRatio || 1;
      w = ctx.canvas.width = Math.floor(canvas.offsetWidth * dpr);
      h = ctx.canvas.height = Math.floor(canvas.offsetHeight * dpr);
      canvas.style.width = `${canvas.offsetWidth}px`;
      canvas.style.height = `${canvas.offsetHeight}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0); // Reset transform before scaling
      ctx.scale(dpr, dpr);
      ctx.filter = `blur(${blur}px)`;
    };
    render();
  };
  
  const waveColors = colors ?? [
    "#38bdf8",
    "#818cf8",
    "#c1c5ee",
    "#114bf0",
    "#22d3ee",
  ];
  
  const drawWave = (n: number) => {
    if (!ctx) return;
    nt += getSpeed();
    for (i = 0; i < n; i++) {
      ctx.beginPath();
      ctx.lineWidth = waveWidth || 80;
      ctx.strokeStyle = waveColors[i % waveColors.length];
      for (x = 0; x < w; x += 5) {
        const y = noise(x / 800, 0.3 * i, nt) * 100;
        if (x === 0) {
          ctx.moveTo(x, y + h * 0.5);
        } else {
          ctx.lineTo(x, y + h * 0.5);
        }
      }
      ctx.stroke();
      ctx.closePath();
    }
  };
  
  let animationId: number;
  const render = () => {
    if (!ctx) return;
    ctx.fillStyle = backgroundFill ?? "black";
    ctx.globalAlpha = waveOpacity ?? 0.5;
    ctx.fillRect(0, 0, w, h);
    drawWave(5);
    animationId = requestAnimationFrame(render);
  };
  
  useEffect(() => {
    if (isClient) {
      init();
    }
    return () => {
      if (animationId) {
        cancelAnimationFrame(animationId);
      }
    };
  }, [isClient, blur, backgroundFill, waveOpacity, speed, waveWidth, colors]);
  
  useEffect(() => {
    setIsClient(true);
    setIsSafari(
      typeof window !== "undefined" &&
        navigator.userAgent.includes("Safari") &&
        !navigator.userAgent.includes("Chrome")
    );
  }, []);
  
  return (
    <div
      className={cn(
        "relative w-full h-full flex flex-col items-center justify-center",
        containerClassName
      )}
    >
      <canvas
        className="absolute inset-0 z-0 w-full h-full"
        ref={canvasRef}
        id="canvas"
        style={{
          ...(isClient && isSafari ? { filter: `blur(${blur}px)` } : {}),
        }}
      />
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};