import React, { useState, useEffect } from "react";
import axios from "axios";

const AddProduct = ({ show, onClose, onSave }) => {
  const [product, setProduct] = useState({
    nom: "",
    quantite: "",
    prix: "",
    category_id: "",
  });
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(product);
    setProduct({ nom: "", quantite: "", prix: "", category_id: "" });
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
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <label>Name:</label>
          <input
            type="text"
            name="nom"
            value={product.nom}
            onChange={handleChange}
            required
          />
          <label>Quantity:</label>
          <input
            type="number"
            name="quantite"
            value={product.quantite}
            onChange={handleChange}
            required
          />
          <label>Price:</label>
          <input
            type="number"
            name="prix"
            value={product.prix}
            onChange={handleChange}
            required
          />
          <label>Category:</label>
          <select
            name="category_id"
            value={product.category_id}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.nom_category}
              </option>
            ))}
          </select>
          <button type="submit">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;
