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

const getCategoryByID = async (req, res) => {
    const {id} = req.params;
    const getItem = async () => {
        try {
            const item = await pool.query(queries.getFoodItemByID, [id]);
            return item.rows;
        } 
        catch (error) {
            console.log(error);
        }
    }
    let item = await getItem();
    const categoryid = item[0].categoryid;

    pool.query(queries.getCategoryByID, [categoryid], (err, result) => {
        if(err) throw err;
        console.log(categoryid);
        console.log(result.rows);
        return res.status(200).json(result.rows);
    });
}

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

module.exports = {
    getCategory,
    getFoodItems,
    getFoodItemByID,
    getCategoryByID,
};