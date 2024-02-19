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
    <div className="px-10 pb-20">
      <h2 className="text-center text-2xl mt-10 text-white font-extrabold mb-10">
        Our Investors Say!
      </h2>
      <Swiper
        slidesPerView={1}
        autoplay={{ delay: 3000, disableOnInteraction: false }} // Add autoplay settings
        spaceBetween={20} // Add space between cards
        breakpoints={{
          640: {
            slidesPerView: 1, // Show one card on mobile
            spaceBetween: 0, // No space between cards on mobile
          },
          768: {
            slidesPerView: 2, // Show two cards on tablet
            spaceBetween: 20, // Add space between cards on tablet
          },
          1024: {
            slidesPerView: 4, // Show four cards on desktop
            spaceBetween: 20, // Add space between cards on desktop
          },
        }}
        onSwiper={(swiper: { autoplay: { start: () => void } }) => {
          swiper.autoplay.start(); // Start autoplay when Swiper is initialized
        }}
      >
        {slider.map((item) => (
          <SwiperSlide>
            <Card
              className="bg-white text-black p-6 shadow-xl transform transition-transform hover:scale-105"
              style={{
                width: "250px",
                height: "200px",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <CardHeader>
                <div className="flex justify-center items-center mb-4">
                  <img
                    src={item.image}
                    alt={`${item.name}'s Avatar`}
                    className="w-30 h-20 rounded-full border-white border-4"
                  />
                </div>
                <CardTitle>
                  <p className="text-lg font-bold">{item.name}</p>
                </CardTitle>
                <CardContent className="pt-4 px-0"></CardContent>
              </CardHeader>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
