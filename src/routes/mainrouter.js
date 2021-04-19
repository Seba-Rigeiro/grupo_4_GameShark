const express = require('express');
const router = express.Router();
const multer = require ('multer');
const {body} = require ('express-validator')
const mainController = require('../controllers/maincontroller');

// Validaciones para formulario de registro
const validationsRegisterForm = [
    body ('name').notEmpty().withMessage ('Ingresa Nombre y Apellido'),
    body ('email').isEmail().withMessage ('Ingresa un email valido'),
    body ('password').isLength( { min:6, max:12 }).withMessage ('Ingresa una contraseña entre 6 y 12 caracteres'),
]

// Validaciones para formulario de login
const validationsLoginForm = [
    body ('email').isEmail().withMessage ('Ingresa un email valido'),
    body ('password').notEmpty() .withMessage ('Ingresa una contraseña'),
]

// Ruta pagina principal
router.get('/' , mainController.index);

// Rutas login y logout con validaciones
router.get('/login' , mainController.loginForm);
router.post('/login' , validationsLoginForm, mainController.loginAuth);
router.get('/logout' , mainController.logout);

// Rutas registro de usuario con validaciones
router.get('/register' , mainController.registerForm);
router.post('/register' , validationsRegisterForm, mainController.register);

router.get('/mycart' , mainController.mycart);

module.exports = router;