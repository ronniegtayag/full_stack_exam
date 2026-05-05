import type { Customer, SelectedItem } from "../types/order.type";

export const OrderService = {
  computeOrders: (payload: { items: SelectedItem[]; customer: Customer }) => {
    const url = "http://localhost:4000/api/orders";
    return fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  },
};
