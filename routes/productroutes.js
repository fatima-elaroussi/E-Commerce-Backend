const express = require('express');
const productRouter = express.Router();
const productController = require('../controllers/productcontrollers');

productRouter.route('/products')
  .get(productController.getAllProducts)
  .post(productController.createProduct);

productRouter.route('/products/:id')
  .get(productController.getProductById)
  .put(productController.updateProduct)
  .delete(productController.deleteProduct);

productRouter.get('/filterproducts', productController.filterProduct);
productRouter.get('/sortproducts', productController.sortProduct);
productRouter.get('/searchproducts', productController.searchProduct);
productRouter.get('/searchproductsbyprice', productController.productByPriceRange);

module.exports = productRouter;
