import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCategory from "./AddCategory";
import EditCategory from "./EditCategory";
import "../../styles/main.css";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCategoryData, setEditCategoryData] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/categories/")
      .then((response) => {
        console.log(response.data.message);
        setCategories(response.data.categories);
      })
      .catch((error) => console.error("Error fetching customer:", error));
  }, []);

  const handleAddCategory = async (category) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/categories",
        category
      );
      if (response.data.success) {
        console.log(response.data.message);
        const updatedCategories = await axios.get("http://localhost:3000/categories/");
        toast.success("Category added successfully");
        setCategories(updatedCategories.data.categories);
        setShowAddModal(false);
      } else {
        console.error("Error adding category:", response.data.message);
        toast.error("Failed to add category. Please try again.");
      }
    } catch (error) {
      console.error("Error adding category:", error);
      toast.error("Failed to add category. Please try again.");
      setShowAddModal(false);
    }
  };

  const handleEditCategory = async (category) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/categories/${category.id}`,
        category
      );
      if (response.status === 200) {
        setCategories((prevCategories) =>
          prevCategories.map((c) => (c.id === category.id ? category : c))
        );
        toast.success("Category updated successfully.");
        setShowEditModal(false);
        console.log(response.data.message);
        
      } else {
        console.error("Error updating category");
        toast.error("Error updating category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      toast.error("Error updating category.");
    }
  };

  const handleDeleteCategory = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/categories/${id}`
      );
      if (response.status === 200) {
        setCategories((prevCategories) =>
          prevCategories.filter((c) => c.id !== id)
        );
        toast.success("Category deleted successfully");
        console.log(response.data.message); // Affiche le message de succès
      } else {
        console.error("Error deleting category");
        toast.error("Error deleting category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      toast.error("Error deleting category.");
    }
  };

  const confirmDeleteCategory = (id) => {
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
        handleDeleteCategory(id);
        Swal.fire("Deleted!", "The category has been deleted.", "success");
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        
      }
    });
  };

  return (
    <div className="customer-list-container">
      <button
        className="add-category-button"
        onClick={() => setShowAddModal(true)}
      >
        Add Category
      </button>
      <table className="category-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.id}>
              <td>{category.nom_category}</td>
              <td>{category.description}</td>
              <td>
                <button
                  className="edit-btn"
                  onClick={() => {
                    setEditCategoryData(category);
                    setShowEditModal(true);
                  }}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => confirmDeleteCategory(category.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <AddCategory
        show={showAddModal}
        onClose={() => setShowAddModal(false)}
        onSave={handleAddCategory}
      />
      <EditCategory
        show={showEditModal}
        onClose={() => setShowEditModal(false)}
        onSave={handleEditCategory}
        categoryData={editCategoryData}
      />
    </div>
  );
}

export default CategoryList;
