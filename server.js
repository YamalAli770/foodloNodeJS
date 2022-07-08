const express = require('express');
const router = require('./src/foodlo/routes');
const app = express();
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const PORT = process.env.PORT || 3000;

// Passport Config Function
const initializePassport = require('./passportConfig');
initializePassport(passport);

// Static Files
app.use(express.static('./public'));

// View Engine
app.set('view engine', 'ejs');

// Middleware
app.use(express.json());
app.use(session({
    secret : 'secret', // encrypt all session data
    resave : false, // Resave session vars if no info changed
    saveUninitialized : false, // save session details if no values placed
}));
app.use(flash());

// Passport Config Middleware
app.use(passport.initialize());
app.use(passport.session());

// Send Details From Frontend To Server
app.use(express.urlencoded({extended : false}));

// Pages Router
app.use('/', router);

// Api Router
app.use('/api/v1/foodlo', router);

app.listen(PORT, () => {
    console.log(`The app is listening on port ${PORT}`);
});