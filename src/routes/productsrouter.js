const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require ('path')
const productsController = require('../controllers/productscontroller');

const storage = multer.diskStorage ({
    // Indica donde se guarda la nueva imagen
    destination: (req, file, callback) => {
        callback (null, path.join(__dirname, '../../public/img/products'))
    },
    // Genera el nombre de la nueva imagen
    filename: (req, file, callback) => {
        const newFlieName = 'product-' + Date.now() + path.extname (file.originalname)
        callback (null, newFlieName)
    }
})

const upload = multer ({ storage: storage})

// Rutas creacion de productos con multer para las imagenes
router.get('/create' , productsController.createForm);
router.post('/create' , upload.single ('product_image'), productsController.create);

// Rutas para listar productos y detalle de productos
router.get('/products' , productsController.products);
router.get('/products/:id' , productsController.detail);
router.get('/platform/:id' , productsController.productsByPlatform);

// Rutas para editar producto
router.get('/edit/:id' , productsController.editForm);
router.put('/edit' , productsController.edit);

module.exports = router;