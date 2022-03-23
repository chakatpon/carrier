const axios = require("axios");
const CONFIG = require("../configs/api.config.json");


const getProperty = async function (params) {
  try {
    const response = await axios({
      method: "GET",
      url: `${CONFIG.GET_PROPERTY.URL}`
    });
    const propertyList = response.data;
    
    return propertyList;
  } catch (error) {
    throw new Error(error);
  }
};
export default getProperty;
