// ROUTER
const router = require('express').Router();
// CONTROLLERS
const { insertManyProducts, listProducts } = require('../controller/product');

// ROUTES
router.route('/insertmany').post(insertManyProducts);
router.route('/').get(listProducts);

module.exports = router;
