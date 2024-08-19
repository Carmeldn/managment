import React, { useState, useEffect } from "react";
import axios from "axios";

const EditOrder = ({ show, onClose, onSave, orderData }) => {
  const [order, setOrder] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
  });
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (orderData) {
      setOrder(orderData);
    }
  }, [orderData]);

  useEffect(() => {
    // Fetch products to populate the product dropdown
    axios
      .get("http://localhost:3000/product")
      .then((response) => {
        console.log(response.data.message);
        setProducts(response.data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(order);
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
        <h2>Edit Order</h2>
        <form onSubmit={handleSubmit}>
          
          <label>Product:</label>
          <select
            name="product_id"
            value={order.product_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Product</option>
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
            required
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;
