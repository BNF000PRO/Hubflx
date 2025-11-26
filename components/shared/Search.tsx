"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";

const Search = ({
  placeholder = "Search title...",
}: {
  placeholder?: string;
}) => {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      let newUrl = "";
      if (query) {
        newUrl = formUrlQuery({
          params: searchParams.toString(),
          key: "query",
          value: query,
        });
      } else {
        newUrl = removeKeysFromQuery({
          params: searchParams.toString(),
          keysToRemove: ["query"],
        });
      }

      router.push(newUrl, { scroll: false });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [query, searchParams, router]);

  return (
    <div className="relative flex items-center min-h-[54px] w-full overflow-hidden px-5 py-2 bg-[#112240] backdrop-blur-sm border border-primary-500/30 rounded-full shadow-lg hover:shadow-xl focus-within:shadow-xl focus-within:border-primary-500/60 focus-within:glow-primary transition-all duration-200">
      <img
        src="/assets/icons/search.svg"
        alt="search"
        width={20}
        height={20}
        className="flex-shrink-0 filter brightness-0 invert opacity-70"
        style={{ display: 'block', opacity: 0.7, visibility: 'visible' }}
      />
      <Input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-1 p-regular-16 border-0 bg-transparent focus-visible:ring-offset-0 outline-none focus-visible:ring-0 focus:border-0 placeholder:text-gray-500 text-white"
      />
    </div>
  );
};

export default Search;
