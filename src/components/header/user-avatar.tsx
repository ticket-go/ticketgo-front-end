"use client";

import { useSession } from "next-auth/react";
import { Avatar, AvatarImage, AvatarFallback } from "../ui/avatar";

export function UserAvatar() {
  const { data: session } = useSession();
  return (
    <Avatar>
      <AvatarImage src={`${session?.user?.image}`} alt="user avatar" />
      <AvatarFallback>{session?.user?.name}</AvatarFallback>
    </Avatar>
  );
}
