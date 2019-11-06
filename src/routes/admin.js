const path = require('path');

const express = require('express');
const { body } = require('express-validator');

const adminController = require('../controllers/adminController');
const isAuth = require('../middleware/is-auth');

const router = express.Router();

// /admin/add-product => GET
//router.get('/products', isAuth(['user', 'admin']), adminController.getProducts);
router.get('/products', isAuth(['admin']), adminController.getProducts);

router.get('/add-product', isAuth(['admin']), adminController.getAddProduct);

// /admin/products => GET
//router.get('/products',isAuth,adminController.getProducts);

// /admin/add-product => POST
router.post('/add-product',  [
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ],
  isAuth(['admin']),
  adminController.postAddProduct);

router.get('/edit-product/:productId',isAuth(['admin']),adminController.getEditProduct);

router.post('/edit-product',
[
    body('title')
      .isString()
      .isLength({ min: 3 })
      .trim(),
    body('imageUrl').isURL(),
    body('price').isFloat(),
    body('description')
      .isLength({ min: 5, max: 400 })
      .trim()
  ], 
  isAuth(['admin']),
  adminController.postEditProduct);

router.post('/delete-product',isAuth(['admin']), adminController.postDeleteProduct);

module.exports = router;


