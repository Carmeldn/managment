import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCustomer from "./AddCustomer";
import EditCustomer from "./EditCustomer";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const CustomerList = () => {
  const [customers, setCustomers] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCustomerData, setEditCustomerData] = useState(null);

  useEffect(() => {
    axios
      .get("http://10.250.1.9:3000/customers")
      .then((response) => {
        console.log(response.data.message);
        setCustomers(response.data.customer);
      })
      .catch((error) => console.error("Error fetching customer:", error));
  }, []);

  const handleAddCustomer = async (customer) => {
    try {
      const response = await axios.post(
        "http://10.250.1.9:3000/customers",
        customer
      );
      if (response.data.success) {
        console.log(response.data.message);
        const updatedCustomers = await axios.get("http://10.250.1.9:3000/customers");
        setCustomers(updatedCustomers.data.customer);
        toast.success("Customer added successfully")
  
        setShowAddModal(false);
      } else {
        console.error("Error adding customer:", response.data.message);
        toast.error("Failed to add customer. Please try again.")
      }
    } catch (error) {
      console.error("Error adding customer:", error);
      toast.error("Failed to add customer. Please try again.")
    }
  };

  const handleEditCustomer = async (customer) => {
    try {
      const response = await axios.put(
        `http://10.250.1.9:3000/customers/${customer.id}`,
        customer
      );
      if (response.data.success) {
        console.log(response.data.message);
        setCustomers((prevCustomers) =>
          prevCustomers.map((p) => (p.id === customer.id ? customer : p))
        );
        setShowEditModal(false);
        toast.success("Customer updated successfully")
      }else {
        console.error("Error editing product:", response.data.message);
        toast.error("Error updating customer")
      }
    } catch (error) {
      console.error("Error editing product:", error);
      toast.error("Error updating customer")

    }
  };

  const handleDeleteCustomer = async (id) => {
    try {
      const response = await axios.delete(
        `http://10.250.1.9:3000/customers/${id}`
      );
      if (response.data.success) {
        console.log(response.data.message);
        const updatedCustomers = await axios.get("http://10.250.1.9:3000/customers");
        setCustomers(updatedCustomers.data.customer);
        toast.success("Customer deleted successfully");
      } else {
        console.error("Error deleting customer:", response.data.message);
        toast.error("Error deleting customer.");
      }
    } catch (error) { 
      console.error("Error deleting customer:", error);
      toast.error("Error deleting customer.");

    }
  };

  const confirmDeleteCustomer = (id) => {
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
        handleDeleteCustomer(id);
        Swal.fire("Deleted!", "The customer has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    });
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
                  onClick={() => confirmDeleteCustomer(customer.id)}
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
