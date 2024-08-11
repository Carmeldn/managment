import React, { useState, useEffect } from "react";
import "../../styles/main.css";

const EditCategory = ({ show, onClose, onSave, categoryData }) => {
  const [category, setCategory] = useState({
    nom_category: "",
    description: "",
  });

  useEffect(() => {
    if (categoryData) {
      setCategory(categoryData);
    }
  }, [categoryData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCategory({ ...category, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(category);
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
        <h2>Edit Category</h2>
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

export default EditCategory;
