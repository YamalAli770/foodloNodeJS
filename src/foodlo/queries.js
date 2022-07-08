const getCategory = "SELECT * FROM menu_category";
const getFoodItems = "SELECT * FROM food_items";
const getFoodItemByID = "SELECT * FROM food_items WHERE foodid = $1";
const selectUserQuery = "SELECT * FROM customer WHERE email = $1";
const selectUserByID = "SELECT * FROM customer WHERE userid = $1";
const insertUserQuery = "INSERT INTO customer (name, email, password) VALUES ($1, $2, $3) RETURNING userid, password";

module.exports = {
    getCategory,
    getFoodItems,
    getFoodItemByID,
    selectUserQuery,
    insertUserQuery,
    selectUserByID,
}