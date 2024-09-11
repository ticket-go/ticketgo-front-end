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
      className="hover:underline decoration-purple underline-offset-8 hidden lg:flex"
      prefetch={false}
    >
      <Typography
        data-testid="header-nav-item"
        variant={"h6"}
        fontWeight={"semibold"}
        className="leading-6"
      >
        {children}
      </Typography>
    </Link>
  );
}
