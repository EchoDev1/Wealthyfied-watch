"use client";

import { useEffect, useState } from "react";

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(true);

  useEffect(() => {
    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsHidden(false);

      const target = e.target;
      setIsPointer(
        window.getComputedStyle(target).cursor === "pointer" ||
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("button") ||
        target.closest("a")
      );
    };

    const onMouseLeave = () => setIsHidden(true);
    const onMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (isHidden) return null;

  return (
    <>
      {/* Outer Ring */}
      <div
        className="fixed top-0 left-0 w-8 h-8 border border-[#D4AF37] rounded-full pointer-events-none z-[9999] transition-transform duration-150 ease-out"
        style={{
          transform: `translate(${position.x - 16}px, ${position.y - 16}px) scale(${isPointer ? 1.5 : 1})`,
          opacity: isPointer ? 0.5 : 1,
        }}
      />
      {/* Inner Dot */}
      <div
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-[#D4AF37] rounded-full pointer-events-none z-[9999]"
        style={{
          transform: `translate(${position.x - 3}px, ${position.y - 3}px)`,
        }}
      />
    </>
  );
}
