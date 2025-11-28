"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { useRef } from "react";
import Card from "./Card";

type HorizontalScrollProps = {
  data: IEvent[];
  title?: string;
  collectionType?: "Event_Organized" | "My_Tickets" | "All_Events";
  userId?: string; // Pass userId from server to avoid auth() in client component
};

const HorizontalScroll = ({ data, title, collectionType, userId }: HorizontalScrollProps) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  if (!data || data.length === 0) return null;

  return (
    <div className="relative w-full mb-8">
      {title && (
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => scroll("left")}
              className="p-2 rounded-full bg-[#112240] border border-primary-500/30 hover:border-primary-500/60 transition-colors"
              aria-label="Scroll left"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              className="p-2 rounded-full bg-[#112240] border border-primary-500/30 hover:border-primary-500/60 transition-colors"
              aria-label="Scroll right"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      )}
      
      <div
        ref={scrollContainerRef}
        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-4 snap-x snap-mandatory"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
          WebkitOverflowScrolling: 'touch',
        }}
      >
        {data.map((event) => {
          const hasOrderLink = collectionType === "Event_Organized";
          const hidePrice = collectionType === "My_Tickets";

          // Calculate if user is event creator (client-side safe)
          const isEventCreator = userId ? userId === event.organizer._id.toString() : false;

          return (
            <div key={event._id} className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[320px] snap-start">
              <Card
                event={event}
                hasOrderLink={hasOrderLink}
                hidePrice={hidePrice}
                isEventCreator={isEventCreator}
                userId={userId}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HorizontalScroll;

