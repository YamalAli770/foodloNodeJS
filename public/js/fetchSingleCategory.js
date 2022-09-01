const axios = require('axios');

let getUrl = `http://localhost:3000/api/v1/foodlo/category/`;

const fetchSingleCategory = async (id) => {
    try {
        const url = getUrl.concat(id);
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.log('This is error');
    }
};

module.exports = fetchSingleCategory;