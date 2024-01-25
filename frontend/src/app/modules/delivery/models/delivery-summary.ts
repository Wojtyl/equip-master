interface ProductsMap {
  [productId: string]: {
    isExtraProduct: boolean;
    productIndex: string;
    productName: string;
    quantities: {
      [key: string]: number;
    }
  }
}

export interface DeliverySummary {
  deliveryProductsMap: ProductsMap;
  differenceMap: ProductsMap;
}
