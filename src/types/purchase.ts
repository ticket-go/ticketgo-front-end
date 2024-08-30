import { Ticket } from "./ticket";
import { User } from "./user";

export interface Purchase {
  uuid: string;
  value: string;
  status: string;
  user: User["user_id"];
  user_data: User;
  tickets: Ticket[];
}
