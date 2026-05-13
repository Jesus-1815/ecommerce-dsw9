// routes/checkout.js
const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/checkoutController');
const Order    = require('../models/Order');

router.get('/', ctrl.getCheckoutPage);
router.post('/process', ctrl.processCheckout);
router.post('/create-paypal-order', ctrl.createPayPalOrder);
router.post('/capture-paypal-order', ctrl.capturePayPalOrder);

router.get('/success', async (req, res) => {
  try {
    const order = await Order.findByPk(req.query.orderId);
    if (!order) {
      return res.status(404).send('Orden no encontrada con ID: ' + req.query.orderId);
    }
    res.render('order-success', { title: 'Pedido Completado', order });
  } catch (err) {
    res.status(500).send(`
      <h2>Error exacto:</h2>
      <pre>${err.message}</pre>
      <pre>${err.stack}</pre>
    `);
  }
});

router.get('/cancel', ctrl.handleCancelPayment);

module.exports = router;