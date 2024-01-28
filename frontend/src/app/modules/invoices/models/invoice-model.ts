export interface Invoice {
  _id: string;
  currency: string;
  supplier: {
    _id: string;
    name: string;
  };
  invoiceNumber: string;
  products: {
    productId: string;
    quantity: number;
    size: string;
  }[];
  date: Date;
  nettoPrice: number;
}
