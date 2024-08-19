const express = require("express");
const router = express.Router();
var { Product, Category } = require("../models");

router.get("/", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: {
        model: Category,
        as: "categories",
      },
    });
    res.json({ success: true, message: "Successfully recovered products", products });
  } catch (error) {
    console.error("Error while retrieving products:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: {
        model: Category,
        as: "categories",
      },
    });
    if (product) {
      res.json({ success: true, message: "Successfully recovered product", product });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error Retrieving the Product::", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

router.post("/", async (req, res) => {
  const { nom, quantite, prix, category_id } = req.body;
  try {
    const newProduct = await Product.create({ nom, quantite, prix, category_id });
    res.status(201).json({ success: true, message: "Successfully created product", newProduct });
  } catch (error) {
    console.error("Error creating the product:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

router.put("/:id", async (req, res) => {
  const { nom, quantite, prix, category_id } = req.body;
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      product.nom = nom;
      product.quantite = quantite;
      product.prix = prix;
      product.category_id = category_id;
      await product.save();
      res.json({ success: true, message: "Successfully updated product", product });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error when modifying the product:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.status(200).json({ success: true, message: "Product Successfully Deleted" });
    } else {
      res.status(404).json({ success: false, message: "Product not found" });
    }
  } catch (error) {
    console.error("Error deleting product:", error.message);
    res.status(500).json({ success: false, message: "server error" });
  }
});


module.exports = router;
