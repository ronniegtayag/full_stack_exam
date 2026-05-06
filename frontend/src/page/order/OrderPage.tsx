import { useState } from "react";
import ItemSelector from "../../components/itemDropdown";
import CustomerInfo from "../../components/CustomerInfo";
import { OrderProvider } from "../../context/OrderContext";
import { useOrderContext } from "../../context/useOrderContext";
import { OrderService } from "../../service/order.service";
import type {
  OrderResult,
  SelectedItem,
  OrderResultLabel,
} from "../../types/order.type";
import "./orderPage.css";

function OrderPageContent() {
  const { customer, setCustomer, setHasError } = useOrderContext();
  const [items, setItems] = useState<SelectedItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"initial" | "sending" | "confirmed">(
    "initial",
  );
  const [orderResult, setOrderResult] = useState<OrderResult>({
    orderId: "",
    total: 0,
    reason: "",
    status: "NONE",
  });

  const handleAddItem = (id: string) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.id === id);

      if (existing) {
        return prev.map((i) =>
          i.id === id ? { ...i, quantity: i.quantity + 1 } : i,
        );
      }

      return [...prev, { id, quantity: 1 }];
    });
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty < 1) return;

    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: qty } : i)),
    );
  };

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  const formatOrderResult = (orderResult: OrderResult) => {
    let result: OrderResultLabel = {
      "Order Id": orderResult.orderId || "",
      Status: orderResult.status || "",
    };
    if (orderResult.status === "CONFIRMED") {
      result = { ...result, Total: orderResult.total || 0 };
    }
    if (orderResult.status === "REJECTED") {
      result = { ...result, Reason: orderResult.reason };
    }
    return result;
  };

  const onCompute = () => {
    if (!customer.name || !customer.email) {
      setHasError({
        type: "CLIENT_ERROR",
        message: "Customer name and email are required",
      });
      return;
    }

    setLoading(true);
    setStatus("sending");
    setTimeout(() => {
      OrderService.computeOrders({
        items,
        customer,
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          console.log("Success:", data.result);
          setOrderResult(data.result);
          setLoading(false);
          setStatus("confirmed");
          setItems([]);
        })
        .catch((error) => {
          console.error("Error:", error);
          setLoading(false);
          setStatus("confirmed");
        });
    }, 500);
  };

  const reset = () => {
    setItems([]);
    setCustomer({ name: "", email: "" });
    setHasError({ type: "NONE", message: "" });
    setOrderResult({ orderId: "", total: 0, reason: "", status: "NONE" });
    setStatus("initial");
  };

  return (
    <div className="container">
      <CustomerInfo />

      <div className="subContainer">
        <h3>Create Order</h3>

        <div style={{ marginBottom: "1rem" }}>
          {items.length === 0 && <p>No items selected</p>}
        </div>

        <ItemSelector onAdd={handleAddItem} />

        <div className="itemResultContainer">
          {items.map((item) => (
            <div key={item.id} className="itemResult">
              <span style={{ width: 100 }}>{item.id}</span>

              <div className="itemResultButtons">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  {" "}
                  -{" "}
                </button>
                <label>{item.quantity}</label>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +{" "}
                </button>
                <button onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            </div>
          ))}
        </div>

        {items.length > 0 && (
          <div style={{ margin: "8px", width: "150px" }}>
            {loading ? (
              <div className="spinner">Loading...</div>
            ) : (
              <button onClick={onCompute} style={{ width: "100%" }}>
                Submit
              </button>
            )}
          </div>
        )}

        {status === "confirmed" && (
          <div className="resultStatusContainer">
            <h3>Result:</h3>

            {formatOrderResult(orderResult) &&
              Object.entries(formatOrderResult(orderResult)).map(
                ([key, value]) => (
                  <div key={key} className="orderResult">
                    <span>{key}:</span>
                    <span>{value}</span>
                  </div>
                ),
              )}

            <h3>Reset:</h3>
            <button onClick={reset}>Reset</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default function OrderPage() {
  return (
    <OrderProvider>
      <OrderPageContent />
    </OrderProvider>
  );
}
