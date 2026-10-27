export type ExchangeStatus = "pending" | "accepted" | "rejected";

export interface Exchange {
  id: string;
  productId: string;
  senderId: string;
  receiverId: string;
  offeredItem: string;
  status: ExchangeStatus;
  createdAt: string;
}
