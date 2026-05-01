"use client";

import { useEffect, useRef } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role='button'], input[type='button'], input[type='submit'], input[type='reset'], summary, label[for], [data-cursor='hover']";

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mediaQuery = window.matchMedia(
      "(max-width: 1024px), (hover: none), (pointer: coarse), (prefers-reduced-motion: reduce)",
    );
    if (mediaQuery.matches) {
      return;
    }

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let ringScale = 1;
    let targetScale = 1;
    const speed = 0.15;
    const scaleSpeed = 0.2;
    let frameId = 0;

    const root = document.documentElement;
    root.classList.add("has-custom-cursor");

    const setHoverState = (isHovering: boolean) => {
      targetScale = isHovering ? 1.7 : 1;
      ringRef.current?.classList.toggle("cursor-hover", isHovering);
    };

    const moveCursor = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`;
        dotRef.current.classList.add("cursor-visible");
      }

      ringRef.current?.classList.add("cursor-visible");
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = (e.target as Element | null)?.closest(INTERACTIVE_SELECTOR);
      setHoverState(Boolean(target));
    };

    const onMouseOut = (e: MouseEvent) => {
      const current = (e.target as Element | null)?.closest(INTERACTIVE_SELECTOR);
      const related = (e.relatedTarget as Element | null)?.closest(INTERACTIVE_SELECTOR);
      if (current && current === related) {
        return;
      }
      if (!related) {
        setHoverState(false);
      }
    };

    const onMouseDown = () => {
      ringRef.current?.classList.add("cursor-active");
      targetScale = targetScale > 1 ? 1.35 : 0.88;
    };

    const onMouseUp = () => {
      ringRef.current?.classList.remove("cursor-active");
      targetScale = ringRef.current?.classList.contains("cursor-hover") ? 1.7 : 1;
    };

    const animate = () => {
      ringX += (mouseX - ringX) * speed;
      ringY += (mouseY - ringY) * speed;
      ringScale += (targetScale - ringScale) * scaleSpeed;

      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${ringScale})`;
      }

      frameId = window.requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", moveCursor, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    window.addEventListener("mouseout", onMouseOut, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    frameId = window.requestAnimationFrame(animate);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", onMouseOver);
      window.removeEventListener("mouseout", onMouseOut);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      root.classList.remove("has-custom-cursor");
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot" aria-hidden />
      <div ref={ringRef} className="cursor-ring" aria-hidden />
    </>
  );
}
