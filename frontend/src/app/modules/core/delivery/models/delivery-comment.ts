import { UserPreview } from "./user-preview";

export interface DeliveryComment {
  comment: string;
  date: Date,
  user: UserPreview;
  _id: string;
}
