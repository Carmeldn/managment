import React, { useState, useEffect } from "react";

const EditCustomer = ({ show, onClose, onSave, customerData }) => {
  const [customer, setCustomer] = useState({
    first_name: "",
    last_name: "",
    phone: "",
    adresse: "",
  });

  useEffect(() => {
    if (customerData) {
      setCustomer(customerData);
    }
  }, [customerData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomer({ ...customer, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(customer);
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
        <h2>Edit Customer</h2>
        <form onSubmit={handleSubmit}>
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={customer.first_name}
            onChange={handleChange}
            required
          />
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={customer.last_name}
            onChange={handleChange}
            required
          />
          <label>Phone:</label>
          <input
            type="text"
            name="phone"
            value={customer.phone}
            onChange={handleChange}
            required
          />
          <label>Address:</label>
          <input
            type="text"
            name="adresse"
            value={customer.adresse}
            onChange={handleChange}
            required
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default EditCustomer;
