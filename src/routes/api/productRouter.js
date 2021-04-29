const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/productController');


router.get ('/products', controller.products);
router.get ('/products/:id', controller.productDetail);

module.exports = router;