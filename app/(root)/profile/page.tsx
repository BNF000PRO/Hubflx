import Collection from "@/components/shared/Collection";
import { Button } from "@/components/ui/button";
import { getEventsByUser } from "@/lib/actions/event.actions";
import { auth } from "@clerk/nextjs";
import Link from "next/link";
import React from "react";

const ProfilePage = async () => {
  const { sessionClaims } = auth();
  const userId = sessionClaims?.userId as string;

  const OrganizedEvents = await getEventsByUser({ userId, page: 1 });
  return (
    <>
      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 ">
        <div className=" wrapper ml-2 flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left ml-2">
            My Saved Contents
          </h3>

          <Button asChild size="lg" className="button hidden sm:flex mr-2">
            <Link href="#events">Explore More Contents</Link>
          </Button>
        </div>
      </section>

      {/* <section className="wrapper my-8">
        <Collection
          data={relatedEvents?.data}
          emptyTitle="No Contents Saved yet"
          emptyStateSubtext="Try Saving or Downloading a few Contents"
          collectionType="My_Tickets"
          limit={10}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
      </section> */}

      <section className="bg-primary-50 bg-dotted-pattern bg-cover bg-center py-5 md:py-10 ">
        <div className=" wrapper ml-2 flex items-center justify-center sm:justify-between">
          <h3 className="h3-bold text-center sm:text-left ml-2">
            Contents Created
          </h3>

          <Button asChild size="lg" className="button hidden sm:flex mr-2">
            <Link href="#events">Create New Event</Link>
          </Button>
        </div>
      </section>

      <section className="wrapper my-8">
        <Collection
          data={OrganizedEvents?.data}
          emptyTitle="No Contents have been created yet"
          emptyStateSubtext="Try Creating a few Contents"
          collectionType="Event_Organized"
          limit={10}
          page={1}
          urlParamName="ordersPage"
          totalPages={2}
        />
      </section>
    </>
  );
};

export default ProfilePage;
