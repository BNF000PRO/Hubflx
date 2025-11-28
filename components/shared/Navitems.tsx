"use client";

import { headerLinks } from "@/lib/constants";
import { useAuth } from "@clerk/nextjs";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const Navitems = ({ showAll = false }: { showAll?: boolean }) => {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  
  // Filter links based on auth status unless showAll is true
  const visibleLinks = showAll 
    ? headerLinks 
    : headerLinks.filter(link => link.public || isSignedIn);

  return (
    <ul className="md:flex-between flex w-full flex-col items-start gap-4 md:flex-row md:gap-5">
      {visibleLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive
                ? "text-primary-500 bg-sky-200/20"
                : "text-white hover:text-primary-400"
            } w-full md:w-auto transition-colors duration-200`}
          >
            <Link 
              href={link.route}
              className="block w-full py-3 px-4 md:py-2 md:px-3 rounded-lg text-left whitespace-nowrap min-h-[48px] flex items-center hover:bg-primary-500/10 transition-colors"
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navitems;
