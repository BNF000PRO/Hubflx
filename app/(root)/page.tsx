import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import DetailsSubscribe from "@/components/shared/DetailsSubscribe";
import Search from "@/components/shared/Search";
import { Slider } from "@/components/shared/Slider";
import HorizontalScroll from "@/components/shared/HorizontalScroll";
import FloatingParticles from "@/components/shared/FloatingParticles";
import AnimatedGradient from "@/components/shared/AnimatedGradient";
import ScrollReveal from "@/components/shared/ScrollReveal";
import Waveform from "@/components/shared/Waveform";
import AnimatedIcons from "@/components/shared/AnimatedIcons";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { IEvent } from "@/lib/database/models/event.model";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

export default async function Home({ searchParams }: SearchParamProps) {
  const page = Number(searchParams?.page) || 1;
  const searchText = (searchParams?.query as string) || "";
  const category = (searchParams?.category as string) || "";
  const events = await getAllEvents({
    query: searchText,
    category,
    page,
    limit: 1000, // Increased limit to show all available content
  });

  // Get user ID for event creator check (server-side)
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  return (
    <>
      {/* Floating Particles Background */}
      <FloatingParticles />
      
      {/* Community Hero Section - Skool-style Layout */}
      <section className="relative min-h-[60vh] flex items-center overflow-hidden bg-[#0A192F]">
        {/* Animated gradient overlays */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-br from-primary-500/10 via-transparent to-transparent animate-gradient"></div>
          <div className="absolute bottom-0 right-0 w-1/2 h-full bg-gradient-to-tl from-primary-600/10 via-transparent to-transparent animate-gradient delay-1000"></div>
        </div>

        {/* Animated Icons - Knowledge & Social Feel */}
        <AnimatedIcons />
        
        {/* Rotating Knowledge Rings */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-primary-500/10 rounded-full animate-rotate-3d"></div>
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 border border-primary-500/10 rounded-full animate-rotate-3d" style={{ animationDirection: 'reverse', animationDuration: '25s' }}></div>
        </div>
        
        <div className="wrapper relative z-10 py-12 sm:py-16 lg:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <ScrollReveal direction="up" delay={0}>
              <div className="space-y-6 sm:space-y-8">
                <h1 className="font-bold text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-tight tracking-tight">
                  <span className="bg-gradient-to-r from-white via-primary-300 to-primary-500 bg-clip-text text-transparent">
                    The Digital City For Hustlers
                  </span>
            </h1>
                
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 text-lg sm:text-xl md:text-2xl text-gray-300">
                  <span className="font-medium">Master AI.</span>
                  <span className="hidden sm:inline text-primary-500/50">•</span>
                  <span className="font-medium">Scale Digital Growth.</span>
                  <span className="hidden sm:inline text-primary-500/50">•</span>
                  <span className="font-medium">Level Up Your Mindset.</span>
                </div>
                
                <div className="flex items-center justify-center gap-2 text-2xl sm:text-3xl pt-2">
                  <span>💰</span>
                  <span>🌟</span>
                  <span>💻</span>
                  <span>✨</span>
                </div>
                
                <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed pt-4">
                  Join a productive community focused on Technology. Access premium resources, AI tools, and connect with creators building the future.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal direction="up" delay={200} className="pt-8">
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  size="lg" 
                  asChild 
                  className="liquid-button bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold px-8 py-6 rounded-full glow-primary glow-hover transition-all duration-300 hover:scale-105"
                >
                  <Link href="#feed">
                    <span className="relative z-10">Explore Community</span>
                  </Link>
            </Button>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Netflix-Style Content Layout */}
      <section
        id="feed"
        className="relative wrapper py-8 sm:py-12"
      >
        {/* Top Controls - Minimal */}
        <div className="mb-8 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Search />
          </div>
          <div className="w-full sm:w-56">
            <CategoryFilter />
          </div>
        </div>

        {/* Featured Hero Section - Large Display */}
        {events?.data && events.data.length > 0 && (
          <div className="mb-12">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Featured</h2>
            <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-6 lg:gap-8">
              {/* Large Featured Card - Portrait */}
              <div className="group relative overflow-visible rounded-xl border border-primary-500/20 bg-[#112240] hover:border-primary-500/50 transition-all duration-300">
                {/* Fluid Flowing Glow for Featured - Always Visible */}
                <div 
                  className="absolute -inset-0.5 rounded-xl animate-fluid-glow pointer-events-none -z-10 opacity-100"
                  style={{
                    background: 'linear-gradient(45deg, transparent 30%, rgba(98, 76, 245, 0.6) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                  }}
                ></div>
                <div 
                  className="absolute -inset-1 rounded-xl animate-fluid-glow-reverse pointer-events-none -z-10 opacity-100"
                  style={{
                    background: 'linear-gradient(135deg, transparent 30%, rgba(112, 92, 247, 0.5) 50%, transparent 70%)',
                    backgroundSize: '200% 200%',
                  }}
                ></div>
                
                <Link href={`/events/${events.data[0]._id}`} className="block">
                  <div className="relative overflow-visible flex flex-col items-center justify-center p-4">
                    {events.data[0].imageUrl && (
                      <img
                        src={events.data[0].imageUrl}
                        alt={events.data[0].title}
                        className="w-full h-auto object-contain transition-transform duration-700 group-hover:scale-105"
                        style={{ 
                          display: 'block', 
                          opacity: 1, 
                          visibility: 'visible',
                          maxHeight: '500px',
                          maxWidth: '100%',
                        }}
                      />
                    )}
                    <div className="w-full mt-4 p-6 sm:p-8 bg-gradient-to-t from-[#0A192F] via-[#0A192F]/80 to-transparent rounded-lg">
                      <div className="flex gap-2 mb-3">
                        <span className="px-3 py-1 rounded-full text-xs font-semibold text-emerald-300 bg-emerald-500/20 border border-emerald-500/30">
                          {events.data[0].isFree ? "FREE" : `$${events.data[0].price}`}
                        </span>
                        <span className="px-3 py-1 rounded-full text-xs font-medium text-gray-300 bg-primary-500/10 border border-primary-500/30">
                          {events.data[0].category.name}
                        </span>
                      </div>
                      <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2 line-clamp-2 group-hover:text-primary-400 transition-colors">
                        {events.data[0].title}
                      </h3>
                      <p className="text-sm text-gray-400 line-clamp-2">
                        {events.data[0].description}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Sidebar - Smaller Cards */}
              <div className="space-y-4">
                {events.data.slice(1, Math.min(4, events.data.length)).map((event: IEvent) => (
                  <Link
                    key={event._id}
                    href={`/events/${event._id}`}
                    className="group relative block overflow-hidden rounded-lg border border-primary-500/20 bg-[#112240] hover:border-primary-500/50 transition-all duration-300"
                  >
                    {/* Fluid Glow for Side Cards - Always Visible */}
                    <div 
                      className="absolute -inset-0.5 rounded-lg animate-fluid-glow pointer-events-none -z-10 opacity-100"
                      style={{
                        background: 'linear-gradient(45deg, transparent 30%, rgba(98, 76, 245, 0.4) 50%, transparent 70%)',
                        backgroundSize: '200% 200%',
                      }}
                    ></div>
                    
                    <div className="flex gap-3">
                      <div className="relative w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 overflow-hidden">
                        {event.imageUrl && (
                          <img
                            src={event.imageUrl}
                            alt={event.title}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                            style={{ display: 'block', opacity: 1, visibility: 'visible' }}
                          />
                        )}
                      </div>
                      <div className="flex-1 p-3 flex flex-col justify-center min-w-0">
                        <h4 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-primary-400 transition-colors mb-1">
                          {event.title}
                        </h4>
                        <div className="flex gap-1.5 flex-wrap">
                          <span className="px-2 py-0.5 rounded text-xs font-medium text-emerald-300 bg-emerald-500/20">
                            {event.isFree ? "FREE" : `$${event.price}`}
                          </span>
                          <span className="px-2 py-0.5 rounded text-xs text-gray-400">
                            {event.category.name}
                          </span>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Trending Topics */}
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-white mb-6">Trending Topics</h2>
          <Slider />
        </div>

        {/* Main Collection - Horizontal Scroll */}
        {events?.data && events.data.length > 4 && (
          <HorizontalScroll
            data={events.data.slice(4)}
            title="All Resources"
            collectionType="All_Events"
            userId={userId}
          />
        )}
        

        {/* Subscribe - Mobile Only */}
        <div className="mt-8 sm:hidden">
          <DetailsSubscribe />
        </div>
      </section>
    </>
  );
}
