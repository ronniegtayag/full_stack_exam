interface item {
  id: string;
  quantity: number;
}

export interface RequestOrderDTO {
  items: item[] | [];
  customer: {
    name: string;
    email: string;
  };
}

export interface ResponseOrderDTO {
  orderId: string;
  status: "CONFIRMED" | "REJECTED";
  reason?: "ORDER_TOTAL_TOO_HIGH";
  total?: number;
}
