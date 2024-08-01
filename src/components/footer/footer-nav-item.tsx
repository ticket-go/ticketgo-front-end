import Link from "next/link";
import { Typography } from "../typography";
import { FacebookIcon } from "lucide-react";

interface FooterSocialNetworksProps {
  href: string;
  label: string;
  icon: React.ElementType;
}

interface FooterNavItemsProps {
  children?: string;
  href: string;
  isSocialNetwork: boolean;
  socialNetwork?: FooterSocialNetworksProps;
}

export function FooterNavItem({
  children,
  href,
  isSocialNetwork,
  socialNetwork,
}: FooterNavItemsProps) {
  if (isSocialNetwork && socialNetwork) {
    const IconComponent = socialNetwork.icon;
    return (
      <Link
        data-testid="footer-nav-item"
        href={socialNetwork.href}
        aria-label={socialNetwork.label}
        prefetch={false}
      >
        <IconComponent size={24} className="hover:text-[#B3F554]" />
      </Link>
    );
  }

  return (
    <Link href={href} prefetch={false}>
      <Typography
        data-testid="footer-nav-item"
        variant={"h6"}
        fontWeight={"regular"}
        className="leading-6 text-muted-foreground hover:text-[#B3F554]/50"
      >
        {children}
      </Typography>
    </Link>
  );
}
