import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import {
  createMarketCookie,
  getMarketConfig,
  marketFromSearch,
  type Market,
  type MarketConfig,
} from "./market";

type MarketContextValue = {
  market: Market;
  config: MarketConfig;
  setMarket: (market: Market) => void;
};

const MarketContext = createContext<MarketContextValue | null>(null);

export function MarketProvider({
  children,
  initialMarket = "US",
}: {
  children: ReactNode;
  initialMarket?: Market;
}) {
  const [market, setMarketState] = useState<Market>(initialMarket);

  useEffect(() => {
    const requestedMarket =
      typeof window !== "undefined" ? marketFromSearch(window.location.search) : null;
    const resolvedMarket = requestedMarket ?? initialMarket;
    setMarketState(resolvedMarket);
    document.cookie = createMarketCookie(resolvedMarket);
  }, [initialMarket]);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.dataset.market = market.toLowerCase();
    }
  }, [market]);

  const setMarket = (nextMarket: Market) => {
    setMarketState(nextMarket);
    if (typeof document !== "undefined") {
      document.cookie = createMarketCookie(nextMarket);
    }
  };

  const value = useMemo(() => ({ market, config: getMarketConfig(market), setMarket }), [market]);

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>;
}

export function useMarket() {
  const context = useContext(MarketContext);
  if (!context) throw new Error("useMarket must be inside MarketProvider");
  return context;
}
