import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const DetailsSubscribe = () => {
  return (
    <div
      className="group relative flex min-h-[200px] w-full
    flex-col overflow-hidden rounded-2xl bg-gradient-to-br from-[#112240] to-[#0A192F]
    border border-primary-500/30 shadow-lg hover:shadow-xl transition-all duration-300
    hover:border-primary-500/60 glow-hover tilt-card"
    >
      {/* Decorative gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 animate-float"></div>
      
      <div className="relative z-10 p-6 flex flex-col gap-4 flex-1">
        <div className="space-y-2">
          <h3 className="text-lg font-bold text-white">Welcome to Hubnet</h3>
          <p className="text-sm text-gray-300 leading-relaxed">
        Elevate your online experience! 🚀 Join our Whatsapp Channel to stay
        updated with the latest contents! 🌟💻✨
      </p>
        </div>

        <Button 
          asChild
          className="liquid-button mt-auto bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold rounded-full shadow-lg hover:shadow-xl glow-primary glow-hover transition-all duration-300 hover:scale-105"
        >
        <Link
          href="https://chat.whatsapp.com/BDmeql20MzELIsPJfBxeTt"
          target={"_blank"}
        >
          Subscribe for free
        </Link>
      </Button>
      </div>
    </div>
  );
};

export default DetailsSubscribe;
