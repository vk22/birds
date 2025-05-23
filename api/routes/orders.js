const express = require('express');
const router = express.Router();
const ordersControllers = require('../controllers/ordersControllers'); 

//// Add Order  
router.post('/add-order/', ordersControllers.addNewOrder)

//// Get Orders 
router.post('/get-orders/', ordersControllers.getOrders)

//// Get All Subscribes 
router.get('/get-order/:id', ordersControllers.getOrderOne)

//// Delete Orders 
router.post('/delete-orders', ordersControllers.deleteOrders)

//// Send to manager
router.post('/send-orders-to-manager/', ordersControllers.sendOrderToManager)


module.exports = router;