const express = require('express');
const router = express.Router();
const controller = require('../../controllers/api/userController');


router.get ('/users', controller.users);
router.get ('/users/:id', controller.userDetail);

module.exports = router;