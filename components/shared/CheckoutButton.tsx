"use client";

import { IEvent } from "@/lib/database/models/event.model";
import { useUser } from "@clerk/nextjs";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const CheckoutButton = ({ event }: { event: IEvent }) => {
  const { user } = useUser();
  const userId = user?.publicMetadata.userId as string;

  return (
    <div className="flex items-center gap-3">
      <Button asChild className="button rounded-full">
        <Link href={"/sign-in"}>Watch Trailer</Link>
      </Button>
    </div>
  );
};
export default CheckoutButton;
