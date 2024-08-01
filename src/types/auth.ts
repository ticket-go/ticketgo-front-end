export interface User {
  username: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  cpf: string;
  birthdate: string;
  gender: string;
  privileged: boolean;
  address: number;
  organization: number;
}

export interface Auth {
  access: string;
  refresh: string;
  user: User;
}
