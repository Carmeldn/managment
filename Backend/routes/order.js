var express = require("express");
var router = express.Router();
var { Order, Customer, Product } = require("../models");

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
    res.json({
      success: true,
      message: "Successfully recovered orders",
      orders,
    });
  } catch (error) {
    console.error("Error while retrieving orders:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error occurred while retrieving orders.",
      error: error.message,
    });
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

    if (order) {
      res.json({
        success: true,
        message: "Successfully recovered order",
        order,
      });
    } else {
      res.status(404).json({
        success: false,
        message: "Order not found.",
      });
    }
  } catch (error) {
    console.error("Error retrieving the order:", error.message);
    res.status(500).json({
      success: false,
      message: "Server error occurred while retrieving the order.",
      error: error.message,
    });
  }
});

router.post("/", async (req, res) => {
  const { customer_id, product_id, quantity } = req.body;
  try {
    const customer = await Customer.findByPk(customer_id);
    const product = await Product.findByPk(product_id);

    if (!customer || !product) {
      return res.status(400).json({
        success: false,
        message: "Customer or Product not found.",
      });
    }


    const total_amount = quantity * product.prix;

    const newOrder = await Order.create({
      customer_id,
      product_id,
      quantity,
      total_amount,
    });

    await product.save();

    res.status(201).json({
      success: true,
      message: "Order successfully created.",
      newOrder,
    });
  } catch (error) {
    console.error("Error creating the order:", error.message);
    res.status(400).json({
      success: false,
      message: "Error occurred while creating the order.",
      error: error.message,
    });
  }
});

router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { customer_id, product_id, quantity } = req.body;
  try {
    const order = await Order.findByPk(id);
    const product = await Product.findByPk(product_id);

    if (!order || !product) {
      return res.status(400).json({
        success: false,
        message: "Order or Product not found.",
      });
    }

    if (quantity > product.quantite) {
      return res.status(400).json({
        success: false,
        message: "Insufficient product quantity.",
      });
    }

    const total_amount = quantity * product.prix;

    await order.update({
      customer_id,
      product_id,
      quantity,
      total_amount,
    });

    res.status(200).json({
      success: true,
      message: "Order successfully updated.",
      order,
    });
  } catch (error) {
    console.error("Error updating the order:", error.message);
    res.status(400).json({
      success: false,
      message: "Error occurred while updating the order.",
      error: error.message,
    });
  }
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Order.findByPk(id);
    if (!order) {
      return res.status(400).json({
        success: false,
        message: "Order not found.",
      });
    }

    const product = await Product.findByPk(order.product_id);


    await order.destroy();
    res.status(200).json({
      success: true,
      message: "Order successfully deleted.",
    });
  } catch (error) {
    console.error("Error deleting the order:", error.message);
    res.status(400).json({
      success: false,
      message: "Error occurred while deleting the order.",
      error: error.message,
    });
  }
});

module.exports = router;
