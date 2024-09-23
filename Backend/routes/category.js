var express = require('express')
var router = express.Router()
var { Category,Product } = require('../models');
const { Model } = require('sequelize');

router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        res.json({ success: true, message: "Successfully recovered categories", categories });
    } catch (error) {
        console.error("Error while retrieving categories:", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id)
        if (category) {
            res.json({ success: true, message: "Successfully recovered category", category });
        }
        else{
            res.status(404).json({ success: false, message: "Category not found" });
        }
    } catch (error) {
        console.error("Error Retrieving the category::", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
});

router.get("/:id/products", async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id, {
            include: [{
                model: Product,
                as: 'products',
            }],
        });

        if (category) {
            res.json({ success: true, message: "Successfully recovered category and products", category });
        } else {
            res.status(404).json({ 
                success: false, 
                message: "Category not found" 
            });
        }
    } catch (error) {
        console.error("Error retrieving the category and products:", error.message);
        res.status(500).json({ success: false, message: "server error" });
    }
});

router.post('/', async(req,res)=>{
    const {nom_category,description  } = req.body
    try {
        const newCategory = await Category.create({
          nom_category,
          description,
        });
        res.status(201).json({ success: true, message: "Successfully created category", newCategory });
    } catch (error) {
        console.error("Error creating the category:", error.message);
    res.status(500).json({ success: false, message: "server error" });
    }
})

router.put("/:id", async (req, res) => {
    const { id } = req.params;
    const { nom_category, description } = req.body;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        category.nom_category = nom_category || category.nom_category;
        category.description = description || category.description;

        await category.save();
        return res.status(200).json({ message: 'Category modified successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});

router.delete("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }

        await category.destroy();
        return res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;
