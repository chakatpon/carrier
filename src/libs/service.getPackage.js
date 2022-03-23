const axios = require("axios");
const CONFIG = require("../configs/api.config.json");

const getPackageService = async function (params) {
  try {
    
    const grpCode = params.grp;
    const suminsured = params.suminsured;
    const startDate = params.startDate;
    const response = await axios({
      method: "GET",
      url: `${CONFIG.GET_PACKAGE.URL}?grp_code=${grpCode}&suminsured=${suminsured}&create_date=${startDate}`
    });
    const packageList = response.data;
    //Change key name (thainame --> label) and value name (packagecode --> value) in packageList
    const listMap = packageList.map(s => {
      if (s.hasOwnProperty("packagecode") || s.hasOwnProperty("thainame")) {
        s.value = s.packagecode;
        s.label = s.thainame;
        delete s.packagecode;
        delete s.thainame;
      }
      return s;
    })
    
    return listMap;
  } catch (error) {
    throw new Error(error);
  }
};
export default getPackageService;
