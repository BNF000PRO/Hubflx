"use client";

import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface StickyCTAProps {
  title: string;
  price: string;
  downloadUrl: string;
  trailerUrl?: string;
}

const StickyCTA = ({ title, price, downloadUrl, trailerUrl }: StickyCTAProps) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;
      setIsVisible(scrollPosition > windowHeight * 0.3);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 bg-[#0A192F]/95 backdrop-blur-xl border-t border-primary-500/30 shadow-2xl transition-all duration-300 ${
        isVisible ? "translate-y-0" : "translate-y-full"
      }`}
    >
      <div className="wrapper flex items-center justify-between gap-4 py-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-sm sm:text-base font-semibold text-white truncate">
            {title}
          </h3>
          <p className="text-xs sm:text-sm text-primary-400">{price}</p>
        </div>
        <div className="flex gap-3">
          {trailerUrl && (
            <Button
              asChild
              variant="outline"
              className="border-primary-500/50 text-primary-400 hover:bg-primary-500/10 hover:text-primary-300 rounded-full"
            >
              <Link href={trailerUrl} target="_blank">
                Trailer
              </Link>
            </Button>
          )}
          <Button
            asChild
            className="bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white rounded-full shadow-lg shadow-primary-500/50"
          >
            <Link href={downloadUrl} target="_blank">
              Download
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default StickyCTA;

