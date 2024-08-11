import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";

const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCustomerData, setEditCustomerData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/customers")
      .then((response) => setCustomers(response.data))
      .catch((error) => console.error("Error fetching customers:", error));
  }, []);

  const handleAddCustomer = async (customer) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/customers",
        customer
      );
      if (response.status === 200) {
        setCustomers((prevCustomers) => [...prevCustomers, response.data]);
        setShowAddModal(false);
      } else {
        console.error("Error adding customer");
      }
    } catch (error) {
      console.error("Error adding customer:", error);
    }
  };

  const handleEditCustomer = async (customer) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/customers/${customer.id}`,
        customer
      );
      if (response.status === 200) {
        setCustomers((prevCustomers) =>
          prevCustomers.map((c) => (c.id === customer.id ? customer : c))
        );
        setShowEditModal(false);
      } else {
        console.error("Error editing customer");
      }
    } catch (error) {
      console.error("Error editing customer:", error);
    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/customers/${id}`
      );
      if (response.status === 200) {
        setCustomers((prevCustomers) =>
          prevCustomers.filter((c) => c.id !== id)
        );
      } else {
        console.error("Error deleting customer");
      }
    } catch (error) {
      console.error("Error deleting customer:", error);
    }
  };

  return (
    <div className="customer-list-container">
      <button
        className="add-customer-button"
        onClick={() => setShowAddModal(true)}
      >
        Add Customer
      </button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer.id}>
              <td>{customer.id}</td>
              <td>{customer.first_name}</td>
              <td>{customer.last_name}</td>
              <td>{customer.phone}</td>
              <td>{customer.adresse}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditCustomerData(customer);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDeleteCustomer(customer.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddCustomer
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddCustomer}
      />
      <EditCustomer
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditCustomer}
        customerData={editCustomerData}
      />
    </div>
  );
};

export default CustomerList;
