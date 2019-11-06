const path = require('path');

const express = require('express');

const shopController = require('../controllers/shopController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/shop', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', isAuth(['user','admin']),shopController.getProduct);

router.get('/cart', isAuth(['user','admin']), shopController.getCart);

router.post('/cart', isAuth(['user','admin']), shopController.postCart);

router.post('/cart-delete-item', isAuth(['user','admin']), shopController.postCartDeleteProduct);

router.post('/create-order', isAuth(['user','admin']), shopController.postOrder);

router.get('/orders', isAuth(['user','admin']),shopController.getOrders);

module.exports = router;

// const path = require('path');

// const express = require('express');

// const shopController = require('../controllers/shopController');

// const router = express.Router();

// router.get('/shop', shopController.getIndex);

// router.get('/products', shopController.getProducts);

// router.get('/cart', shopController.getCart);

// router.get('/checkout', shopController.getCheckout);

// module.exports = router;
