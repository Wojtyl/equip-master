export interface UpcomingDelivery {
  date: Date | undefined;
  supplier: string | undefined;
  invoiceNumber: string | null;
  totalDeliveryCount: number;
  status: string | undefined;
  _id: string;
}
