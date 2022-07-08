const axios = require('axios');

let getUrl = `http://localhost:3000/api/v1/foodlo/fooditems/`;

const fetchSingleProduct = async (id) => {
    try {
        const url = getUrl.concat(id);
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log(error);
    }
};

module.exports = fetchSingleProduct;