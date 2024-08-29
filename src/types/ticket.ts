import { User } from "./user";
import { Event } from "./event";

export interface Ticket {
  uuid: string;
  half_ticket: boolean;
  verified: boolean;
  hash: string;
  user: User;
  event: Event["uuid"];
  cart_payment_data: string;
}
