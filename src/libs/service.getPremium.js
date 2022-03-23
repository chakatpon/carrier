const axios = require("axios");
const CONFIG = require("../configs/api.config.json");
const getPremiumService = async function (params) {
  try {
    const grpCode = params.grp.value;
    const suminsured = params.suminsured.value;

    const response = await axios({
      method: "GET",
      url: `${CONFIG.GET_PREMIUM.URL}?grp_code=${grpCode}&suminsured=${suminsured}`
    });
    return response;
  } catch (error) {
    throw new Error(error);
  }
};
export default getPremiumService;
