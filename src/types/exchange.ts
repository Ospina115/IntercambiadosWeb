export type ExchangeStatus = "pending" | "accepted" | "rejected";

export interface Exchange {
  id: string;
  productId: string;
  offeredItem: string;
  status: ExchangeStatus;
}
