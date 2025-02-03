import React, { useState } from "react";
import "../../styles/main.css"; // Importez vos styles

const AddCategory = ({ show, onClose, onSave }) => {
  const [category, setCategory] = useState({
    nom_category: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSave(category);
    setCategory({ nom_category: "", description: "" });
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
        <h2>Add Category</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="nom_category"
            value={category.nom_category}
            onChange={handleChange}
            required
          />
          <label>Description:</label>
          <input
            type="text"
            name="description"
            value={category.description}
            onChange={handleChange}
            required
          />
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddCategory;
