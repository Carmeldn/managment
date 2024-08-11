var express = require("express");
var router = express.Router();
var { Order, Customer, Product } = require("../models");
const { where } = require("sequelize");
const { Model } = require("sequelize");

router.get("/", async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        {
          model: Customer,
          as: "customer",
        },
        {
          model: Product,
          as: "product",
        },
      ],
    });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id, {
      include: [
        {
          model: Customer,
          as: "customer",
        },
        {
          model: Product,
          as: "product",
        },
      ],
    });

    if (!order) {
      return res.status(400).send("Order not found");
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  const { customer_id, product_id, quantity } = req.body;
  try {
    const customer = await Customer.findByPk(customer_id);
    const product = await Product.findByPk(product_id);

    if (!customer || !product) {
      return res.status(400).send("Customer or Product not found");
    }

    if (quantity > product.quantite) {
      return res.status(400).send("Insufficient product quantity");
    }

    const total_amount = quantity * product.prix;

    const newOrder = await Order.create({
      customer_id,
      product_id,
      quantity,
      total_amount,
    });

    // Update product quantity
    product.quantite -= quantity;
    await product.save();

    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { customer_id, product_id, quantity } = req.body;
  try {
    const order = await Order.findByPk(id);
    const product = await Product.findByPk(product_id);

    if (!order || !product) {
      return res.status(400).send("Order or Product not found");
    }

    if (quantity > product.quantite) {
      return res.status(400).send("Insufficient product quantity");
    }

    const total_amount = quantity * product.prix;

    await order.update({
      customer_id,
      product_id,
      quantity,
      total_amount,
    });

    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(400).send("Order not found");
    }

    
    const product = await Product.findByPk(order.product_id);

    await product.update({
      quantite: product.quantite + order.quantity,
    });



    await order.destroy();
    res.status(200).send("Order deleted");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
