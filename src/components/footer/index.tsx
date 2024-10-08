import { Typography } from "../typography";
import { FooterNavItem } from "./footer-nav-item";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "lucide-react";

export function Footer() {
  return (
    <footer
      data-testid="footer-container"
      className="flex w-full items-center py-5"
    >
      <div className=" flex justify-between items-center w-full md:grid-cols-3 gap-8 px-20">
        <div className="flex flex-col gap-3">
          <Typography
            data-testid="footer-title"
            variant="h5"
            fontWeight={"bold"}
          >
            TicketGO
          </Typography>

          <FooterNavItem
            children="Sobre nós"
            href="/"
            isSocialNetwork={false}
          />
          <FooterNavItem
            children="Para empreendedores"
            href="/"
            isSocialNetwork={false}
          />
          <FooterNavItem
            children="Trabalhe conosco"
            href="/"
            isSocialNetwork={false}
          />
          <FooterNavItem
            children="Termos de uso"
            href="/"
            isSocialNetwork={false}
          />
          <FooterNavItem
            children="Política de privacidade"
            href="/"
            isSocialNetwork={false}
          />
        </div>

        <Typography data-testid="footer-copyright-text" variant={"h6"}>
          Copyright &copy; 2024 TicketGO - Marketplace
        </Typography>

        <div className="flex items-center justify-end gap-4">
          <FooterNavItem
            href="https://www.instagram.com"
            isSocialNetwork={true}
            socialNetwork={{
              href: "https://www.instagram.com",
              label: "Instagram",
              icon: InstagramIcon,
            }}
          />
          <FooterNavItem
            href="https://www.linkedin.com"
            isSocialNetwork={true}
            socialNetwork={{
              href: "https://www.linkedin.com",
              label: "LinkedIn",
              icon: LinkedinIcon,
            }}
          />
          <FooterNavItem
            href="https://www.x.com"
            isSocialNetwork={true}
            socialNetwork={{
              href: "https://www.x.com",
              label: "X",
              icon: TwitterIcon,
            }}
          />
          <FooterNavItem
            href="https://www.facebook.com"
            isSocialNetwork={true}
            socialNetwork={{
              href: "https://www.facebook.com",
              label: "Facebook",
              icon: FacebookIcon,
            }}
          />
        </div>
      </div>
    </footer>
  );
}
