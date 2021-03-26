const express = require('express');
const router = express.Router();
const multer = require ('multer');
const {body} = require ('express-validator')
const mainController = require('../controllers/maincontroller');

const validationsRegisterForm = [
    body ('name').notEmpty().withMessage ('Ingresa Nombre y Apellido'),
    body ('email').isEmail().withMessage ('Ingresa un email valido'),
    body ('password').isLength( { min:6, max:12 }).withMessage ('Ingresa una contraseña entre 6 y 12 caracteres'),
]


router.get('/' , mainController.index);

router.get('/products' , mainController.products);

router.get('/login' , mainController.login);

router.get('/register' , mainController.registerForm);
router.post('/register' , validationsRegisterForm, mainController.register);

router.get('/mycart' , mainController.mycart);

module.exports = router;