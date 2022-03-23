const axios = require("axios");
const CONFIG = require("../configs/api.config.json");


const getCountry = async function () {
  try {
    const response = await axios({
      method: "GET",
      url: `${CONFIG.GET_COUNTRY.URL}`
    });
    const countryList = response.data;
    return countryList;
  } catch (error) {
    throw new Error(error);
  }
};
export default getCountry;
