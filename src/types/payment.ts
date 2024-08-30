import { User } from "./user";
export interface Payment {
  uuid: string;
  value: string;
  status: string;
  external_id: string;
  payment_type: string;
  link_payment: string;
  user: User["user_id"];
  user_data: User;
  tickets: string;
}
