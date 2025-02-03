var express = require("express");
var router = express.Router();
var { Order, Customer, Product } = require("../models");

router.get("/", async (req, res) => {
  try {
    const totalOrder = await Order.count();
    const totalProduct = await Product.count();

    const topCustomers = await Customer.findAll({
      include: [
        {
          model: Order,
          as: "orders",
        },
      ],
      attributes: ["id", "first_name", "last_name"],
      order: [[sequelize.fn('SUM', sequelize.col('orders.total_amount')), 'DESC']],
      group: ['Customer.id'],
      limit: 10,
    });

    const topProducts = await Product.findAll({
      include: [
        {
          model: Order,
          as: "orders",
        },
      ],
      attributes: ["id", "nom"],
      order: [[sequelize.fn('SUM', sequelize.col('orders.quantity')), 'DESC']],
      group: ['Product.id'],
      limit: 10,
    });

    res.status(200).json({
      totalOrder,
      totalProduct,
      topCustomers,
      topProducts,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
