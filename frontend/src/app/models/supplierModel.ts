interface Address {
  postalCode: string;
  state: string;
  city: string;
  country: string;
}

export interface Supplier {
  _id: string;
  address: Address;
  name: string;
  taxIdNum: string;
  descrption: string;
  active: boolean;
  addedAt: Date;
  createdBy: string;
}
