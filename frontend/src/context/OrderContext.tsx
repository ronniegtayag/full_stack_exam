import { useState } from "react";
import { OrderContext } from "./orderContextDef";
import type { Customer, OrderTypeError } from "../types/order.type";

export function OrderProvider({ children }: { children: React.ReactNode }) {
  const [customer, setCustomer] = useState<Customer>({ name: "", email: "" });
  const [hasError, setHasError] = useState<OrderTypeError>({
    type: "NONE",
    message: "",
  });

  return (
    <OrderContext.Provider value={{ customer, setCustomer, hasError, setHasError }}>
      {children}
    </OrderContext.Provider>
  );
}
