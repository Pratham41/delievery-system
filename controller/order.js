// ASYNC
const async = require('async');
// MODELS
const Product = require('../model/product');
const Order = require('../model/order');

// LIST ALL ORDERS
exports.listAllOrders = async function (req, res) {
  try {
    const orders = await Order.find({}).sort({ _id: -1 });
    res.status(200).json(orders);
  } catch (err) {
    res.status(404).json({ message: err.message });
  }
};

// ADD ORDER
exports.addOrder = function (req, res, callback) {
  async.waterfall(
    [
      function (callback) {
        // CHECK PRODUCT IS EXIST OR NOT
        Product.findById(req.body.orderItems.product, function (err, product) {
          if (err) {
            callback(err);
          } else {
            if (product) {
              // ASSIGNING RANDOM LOCATION
              let addressArray = product.addresses;
              let location =
                addressArray[Math.floor(Math.random() * addressArray.length)];

              callback(null, location);
            }
          }
        });
      },
      // ADDING ORDER
      function (location, callback) {
        const { orderItems, shippingAddress } = req.body;
        if (orderItems && orderItems.length == 0) {
          callback('No Order Found !');
        } else {
          const order = new Order({
            orderItems,
            user: req.user._id,
            pickupLocation: location,
            shippingAddress,
          });

          order.save(function (err, order) {
            if (err) {
              callback(err);
            } else {
              if (!order) {
                callback(null, 'Failed to place order');
              } else {
                callback(null, order);
              }
            }
          });
        }
      },
    ],
    function (err, result) {
      if (err) {
        callback(err);
      } else {
        res.send(result);
      }
    }
  );
};

// MARK ORDER AS TASK CREATED
exports.markOrderAsTaskCreated = function (req, res, callback) {
  async.waterfall(
    [
      // CHECKING FOR ORDER
      function (callback) {
        Order.findById(req.params.id, function (err, order) {
          if (err) {
            callback(err);
          } else {
            if (order) {
              callback(null, order);
            } else {
              callback('No Order Found');
            }
          }
        });
      },
      // UPDATING STATUS
      function (order, callback) {
        let query = { isTaskCreated: true };
        Order.updateOne(
          { _id: order._id },
          { $set: query },
          function (err, updatedOrder) {
            if (err) {
              callback(err);
            } else {
              callback(null, updatedOrder);
            }
          }
        );
      },
    ],
    function (err, result) {
      if (err) {
        callback(err);
      } else {
        res.send(result);
      }
    }
  );
};

// MARK ORDER AS REACH TO STORE

exports.markOrderAsReachedStore = function (req, res, callback) {
  async.waterfall(
    [
      // CHECKING ORDER
      function (callback) {
        Order.findById(req.params.id, function (err, order) {
          if (err) {
            callback(err);
          } else {
            if (order) {
              callback(null, order);
            } else {
              callback('No Order Found');
            }
          }
        });
      },
      // UPDATING STATUS
      function (order, callback) {
        let query = { isReachedStore: true };
        Order.updateOne(
          { _id: order._id },
          { $set: query },
          function (err, updatedOrder) {
            if (err) {
              callback(err);
            } else {
              callback(null, updatedOrder);
            }
          }
        );
      },
    ],
    function (err, result) {
      if (err) {
        callback(err);
      } else {
        res.send(result);
      }
    }
  );
};

// MARK ORDER AS ITEM PICKED

exports.markOrderAsItemsPicked = function (req, res, callback) {
  async.waterfall(
    [
      // CHECKING FOR ORDER
      function (callback) {
        Order.findById(req.params.id, function (err, order) {
          if (err) {
            callback(err);
          } else {
            if (order) {
              callback(null, order);
            } else {
              callback('No Order Found');
            }
          }
        });
      },
      // UPDATING STATUS
      function (order, callback) {
        let query = { isItemPicked: true };
        Order.updateOne(
          { _id: order._id },
          { $set: query },
          function (err, updatedOrder) {
            if (err) {
              callback(err);
            } else {
              callback(null, updatedOrder);
            }
          }
        );
      },
    ],
    function (err, result) {
      if (err) {
        callback(err);
      } else {
        res.send(result);
      }
    }
  );
};

// MARK ORDER AS ENROUTE
exports.markOrderAsEnroute = function (req, res, callback) {
  async.waterfall(
    [
      // CHECKING FOR ORDER
      function (callback) {
        Order.findById(req.params.id, function (err, order) {
          if (err) {
            callback(err);
          } else {
            if (order) {
              callback(null, order);
            } else {
              callback('No Order Found');
            }
          }
        });
      },
      // UPDATING STATUS
      function (order, callback) {
        let query = { isEnroute: true };
        Order.updateOne(
          { _id: order._id },
          { $set: query },
          function (err, updatedOrder) {
            if (err) {
              callback(err);
            } else {
              callback(null, updatedOrder);
            }
          }
        );
      },
    ],
    function (err, result) {
      if (err) {
        callback(err);
      } else {
        res.send(result);
      }
    }
  );
};

// MARK ORDER AS DELIEVERED

exports.markOrderAsDelievered = function (req, res, callback) {
  async.waterfall(
    [
      // CHECKING FOR ORDER
      function (callback) {
        Order.findById(req.params.id, function (err, order) {
          if (err) {
            callback(err);
          } else {
            if (order) {
              callback(null, order);
            } else {
              callback('No Order Found');
            }
          }
        });
      },
      // UPDATING STATUS
      function (order, callback) {
        let query = { isDelivered: true, deliveredAt: Date.now() };
        Order.updateOne(
          { _id: order._id },
          { $set: query },
          function (err, updatedOrder) {
            if (err) {
              callback(err);
            } else {
              callback(null, updatedOrder);
            }
          }
        );
      },
    ],
    function (err, result) {
      if (err) {
        callback(err);
      } else {
        res.send(result);
      }
    }
  );
};

// MARK ORDER AS CANCELLED

exports.markOrderAsCanceled = function (req, res, callback) {
  async.waterfall(
    [
      // CHECKING FOR ORDER
      function (callback) {
        Order.findById(req.params.id, function (err, order) {
          if (err) {
            callback(err);
          } else {
            if (order) {
              callback(null, order);
            } else {
              callback('No Order Found');
            }
          }
        });
      },
      // UPDATING STATUS
      function (order, callback) {
        let query = { isCanceled: true };
        Order.updateOne(
          { _id: order._id },
          { $set: query },
          function (err, updatedOrder) {
            if (err) {
              callback(err);
            } else {
              callback(null, updatedOrder);
            }
          }
        );
      },
    ],
    function (err, result) {
      if (err) {
        callback(err);
      } else {
        res.send(result);
      }
    }
  );
};
