// MONGOOSE
const mongoose = require('mongoose');
// ORDER SCHEMA
const orderSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    orderItems: [
      {
        name: { type: String, required: true },
        qty: { type: Number, required: true, default: 0 },
        price: { type: Number, required: true, default: 0 },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: 'Product',
        },
      },
    ],
    pickupLocation: {
      type: String,
      required: true,
    },
    shippingAddress: {
      type: String,
      required: true,
    },
    paymentMethod: {
      type: String,
      required: true,
      default: 'Cash On Delievery',
    },
    isTaskCreated: {
      type: Boolean,
      required: true,
      default: false,
    },
    isReachedStore: {
      type: Boolean,
      required: true,
      default: false,
    },
    isItemPicked: {
      type: Boolean,
      required: true,
      default: false,
    },
    isEnroute: {
      type: Boolean,
      required: true,
      default: false,
    },
    isDelivered: {
      type: Boolean,
      required: true,
      default: false,
    },
    isCanceled: {
      type: Boolean,
      required: true,
      default: false,
    },
    deliveredAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);
module.exports = Order;
