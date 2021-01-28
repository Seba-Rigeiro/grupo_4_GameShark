const express = require('express');
const router = express.Router();
const mainController = require('../controllers/maincontroller');
const productsController = require('../controllers/productscontroller');

router.get('/' , mainController.index);
router.get('/products' , mainController.products);
router.get('/login' , mainController.login);
router.get('/register' , mainController.register);
router.get('/products/detail' , productsController.detail);
router.get('/mycart' , mainController.mycart);

module.exports = router;