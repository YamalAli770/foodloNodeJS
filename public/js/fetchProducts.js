const axios = require('axios');
const url = "http://localhost:3000/api/v1/foodlo/fooditems";

const fetchproducts = async (limit) => {
    try {
        if(!limit) {
            const response = await axios.get(url);
            return response.data;
        }
        else {
            const newURL = url.concat(`?limit=${limit}`);
            const response = await axios.get(newURL);
            // console.log(newURL);
            return response.data;
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = fetchproducts;