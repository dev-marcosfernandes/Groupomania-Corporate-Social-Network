const express = require('express');
const router = express.Router();

const commentCtrl = require('../controls/commentaires');
const auth = require('../middleware/auth');

router.post('/:id', auth, commentCtrl.createComment);
router.delete('/del/:id', auth, commentCtrl.deleteComment);
router.get('/:id', commentCtrl.findAll);
router.get('/find/:id', commentCtrl.findOne);

module.exports = router;