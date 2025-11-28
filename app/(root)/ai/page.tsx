import HorizontalScroll from "@/components/shared/HorizontalScroll";
import { getAllEvents } from "@/lib/actions/event.actions";
import { SearchParamProps } from "@/types";
import { auth } from "@clerk/nextjs";
import Link from "next/link";

export default async function AIPage({ searchParams }: SearchParamProps) {
  // Get user ID for event creator check (server-side)
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;
  const page = Number(searchParams?.page) || 1;
  
  // Fetch AI-related content (you can filter by category later)
  const aiTools = await getAllEvents({
    query: "AI tools",
    category: "",
    page: 1,
    limit: 20,
  });

  const aiNews = await getAllEvents({
    query: "AI news",
    category: "",
    page: 1,
    limit: 20,
  });

  const aiHustle = await getAllEvents({
    query: "AI hustle",
    category: "",
    page: 1,
    limit: 20,
  });

  const aiAutomation = await getAllEvents({
    query: "AI automation",
    category: "",
    page: 1,
    limit: 20,
  });

  return (
    <div className="wrapper py-8 sm:py-12">
      {/* Hero Section */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
          <span className="bg-gradient-to-r from-white via-primary-300 to-primary-500 bg-clip-text text-transparent">
            AI Hub
          </span>
        </h1>
        <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto">
          Everything you need to master AI, scale your business, and automate your workflow
        </p>
      </div>

      {/* AI Tools Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">AI Tools</h2>
          <Link 
            href="/ai/tools" 
            className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
          >
            See All →
          </Link>
        </div>
        <p className="text-gray-400 mb-6 max-w-3xl">
          Discover powerful AI tools to enhance your productivity, creativity, and business operations.
        </p>
        {aiTools?.data && aiTools.data.length > 0 ? (
          <HorizontalScroll
            data={aiTools.data}
            collectionType="All_Events"
            userId={userId}
          />
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>No AI tools available yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* AI News Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">AI News</h2>
          <Link 
            href="/ai/news" 
            className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
          >
            See All →
          </Link>
        </div>
        <p className="text-gray-400 mb-6 max-w-3xl">
          Stay updated with the latest AI developments, breakthroughs, and industry insights.
        </p>
        {aiNews?.data && aiNews.data.length > 0 ? (
          <HorizontalScroll
            data={aiNews.data}
            collectionType="All_Events"
            userId={userId}
          />
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>No AI news available yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* Hustle for AI Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">Hustle for AI</h2>
          <Link 
            href="/ai/hustle" 
            className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
          >
            See All →
          </Link>
        </div>
        <p className="text-gray-400 mb-6 max-w-3xl">
          Learn how to monetize AI, build AI-powered businesses, and create income streams with artificial intelligence.
        </p>
        {aiHustle?.data && aiHustle.data.length > 0 ? (
          <HorizontalScroll
            data={aiHustle.data}
            collectionType="All_Events"
            userId={userId}
          />
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>No hustle content available yet. Check back soon!</p>
          </div>
        )}
      </section>

      {/* AI Automation Section */}
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">AI Automation</h2>
          <Link 
            href="/ai/automation" 
            className="text-primary-400 hover:text-primary-300 text-sm font-medium transition-colors"
          >
            See All →
          </Link>
        </div>
        <p className="text-gray-400 mb-6 max-w-3xl">
          Automate your workflows, streamline processes, and boost efficiency with AI-powered automation solutions.
        </p>
        {aiAutomation?.data && aiAutomation.data.length > 0 ? (
          <HorizontalScroll
            data={aiAutomation.data}
            collectionType="All_Events"
            userId={userId}
          />
        ) : (
          <div className="text-center py-12 text-gray-400">
            <p>No automation content available yet. Check back soon!</p>
          </div>
        )}
      </section>
    </div>
  );
}

