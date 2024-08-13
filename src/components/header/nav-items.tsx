import Link from "next/link";
import { Typography } from "../typography";

interface HeaderNavItemsProps {
  children: string;
  href: string;
}

export function HeaderNavItems({ children, href }: HeaderNavItemsProps) {
  return (
    <Link
      href={href}
      className="hover:underline decoration-lime-400 underline-offset-4 hidden lg:flex"
      prefetch={false}
    >
      <Typography
        data-testid="header-nav-item"
        variant={"h5"}
        fontWeight={"semibold"}
        className="leading-6"
      >
        {children}
      </Typography>
    </Link>
  );
}
