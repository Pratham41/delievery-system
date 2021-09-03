// MODEL
const Product = require('../model/product');
// SAMPLE DATA
const products = require('../data/products');

// INSERT SAMPLE DATA
exports.insertManyProducts = async function (req, res) {
  try {
    const insertedProducts = await Product.insertMany(products);
    if (insertedProducts) {
      res.status(200).json({ products: insertedProducts });
    }
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// LIST ALL PRODUCTS
exports.listProducts = async function (req, res) {
  try {
    const products = await Product.find({});
    res.status(200).json(products);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
