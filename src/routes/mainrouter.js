const express = require('express');
const router = express.Router();
const mainController = require('../controllers/maincontroller');

router.get('/' , mainController.index);
router.get('/products' , mainController.products);
router.get('/login' , mainController.login);
router.get('/register' , mainController.register);
router.get('/mycart' , mainController.mycart);

module.exports = router;