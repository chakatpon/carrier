const axios = require("axios");
const CONFIG = require("../configs/api.config.json");

const getPreNameService = async function () {
  try {
    
    const response = await axios({
      method: "GET",
      url: `${CONFIG.GET_PRENAME.URL}`
    });
    
    const preNamelist = response.data;
    return preNamelist;
  } catch (error) { 
    throw new Error(error);
  }
};
export default getPreNameService;
