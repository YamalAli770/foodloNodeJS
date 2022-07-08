const pool = require('../../db');
const queries = require('../foodlo/queries');
const bcrypt = require('bcrypt');
const session = require('express-session');
const flash = require('express-flash');
const passport = require('passport');

const getCategory = (req, res) => {
    pool.query(queries.getCategory, (err, result) => {
        if(err) throw err.message;
        res.status(200).json(result.rows);
    });
};

const getFoodItems = (req, res) => {
    const {limit} = req.query;
    pool.query(queries.getFoodItems, (err, result) => {
        if(err) throw err.message;
        if(limit) {
            const Result = [...result.rows];
            let newResult = Result.slice(0, Number(limit));
            return res.status(200).json(newResult);
        }
        res.status(200).json(result.rows);
    });
};

const getFoodItemByID = (req, res) => {
    const {id} = req.params;
    pool.query(queries.getFoodItemByID, [id], (err, result) => {
        if(err) throw err;
        res.status(200).json(result.rows);
    });
};

const registerUser = async (req, res) => {
    let {name, email, userpass, user_repass} = req.body;
    // console.log({name, email, userpass, user_repass});

    let errors = [];

    if(!name || !email || !userpass || !user_repass) {
        errors.push({message:'Please enter form fields'});
    };

    if(userpass.length < 6) {
        errors.push({message:'Password should be atleast 6 characters long'});
    }

    if(userpass != user_repass) {
        errors.push({message:'Passwords do not match'});
    }

    if(errors.length > 0) {
        return res.render('pages/register', {errors});
    }
    else {
        // Form Validation Passed
        let hashedPassword = await bcrypt.hash(userpass, 10);
        // console.log(hashedPassword);
        pool.query(queries.selectUserQuery, [email], (err, result) => {  
            if (err) throw err;
            else if(result.rows.length > 0) {
                errors.push({message:'User already exists'});
                return res.render('pages/register', {errors});
            }
            else {
                pool.query(queries.insertUserQuery, [name, email, hashedPassword], (err, result) => {
                    if(err) throw err;
                    req.flash("success_msg", "User Successfully Registered. Please Log In");
                    res.redirect('login');
                });
            };
        });
    }
};

const passportAuthenticate = (
    passport.authenticate('local', {
        successRedirect : '/dashboard',
        failureRedirect : '/login',
        failureFlash : true,
}));

const checkAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return res.redirect('/dashboard');
    }
    next();
};

const checkNotAuthenticated = (req, res, next) => {
    if(req.isAuthenticated()) {
        return next();
    }
    res.redirect('/login');
};

const logoutUser  = (req, res, next) => {
    req.logOut((err) => {
        if(err) throw err;
        req.flash("success_msg", "You have logged out");
        res.redirect('/login');
    });
};

module.exports = {
    getCategory,
    getFoodItems,
    getFoodItemByID,
    registerUser,
    passportAuthenticate,
    checkAuthenticated,
    checkNotAuthenticated,
    logoutUser,
};