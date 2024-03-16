export interface DeliverySummary {
  productIndex: string;
  productName: string;
  id: string;
  isExtraProduct: boolean;
  sizes: ProductSizes[];
}

export interface ProductSizes {
  size: string;
  deliveryCount: number;
  differenceCount: number;
  isExtraSize: boolean;
}
