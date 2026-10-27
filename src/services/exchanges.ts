import { exchanges } from "@/data/exchanges";
import type { Exchange } from "@/types/exchange";

export function getExchanges(): Exchange[] {
  return exchanges;
}

export function getExchangesByProductId(productId: string): Exchange[] {
  return exchanges.filter((exchange) => exchange.productId === productId);
}
