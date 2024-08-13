import { User } from "./user";
import { Event } from "./event";
import { Purchase } from "./purchase";

export interface Ticket {
  uuid: string;
  half_ticket: boolean;
  verified: boolean;
  hash: string;
  user: User;
  event: Event;
  purchase: Purchase;
}
