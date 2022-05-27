const express = require('express');
const router = express.Router();
const publiCtrl = require('../controls/blogs');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer');

router.post('/:id', auth, multer, publiCtrl.createPost);
router.delete('/delete/:id', auth, publiCtrl.deletePost);
router.get('/', publiCtrl.findAll);
router.get('/user/:id', publiCtrl.findAllPostsUser);
router.get('/:id', publiCtrl.findOne);

module.exports = router;