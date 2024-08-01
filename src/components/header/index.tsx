import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Typography } from "../typography";
import { HeaderNavItems } from "./nav-items";
import { SearchBar } from "../search-bar";

export function Header() {
  return (
    <header
      data-testid="header-container"
      className="fixed top-0 right-0 left-0 flex items-center justify-between bg-background px-6 py-4 lg:px-8 lg:py-8 z-10"
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
        <SearchBar />

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
