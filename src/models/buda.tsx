interface Market {
  id: string;
  name: string;
  base_currency: string;
  quote_currency: string;
  minimum_order_amount: string[];
  taker_fee: string;
  maker_fee: string;
  max_orders_per_minute: number;
  maker_discount_percentage: string;
  taker_discount_percentage: string;
}

export interface GetMarketsResponse {
  markets: Market[];
}

interface Entry {
  timestamp: string;
  amount: string;
  price: string;
  type: string;
}

export interface GetTradesResponse {
  timestamp: string;
  last_timestamp: string;
  market_id: string;
  entries: Entry[];
}
