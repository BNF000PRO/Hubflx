"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper/core";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";

import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

// Initialize Swiper core
SwiperCore.use([Navigation, Autoplay]);

const slider = [
  {
    name: "MOVIES",
    avatar: "A",
    image: "movies.png", // Add image URL for the first testimonial
  },
  {
    name: "MAKE MONEY",
    avatar: "I",
    image: "monry.jpg", // Add image URL for the second testimonial
  },
  {
    name: "HACKING",
    avatar: "A",
    image: "hacking.png", // Add image URL for the fourth testimonial
  },
  {
    name: "DIGITAL SKILLS",
    avatar: "A",
    image: "digital.jpg", // Add image URL for the third testimonial
  },
  {
    name: "AI TOOLS",
    avatar: "A",
    image: "ai.jpg", // Add image URL for the fourth testimonial
  },
  {
    name: "TUTORIAL",
    avatar: "A",
    image: "tutorial.jpg", // Add image URL for the first testimonial
  },
  {
    name: "MUSIC",
    avatar: "Investor",
    image: "music.jpeg", // Add image URL for the third testimonial
  },
  {
    name: "EBOOKS",
    avatar: "A",
    image: "ebook.jpeg", // Add image URL for the second testimonial
  },
];

export const Slider = () => {
  return (
    <div className="w-full py-8 sm:py-12">
      <Swiper
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        spaceBetween={16}
        breakpoints={{
          640: {
            slidesPerView: 2,
            spaceBetween: 16,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 24,
          },
        }}
        onSwiper={(swiper: { autoplay: { start: () => void } }) => {
          swiper.autoplay.start();
        }}
        className="!pb-12"
      >
        {slider.map((item, index) => (
          <SwiperSlide key={index}>
            <Card
              className="group relative bg-[#112240] border border-primary-500/30 rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary-500/60 overflow-hidden glow-hover tilt-card"
            >
              {/* Gradient overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/0 to-primary-600/0 group-hover:from-primary-500/10 group-hover:to-primary-600/10 transition-all duration-300 pointer-events-none"></div>
              
              <CardHeader className="relative z-10 p-0 flex flex-col items-center justify-center min-h-[120px] sm:min-h-[140px]">
                <CardTitle className="p-0 text-center">
                  <p className="text-base sm:text-lg font-bold text-white group-hover:text-primary-400 transition-colors duration-300">
                    {item.name}
                  </p>
                </CardTitle>
                <CardContent className="pt-2 px-0"></CardContent>
              </CardHeader>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
