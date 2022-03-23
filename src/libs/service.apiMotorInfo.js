const axios = require("axios");
const CONFIG = require("../configs/api.config.json");

const getMotorInfoService = async function (apply,licence,policyNo) {
  try {
    // console.log("SERVICE COMMING : ")
    // console.log("PARAMS : ",apply)
    // console.log("PARAMS : ",licence)
    // console.log("PARAMS : ",policyNo)
    // const licence = params.licence;
    // const apply = params.apply;
    // const policy = params.policyNo;

    const response = await axios({
      method: "GET",
      url: `${CONFIG.GET_MOTORINFO.URL}?licence=${licence}&apply=${apply}&policy=${policyNo}`
    });
    const motorInfoList = response.data;

    
    return motorInfoList;
  } catch (error) {
    throw new Error(error);
  }
};
export default getMotorInfoService;
