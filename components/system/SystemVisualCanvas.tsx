"use client";

import { useEffect, useRef } from "react";
import type { MotionValue } from "framer-motion";

type VisualVariant = "core" | "erp" | "crm" | "ai";

type SystemVisualCanvasProps = {
  variant: VisualVariant;
  progress: MotionValue<number>;
  reducedMotion: boolean;
};

function drawNode(ctx: CanvasRenderingContext2D, x: number, y: number, r: number, alpha: number) {
  ctx.beginPath();
  ctx.arc(x, y, r, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(0, 113, 227, ${alpha})`;
  ctx.fill();
}

function drawLine(
  ctx: CanvasRenderingContext2D,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  alpha: number
) {
  ctx.beginPath();
  ctx.moveTo(x1, y1);
  ctx.lineTo(x2, y2);
  ctx.strokeStyle = `rgba(0, 113, 227, ${alpha})`;
  ctx.lineWidth = 1.25;
  ctx.stroke();
}

export function SystemVisualCanvas({ variant, progress, reducedMotion }: SystemVisualCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const progressRef = useRef(0);

  useEffect(() => {
    const unsubscribe = progress.on("change", (next) => {
      progressRef.current = next;
    });

    return () => {
      unsubscribe();
    };
  }, [progress]);

  useEffect(() => {
    if (reducedMotion) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const drawCore = (time: number) => {
      const p = progressRef.current;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const radius = Math.min(width, height) * 0.27;
      const nodeCount = 12;
      const pulse = (time * 0.0012) % 1;

      const points: Array<{ x: number; y: number }> = [];
      for (let i = 0; i < nodeCount; i += 1) {
        const angle = (i / nodeCount) * Math.PI * 2 + time * 0.00015 * (0.4 + p * 0.8);
        points.push({
          x: cx + Math.cos(angle) * radius,
          y: cy + Math.sin(angle) * radius,
        });
      }

      points.forEach((pt, idx) => {
        const next = points[(idx + 1) % points.length];
        drawLine(ctx, pt.x, pt.y, next.x, next.y, 0.16 + p * 0.14);
        drawLine(ctx, pt.x, pt.y, cx, cy, 0.09 + p * 0.09);
      });

      const pulseIndex = Math.floor(pulse * nodeCount);
      points.forEach((pt, idx) => {
        const activeBoost = idx === pulseIndex ? 0.35 : 0;
        drawNode(ctx, pt.x, pt.y, 3 + p * 1.2, 0.42 + activeBoost);
      });
      drawNode(ctx, cx, cy, 6 + p * 2, 0.8);
    };

    const drawErp = (time: number) => {
      const p = progressRef.current;
      const laneY = [height * 0.34, height * 0.5, height * 0.66];
      const startX = width * 0.14;
      const endX = width * 0.86;

      laneY.forEach((y) => {
        drawLine(ctx, startX, y, endX, y, 0.16 + p * 0.14);
      });

      const checkpoints = [0.18, 0.38, 0.58, 0.78].map((pos) => width * pos);
      checkpoints.forEach((x) => {
        drawLine(ctx, x, laneY[0], x, laneY[2], 0.1 + p * 0.1);
        drawNode(ctx, x, laneY[1], 3.2, 0.56);
      });

      const t = (time * 0.00022) % 1;
      laneY.forEach((y, idx) => {
        const laneOffset = (t + idx * 0.22) % 1;
        const x = startX + (endX - startX) * laneOffset;
        drawNode(ctx, x, y, 4.3, 0.88);
      });
    };

    const drawCrm = (time: number) => {
      const p = progressRef.current;
      const points = [
        { x: width * 0.18, y: height * 0.45 },
        { x: width * 0.45, y: height * 0.38 },
        { x: width * 0.72, y: height * 0.56 },
        { x: width * 0.88, y: height * 0.48 },
      ];

      for (let i = 0; i < points.length - 1; i += 1) {
        const from = points[i];
        const to = points[i + 1];
        drawLine(ctx, from.x, from.y, to.x, to.y, 0.18 + p * 0.15);
      }

      points.forEach((pt, idx) => {
        drawNode(ctx, pt.x, pt.y, idx === points.length - 1 ? 6.2 : 5.1, 0.7);
      });

      const t = (time * 0.0002) % 1;
      const segment = Math.min(points.length - 2, Math.floor(t * (points.length - 1)));
      const localT = (t * (points.length - 1)) % 1;
      const from = points[segment];
      const to = points[segment + 1];
      drawNode(ctx, from.x + (to.x - from.x) * localT, from.y + (to.y - from.y) * localT, 4.6, 0.95);
    };

    const drawAi = (time: number) => {
      const p = progressRef.current;
      const cx = width * 0.5;
      const cy = height * 0.5;
      const rings = [0.16, 0.27, 0.38].map((r) => Math.min(width, height) * r);

      rings.forEach((r, idx) => {
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(0, 113, 227, ${0.08 + idx * 0.05 + p * 0.05})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      const rayCount = 14;
      for (let i = 0; i < rayCount; i += 1) {
        const angle = (i / rayCount) * Math.PI * 2 + time * 0.00008;
        const x = cx + Math.cos(angle) * rings[2];
        const y = cy + Math.sin(angle) * rings[2];
        drawLine(ctx, cx, cy, x, y, 0.07 + p * 0.08);
        drawNode(ctx, x, y, 2.8, 0.46);
      }

      const pulseRadius = rings[0] + ((time * 0.05) % (rings[2] - rings[0]));
      ctx.beginPath();
      ctx.arc(cx, cy, pulseRadius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(0, 113, 227, 0.26)";
      ctx.lineWidth = 1.4;
      ctx.stroke();

      drawNode(ctx, cx, cy, 6.6, 0.9);
    };

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);

      const glow = ctx.createRadialGradient(width * 0.5, height * 0.5, 0, width * 0.5, height * 0.5, width * 0.45);
      glow.addColorStop(0, "rgba(0, 113, 227, 0.06)");
      glow.addColorStop(1, "rgba(0, 113, 227, 0)");
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, width, height);

      if (variant === "core") drawCore(time);
      if (variant === "erp") drawErp(time);
      if (variant === "crm") drawCrm(time);
      if (variant === "ai") drawAi(time);

      raf = window.requestAnimationFrame(draw);
    };

    resize();
    raf = window.requestAnimationFrame(draw);
    window.addEventListener("resize", resize);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, [reducedMotion, variant]);

  if (reducedMotion) {
    return (
      <div className="h-full w-full p-6 sm:p-8 flex items-center justify-center" aria-hidden>
        <div className="w-full max-w-[460px] space-y-4">
          <div className="h-2 rounded-full bg-blue/20" />
          <div className="grid grid-cols-3 gap-3">
            <div className="h-14 rounded-xl border border-border bg-background" />
            <div className="h-14 rounded-xl border border-border bg-background" />
            <div className="h-14 rounded-xl border border-border bg-background" />
          </div>
          <div className="h-24 rounded-2xl border border-border bg-background" />
        </div>
      </div>
    );
  }

  return <canvas ref={canvasRef} className="h-full w-full" aria-hidden />;
}
