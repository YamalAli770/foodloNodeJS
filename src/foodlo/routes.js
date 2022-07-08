const {Router} = require('express');
const controller = require('./controller');
const router = Router();

// Import Fetch Files
const fetchProducts = require('../../public/js/fetchProducts');
const fetchSingleProduct = require('../../public/js/fetchSingleProduct');
const passport = require('passport');

// Pages routes
router.get('/', async (req, res) => {
    const limit = 3;
    const data = await fetchProducts(limit);
    res.render('pages/index', {data});
})

router.get('/about', (req, res) => {
    res.render('pages/about');
})

router.get('/products', async (req, res) => {
    const data = await fetchProducts();
    res.render('pages/products', {data});
})

router.get('/productspecific/:id', async (req, res) => {
    try {
        const {id} = req.params;
        const product = await fetchSingleProduct(id);
        res.render('pages/productspecific', {product});
    } catch (error) {
        console.log(error);
    }
})

router.get('/register', controller.checkAuthenticated, (req, res) => {
    res.render('pages/register');
})

router.get('/login', controller.checkAuthenticated, (req, res) => {
    res.render('pages/login');
})


router.get('/dashboard', controller.checkNotAuthenticated, (req, res) => {
    res.render('pages/dashboard', {user : req.user.name});
})

router.get('/logout', controller.logoutUser);

router.get('/cart', (req, res) => {
    res.render('pages/cart');
})

router.get('/checkout', (req, res) => {
    res.render('pages/checkout');
})

// Post Routes
router.post('/register', controller.registerUser);

router.post('/login', controller.passportAuthenticate);

// API routes
router.get('/category', controller.getCategory);
router.get('/fooditems', controller.getFoodItems);
router.get('/fooditems/:id', controller.getFoodItemByID);

// POST Routes

module.exports = router;