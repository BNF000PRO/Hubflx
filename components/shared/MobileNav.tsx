"use client";

import React from "react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import Image from "next/image";
import { Separator } from "../ui/separator";
import { Button } from "../ui/button";
import Link from "next/link";
import { SignedIn, SignedOut, useAuth } from "@clerk/nextjs";
import { Menu, Home, Sparkles, Plus, User, Lock } from "lucide-react";
import { headerLinks } from "@/lib/constants";
import { usePathname } from "next/navigation";

const MobileNav = () => {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();

  // Filter links based on auth status
  const visibleLinks = headerLinks.filter(link => link.public || isSignedIn);

  // Icon mapping for navigation items
  const getIcon = (label: string) => {
    switch (label) {
      case "Home":
        return <Home className="h-5 w-5" />;
      case "AI Hub":
        return <Sparkles className="h-5 w-5" />;
      case "Vault":
        return <Lock className="h-5 w-5" />;
      case "Create":
        return <Plus className="h-5 w-5" />;
      case "My Profile":
        return <User className="h-5 w-5" />;
      default:
        return null;
    }
  };

  return (
    <nav className="md:hidden">
      <Sheet>
        <SheetTrigger className="align-middle hover:opacity-75 transition p-2 -ml-2">
          <Menu className="h-6 w-6 text-white" />
        </SheetTrigger>
        <SheetContent side="left" className="flex flex-col gap-0 bg-[#0A192F] border-primary-500/20 overflow-y-auto p-0 w-[85vw] sm:w-[320px]">
          {/* Logo Header */}
          <div className="flex items-center justify-between px-6 pt-6 pb-4 border-b border-primary-500/20">
            <Image
              alt="logo"
              src="/assets/icons/iqcaballogo.png"
              width={110}
              height={20}
            />
          </div>
          
          {/* Navigation Links - Beautifully Structured */}
          <div className="flex flex-col px-4 py-6 gap-2 flex-1">
            {visibleLinks.map((link) => {
              const isActive = pathname === link.route;
              return (
                <SheetClose key={link.route} asChild>
                  <Link
                    href={link.route}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-lg transition-all duration-200 min-h-[52px] ${
                      isActive
                        ? "bg-primary-500/20 text-primary-400 border border-primary-500/30"
                        : "text-white hover:bg-primary-500/10 hover:text-primary-400"
                    }`}
                  >
                    <span className={isActive ? "text-primary-400" : "text-primary-500/70"}>
                      {getIcon(link.label)}
                    </span>
                    <span className="font-medium text-base">{link.label}</span>
                  </Link>
                </SheetClose>
              );
            })}
          </div>
          
          {/* Auth Buttons Section */}
          <div className="border-t border-primary-500/20 px-4 py-6 space-y-3">
            <SignedOut>
              <SheetClose asChild>
                <Button 
                  asChild
                  className="w-full rounded-lg bg-gradient-to-r from-primary-500 to-primary-600 hover:from-primary-600 hover:to-primary-700 text-white font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/50 h-12 text-base"
                  size="lg"
                >
                  <Link href="/sign-up" className="flex items-center justify-center gap-2">
                    <span>Sign Up</span>
                  </Link>
                </Button>
              </SheetClose>
              <SheetClose asChild>
                <Button 
                  asChild
                  variant="outline"
                  className="w-full rounded-lg border-primary-500/50 text-primary-400 hover:bg-primary-500/10 hover:border-primary-500/70 h-12 text-base font-medium"
                  size="lg"
                >
                  <Link href="/sign-in" className="flex items-center justify-center gap-2">
                    <span>Sign In</span>
                  </Link>
                </Button>
              </SheetClose>
            </SignedOut>
            <SignedIn>
              <div className="text-center py-2">
                <p className="text-sm text-gray-400">You're signed in</p>
              </div>
            </SignedIn>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default MobileNav;
