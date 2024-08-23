import { Address } from "./address";
import { Auth } from "./auth";
import { Organization } from "./organization";
import { User } from "./user";

export interface Event {
  uuid?: string;
  name: string;
  date?: Date;
  time?: string;
  description?: string;
  category: string;
  category_display?: string;
  status?: string;
  status_display: string;
  image?: string;
  ticket_value: string;
  half_ticket_value: string;
  ticket_quantity: number;
  half_ticket_quantity: number;
  tickets_sold?: number;
  tickets_available?: number;
  half_tickets_available?: number;
  is_hero_event: boolean;
  is_top_event: boolean;
  address: Address;
  user_id: User;
  address_id: Address["uuid"];
}
