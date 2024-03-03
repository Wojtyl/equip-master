import { Product } from "./productModel";

interface Address {
  postalCode: string;
  state: string;
  city: string;
  country: string;
  street: string;
}

export interface Supplier {
  _id: string;
  address: Address;
  name: string;
  email: string;
  phoneNumber: string;
  taxIdNum: number;
  contact: string;
  website: string;
  descrption: string;
  active: boolean;
  addedAt: Date;
  productColors: string[];
  createdBy: string;
  products: Product[];
}
