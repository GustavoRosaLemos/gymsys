export enum UserType {
  "CUSTOMER",
  "EMPLOYEE"
}

export enum Sex {
  "MAS",
  "FEM"
}

export enum Status {
  "ACTIVE",
  "INACTIVE",
  "SUSPENDED"
}

export interface User {
  id?: string;
  type: string;
  fullname: string;
  birth: string;
  sex: string;
  status: string;
  phone: string;
  email: string;
  city: string;
  state: string;
  cep: string;
  street: string;
  number: string;
}
