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
    res.json(products);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des produits:",
      error.message
    );
    res.status(500).send("Erreur serveur");
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
      res.json(product);
    } else {
      res.status(404).send("Produit non trouvé");
    }
  } catch (error) {
    console.error("Erreur lors de la récupération du produit:", error.message);
    res.status(500).send("Erreur serveur");
  }
});


router.post("/", async (req, res) => {
  const { nom, quantite, prix, category_id } = req.body;
  try {
    const newProduct = await Product.create({nom,quantite,prix,category_id,});
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Erreur lors de la création du produit:", error.message);
    res.status(500).send("Erreur serveur");
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
      res.json(product);
    } else {
      res.status(404).send("Produit non trouvé");
    }
  } catch (error) {
    console.error("Erreur lors de la modification du produit:", error.message);
    res.status(500).send("Erreur serveur");
  }
});


router.delete("/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    if (product) {
      await product.destroy();
      res.status(204).send(); 
    } else {
      res.status(404).send("Produit non trouvé");
    }
  } catch (error) {
    console.error("Erreur lors de la suppression du produit:", error.message);
    res.status(500).send("Erreur serveur");
  }
});

module.exports = router;
