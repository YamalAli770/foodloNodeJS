const LocalStrategy = require('passport-local').Strategy;
const pool = require('../NodeJsFoodLo/db');
const bcrypt = require('bcrypt');
const queries = require('./src/foodlo/queries');

function initialize (passport) {
    const authenticateUser = (email, password, done) => {
        // console.log(email, password); //
        pool.query(queries.selectUserQuery, [email], (err, result) => {
            if(err) {throw err};
            // console.log(result.rows);
            if(result.rows.length > 0) {
                const user = result.rows[0];
                bcrypt.compare(password, user.password, (err, isMatch) => {
                    if(err) {throw err}
                    else if(isMatch) {
                        return done(null, user); // return user store cookie
                    }
                    else {
                        return done(null, false, {message : "Password is not correct"});
                    }
                });
            }
            else {
                return done(null, false, {message : "Email is not registered"});
            }
        });
    };

    passport.use(new LocalStrategy ({
        usernameField : "email",
        passwordField : "user-pass"}, authenticateUser));
    
    // stores userid in session cookie
    passport.serializeUser((user, done) => done(null, user.userid));
    // uses userid to obtain user details from db and install full object into the session
    passport.deserializeUser((userid, done) => {
        pool.query(queries.selectUserByID, [userid], (err, result) => {
            if(err) {throw err};
            return done(null, result.rows[0]);
        });
    });
};

module.exports = initialize;