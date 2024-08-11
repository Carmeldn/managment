import React, { useState, useEffect } from "react";
import axios from "axios";
import AddOrder from "./AddOrder";
import EditOrder from "./EditOrder";

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOrderData, setEditOrderData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/orders")
      .then((response) => setOrders(response.data))
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleAddOrder = async (order) => {
    try {
      const response = await axios.post("http://localhost:3000/orders", order);
      if (response.status === 201) {
        setOrders((prevOrders) => [...prevOrders, response.data]);
        setShowAddModal(false);
      } else {
        console.error("Error adding order");
      }
    } catch (error) {
      console.error("Error adding order:", error);
    }
  };

  const handleEditOrder = async (order) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/orders/${order.id}`,
        order
      );
      if (response.status === 200) {
        setOrders((prevOrders) =>
          prevOrders.map((o) => (o.id === order.id ? order : o))
        );
        setShowEditModal(false);
      } else {
        console.error("Error editing order");
      }
    } catch (error) {
      console.error("Error editing order:", error);
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/orders/${id}`);
      if (response.status === 200) {
        setOrders((prevOrders) => prevOrders.filter((o) => o.id !== id));
      } else {
        console.error("Error deleting order");
      }
    } catch (error) {
      console.error("Error deleting order:", error);
    }
  };

  return (
    <div className="order-list-container">
      <button
        className="add-order-button"
        onClick={() => setShowAddModal(true)}
      >
        Add Order
      </button>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Product</th>
            <th>Quantity</th>
            <th>Total Amount</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>
                {order.customer ? order.customer.first_name : "No First Name"}
              </td>
              <td>
                {order.customer ? order.customer.last_name : "No Last Name"}
              </td>
              <td>{order.product ? order.product.nom : "No Product"}</td>
              <td>{order.quantity}</td>
              <td>{order.total_amount}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditOrderData(order);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <AddOrder
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddOrder}
      />
      <EditOrder
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditOrder}
        orderData={editOrderData}
      />
    </div>
  );
};

export default OrderList;
