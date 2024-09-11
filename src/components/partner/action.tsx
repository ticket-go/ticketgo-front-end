"use client";

import { useRouter } from "next/navigation";
import { Button } from "../button";

interface PartnerActionProps {
  title: string;
  href: string;
}

export function PartnerAction({ title, href }: PartnerActionProps) {
  const router = useRouter();

  const handleRedirect = () => {
    router.push(`${href}`);
  };

  return (
    <Button
      text={title}
      className="w-[30%] h-14 bg-white hover:bg-white hover:scale-105 transition mobile:h-12"
      textColor="text-purple"
      fontWeight="bold"
      onClick={handleRedirect}
    />
  );
}
