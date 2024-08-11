var express = require('express')
var router = express.Router()
var { Category } = require('../models')

router.get('/', async (req, res) => {
    try {
        const categories = await Category.findAll();
        if (!categories) {
            return res.status(404).json({ error: 'Categories not found' });
        }
        return res.status(200).json(categories);
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});

router.get("/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const category = await Category.findByPk(id);
        if (!category) {
            return res.status(404).json({ error: "Category not found" });
        }
        return res.status(200).json(category);
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});

router.post('/', async (req, res) => {
    const { nom_category, description } = req.body;
    try {
        const newCategory = await Category.create({ nom_category, description });
        return res.status(201).json({ message: 'Category added successfully', newCategory });
    } catch (error) {
        return res.status(500).json({ error: 'Server error' });
    }
});

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
