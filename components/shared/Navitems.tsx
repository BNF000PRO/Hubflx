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
    <ul
      className="md:flex-between flex w-full 
    flex-col items-start gap-5 md:flex-row"
    >
      {visibleLinks.map((link) => {
        const isActive = pathname === link.route;
        return (
          <li
            key={link.route}
            className={`${
              isActive &&
              "text-primary-500 bg-sky-200/20 w-full rounded-lg text-left  hover:bg-sky-200/20 "
            } flex-center p-medium-16 rounded-lg w-full text-left  whitespace-nowrap
            `}
          >
            <Link href={link.route}>{link.label}</Link>
          </li>
        );
      })}
    </ul>
  );
};

export default Navitems;
