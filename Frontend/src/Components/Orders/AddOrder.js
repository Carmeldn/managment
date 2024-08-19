import React, { useState, useEffect } from "react";
import axios from "axios";

const AddOrder = ({ show, onClose, onSave }) => {
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
  });

  useEffect(() => {
    if (show) {
      axios
      .get("http://localhost:3000/customers")
      .then((response) => {
        console.log(response.data.message);
        setCustomers(response.data.customer);
      })
      .catch((error) => console.error("Error fetching customer:", error));

      axios
      .get("http://localhost:3000/product")
      .then((response) => {
        console.log(response.data.message);
        setProducts(response.data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
    }
  }, [show]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(order);
    setOrder({ customer_id: "", product_id: "", quantity: "" });
  };

  if (!show) {
    return null;
  }

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <h2>Add Order</h2>
        <form onSubmit={handleSubmit}>
          <label>Customer:</label>
          <select
            name="customer_id"
            value={order.customer_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Customer
            </option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.first_name} {customer.last_name}
              </option>
            ))}
          </select>
            
          <label>Product:</label>
          <select
            name="product_id"
            value={order.product_id}
            onChange={handleChange}
            required
          >
            <option value="" disabled>
              Select Product
            </option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nom}
              </option>
            ))}
          </select>

          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={order.quantity}
            onChange={handleChange}
            min="1"
            required
          />
 
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddOrder;
