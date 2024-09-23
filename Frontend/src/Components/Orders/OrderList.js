import React, { useState, useEffect } from "react";
import axios from "axios";
import AddOrder from "./AddOrder";
import EditOrder from "./EditOrder";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editOrderData, setEditOrderData] = useState(null);

  useEffect(() => {
    axios
      .get("http://10.250.1.9:3000/orders")
      .then((response) => {
        console.log(response.data.message);
        setOrders(response.data.orders);
      })
      .catch((error) => console.error("Error fetching orders:", error));
  }, []);

  const handleAddOrder = async (order) => {
    try {
      const response = await axios.post("http://10.250.1.9:3000/orders", order);
      if (response.data.success) {
        console.log(response.data.message);
        const updatedOrders = await axios.get("http://10.250.1.9:3000/orders");
        setOrders(updatedOrders.data.orders);
        toast.success("Order Successfully Registered")
        setShowAddModal(false);
      } else {
        console.error("Error adding orders:", response.data.message);
        toast.error("Failed to register order")
      }
    } catch (error) {
      console.error("Error adding order:", error);
      toast.error("Failed to register order")

    }
  };

  const handleEditOrder = async (order) => {
    try {
      const response = await axios.put(
        `http://10.250.1.9:3000/orders/${order.id}`,
        order
      );
      if (response.data.success) {
        console.log(response.data.message);
        setOrders((prevOrders) =>
          prevOrders.map((p) => (p.id === order.id ? order : p))
        );
        setShowEditModal(false);
        toast.success("Successfully modified order")
      } else {
        console.error("Error editing order:", response.data.message);
        toast.error("Failed to modified order")
      }
    } catch (error) {
      console.error("Error editing order:", error);
      toast.error("Failed to modified order")
    }
  };

  const handleDeleteOrder = async (id) => {
    try {
      const response = await axios.delete(`http://10.250.1.9:3000/orders/${id}`);
      if (response.data.success) {
        console.log(response.data.message);
        const updatedOrders = await axios.get("http://10.250.1.9:3000/orders");
        setOrders(updatedOrders.data.orders);
        toast.success("Order deleted successfully")
      } else {
        console.error("Error deleting order:", response.data.message);
        toast.error("Failed to delete order")
      }
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order")

    }
  };

  const confirmDeleteOrder = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes !",
      cancelButtonText: "No !",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        handleDeleteOrder(id);
        Swal.fire("Deleted!", "The order has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    });
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
                  onClick={() => confirmDeleteOrder(order.id)}
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
