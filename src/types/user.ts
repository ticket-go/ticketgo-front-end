import { Address } from "./address";
import { Organization } from "./organization";

export interface User {
  user_id?: string;
  username: string;
  first_name: string;
  last_name: string;
  phone?: string;
  birth_date: Date;
  cpf: string;
  email: string;
  gender?: string;
  privileged: boolean;
  password: string;
  address?: Address;
  organization?: Organization;
}
