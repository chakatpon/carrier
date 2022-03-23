const axios = require("axios");
const CONFIG = require("../configs/api.config.json");

const getCarTypeService = async function (params) {
  try {
    const propcode = params.propcode;
    const response = await axios({
      method: "GET",
      url: `${CONFIG.GET_CARTYPE.URL}?propcode=${propcode}`
    });
    //Remove prop_code column
    for(const result of response.data){
        delete result.prop_code;
    }
    const carTypelist = response.data;
   //Change key name (type_car --> label) and value name (type_code --> value) in propertyList
   const output = carTypelist.map(s => {
    if (s.hasOwnProperty("type_code") || s.hasOwnProperty("type_car")) {
      s.value = s.type_code;
      s.label = s.type_car;
      delete s.type_car;
      delete s.type_code;
    }
    return s;
  })
   
    return carTypelist;
  } catch (error) { 
    throw new Error(error);
  }
};
export default getCarTypeService;
