const express = require('express');
const router = express.Router();
const userCtrl = require('../controls/user');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.delete('/:id/del', auth, userCtrl.delete);
router.put('/update/:id', auth, multer, userCtrl.updateUser);
router.get('/users', userCtrl.findAll);
router.get('/profil/:id', userCtrl.findOne);

module.exports = router;