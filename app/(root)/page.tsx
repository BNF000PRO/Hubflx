import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import DetailsSubscribe from "@/components/shared/DetailsSubscribe";
import Search from "@/components/shared/Search";
import { Slider } from "@/components/shared/Slider";
import FloatingParticles from "@/components/shared/FloatingParticles";
import AnimatedGradient from "@/components/shared/AnimatedGradient";
import ScrollReveal from "@/components/shared/ScrollReveal";
import Waveform from "@/components/shared/Waveform";
import AnimatedIcons from "@/components/shared/AnimatedIcons";
import { Button } from "@/components/ui/button";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
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
    limit: 12,
  });

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

      {/* Community Feed - Skool Style Simple Layout */}
      <section
        id="feed"
        className="relative wrapper py-8 sm:py-12"
      >
        {/* Top Controls */}
        <div className="mb-6 flex flex-col sm:flex-row gap-3">
          <div className="flex-1">
            <Search />
          </div>
          <div className="w-full sm:w-56">
            <CategoryFilter />
          </div>
        </div>

        {/* Trending Topics - Compact */}
        <div className="mb-8">
          <Slider />
        </div>

        {/* Main Feed - Simple Continuous Layout */}
        <Collection
          data={events?.data || []}
          emptyTitle="No Contents Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={12}
          page={page}
          totalPages={events?.totalPages}
        />

        {/* Subscribe - Mobile Only */}
        <div className="mt-6 sm:hidden">
          <DetailsSubscribe />
        </div>
      </section>
    </>
  );
}
