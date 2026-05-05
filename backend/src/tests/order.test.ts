import { computeOrders } from "../services/order.service";
import { RequestOrderDTO } from "../dto/order.dto";

describe("processOrder", () => {
  it("should CONFIRM order when total is below threshold", () => {
    const input: RequestOrderDTO = {
      items: [{ id: "item_1", quantity: 1 }],
      customer: {
        name: "Jane Doe",
        email: "jane@example.com",
      },
    };

    //threshold = 1000
    //item_1 = 100
    //quantity = 1

    const result = computeOrders(input);

    expect(result.status).toBe("CONFIRMED");
    expect(result).toHaveProperty("total");
  });

  it("should REJECT order when total exceeds threshold", () => {
    const input: RequestOrderDTO = {
      items: [{ id: "item_2", quantity: 10 }],
      customer: {
        name: "Jane Doe",
        email: "jane@example.com",
      },
    };

    //threshold = 1000
    //item_1 = 200
    //quantity = 10

    const result = computeOrders(input);

    expect(result.status).toBe("REJECTED");
    expect(result).toHaveProperty("reason", "ORDER_TOTAL_TOO_HIGH");
  });
});
