import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Typography } from "../typography";
import { SearchIcon } from "lucide-react";
import { HeaderNavItems } from "./nav-items";

export function Header() {
  return (
    <header
      data-testid="header-container"
      className="absolute flex justify-between items-center w-full h-20 bg-background px-6 py-4 lg:px-8 lg:py-14"
    >
      <Link href="/" className="flex items-center" prefetch={false}>
        <Typography
          data-testid="header-title-logo"
          variant={"h3"}
          fontWeight={"black"}
        >
          TicketGO
        </Typography>
      </Link>

      <nav className="md:flex items-center space-x-8">
        <div className="relative w-full h-fit max-w-md hidden lg:flex">
          <Input
            data-testid="header-search-input"
            type="search"
            placeholder="Search..."
            className="pr-10 lg:h-10"
          />
          <SearchIcon className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
        </div>

        <HeaderNavItems children="Eventos" href="/" />
        <HeaderNavItems children="Eventos" href="/" />
        <HeaderNavItems children="Eventos" href="/" />

        <div className="flex items-center h-fit space-x-4">
          <Button data-testid="header-button" variant={"secondary"} size={"lg"}>
            Criar conta
          </Button>
          <Button data-testid="header-button" size={"lg"}>
            Entrar
          </Button>
        </div>
      </nav>
    </header>
  );
}
