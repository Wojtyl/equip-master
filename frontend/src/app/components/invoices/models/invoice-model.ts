export interface Invoice {
  _id: string;
  supplierId: string;
  invoiceNumber: string;
  products: {
    productId: string;
    quantity: number;
    size: string;
  }[];
  date: Date;
  nettoPrice: number;
}
