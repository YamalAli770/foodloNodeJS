const getCategory = "SELECT * FROM menu_category";
const getFoodItems = "SELECT * FROM food_items";
const getFoodItemByID = "SELECT * FROM food_items WHERE foodid = $1";
const getCategoryByID = "SELECT foodtype FROM menu_category WHERE categoryid = $1";

module.exports = {
    getCategory,
    getFoodItems,
    getFoodItemByID,
    getCategoryByID,
}