var express = require("express");
var router = express.Router();
var products = require("../products.json");

/* GET users listing. */
router.get("/products", function (req, res, next) {
  res.json(products);
});

router.get("/products/:id", function (req, res, next) {
  const { id } = req.params;
  res.json(products[id]);
});

router.get("/products/:id/:qt", function (req, res, next) {
  res.json({
    id: req.params.id,
    qt: req.params.qt,
    unitprice: products[req.params.id].price,
    total: products[req.params.id].price * req.params.qt,
  });
});

router.get("/productss/instock/:qt", function (req, res, next) {
  list = [];
  for (var element in products) {
    if (products[element].stock > req.params.qt) {
      list.push(products[element]);
    }
  }

  res.json(list);
});

module.exports = router;
