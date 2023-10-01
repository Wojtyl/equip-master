import { IProductBox } from "./product-box";

export interface IProductInvoice extends IProductBox {
  price: number;
}