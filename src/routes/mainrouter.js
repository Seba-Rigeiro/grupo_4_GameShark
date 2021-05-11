const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require ('path')
const {body} = require ('express-validator')
const mainController = require('../controllers/maincontroller');
const validations = require ('../middlewares/validations')
// Multer para la imagen de usuario
const storage = multer.diskStorage ({
    // Indica donde se guarda la nueva imagen
    destination: (req, file, callback) => {
        callback (null, path.join(__dirname, '../../public/img/users'))
    },
    // Genera el nombre de la nueva imagen
    filename: (req, file, callback) => {
        const newFlieName = 'user-' + Date.now() + path.extname (file.originalname)
        callback (null, newFlieName)
    }
})

const upload = multer ({ storage: storage})

/* Validaciones para formulario de registro
const validationsRegisterForm = [
    body ('first_name').notEmpty().withMessage ('Ingrese su nombre'),
    body ('last_name').notEmpty().withMessage ('Ingrese su Apellido'),
    body ('email').isEmail().withMessage ('Ingresa un email valido'),
    body ('password').isLength( { min:6, max:12 }).withMessage ('Ingresa una contraseña entre 6 y 12 caracteres'),
]*/



// Ruta pagina principal
router.get('/' , mainController.index);

// Rutas login y logout con validaciones
router.get('/login' , mainController.loginForm);
router.post('/login' , validations.loginForm, mainController.loginAuth);
router.get('/logout' , mainController.logout);

// Rutas registro de usuario con validaciones
router.get('/register' , mainController.registerForm);
router.post('/register' , upload.single ('user_image'), validations.registerForm, mainController.register);

router.get('/mycart' , mainController.mycart);

module.exports = router;