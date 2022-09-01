const {Router} = require('express');
const controller = require('./controller');
const router = Router();
const { auth, requiresAuth } = require('express-openid-connect');

// Import Fetch Files
const fetchProducts = require('../../public/js/fetchProducts');
const fetchSingleProduct = require('../../public/js/fetchSingleProduct');
const fetchSingleCategory = require('../../public/js/fetchSingleCategory');

// Pages routes
router.get('/', async (req, res) => {
    const limit = 3;
    const data = await fetchProducts(limit);
    res.render('pages/index', {data, user: req.oidc.user ?  JSON.parse(JSON.stringify(req.oidc.user.nickname)) : null});
})

router.get('/about', (req, res) => {
    res.render('pages/about', {user: req.oidc.user ?  JSON.parse(JSON.stringify(req.oidc.user.nickname)) : null});
    
})

router.get('/products', async (req, res) => {
    const data = await fetchProducts();
    res.render('pages/products', {data, user: req.oidc.user ?  JSON.parse(JSON.stringify(req.oidc.user.nickname)) : null});
})

router.get('/productspecific/:id', async (req, res) => {
    try {
        const {id} = req.params;
        let product = await fetchSingleProduct(id);
        let result = await fetchSingleCategory(id);
        let category = JSON.parse(JSON.stringify(result[0].foodtype));
        console.log(req.oidc.user);
        return res.render('pages/productspecific', {product, category: category, user: req.oidc.user ?  JSON.parse(JSON.stringify(req.oidc.user.nickname)) : null});
    } catch (error) {
        console.log(error);
    }
})

router.get('/cart', requiresAuth(), async (req, res) => {
    if(req.query.products == null) {
        return res.render('pages/emptycart', {user: req.oidc.user ?  JSON.parse(JSON.stringify(req.oidc.user.nickname)) : null});
    }
    else {
        let products = await fetchProducts();
        let productsInCart = JSON.parse(req.query.products);
        let filteredProducts = {cartTotal: 0, shippingFee: 3, totalPrice: 0, data:[]};

        if(products) {
            products.forEach(product => {
                productsInCart.forEach(cartProduct => {
                    if(product.foodid === cartProduct.id) {
                        filteredProducts.data.push({...product, qty: cartProduct.qty});
                    }
                });
            });
        }
        
        let totalPrice = 0;

        filteredProducts.data.forEach(product => {
            totalPrice = totalPrice + (product.price * product.qty);
        });
        
        filteredProducts.cartTotal = totalPrice;

        res.render('pages/cart', {user: req.oidc.user ?  JSON.parse(JSON.stringify(req.oidc.user.nickname)) : null, productsInCart: filteredProducts});
    }
})

router.get('/profile', requiresAuth(), (req, res) => {
    res.render('pages/profile', {user: req.oidc.user ?  JSON.parse(JSON.stringify(req.oidc.user.nickname)) : null});
})

router.get('/changepassword', requiresAuth(), (req, res) => {
    res.render('pages/changepassword', {user: req.oidc.user ?  JSON.parse(JSON.stringify(req.oidc.user.nickname)) : null});
})

router.get('/orders', requiresAuth(), (req, res) => {
    res.render('pages/orders', {user: req.oidc.user ?  JSON.parse(JSON.stringify(req.oidc.user.nickname)) : null});
})

router.get('/checkout', requiresAuth(), (req, res) => {
    res.render('pages/checkout', {user: req.oidc.user ?  JSON.parse(JSON.stringify(req.oidc.user.nickname)) : null});
})

// Temp Routes

// router.get('/register', (req, res) => {
//     res.render('pages/register')
// })

// router.get('/login', (req, res) => {
//     res.render('pages/login')
// })

// Post Routes

// API routes
router.get('/category', controller.getCategory);
router.get('/category/:id', controller.getCategoryByID);
router.get('/fooditems', controller.getFoodItems);
router.get('/fooditems/:id', controller.getFoodItemByID);

// POST Routes

module.exports = router;