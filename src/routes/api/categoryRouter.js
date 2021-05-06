const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/categoryController');


router.get ('/categories', controller.index);


module.exports = router;