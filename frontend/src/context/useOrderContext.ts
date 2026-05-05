import { useContext } from "react";
import { OrderContext } from "./orderContextDef";

export function useOrderContext() {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error("useOrderContext must be used within OrderProvider");
  return ctx;
}
