import { SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Button } from "../ui/button";
import Navitems from "./Navitems";
import MobileNav from "./MobileNav";

const Header = () => {
  return (
    <header className="w-full border-b border-primary-500/20 bg-[#0A192F]/50 backdrop-blur-sm">
      <div className="wrapper flex justify-between items-center">
        <Link href="/" className="w-36">
          <Image
            alt="logo"
            src="/assets/icons/iqcaballogo.png"
            width={100}
            height={20}
          />
        </Link>

        {/* Desktop Navigation - Shows public links to all, private links to signed-in users */}
        <nav className="md:flex-between hidden w-full max-w-xs">
          <Navitems />
        </nav>
        
        {/* Mobile Navigation - Hamburger Menu (Always Visible) */}
        <div className="md:hidden">
          <MobileNav />
        </div>

        <div className="flex items-center justify-end gap-3">
          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
          <SignedOut>
            <Button 
              asChild
              className="rounded-full bg-primary-500 hover:bg-primary-600 text-white font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary-500/50"
              size="lg"
            >
              <Link href="/sign-up">Sign Up</Link>
            </Button>
            <Button 
              asChild
              variant="outline"
              className="rounded-full border-primary-500/50 text-primary-400 hover:bg-primary-500/10"
              size="lg"
            >
              <Link href="/sign-in">Sign In</Link>
            </Button>
          </SignedOut>
        </div>
      </div>
    </header>
  );
};

export default Header;
