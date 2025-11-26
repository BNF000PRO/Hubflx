"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "fade" | "scale";
}

const ScrollReveal = ({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: ScrollRevealProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Check if element is already in viewport on mount
    const checkInitialVisibility = () => {
      const rect = element.getBoundingClientRect();
      const isInViewport = 
        rect.top < window.innerHeight + 200 && 
        rect.bottom > -200 && 
        rect.left < window.innerWidth + 200 && 
        rect.right > -200;
      
      if (isInViewport) {
        // Show immediately if already in viewport
        setIsVisible(true);
        return true;
      }
      return false;
    };

    // Check immediately and after a short delay for hydration
    const timeout1 = setTimeout(() => {
      if (checkInitialVisibility()) {
        return;
      }
    }, 100);

    // Set up observer for elements not initially visible
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setIsVisible(true), delay);
          observer.unobserve(element);
        }
      },
      { threshold: 0.01, rootMargin: "200px" }
    );

    const timeout2 = setTimeout(() => {
      observer.observe(element);
    }, 200);

    return () => {
      clearTimeout(timeout1);
      clearTimeout(timeout2);
      observer.unobserve(element);
    };
  }, [delay]);

  const getTransform = () => {
    if (!isVisible) {
      switch (direction) {
        case "up":
          return "translateY(30px)";
        case "down":
          return "translateY(-30px)";
        case "left":
          return "translateX(30px)";
        case "right":
          return "translateX(-30px)";
        case "scale":
          return "scale(0.9)";
        default:
          return "none";
      }
    }
    return "none";
  };

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: "opacity 0.6s ease-out, transform 0.6s ease-out",
      }}
    >
      {children}
    </div>
  );
};

export default ScrollReveal;

