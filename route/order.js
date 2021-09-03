// ROUTER
const router = require('express').Router();
// CONTROLLERS
const {
  listAllOrders,
  addOrder,
  markOrderAsTaskCreated,
  markOrderAsReachedStore,
  markOrderAsItemsPicked,
  markOrderAsEnroute,
  markOrderAsDelievered,
  markOrderAsCanceled,
} = require('../controller/order');
// MIDDLEWARES
const { protect, admin, delieveryAgent } = require('../middleware/auth');

// GET ALL ORDERS
router.route('/').get(protect, admin, listAllOrders);
// ADD ORDER
router.route('/add').post(protect, addOrder);
// MARK ORDER AS TASK CREATED
router.route('/task/:id').put(protect, admin, markOrderAsTaskCreated);

// MARK ORDER AS REACH TO STORE
router
  .route('/reach/:id')
  .put(protect, delieveryAgent, markOrderAsReachedStore);

// MARK ORDER AS ITEM PICKED
router.route('/pick/:id').put(protect, delieveryAgent, markOrderAsItemsPicked);
// MARK ORDER AS ENROUTE
router.route('/enroute/:id').put(protect, delieveryAgent, markOrderAsEnroute);

// MARK ORDER AS DELIEVERED
router
  .route('/deliever/:id')
  .put(protect, delieveryAgent, markOrderAsDelievered);

// MARK ORDER AS CANCELLED
router.route('/cancel/:id').put(protect, markOrderAsCanceled);

module.exports = router;
