export interface DeliverySummary {
  productIndex: string;
  productName: string;
  id: string;
  isExtraProduct: boolean;
  sizes: {
    size: string;
    deliveryCount: number;
    differenceCount: number;
    isExtraSize: boolean;
  }[]
}
