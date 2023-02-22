const express = require('express');
const router = express.Router();

const cartController = require('../app/controllers/CartController');

router.delete('/delete/:id', cartController.delete);
router.post('/add', cartController.addToCart);
router.get('/',cartController.cart);


module.exports = router;