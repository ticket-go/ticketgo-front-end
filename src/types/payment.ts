import { Purchase } from "./purchase";

export interface Payment {
  uuid: string;
  external_id: string;
  payment_type: string;
  status: string;
  link_payment: string;
  purchase: string;
  purchase_data: Purchase;
}
