const axios = require("axios");
const CONFIG = require("../configs/api.config.json");


const getProvince = async function () {
  try {
    const response = await axios({
      method: "GET",
      url: `${CONFIG.GET_PROVINCE.URL}`
    });
    const provinceList = response.data;
    return provinceList;
  } catch (error) {
    throw new Error(error);
  }
};
export default getProvince;
