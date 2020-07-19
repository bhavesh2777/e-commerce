const mongoose = require('mongoose');

const fileHelper = require('../util/file');

const { validationResult } = require('express-validator/check');

const Product = require('../models/product');

exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  // const image = req.file;
  const price = req.body.price;
  const description = req.body.description;
  // if (!image) {
  //   return res.status(422).json({
  //     errorMessage: 'Attached file is not an image.',
  //     validationErrors: []
  //   });
  // }
  const errors = validationResult(req);
  console.log(errors.array())
  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  // const imageUrl = image.path;

  const product = new Product({
    title: title,
    price: price,
    description: description,
    // imageUrl: imageUrl,
    userId: req.userId
  });
  product
    .save()
    .then(result => {
      res.status(200).json({ message: 'Created Product' });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.postEditProduct = (req, res, next) => {
  const prodId = req.body.productId;
  const updatedTitle = req.body.title;
  const updatedPrice = req.body.price;
  // const image = req.file;
  const updatedDesc = req.body.description;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({
      errorMessage: errors.array()[0].msg,
      validationErrors: errors.array()
    });
  }

  Product.findById(prodId)
    .then(product => {
      if (product.userId.toString() !== req.userId.toString()) {
        return res.status(400).json({ message: 'Unauthorized access' });
      }
      product.title = updatedTitle;
      product.price = updatedPrice;
      product.description = updatedDesc;
      // if (image) {
      //   fileHelper.deleteFile(product.imageUrl);
      //   product.imageUrl = image.path;
      // }
      return product.save().then(result => {
        res.status(200).json({ message: 'Updated Product' });
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.getProducts = (req, res, next) => {
  Product.find({ userId: req.userId })
    .then(products => {
      res.status(200).json({
        products: products
      });
    })
    .catch(err => {
      const error = new Error(err);
      error.httpStatusCode = 500;
      return next(error);
    });
};

exports.deleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then(product => {
      if (!product) {
        return next(new Error('Product not found.'));
      }
      // fileHelper.deleteFile(product.imageUrl);
      return Product.deleteOne({ _id: prodId, userId: req.userId });
    })
    .then(() => {
      res.status(200).json({ message: 'Successfully deleted product!' });
    })
    .catch(err => {
      res.status(500).json({ message: 'Deleting product failed.' });
    });
};
