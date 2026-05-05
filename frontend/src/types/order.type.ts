export type SelectedItem = {
  id: string;
  quantity: number;
};

export type Customer = {
  name: string;
  email: string;
};

export type OrderResult = {
  orderId?: string;
  total?: number;
  reason?: string;
  status: "NONE" | "REJECTED" | "CONFIRMED";
};

export type OrderTypeError = {
  type: "NONE" | "API_ERROR" | "CLIENT_ERROR";
  message: string;
};

export type OrderResultLabel = {
  "Order Id": string;
  Total?: number;
  Reason?: string;
  Status: string;
};
