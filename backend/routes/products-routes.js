const express = require('express')
const productsControllers = require('../controllers/products-controllers')
const { check } = require('express-validator')
const checkAuth = require('../middleware/check-auth')
const router = express.Router()

router.get('/:pid',productsControllers.getByProductId)

router.get('/',productsControllers.getProducts)

router.use(checkAuth)
router.post(
    '/add',
    [
        check('title').not().isEmpty(),
        check('description').isLength({ min: 5 }),
        check('price').not().isEmpty(),
        check('availability').not().isEmpty()
    ]
    , productsControllers.createProduct
)

router.post('/review/:pid',productsControllers.addReview)

router.get('/user/cart',productsControllers.getCartByUserId)
router.get('/user/order',productsControllers.getOrdersByUserId)

router.post('/cart/:pid',productsControllers.addToCart)
router.post('/order/:pid',productsControllers.addToOrders)


router.delete('/cart/:pid',productsControllers.deleteFromCart)
router.delete('/order/:pid',productsControllers.deleteFromOrders)

router.post('/review/:pid',productsControllers.addReview)




module.exports = router