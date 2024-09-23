import React, { useState, useEffect } from "react";
import axios from "axios";


const EditOrder = ({ show, onClose, onSave, orderData }) => {
  const [order, setOrder] = useState({
    customer_id: "",
    product_id: "",
    quantity: "",
  });
  
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedProductPrice, setSelectedProductPrice] = useState(0);
  const [totalAmount, setTotalAmount] = useState(0);
  
  useEffect(() => {
    if (orderData) {
      setOrder(orderData);
    }
  }, [orderData]);

  useEffect(() => {
    if (show) {
      // show customers
      axios
        .get("http://10.250.1.9:3000/customers")
        .then((response) => {
          setCustomers(response.data.customer);
        })
        .catch((error) => console.error("Error fetching customer:", error));

      // show products
      axios
        .get("http://10.250.1.9:3000/products")
        .then((response) => {
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
          
        <label>Customer:</label>
          <select
            name="customer_id"
            value={order.customer_id}
            onChange={(e) => setOrder({ ...order, customer_id: e.target.value })}
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
            <option value="">Select Product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.nom}
              </option>
            ))}
          </select>

          <label>Unit Price:</label>
          <input type="text" value={selectedProductPrice} disabled />


          <label>Quantity:</label>
          <input
            type="number"
            name="quantity"
            value={order.quantity}
            onChange={handleChange}
            required
          />

          <label>Total Amount:</label>
          <input type="text" value={totalAmount} disabled />

          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditOrder;
