// routes/checkout.js
const express  = require('express');
const router   = express.Router();
const ctrl     = require('../controllers/checkoutController');
const { Order } = require('../models');

router.get( '/',                     ctrl.getCheckoutPage);
router.post('/process',              ctrl.processCheckout);
router.post('/create-paypal-order',  ctrl.createPayPalOrder);
router.post('/capture-paypal-order', ctrl.capturePayPalOrder);

// ✅ RUTA CORREGIDA — busca la orden en BD y pasa todos los datos al EJS
router.get('/success', async (req, res) => {
  try {
    const order = await Order.findByPk(req.query.orderId);
    if (!order) return res.redirect('/');
    res.render('order-success', { title: 'Pedido Completado', order });
  } catch (err) {
    console.error('Error en /success:', err);
    res.status(500).send('Error al cargar la orden');
  }
});

router.get('/cancel', ctrl.handleCancelPayment);

module.exports = router;