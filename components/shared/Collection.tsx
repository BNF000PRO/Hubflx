import { IEvent } from "@/lib/database/models/event.model";
import React from "react";
import Card from "./Card";
import Pagination from "./Pagination";

type CollectionProps = {
  data: IEvent[];
  emptyTitle: string;
  emptyStateSubtext: string;
  limit: number;
  page: number | string;
  totalPages?: number;
  urlParamName?: string;
  collectionType?: "Event_Organized" | "My_Tickets" | "All_Events";
};

const Collection = ({
  data,
  emptyTitle,
  emptyStateSubtext,
  limit,
  page,
  totalPages = 0,
  collectionType,
  urlParamName,
}: CollectionProps) => {
  // Ensure data is an array
  const eventsData = Array.isArray(data) ? data : [];

  return (
    <div className="w-full">
      {eventsData.length > 0 ? (
        <div className="flex flex-col gap-8 sm:gap-12 w-full">
          <ul
            className="grid w-full grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 list-none"
          >
            {eventsData.map((event) => {
              const hasOrderLink = collectionType === "Event_Organized";
              const hidePrice = collectionType === "My_Tickets";

              return (
                <li key={event._id} className="w-full">
                  <Card
                    event={event}
                    hasOrderLink={hasOrderLink}
                    hidePrice={hidePrice}
                  />
                </li>
              );
            })}
          </ul>
          {totalPages > 1 && (
            <div className="pt-4 w-full">
              <Pagination
                urlParamName={urlParamName}
                page={page}
                totalPages={totalPages}
              />
            </div>
          )}
        </div>
      ) : (
        <div className="flex-center min-h-[300px] sm:min-h-[400px] w-full flex-col gap-4 rounded-2xl bg-gradient-to-br from-[#112240] to-[#0A192F] py-16 sm:py-20 text-center border border-primary-500/20 glow-primary">
          <h3 className="text-xl sm:text-2xl font-bold text-white">{emptyTitle}</h3>
          <p className="text-sm sm:text-base text-gray-400 max-w-md px-4">{emptyStateSubtext}</p>
        </div>
      )}
    </div>
  );
};

export default Collection;
