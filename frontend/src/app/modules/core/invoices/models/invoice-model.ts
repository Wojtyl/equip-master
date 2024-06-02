import { InvoiceProducts } from "../../../../shared/models/invoiceProductsModel";

export interface Invoice {
  _id: string;
  currency: string;
  supplier: {
    _id: string;
    name: string;
  };
  invoiceNumber: string;
  products: InvoiceProducts[];
  date: number;
  nettoPrice: number;
}

export interface InvoiceForm {
  currency: string;
  supplier: string;
  invoiceNumber: string;
  products: InvoiceProducts[];
  date: number;
  nettoPrice: number;
}
