const axios = require("axios");
const CONFIG = require("../configs/api.config.json");

const getDiscountService = async function (params) {
  try {
    const packagecode = params.packageCode;
    const response = await axios({
      method: "GET",
      url: `${CONFIG.GET_DISCOUNT.URL}?PackageCode=${packagecode}`
    });
    const coverage = response.data;
    
    return coverage;
  } catch (error) { 
    throw new Error(error);
  }
};
export default getDiscountService;
