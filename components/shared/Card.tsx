import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";
import SaveToVaultButton from "./SaveToVaultButton";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
  isEventCreator?: boolean; // Optional prop to avoid auth() in client components
  userId?: string; // Pass userId from server to avoid auth() in client component
};

const Card = ({ event, hasOrderLink, hidePrice, isEventCreator: propIsEventCreator, userId: propUserId }: CardProps) => {
  // Only use auth() if isEventCreator prop is not provided (server component context)
  let isEventCreator = false;
  let userId: string | undefined = propUserId;
  
  try {
    if (propIsEventCreator !== undefined) {
      isEventCreator = propIsEventCreator;
    } else {
      // Server component context - safe to use auth()
      const { sessionClaims } = auth();
      userId = sessionClaims?.userId as string;
      isEventCreator = userId === event.organizer._id.toString();
    }
  } catch (error) {
    // If auth() fails (client context), use prop or default to false
    isEventCreator = propIsEventCreator || false;
  }
  return (
    <div
      className="group relative flex w-full flex-col overflow-hidden bg-[#112240] border border-primary-500/20
    shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary-500/50
    tilt-card glow-hover"
    >
      {/* Fluid Flowing Glow Around Card Edges - Always Visible, Infinite Animation */}
      <div 
        className="absolute -inset-0.5 rounded-lg animate-fluid-glow pointer-events-none -z-10 opacity-100"
        style={{
          background: 'linear-gradient(45deg, transparent 30%, rgba(98, 76, 245, 0.5) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
      ></div>
      <div 
        className="absolute -inset-1 rounded-lg animate-fluid-glow-reverse pointer-events-none -z-10 opacity-100"
        style={{
          background: 'linear-gradient(135deg, transparent 30%, rgba(112, 92, 247, 0.4) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
        }}
      ></div>
      <div 
        className="absolute -inset-0.5 rounded-lg animate-fluid-glow pointer-events-none -z-10 opacity-100"
        style={{
          background: 'linear-gradient(225deg, transparent 30%, rgba(98, 76, 245, 0.35) 50%, transparent 70%)',
          backgroundSize: '200% 200%',
          animationDelay: '2s',
        }}
      ></div>
      
      {/* Image Container - Full Height, No Cropping */}
      <Link
        href={`/events/${event._id}`}
        className="relative block w-full bg-gradient-to-br from-[#0A192F] to-[#112240] overflow-visible"
        style={{ margin: 0, padding: 0, marginBottom: 0 }}
      >
        {event.imageUrl ? (
          <>
            {/* Image displays full height, no cropping */}
            <img
              src={event.imageUrl}
              alt={event.title}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-105"
              style={{
                display: 'block',
                opacity: 1,
                visibility: 'visible',
                zIndex: 10,
                margin: 0,
                padding: 0,
                maxHeight: '400px',
              }}
            />
            {/* Glow overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary-500/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none z-20"></div>
            {/* Sharp edge glow */}
            <div className="absolute inset-0 border-b border-primary-500/0 group-hover:border-primary-500/50 transition-colors duration-300 pointer-events-none z-20"></div>
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-gray-500 text-sm">No image available</p>
          </div>
        )}
      </Link>

      {/* Save to Vault Button - Top Right */}
      <div className="absolute right-3 top-3 z-30">
        <SaveToVaultButton 
          contentId={event._id} 
          contentType="event"
          userId={userId}
        />
      </div>

      {/* Edit/Delete Actions */}
      {isEventCreator && !hidePrice && (
        <div className="absolute right-3 top-14 flex flex-col gap-2 p-2 bg-[#0A192F]/90 backdrop-blur-md shadow-lg border border-primary-500/30 rounded-lg z-30">
          <Link 
            href={`/events/${event._id}/update`}
            className="p-1.5 rounded-lg hover:bg-primary-500/20 transition-colors"
          >
            <img
              src="/assets/icons/edit.svg"
              alt="edit"
              width={18}
              height={18}
              className="filter brightness-0 invert"
              style={{ display: 'block', opacity: 1, visibility: 'visible' }}
            />
          </Link>
          <DeleteConfirmation eventId={event._id} />
        </div>
      )}

      {/* Content - Compact and Minimal */}
      <div className="flex flex-col gap-3 p-4 sm:p-5" style={{ marginTop: 0 }}>
        {/* Badges - Compact */}
        <div className="flex flex-wrap gap-1.5">
          <span className="px-2.5 py-1 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30">
            {event.isFree ? "FREE" : `$${event.price}`}
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium text-gray-300 bg-primary-500/10 border border-primary-500/30">
            {event.category.name}
          </span>
        </div>

        {/* Title - Prominent */}
        <Link href={`/events/${event._id}`} className="group/title">
          <h3 className="text-base sm:text-lg font-semibold text-white line-clamp-2 group-hover/title:text-primary-400 transition-colors leading-tight">
            {event.title}
          </h3>
        </Link>

        {/* Footer - Minimal */}
        <div className="flex items-center justify-between pt-2 border-t border-primary-500/10">
          <p className="text-xs text-gray-500 truncate pr-2">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
          <Link 
            href={`/events/${event._id}`} 
            className="flex items-center gap-1 text-primary-400 hover:text-primary-300 font-medium text-xs group/link transition-colors"
          >
            <span>View</span>
            <img
              src="/assets/icons/arrow.svg"
              alt="arrow"
              width={10}
              height={10}
              className="transform group-hover/link:translate-x-0.5 transition-transform filter brightness-0 invert"
              style={{ display: 'block', opacity: 1, visibility: 'visible' }}
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Card;
