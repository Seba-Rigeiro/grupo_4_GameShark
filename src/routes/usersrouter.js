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




router.get('/' , mainController.indexUser);

router.get('/:id' , mainController.detailUser);

router.get('/edit/:id' , mainController.editUserForm);
router.put('/:id' , upload.single ('user_image'), mainController.editUser);

router.delete ('/:id', mainController.deleteUser)



module.exports = router;