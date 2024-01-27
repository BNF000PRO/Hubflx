import CategoryFilter from "@/components/shared/CategoryFilter";
import Collection from "@/components/shared/Collection";
import DetailsSubscribe from "@/components/shared/DetailsSubscribe";
import Search from "@/components/shared/Search";
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
      <section className=" bg-primary-50 bg-dotted-pattern bg-contain py-5 md:py-8 pt-1">
        <div className=" m-4 grid grid-cols-1 gap-5 md:grid-cols-2 2xl:gap-0">
          <div className="flex flex-col justify-center gap-3">
            <h1 className="font-bold text-3xl sm:text-3xl md:text-5xl lg:text-5xl">
              Download, Promote, Connect: Explore Contents on Our Platform!
            </h1>
            <p className="p-regular-12 md:p-regular-20 size-fit ">
              Download free quality Entertainment contents, resources, Explore
              Ai tools and promote products with our global community.
            </p>
            <Button size="lg" asChild className="button w-full sm:w-fit">
              <Link href="#events">Explore Now</Link>
            </Button>
          </div>

          <Image
            src="/assets/images/hero.png"
            alt="hero"
            width={1000}
            height={1000}
            className="max-h-[75vh] object-contain object-center 2xl:max-h-[50vh]"
          />
        </div>
      </section>
      <section
        id="collections"
        className="wrapper my-8 flex flex-col mt-1 gap-5 md:gap-12"
      >
        <h2 className="h2-bold pt-1">
          Trusted by <br /> Thousands of Visitors
        </h2>

        <div className="flex w-full flex-col gap-5 md:flex-row">
          <CategoryFilter />
          <DetailsSubscribe />
          <Search />
        </div>

        <Collection
          data={events?.data}
          emptyTitle="No Contents Found"
          emptyStateSubtext="Come back later"
          collectionType="All_Events"
          limit={12}
          page={page}
          totalPages={events?.totalPages}
        />
      </section>
    </>
  );
}
