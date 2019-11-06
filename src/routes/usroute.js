// const path = require('path');

// const express = require('express');

// const adminController = require('../controllers/adminController');
// const isAuth = require('../middleware/is-auth');
// const ensureAdmin = require('../middleware/admin').ensureAdmin;
// const router = express.Router();

// // /admin/add-product => GET
// router.get('/add-product', ensureAdmin, isAuth, adminController.getAddProduct);

// // /admin/products => GET
// router.get('/products', ensureAdmin,isAuth,adminController.getProducts);

// // /admin/add-product => POST
// router.post('/add-product', ensureAdmin,isAuth,adminController.postAddProduct);

// router.get('/edit-product/:productId',ensureAdmin, adminController.getEditProduct);

// router.post('/edit-product', ensureAdmin,adminController.postEditProduct);

// router.post('/delete-product',ensureAdmin,isAuth, adminController.postDeleteProduct);

// module.exports = router;
