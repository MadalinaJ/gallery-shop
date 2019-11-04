const path = require('path');

const express = require('express');

const shopController = require('../controllers/shopController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

router.get('/shop', shopController.getIndex);

router.get('/products', shopController.getProducts);

router.get('/products/:productId', shopController.getProduct);

router.get('/cart', isAuth, shopController.getCart);

router.post('/cart', isAuth, shopController.postCart);

router.post('/cart-delete-item', isAuth, shopController.postCartDeleteProduct);

router.post('/create-order', isAuth, shopController.postOrder);

router.get('/orders', isAuth,shopController.getOrders);

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
