import { Ticket } from "./ticket";

export interface Purchase {
  uuid: string;
  value: string;
  status: string;
  user: string;
  tickets: Ticket[];
}
