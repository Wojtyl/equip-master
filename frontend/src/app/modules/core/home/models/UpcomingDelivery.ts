export interface UpcomingDelivery {
  date: Date | undefined;
  supplier: string | undefined;
  invoiceNumber: string | null;
  status: string | undefined;
  _id: string;
}
