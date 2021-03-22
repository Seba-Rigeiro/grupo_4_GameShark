const express = require('express');
const router = express.Router();
const multer = require ('multer');
const path = require ('path')
const productsController = require('../controllers/productscontroller');

const storage = multer.diskStorage ({
    destination: (req, file, callback) => {
        callback (null, path.join(__dirname, '../../public/img/products'))
    },
    filename: (req, file, callback) => {
        const newFlieName = 'product-' + Date.now() + path.extname (file.originalname)
        callback (null, newFlieName)
    }
})

const upload = multer ({ storage: storage})

router.get('/create' , productsController.createForm);
router.post('/create' , upload.single ('product_image'), productsController.create);

router.get('/products/:id' , productsController.detail);

router.get('/edit' , productsController.editForm);
router.put('/edit' , productsController.edit);

module.exports = router;