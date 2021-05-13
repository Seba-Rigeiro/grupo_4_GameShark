const {body} = require ('express-validator')
module.exports = {
    // Validaciones para formulario de registro
    registerForm : [
        body ('first_name')
            .notEmpty().withMessage ('Ingrese su nombre').bail()
            .isLength({ min:2,}).withMessage ('Su nombre debe ser de al menos 2 letras')
            .isLength({ max:30,}).withMessage ('Su nombre no puede ser mayor a 30 letras'),
        
        body ('last_name')
            .notEmpty().withMessage ('Ingrese su Apellido').bail()
            .isLength({ min:2,}).withMessage ('Su apellido debe ser de al menos 2 letras')
            .isLength({ max:30,}).withMessage ('Su apellido no puede ser mayor a 30 letras'),
        
        body ('email')
            .notEmpty().withMessage ('Ingrese su email').bail()
            .isEmail().withMessage ('Ingresa un email valido'),
        
        body ('password')
            .notEmpty().withMessage ('Ingresa una contraseña').bail()
            .isLength( { min:6, max:12 }).withMessage ('Ingresa una contraseña entre 6 y 12 caracteres'),
    ],
    // Validaciones para formulario de login
    loginForm : [
        body ('email').isEmail().withMessage ('Ingresa un email valido'),
        body ('password').notEmpty() .withMessage ('Ingresa una contraseña'),
    ],
    // Validaciones para creacion de producto
    productCreate : [
        body ('name')
            .notEmpty().withMessage ('Ingrese el nombre del producto').bail()
            .isLength({ min:2,}).withMessage ('Debe tener al menos 2 letras')
            .isLength({ max:30,}).withMessage ('No puede ser mayor a 30 letras'),

        body ('category_id')
            .notEmpty().withMessage ('Debes seleccionar una categoria'),   

        body ('platform_id')
            .notEmpty().withMessage ('Debes seleccionar una plataforma'),
        
        body ('description')
            .notEmpty().withMessage ('Ingrese una descripcion del producto').bail()
            .isLength({ min:50,}).withMessage ('Debe ser de al menos 50 caracteres')
            .isLength({ max:150,}).withMessage ('No puede superar 500 caracteres'),
        
        /* body ('product_image')
            .isMimeType('image/jpeg' || 'image/jpg' ).withMessage ('Los formatos aceptados son .jpg'), */
            
        
        body ('price')
            .notEmpty().withMessage ('Debe ingresar un precio').bail()
            .isNumeric().withMessage ('El precio debe ser un numero'),
    ],

}