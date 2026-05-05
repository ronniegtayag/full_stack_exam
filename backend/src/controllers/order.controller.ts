import { RequestOrderDTO, ResponseOrderDTO } from "../dto/order.dto";
import { computeOrders } from "../services/order.service";

export const orderController = {
  createOrder: (orders: RequestOrderDTO): ResponseOrderDTO => {
    return computeOrders(orders);
  },
};
