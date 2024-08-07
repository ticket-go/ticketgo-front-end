import { Address } from "./address";
import { Organization } from "./organization";

export interface User {
  username: string;
  first_name: string;
  last_name: string;
  phone: string;
  cpf: string;
  email: string;
  gender: string;
  privileged: boolean;
  address: Address;
  organization: Organization;
}
