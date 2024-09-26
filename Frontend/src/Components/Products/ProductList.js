import React, { useState, useEffect } from "react";
import axios from "axios";
import AddProduct from "./AddProduct";
import EditProduct from "./EditProduct";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editProductData, setEditProductData] = useState(null);

  useEffect(() => {
    axios
      .get("http://10.250.1.9:3000/products")
      .then((response) => {
        console.log(response.data.message);
        setProducts(response.data.products);
      })
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const handleAddProduct = async (product) => {
    try {
      const response = await axios.post("http://10.250.1.9:3000/products", product);
      if (response.data.success) {
        console.log(response.data.message);
        const updatedProducts = await axios.get("http://10.250.1.9:3000/products");
        setProducts(updatedProducts.data.products);
        toast.success("Product added successfully");

        setShowAddModal(false);
      } else {
        console.error("Error adding product:", response.data.message);
        toast.error("Failed to add product. Please try again.");

      }
    } catch (error) {
      console.error("Error adding product:", error);
      toast.error("Failed to add product. Please try again.");

    }
  };
  

  const handleEditProduct = async (product) => {
    try {
      const response = await axios.put(`http://10.250.1.9:3000/products/${product.id}`, product);
      if (response.data.success) {
        console.log(response.data.message);
        setProducts((prevProducts) =>
          prevProducts.map((p) => (p.id === product.id ? product : p))
        );

        setShowEditModal(false);
        console.log(response.data.message);
        toast.success("Product updated successfully");

      } else {
        console.error("Error editing product:", response.data.message);
        toast.error("Error updating product.");
      }
    } catch (error) {
      console.error("Error editing product:", error);
      toast.error("Error updating product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      const response = await axios.delete(`http://10.250.1.9:3000/products/${id}`);
      if (response.data.success) {
        console.log(response.data.message);
        const updatedProducts = await axios.get("http://10.250.1.9:3000/products");
        setProducts(updatedProducts.data.products);
        toast.success("Product deleted successfully");
      } else {
        console.error("Error deleting product:", response.data.message);
        toast.error("Error deleting product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("Error deleting product.");
    }
  };
  
  const confirmDeleteProduct = (id) => {
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
        handleDeleteProduct(id);
        Swal.fire("Deleted!", "The product has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    });
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
            <th>Price</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.nom}</td>
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
                <button className="delete-btn" onClick={() => confirmDeleteProduct(product.id)}>
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
