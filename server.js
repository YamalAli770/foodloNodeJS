const express = require('express');
const router = require('./src/foodlo/routes');
const app = express();
// const session = require('express-session');
// const flash = require('express-flash');
// const passport = require('passport');
const { auth } = require('express-openid-connect');
require('dotenv').config();

const PORT = process.env.PORT || 3000;

// OAuth Authentication

app.use(
  auth({
    authRequired: false,
    auth0Logout: true,
    issuerBaseURL: process.env.ISSUER_BASE_URL,
    baseURL: process.env.BASE_URL,
    clientID: process.env.CLIENT_ID,
    secret: process.env.SECRET,
    idpLogout: true,
  })
);

// Passport Config Function
// const initializePassport = require('./passportConfig');
// initializePassport(passport);

// Static Files
app.use(express.static('./public'));

// View Engine
app.set('view engine', 'ejs');

// Middleware
// app.use(express.json());
// app.use(session({
    // secret : 'secret', // encrypt all session data
    // resave : false, // Resave session vars if no info changed
    // saveUninitialized : false, // save session details if no values placed
// }));
// app.use(flash());

// Passport Config Middleware
// app.use(passport.initialize());
// app.use(passport.session());

// Send Details From Frontend To Server
app.use(express.urlencoded({extended : false}));

// Pages Router
app.use('/', router);

// Api Router
app.use('/api/v1/foodlo', router);

app.listen(PORT, () => {
    console.log(`The app is listening on port ${PORT}`);
});