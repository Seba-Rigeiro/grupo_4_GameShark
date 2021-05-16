const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require ('path')
const productsController = require('../controllers/productscontroller');
const validations = require('../middlewares/validations');


const storage = multer.diskStorage ({
    // Indica donde se guarda la nueva imagen
    destination: (req, file, callback) => {
        callback (null, path.join(__dirname, '../../public/img/products'))
    },
    // Genera el nombre de la nueva imagen
    filename: (req, file, callback) => {
        const newFileName = 'product-' + Date.now() + path.extname (file.originalname)
        callback (null, newFileName)
    }
})

const upload = multer ({ 
    storage: storage,
   
})

// Rutas creacion de productos con multer para las imagenes
router.get('/create' , productsController.createForm);
router.post('/' , upload.single ('product_image'), validations.productCreate, productsController.create);

// Ruta para listar productos
router.get('/' , productsController.products);

// Rutas para editar producto
router.get('/edit/:id' , productsController.editForm);
router.put('/:id' , upload.single ('product_image'), productsController.edit);

//Ruta para borrar producto
router.delete('/:id' , productsController.deleteProduct);

// Ruta detalle de producto y listado por plataforma
router.get('/:id' , productsController.detail);
router.get('/platform/:id' , productsController.productsByPlatform);
router.get('/platform/:id/:id' , productsController.detail);
router.get('/category/:id' , productsController.productsByCategory);
router.get('/category/:id/:id' , productsController.detail);

module.exports = router;