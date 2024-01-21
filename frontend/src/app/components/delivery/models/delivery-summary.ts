export interface DeliverySummary {
  [productId: string]: {
    isExtraProduct: boolean;
    productIndex: string;
    productName: string;
    quantities: {
      [key: string]: number;
    }
  }
}
