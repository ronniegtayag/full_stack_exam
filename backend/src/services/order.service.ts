import { ORDER_THRESHOLD, PRODUCT_PRICES } from "../constant";
import { RequestOrderDTO, ResponseOrderDTO } from "../dto/order.dto";

let orderCounter = 0;

const generateOrderId = () => {
  orderCounter += 1;
  return `orderId_${orderCounter}`;
};

export const computeOrders = (orders: RequestOrderDTO): ResponseOrderDTO => {
  const orderId = generateOrderId();
  const totalPrice = orders.items.reduce((total: number, item) => {
    const itemPrice = PRODUCT_PRICES[item.id];
    return total + item.quantity * itemPrice;
  }, 0);

  if (totalPrice > ORDER_THRESHOLD) {
    return {
      orderId,
      status: "REJECTED",
      reason: "ORDER_TOTAL_TOO_HIGH",
    };
  }

  return {
    orderId,
    status: "CONFIRMED",
    total: totalPrice,
  };
};

