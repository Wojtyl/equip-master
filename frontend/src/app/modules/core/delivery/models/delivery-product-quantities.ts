export interface DeliveryProductQuantities {
  productIndex: string;
  productName: string;
  productId: string;
  isExtraProduct: boolean;
  sizes: DeliveryProductSizes[];
}

export interface DeliveryProductSizes {
  size: string;
  deliveryCount: number;
  differenceCount: number;
  isExtraSize: boolean;
}
