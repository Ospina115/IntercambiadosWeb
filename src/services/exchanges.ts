import { exchanges as seedExchanges } from "@/data/exchanges";
import type { Exchange } from "@/types/exchange";

export function getExchanges(createdExchanges: Exchange[] = []): Exchange[] {
  const exchangesById = new Map(
    seedExchanges.map((exchange) => [exchange.id, exchange]),
  );
  createdExchanges.forEach((exchange) =>
    exchangesById.set(exchange.id, exchange),
  );
  return [...exchangesById.values()];
}

export function getExchangesByProductId(
  productId: string,
  createdExchanges: Exchange[] = [],
): Exchange[] {
  return getExchanges(createdExchanges).filter(
    (exchange) => exchange.productId === productId,
  );
}

export function createExchange(
  productId: string,
  senderId: string,
  receiverId: string,
  offeredItem: string,
): Exchange {
  return {
    id: `exchange-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    productId,
    senderId,
    receiverId,
    offeredItem,
    status: "pending",
    createdAt: new Date().toISOString(),
  };
}

export function updateExchangeStatus(
  exchangeList: Exchange[],
  exchangeId: string,
  status: Exchange["status"],
): Exchange[] {
  return getExchanges(exchangeList).map((exchange) =>
    exchange.id === exchangeId ? { ...exchange, status } : exchange,
  );
}
