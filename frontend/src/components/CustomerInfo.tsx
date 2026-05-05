import { useOrderContext } from "../context/useOrderContext";

export default function CustomerInfo() {
  const { customer, setCustomer, hasError, setHasError } = useOrderContext();

  const clearError = () => setHasError({ type: "NONE", message: "" });

  return (
    <div className="customerInputContainer">
      <h3>Customer Information</h3>
      <div className="customerInput">
        <span style={{ fontSize: "12px" }}>Name &nbsp;</span>
        <input
          type="text"
          value={customer.name}
          onChange={(e) => {
            setCustomer((prev) => ({ ...prev, name: e.target.value || "" }));
            clearError();
          }}
        />
      </div>
      <div className="customerInput">
        <span style={{ fontSize: "12px" }}>Email &nbsp;</span>
        <input
          type="email"
          value={customer.email}
          onChange={(e) => {
            setCustomer((prev) => ({ ...prev, email: e.target.value || "" }));
            clearError();
          }}
        />
      </div>
      {hasError.type === "CLIENT_ERROR" && (
        <span className="error">Error: {hasError.message}</span>
      )}
    </div>
  );
}
