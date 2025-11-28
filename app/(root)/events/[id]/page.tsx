import { Button } from "@/components/ui/button";
import Collection from "@/components/shared/Collection";
import StickyCTA from "@/components/shared/StickyCTA";
import ScrollReveal from "@/components/shared/ScrollReveal";
import AnimatedGradient from "@/components/shared/AnimatedGradient";
import { formatDateTime } from "@/lib/utils";
import { SearchParamProps } from "@/types";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  getEventById,
  getRelatedEventsByCategory,
} from "@/lib/actions/event.actions";
import CheckoutButton from "@/components/shared/CheckoutButton";

const EventDetails = async ({
  params: { id },
  searchParams,
}: SearchParamProps) => {
  const event = await getEventById(id);

  const relatedEvents = await getRelatedEventsByCategory({
    categoryId: event.category._id,
    eventId: event._id,
    page: searchParams.page as string,
  });

  const price = event.isFree ? "FREE" : `$${event.price}`;

  return (
    <>
      {/* Sticky CTA Bar */}
      <StickyCTA
        title={event.title}
        price={price}
        downloadUrl={event.url}
        trailerUrl={event.TrailerUrl}
      />

      {/* Hero Section - Interactive Gallery */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#0A192F]">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-transparent to-primary-600/10"></div>
        
        <div className="wrapper relative z-10 py-12 sm:py-16 lg:py-20">
          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12 items-start">
            {/* Image First on Mobile, Right on Desktop */}
            <div className="order-1 lg:order-2 lg:sticky lg:top-20">
              <div className="relative group w-full">
                {/* Glow effect */}
                <div className="absolute -inset-4 bg-gradient-to-br from-primary-500/30 to-primary-600/20 rounded-3xl blur-3xl animate-glow"></div>
                
                {/* Image container - Full Height Display, No Crop */}
                <div className="relative overflow-visible rounded-2xl border border-primary-500/30 bg-[#112240] glow-primary w-full">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                    style={{
                      display: 'block',
                      opacity: 1,
                      visibility: 'visible',
                      maxHeight: 'none',
                    }}
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A192F]/60 via-transparent to-transparent pointer-events-none"></div>
                </div>
              </div>
            </div>

            {/* Content - Second on Mobile, First on Desktop */}
            <AnimatedGradient className="flex flex-col gap-8 order-2 lg:order-1">
              <ScrollReveal direction="up" delay={0}>
                <div className="flex flex-col gap-4">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-white via-primary-300 to-primary-500 bg-clip-text text-transparent">
                      {event.title}
                    </span>
                  </h1>
                  
                  <div className="flex flex-wrap gap-2 items-center">
                    <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30 glow-primary">
                      {price}
                    </span>
                    <span className="px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium text-gray-300 bg-primary-500/10 border border-primary-500/30">
                      {event.category.name}
                    </span>
                    <p className="text-sm text-gray-400">
                      by{" "}
                      <span className="text-primary-400 font-medium">
                    {event.organizer.firstName} {event.organizer.lastName}
                  </span>
                </p>
              </div>
            </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={200}>
                <div className="flex flex-col sm:flex-row gap-3">
                  {event.TrailerUrl && (
                    <Button
                      asChild
                      className="liquid-button bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-medium text-sm px-5 py-2.5 rounded-full glow-primary glow-hover transition-all duration-300 hover:scale-105"
                    >
                      <Link href={event.TrailerUrl} target="_blank">
                        Watch Trailer
                      </Link>
                </Button>
                  )}
                  <Button
                    asChild
                    className="liquid-button bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-medium text-sm px-5 py-2.5 rounded-full glow-primary glow-hover transition-all duration-300 hover:scale-105"
                  >
                    <Link href={event.url} target="_blank">
                      Download Now
              </Link>
                  </Button>
            </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={400}>
                <div className="flex flex-col gap-4 p-4 rounded-xl bg-[#112240] border border-primary-500/20">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/30">
                <Image
                  src="/assets/icons/calendar.svg"
                        alt="calendar"
                        width={16}
                        height={16}
                        className="filter brightness-0 invert opacity-70"
                      />
                    </div>
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-medium text-white">
                        {formatDateTime(event.startDateTime).dateOnly}
                      </p>
                      <span className="text-gray-500">•</span>
                      <p className="text-sm text-gray-300">
                    {formatDateTime(event.startDateTime).timeOnly}
                  </p>
                </div>
              </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-primary-500/10 border border-primary-500/30">
                <Image
                  src="/assets/icons/location.svg"
                  alt="location"
                        width={16}
                        height={16}
                        className="filter brightness-0 invert opacity-70"
                />
                    </div>
                    <p className="text-sm text-gray-300">{event.location}</p>
              </div>
            </div>
              </ScrollReveal>

              <ScrollReveal direction="up" delay={600}>
                <div className="flex flex-col gap-3">
                  <h3 className="text-lg sm:text-xl font-bold text-white">Synopsis</h3>
                  <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {event.description}
                  </p>
            </div>
              </ScrollReveal>
            </AnimatedGradient>

          </div>
        </div>
      </section>

      {/* Related Contents */}
      <section className="relative wrapper py-16 sm:py-20 lg:py-24 flex flex-col gap-12">
        {/* Section divider */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary-500/50 to-transparent"></div>
        
        <ScrollReveal direction="up">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold">
            <span className="bg-gradient-to-r from-white via-primary-300 to-primary-500 bg-clip-text text-transparent">
              Related Contents
            </span>
          </h2>
        </ScrollReveal>

        <ScrollReveal direction="up" delay={200}>
        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Contents Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={6}
          page={searchParams.page as string}
          totalPages={relatedEvents?.totalPages}
        />
        </ScrollReveal>
      </section>
    </>
  );
};

export default EventDetails;
