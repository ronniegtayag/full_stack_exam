import { createContext } from "react";
import type { Customer, OrderTypeError } from "../types/order.type";

export type OrderContextType = {
  customer: Customer;
  setCustomer: React.Dispatch<React.SetStateAction<Customer>>;
  hasError: OrderTypeError;
  setHasError: React.Dispatch<React.SetStateAction<OrderTypeError>>;
};

export const OrderContext = createContext<OrderContextType | null>(null);
