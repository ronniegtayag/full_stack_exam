import { Router } from "express";
import { orderController } from "../controllers/order.controller";
import { RequestOrderDTO } from "../dto/order.dto";
import { orderValidation } from "../middleware/orderValidation";

const orderRouter = Router();

orderRouter.post("/", orderValidation(), (req, res) => {
  const result = orderController.createOrder(req.body as RequestOrderDTO);
  res.json({ result });
});

export default orderRouter;
