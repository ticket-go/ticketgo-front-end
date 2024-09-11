import { User } from "./user";
import { Event } from "./event";
import { Payment } from "./payment";

export interface Ticket {
  uuid: string;
  half_ticket: boolean;
  verified: boolean;
  hash: string;
  user: User;
  event: Event["uuid"];
  event_data: Event;
  cart_payment_data: Payment;
}

export interface Invoice {
  uuid: string;
  value: string;
  status: string;
  external_id: null | string;
  payment_type: null | string;
  link_payment: null | string;
  user: User["username"];
  user_data: User;
  tickets: Ticket[];
}
