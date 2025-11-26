import React from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import Navitems from "./Navitems";
import Search from "./Search";
import CategoryFilter from "./CategoryFilter";

const MobileNav = () => {
  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle md:hidden pr-4 hover:opacity-75 transition">
          <Image
            alt="menu"
            src="/assets/icons/menu.svg"
            width={24}
            height={24}
            className="cursor-pointer"
          />
        </SheetTrigger>
        <SheetContent className="flex flex-col gap-6 md:hidden bg-white">
          <Image
            alt="logo"
            src="/assets/icons/iqcaballogo.png"
            width={110}
            height={20}
          />
          <Separator className="border border-gray-200 w-full" />
          <Navitems />
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
