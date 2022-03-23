const axios = require("axios");
const CONFIG = require("../configs/api.config.json");

const getCarNameService = async function () {
  try {
    
    const response = await axios({
      method: "GET",
      url: `${CONFIG.GET_CARNAME.URL}`
    });
    
    const carNamelist = response.data;
    return carNamelist;
  } catch (error) { 
    throw new Error(error);
  }
};
export default getCarNameService;
