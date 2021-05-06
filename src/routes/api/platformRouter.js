const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/platformController');


router.get ('/platforms', controller.index);


module.exports = router;