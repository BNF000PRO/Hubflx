import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const DetailsSubscribe = () => {
  return (
    <div
      className="group relative flex min-h-[180px] w-full max-w-[400px]
    flex-col overflow-hidden rounded-xl bg-white shadow-md transition-all
    hover:shadow-lg md:min-[138px] md:hidden"
    >
      <p className="p-regular-12 text-sm p-5 md:p-regular-20 size-fit ">
        <h3 className="text-center p-2 pt-2 font-bold ">Welcome to Hubnet</h3>
        Elevate your online experience! 🚀 Join our Whatsapp Channel to stay
        updated with the latest contents! 🌟💻✨
      </p>

      <Button>
        <Link
          href="https://chat.whatsapp.com/BDmeql20MzELIsPJfBxeTt"
          target={"_blank"}
        >
          Subscribe for free
        </Link>
      </Button>
    </div>
  );
};

export default DetailsSubscribe;
