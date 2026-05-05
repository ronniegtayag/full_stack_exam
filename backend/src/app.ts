import express from "express";
import orderRouter from "./routes/orders.routes";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  }),
);
app.use("/api/orders", orderRouter);

export default app;
