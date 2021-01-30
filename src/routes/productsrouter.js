const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productscontroller');

router.get('/create' , productsController.create);
router.get('/products/detail' , productsController.detail);
router.get('/edit' , productsController.edit);

module.exports = router;