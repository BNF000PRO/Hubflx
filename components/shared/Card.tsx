import { IEvent } from "@/lib/database/models/event.model";
import { formatDateTime } from "@/lib/utils";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { DeleteConfirmation } from "./DeleteConfirmation";

type CardProps = {
  event: IEvent;
  hasOrderLink?: boolean;
  hidePrice?: boolean;
};

const Card = ({ event, hasOrderLink, hidePrice }: CardProps) => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const isEventCreator = userId === event.organizer._id.toString();
  return (
    <div
      className="group relative flex w-full flex-col overflow-hidden bg-[#112240] border border-primary-500/20
    shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 hover:border-primary-500/50
    tilt-card glow-hover"
    >
      {/* Infinite Pulse Glow Animation - Always Visible Behind Card */}
      <div className="absolute -inset-2 bg-gradient-to-r from-primary-500/15 via-primary-600/15 to-primary-500/15 rounded-lg animate-pulse-glow blur-2xl -z-10"></div>
      <div className="absolute -inset-3 bg-gradient-to-r from-primary-600/8 via-primary-500/8 to-primary-600/8 rounded-lg animate-pulse-glow-slow blur-3xl -z-10"></div>
      
      {/* Soft Glow Behind LinkComponent */}
      <div className="absolute -inset-1 bg-gradient-to-br from-primary-500/10 to-primary-600/10 rounded-lg blur-xl -z-10 animate-pulse-glow"></div>
      
      {/* Image Container - Full Height, No Spacing */}
      <Link
        href={`/events/${event._id}`}
        className="relative block w-full bg-gradient-to-br from-[#0A192F] to-[#112240] overflow-hidden h-[500px] sm:h-[600px]"
        style={{ margin: 0, padding: 0, marginBottom: 0 }}
      >
        {event.imageUrl ? (
          <>
            {/* Image fills entire container with no spacing */}
            <img
              src={event.imageUrl}
              alt={event.title}
              className="absolute inset-0 w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
              style={{
                display: 'block',
                opacity: 1,
                visibility: 'visible',
                zIndex: 10,
                margin: 0,
                padding: 0,
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

      {/* Edit/Delete Actions */}
      {isEventCreator && !hidePrice && (
        <div className="absolute right-3 top-3 flex flex-col gap-2 p-2 bg-[#0A192F]/90 backdrop-blur-md shadow-lg border border-primary-500/30 rounded-lg">
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

      {/* Content - Directly After Image, No Gap */}
      <div className="flex flex-col gap-4 p-5 sm:p-6" style={{ marginTop: 0 }}>
        {/* Badges */}
        <div className="flex flex-wrap gap-2">
          <span className="px-4 py-2 rounded-full text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 glow-primary">
            {event.isFree ? "FREE" : `$${event.price}`}
          </span>
          <span className="px-4 py-2 rounded-full text-xs sm:text-sm font-medium text-gray-300 bg-primary-500/10 border border-primary-500/30">
            {event.category.name}
          </span>
        </div>

        {/* Date */}
        <p className="text-sm text-gray-400 font-medium">
          {formatDateTime(event.startDateTime).dateTime}
        </p>

        {/* Title */}
        <Link href={`/events/${event._id}`} className="group/title">
          <h3 className="text-lg sm:text-xl font-semibold text-white line-clamp-2 group-hover/title:text-primary-400 transition-colors">
            {event.title}
          </h3>
        </Link>

        {/* Footer */}
        <div className="flex items-center justify-between pt-3 border-t border-primary-500/20">
          <p className="text-sm text-gray-400 font-medium truncate pr-2">
            {event.organizer.firstName} {event.organizer.lastName}
          </p>
          <Link 
            href={`/events/${event._id}`} 
            className="flex items-center gap-1.5 text-primary-400 hover:text-primary-300 font-medium text-sm group/link transition-colors"
          >
            <span>View</span>
            <img
              src="/assets/icons/arrow.svg"
              alt="arrow"
              width={12}
              height={12}
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
