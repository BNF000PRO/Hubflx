import Link from "next/link";
import React from "react";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="border-t">
      <div
        className="flex-center wrapper flex-between 
      flex flex-col gap-4 p-5 text-center sm:flex-row"
      >
        <Link href="/">
          <Image
            alt="logo"
            src="/assets/images/lo.svg"
            width={100}
            height={20}
          />
        </Link>

        <p>&copy; 2023 Hubflix. All Right reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
