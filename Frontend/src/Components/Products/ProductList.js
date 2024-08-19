import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductData, setEditProductData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/product")
      .then((response) => {
        console.log(response.data.message);
        setProducts(response.data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post("http://localhost:3000/product", product);
      if (response.data.success) {
        console.log(response.data.message);
        const updatedProducts = await axios.get("http://localhost:3000/product");
        setProducts(updatedProducts.data.products);
  
        setShowAddModal(false);
      } else {
        console.error("Error adding product:", response.data.message);
      }
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };
  

  const handleEditProduct = async (product) => {
    try {
      const response = await axios.put(`http://localhost:3000/product/${product.id}`, product);
      if (response.data.success) {
        console.log(response.data.message);
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === product.id ? product : p))
        );
        setShowEditModal(false);
      } else {
        console.error("Error editing product:", response.data.message);
      }
    } catch (error) {
      console.error("Error editing product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:3000/product/${id}`);
      if (response.data.success) {
        console.log(response.data.message);
        // Rafraîchir la liste des produits
        const updatedProducts = await axios.get("http://localhost:3000/product");
        setProducts(updatedProducts.data.products);
      } else {
        console.error("Error deleting product:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };
  

  return (
    <div className="product-list-container">
      <button className="add-product-button" onClick={() => setShowAddModal(true)}>
        Add Product
      </button>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.nom}</td>
              <td>{product.quantite}</td>
              <td>{product.prix}</td>
              <td>
                {product.categories ? product.categories.nom_category : "No Category"}
              </td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditProductData(product);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button className="delete-btn" onClick={() => handleDeleteProduct(product.id)}>
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddProduct
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddProduct}
      />
      <EditProduct
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditProduct}
        productData={editProductData}
      />
    </div>
  );
};

export default ProductList;
