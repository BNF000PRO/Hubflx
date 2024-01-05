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
        <h3 className="text-center p-2 pt-2 font-bold ">Welcome to Hublix</h3>
        🌟 Unlock the World of Free Entertainment! 🎉 Dive into a treasure trove
        of the best content on the internet—all for FREE! 🚀 Download movies,
        music, Ebooks, AI Tutorials, and discover the secrets of making money
        online. 💰 But wait, there's more! 🌐 Join our vibrant community by
        subscribing to our WhatsApp. 📲 Never miss out on exciting updates and
        exclusive content. 🚀 Ready to promote your products? Advertise with us
        and reach a broader audience. 🌍 Don't miss the wave! 🌊 Stay tuned
        because Hubflix AI is coming soon to elevate your online experience! 🚀
        Subscribe now and be a part of the revolution! 🌟💻✨
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
